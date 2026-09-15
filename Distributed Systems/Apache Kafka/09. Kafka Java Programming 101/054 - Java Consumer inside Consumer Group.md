# Consumer Group Rebalance: 1-2-3 Consumer Chia Nhau 3 Partitions Ra Sao?

Một consumer đọc 3 partitions thì dễ. Nhưng khi 2, 3 consumer cùng `group.id` nhảy vào — ai đọc partition nào? Bài này chạy 1 rồi 2 rồi 3 instance `ConsumerDemoWithShutdown` cùng group `my-java-application` trên topic `demo_java` 3 partitions, quan sát **rebalance** chia partition trực tiếp và tắt từng instance để thấy group tự chia lại.

---

## 1. Concept: Consumer group và rebalance

Consumer group là cơ chế chia việc song song của Kafka:

* Cùng `group.id` = cùng một đội. Mỗi partition tại một thời điểm chỉ giao cho **đúng một consumer** trong đội.
* Số consumer tối đa có ích = số partitions. Topic 3 partitions mà chạy 4 consumer thì 1 người ngồi chơi.
* **Rebalance** là sự kiện chia lại partition mỗi khi có consumer join (mở instance mới), leave (tắt graceful) hoặc crash (kill abrupt). Trong lúc rebalance, group tạm dừng để thống nhất assignment mới.

Kịch bản chuẩn trên topic 3 partitions (`demo_java-0/1/2`):

| Số consumer | Chia partition |
|---|---|
| 1 consumer | Ôm cả 3: 0, 1, 2 |
| 2 consumer | Một người 2 partitions (0, 1), một người 1 partition (2) |
| 3 consumer | Mỗi người đúng 1 partition |

Muốn chạy nhiều instance song song trong IntelliJ: tắt presentation mode, mở Run Configurations của `ConsumerDemoWithShutdown`, vào Modify options, tick **Allow multiple instances**. Đây chính là lý do bài setup bắt Build and run bằng IntelliJ IDEA — chạy bằng Gradle mặc định sẽ khó mở multi-instance.

Cách verify ngoài log: mở Conduktor UI, mục Consumer Groups, xem group `my-java-application` — trạng thái `Stable`, cột lag và member assignment hiện rõ ai đang giữ partition nào.

## 2. Code: Không cần code mới

Bài này tái sử dụng nguyên class `ConsumerDemoWithShutdown` từ bài graceful shutdown (đã có `wakeup()` + `WakeupException` + `consumer.close()` trong `finally`). Không thêm dòng nào — chỉ chạy nhiều instance của cùng một class với cùng `group.id = my-java-application`.

Điểm duy nhất transcript dặn: xóa (hoặc đã xóa từ bài trước) dòng `log.info("Polling")` mỗi vòng poll. Chạy 3 instance mà mỗi instance log polling mỗi giây thì log rebalance quan trọng sẽ bị nhấn chìm.

Nhắc lại khung poll loop đang chạy ở mỗi instance:

```java
// Mỗi instance chạy độc lập, cùng group.id = "my-java-application"
consumer.subscribe(Arrays.asList("demo_java"));

while (true) {
    ConsumerRecords<String, String> records =
            consumer.poll(Duration.ofMillis(1000));
    for (ConsumerRecord<String, String> record : records) {
        log.info("Key: " + record.key() + ", Value: " + record.value());
        log.info("Partition: " + record.partition() + ", Offset: " + record.offset());
    }
}
```

### Giải thích diễn biến từng bước

**Bước 1 — Chạy instance 1.** Log hiện join group, `newly assigned partitions: demo_java-0, demo_java-1, demo_java-2`. Vì `auto.offset.reset=earliest` nhưng group đã commit offset từ các bài trước, consumer không đọc lại cũ — check Conduktor UI thấy lag = 3 (3 message chưa đọc) là bình thường.

