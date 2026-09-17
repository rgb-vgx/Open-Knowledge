---
title: "Bai 072 - ReAct Prompting"
course: langchain
lesson: 72
status: edited-verified
source: "072 - ReAct Prompting.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem theo paper ReAct goc"
categories: [AI]
tags: [prompt, react, reasoning-acting, agent]
doc_refs: ["https://arxiv.org/abs/2210.03629", "https://docs.langchain.com/oss/python/langchain/agents", "https://langchain-ai.github.io/langgraph/"]
---

# Bài 072 — ReAct Prompting

> Nguồn transcript: `072 - ReAct Prompting.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên ví dụ Apple remote như transcript).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Giải nghĩa ReAct = Reasoning + Acting.
2. Giải thích vì sao ghép chain-of-thought với action ngoài lại mạnh.
3. Kể lại ví dụ Apple remote: zero-shot, CoT, act-only đều sai, ReAct đúng.
4. Mô tả vòng Thought → Act → Observation.
5. Hiểu ReAct là nền của LangChain.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Ý tưởng rất người

Người làm task phức tạp thường: nghĩ các bước cần làm (reason), làm từng bước (act), xong mới qua bước tiếp. ReAct bắt chước đúng vậy.

Lấy chain-of-thought để sinh task, rồi thực thi task để lấy thêm thông tin ngoài, rồi update plan. Kết quả: factual hơn ChatGPT thuần, dùng được API và tools ngoài. Đây là thứ pioneer ra LangChain.

### 2.2. Ví dụ paper: Apple remote

Câu hỏi: ngoài Apple remote, thiết bị nào điều khiển được chương trình mà Apple remote vốn định tương tác?

- Zero-shot: trả iPad — sai.
- Chain-of-thought bắt mô tả cách nghĩ: trả iPhone, iPad, iPod — vẫn sai.
- Act-only (chỉ search Apple remote rồi list observation): trả yes — sai.

ReAct trả đúng: keyboard function keys.

### 2.3. Mổ xẻ vòng ReAct

Thought 1: cần search Apple remote để biết nó điều khiển chương trình gì. Act: search Apple remote. Observation: vốn điều khiển Front Row media center.

Thought 2: vậy phải tìm Front Row là gì. Act: search front row. Observation: thấy front row software nhưng chưa đủ.

Thought tiếp: xem front row software. Act: search front row software. Observation không quá relevant nhưng đủ gợi ý.

Thought cuối: front row software bị điều khiển bởi Apple remote hay Apple key function keys — rút từ nguồn ngoài bước trước. Đáp án: keyboard function keys.

Transcript nhấn mạnh cảm giác mind-blowing vì giống hệt cách người tự trả lời câu này.

### 2.4. Vì sao chạy được, có phải magic

Không magic: lấy output chain-of-thought mô tả việc cần làm, dò keyword như search + topic bằng code, rồi chạy lại prompt kèm observations, lặp đến khi ra đáp án. Code không khó như tưởng.

Đây chính là basis của LangChain: LM app tương tác nguồn ngoài, persist data, và nhiều hơn nữa.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| ReAct = reasoning + acting theo paper | VẪN ĐÚNG | https://arxiv.org/abs/2210.03629 | Paper Yao et al. 2022, không đổi. |
| ReAct là nền của LangChain agents | VẪN ĐÚNG nhưng ĐỔI cách triển khai | https://docs.langchain.com/oss/python/langchain/agents | Hiện tại ưu tiên tool calling/function calling và LangGraph, ReAct prompt cũ ít dùng trực tiếp. |
| Parse keyword search rồi lặp prompt | VẪN ĐÚNG về nguyên lý | https://langchain-ai.github.io/langgraph/ | LangGraph hiện mô hình hóa vòng này thành nodes/edges/state, đáng tin hơn while-loop thủ công. |

> Hộp cập nhật 2026-09-17: Nguyên lý Thought/Act/Observation giữ nguyên. Triển khai mới chuyển từ parse ReAct prompt thủ công sang tool calling chuẩn vendor + `create_agent` trong LangGraph. Transcript không có code nên không thêm code.

---

## 4. Tóm tắt

| Khái niệm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| ReAct | Thought → Act → Observation lặp | Vừa nghĩ vừa làm |
| Điểm mạnh | Ground bằng nguồn ngoài | Factual hơn chat thuần |
| Kế thừa | LangChain rồi LangGraph | Từ prompt sang graph + tool calling |

**Chốt: ReAct dạy model vừa suy luận vừa hành động có quan sát — đó là hạt nhân của mọi agent sau này.**

---

## 5. Câu hỏi tự kiểm tra

1. ReAct viết tắt của gì?
2. Vì sao ghép CoT với acting lại mạnh hơn CoT thuần?
3. Ba cách thử sai trong ví dụ Apple remote là gì?
4. Vòng ReAct chạy thế nào?
5. Vì sao transcript nói ReAct pioneer ra LangChain?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Reasoning + Acting: Re là reason, Act là act.

**2.** Vì vừa tự sinh task/bước đi vừa thực thi để lấy thông tin ngoài, rồi update plan — factual và dùng được API/tools.

**3.** Zero-shot ra iPad; CoT ra iPhone/iPad/iPod; act-only search Apple remote rồi đáp yes. Cả ba đều sai.

**4.** Thought nghĩ cần làm gì → Act gọi search ngoài → Observation đọc kết quả → sinh Thought tiếp, lặp đến đáp án keyboard function keys.

**5.** Vì ReAct chứng minh LLM vừa reason vừa gọi nguồn ngoài được, LangChain đóng gói vòng đó thành framework cho LLM app phức tạp.

</details>

## 6. Bước tiếp theo

Bài 073 — *Prompt Engineering Quick Tips* — context, task rõ, iteration để prompt ngon ngay.
