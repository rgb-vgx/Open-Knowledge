# 🐍 Sinh Tool Descriptions động bằng Python: "Kể chuyện" về tool cho LLM nghe

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

Cuối cùng, mình **append vào list descriptions** một string chứa đầy đủ **tool_name, signature và docstring**, được format gọn gàng. List này cuối cùng sẽ chứa **hai string** — ứng với hai tool — và mình **join tất cả thành một string lớn**, phân tách bằng **dòng mới**. Đây chính là thứ sẽ được inject vào **react_prompt**.

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

Mọi thứ đang dần khớp lại thành bức tranh hoàn chỉnh. Hẹn gặp lại các bạn ở video tiếp theo, nơi chúng ta ráp toàn bộ vòng lặp agent với prompt thuần! 🚀
