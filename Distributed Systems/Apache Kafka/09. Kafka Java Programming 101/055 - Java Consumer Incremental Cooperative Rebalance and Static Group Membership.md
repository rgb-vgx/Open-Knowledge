# Rebalance Eager Vs Cooperative: Vì Sao Cả Group Phải "Dừng Cả Thế Giới"?

Bài trước ta thấy rebalance chia lại partition mỗi khi thêm/bớt consumer. Nhưng rebalance có hai họ hoàn toàn khác nhau: **eager (stop-the-world)** mặc định cũ, và **cooperative (incremental)** mới. Bài này giải thích vì sao eager gây gián đoạn, cooperative khắc phục ra sao qua `CooperativeStickyAssignor`, và `group.instance.id` (static membership) giúp restart không rebalance thế nào. Bài sau sẽ thực hành ngay.

---

## 1. Concept: Hai kiểu rebalance

### Eager rebalance — dừng cả thế giới

Đây là hành vi mặc định của 3 assignor cũ: `RangeAssignor`, `RoundRobinAssignor`, `StickyAssignor`.

Kịch bản: group có 2 consumer đang giữ 3 partitions, consumer thứ 3 join vào.

1. Tất cả consumer **dừng lại, từ bỏ toàn bộ partitions** đang giữ. Không ai được đọc gì trong lúc này.
2. Cả group join lại, nhận assignment mới hoàn toàn (khá ngẫu nhiên, không đảm bảo ai lấy lại partition cũ).
3. Bắt đầu đọc tiếp.

Hai vấn đề:

* **Stop-the-world.** Dù chỉ cần chuyển 1 partition cho member mới, cả group vẫn ngừng xử lý. Group càng lớn, thời gian đứng hình càng lâu (vài giây tới hàng chục giây).
* **Mất tính ổn định.** Consumer có thể không lấy lại partition cũ — cache/local state gắn với partition cũ phải build lại.

### Cooperative (incremental) rebalance — chỉ chuyển phần cần thiết

Triết lý: chỉ revoke đúng subset partitions cần di chuyển, ai không liên quan vẫn đọc bình thường. Có thể cần nhiều vòng (incremental) mới đạt assignment ổn định, nhưng không bao giờ dừng cả group.

Cùng kịch bản 2 → 3 consumer, 3 partitions:

1. Group nhận ra chỉ cần chuyển `partition 2` cho member mới.
2. Consumer 1 (giữ 0, 1) và consumer 2 (giữ 2) vẫn đọc 0, 1 bình thường; chỉ partition 2 bị revoke khỏi consumer 2.
3. Partition 2 assign cho consumer 3, consumer 3 bắt đầu đọc. Xong — không ai bị gián đoạn ngoài partition di chuyển.

## 2. Các `partition.assignment.strategy` cần biết

Config quyết định assignor: `partition.assignment.strategy` (trong Java consumer properties).

| Assignor | Họ | Đặc điểm |
|---|---|---|
| `RangeAssignor` | Eager | Chia theo từng topic, dễ lệch khi nhiều topic số partition khác nhau. Từng là default. |
| `RoundRobinAssignor` | Eager | Chia round-robin mọi partition mọi topic — cân (±1) nhưng mỗi lần rebalance vẫn stop-the-world. |
| `StickyAssignor` | Eager | Khởi đầu cân như RoundRobin, khi member join/leave thì **giữ tối đa assignment cũ** (ít di chuyển nhất). Vẫn stop-the-world. |
| `CooperativeStickyAssignor` | Cooperative | Giống Sticky nhưng theo giao thức cooperative — không dừng group. Lựa chọn khuyến nghị. |

Mặc định Kafka 3.0 là danh sách `[RangeAssignor, CooperativeStickyAssignor]`:

* Nghĩa là: nếu mọi member đều hỗ trợ cooperative thì dùng cooperative; còn không thì fallback Range (eager) để tương thích.
* Muốn ép cooperative hoàn toàn: set strategy **chỉ còn** `CooperativeStickyAssignor`. Vì khác giao thức nên cần **rolling bounce** một lần (restart từng consumer): lần restart đầu group vẫn eager, từ lần thứ hai trở đi cả group đã cùng protocol cooperative.

Hai hệ sinh thái đã bật cooperative mặc định: **Kafka Connect** và **Kafka Streams** (qua `StreamsPartitionAssignor`).

### Static group membership — restart không rebalance

Vấn đề còn lại: consumer rời đi rồi quay lại (deploy, restart) vẫn trigger rebalance, vì mỗi lần join nó nhận `member.id` mới — group tưởng thành viên mới.

Fix: set `group.instance.id` (ví dụ `consumer-1`, `consumer-2`, `consumer-3`, mỗi instance một giá trị cố định, duy nhất). Consumer trở thành **static member**:

* Rời đi rồi quay lại trong vòng `session.timeout.ms` → nhận lại đúng partitions cũ, **không rebalance**.
* Quá timeout mới coi là chết thật → partition của nó mới được chuyển cho người khác.
* Lợi ích lớn khi consumer giữ cache/state local theo partition (không phải build lại sau mỗi restart), và khi chạy trên Kubernetes hay rolling deploy liên tục.

## 3. Chạy và kiểm tra (lý thuyết — thực hành ở bài sau)

Chưa cần chạy code bài này. Chỉ cần nhớ checklist khi đọc log ở bài thực hành:

* Dòng `partition.assignment.strategy` lúc consumer khởi động đang là gì (eager list cũ hay cooperative).
* Khi member mới join: log ghi `revoked` toàn bộ (eager) hay chỉ 1 partition (cooperative)?
* Consumer không bị revoke có tiếp tục poll ra dữ liệu trong lúc rebalance không?

## 4. Pitfalls

* **Tưởng Sticky và CooperativeSticky giống nhau.** Sticky chỉ tối thiểu hóa di chuyển nhưng vẫn stop-the-world; CooperativeSticky mới không dừng group. Đọc thiếu chữ Cooperative là nhầm họ.
* **Set `CooperativeStickyAssignor` cho một consumer mà quên các consumer còn lại.** Group chỉ cooperative khi **mọi member** cùng protocol. Trộn lẫn là group fallback eager — tưởng đã fix mà log vẫn stop-the-world.
* **`group.instance.id` trùng nhau giữa các instance.** Static id phải duy nhất mỗi instance. Trùng id thì member sau đá member trước ra (fencing), rebalance liên tục — tệ hơn không dùng.
* **Static member down quá `session.timeout.ms` rồi thắc mắc sao vẫn rebalance.** Đó là thiết kế: quá timeout thì group buộc phải chuyển partition đi, không giữ mãi được.
* **Thêm partition vào topic rồi ngạc nhiên vì rebalance.** Admin tăng partitions cũng trigger rebalance như member join/leave — lên kế hoạch trước với topic đang chạy production.

## Kết Luận

Một câu: **eager dừng cả group để chia lại từ đầu, cooperative chỉ chuyển đúng partition cần thiết, static membership giữ chỗ cho người quay lại.** Ba mảnh ghép này là toàn bộ câu chuyện rebalance hiện đại.

Bài tiếp theo chúng ta sẽ thực hành ngay: copy thành `ConsumerDemoCooperative`, set `partition.assignment.strategy=CooperativeStickyAssignor`, chạy 1-2-3 instance và đọc log `revoked/assigned` để thấy rebalance incremental khác eager thế nào.
