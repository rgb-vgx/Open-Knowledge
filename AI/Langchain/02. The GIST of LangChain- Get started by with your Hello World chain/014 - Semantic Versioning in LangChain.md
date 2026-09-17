---
title: 'Bài 014 — Semantic Versioning Trong LangChain'
course: 'langchain'
lesson: 14
status: edited-verified
source: '014 - Semantic Versioning in LangChain.md'
verified_date: '2026-09-17'
langchain_version: '1.x'
categories:
- AI
tags: []
doc_refs:
- 'https://docs.langchain.com/oss/python/langchain/overview'
- 'https://docs.langchain.com/oss/python/langchain/agents'
---

# Bài 014 — Semantic Versioning Trong LangChain

> Biên soạn từ transcript "014 - Semantic Versioning in LangChain.md".
>
> Đã đối chiếu với docs ngày 2026-09-17 (LangChain 1.x).

## Mục tiêu bài học

Sau bài này bạn có thể:

- Đọc version LangChain đang dùng trong `uv.lock`.
- Giải thích semantic versioning: patch/minor tương thích, major có thể breaking.
- Biết phải làm gì khi code trong video lệch version: ping giảng viên trên Discord.
- Hiểu cam kết của khóa học: breaking changes thì course được update để match.

## 1. Version của khóa học lúc quay

Giảng viên nêu rõ:

> Course này compatible với version 1.0.2, currently the latest version.

Tùy thời điểm bạn học, version có thể khác. Cách kiểm tra: mở `uv.lock` file — ở đó có LangChain version (video show 1.0.2), file này attach trong courses repository. Khi chạy `uv add langchain` thì luôn cài latest version available at that moment.

## 2. Semantic versioning nghĩa là gì

Cách giảng viên giải thích, giữ nguyên mức mơ hồ của transcript:

| Thay đổi | Kỳ vọng tương thích |
|---|---|
| Minor/patch (ví dụ 1.0.2 → 1.0.7 sau một tháng) | Chỉ bug fixes, maybe new functionality, nothing break code viết ở prior versions — everything should be fine |
| Breaking changes (đổi API không tương thích) | Giảng viên update course để match; học viên ping trên Discord channel để được address issues |

> Nguyên văn tinh thần: "what you see in the videos should match LangChain latest version".

## 3. Quy trình khi gặp lệch version

1. So sánh version trong `uv.lock` của bạn với version trong repo khóa học.
2. Nếu chỉ lệch patch/minor: cứ chạy tiếp, không lo compatible issues.
3. Nếu gặp incompatibilities (import lỗi, API đổi tên): ping giảng viên trong Discord, ông sẽ fix ASAP — ông tự nhận đã refilm 3–4 lần nên rất quen việc này.

```
uv.lock (1.0.2 lúc quay) ──> bạn cài mới (1.0.7+) ──> patch/minor: chạy tiếp ──> breaking: báo Discord, chờ update
```

## Đối chiếu với tài liệu mới nhất

| Nội dung trong transcript | Hiện nay (docs 1.x) | Kết luận | Nguồn |
|---|---|---|---|
| Khóa học khớp LangChain 1.0.2, minor sau (1.0.7) vẫn tương thích | Docs hiện tại tổ chức theo LangChain 1.x với pattern Agent = Model + Harness ổn định qua các minor | Vẫn đúng | [LangChain overview](https://docs.langchain.com/oss/python/langchain/overview) |
| `uv add langchain` cài latest available | Setup hiện nay dùng `pip install -U` / `uv add` các integration packages theo provider | Vẫn đúng | [ChatOpenAI integration](https://docs.langchain.com/oss/python/integrations/chat/openai) |
| Breaking changes thì course update để match latest | Docs agents giữ `create_agent(model, tools, prompt)` làm scaffold chuẩn, powered bởi LangGraph ReAct under the hood | Vẫn đúng | [LangChain agents](https://docs.langchain.com/oss/python/langchain/agents) |

Code cập nhật (nếu có): không có — bài này không chứa code. Cách đọc version trên version mới:

```bash
grep -A2 'name = "langchain"' uv.lock
```

## Tóm tắt một trang

| Vấn đề ↔ Giải pháp (phiên bản mới) | |
|---|---|
| Không biết đang dùng LangChain bản nào | Mở `uv.lock` trong repo, đối chiếu với repo khóa học |
| Sợ học theo video cũ bị lỗi | Patch/minor 1.x tương thích, cứ chạy tiếp |
| Gặp breaking change thật | Báo Discord, chờ giảng viên update course và GitHub |
| Muốn chắc code match latest | Lấy commit code gắn trong videos resources cho từng video |

**Một câu chốt:** Trong dải 1.x thì lệch patch/minor không đáng sợ — chỉ major breaking mới cần update course, và việc đó giảng viên cam kết lo.

## Câu hỏi tự kiểm tra

1. Xem LangChain version ở đâu?
2. Vì sao hai người học cách nhau một tháng có thể khác version?
3. Patch/minor khác nhau thì có chạy được code trong video không?
4. Khi nào cần ping giảng viên trên Discord?
5. Cam kết của giảng viên khi có breaking changes là gì?

<details><summary><b>Xem đáp án</b></summary>

**1.** Trong `uv.lock` (kèm trong courses repository) — video show version 1.0.2 ở đó.

**2.** Vì `uv add langchain` luôn cài latest version available at that moment, nên học sau sẽ nhận bản mới hơn (ví dụ 1.0.7).

**3.** Được — đó chỉ là bug fixes và maybe new functionality, nothing break prior code theo semantic versioning.

**4.** Khi gặp incompatibilities: import lỗi, API đổi tên, code video không chạy trên bản mới.

**5.** Update course (videos + code GitHub) để match LangChain latest version; đã refilm nhiều lần nên xử lý nhanh khi được báo.

</details>

## Bước tiếp theo

Bài 015 — *What are AI Agents: A High-Level Overview* — định nghĩa agent và khác biệt với chain thường.
