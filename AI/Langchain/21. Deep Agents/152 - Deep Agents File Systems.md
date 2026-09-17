---
title: "Bài 152 - File Systems của Deep Agents"
course: "LangChain"
lesson: "152"
status: "edited-verified"
source: "152 - Deep Agents File Systems.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do không truy cập mạng)"
categories: ["AI"]
tags: ["deep-agents", "file-system", "context-engineering", "glob", "grep"]
doc_refs: ["https://docs.langchain.com/", "https://github.com/langchain-ai/deepagents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 152 — File Systems của Deep Agents

> Bài học được biên soạn từ transcript "Deep Agents File Systems".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Kể tên bộ tools file system của Claude Code và deep agents.
2. Giải thích file system là interface, có thể cài trên Firestore hay DynamoDB.
3. Nói được hai vai trò context engineering của file system: ghi và chọn context.
4. Giữ đúng thuật ngữ Anh: file system, read, write, edit, glob, grep, context rot, under-retrieval, over-retrieval.

## 2. Kiến thức cốt lõi

### Bộ tools file quen thuộc

- Claude Code có read, write, edit, glob, grep để đọc, tạo/ghi đè, sửa chính xác theo chuỗi, tìm file và tìm trong file.
- Deep agents expose interface tương tự: `ls`, `read_file`, `write_file`, `edit_file`, `glob`, `grep`.
- Đây là interface nên backend tùy ý: local disk, Firestore trên Google Cloud, DynamoDB trên AWS.

### Vì sao file system cứu được long-horizon tasks?

- Hội thoại càng dài, context càng phình thành context rot: contradiction, confusion, noise.
- File system cho phép offload: persist kết quả trung gian ra storage thay vì nhồi hết vào context.

### Sơ đồ xanh đỏ xanh lá của LangChain

- Hình chữ nhật xanh: toàn bộ context khả dụng gồm codebase, documents, web search, files, databases, có thể khổng lồ.
- Vòng đỏ: phần agent thực sự kéo vào context window.
- Vòng xanh lá: phần agent thực sự cần để xong task.
- Bốn bệnh: under-retrieval thiếu xanh lá, over-retrieval đỏ quá to làm loãng signal, misaligned retrieval nhìn sai chỗ, context window limit đỏ hữu hạn.
- Sweet spot: vòng đỏ nhỏ nhất mà vẫn phủ xanh lá; mỗi iteration đều phải tối ưu lại.

## 3. Ví dụ và diễn giải

- Toàn bộ file system chính là hình chữ nhật xanh; agent dùng glob tìm file theo pattern và grep tìm nội dung theo regex để kéo đúng vòng đỏ về phủ vòng xanh lá.
- Cách cấu trúc, retrieve và ưu tiên thông tin cho agent quan trọng hơn cả prompt; model reasoning giỏi mà sai context vẫn trả lời sai.
- Nói gọn: file system thực hiện hai triết lý context engineering gồm writing context ra persistent storage và selecting context liên quan.

## 4. Kiểm chứng với docs mới nhất

- Docs chính: [docs.langchain.com](https://docs.langchain.com/), repo [deepagents](https://github.com/langchain-ai/deepagents), blog context engineering của LangChain được transcript nhắc tới.
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được nội dung mới.
- Tên tools giữ nguyên theo transcript; implementation cụ thể có thể khác theo backend.

> **Hộp cập nhật:** khi có mạng, đối chiếu danh sách file tools mặc định của `deepagents` và cách cắm backend tùy biến với docs mới nhất.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Tools | ls, read_file, write_file, edit_file, glob, grep |
| Tính chất | Interface linh hoạt, backend tùy chọn |
| Vai 1 | Writing context: persist temp files và retrieved data |
| Vai 2 | Selecting context: glob và grep để lấy đúng phần cần |
| Mục tiêu | Vòng đỏ nhỏ nhất phủ vòng xanh lá |

**Một câu chốt:** File system là engine để agent ghi bớt ra đĩa và chỉ đọc vào đúng thứ cần.

## 6. Câu hỏi tự kiểm tra

1. Kể bộ tools file của deep agents theo transcript.
2. Vì sao nói file system chỉ là interface?
3. Ba vòng xanh, đỏ, xanh lá tượng trưng cho gì?
4. Hai vai trò context engineering của file system là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** `ls`, `read_file`, `write_file`, `edit_file`, `glob`, `grep`, tương tự read/write/edit/glob/grep của Claude Code.

**2.** Vì có thể cài trên local disk, Firestore, DynamoDB hay backend tùy ý, miễn giữ đúng interface.

**3.** Xanh là toàn bộ context khả dụng, đỏ là phần kéo vào window, xanh lá là phần thực sự cần.

**4.** Writing context ra persistent storage để khỏi pollute, và selecting context liên quan bằng glob/grep để đạt sweet spot.

</details>

## 7. Bước tiếp theo

Bài 153 — *Ba Tầng Hiểu Agent Skills* — chuyển sang section Skills: từ dùng, trace tới đọc source.

Nguồn: transcript gốc `152 - Deep Agents File Systems.md`; [docs.langchain.com](https://docs.langchain.com/); [deepagents repo](https://github.com/langchain-ai/deepagents).
