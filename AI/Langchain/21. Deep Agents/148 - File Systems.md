# 📂 File Systems: "Cỗ máy" Context Engineering của Deep Agents

> Nguồn: `148-Deep-Agents-File-Systems.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/54737163)

Chào các bạn, mình là Eden đây! Hôm nay chúng ta cùng tìm hiểu một đặc điểm cốt lõi khác của deep agents: **khả năng truy cập file system (hệ thống tệp)**.

---

### 📂 File System Tools: bài học từ Claude Code

Deep Agents có các tool để **tìm kiếm file, đọc file, cập nhật và xóa file**, và nắm toàn quyền kiểm soát một file system — tất cả nhằm giúp chúng ta **quản lý context**.

Ở **Claude Code**, bộ **file operations tools** gồm:

* **read tool:** đọc nội dung file.
* **write tool:** tạo và ghi đè file.
* **edit tool:** thay thế chuỗi chính xác (precise string replacements) trong file.
* **glob và grep tool:** tìm file và tìm nội dung bên trong file.

Nếu mở tài liệu của deep agents, các bạn sẽ thấy chúng phơi ra một **file system interface** rất giống Claude Code: `ls`, `read_file`, `write_file`, `edit_file`, `glob`, và `grep`.

| Chức năng | Claude Code | Deep Agents interface |
|---|---|---|
| Đọc file | read tool | `read_file` |
| Tạo và ghi đè file | write tool | `write_file` |
| Sửa file | edit tool | `edit_file` |
| Tìm file | glob tool | `glob` |
| Tìm nội dung | grep tool | `grep` |

---

### 🔌 Interface mở: muốn backend nào cũng được

Điều quan trọng cần lưu ý: deep agents **chỉ phơi ra interface**, còn cách triển khai thì hoàn toàn tự do. Các bạn có thể dựng file system trên **Firestore của Google Cloud**, trên **DynamoDB của AWS**, hay bất kỳ backend nào mình muốn — mọi thứ đều **linh hoạt tuyệt đối**.

---

### 🧠 Context Engineering: bài toán mang tên "ba vòng tròn"

Như đã bàn, khi hội thoại cứ dài mãi, context cũng phình theo và dẫn đến **context rot** — kết quả là **context contradiction (mâu thuẫn)**, **context confusion (lẫn lộn)**, hoặc đơn giản là quá nhiều **nhiễu (noise)** khiến LLM trả lời kém đi.

Trong một blog của LangChain (mình để link trong phần tài nguyên của video), họ có một hình minh họa rất hay về thách thức của context engineering:

* **Hình chữ nhật màu xanh dương:** toàn bộ context *có sẵn* cho agent — code base, tài liệu, kết quả web search, file, database... Khối lượng này **có thể khổng lồ**.
* **Vòng tròn đỏ/hồng:** phần context mà agent **thực sự chọn** và kéo vào context window (những gì nó quyết định đọc/tìm kiếm).
* **Vòng tròn xanh lá:** phần context agent **thực sự cần** để hoàn thành tác vụ.

Từ đó, chúng ta có các tình huống "dở khóc dở cười":

1. **Under-retrieval:** agent không tìm đủ thông tin cần thiết — vòng đỏ chỉ phủ một phần nhỏ của vòng xanh.
2. **Over-retrieval:** agent kéo vào quá nhiều nhiễu, làm **loãng tín hiệu** — vòng đỏ quá to so với vòng xanh.
3. **Misaligned retrieval:** agent **tìm sai chỗ hoàn toàn** — vòng đỏ không hề chồng lên vòng xanh.
4. **Context window limit:** vòng đỏ là **hữu hạn**, không thể nhét mọi thứ mình muốn vào đó.

Trong context engineering, **điểm ngọt (sweet spot)** là làm sao cho **vòng đỏ nhỏ nhất có thể mà vẫn phủ trọn vòng xanh**. Và nhớ rằng quá trình chọn context này diễn ra **gần như sau mỗi vòng lặp** — nên ta phải liên tục tối ưu cho vòng xanh.

Đó là lý do vì sao trong context engineering, **cách cấu trúc, truy xuất và ưu tiên thông tin cho agent còn quan trọng hơn cả prompt**. Chất lượng của agent bị chặn trên bởi việc nó có đúng thông tin trong context window hay không. Bạn có thể dùng model suy luận tốt nhất, nhưng với context sai thì vẫn nhận câu trả lời sai, không thể trả lời câu hỏi hay hoàn thành tác vụ.

---

### ⚙️ File System: cỗ máy ghi và chọn context

Vậy file system liên quan gì đến tất cả những điều trên? Nó chính là **động cơ** giúp agent chọn đúng context — là cơ chế để agent tiến tới **điểm ngọt của vòng xanh**. Hãy tưởng tượng toàn bộ file system chính là **hình chữ nhật xanh dương** khổng lồ kia.

File system giúp chúng ta hai việc quan trọng:

1. **Ghi context vào bộ lưu trữ bền vững (persistent storage):** file tạm, kết quả tạm, hay thông tin lấy từ internet đều được lưu lại — nhờ đó **không làm ô nhiễm context**, vì mọi thứ nằm ở nơi lưu trữ lâu dài.
2. **Chọn lọc context để truy xuất:** cơ chế chính là **glob tool** (tìm file theo pattern) và **grep tool** (tìm nội dung file bằng biểu thức chính quy — regular expression).

```mermaid
flowchart LR
    A[Agent] -->|write_file ghi kết quả| B[Persistent storage]
    B -->|glob và grep truy xuất| C[Chọn đúng context cho vòng xanh]
    C --> A
