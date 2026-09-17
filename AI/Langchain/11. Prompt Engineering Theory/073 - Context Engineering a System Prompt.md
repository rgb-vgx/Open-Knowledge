# 🧩 Context Engineering cho System Prompt: Bài học từ "vùng Goldilocks"

> Nguồn: `073-Context-Engineering-a-System-Prompt.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/52803023)

Hey các bạn, Eden đây! Nếu bạn từng lướt Twitter hay LinkedIn, chắc hẳn đã đọc câu này cả nghìn lần: **"system prompt rất quan trọng, hãy chăm chút và lặp đi lặp lại cho nó thật tốt"**. Thú thật, nói "system prompt quan trọng" là lời khuyên **chung chung nhất trong AI engineering**.

Nên hôm nay, thay vì nhắc lại điều đó, mình muốn **cho các bạn xem tận mắt** system prompt của những **state-of-the-art agent** đang chạy ngoài kia — và rút ra bài học để tự viết nên một system prompt chất lượng.

---

### 🗂️ Nhìn vào "phòng thí nghiệm" thật của các agent hàng đầu

Có một **repository (kho mã nguồn)** tổng hợp **system prompt bị rò rỉ (leaked) của tất cả các agent nổi tiếng** hiện nay.

Phần lớn trong số đó là coding agent: **Claude Code, Cursor, Devin**; bạn cũng có thể tìm thấy những agent khác như **Comet assistant trong trình duyệt Comet của Perplexity**.

Tại thời điểm quay video, repository này đã có **gần 90.000 sao (stars)** — cực kỳ phổ biến!

Những gì mình thấy khi lật mở chúng:

* **Claude Code:** system prompt dài **gần 200 dòng**, bao gồm toàn bộ **mô tả các tool** — riêng phần này đã khoảng **500 từ**, tất cả được **inject (nhúng) vào system prompt**.
* **Cursor agent:** prompt cũng **khoảng 200 dòng**, với cấu trúc rõ ràng.
* **Devin:** prompt lên tới **400 dòng**.

Mục tiêu của mình không phải mổ xẻ từng prompt và liệt kê mọi kỹ thuật (số lượng đó đủ cho cả một khóa học riêng).

Điểm mình muốn bạn thấy: **system prompt thực sự quan trọng**, và repository này được **cập nhật liên tục** vì system prompt luôn **tiến hóa** — LLM tiến hóa mỗi ngày thì system prompt cũng vậy. Rất nhiều nguồn lực engineering đang liên tục **curate (chăm chút)** để biến chúng ngày càng tốt hơn. Đây là **một quá trình lặp đi lặp lại (iterative process)**.

---

### 🗺️ Phép so sánh: System prompt giống như việc chỉ đường

Mình rất thích ví von system prompt với việc **chỉ đường cho ai đó đi đến một nơi**.

* Nếu bạn nói *"đi đằng kia đi"* — họ sẽ **bối rối**, không biết phải đi đâu.
* Nếu bạn đưa họ một **cuốn cẩm nang 50 trang** với từng ngã rẽ, từng con phố — bạn **làm họ ngộp thông tin**, và cũng chẳng đến được nơi cần đến.

Điều chúng ta muốn: **rõ ràng, cụ thể, và cung cấp vừa đủ thông tin** để đi tới đích. Nhưng đây mới là phần khó: phải tìm cho được **điểm ngọt (sweet spot)**.

Khi viết system prompt, chúng ta hướng đến cái mà **Anthropic gọi là "Goldilocks zone"** — **không quá mơ hồ, không quá chi tiết, mà vừa đúng tầm**.

Trên thang đo: tận cùng bên trái là **quá cụ thể (too specific)**, tận cùng bên phải là **quá mơ hồ (too vague)** — ta muốn đứng ở **chính giữa**.

---

### ⚠️ Hai thái cực cần tránh

**1. Prompt quá cụ thể (bên trái):**

Vấn đề cốt lõi: ta đang **đối xử với LLM như một cỗ máy trạng thái tất định (deterministic state machine)** thay vì một **intelligent agent**, và **hard-code logic** vào prompt.

Ví dụ kiểu: *"nếu ý định của người dùng là xử lý sự cố, hãy hỏi đúng 3 câu hỏi tiếp theo"* — nhưng tại sao phải **đúng 3 câu**? Nếu 2 câu là đủ thì sao? Hoặc cần tới 5 câu thì sao?

Prompt kiểu này còn **liệt kê triệt để (exhaustive enumeration)** mọi kịch bản escalation có thể xảy ra — điều **bất khả thi** để hoàn thiện — và **ép model đi theo những lối mòn định sẵn** có thể không khớp với thực tế đầu vào.

Nó còn là **cơn ác mộng bảo trì**: mỗi edge case mới lại phải sửa prompt. Và nếu ta đã có các bước định sẵn, có thể **một agent tự trị chẳng phải là câu trả lời** — biết đâu ta chỉ cần một **workflow truyền thống**.

**2. Prompt quá mơ hồ (bên phải):**

Vấn đề cốt lõi: **không đủ tín hiệu để hành vi nhất quán**.

Ví dụ: *"hỗ trợ theo cách phù hợp với các nguyên tắc và tinh thần thương hiệu của công ty"* — **những nguyên tắc đó là gì?** Prompt này **giả định sai rằng có một ngữ cảnh chung** (shared context): nó cho rằng model biết về tiệm bánh và biết các chuẩn mực chăm sóc khách hàng — trong khi thực tế là không.

Nó cũng có **ranh giới không xác định**: *"escalate lên người thật nếu cần thiết"* — **khi nào mới là cần thiết?** Model phải tự đoán.

Không có framework, không có cấu trúc để tiếp cận vấn đề một cách hệ thống → dẫn đến **hành vi bất nhất quán**: mỗi lần chạy sẽ cho ra những cách giải quyết khác nhau một trời một vực cho cùng một vấn đề.

Vấn đề lớn nhất: nó cơ bản chỉ nói *"hãy làm điều đúng đắn"* mà **không định nghĩa "đúng" là gì** trong ngữ cảnh.

| Tiêu chí | Quá cụ thể | Vùng Goldilocks | Quá mơ hồ |
|---|---|---|---|
| Triết lý | Hard-code logic như máy trạng thái tất định | Dạy principles, trao quyền cho agent | Giả định sai về shared context |
| Ví dụ | "Hỏi đúng 3 câu tiếp theo" | Mục tiêu + khung phản hồi 4 bước | "Hỗ trợ theo tinh thần thương hiệu" |
| Hệ quả | Khó bảo trì, ép model đi theo lối mòn | Linh hoạt, nén gọn, ít mâu thuẫn | Hành vi bất nhất quán |

---

### 🏆 "Vùng Goldilocks": Mổ xẻ một system prompt chuẩn

Ở phần cuối, mình phân tích một prompt được viết theo tinh thần **Goldilocks**:

* **Bắt đầu bằng identity và scope rõ ràng:** điều này **thiết lập ranh giới ngay lập tức** — đây là **customer support**, không phải marketing, không phải sales. Nó cũng xác định domain: chỉ **các câu hỏi cơ bản**, không xử lý các hoạt động kinh doanh phức tạp.
* **Trao quyền thay vì gò bó (empower rather than constrain):** thay vì quy định chính xác dùng tool nào trong tình huống nào, prompt **thiết lập một mục tiêu** — giải quyết hiệu quả và chuyên nghiệp. Đây là một **heuristic (nguyên tắc kinh nghiệm)**: tin rằng agent sẽ **tự chọn đúng công cụ khi cần**.
* **Cung cấp reasoning framework, không phải flowchart:** prompt có một **khung phản hồi 4 bước** — (1) xác định vấn đề cốt lõi, (2) thu thập ngữ cảnh cần thiết, (3) đưa ra giải pháp rõ ràng, (4) xác nhận mức độ hài lòng của khách hàng. Đây là **guidance (hướng dẫn)** hoạt động được qua rất nhiều tình huống, chứ không phải **logic rẽ nhánh cứng nhắc**.
* **Thiết lập boundaries và principles:** nếu có nhiều giải pháp, **chọn giải pháp đơn giản nhất**. Đây là một **heuristic** — và thú vị là nó làm mình liên tưởng đến **greedy algorithm (thuật toán tham lam)** trong khoa học máy tính.

Khung phản hồi 4 bước đó diễn ra như sau:

```mermaid
flowchart LR
    A[Xác định vấn đề cốt lõi] --> B[Thu thập ngữ cảnh cần thiết]
    B --> C[Đưa ra giải pháp rõ ràng]
    C --> D[Xác nhận mức độ hài lòng]
