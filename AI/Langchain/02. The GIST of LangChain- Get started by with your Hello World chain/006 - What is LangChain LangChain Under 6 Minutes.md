# Bài 006 — LangChain là gì?

> Bài học được biên soạn từ transcript "What is LangChain? LangChain Under 6 Minutes".

## Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được LangChain là gì và giải quyết vấn đề nào.
2. Giải thích tại sao xây dựng ứng dụng LLM "tay không" lại khó.
3. Kể tên và mô tả vai trò các module chính: Chat Models, Prompts, Document Loaders, Agents/Tools.
4. Hiểu vị trí của LangGraph và LangSmith trong hệ sinh thái.

---

## 1. Định nghĩa

**LangChain là một framework mã nguồn mở giúp đơn giản hoá việc xây dựng ứng dụng chạy trên nền LLM.**

Ba ý cần nhớ trong định nghĩa này:

| Từ khoá | Ý nghĩa |
|---|---|
| **Framework** | Cung cấp sẵn bộ công cụ (tools) và lớp trừu tượng (abstractions), bạn không phải tự viết từ đầu. |
| **Mã nguồn mở** | Code nằm trên GitHub — bạn đọc được phần "under the hood", gửi được pull request. |
| **LLM-powered app** | Đối tượng phục vụ là ứng dụng dùng LLM: agents, RAG, chatbot... |

**Ai dùng LangChain?** Chủ yếu là developer muốn xây ứng dụng dựa trên LLM **mà không cần biết machine learning hay cách train model**. Model được xem như một *black box*: đưa input vào, nhận output ra. Đây chính là lý do LangChain được ngành công nghiệp đón nhận rộng rãi và hiện là một trong những framework phổ biến nhất cho mảng này.

---

## 2. Vì sao cần LangChain? — Bài toán thực tế

Hãy tưởng tượng bạn muốn xây một ứng dụng trên nền một LLM mạnh (ví dụ Claude Sonnet). Yêu cầu lần lượt phát sinh:

1. **Kết hợp dữ liệu riêng của bạn** — dữ liệu mà LLM chưa từng được train: file PDF cá nhân, email, Notion database.
2. **Dựng prompt động** theo input của người dùng.
3. **Lưu lịch sử hội thoại** giữa user và AI.
4. **Đổi model** — hôm nay dùng Claude, mai muốn chuyển sang Mistral.
5. **Kết nối LLM với công cụ bên ngoài** — Google Search, hoặc gọi một API theo yêu cầu người dùng.

Danh sách này còn có thể kéo dài mãi. Kết luận:

> Xây dựng một ứng dụng LLM **không hề đơn giản** nếu tự làm. Nó gồm rất nhiều mảnh rời (moving parts) phải ghép nối và đồng bộ với nhau.

LangChain gánh phần "heavy lifting" đó, chia thành các **module**.

---

## 3. Các module chính của LangChain

### 3.1. Chat Models — trừu tượng hoá việc gọi LLM

LangChain bọc việc tương tác với LLM lại sau một **interface chung cho mọi nhà cung cấp**. Muốn dùng model nào thì chỉ cần import đúng class của model đó.

Lợi ích:

- **Đổi model "dễ như thay tất"** (switch models like we switch our socks).
- **Không bị vendor lock-in** — bạn được tách rời (decouple) khỏi nhà cung cấp LLM và có thể đổi bất cứ lúc nào.

> Đây là lợi ích kiến trúc quan trọng nhất: nhà cung cấp LLM trở thành một chi tiết cấu hình, không phải một quyết định "một đi không trở lại".

### 3.2. Prompts — quản lý prompt

Module này lo ba việc: **prompt management, optimization và serialization**.

Cách hoạt động:

1. Tạo một **prompt template** — khung prompt có chỗ trống.
2. Bơm (inject) input của người dùng vào template một cách động.
3. Kết quả là một **instance** của template — đó chính là prompt cuối cùng gửi tới LLM.

Giá trị mang lại: **composability** (khả năng lắp ghép) và tính linh hoạt khi xây ứng dụng.

### 3.3. Document Loaders — nạp dữ liệu

Cho phép nạp nhiều loại nguồn dữ liệu khác nhau: Notion database, file PDF, email... và hàng ngàn nguồn khác.

Điểm mấu chốt: dù nguồn là gì, sau khi load bạn đều nhận về **một interface thống nhất — LangChain `Document`**. Nhờ đó việc xử lý dữ liệu trước khi đẩy vào LLM trở nên dễ dàng.

```
PDF ─┐
Email ─┼──> Document Loader ──> Document (interface chung) ──> xử lý ──> LLM
Notion ─┘
```

### 3.4. Agents & Tools — hệ sinh thái agent

Đây là phần LangChain hỗ trợ toàn diện. Ý tưởng của **agentic application**:

> Tận dụng **khả năng suy luận (reasoning)** của LLM, đồng thời **trang bị cho nó các tool** mà nó có thể tự gọi.

Ví dụ tool: tìm kiếm trên internet, truy vấn database, gửi email. Nói cách khác là "cho LLM siêu năng lực", từ đó triển khai được những logic phức tạp.

LangChain cung cấp sẵn các abstraction cho việc này:

- **Tools** — định nghĩa công cụ LLM được phép gọi.
- **Agent Executor** — vòng lặp điều phối agent.
- **LangGraph** — triển khai agent dạng đồ thị (sẽ học chuyên sâu ở các section sau).

