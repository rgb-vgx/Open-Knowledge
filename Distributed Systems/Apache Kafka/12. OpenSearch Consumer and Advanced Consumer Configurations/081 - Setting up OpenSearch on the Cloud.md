# Dựng OpenSearch Trên Cloud Bonsai: 10 Phút Có Cluster Không Cần Docker

Bài trước đã dựng OpenSearch local bằng Docker — nhanh và reset thoải mái. Bài này dành cho đường còn lại: máy yếu, không cài được Docker, hoặc mạng công ty chặn Docker Hub. Chúng ta dựng OpenSearch managed trên Bonsai (bonsai.io) để vẫn theo được toàn bộ 6 Parts mà không cần local.

---

## 1. Vấn đề: Khi Nào Cloud Thắng Docker?

Docker local lý tưởng, nhưng có 3 trường hợp nó thua:

* Máy 8GB RAM, chạy IntelliJ + Docker Desktop + OpenSearch heap 512MB là đơ.
* Không có quyền admin để cài Docker / WSL2 trên Windows.
* Chỉ muốn học logic Consumer (idempotence, commit, bulk), không muốn vật lộn với `docker compose logs`.

Managed OpenSearch giải quyết cả 3: không tốn RAM local, không cài gì, hỏng thì xóa cluster tạo lại trên web. Cái giá phải trả: phải chờ provision ~10 phút, có auth trong connection string, và quota free tier giới hạn (đừng bulk hàng triệu docs test).

Nguyên tắc: **chỉ chọn một đường**. Đã chạy Docker thành công ở bài 080 thì đọc lướt bài này để biết, rồi nhảy sang bài 082.

## 2. Cơ Chế: Bonsai Cấp Gì Cho Bạn?

```mermaid
graph LR
    YOU["Browser + Java code"] -->|HTTPS + basic auth| BONSAI["Bonsai Cluster<br/>KAFKA_COURSE<br/>OpenSearch 1.x"]
    BONSAI --> CONSOLE["Bonsai Console<br/>(thay Dashboards :5601)"]
    BONSAI --> API["REST API :443<br/>(thay localhost:9200)"]
```

* Bonsai tạo một cluster OpenSearch thật trên AWS (bạn chọn region), version `1.x`.
* Bạn nhận 2 thứ: **Console URL** (web UI chạy thử `GET /`) và **Access URL dạng `https://username:password@host`** — đây chính là connection string Java code sẽ dùng ở Part 1.
* Code Java không đổi logic, chỉ đổi nhánh `createOpenSearchClient()`: từ no-auth (`http://localhost:9200`) sang có-auth (parse user/pass, gắn `BasicCredentialsProvider`, dùng `https`).

Lưu ý bản quyền: Bonsai cho chọn cả Elasticsearch và OpenSearch. Section này **bắt buộc OpenSearch 1.x**. Chọn nhầm Elasticsearch là client `opensearch-rest-high-level-client:1.2.4` báo lỗi version.

## 3. Code Và Thao Tác: Từng Bước Dựng Cluster

Không có code Java ở bài này — chỉ có 5 bước click và 1 bước verify. Nhưng phải làm đúng thứ tự.

### 3.1. Tạo tài khoản và chọn Free Sandbox

1. Vào `bonsai.io` → Pricing → **Free Sandbox Cluster**.
2. Nhập email, xác nhận qua link email (không xác nhận thì cluster không provision).
3. Trả lời vài câu hỏi survey → bấm `No, thanks` / `Next` để bỏ qua.

### 3.2. Cấu hình cluster — 3 lựa chọn quyết định

| Lựa chọn | Giá trị đúng | Sai lầm phổ biến |
|---|---|---|
| Cluster Name | `KAFKA_COURSE` (đúng như khóa học để dễ đối chiếu) | Đặt tên có dấu / space gây lỗi URL |
| Engine + Version | **OpenSearch 1.0.0** (hoặc bản 1.x mới nhất trong list) | Chọn Elasticsearch 7.x/8.x → vỡ client |
| Region | Region gần bạn nhất (ví dụ `EU West Ireland` nếu ở EU, `Sydney` nếu ở APAC) | Chọn US trong khi ở VN → latency cao, test bulk chậm |

Bấm **Provision**. Chờ. Đừng sốt ruột bấm provision 2 lần — sẽ ra 2 cluster tốn quota.

### 3.3. Chờ provision và verify bằng `GET /`

Mới provision xong, bấm vào cluster `KAFKA_COURSE` → Console. Gõ:

```
GET /
```

Nếu trả về:

```json
{
  "message": "Cluster not found. It may take a few moments for new cluster to be created."
}
```

hoặc `404` → **đợi thêm 10 phút**, đừng gửi ticket support. Sau ~5–10 phút chạy lại, kết quả mong đợi:

```json
{
  "name" : "xxxx",
  "cluster_name" : "bonsai-xxx",
  "version" : {
    "number" : "1.0.0",
    "distribution" : "opensearch"
  },
  "tagline" : "The OpenSearch Project: https://opensearch.org/"
}
```

Thấy `tagline: The OpenSearch Project` là cluster sống.

### 3.4. Lấy credentials cho Java code (dùng ở Part 1)

Vào **Settings → Access → Credentials → Full Access**. Copy toàn bộ URL dạng:

```
https://user-xxxx:pass-yyyy@host-zzz.bonsai.io
```

* Giữ URL này như password. Đừng commit lên Git, đừng paste lên forum.
* Cuối khóa học nhớ **Regenerate** để vô hiệu hóa URL đã lộ trong video/bài mẫu.
* Trong code Part 1 (bài 083), bạn paste URL này vào biến `connString`, comment dòng `http://localhost:9200` lại. Hàm `createOpenSearchClient()` sẽ tự parse host, user, pass.

```java
// Local Docker:
// String connString = "http://localhost:9200";
// Bonsai Cloud (comment dòng trên, mở dòng dưới):
// String connString = "https://user-xxxx:pass-yyyy@host-zzz.bonsai.io";
```

Chi tiết parse auth sẽ mổ ở bài 083 — ở đây chỉ cần biết URL nằm ở đâu.

## 4. So Sánh: Docker Local vs Bonsai Cloud Khi Học 6 Parts

| Tác vụ trong section | Docker local (`:9200`) | Bonsai cloud |
|---|---|---|
| Tạo index `wikimedia` (Part 1) | Instant | Thêm ~200–500ms latency/querry, vẫn OK |
| Poll + index từng record (Part 2) | Nhanh, log mượt | Hơi chậm do HTTPS cross-region, vẫn học được |
| Bulk 500 records (Part 5) | Lag tụt nhanh | Lag tụt chậm hơn, đừng lo — không phải code sai |
| Reset offsets / rewind (Part 6) | `down -v` hoặc 1 click Conduktor | Chỉ reset trên Conduktor/CLI, không xóa được server |
| Debug `Connection refused` | Check `docker ps`, port 9200 | Check URL copy thiếu `https://`, sai pass, cluster chưa ready |
| Chi phí | RAM local | Free quota — đừng bulk loop vô hạn |

Mẹo thực tế: nếu dùng Bonsai, ở Part 2 hãy để `auto.offset.reset=latest` (đừng để `earliest` với topic Wikimedia nhiều history) để khỏi kéo hàng chục nghìn docs qua Internet về index — tốn quota và chậm.

## 5. Pitfalls

* **Chọn Elasticsearch thay vì OpenSearch.** Lỗi version mismatch, `override.main.response.version` không cứu được. Xóa cluster tạo lại, chọn **OpenSearch 1.x**.
* **Test `GET /` quá sớm rồi kết luận "Bonsai lỗi".** Cluster mới cần 5–10 phút. Đợi, refresh, chạy lại.
* **Copy thiếu password trong URL.** URL Bonsai dài, copy thiếu 1 ký tự là Java báo `401 Unauthorized`. Copy bằng nút copy của trang, đừng gõ tay.
* **Để lộ credentials.** URL chứa user/pass full access. Không commit, không chụp màn hình public. Học xong thì regenerate.
* **Dùng Bonsai để bulk test hiệu năng.** Free tier IOPS thấp. Part 5 chỉ cần thấy "500 records/batch" là đạt, đừng benchmark so với Docker rồi kết luận code chậm.
* **Tạo 2 cluster vì tưởng cluster đầu hỏng.** Tốn quota free, dễ nhầm URL giữa 2 cluster trong code. Một cluster `KAFKA_COURSE` là đủ cả section.

## Kết Luận

Tóm một câu: **xong bài này bạn có cluster OpenSearch 1.x sống trên cloud, verify được bằng `GET /`, và cầm trong tay connection string có auth để Part 1 dùng.**

Bài tiếp theo (082) cả hai đường (Docker lẫn Bonsai) hội tụ: chúng ta luyện OpenSearch 101 — `PUT/GET/DELETE` index và document bằng tay trên Dev Tools/Console — để khi code Java gọi `IndexRequest` bạn đã hiểu nó tương đương lệnh REST nào.