```

Vì sao prompt "ở giữa" này vượt trội? Prompt **quá cụ thể** cố **suy nghĩ thay** model, và càng tệ hơn khi tình huống không khớp đúng kịch bản. Prompt **quá mơ hồ** không cho LLM đủ dữ kiện để làm việc.

Còn prompt **Goldilocks** tận dụng đúng thứ mà các LLM state-of-the-art thực sự giỏi: **nhận diện quy luật (recognize patterns) và áp dụng nguyên tắc chung vào tình huống cụ thể**. Cụ thể:

1. **Xử lý tình huống mới rất tốt:** vì **dạy principles thay vì đưa rules cụ thể**, nó vẫn hoạt động khi gặp điều mới, bởi khung xử lý vẫn đúng.
2. **Hiệu quả, không lãng phí từ ngữ:** mỗi guideline bao quát nhiều tình huống, các nguyên tắc được **nén (compressed)** lại. Thay vì hàng trăm, hàng nghìn edge case, ta chỉ có vài câu đơn giản.
3. **Không trùng lặp hay chồng chéo:** nhờ đó tránh được **các chỉ dẫn mâu thuẫn** đưa cho LLM.

Hy vọng qua bài này, các bạn đã "thấy" được vì sao system prompt quan trọng thay vì chỉ nghe nói suông — và có trong tay một tấm gương để soi lại prompt của chính mình: **nó đang quá cụ thể, quá mơ hồ, hay vừa đúng vùng Goldilocks?**

### 🎯 Tự kiểm tra nhanh

**Câu 1:** "Vùng Goldilocks" của system prompt là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Là điểm cân bằng giữa quá cụ thể và quá mơ hồ — rõ ràng, cụ thể nhưng cung cấp vừa đủ thông tin.

Giải thích: Đây là cách Anthropic gọi điểm ngọt khi viết system prompt.

Tham chiếu: Mục Phép so sánh.

</details>

**Câu 2:** Vấn đề cốt lõi của prompt quá cụ thể là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đối xử với LLM như máy trạng thái tất định và hard-code logic vào prompt.

Giải thích: Liệt kê triệt để mọi kịch bản là bất khả thi, khó bảo trì, và có thể một workflow truyền thống mới là thứ cần thiết.

Tham chiếu: Mục Hai thái cực cần tránh.

</details>

**Câu 3:** Vấn đề cốt lõi của prompt quá mơ hồ là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không đủ tín hiệu để hành vi nhất quán, giả định sai rằng có một shared context, và ranh giới không xác định.

Giải thích: Nó cơ bản chỉ nói "hãy làm điều đúng đắn" mà không định nghĩa "đúng" là gì.

Tham chiếu: Mục Hai thái cực cần tránh.

</details>

**Câu 4:** Khung phản hồi 4 bước của prompt Goldilocks gồm những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** (1) xác định vấn đề cốt lõi, (2) thu thập ngữ cảnh cần thiết, (3) đưa ra giải pháp rõ ràng, (4) xác nhận mức độ hài lòng của khách hàng.

Giải thích: Đây là reasoning framework áp dụng được cho nhiều tình huống, thay vì flowchart cứng nhắc.

Tham chiếu: Mục Vùng Goldilocks.

</details>

**Câu 5:** Vì sao prompt Goldilocks vượt trội hơn hai thái cực?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì nó tận dụng điểm mạnh của LLM state-of-the-art: nhận diện quy luật và áp dụng nguyên tắc chung vào tình huống cụ thể.

Giải thích: Nhờ đó xử lý tình huống mới tốt, hiệu quả và không có chỉ dẫn mâu thuẫn.

Tham chiếu: Mục Vùng Goldilocks.

</details>

Nếu bạn thích kiểu nội dung lý thuyết thế này, hãy cho mình biết nhé, mình sẽ làm thêm nhiều bài tương tự! Hẹn gặp lại các bạn ở video tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Context Engineering a System Prompt](https://ua.udemy.com/course/langchain/learn/lecture/52803023)
- [GitHub — System Prompts and Models of AI Tools](https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools)
- [Anthropic — Effective context engineering for AI agents](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents)
