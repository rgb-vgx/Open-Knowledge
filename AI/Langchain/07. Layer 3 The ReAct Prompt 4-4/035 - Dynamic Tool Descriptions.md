# 🐍 Sinh Tool Descriptions động bằng Python: "Kể chuyện" về tool cho LLM nghe

> Nguồn: `035-Generating-Dynamic-Tool-Descriptions-in-Python.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54977429)

Chúng ta đã có ReAct prompt trong tay. Giờ là lúc bắt tay vào code: mình sẽ tạo file mới, chuẩn bị phần **parse response dạng text** và **tự sinh mô tả tool động** từ chính các hàm Python.

*Phần này khá kỹ thuật, nhưng cực kỳ quan trọng để hiểu chuyện gì thật sự diễn ra under the hood — nên hãy kiên nhẫn theo mình nhé!*

### 📂 File mới và hai import "đặc biệt"

Mình tạo file mới tên **`3_raw_react_prompt`** rồi **copy-paste toàn bộ implementation** từ video trước sang. Hai import mới được thêm vào:

* **regular expressions (`re`)**: dùng để **parse raw response từ LLM** — vốn chỉ là **text thuần**. Lý do rất đơn giản: chúng ta **không còn dựa vào định dạng JSON xinh đẹp của function calling** nữa, mà phải tự "bới" trong text xem cần gọi hàm nào.
* **inspect**: dùng để lấy **metadata của các function** được dùng làm tool, để ta có thể **truyền thông tin đó cho LLM**.

Trong implementation cũ, hàm `ollama_chat_traced` đang dùng **function calling API với tool details** — mình sẽ xóa phần đó, và thay bằng một **dictionary ánh xạ tên tool → hàm tương ứng**. Đơn giản vậy thôi.

Nhưng có một vấn đề: LLM **vốn không biết gì về các hàm của chúng ta**. Ta vẫn phải **gửi mô tả về từng function** để nó có thể dùng chúng như tool. Và đây là lúc hàm mới ra đời.

---

### 🧾 get_tool_descriptions(): Tự động hóa "danh thiếp" của tool

Mình viết một hàm mới tên **`get_tool_descriptions()`**:

1. **Nhận input** là dictionary tools.
2. **Duyệt qua từng tool** bằng phương thức `items()` — key là **tool_name**, value là **function**.
3. Với mỗi function, lấy **metadata**: hàm nhận **arguments gì**, **kiểu dữ liệu** ra sao, **giá trị trả về** là gì, cùng **docstring**.
4. **Format tất cả thành string** để ta có thể **inject vào react_prompt** gửi cho LLM.

Có một **caveat nhỏ**: vì các function đều được **bọc bởi LangSmith traceable**, ta cần truy cập thuộc tính **`__wrapped__`** của mỗi hàm — đây chính là **function gốc** trước khi bị decorator "khoác áo". Nhờ vậy, ta lấy được đúng đoạn code và metadata gốc của hàm.

Để lấy metadata, mình dùng hai tiện ích:

* **`inspect.signature()`** — trả về **chữ ký của hàm**: tên hàm, các argument nhận vào, kiểu dữ liệu của chúng và kiểu giá trị trả về.
* **`inspect.getdoc()`** — lấy **docstring** của hàm, thứ sẽ giúp LLM quyết định **khi nào nên dùng hàm này**.

| Tiện ích | Lấy được gì | Dùng để làm gì |
|---|---|---|
| `inspect.signature()` | Tên hàm, arguments, kiểu dữ liệu, kiểu trả về | Mô tả cách gọi từng tool cho LLM |
| `inspect.getdoc()` | Docstring của hàm | Cho LLM biết khi nào nên dùng tool |

Cuối cùng, mình **append vào list descriptions** một string chứa đầy đủ **tool_name, signature và docstring**, được format gọn gàng. List này cuối cùng sẽ chứa **hai string** — ứng với hai tool — và mình **join tất cả thành một string lớn**, phân tách bằng **dòng mới**. Đây chính là thứ sẽ được inject vào **react_prompt**.

```mermaid
flowchart LR
    A[tools dictionary] --> B[get_tool_descriptions]
    B --> C[inspect.signature và inspect.getdoc]
    C --> D[String mô tả từng tool]
    D --> E[Join thành một string lớn]
    E --> F[Inject vào react_prompt]
