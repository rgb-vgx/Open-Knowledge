# 🧩 Imports & Khởi tạo: "Nạp đạn" cho Ingestion Pipeline

Chào các bạn, Eden đây! Trong bài này, mình sẽ đi qua **các import và những class chính** dùng trong giai đoạn ingestion của RAG pipeline.

Chúng ta sẽ khai báo **biến môi trường (environment variables)** — toàn bộ API key và cấu hình cần thiết — rồi khởi tạo **TavilyMap**, **TavilyExtract**, **OpenAI embeddings** và **Pinecone vector store**. Nào, mở code ra và bắt đầu!

### 🖥️ Chạy thử boilerplate & làm quen logger.py

Code khung hiện tại đang import **asyncio** và chạy hàm `main` của chúng ta. Mình bấm nút play ở góc trên bên phải để chạy thử như một **sanity check (kiểm tra nhanh)** — mọi thứ chạy tốt!

Sau đó mình mở file **`logger.py`** đã chuẩn bị sẵn: ở đây mình định nghĩa vài **màu sắc** và các hàm in log xinh xắn để nhìn log dễ đọc hơn. Chúng ta có:
* `log_info`, `log_success`, `log_error`, `log_warning`, `log_header`.

File này sẽ được import vào `ingestion.py` để ghi lại từng bước của pipeline.

---

### 📥 Import: từ chuẩn Python đến LangChain

Đầu tiên là các import nền tảng:
* **`os`** — để đọc và dùng biến môi trường.
* **`ssl`** — tạo **SSL context** và các object type hinting.
* **`certifi`** — lấy **certificate hợp lệ** để gắn vào các HTTP request chúng ta gửi đi.
* **`dotenv`** — load biến môi trường từ file `.env`.

Tiếp theo là "đồ nghề" LangChain:
* **`RecursiveCharacterTextSplitter`** — helper class giúp chia nhỏ tài liệu (mình có hẳn một video riêng giải thích cách text splitter này hoạt động, các bạn xem khi rảnh nhé).
* **`Chroma`** (từ `langchain_chroma`) — vector store local, dùng nếu các bạn muốn index ngay trên máy.
* **Pinecone vector store** (từ `langchain_pinecone`) — vector store trên cloud, đây là cái mình sẽ dùng trong các video.
* **`Document`** — class đại diện cho một văn bản kèm metadata, là **abstraction cốt lõi** của LangChain để xử lý text: có thể được process, split, embed hoặc index.
* **`OpenAIEmbeddings`** — model embedding mình dùng, *(mình có học viên dùng embedding open-source và vẫn chạy tốt!)*.
* **`TavilyCrawl`** — "tài xế chính" giúp lấy tài liệu; kèm **TavilyExtract** và **TavilyMap** cho video optional phía sau.

Điểm hay của LangChain: **một interface duy nhất cho mọi vector store và mọi embedding model**, nên code gần như giống nhau — bạn có thể thay bằng **ChromaDB** hay bất kỳ vector store nào khác.

Cuối cùng, mình import các hàm logging từ `logger.py` của chúng ta.

---

### 🔐 Biến môi trường & SSL context

File `.env` của mình chứa:
* **OpenAI API key** — cho embeddings.
* **Pinecone API key** — cho vector store.
* **LangChain API key** kèm **`LANGCHAIN_TRACING_V2=true`** và **`LANGCHAIN_PROJECT=documentation helper`** — bộ ba này để **LangSmith** trace pipeline của chúng ta.
* **Tavily API key** — để dùng TavilyMap và TavilyExtract.

*Nhắc lại như mọi khi: tuyệt đối không chia sẻ API key của bạn. Mình sẽ thu hồi (revoke) toàn bộ key này ngay khi quay xong video!*

Sau đó mình cấu hình **SSL context** với certificate hợp lệ qua package **`certifi`** — vì chúng ta sẽ gửi **rất nhiều request** lên API, không muốn đụng phải lỗi SSL certificate kỳ lạ. Đây là kiểu **defensive programming (lập trình phòng ngừa)**.

