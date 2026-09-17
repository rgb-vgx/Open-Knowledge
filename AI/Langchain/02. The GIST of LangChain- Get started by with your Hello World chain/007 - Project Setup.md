# ⚙️ Project Setup: Dựng môi trường từ con số không (15 phút "khô khan" nhưng đáng giá!)

Chào các bạn, Eden đây! 👋 Video này sẽ hơi dài — khoảng **15 phút** — và thành thật mà nói, khởi tạo môi trường Python không phải phần thú vị nhất của khóa học.

*Nhưng đừng lo*, đây là nền móng bắt buộc để cả khóa học chạy trơn tru. Kết thúc video này, chúng ta sẽ có môi trường sẵn sàng để viết chain LangChain đầu tiên. Cùng đi từng bước nhé!

---

### 📦 Clone repo và tạo branch riêng

1. **Clone repo khóa học:** Link repo được đính kèm trong **Resources** của video và có cả trong phần Introduction. Toàn bộ code chúng ta viết đều nằm trong repo này.
2. **Đúng commit cho từng video:** mình sẽ đính kèm link tới chính xác commit code của mỗi video, để bạn có y nguyên đoạn code mình đang chạy.
3. **Chọn IDE:** mình dùng **Cursor** trong vài video đầu, nhưng bạn dùng gì cũng được — **PyCharm**, **VSCode**, thậm chí **vim** nếu bạn thật sự dũng cảm. Chúng ta chỉ dùng những chức năng cơ bản: chạy và debug code.
4. **Tạo branch mới:** mình dùng `git checkout --orphan` để tạo branch tên `project/hello-world`. Cờ `--orphan` tạo ra branch **không có lịch sử commit** — bắt đầu hoàn toàn mới, không dính dáng gì tới các commit cũ. Lưu ý: khi bạn clone repo, branch này **có thể đã tồn tại**, nên hãy đặt tên khác một chút, ví dụ `hello-world-1`.
5. **Dọn sạch:** dùng `git rm -rf` để xoá hết file trong thư mục — chúng ta thật sự bắt đầu từ con số không.

*(Fun fact: khóa học này được ghi hình từ thời Cursor chưa ra đời, nên mình dùng PyCharm cho phần lớn video.)*

---

### ⚡ UV — package manager "nhanh như chớp"

**UV** là một Python package manager cực nhanh, giống `pip` nhưng nhanh hơn nhiều vì được xây trên **Rust**. Nó xử lý việc cài đặt, resolve và chạy dependency rất hiệu quả, đồng thời quản lý luôn các **môi trường ảo (isolated environments)** cho dự án.

* Nếu máy chưa có UV, chỉ cần chạy `pip3 install uv`.
* `uv init` — khởi tạo project Python mới: tạo file `main.py` với code boilerplate "hello world" và file `pyproject.toml` chứa danh sách package.
* `uv add langchain` — cài **LangChain** và tạo luôn **virtual environment** cho project.
* `uv add langchain-openai` — cài **integration package** dành riêng cho OpenAI.
* `uv add python-dotenv` — nạp biến môi trường từ file `.env`, giúp quản lý API key cực nhàn.
* `uv add black` — formatter giúp code luôn gọn gàng.

Chạy thử file `main.py` bằng nút play, bạn sẽ thấy dòng hello được in ra kèm tên **virtual environment** trong dấu ngoặc đơn — xác nhận code đang chạy đúng trong môi trường ảo của project.

**Vì sao `langchain-openai` lại là package riêng?** LangChain đã tách các **provider** (dịch vụ bên thứ ba) thành những package độc lập để mỗi vendor tự bảo trì phần của mình. Ai chỉ dùng OpenAI thì không cần tải về cả trăm provider khác. Trước đây mọi thứ từng được gộp chung, nhưng ở một bản release họ đã tách ra — thiết kế này cực hợp lý vì mọi thứ được **decoupled** rõ ràng.

