# 🕵️ [Optional] Crawling Deep Dive: Map + Extract, batch processing và xử lý rate limit

Chào các bạn, Eden đây! Đây là video **optional (tùy chọn)**, dành cho những ai muốn đi sâu hơn vào crawling và scraping.

Như mình đã chỉ trong bài trước, **TavilyCrawl** là lựa chọn khuyên dùng cho hầu hết trường hợp: đưa nó một URL, nó tự map toàn bộ site, scrape mọi thứ trong sitemap và cho phép lọc chính xác thứ bạn cần bằng **ngôn ngữ tự nhiên** — ví dụ "chỉ lấy cho tôi mọi thứ về agents". Tuy nhiên, đôi khi ta muốn **kiểm soát từng bước**, tùy biến quy trình, hoặc đi **thật sâu** vào một phần nào đó của website. Khi đó hãy dùng **TavilyMap + TavilyExtract**.

Video này hơi "nâng cao" một chút, và **hoàn toàn không bắt buộc**. Nội dung gồm: map sitemap để lấy toàn bộ URL, scrape từng URL bằng TavilyExtract, chạy **đồng thời**, cùng các chiến lược **batch processing** và **xử lý rate limiting**.

*Mẹo học:* vì video khá dài, mình khuyên các bạn **xem trước một lượt**, rồi hãy tự làm. Và không cần gõ lại từ đầu — cứ **copy snippet từ repository** mà mình để trong phần tài nguyên nhé!

### 🪵 Bắt đầu với log và TavilyMap

Đầu tiên là vài dòng log cho đẹp: `log_header("Documentation ingestion pipeline")` và `log_info("Starting to map documentation structure from", <URL tài liệu LangChain>)` — chữ màu tím cho nổi.

Mình gọi **TavilyMap** bằng `invoke` (đây là **wrapper biến API của Tavily thành LangChain tool**). Kết quả lưu vào biến **`sitemap`** — một dictionary, trong đó danh sách URL nằm ở key **`results`**. Mình đặt breakpoint chạy **debug mode** để "mổ xẻ" object: log header hiện ra, chờ vài giây, rồi `sitemap` cho thấy **500 URL** tài liệu — mình log lại con số này.

---

### 🧺 Batch processing: hai tầng song song

Với tài liệu, mình không muốn gọi API từng URL một. **TavilyExtract** hỗ trợ **nhận cả danh sách URL trong một API call**, nên chiến lược là:

1. Từ danh sách URL lớn, cắt thành **các batch URL**.
2. Mỗi batch = **một request extract**.
3. Các batch được **bắn đồng thời**.

Vậy là ta có **hai tầng xử lý song song**:
* **Tầng API**: Tavily hỗ trợ xử lý song song phía họ — mình chỉ cần gửi đúng lượng URL theo tài liệu của họ, điều khiển qua **batch size**.
* **Tầng phía chúng ta**: tự bắn các request **bất đồng bộ** — đây là ví dụ kinh điển của **I/O bound operations (tác vụ chờ I/O)**, ngồi chờ API trả về.

Kỹ thuật này giúp lấy tài liệu **"trong nháy mắt"**. Tin mình đi: hồi trước, khi tải thủ công và **không chạy đồng thời**, mình mất **cả mấy giờ đồng hồ**.

Hàm **`chunk_urls`** nhận danh sách URL và `chunk_size`, trả về danh sách mà mỗi phần tử là một batch URL — code Python khá cơ bản, mình đã giới thiệu trong notebook bài trước. Mình gọi nó với **chunk_size = 20** và nhận về **25 batch**. *Nhớ đừng để chunk_size quá lớn*, nếu không API sẽ từ chối vì bạn gửi quá nhiều URL một lúc!

---

### 🧵 extract_batch, async_extract và asyncio.gather

Mình viết **coroutine `extract_batch`** nhận vào một batch URL và **số thứ tự batch** — cần số này cho **observability (khả năng quan sát)** qua log:

* Log bắt đầu xử lý batch số mấy, với bao nhiêu URL.
* `await` phương thức **`ainvoke`** của TavilyExtract — thao tác **non-blocking**, chạy đồng thời, I/O bound.
* Input gửi đi là dictionary có field **`urls`** — đúng format Tavily mong đợi.
* Nếu không có ngoại lệ: log thành công, log số URL đã extract và trả kết quả.

Tiếp đó là **coroutine `async_extract`** — "nhạc trưởng" chạy tất cả batch đồng thời:

1. Log khởi động.
2. **`enumerate`** qua các batch, tạo coroutine cho mỗi batch và lưu vào biến **`tasks`**. *Lưu ý:* lúc này chúng **chưa thực sự chạy** — vì mình chưa `await` các expression đó.
3. Gọi **`asyncio.gather`** để `await` mọi coroutine trong danh sách — tất cả chạy **bất đồng bộ**, và mình chờ đến khi **tất cả** hoàn thành. Toàn bộ tài liệu nằm trong biến **`results`**.

Sau đó mình duyệt từng phần tử trong `results` — mỗi phần tử hoặc là một **dictionary** chứa nội dung đã extract (URL + `raw_content`), hoặc là một **exception (lỗi)** báo batch thất bại:

* Nếu là exception: **log error** và tăng biến đếm **`failed_batches`**.
* Nếu hợp lệ: với mỗi phần tử trong batch, tạo một **LangChain Document** với nội dung trang, và **metadata** chứa key **`source`** là **URL gốc** — để luôn biết nội dung nào đến từ trang nào.

Kết thúc, mình log thành công/thất bại rồi **return `all_pages`** — danh sách **LangChain Document** chứa toàn bộ tài liệu LangChain.

*Mình biết nhìn code suông thì hơi khó hình dung*, nên lúc chạy debug mình sẽ "mổ" từng object cho các bạn xem.

---

### 🐞 Chạy debug: 25 batch và "first come first go"

Trong hàm `main`, mình `await async_extract(url_batches)` và lưu kết quả vào **`all_docs`** (danh sách đã được làm phẳng). Breakpoint đặt sẵn, chạy debug:

* Log cho thấy **25 batch** được "khai hỏa".
* Kết quả **stream về liên tục** và **không theo thứ tự** — **"first come first go"**, batch nào xong trước trả trước, đúng chất bất đồng bộ.
* Chạy xong, soi biến **`all_docs`**: mỗi **LangChain Document** gồm `source` (URL gốc) và nội dung trang.

Một phát hiện thú vị: có document ghi **"Page not found"** — nghĩa là mình lấy nhầm URL, hoặc URL đó **không còn tồn tại**. Một document khác là trang tài liệu **LangChain Expression Language** — trông ổn áp! Và đến đây thì chúng ta đã sẵn sàng cho bước tiếp theo: **chunking** và index vào **vector store**.

Nào, cùng đi tiếp hành trình RAG nhé! 🚀
