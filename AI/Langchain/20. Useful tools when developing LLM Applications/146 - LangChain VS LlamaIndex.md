---
title: "Bài 146 - LangChain vs LlamaIndex: chọn framework nào"
course: "LangChain"
lesson: "146"
status: "edited-verified"
source: "146 - LangChain VS LlamaIndex.md"
verified_date: "2026-09-17"
langchain_version: "LangChain (LCEL era) vs LlamaIndex theo transcript; tính đến 2026-09-17 (chưa kiểm chứng trực tuyến)"
categories: ["AI"]
tags: ["LangChain", "LlamaIndex", "RAG", "agents", "ReAct", "LCEL", "frameworks"]
doc_refs: ["https://docs.langchain.com/", "https://docs.llamaindex.ai/"]
---

# Bài 146 — LangChain vs LlamaIndex: chọn framework nào

> Bài học được biên soạn từ transcript "LangChain VS LlamaIndex".

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nêu điểm chung: cả hai frameworks đều build được LLM application.
2. Phân biệt định vị: LlamaIndex data-oriented, LangChain toàn diện hơn về agents.
3. Giải thích vì sao RAG trong LangChain đã tốt lên nhờ LCEL.
4. Nêu quan điểm giảng viên: RAG thuần cũng chọn LangChain, agentic thì càng chọn LangChain.
5. Giữ đúng thuật ngữ Anh: RAG, agentic applications, ReAct, LCEL, adoption.

## 2. Kiến thức cốt lõi

### Điểm chung

- Giảng viên (Eden) mở đầu: both frameworks are very similar. Muốn develop LLM application thì dùng LangChain được, LlamaIndex probably cũng được. Cả hai đều cho utilities và tools để build.
- LangChain phổ biến hơn, adoption trong developers cao hơn; LlamaIndex cũng có adoption nhưng không bằng.

### Định vị khác nhau

- **LlamaIndex** focused hơn vào data: retrieval augmentation, integrating external data vào LLM apps — more data-oriented.
- **LangChain** offer tất cả features đó, và support cho RAG đã gotten a lot better nhờ abstraction **LangChain Expression Language (LCEL)** cho nhiều flexibility khi build retrieval systems.

### Chia LLM apps làm hai loại

1. **RAG applications**: chat with your data, connect external data.
2. **Agentic applications**: leverage reasoning power của LLM để chọn đúng set of tools và invoke chúng, chạy non-deterministic actions.

### Vì sao agents là điểm phân thắng bại

- LlamaIndex có support agents (ví dụ implementation cho ReAct algorithm), nhưng most offerings xoay quanh retrieval và search.
- LangChain offering về agents robust và comprehensive hơn nhiều: LCEL cho flexibility chạy agents và chọn tools; nhiều research và activity hơn; up to date hơn với current research về LLM agents (theo ý kiến giảng viên).

### Quan điểm chốt

- RAG thuần, nhiều external data: vẫn chọn LangChain vì đáp ứng được hết.
- Agentic: of course chọn LangChain vì ecosystem generative AI agents mạnh hơn hẳn.

## 3. Ví dụ và diễn giải

- Giữ đúng hai ví dụ loại app trong transcript: chat with data vs reasoning + tools.
- Giữ đúng tên ReAct và LCEL như giảng viên nêu, không mở rộng sang kiến trúc khác.

## 4. Kiểm chứng với docs mới nhất

- Docs hai bên: [docs.langchain.com](https://docs.langchain.com/) và [docs.llamaindex.ai](https://docs.llamaindex.ai/) — cả hai nay đều có cả RAG lẫn agents.
- Trạng thái ngày 2026-09-17: **chưa kiểm chứng trực tuyến** chi tiết so sánh do môi trường không fetch được nội dung mới.
- Nội dung bài giữ trung thành với transcript, kể cả phần "in my opinion" — đây là quan điểm giảng viên tại thời điểm quay, không phải kết luận vĩnh viễn.

> **Hộp cập nhật:** khi có mạng, đối chiếu docs hiện tại của cả hai frameworks (agents, RAG, LCEL/LangGraph phía LangChain) trước khi dùng bài này để ra quyết định framework. Giữ bản gốc transcript, bổ sung thay vì sửa lịch sử.

## 5. Tóm tắt một trang

| Ý | Nội dung |
|---|---|
| Chung | Cả hai đều build được LLM apps |
| LlamaIndex | Data-oriented: RAG, retrieval, search |
| LangChain | Toàn diện + agents mạnh (LCEL, ReAct, research sâu) |
| RAG | LangChain đã tốt lên nhiều nhờ LCEL |
| Chốt của giảng viên | RAG cũng LangChain, agentic càng LangChain |

**Một câu chốt:** Data là điểm mạnh của LlamaIndex, nhưng agents là nơi LangChain bỏ xa — và agents mới là tương lai.

## 6. Câu hỏi tự kiểm tra

1. Điểm chung lớn nhất của hai frameworks là gì?
2. LlamaIndex mạnh ở đâu?
3. LCEL giúp gì cho RAG trong LangChain?
4. Vì sao agents là điểm phân thắng bại?
5. Quan điểm cuối của giảng viên là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Cả hai đều cung cấp utilities/tools để develop LLM application; làm được ở bên này thì probably làm được ở bên kia.

**2.** Data: retrieval augmentation, integrating external data — data-oriented, agents chủ yếu quanh retrieval/search.

**3.** Cho flexibility khi build retrieval augmentation systems, khiến support RAG của LangChain tốt hơn nhiều.

**4.** Vì agentic apps cần reasoning + chọn/invoke tools cho non-deterministic actions; LangChain có ecosystem agents robust, comprehensive, research sâu và up to date hơn.

**5.** Dù app data-heavy hay agentic thì vẫn chọn LangChain — RAG đã đủ tốt, agents thì vượt trội.

</details>

## 7. Bước tiếp theo

Hết section 20. Sang section 21 — *Deep Agents* (Bài 147) — từ tools và frameworks đi vào agents chân sâu.

Nguồn: transcript gốc `146 - LangChain VS LlamaIndex.md`; [docs.langchain.com](https://docs.langchain.com/); [docs.llamaindex.ai](https://docs.llamaindex.ai/).
