---
title: "Bai 082 - Confidence in AI Results"
course: langchain
lesson: 82
status: edited-verified
source: "082 - Confidence in AI Results By Assaf Elovic and Harrison Chase.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; bai ve product design"
categories: [AI]
tags: [trust, care, product-design, Cursor, monday]
doc_refs: ["https://docs.langchain.com/langsmith", "https://docs.copilotkit.ai/"]
---

# Bài 082 — Confidence in AI Results

> Nguồn transcript: `082 - Confidence in AI Results By Assaf Elovic and Harrison Chase.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (transcript gốc là bản dịch Arabic, lớp 1 giữ mạch ý; lớp 2 chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải thích vì sao adoption quyết định bởi trust hơn là độ chính xác thuần.
2. Viết công thức care = value / (risk x correction effort).
3. Phân tích Cursor, Jasper, monday AI blocks qua công thức trên.
4. Hiểu vì sao tách preview khỏi live giảm risk.
5. Biết care đến từ product design hơn là model.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Bí mật không nằm ở model

Vì sao có AI product bùng nổ, có cái tech hay mà không ai bám lại? Bài báo của Assaf và Harrison nói khác biệt nằm ở care — confidence in AI results. Đo được, thay đổi được, cải thiện được, và là thứ quyết định product thành công. Vượt qua fear, xây trust thì người ta mới dùng.

### 2.2. Công thức care

Care ≈ value chia cho (risk nhân correction effort).

- Value: user được gì khi AI làm đúng — tiết kiệm time/money, tạo thứ mới.
- Risk: sai thì sao — hơi annoying hay gây họa lớn.
- Correction: sửa lỗi tốn bao nhiêu — có nút undo dễ hay phải làm lại từ đầu.

Care cao thì nhảy vào dùng, care thấp thì bỏ.

### 2.3. Ví dụ Cursor

Gen code nghe risky, nhưng Cursor thiết kế care rất cao: risk thấp vì code nằm trong editor, chưa chạm production; correction thấp vì không ưng thì delete/gõ đè; value cao vì dev tiết kiệm огром time và mental power. Nếu auto-save thẳng vào main thì risk vọt lên, care tụt dù correction vẫn thấp — minh chứng phải tách thử khỏi live.

### 2.4. Ví dụ Jasper và monday

Jasper giữ vai assistant, user giữ last word nên risk + correction thấp, care cao. monday AI blocks tự động đổi boards vốn là trái tim công ty: risk medium vì sai timeline, sai data liên đới; correction medium-high vì mò nhiều nơi để revert; value cao vì đỡ task chán; care ra medium nên user ngần ngại ở boards quan trọng. Fix gợi ý: preview mode cho thấy chính xác đổi gì trước khi apply — một đổi giảm risk từ medium xuống low, care từ medium lên high mà không đụng model.

### 2.5. Chốt

Care đến chủ yếu từ product design, không chỉ chất lượng AI. Model fail hoài thì value = 0, care fail theo. Nhưng team product kiểm soát được risk và correction. Càng đúng với domain high-stakes như money/health.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Adoption do trust/care hơn accuracy thuần | VẪN ĐÚNG | https://docs.langchain.com/langsmith | LangSmith human feedback + evals đúng để đo trust. |
| Preview trước apply giảm risk | VẪN ĐÚNG | https://docs.copilotkit.ai/ | Pattern human-in-the-loop/preview là chuẩn CoAgents/LangGraph. |
| Tách thử khỏi live | VẪN ĐÚNG | https://langchain-ai.github.io/langgraph/ | LangGraph human-in-the-loop + checkpoint đúng tinh thần này. |

> Hộp cập nhật 2026-09-17: Giữ nguyên ví dụ Cursor/Jasper/monday thời điểm quay. Chưa fetch bài báo gốc do giới hạn mạng; không bịa link bài báo.

---

## 4. Tóm tắt

| Yếu tố | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Value | Time/money/creation | AI đúng được gì |
| Risk | Annoying vs catastrophic | Sai thì sao |
| Correction | Undo dễ hay làm lại | Sửa tốn bao nhiêu |

**Chốt: Muốn người ta dùng AI thì thiết kế cho care cao — value rõ, risk thấp, sửa dễ — hơn là chỉ mài model.**

---

## 5. Câu hỏi tự kiểm tra

1. Care là gì và công thức ra sao?
2. Vì sao Cursor care cao dù gen code risky?
3. Nếu Cursor auto-save vào main thì care đổi thế nào?
4. monday AI blocks care medium vì sao?
5. Một đổi nào kéo monday từ medium lên high?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Confidence in AI results, care = value / (risk x correction effort).

**2.** Value cao, risk thấp vì chưa chạm live, correction thấp vì delete/gõ đè dễ.

**3.** Risk vọt cao nên care tụt mạnh dù correction vẫn thấp — bài học tách thử khỏi live.

**4.** Value cao nhưng risk medium (sai timeline/data liên đới) nhân correction medium-high (mò revert) nên care chỉ medium.

**5.** Thêm preview mode thấy chính xác đổi gì trước khi apply, giảm risk medium xuống low.

</details>

## 6. Bước tiếp theo

Bài 083 — *AI FOMO is the New Normal* — từ Karpathy tới orchestrator và cách trị FOMO bằng thực hành.
