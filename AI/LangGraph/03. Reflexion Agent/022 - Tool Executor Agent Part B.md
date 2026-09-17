# ⚡ Tool Executor thời "tiền ToolNode" (Phần B): Parse tool calls và chạy Tavily song song

Chào các bạn, mình là Eden đây! 👋 Tiếp nối Phần A, hôm nay chúng ta sẽ "đánh thức" function `execute_tools`: lôi các **search query** ra khỏi **tool call** của LLM, chạy **Tavily** song song và xem kết quả thực tế trông như thế nào.

---

### 🔍 Parse tool calls: từ JSON của LLM về dictionary

Việc đầu tiên là gọi **parser** mà mình đã implement trong file **`chains.py`** để parse ra các **tool invocation**. Parser này là một object **`JSONOutputToolsParser`**: nó nhận **tool output** từ LLM và chuyển từ **JSON** sang **dictionary**.

Vì function calling có thể trả về **nhiều** function invocation, mình gọi phương thức **`parse_tool_calls`** (số nhiều). *Tuy nhiên, trong mock message mà ta tạo ra chỉ có một function call — và khi graph chạy thật, chương trình của chúng ta cũng luôn luôn chỉ có duy nhất một function call.*

Mình khai báo thêm hai biến rỗng:

* **`ids`** — một list rỗng.
* **`tool_invocations`** — một list rỗng.

Debug để soi `parsed_tool_calls`: đó là một **list với một phần tử**, và phần tử đó là một **dictionary**. Ở key **`search_queries`** là một **list gồm 3 phần tử** — chính là 3 search query mà ta muốn chạy qua Tavily.

Mình viết một **for loop** để duyệt qua toàn bộ tool calls (ở đây chỉ có một call), lấy key **`args`** → **`search_queries`** rồi in ra như một **sanity check**:

* `AI-powered SOC startups funding`
* `AI SOC problem domain specifics`
* `technology used by AI-powered SOC startups`

---

### 🧱 ToolInvocation: "phiếu yêu cầu chạy tool" của LangChain

Giờ mình populate list **`tool_invocations`** bằng các phần tử của LangChain — những object chứa thông tin **dùng tool nào, function nào và input gì**. Cụ thể, mình append vào list một object **`ToolInvocation`** (import từ LangChain).

Mở **source code** xem thử, ta thấy object này chỉ gồm hai thứ: **`tool`** — tên tool cần chạy, và **`tool_input`** — input truyền vào.

* **`tool`** ở đây là **`tavily_search_results_json`**. *Các bạn đừng lo nếu thấy tên này lạ — mình sẽ định nghĩa tool ngay sau đây.*
* **`tool_input`** chính là **search query**.

Cuối cùng, mình append vào list **`ids`** cái id tương ứng với tool invocation này — id vốn thuộc **function call của object `AnswerQuestion`** trước đó, để ta **nối đúng tool invocation với nguồn gốc** của nó.

Chạy debug một lượt: `tool_invocations` có **3 phần tử** — cùng một tool nhưng input khác nhau là 3 search query. Còn `ids` là list chứa **3 phần tử giống hệt nhau**, đều đến từ function calling ban đầu.

---

### ⚙️ ToolExecutor và "phép thuật" thread pool

Giờ mình định nghĩa **Tavily search tool** thật sự. Biến **`search`** là object của class **`TavilySearchAPIWrapper`** — một **wrapper** bao quanh API của Tavily. Nhưng wrapper thì chưa phải tool, nên mình bọc thêm một lớp: **`TavilySearchResults`** — class nhận vào API wrapper cùng **số kết quả tối đa** mà ta muốn từ search engine.

Ngó qua implementation trong LangChain, ta thấy `TavilySearchResults` **kế thừa `BaseTool`** — nghĩa là nó đúng chuẩn một **LangChain tool** với **name** và **description**, dùng được ngay như mọi tool khác.

Việc cuối cùng: tạo object **`ToolExecutor`**. Vì sao cần nó? Bởi chúng ta sẽ có **nhiều invocation** tới Tavily API và muốn chúng chạy **song song**, chứ không tuần tự cho chậm. `ToolExecutor` có phương thức **`batch`**, nhận toàn bộ tool invocations đã gom lại và **thực thi bằng thread pool** — mọi thứ chạy song song nên nhanh hơn hẳn.

Một điểm thú vị khi mở source code: `ToolExecutor` là một object của **LangGraph**, và bản thân nó **không tự định nghĩa** `batch` — nó **thừa hưởng** từ class `Runnable`. Lục trong `Runnable`, ta thấy hàm `batch` chính là nơi các tool được invoke song song — và dòng then chốt chính là chỗ dùng **thread pool**. *Đủ rồi, quay lại code thôi!*

---

### 📦 Kết quả thực tế: 3 query, mỗi query 5 kết quả

Mình đặt breakpoint và debug lệnh gọi `batch`. Ta thấy mỗi tool invocation mang đúng **tool** cần dùng (Tavily search tool) và **input** là search query. Về output:

* Mỗi search query cho **5 kết quả** — đúng như cấu hình `max_results=5`.
* Mỗi kết quả từ Tavily gồm **URL** (nguồn gốc) và **content** (tóm tắt ngắn nội dung của URL đó).

Mình thử kiểm chứng một entry: content viết rằng **Radiant Security** — startup tại San Francisco với tham vọng hiện đại hóa SOC bằng **AI co-pilot** — đã gọi được **15 triệu USD** vốn mới. Mình copy URL ra mở thử: bài báo hoàn toàn **legit**, xuất bản từ **tháng 11 năm 2023**. Kết quả vừa nhanh vừa đáng tin!

Việc cuối cùng của function là **"massage"** lại output: biến nó thành một **list of ToolMessages**, trong đó **một `ToolMessage`** chứa cả **3 search**, mỗi search gồm **5 kết quả**. Nghe thì đơn giản, nhưng đây là phần parsing khá "khô khan" — mình sẽ để dành làm ở video tiếp theo nhé!

Chúng ta đã đi gần hết "thời kỳ tiền ToolNode"! Chỉ còn đóng gói kết quả thành `ToolMessage` nữa là xong. Hẹn gặp lại các bạn ở phần tiếp theo! 🚀
