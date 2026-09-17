# 🕵️ Kiến trúc lõi của AI Agent: bóc từng lớp "ma thuật" (Layer 0 → Layer 3)

Chào các bạn, Eden đây! Đây là section **mình thích nhất trong toàn bộ khóa học** — vì chúng ta sẽ lấy các abstraction của LangChain và **bóc từng lớp một**, cho đến khi nhìn thấy tường tận agent chạy như thế nào.

Mục tiêu rất rõ ràng: sau section này, bạn sẽ có **hiểu biết sâu nhất có thể về AI agent**. Khi tự xây agent cho dự án thật, bạn sẽ biết chính xác chuyện gì đang diễn ra bên dưới.

---

### 📦 Layer 0: abstraction create_agent

Những gì chúng ta làm đến giờ là **layer zero**. Ở tầng này, chúng ta dùng **`create_agent`** — LangChain làm mọi thứ, còn chúng ta... không biết gì về bên trong cả.

Ta chỉ đưa **model**, đưa **tools** (như Tavily search tool), và — bùm — có ngay một agent biết gọi tool. Tiện lợi, nhưng đúng là một **hộp đen**.

Từ đây, ta sẽ bóc dần từng lớp.

---

### 🔁 Layer 1: tự tay viết agent loop bằng LangChain primitives

Việc đầu tiên: tự hiện thực **agent loop** — một **`while` loop chạy liên tục** cho đến khi agent hoàn thành nhiệm vụ, dựa trên **function calling**.

Phiên bản này vẫn dùng các abstraction của LangChain để đỡ phải viết **boilerplate code (code khuôn mẫu lặp đi lặp lại)**, cụ thể là những "đồ nghề" quen thuộc:

* **`tool`** — decorator tạo công cụ.
* **`bind_tools`** — gắn danh sách tool vào chat model.
* **ChatModel** — model đảm nhiệm phần suy luận.
* **`ToolMessage`** — cấu trúc dữ liệu cho kết quả thực thi tool.

Sau khi viết xong vòng lặp, ta tiếp tục bóc lớp tiếp theo: **từng abstraction này hoạt động ra sao, làm gì, và vì sao cần chúng?**

---

### 🧱 Layer 2: function calling "thuần" — không framework

Ở tầng này, ta viết lại **đúng agent loop đó** với function calling, nhưng **hoàn toàn không dùng framework**: mọi thứ **raw**, tự tay viết **toàn bộ JSON schema**.

Chính tại đây bạn sẽ **thấy rõ giá trị của LangChain**:

* Toàn bộ những việc LangChain âm thầm làm giúp ta sẽ hiện nguyên hình.
* Ta hiểu được vì sao một **interface duy nhất** và khả năng **chuyển đổi giữa các model** lại quý giá đến vậy.

Điều này mang lại **khả năng tùy biến và độ linh hoạt tối đa** khi xây agent — thứ luôn cần cho môi trường production. Bởi khi một model mới xuất hiện, bạn muốn **đổi sang nó với thay đổi code ít nhất có thể**.

---

### 🧪 Layer 3: ReAct prompt, regex và scratchpad — bản "nguyên thủy"

Lớp cuối cùng (và cũng sâu nhất): hiểu **function calling vận hành thế nào bên dưới** bằng cách tự viết một agent **không có cả function calling** — chỉ với:

* Một **ReAct prompt**.
* **Regular expressions (biểu thức chính quy)**.
* Một **scratchpad (bản nháp ghi lại diễn biến)**.

Đây là cách agent được hiện thực **khi chúng mới ra đời**, nên bạn sẽ thấy vì sao **từng lớp abstraction là cần thiết**.

Một lưu ý quan trọng: trong section này mình dùng **Ollama** để chạy model **open-weight như Qwen**, thỉnh thoảng dùng **OpenAI**, nhưng bạn có thể dùng bất kỳ model nào **hỗ trợ function calling**.

Và điều mình muốn nhấn mạnh nhất: **hãy học hands-on!**

Toàn bộ code có trên **GitHub** (mình để link trong Resources). Đừng chỉ xem — hãy **gõ code, chạy code, đọc trace**, làm y như mình làm. Chỉ khi tự tay làm, bạn mới thấy hết "ma thuật" và có được hiểu biết sâu sắc nhất. Hẹn gặp các bạn ở bài đầu tiên của hành trình này! 🚀
