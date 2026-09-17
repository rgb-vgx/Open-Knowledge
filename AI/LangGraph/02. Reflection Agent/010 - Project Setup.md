# 🛠️ Project Setup: Dựng môi trường cho Reflection Agent từ con số 0

> Nguồn: `010-Project-Setup.txt` · [Udemy](https://ua.udemy.com/course/langgraph/learn/lecture/43455286)

Chào các bạn, Eden đây! Trong bài này, chúng ta sẽ cùng nhau **thiết lập dự án (project setup)** cho Reflection Agent. Mục tiêu là có một môi trường thật sạch sẽ, đầy đủ dependency và API key, sẵn sàng để viết những dòng code LangGraph đầu tiên.

### 📁 Tạo thư mục dự án và môi trường ảo với Poetry

Mình bắt đầu từ Desktop, tạo một thư mục mới đặt tên là **Reflection Agent** rồi `cd` vào trong đó. Tiếp theo, mình khởi tạo môi trường Poetry bằng lệnh `poetry init` và nhấn Enter cho tất cả các câu hỏi — chỉ một lát sau là môi trường ảo đã sẵn sàng.

Sau đó, mình cài những package cần thiết cho dự án:

* `python-dotenv` — nạp các biến môi trường từ file `.env`.
* `black` — công cụ format code.
* `langchain` — framework chính của chúng ta.
* `langchain-openai` — vì chúng ta sẽ dùng model **GPT-3.5**.
* `langgraph` — "nhân vật chính" của khóa học này.

Tất cả đều được thêm vào bằng lệnh `poetry add`, và chỉ mất vài giây để Poetry cài đặt xong mọi dependency.

---

### 🧰 Mở PyCharm và trỏ vào virtual environment

Tiếp theo, mình mở **PyCharm**, chọn mở một project mới và tìm tới thư mục vừa tạo. PyCharm sẽ **tự động phát hiện môi trường ảo của Poetry** cho chúng ta.

Mình kiểm tra lại và thấy trong thư mục dự án có:

* `pyproject.toml` — file khai báo cấu hình dự án.
* `poetry.lock` — file chứa **đúng version** của tất cả các package đang dùng.

| File | Chứa gì | Vai trò |
|---|---|---|
| `pyproject.toml` | Khai báo cấu hình dự án | Nguồn khai báo dependency |
| `poetry.lock` | Đúng version của mọi package | Khóa version để cài lại chính xác |

*Đừng lo nếu PyCharm hỏi bạn chọn interpreter — cứ để nó tự nhận diện Poetry venv là được nhé.*

---

### 🔑 File `.env` — nơi cất "chìa khóa" API

Mình tạo một file `.env` ngay trong thư mục dự án. Mình giả định là các bạn đã biết cách lấy những key này rồi nhé. File `.env` sẽ chứa:

* **OpenAI API key** — để gọi model.
* **LangSmith API key** — vì chúng ta sẽ dùng **LangSmith để tracing (theo dõi luồng chạy)**.
* `LANGCHAIN_TRACING_V2=true` — bật tracing phiên bản 2.
* `LANGCHAIN_PROJECT=Reflection Agent` — đặt tên project hiển thị trên LangSmith.

---

### ✅ Sanity check: "Hello LangGraph"

Mình tạo một file Python mới làm file chính, viết boilerplate `if __name__ == "__main__"` rồi in ra dòng **"Hello LangGraph"**. Chạy thử một phát cho chắc — và mọi thứ hoạt động trơn tru.

Tiếp đó, mình import hàm `load_dotenv` từ `dotenv` và gọi nó. Hàm này sẽ lấy **toàn bộ biến môi trường từ file `.env` và nạp vào chương trình**. Mình chạy ở chế độ **debug**, mở phần đánh giá biểu thức (evaluate expression), import `os` rồi kiểm tra `os.environ["OPENAI_API_KEY"]` — giá trị đã được nạp thành công.

Cuối cùng, mình mở file `poetry.lock` để xem version các package đang dùng: **LangChain 0.1.16** và **LangGraph 0.0.38** — đều là những bản mới nhất ở thời điểm đó, đồng thời kiểm tra khai báo tương ứng trong `pyproject.toml`.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Sau khi `poetry init`, cách thêm dependency vào dự án là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Dùng lệnh `poetry add` cho từng package.

Giải thích: Poetry tự cài đặt và ghi nhận mọi dependency trong vài giây.

Tham chiếu: Mục Tạo thư mục dự án và môi trường ảo.

</details>

**Câu 2:** `python-dotenv` và hàm `load_dotenv` có tác dụng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nạp toàn bộ biến môi trường từ file `.env` vào chương trình.

Giải thích: Nhờ đó `os.environ["OPENAI_API_KEY"]` có giá trị khi chạy.

Tham chiếu: Mục Sanity check.

</details>

**Câu 3:** `LANGCHAIN_TRACING_V2=true` bật tính năng gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Bật tracing phiên bản 2 cho LangSmith.

Giải thích: Đây là một trong các biến bắt buộc để theo dõi luồng chạy.

Tham chiếu: Mục File `.env`.

</details>

**Câu 4:** `pyproject.toml` và `poetry.lock` khác nhau ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** `pyproject.toml` khai báo cấu hình và dependency, còn `poetry.lock` chứa đúng version của mọi package đang dùng.

Giải thích: Một file mô tả dự án, một file khóa version để cài lại chính xác.

Tham chiếu: Mục Mở PyCharm.

</details>

**Câu 5:** Vì sao nên chạy sanity check "Hello LangGraph" trước khi viết logic?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để xác nhận môi trường ảo và interpreter hoạt động trơn tru.

Giải thích: Chỉ khi môi trường chạy được thì boilerplate mới coi là hoàn tất.

Tham chiếu: Mục Sanity check.

</details>

Vậy là phần boilerplate đã hoàn tất: dependency đầy đủ, biến môi trường đã nạp. Giờ là lúc viết code LangGraph đầu tiên! 🚀

## Nguồn tham khảo

- [Udemy — Project Setup](https://ua.udemy.com/course/langgraph/learn/lecture/43455286)
- [Poetry Docs — Basic usage](https://python-poetry.org/docs/basic-usage/)
- [LangGraph Docs — Use the graph API](https://docs.langchain.com/oss/python/langgraph/use-graph-api)
