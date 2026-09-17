---
title: "Bài 157 - Inside skills.py và Progressive Disclosure"
course: "LangChain"
lesson: "157"
status: "edited-verified"
source: "157 - Layer 3 Inside skills.py- The Mechanics of Progressive Disclosure.md"
verified_date: "2026-09-17"
langchain_version: "deepagents mã nguồn mở, skills.py khoảng 800 dòng ở thời điểm quay, tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["deep-agents", "skills", "skills.py", "middleware", "progressive-disclosure", "backend"]
doc_refs: ["https://github.com/langchain-ai/deepagents", "https://docs.langchain.com/", "https://docs.smith.langchain.com/"]
---

# Bài 157 — Inside skills.py và Progressive Disclosure (Tầng 3)

> Bài học được biên soạn từ transcript "Layer 3 Inside skills.py - The Mechanics of Progressive Disclosure".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Chỉ ra file `skills.py` nằm ở `libs/deepagents/deepagents/middleware` và hai hàm chính.
2. Giải thích discovery một lần mỗi session và injection trước mỗi model call.
3. Nói được vai trò backend, sources, `list_skills` và `SKILLS_SYSTEM_PROMPT`.
4. Giữ đúng thuật ngữ Anh: backend, sources, SkillsState, before agent, wrap model call, SKILL.md, YAML front matter.

## 2. Kiến thức cốt lõi

### Vị trí code

- Toàn bộ logic skill dynamic disclosure nằm trong `skills.py`, khoảng 800 dòng ở thời điểm quay.
- Đường dẫn trong repo: `libs`, `deepagents`, `deepagents`, `middleware`, `skills.py`.

### Before agent: discovery một lần

- Hàm `before agent` nhận agent state và update `SkillsState` chuyên giữ data skills.
- Load một lần mỗi session từ mọi configured sources; nếu metadata đã có thì skip.
- Skills load theo source order, source sau override source trước nếu trùng name; đây là implementation choice của LangChain team.
- Có object `backend` vì harness hỗ trợ nhiều backend: local file system hiện tại, nhưng có thể là Firestore, BigTable hay backend tự cài cho cloud-based skills.
- `sources` gom mọi path skills gồm project level, user level hay backend khác; hàm `list_skills` quét subdirectories, parse YAML front matter của `SKILL.md` và trả metadata.
- Kết quả là dict key là skill name, value là metadata, rồi chuyển thành list dict; trong LangSmith trace thấy `skills middleware before agent` update trường skill metadata với ba skills đã cấu hình.

### Wrap model call: injection trước mỗi LLM call

- Trước mỗi model call chạy skill before model middleware, tức `wrap_model_call`, để inject skills docs vào system prompt.
- Hàm `modify request` lấy từ state mọi metadata gồm names và paths của `SKILL.md`, dựng skill section rồi append vào system message qua template `SKILLS_SYSTEM_PROMPT` chứa hướng dẫn progressive disclosure, `skill_locations` và `skills_list`.
- Trong trace, system prompt sau wrap có thêm skill system liệt kê available skills, nơi đọc files và cách đọc; còn trước wrap thì chưa có.
- Sau injection, LLM tự quyết định load gì: phải làm `SKILL.md` như index dễ đọc để LLM chọn đúng file disclose tiếp. Phần lớn file còn lại chỉ traverse file system và parse YAML, không có code tinh vi mà là smart engineering.

## 3. Ví dụ và diễn giải

- Discovery giống thủ thư kiểm kê một lần khi mở thư viện: ghi tên sách và kệ vào sổ state.
- Injection giống dán mảnh giấy nhắc trước mỗi câu hỏi: sách nào có, đọc ở đâu, đọc khi nào.
- Vẻ đẹp theo transcript: harness chỉ chuẩn bị metadata, trách nhiệm chọn file đúng khi execute thuộc về LLM.

## 4. Kiểm chứng với docs mới nhất

- Repo: [deepagents](https://github.com/langchain-ai/deepagents); docs [docs.langchain.com](https://docs.langchain.com/); trace [LangSmith](https://docs.smith.langchain.com/).
- Ngày 2026-09-17: **chưa kiểm chứng trực tuyến** do không fetch được source mới; số dòng và tên hàm giữ nguyên theo video.
- Không suy diễn API ngoài transcript; version mới có thể refactor `skills.py`.

> **Hộp cập nhật:** khi có mạng, mở file `skills.py` hiện tại để đối chiếu `before_agent`, `wrap_model_call`, `modify_request`, `list_skills` và `SKILLS_SYSTEM_PROMPT`.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| File | `middleware/skills.py`, khoảng 800 dòng |
| Discovery | Một lần mỗi session, parse YAML, lưu dict name tới metadata |
| Backend | File system, Firestore, BigTable, tùy cài |
| Injection | Mỗi model call, append skill section vào system prompt |
| Quyết định | LLM chọn file disclose tiếp |

**Một câu chốt:** Code không ép LLM đọc skill mà dọn sẵn index để LLM tự disclose dần.

## 6. Câu hỏi tự kiểm tra

1. `skills.py` nằm ở đâu trong repo?
2. Vì sao discovery chỉ chạy một lần mỗi session?
3. Source order override nghĩa là gì?
4. `SKILLS_SYSTEM_PROMPT` chứa gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** `libs/deepagents/deepagents/middleware/skills.py`.

**2.** Vì metadata skills từ configured sources ít đổi trong session; nếu state đã có thì skip để khỏi quét lại.

**3.** Skills load theo thứ tự source, source sau ghi đè source trước nếu cùng skill name.

**4.** Boilerplate hướng dẫn progressive disclosure cộng `skill_locations` và `skills_list` mà agent đã có.

</details>

## 7. Bước tiếp theo

Sang cụm Glossary từ bài 158: ChatModels, Messages, TextSplitter, Document, Token Limits, Memory.

Nguồn: transcript gốc `157 - Layer 3 Inside skills.py- The Mechanics of Progressive Disclosure.md`; [deepagents repo](https://github.com/langchain-ai/deepagents).