**Bước 2 — Chạy instance 2 (cùng group).** Cả hai instance log `group is rebalancing` + `generation` mới. Kết thúc: instance cũ giữ `demo_java-0, demo_java-1`, instance mới nhận `demo_java-2` (+ dòng `offsets retrieved` cho partition mới). Chạy `ProducerDemoKeys` lúc này: log instance 1 chỉ hiện partition 0 và 1, log instance 2 chỉ hiện partition 2 — bằng chứng chia việc đã có hiệu lực.

**Bước 3 — Chạy instance 3.** Rebalance lần nữa. Kết thúc: mỗi instance đúng 1 partition (0 / 1 / 2). Chạy producer kiểm chứng: mỗi log instance chỉ hiện đúng partition của mình. Conduktor UI hiện 3 members, mỗi member 1 partition.

**Bước 4 — Tắt graceful từng instance.** Clear log 3 cửa sổ, bấm Stop instance 3 → instance này chạy shutdown hook (`revoking partitions`, `leaving the group`), 2 instance còn lại rebalance **ngay**: một người nhận thêm partition 2 (giữ 2 partitions), người kia giữ nguyên. Tắt tiếp instance 2 → instance 1 ôm lại cả 3 partitions (0, 1, 2). Không có delay session timeout vì cả hai lần tắt đều graceful.

## 3. Chạy và kiểm tra

1. Topic `demo_java` có 3 partitions. Bật `Allow multiple instances` cho Run Configuration.
2. Run instance 1 → kiểm tra log `assigned partitions` đủ 3 cái.
3. Run instance 2 → cả hai log đều có `rebalancing`; xong thì một bên 2 partitions, một bên 1 partition.
4. Run `ProducerDemoKeys` → đối chiếu: message partition nào chỉ hiện ở log instance giữ partition đó.
5. Run instance 3 → mỗi instance 1 partition; producer check lại.
6. Stop graceful từng instance → quan sát instance còn lại nhận thêm partition ngay trong log, không chờ ~30s.
7. Đối chiếu Conduktor UI (Consumer Groups → `my-java-application`) sau mỗi bước: số members và assignment phải khớp log.

## 4. Pitfalls

* **Quên bật Allow multiple instances.** IntelliJ默认 rerun sẽ kill instance cũ — bạn tưởng đang có 2 consumer nhưng thực ra chỉ 1, rebalance không bao giờ xảy ra.
* **Hai instance khác `group.id`.** Mỗi group nhận đủ bản copy — cả hai đều đọc cả 3 partitions, không phải chia việc. Muốn chia việc thì group phải giống hệt nhau.
* **Nhiều consumer hơn partitions rồi thắc mắc sao có instance rỗng.** Topic 3 partitions, consumer thứ 4 join vào sẽ không được assign partition nào — ngồi idle cho tới khi có người rời đi. Muốn tăng song song thì tăng partitions (và chấp nhận hệ quả với key như bài Producer Keys).
* **Kill abrupt rồi kết luận rebalance chậm.** Kill -9 / tắt nóng không gửi `LeaveGroup` — group phải chờ `session.timeout.ms` mới phát hiện và rebalance. Đo tốc độ rebalance thì phải tắt graceful.
* **Đọc log rebalance mà không nhìn generation.** Mỗi rebalance tăng generation id. Log generation mới là cách chắc chắn để biết rebalance vừa xong, thay vì đoán qua dòng poll.

## Kết Luận

Một câu: **cùng group thì chia partitions, thêm/bớt member thì rebalance, tắt graceful thì chia lại ngay.** Thấy tận mắt 3 lần chia lại này thì consumer group không còn gì bí ẩn.

Bài tiếp theo chúng ta sẽ đi sâu một nấc: vì sao kiểu rebalance mặc định (eager) gây "stop-the-world", và hai cải tiến **CooperativeStickyAssignor** (rebalance tăng dần, không dừng cả group) + **static group membership** (`group.instance.id`) khắc phục nó ra sao — trước khi thực hành ở bài kế nữa.