```

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao deep agents cần quyền truy cập file system?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Để quản lý context — ghi kết quả trung gian ra ngoài và chọn lọc context cần truy xuất.

Giải thích: File system chính là "động cơ" giúp agent tiến tới điểm ngọt của vòng xanh.

Tham chiếu: Mục File System: cỗ máy ghi và chọn context.

</details>

**Câu 2:** Bộ file operations tools của Claude Code gồm những gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** read tool, write tool, edit tool, glob tool và grep tool.

Giải thích: read đọc file; write tạo và ghi đè; edit thay thế chuỗi chính xác; glob tìm file; grep tìm nội dung.

Tham chiếu: Mục File System Tools.

</details>

**Câu 3:** Deep agents chỉ phơi ra interface hay ràng buộc backend?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ phơi ra interface; backend hoàn toàn tự do — Firestore, DynamoDB hay bất kỳ backend nào.

Giải thích: Mọi thứ linh hoạt tuyệt đối.

Tham chiếu: Mục Interface mở.

</details>

**Câu 4:** Bốn tình huống dở khóc dở cười của context engineering là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Under-retrieval, over-retrieval, misaligned retrieval và context window limit.

Giải thích: Điểm ngọt là vòng đỏ nhỏ nhất mà vẫn phủ trọn vòng xanh.

Tham chiếu: Mục Context Engineering.

</details>

**Câu 5:** Vì sao nói "cấu trúc thông tin còn quan trọng hơn cả prompt"?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chất lượng agent bị chặn trên bởi việc nó có đúng thông tin trong context window hay không.

Giải thích: Model suy luận tốt nhất vẫn trả lời sai nếu context sai.

Tham chiếu: Mục Context Engineering.

</details>

Nói cách khác, file system đang hiện thực hóa hai phần quan trọng của triết lý context engineering: **ghi context** và **chọn context**. Hẹn gặp lại các bạn ở section tiếp theo nhé! 🚀

## Nguồn tham khảo

- [Udemy — Deep Agents File Systems](https://ua.udemy.com/course/langchain/learn/lecture/54737163)
- [LangChain Docs — Deep Agents overview](https://docs.langchain.com/oss/python/deepagents/overview)
- [LangChain Docs — Deep Agents backends](https://docs.langchain.com/oss/python/deepagents/backends)
