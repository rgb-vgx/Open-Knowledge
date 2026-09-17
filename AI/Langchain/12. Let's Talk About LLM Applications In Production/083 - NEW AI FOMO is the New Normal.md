---
title: "Bai 083 - AI FOMO is the New Normal"
course: langchain
lesson: 83
status: edited-verified
source: "083 - NEW AI FOMO is the New Normal.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; bai ve nghe nghiep va xu huong"
categories: [AI]
tags: [FOMO, Karpathy, agents, orchestration, career]
doc_refs: ["https://karpathy.bearblog.dev/", "https://langchain-ai.github.io/langgraph/", "https://modelcontextprotocol.io/"]
---

# Bài 083 — AI FOMO is the New Normal

> Nguồn transcript: `083 - NEW AI FOMO is the New Normal.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên trích dẫn Karpathy cuối 2025 như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích FOMO trong môi trường AI dev hiện tại.
2. Kể lại ý chính blog Karpathy cuối 2025.
3. Mô tả stack mới: agents, prompts, context, memory, MCP...
4. Hiểu shift từ coder sang orchestrator kiểu team lead.
5. Nêu cách trị FOMO: focus + get hands dirty.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. FOMO là gì

Fear of missing out trong môi trường đổi nhanh từng ngày. Blog Karpathy cuối 2025 chạm nhiều người: `I've never felt this much behind as a programmer`, profession bị refactor, bits của programmer ngày càng sparse, có thể 10X nếu ráp đúng thứ có trong năm qua, không làm thì như skill issue.

### 2.2. Stack mới

Lớp abstraction programmable mới chồng lên layers cũ: agents, sub-agents, prompts, context, memory, modes, permissions, tools, plugins, skills, hooks, MCP, LSP, slash commands, workflows, IDE integrations. Phải build mental model cho entities stochastic, fallible, unintelligible mà cứ đổi liên tục, trộn vào good old-fashioned engineering.

TL;DR: software stack đổi rồi — không còn viết code mà viết prompts chạy trong agents/subagents, gọi tools, nhận artifact. Ta thành orchestrators.

### 2.3. Từ coder sang team lead của agents

Kỹ năng chuyển từ biết syntax sang quản team agents: giao task, review work, feedback, lặp tới final product. So sánh đúng như team lead quản engineers, chỉ khác là review nhiều hơn viết.

Lịch sử abstraction: punch cards → Assembly → C++ → Python → nay English là abstraction mới. Regex ví dụ: xưa có anh giỏi regex cả công ty nhờ, nay hỏi LLM/Cursor/Claude Code là xong. Good old engineering đổi rồi; problem solver giỏi + curious mới là skills sống cả hai era, curiosity nay impact càng lớn.

### 2.4. Trị FOMO

Karpathy: alien tool không manual, động đất magnitude 9, roll up sleeves để không fall behind. Không manual vì imagination là limit — abstraction chồng abstraction, mỗi lớp dùng lớp dưới. Muốn hiểu sâu thì quay ngược thời gian xem evolution: ReAct prompt → function calling → agentic workflows → deep agents/task delegation/subagents. Thấy tận mắt abstraction nào giải problem nào thì bớt FOMO.

Best practices còn đang thành hình, phải experiment, get hands dirty. Moral: Karpathy còn FOMO thì ta FOMO là bình thường; cách giải là xắn tay thử. FOMO sẽ ở lại, nên phải focus, distill noise: lướt thấy gì заинтерес, đúng problem mình cần mới dive deep. Key point: you are not alone, accept và sống chung với FOMO.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Blog Karpathy cuối 2025 về behind/FOMO | GIỮ NGUYÊN lịch sử | https://karpathy.bearblog.dev/ | Trích dẫn theo transcript; chưa fetch full do giới hạn mạng. |
| Stack agents/MCP/skills/hooks | VẪN ĐÚNG | https://modelcontextprotocol.io/ | MCP và agent stack 2026 vẫn trung tâm. |
| ReAct → function calling → workflows → deep agents | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | Đúng mạch evolution khóa này dạy. |

> Hộp cập nhật 2026-09-17: Giữ nguyên trích dẫn và ví dụ nghề nghiệp. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Era | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Cũ | Syntax + regex + map giấy | Giỏi code |
| Mới | Prompts + agents + tools | Giỏi orchestrate |
| Trị FOMO | Focus + hands dirty | Thử đúng thứ cần |

**Chốt: FOMO là bình thường mới — bớt lướt, chọn đúng problem, xắn tay thử tới cùng.**

---

## 5. Câu hỏi tự kiểm tra

1. FOMO ở đây là gì?
2. Karpathy nói gì khiến nhiều người đồng cảm?
3. Stack mới gồm những gì?
4. Vì sao nói English là abstraction mới?
5. Cách trị FOMO trong transcript là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Fear of missing out vì AI dev ra mới mỗi ngày, không thể track hết.

**2.** Chưa bao giờ thấy behind thế này, profession bị refactor, có thể 10X nếu ráp đúng thứ mới mà không làm thì như skill issue.

**3.** Agents, sub-agents, prompts, context, memory, modes, permissions, tools, plugins, skills, hooks, MCP, LSP, slash commands, workflows, IDE integrations.

**4.** Vì không viết code trực tiếp mà viết prompts chạy trong agents gọi tools ra artifact, như các lớp abstraction trước từ punch cards tới Python.

**5.** Accept FOMO là ở lại, focus distill noise, chỉ dive deep thứ đúng problem mình, get hands dirty experiment liên tục.

</details>

## 6. Bước tiếp theo

Bài 084 — *Finished Course, What's Next* — LLMOps, LangSmith/Pezzo, security và nguồn học tiếp.