*Bạn có thể dùng `poetry`, `pipenv` hay bất kỳ package manager nào khác* — khóa học cũng sẽ dùng **poetry** trong một số project. Nhu cầu của chúng ta chỉ là: cài package, tạo môi trường ảo và chạy code.

Mở `pyproject.toml`, bạn sẽ thấy toàn bộ package cùng version đã cài. Khi bạn chạy code, bạn sẽ có version **mới hơn** — mình sẽ cập nhật code trên GitHub và cả video nếu API thay đổi, nên nếu thấy lệch, cứ báo mình nhé (mình đã quay lại khóa này 3-4 lần nên quen lắm rồi!).

---

### 🔐 .gitignore, .env và bài học bảo mật API key

* Tạo file **`.gitignore`** chuẩn cho project Python: có rất nhiều thứ **không nên commit** — đặc biệt là **API key** và thư mục **venv**. (Khi tạo project mới trên GitHub, bạn có thể để GitHub sinh file này tự động.) Sau đó bạn sẽ thấy thư mục venv bị "làm mờ" đi, nghĩa là git không track nó nữa.
* Tạo file **`.env`** chứa toàn bộ biến môi trường và API key:
  1. Với **OpenAI**: vào **platform.openai.com**, tạo API key (mình đặt tên là `langchain-course`) và dán vào biến **`OPENAI_API_KEY`**.
  2. Tên biến phải **chính xác tuyệt đối**, vì LangChain sẽ tìm đúng biến này khi gửi request tới OpenAI API.
  3. **OpenAI không miễn phí** — bạn cần nạp credit trước. Nếu không có thẻ, bạn sẽ gặp lỗi **429** và không dùng được API.
  4. **Mẹo hay:** hãy đặt **budget limit** để giới hạn mức sử dụng — lỡ key bị rò rỉ thì bạn cũng không bị "cháy ví".

**Đừng bao giờ chia sẻ API key của bạn — nó giống như mật khẩu vậy.** Trên đời có những kẻ xấu chuyên quét các file và biến môi trường trên GitHub để tìm key rồi lạm dụng. Bạn chắc chắn không muốn bị tính một hoá đơn khổng lồ chỉ vì vô tình commit key lên repo. Mình cam kết các key xuất hiện trong video sẽ được **thu hồi ngay sau khi quay xong**.

*Nếu bạn dùng LLM khác:*

* **Gemini của Google:** vào **Google AI Studio** tạo API key, đặt vào biến **`GOOGLE_API_KEY`** và cài integration package **langchain-google-genai** (khóa học sẽ không demo phần này).
* **Model chạy local:** cài package **langchain-ollama** — chúng ta sẽ dùng nó ngay trong section này.

Ngoài ra, mình cũng có một video trong section này liệt kê **LLM nào có thể dùng cho từng project** cụ thể, để bạn luôn biết mình có những lựa chọn nào.

---

### ✅ Kiểm tra lại và commit

Giờ hãy viết code để kiểm tra "phép màu" của `python-dotenv`:

```python
from dotenv import load_dotenv
import os

load_dotenv()
print(os.environ.get("OPENAI_API_KEY"))
```

`load_dotenv()` sẽ tìm file `.env`, lấy toàn bộ biến môi trường trong đó và nạp giá trị vào môi trường chạy. Chạy đoạn code trên, bạn sẽ thấy giá trị API key hiện ra → mọi thứ đều "okey dokey".

Cuối cùng:

1. Xoá đoạn code kiểm tra, chạy **black** để format code và **isort** để sắp xếp import.
2. `git add` toàn bộ file, commit với message **environment setup** rồi push lên remote repository.
3. Vào repo, tìm branch **hello world** và xem danh sách commit — commit đầu tiên "environment setup" chứa toàn bộ code chúng ta vừa viết. Link trực tiếp sẽ có trong Resources của video.

Vậy là môi trường đã sẵn sàng! Ở video tiếp theo, chúng ta sẽ chính thức viết chain LangChain đầu tiên nhé! 🚀