*Mẹo nhỏ:* nếu bạn dùng máy công ty có **VPN** đang chạy mà vẫn gặp lỗi certificate, hãy thử **tắt VPN** để gửi request thành công nhé.

---

### ⚙️ Khởi tạo các class: chunk_size, retry và rate limiting

Mình khởi tạo **OpenAI embeddings** với model **`text-embedding-3-small`** và bật cờ **`show_progress_bar`** để có thanh tiến trình dễ thương khi index *(...cờ này mặc định bị tắt, mình viết ra cho các bạn biết nó tồn tại thôi!)*.

Hai tham số cực kỳ quan trọng:

**1. `chunk_size = 50`** — giới hạn số **text object / document** được embed trong **mỗi request** gửi lên OpenAI.
* Nếu để quá lớn (ví dụ **1000**): tùy **customer tier** của bạn, nhà cung cấp nào cũng có **token per limit / rate limit**, và bạn sẽ bị chặn.
* Nếu để quá nhỏ (ví dụ **1**): mọi thứ chạy chậm hơn rất nhiều.
* Đây là cách **rate limiting (giới hạn tốc độ request)** ở phía chúng ta: vừa đủ nhanh, vừa không bị "đá" ra.

**2. `retry_min_seconds`** — sau một lần batch thất bại, chờ bao lâu trước khi thử lại. Mình để **10 giây**; nếu để **60 giây** thì sau mỗi lỗi phải chờ ít nhất một phút.

Mình có show một lỗi thật từ lần chạy trước: khi chạy nhiều batch request đồng thời, một số batch bị rate limit và trả về mã **429** — kèm thông báo cho biết cần chờ bao lâu để rate limit reset (ví dụ **194 milliseconds**, **500 milliseconds**...). Đặt `retry_min_seconds` hợp lý là một **heuristic** giúp request "lọt qua" sau khi chờ đủ. Tất nhiên đây là **đánh đổi (trade-off)**: chờ lâu quá thì tổng thời gian xử lý cũng dài ra.

Rate limiting là chuyện **rất thường gặp khi đưa ứng dụng lên production và xử lý scale** — với mọi bên thứ ba chạy trên cloud. Mỗi vendor tính rate limit một kiểu, có **token bucket**, **leaky bucket** và vô số thuật toán khác. Chúng ta không đi sâu, nhưng trong ứng dụng Generative AI thì **buộc phải biết xử lý rate limiting**.

---

### 🗄️ Vector store: Chroma local hay Pinecone cloud?

Trong phần code bị comment out là khởi tạo **ChromaDB** local: **`persist_directory` = `chroma_db`** — nghĩa là DB sẽ được lưu ngay trong thư mục làm việc hiện tại của dự án, và mình truyền vào **embedding function** từ object embeddings đã tạo. Tùy bạn chọn, còn mình dùng **Pinecone** trên cloud.

Với Pinecone, mình khởi tạo vector store với tên index `langchain-index-2025`, rồi vào Pinecone tạo index mới — gọi là **`langchain-docs-2025`**:
* Embedding model: **OpenAI text-embedding-3-small**, dimension **1536** (khớp với embedding size của model).
* Chọn option **serverless** để không phải tự lo scaling.
* Cloud provider mặc định: **AWS**, region mặc định.

Index lên sóng ngay sau đó! Và mình cũng khởi tạo luôn object **TavilyCrawl** (nhận URL và lấy tài liệu về), cùng **TavilyExtract** & **TavilyMap** cho cách scraping thủ công hơn — sẽ để dành cho video optional.

*Video này khá dài rồi!* Cuối cùng, mình chạy toàn bộ code để chắc chắn mọi thứ **compile** và không có lỗi khởi tạo. Kết quả: chạy thành công, không lỗi. Tuyệt vời! Hẹn các bạn ở bài tiếp theo với Tavily Crawling nhé! 🚀
