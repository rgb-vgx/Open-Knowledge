# 🗄️ Pipeline Ingestion cho Vector Store: Từ bài viết trên web đến ChromaDB

Chào các bạn, mình là Eden đây! 👋 Như các bạn đã biết, trước khi hiện thực một giải pháp RAG nâng cao, việc đầu tiên luôn là **index tài liệu vào vector store**.

Trong video này, chúng ta sẽ viết file **ingestion.py**: load các bài viết thành **LangChain Documents**, **chunk** chúng thành những mảnh nhỏ hơn, rồi **embed** và lưu tất cả vào **ChromaDB** — vector store mã nguồn mở.

---

### ⚖️ Một lời "disclaimer" về pipeline ingestion

Trong một ứng dụng GenAI — đặc biệt là ứng dụng dựa trên RAG, và ở đây chúng ta còn làm một phiên bản RAG rất nâng cao — pipeline ingestion có thể được tối ưu ở **mọi bước**: từ lúc **load document**, **transform và chunk**, cho đến lúc **embed**, tùy vào model đang dùng.

Tuy nhiên, trong dự án này, mình chọn tập trung vào **phần retrieval** hơn là ingestion. Nên ở phần ingestion, mình đơn giản quay về **cấu hình mặc định**, không làm gì đặc biệt: chỉ chunk tài liệu rồi nạp vào vector store. Còn phần retrieval, chúng ta sẽ dùng **LangGraph** để hiện thực những kỹ thuật truy xuất rất nâng cao.

---

### 📥 Load và chunk ba bài viết

Trước hết là imports. Mình dùng **load_dotenv** để nạp biến môi trường, **recursive character text splitter** để chia nhỏ tài liệu, **unstructured loader** để load document từ Internet, **Chroma** làm vector store và **OpenAI embeddings** cho phần embedding.

Tiếp theo, mình tạo một **list các URL** để scrape. Ba bài viết bao gồm:

1. Một bài về generative AI, bàn về **autonomous agents (agent tự chủ)** cùng các chủ đề cốt lõi: **memory, planning và reasoning**.
2. Một bài về **prompt engineering**, với đầy đủ kỹ thuật: **zero-shot, few-shot, chain-of-thought, ReAct**, v.v.
3. Một bài về **adversarial attacks on LLM security** — tức prompt hacking, tấn công vào LLM.

Sau đó, mình dùng **web-based loader** để nạp từng URL thành LangChain Documents. Khi debug, mình phát hiện kết quả trả về là **một list mà mỗi phần tử lại là một list con** chỉ chứa đúng một document. Vì vậy mình viết vòng lặp để **làm phẳng (flatten)** list này — và cuối cùng thu được một **document list** gồm **3 phần tử**, mỗi phần tử là một LangChain Document.

Bước tiếp theo là **chia nhỏ tài liệu**. Mình dùng **recursive character text splitter** với **`from_tiktoken_encoder`**, đặt **chunk size = 250** và **không overlap**. Kết quả trong debug: tài liệu được chia thành rất nhiều chunk, **gần 200 mảnh**.

---

### 🧪 Index vào ChromaDB và tạo retriever

Giờ đã sẵn sàng để index vào **ChromaDB** — chạy hoàn toàn **local trên máy của chúng ta**. Mình dùng phương thức **`from_documents`** của class **Chroma**, truyền vào các chunk, đặt **collection name là RAG-Chroma**, dùng **OpenAI embeddings** (mặc định sẽ là model **text-embedding-3-small**) và khai báo **`persist_directory`** là **./.chroma** để vector store được lưu xuống đĩa sau khi index xong.

Chạy thử — và đúng như mong đợi, thư mục **.chroma** xuất hiện với dữ liệu persistent.

Điều cuối cùng: tạo một **retriever object** từ ChromaDB. Mình khởi tạo object của class **Chroma**, rồi gọi phương thức **`as_retriever()`** để biến nó thành **LangChain retriever** phục vụ **similarity search**. Mình nạp lại từ đĩa bằng collection name và persistent directory đã khai báo, kèm **embedding function**.

---

### 💾 Đừng index lại từ đầu mỗi lần chạy

Sau khi mọi thứ hoạt động, mình **comment đoạn code indexing lại**, vì chúng ta không muốn index lại từ đầu mỗi lần chạy chương trình — chỉ cần **load mọi thứ từ đĩa**. Chạy lại chương trình một lần nữa để chắc chắn không có lỗi.

Toàn bộ code nằm ở branch **3-ingestion** trên repository GitHub — các bạn cứ tự do so sánh và dùng lại nhé. *Đừng lo nếu phần ingestion này có vẻ "đơn giản quá"* — vì phần hay ho nhất, tức **retrieval với LangGraph**, vẫn đang chờ chúng ta ở phía trước. Video tiếp theo, chúng ta sẽ nói về **GraphState**. Hẹn gặp lại! 🚀
