# 🛠️ Setup môi trường cho "Agents Under The Hood" (uv + Ollama + Qwen)

Chào các bạn, Eden đây! Trước khi bước vào section thú vị nhất khóa học, chúng ta cùng nhau **dựng đầy đủ môi trường** để chạy code nhé.

Bài này khá nhiều thao tác nhưng đều quen thuộc — và khác biệt lớn nhất so với các section trước là chúng ta sẽ **chạy model ngay trên máy của mình**.

---

### 🌿 Lấy code khởi đầu từ branch

Toàn bộ code của section nằm ở branch **`project/agents-under-the-hood`**. Branch này hiện có **đúng một commit** — commit khởi đầu — với nội dung chỉ là **`hello start`** kèm **commit hash**.

Ở IDE, mình tạo branch mới từ commit đó bằng lệnh dạng `git checkout -b <tên-branch> <commit-hash>`. *(Trong video mình gặp một lỗi nhỏ: vì đang đứng sẵn ở commit đó nên lệnh báo lỗi — không có gì nghiêm trọng cả.)* Trong repo lúc này chỉ có file **`.gitignore`**.

---

### 📦 Cài đặt dependencies và biến môi trường

Khởi tạo dự án với **`uv init`**, rồi **xóa file `main.py`** mặc định (chúng ta không cần nó), sau đó cài các package bằng `uv add`:

* **`langchain`** — nền tảng chính.
* **`langchain-ollama`** — để dùng **open-weight model chạy local** trên máy bạn.
* **`langchain-openai`** — vì cuối section chúng ta sẽ **đổi model**; hơn nữa, bạn có thể dùng **bất kỳ vendor nào miễn model hỗ trợ function calling**.
* **`python-dotenv`** — nạp biến môi trường.
* **`black`** và **`isort`** — format code.

Sau khi cài, **`pyproject.toml`** được cập nhật phiên bản và dependencies, còn **`uv.lock`** giữ **phiên bản chính xác**.

Tiếp theo, tạo file **`.env`** với các biến môi trường cần thiết:

* **`OPENAI_API_KEY`** — để dùng model OpenAI. *Đừng lo, key này sẽ được thu hồi trước khi bạn xem video.*
* **`LANGSMITH_API_KEY`** — cũng sẽ được thu hồi.
* **Project LangSmith** đặt tên là **"ReAct Under The Hood"** và **bật tracing** để xem được các lần chạy agent cho dễ hiểu.

Lưu ý: **Ollama không cần API key** vì mọi thứ chạy **ngay trên máy bạn**. Xong phần env thì mình **commit** với message *Env setup* và **push** lên GitHub — bạn có thể refresh để thấy commit mới trong repo.

---

### 🐑 Tải model open-weight bằng Ollama

Giờ đến phần hay: tải model **open weight** về máy bằng **Ollama**. Vào **ollama.com**, tìm model chúng ta sẽ dùng: **Qwen**.

Mình chọn Qwen vì đây là model **nhẹ**, lại **hỗ trợ function calling** — điều kiện tiên quyết cho khóa học này. *Một lần nữa: bạn có thể dùng bất kỳ model nào hỗ trợ function calling — không nhất thiết open-weight, có thể là OpenAI, Anthropic hay Gemini.*

Ở trang model, mình chọn **Qwen3** — thế hệ mới nhất trong dòng Qwen, cung cấp bộ model **dense và mixture-of-experts** đa dạng, có hỗ trợ **tool calling**. Mình tải bản **1,7 tỷ tham số**, nặng khoảng **1,4 GB**. Lý do: trước đó mình thử bản **0,6 tỷ tham số** nhưng chạy **không tốt lắm**, nên chọn bản mạnh hơn một chút mà vẫn nhẹ về dung lượng.

Các lệnh cần nhớ:

1. **`ollama list`** — xem các model đang có local.
2. **`ollama pull <tên-model>`** — tải model về (thời gian tùy tốc độ mạng).
3. **`ollama run <tên-model>`** — chạy thử trong CLI, chat vài câu cho chắc rồi gõ **`/bye`** để thoát.
4. **`ollama serve`** — chạy **Ollama server** để ứng dụng Python của chúng ta gọi được model local.

---

### 🏁 Sẵn sàng cho Layer 1

Vậy là xong phần setup: **Ollama đang chạy với model local**, **biến môi trường đầy đủ**, **dependencies đã cài**.

Ở bài tiếp theo, chúng ta bắt đầu xây **layer số 1** — tự tay hiện thực **agent loop** bằng **function calling** và các **LangChain primitives**. Hẹn gặp các bạn ngay ở đó! 🚀
