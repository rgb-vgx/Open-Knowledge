# OpenSearch Consumer Part 1: Kết Nối Client Và Tạo Index Wikimedia Bằng Java

Bài trước (082) bạn đã gõ tay `PUT /my-first-index` trên Dev Tools. Bài này biến thao tác đó thành code Java: viết `createOpenSearchClient()` chạy được cả local lẫn Bonsai, rồi tạo index `wikimedia` bằng `CreateIndexRequest`. Đây là Part 1 trong chuỗi 6 parts — chỉ lo kết nối và index, chưa đụng tới Kafka.

---

## 1. Vấn đề: Code Kết Nối OpenSearch Vì Sao Nên Copy, Không Nên Tự Mò?

Không như `KafkaConsumer` chỉ cần 3 dòng properties, `RestHighLevelClient` phải xử lý 2 kịch bản hoàn toàn khác nhau:

* Local Docker: `http://localhost:9200`, không auth, không SSL.
* Bonsai Cloud: `https://user:pass@host`, có basic auth, có SSL.

Tự viết từ đầu rất dễ sai `HttpHost`, `CredentialsProvider`, `RestClientBuilder`. Cách làm thực tế của senior: **copy block `createOpenSearchClient()` đã test, hiểu nguyên lý, đổi mỗi `connString`**. Bài này đi theo cách đó — không giấu, nhưng cũng không sa đà vào HTTP client internals vì đó không phải kiến thức Kafka.

Khung chương trình Part 1:

```mermaid
graph TB
    MAIN["main()"] --> C["createOpenSearchClient()<br/>parse connString"]
    C --> CHK["indices().exists(wikimedia)?"]
    CHK -->|chưa có| CRT["indices().create(wikimedia)"]
    CHK -->|đã có| SKIP["log: already exists"]
    CRT --> CLOSE["try-with-resources<br/>tự close client"]
    SKIP --> CLOSE
```

Part này chưa có `KafkaConsumer`. Part 2 (084) mới thêm consumer và vòng `poll()`.

## 2. Cơ Chế: `RestHighLevelClient` Bọc REST Thế Nào?

Java High Level Client là lớp bọc đồng bộ (blocking) quanh REST API bạn đã học:

| REST tay (082) | Java tương đương (Part 1) |
|---|---|
| `GET /` | `RestClient.builder(HttpHost)` + `RestHighLevelClient` |
| `GET /wikimedia` (check 200/404) | `client.indices().exists(new GetIndexRequest("wikimedia"), RequestOptions.DEFAULT)` → `boolean` |
| `PUT /wikimedia` | `client.indices().create(new CreateIndexRequest("wikimedia"), RequestOptions.DEFAULT)` |

Hai điểm Java khác REST tay:

* Mọi gọi network đều ném `IOException` (checked exception) — `main()` phải `throws IOException` hoặc try-catch.
* Client giữ connection pool — **bắt buộc close**. Cách sạch nhất là try-with-resources để dù success hay exception cũng close.

## 3. Code: Từng Đoạn Trong `OpenSearchConsumer.java`

Giả thiết bạn đã có class rỗng từ bài 079, package `io.conduktor.demos.kafka.opensearch`.

### 3.1. Connection string — một biến, hai môi trường

```java
// Docker local:
String connString = "http://localhost:9200";

// Bonsai Cloud — comment dòng trên, mở dòng dưới:
// String connString = "https://user-xxxx:pass-yyyy@host-zzz.bonsai.io";
```

Giải thích: toàn bộ hàm tạo client bên dưới chỉ đọc `connString`. Đổi môi trường là đổi một dòng này, không sửa logic. Đừng hard-code host/user/pass rải rác khắp file.

### 3.2. `createOpenSearchClient()` — parse URI rồi chọn nhánh auth

```java
public static RestHighLevelClient createOpenSearchClient(String connString) {
    URI connUri = URI.create(connString);
    String userInfo = connUri.getUserInfo(); // null nếu local, "user:pass" nếu Bonsai

    if (userInfo == null) {
        // Nhánh đơn giản: Docker local, không security
        return new RestHighLevelClient(
            RestClient.builder(new HttpHost(connUri.getHost(), connUri.getPort(), connUri.getScheme())));
    }

    // Nhánh có security: Bonsai Cloud
    String[] auth = userInfo.split(":");
    CredentialsProvider cp = new BasicCredentialsProvider();
    cp.setCredentials(AuthScope.ANY,
        new UsernamePasswordCredentials(auth[0], auth[1]));

    SSLContext sslContext = HttpClients.custom()
        .setDefaultCredentialsProvider(cp)
        .build()
        .getSSLContext(); // chi tiết SSL gom gọn ở đây

    return new RestHighLevelClient(
        RestClient.builder(new HttpHost(connUri.getHost(), connUri.getPort(), connUri.getScheme()))
            .setHttpClientConfigCallback(hacb -> hacb
                .setDefaultCredentialsProvider(cp)
                .setSSLContext(sslContext)));
}
```

Giải thích từng nhánh:

