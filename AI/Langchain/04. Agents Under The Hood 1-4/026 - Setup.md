# 🛠️ Setup môi trường cho "Agents Under The Hood" (uv + Ollama + Qwen)

> Nguồn: `026-Setup.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54804829)

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

| Lệnh | Công dụng |
|---|---|
| `ollama list` | Xem các model đang có trên máy |
| `ollama pull <tên-model>` | Tải model về local |
| `ollama run <tên-model>` | Chạy thử model trong CLI, gõ `/bye` để thoát |
| `ollama serve` | Bật Ollama server cho ứng dụng Python gọi vào |

---

### 🏁 Sẵn sàng cho Layer 1

Vậy là xong phần setup: **Ollama đang chạy với model local**, **biến môi trường đầy đủ**, **dependencies đã cài**.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Code khởi đầu của section nằm ở branch nào, có gì đặc biệt?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Branch `project/agents-under-the-hood` — hiện có đúng một commit khởi đầu với nội dung "hello start".

Giải thích: Trong repo lúc này chỉ có file `.gitignore`, ta tạo branch mới từ commit đó.

Tham chiếu: Mục Lấy code khởi đầu từ branch.

</details>

**Câu 2:** Vì sao cài `langchain-openai` dù chạy model local bằng Ollama?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì cuối section sẽ đổi model; hơn nữa bạn có thể dùng bất kỳ vendor nào miễn model hỗ trợ function calling.

Giải thích: Khóa học muốn chứng minh khả năng chuyển đổi giữa các model.

Tham chiếu: Mục Cài đặt dependencies.

</details>

**Câu 3:** Vì sao Ollama không cần API key?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mọi thứ chạy ngay trên máy bạn.

Giải thích: Chỉ `OPENAI_API_KEY` và `LANGSMITH_API_KEY` cần thiết, và cả hai sẽ được thu hồi trước khi bạn xem video.

Tham chiếu: Mục Cài đặt dependencies.

</details>

**Câu 4:** Vì sao chọn Qwen3 bản 1,7 tỷ tham số?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bản 0,6 tỷ tham số chạy không tốt lắm, còn bản 1,7 tỷ vẫn nhẹ — khoảng 1,4 GB — và hỗ trợ function calling.

Giải thích: Function calling là điều kiện tiên quyết cho khóa học này.

Tham chiếu: Mục Tải model open-weight.

</details>

**Câu 5:** Lệnh nào để ứng dụng Python gọi được model local?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `ollama serve` — chạy Ollama server.

Giải thích: Còn `ollama list` để xem model, `ollama pull` để tải và `ollama run` để chạy thử trong CLI.

Tham chiếu: Mục Tải model open-weight.

</details>

Ở bài tiếp theo, chúng ta bắt đầu xây **layer số 1** — tự tay hiện thực **agent loop** bằng **function calling** và các **LangChain primitives**. Hẹn gặp các bạn ngay ở đó! 🚀

## Nguồn tham khảo

- [Udemy — Setup](https://ua.udemy.com/course/langchain/learn/lecture/54804829)
- [Ollama Docs](https://docs.ollama.com/)
- [GitHub — ollama/ollama](https://github.com/ollama/ollama)
