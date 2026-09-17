# 📥 Ingestion Pipeline: Nạp tài liệu vào ChromaDB với UnstructuredLoader

Chào các bạn, Eden đây! Như các bạn đã biết, trước khi triển khai một giải pháp RAG nâng cao, chúng ta cần **index tài liệu vào vector store** trước đã. Trong bài này, mình sẽ viết file **ingestion**: nạp các bài viết thành **LangChain Documents**, **chunk (chia nhỏ)** chúng, **embed** rồi lưu vào **ChromaDB** — open-source vector store.

### 🎯 Trọng tâm của dự án: Retrieval, không phải Ingestion

Một lời "bật mí" trước khi bắt đầu: trong một ứng dụng Gen AI — đặc biệt là ứng dụng RAG — thì **ingestion pipeline có thể được tối ưu ở rất nhiều khâu**, từ lúc load tài liệu, transform và chunk, cho đến khi embed (tùy vào model các bạn dùng).

Tuy nhiên, ở dự án này chúng ta sẽ **tập trung vào phần retrieval (truy xuất) hơn là ingestion**. Vì vậy phần ingestion mình chỉ dùng lại các thiết lập mặc định, không làm gì đặc biệt: cứ chunk tài liệu rồi nạp vào vector store. Còn ở phần retrieval, chúng ta sẽ dùng LangGraph để triển khai những **kỹ thuật truy xuất cực kỳ nâng cao**.

---

### 🌐 Chuẩn bị dữ liệu: ba bài viết về Generative AI

Đầu tiên là phần import: `load_dotenv` để nạp biến môi trường, **RecursiveCharacterTextSplitter** để chia nhỏ tài liệu, **UnstructuredLoader** để nạp tài liệu từ internet, **Chroma** làm vector store, và **OpenAIEmbeddings** cho phần embedding.

Mình cũng tạo một danh sách URL — là ba bài viết về Generative AI mà chúng ta sẽ scrape:

1. Một bài về **autonomous agents (agent tự chủ)** — bàn về memory, planning và reasoning.
2. Một bài về **prompt engineering** — với đầy đủ các kỹ thuật như zero-shot, few-shot, chain of thought, ReAct, v.v.
3. Một bài về **adversarial attacks on LLM security (tấn công đối kháng vào bảo mật LLM)** — prompt hacking và những thứ tương tự.

Sau khi load từng URL, mình nhận về một danh sách mà mỗi phần tử lại là một danh sách con chứa đúng một document. Vì vậy mình **làm phẳng (flatten)** nó bằng cách lặp qua từng sublist và lấy document bên trong. Kiểm tra bằng debugger, ta có `document_list` gồm **3 phần tử**, mỗi phần tử là một LangChain Document.

---

### ✂️ Chunk tài liệu và index vào ChromaDB

Tiếp theo, mình dùng `RecursiveCharacterTextSplitter.from_tiktoken_encoder` với **chunk size = 250** và **không overlap (không chồng lấn)**. Chạy debug, ta thấy tài liệu được chia thành **gần 200 chunks**.

Giờ thì sẵn sàng index vào ChromaDB — vector store này sẽ chạy **local trên máy của các bạn**:

```python
vectorstore = Chroma.from_documents(
    documents=chunks,
    collection_name="rag-chroma",
    embedding=OpenAIEmbeddings(),
    persist_directory="./.chroma",
)
```

Mình dùng `Chroma.from_documents` để nạp các chunk, đặt tên collection/index là **rag-chroma**, dùng **OpenAI Embeddings** (mặc định sẽ là **text-embedding-3-small**), và thêm `persist_directory` là `./.chroma` để **lưu vector store xuống ổ đĩa**.

Sau đó, mình tạo một **LangChain Retriever** từ ChromaDB bằng cách khởi tạo đối tượng Chroma (nạp từ disk với đúng collection name, persist directory và embedding function) rồi gọi `.as_retriever()` — từ đây có thể thực hiện **similarity search (tìm kiếm tương đồng)**:

```python
retriever = Chroma(
    collection_name="rag-chroma",
    persist_directory="./.chroma",
    embedding_function=OpenAIEmbeddings(),
).as_retriever()
```

Chạy chương trình: thư mục `.chroma` xuất hiện với dữ liệu persistent. Sau đó mình **comment phần index lại**, vì không muốn index lại mỗi lần chạy — chỉ cần load từ disk. Chạy lại lần nữa, mọi thứ hoạt động không lỗi.

Toàn bộ code nằm ở branch **three ingestion** trên GitHub. *Các bạn cứ thoải mái so sánh và dùng lại nhé!*

Trong bài tiếp theo, chúng ta sẽ định nghĩa **GraphState** — trái tim của graph. Hẹn gặp lại! 🚀