* `URI.create()` tách host/port/scheme/userInfo trong một nốt nhạc. Đừng tự `split("://")` thủ công.
* Nhánh `userInfo == null` (local): chỉ cần `HttpHost(host, port, "http")`. Đây là nhánh bạn dùng nếu theo bài 080.
* Nhánh có `userInfo` (Bonsai): tách `user:pass`, nhét vào `BasicCredentialsProvider`, gắn thêm `SSLContext` vì scheme là `https`. Phức tạp hơn 3 lần — lý do bài 080 khuyên dùng Docker khi học.

### 3.3. `main()` — tạo client, tạo index nếu chưa có, tự close

```java
Logger log = LoggerFactory.getLogger(OpenSearchConsumer.class.getSimpleName());

try (RestHighLevelClient openSearchClient = createOpenSearchClient(connString)) {

    boolean indexExists = openSearchClient.indices()
        .exists(new GetIndexRequest("wikimedia"), RequestOptions.DEFAULT);

    if (!indexExists) {
        CreateIndexRequest createIndexRequest = new CreateIndexRequest("wikimedia");
        openSearchClient.indices().create(createIndexRequest, RequestOptions.DEFAULT);
        log.info("The Wikimedia Index has been created!");
    } else {
        log.info("The Wikimedia Index already exists.");
    }

} // try-with-resources tự gọi openSearchClient.close()
```

Giải thích từng đoạn:

* `Logger` (SLF4J): từ Part này trở đi mọi quan sát đều qua `log.info`, không `System.out.println`. Log ra `_id`, số records, "offsets committed" ở các Part sau đều nhờ logger này.
* `try (RestHighLevelClient ...)` — try-with-resources. Khi khối try kết thúc (kể cả exception), `close()` tự chạy, giải phóng connection pool. Code cũ viết `openSearchClient.close()` tay ở cuối hàm rất dễ quên khi exception — đừng dùng.
* `indices().exists(GetIndexRequest)` trả `boolean`. **Bắt buộc check trước khi create**, vì create index đã tồn tại ném `ResourceAlreadyExistsException` — lần chạy đầu thì OK, chạy lại là crash. Đây chính là lỗi bạn gặp nếu bỏ bước check.
* `RequestOptions.DEFAULT` — options mặc định (headers, timeout). Mọi gọi High Level Client đều cần tham số này. Cứ truyền `DEFAULT` khi học.
* `throws IOException` phải khai trên `main()` vì cả `exists()` và `create()` đều ném checked exception.

### 3.4. Chạy thử và đọc log

Chạy lần 1 (index chưa có):

```
The Wikimedia Index has been created!
```

Chạy lần 2:

```
The Wikimedia Index already exists.
```

Nếu thấy `ResourceAlreadyExistsException` nghĩa là bạn quên bước `exists()`. Nếu thấy `Connection refused` nghĩa là OpenSearch chưa lên (`docker compose ps` / check `:9200`), không phải code sai. Đổi sang Bonsai thì đổi `connString`, chạy lại phải thấy `created` (vì cloud là cluster mới, chưa có index).

Verify bằng Dev Tools:

```
GET /wikimedia
```

Trả `200` là Part 1 đạt.

## 4. Bảng So Sánh: Hai Nhánh Client

| Tiêu chí | Local (`http://localhost:9200`) | Bonsai (`https://user:pass@host`) |
|---|---|---|
| Auth | Không, `getUserInfo() == null` | Basic auth từ URL |
| SSL | Không | Có, `SSLContext` |
| Code | ~5 dòng | ~15 dòng |
| Lỗi điển hình | `Connection refused` (container chưa lên) | `401 Unauthorized` (copy thiếu pass) |
| Khi nào dùng | Học, test bulk/replay thoải mái | Máy không chạy Docker |

## 5. Pitfalls

* **Bỏ check `exists()` rồi thắc mắc "lần 2 crash".** OpenSearch create là idempotent về ý tưởng nhưng API thì ném exception khi trùng. Luôn check trước.
* **Quên `throws IOException` / try-catch.** Java không compile. Mọi call High Level Client đều checked.
* **Không close client.** Chạy vài lần là cạn connection, IDE treo. Dùng try-with-resources như mẫu.
* **Trộn version client/server.** `opensearch-rest-high-level-client:1.2.4` đi với server `1.x`. Lấy client 2.x là constructor đổi, code mẫu vỡ.
* **Để lộ Bonsai URL lên Git.** URL chứa full-access credentials. Học xong regenerate. Dùng biến môi trường hoặc file local không commit nếu làm project thật.
* **Nhầm Dashboards `:5601` với API `:9200` trong `connString`.** Java chỉ nói với `:9200` (hoặc `:443` của Bonsai). Trỏ vào `:5601` là lỗi protocol.

## Kết Luận

Tóm một câu: **Part 1 đã có client nói được với cả local lẫn cloud, và index `wikimedia` được tạo idempotent (chạy lại không crash) với resource tự đóng.**

Bài tiếp theo (084 — Part 2) chúng ta giữ nguyên đoạn này và thêm nửa còn lại: tạo `KafkaConsumer`, `subscribe("wikimedia.recentchange")`, `poll()` từng batch và đẩy mỗi record thành một `IndexRequest` — để dữ liệu chảy end-to-end lần đầu, dù còn thô và chưa an toàn.
