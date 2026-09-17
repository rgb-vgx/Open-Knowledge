---
title: "Bai 069 - Zero-Shot Prompting"
course: langchain
lesson: 69
status: edited-verified
source: "069 - Zero Shot Prompting.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem on dinh"
categories: [AI]
tags: [prompt, zero-shot]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/prompt-templates", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"]
---

# Bài 069 — Zero-Shot Prompting

> Nguồn transcript: `069 - Zero Shot Prompting.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa zero-shot prompt.
2. Lấy ví dụ đúng mạch transcript (top 10 cities).
3. Giải thích vì sao zero-shot phổ biến nhất với người mới.
4. Kể 3 hạn chế: accuracy, scope, control.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Vì sao model làm được dù chưa train riêng

Transcript ví GPT-3 train trên hơn một tỷ từ, ví chồng tiền 1 USD cao 67 dặm để hình dung độ lớn. Lượng data này biến thành kiến thức nền, nên model trả lời được cả task chưa từng train tường minh.

Định nghĩa:

> Zero-shot prompt là prompt yêu cầu model làm task mà nó chưa từng được train riêng cho task đó, chỉ dựa vào kiến thức sẵn có + thông tin trong prompt.

Ví dụ transcript nói model chưa train English text vẫn sinh được French text chuẩn — ý là dùng kiến thức sẵn có để khái quát.

### 2.2. Ví dụ trong bài

Prompt: `Create a list of the 10 must-visit cities in the world in no particular order.`

Không ví dụ, không input data mẫu, không chỉ cách nghĩ. Model vẫn trả danh sách coherent, đẹp.

### 2.3. Vì sao phổ biến

Người mới học AI thường bắt đầu bằng cách hỏi thẳng, không kèm ví dụ. Rất intuitive: chỉ hỏi, không dạy cách nghĩ.

### 2.4. Hạn chế

1. **Accuracy:** đáp án có thể không đúng ý vì không có guidance.
2. **Scope limited:** chỉ một prompt dựa vào kiến thức sẵn có.
3. **Less control / khó fine-tune cho use case riêng:** không tinh chỉnh được cho nhu cầu cụ thể.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Zero-shot = không ví dụ, dựa vào preexisting knowledge | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Quy ước chung mọi vendor. |
| Zero-shot phổ biến nhất với người mới | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/prompt-templates | Chưa kiểm chứng full do giới hạn mạng; giữ nguyên mạch gốc. |
| Hạn chế accuracy/scope/control | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Docs khuyên thêm context/examples khi zero-shot chưa đủ. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Khái niệm | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Zero-shot | Task mới, 0 ví dụ | Hỏi thẳng |
| Điểm mạnh | Nhanh, intuitive | Hợp để thử nghiệm |
| Điểm yếu | Accuracy, scope, control | Muốn chính xác phải sang few-shot |

**Chốt: Zero-shot là điểm khởi đầu tự nhiên — hỏi thẳng, nhận đáp án dựa vào kiến thức nền, nhưng đừng kỳ vọng kiểm soát cao.**

---

## 5. Câu hỏi tự kiểm tra

1. Zero-shot prompt là gì?
2. Ví dụ prompt trong transcript là gì?
3. Vì sao người mới hay dùng zero-shot nhất?
4. Ba hạn chế của zero-shot là gì?
5. Khi nào nên rời zero-shot sang kỹ thuật khác?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Prompt yêu cầu task mà model chưa train riêng, không kèm ví dụ hay training data cho task đó.

**2.** `Create a list of the 10 must-visit cities in the world in no particular order.`

**3.** Vì intuitive nhất: mới học tương tác với model thì hỏi thẳng, chưa nghĩ đến việc đưa ví dụ hay dạy cách nghĩ.

**4.** Accuracy có thể lệch ý; scope limited; less control, không fine-tune được cho use case cụ thể.

**5.** Khi đáp án chưa đúng ý, cần kiểm soát format/scope, hoặc task đặc thù — lúc đó thêm examples (few-shot) hoặc chain-of-thought.

</details>

## 6. Bước tiếp theo

Bài 070 — *Few-Shot Prompting* — thêm 1 đến vài ví dụ để model bắt chước đúng ý.
