---
title: "Bài 144 - LangChain Hub: tải prompt cộng đồng"
course: "LangChain"
lesson: "144"
status: "edited-verified"
source: "144 - LangChain Hub - Downloads prompt from the community.md"
verified_date: "2026-09-17"
langchain_version: "LangChainHub / LangSmith Hub (hub.pull), tính đến 2026-09-17 (chưa kiểm chứng trực tuyến do docs trả 404)"
categories: ["AI"]
tags: ["LangChainHub", "LangSmith", "prompts", "hub-pull", "prompt-engineering", "RAG", "ReAct"]
doc_refs: ["https://smith.langchain.com/hub", "https://docs.langchain.com/"]
---

# Bài 144 — LangChain Hub: tải prompt cộng đồng

> Bài học được biên soạn từ transcript "LangChain Hub - Downloads prompt from the community".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nói được LangChain Hub là gì: single stop shop chia sẻ prompts, chains, agents.
2. Tìm và lọc prompts theo use case, đọc downloads/likes/comments/commits.
3. Dùng `hub.pull` để tải prompt về thay RAG QA chain.
4. Mở prompt trong playground để thử params, models, temperatures.
5. Giữ đúng thuật ngữ Anh: LangChain Hub, hub.pull, retrieval QA chain, playground.

## 2. Kiến thức cốt lõi

### Hub là gì

- Tên trong transcript: **The LangChain Hub** — single stop shop để share prompts, chains, agents. Repository cho những prompts đó.
- Lý do tồn tại: secret sauce để LLM ra kết quả tốt thường là high quality prompt; prompt engineering (nhiều techniques đã học) quyết định rất nhiều.
- Vị trí: một phần của **LangSmith** (lúc quay đang beta, sign up chờ approve, planned release soon).

### Tìm prompt

- Prompts sort theo use case: agents, autonomous agents, classification, code writing, anti extraction (theo lời transcript), self-checking, SQL, you name it. Lọc được.
- Lưu ý optimize theo vendor: cùng prompt cho model A chưa chắc hợp model B (có model chấp nhận từ mà model khác không). Phải optimize prompts theo vendor — Google, Meta, OpenAI mỗi nhà một kiểu.
- Mỗi prompt xem được downloads, likes, comments, số người watching thay đổi; sort được theo popularity/top download.

### Ví dụ RAG prompt

- Mở QA over documents → retrieval augmentation generation prompt.
- Code demo: load documents → split → bỏ vào vector store → tới đoạn download prompt bằng **`hub.pull`** với URL của prompt → biến `prompt` pass vào retrieval QA chain ở chain type query arguments.
- Ý nghĩa: custom được prompt gọi tới LLM, augment original prompt bằng bất kỳ custom prompt nào — very important.
- Xem được actual prompt, parameters nó nhận, ví dụ dùng ở cuối trang, và toàn bộ commits prompt thay đổi theo thời gian (hai views).

### Ví dụ ReAct Chat prompt

- Mở React Chat example: agent-based prompt để selecting tools.
- Mở trong **playground**, plug parameters vào xem behavior, thử kết quả với vendors khác nhau, temperatures, lengths, penalties.
- Transcript chốt: easy, intuitive tool để experiment với new prompts vì prompt engineering là big part của LLM application.

## 3. Ví dụ và diễn giải

- Giữ đúng flow code transcript: load → split → vector store → `hub.pull(URL)` → retrieval QA chain.
- Giữ đúng tên use cases và tên prompt ví dụ (retrieval augmentation generation, React Chat).
- Không bịa URL cụ thể vì transcript chỉ nói "put this URL".

## 4. Kiểm chứng với docs mới nhất

- Docs chính: Hub nay nằm ở [smith.langchain.com/hub](https://smith.langchain.com/hub), dùng `hub.pull` — khớp transcript ở mức khái niệm.
- Trạng thái ngày 2026-09-17: **chưa kiểm chứng trực tuyến** chi tiết API và URL format do fetch docs.langchain.com/smith trả 404/405 trong môi trường này.
- Nội dung bài giữ trung thành với transcript.

> **Hộp cập nhật:** khi có mạng, đối chiếu package import (`langchain` vs `langchainhub`), cú pháp `hub.pull("owner/repo")` và vị trí Hub trong LangSmith với docs mới nhất. Giữ bản gốc transcript, bổ sung thay vì sửa lịch sử.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Là gì | Kho share prompts/chains/agents, thuộc LangSmith |
| Tìm | Lọc theo use case, sort popularity, xem downloads/likes/commits |
| Dùng | `hub.pull(URL)` → nhét vào chain (ví dụ retrieval QA) |
| Optimize | Theo từng vendor/model, không dùng một prompt cho mọi nhà |
| Thử | Playground với params, temperatures, lengths, penalties |

**Một câu chốt:** Prompt ngon đã có người viết sẵn — lên Hub kéo về thay vì viết lại từ đầu.

## 6. Câu hỏi tự kiểm tra

1. LangChain Hub chứa gì?
2. Vì sao cùng prompt phải optimize riêng cho từng model?
3. `hub.pull` dùng ở đâu trong pipeline RAG demo?
4. Commits history của prompt cho biết gì?
5. Playground dùng để làm gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Prompts, chains, agents — single stop shop chia sẻ, thuộc LangSmith.

**2.** Vì mỗi vendor/model chấp nhận từ ngữ và params khác nhau; prompt hợp model A chưa chắc hợp model B.

**3.** Sau khi load/split/vector store, pull prompt về rồi pass vào retrieval QA chain ở chain type query arguments để augment prompt gọi LLM.

**4.** Prompt đã thay đổi ra sao theo thời gian — xem được từng commit.

**5.** Plug parameters vào, thử behavior với vendors, temperatures, lengths, penalties khác nhau trước khi chốt.

</details>

## 7. Bước tiếp theo

Bài 145 — *TextSplitting Playground* — công cụ trực quan để tối ưu chunk size và overlap.

Nguồn: transcript gốc `144 - LangChain Hub - Downloads prompt from the community.md`; [LangSmith Hub](https://smith.langchain.com/hub).