> Lưu ý tinh thần: khi gặp code snippet về agent lần đầu, **đừng sợ**. Chỉ sau vài section đầu bạn đã đủ khả năng tự viết ứng dụng agentic.

---

## 4. Bức tranh lớn: hệ sinh thái LangChain

Những gì ở trên mới chỉ là **phần nổi của tảng băng**. Khoá học sẽ đi tiếp vào:

- **Toàn bộ hệ sinh thái và stack của LangChain**, kể cả phần implementation bên trong.
- **Đưa ứng dụng LLM lên production** — kéo theo nhu cầu **tracing** và **monitoring**.
- **LangSmith** — công cụ rất tiện để debug và trace ứng dụng LLM, sẽ được dùng xuyên suốt khoá.

---

## 5. Tóm tắt một trang

| Vấn đề khi tự xây | Module LangChain giải quyết |
|---|---|
| Gọi nhiều LLM khác nhau, sợ vendor lock-in | **Chat Models** — interface chung |
| Prompt phải sinh động theo user input | **Prompts** — prompt template |
| Cần đưa dữ liệu riêng (PDF, email, Notion) vào | **Document Loaders** → `Document` |
| Muốn LLM tự gọi search / DB / email | **Tools, Agent Executor, LangGraph** |
| Không biết ứng dụng chạy sai ở đâu | **LangSmith** — tracing & debugging |

**Một câu chốt:** LangChain biến hàng loạt mảnh rời của một ứng dụng LLM thành các module có interface thống nhất, để bạn tập trung vào logic sản phẩm thay vì việc ghép nối hạ tầng.

---

## 6. Câu hỏi tự kiểm tra

1. LangChain giúp bạn tránh vấn đề *vendor lock-in* bằng cơ chế nào?
2. Prompt template khác gì so với việc nối chuỗi (string concatenation) thủ công?
3. Vì sao Document Loader trả về một interface `Document` chung lại quan trọng?
4. "Agentic application" khác gì một lời gọi LLM thông thường?
5. LangSmith phục vụ giai đoạn nào trong vòng đời ứng dụng?

<details>
<summary><b>Xem đáp án</b></summary>

**1. LangChain giúp tránh vendor lock-in bằng cơ chế nào?**

Bằng cách trừu tượng hoá việc tương tác với LLM qua **Chat Models**: mọi nhà cung cấp đều dùng **chung một interface**. Muốn đổi model, bạn chỉ cần import đúng class của model mới — phần code còn lại của ứng dụng không phải sửa. Nhờ vậy bạn được *decouple* khỏi nhà cung cấp và đổi vendor bất cứ lúc nào ("đổi model dễ như thay tất").

**2. Prompt template khác gì nối chuỗi thủ công?**

Prompt template là một **khung prompt có chỗ trống**, được LangChain quản lý như một đối tượng — không phải một chuỗi text rời rạc. Khác biệt nằm ở ba điểm mà module Prompts phụ trách: **management** (prompt là thành phần tái sử dụng được, không nằm rải rác trong code), **optimization** (tinh chỉnh ở một chỗ duy nhất), và **serialization** (lưu / nạp lại prompt). Bạn inject user input vào template để tạo ra một *instance* — chính là prompt cuối cùng gửi cho LLM. Kết quả: **composability** và tính linh hoạt, thứ mà nối chuỗi thủ công không mang lại.

**3. Vì sao Document Loader trả về interface `Document` chung lại quan trọng?**

Vì dữ liệu đầu vào rất đa dạng — PDF, email, Notion database, và hàng ngàn nguồn khác — mỗi nguồn có định dạng riêng. Nếu phải xử lý từng định dạng theo một cách khác nhau, phần code phía sau sẽ phình ra theo số lượng nguồn. Khi mọi loader đều quy về một `Document` duy nhất, **toàn bộ khâu xử lý dữ liệu phía sau chỉ cần viết một lần**, rồi mới đẩy vào LLM. Đây cũng chính là ý tưởng "interface chung" giống như ở Chat Models, chỉ khác là áp dụng cho dữ liệu.

**4. "Agentic application" khác gì một lời gọi LLM thông thường?**

Lời gọi LLM thông thường: đưa prompt vào → nhận text ra. Ứng dụng agentic thì tận dụng **khả năng suy luận (reasoning)** của LLM và **trang bị cho nó các tool mà chính nó tự quyết định gọi** — tìm kiếm internet, truy vấn database, gửi email. Tức là LLM không chỉ sinh văn bản mà còn **hành động** ra bên ngoài, cho phép triển khai logic phức tạp. LangChain hỗ trợ việc này qua các abstraction: **Tools**, **Agent Executor** và **LangGraph**.

**5. LangSmith phục vụ giai đoạn nào?**

Giai đoạn **debug và vận hành trên production**. Khi đưa ứng dụng LLM ra thực tế, ta cần **tracing** (lần theo từng bước ứng dụng đã chạy) và **monitoring** — LangSmith là công cụ làm việc đó, và sẽ được dùng xuyên suốt khoá học.

</details>

## 7. Bước tiếp theo

Bài 007 — *What are we building: LangChain Hello World Chain* — bắt đầu áp dụng những khái niệm này vào chain đầu tiên.
