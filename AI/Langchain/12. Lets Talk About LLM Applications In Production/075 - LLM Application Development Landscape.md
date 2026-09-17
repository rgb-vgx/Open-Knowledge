# 🗺️ Toàn cảnh ứng dụng LLM: Bốn mẫu bài toán mình thường thấy

Chào các bạn, Eden đây! Trong bài này, mình muốn chia sẻ **góc nhìn của mình về bức tranh toàn cảnh của các ứng dụng LLM (LLM application development landscape)** — tức là mọi ứng dụng LLM hôm nay có thể được xếp vào những nhóm nào.

Mình thích phân loại thành **bốn nhóm chính**, đi từ đơn giản đến phức tạp. Và mục tiêu của khóa học này chính là trang bị cho các bạn khả năng tự tay implement cả bốn mẫu đó.

---

### 💬 Nhóm 1: Ứng dụng chỉ gọi LLM một cách đơn giản

Đây là nhóm phổ biến nhất: ứng dụng hoặc tính năng **gửi input vào LLM, nhận phản hồi, có thể xử lý một chút rồi hiển thị cho người dùng**. Hết. Rất đơn giản, không có gì phức tạp (sophisticated), nhưng **thường mang lại rất nhiều giá trị** cho khách hàng và người dùng.

Ví dụ mình thích: một ứng dụng **tạo truyện thiếu nhi** — bạn đưa chủ đề, nó gửi vào LLM và tạo ra câu chuyện kèm tranh hoạt hình, hình ảnh. Rất hay, nhưng cách triển khai về cơ bản là khá đơn giản.

---

### 📚 Nhóm 2: Vector store + RAG (Retrieval-Augmented Generation)

Các ứng dụng nâng cao hơn sẽ tích hợp **vector store** và dùng **mẫu RAG với semantic search (tìm kiếm ngữ nghĩa)** để lấy ra những đoạn dữ liệu liên quan, phục vụ trả lời các câu hỏi rất chuyên sâu về một domain cụ thể.

Ví dụ mình rất thích là **Quiver** — còn được gọi là **"second brain" (bộ não thứ hai)**. Bạn chỉ việc "đổ" tất cả thông tin vào đó: PDF, database, video hay lịch sử chat; ứng dụng **index toàn bộ vào vector store** và dùng **RAG + semantic search** để **hỏi đáp (QA) trên chính dữ liệu của bạn**. Ý tưởng rất gọn: cứ đổ hết vào, rồi chat với nó.

---

### 🤖 Nhóm 3: Agents — khi LLM trở thành "cỗ máy suy luận"

Nếu muốn nâng độ phức tạp lên một bậc, ta tích hợp **agents (tác tử)** và tận dụng **LLM reasoning engine** để chạy **code phi tất định (non-deterministic)** — nghĩa là agent tự quyết định dùng tool nào vào thời điểm nào là phù hợp nhất.

Use case thú vị mình từng thấy: công ty bảo mật **Torq** tạo ra một agent tên **Socrates**, có nhiệm vụ **xử lý và khắc phục (resolve & remediate) các cảnh báo bảo mật bằng những bước phi tất định**. Nó đọc thông tin cảnh báo, rồi tự quyết định cách khắc phục bằng chính các công cụ bảo mật đã kết nối với nền tảng **Torq hyper automation** của họ. Một ví dụ tuyệt vời về việc dùng agents cho bài toán thực tế như cybersecurity.

---

### 🌌 Nhóm 4: Kết hợp agents + vector store = Autonomous agents

Mẫu cuối cùng là **kết hợp agents với vector store và semantic search**. Các dự án như **AutoGPT**, **GPT Engineer** dùng vector store để implement **long-term memory (bộ nhớ dài hạn)** và dùng semantic search để đạt những khả năng rất cao cấp: bắt chước hành vi con người, các agent trò chuyện và tương tác với nhau, giải những tác vụ phức tạp.

Cần nói thật lòng: **AutoGPT, GPT Engineer, Baby AGI vẫn đang ở giai đoạn rất, rất sơ khai** — họ là những người tiên phong mở đường cho cái gọi là **autonomous agents (tác tử tự trị)**.

Tóm lại, **mọi ứng dụng LLM hôm nay đều có thể xếp vào một trong bốn nhóm trên**. Mục tiêu của mình trong khóa học này là dạy các bạn tự implement những pattern đó: chúng ta đã học về agents, về vector store, cách tương tác với LLM và cả lý thuyết phía sau — để các bạn có thể ra ngoài và tự xây dựng ứng dụng của riêng mình.

Hẹn gặp các bạn ở bài tiếp theo, khi chúng ta nói về những thách thức khi đưa mọi thứ lên production! 🚀