```

Chạy thử và mở **Debug Console**: ta thấy ngay một **string lớn** chứa toàn bộ chi tiết hàm cùng docstring, kèm các dòng mới được nối vào. Thông tin này sẽ giúp LLM quyết định có nên gọi những tool đó hay không.

Tương tự, mình lấy **tool_names** bằng cách **duyệt qua các key** của dictionary và nối chúng bằng **dấu phẩy**. Biến này cũng cần thiết cho react_prompt.

---

### 🧩 Ghép ReAct prompt hoàn chỉnh

Mình dán **react_prompt** vào, dưới dạng **f-string**. Trong đó:

* Các **strict rules** từ implementation trước vẫn còn nguyên.
* **tool_descriptions** được plug vào vị trí tools.
* **tool_names** được plug vào vị trí action.
* **Question** — câu hỏi người dùng, ví dụ: giá laptop sau khi áp giảm giá gold.
* Các placeholder được **plug at runtime** — đó là lý do prompt cần dùng f-string.

Nhìn kỹ, các bạn sẽ thấy prompt này **giống hệt** prompt thật — chính là **prompt của implementation agent đầu tiên trong LangChain** do **Harrison Chase** tạo ra. Toàn bộ phần "Use the following format..." là **prompt engineering cực kỳ thông minh**: nó biến LLM thành **reasoning engine** biết chọn đúng tool. **Đây chính là thứ đã khởi đầu cho tất cả.**

---

### 🔄 Viết lại ollama_chat_traced: tạm biệt function calling

Hàm `ollama_chat_traced` hiện tại đang **lợi dụng function calling của Ollama** — chúng ta không muốn điều đó nữa. Ta muốn dùng **trí tuệ thuần túy (raw intelligence)** của model để làm việc này.

Vì vậy mình **viết lại** hàm:

* Vẫn giữ tên **`ollama_chat_traced`**.
* Hàm nhận **model** và **messages** — không đổi.
* Nhận thêm **options** — một số cấu hình đặc biệt cho LLM, các bạn sẽ thấy rất sớm thôi.
* Bỏ phần **tool_dict** vì ta đã có tool dictionary sẵn.
* Thay vì **system prompt** như trước, chúng ta sẽ dùng chính **ReAct prompt** làm bộ não cho agent.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao phải import `re` trong file này?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để parse raw response từ LLM — vốn chỉ là text thuần — xem cần gọi hàm nào.

Giải thích: Không còn dựa vào định dạng JSON của function calling nữa nên phải tự "bới" trong text.

Tham chiếu: Mục File mới và hai import "đặc biệt".

</details>

**Câu 2:** Vì sao cần import `inspect`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để lấy metadata của các function được dùng làm tool và truyền thông tin đó cho LLM.

Giải thích: LLM vốn không biết gì về các hàm của chúng ta, nên phải gửi mô tả về từng function.

Tham chiếu: Mục File mới và hai import "đặc biệt".

</details>

**Câu 3:** Caveat khi hàm được bọc bởi LangSmith traceable là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phải truy cập thuộc tính `__wrapped__` để lấy function gốc trước khi bị decorator "khoác áo".

Giải thích: Nhờ vậy mới lấy được đúng đoạn code và metadata gốc của hàm.

Tham chiếu: Mục get_tool_descriptions.

</details>

**Câu 4:** `get_tool_descriptions()` nhận vào và trả ra gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nhận dictionary tools, duyệt từng tool bằng `items()`, rồi append các string mô tả tool_name, signature, docstring và join thành một string lớn phân tách bằng dòng mới.

Giải thích: String lớn này được inject vào react_prompt; tool_names thì lấy bằng cách nối các key bằng dấu phẩy.

Tham chiếu: Mục get_tool_descriptions.

</details>

**Câu 5:** Vì sao phải viết lại hàm `ollama_chat_traced`?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để bỏ function calling của Ollama và chỉ còn nhận model, messages, options — dùng chính ReAct prompt làm bộ não cho agent.

Giải thích: Ta muốn dùng trí tuệ thuần túy (raw intelligence) của model thay vì lợi dụng function calling.

Tham chiếu: Mục Viết lại ollama_chat_traced: tạm biệt function calling.

</details>

Mọi thứ đang dần khớp lại thành bức tranh hoàn chỉnh. Hẹn gặp lại các bạn ở video tiếp theo, nơi chúng ta ráp toàn bộ vòng lặp agent với prompt thuần! 🚀

## Nguồn tham khảo

- [Udemy — Generating Dynamic Tool Descriptions in Python](https://ua.udemy.com/course/langchain/learn/lecture/54977429)
- [LangChain Hub — hwchase17/react](https://smith.langchain.com/hub/hwchase17/react)
- [Ollama Docs — Tool calling](https://docs.ollama.com/capabilities/tool-calling)
