---
title: "Bai 070 - Few-Shot Prompting"
course: langchain
lesson: 70
status: edited-verified
source: "070 - Few Shot Prompting.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; khai niem on dinh"
categories: [AI]
tags: [prompt, few-shot, one-shot]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/prompt-templates", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting"]
---

# Bài 070 — Few-Shot Prompting

> Nguồn transcript: `070 - Few Shot Prompting.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (lớp 1 trung thành transcript; lớp 2 chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa few-shot, one-shot và quan hệ tập con.
2. Kể lại ví dụ Blue Willow và Yorkshire dog trong transcript.
3. So sánh output zero vs one vs few-shot.
4. Giải thích vì sao càng nhiều ví dụ càng ít tự do sáng tạo nhưng càng đúng ý.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Định nghĩa

> Few-shot prompt đưa cho model một số ít ví dụ (shots) của task kèm instruction, để model bắt chước sinh data mới tương tự.

Hữu ích khi data khan hiếm: ngôn ngữ mới, domain mới. Giúp adapt nhanh mà không cần fine-tune tốn nhiều data.

- One-shot: n = 1, chỉ một ví dụ.
- Few-shot: n > 1, một số ít ví dụ.
- One-shot là tập con của few-shot.

### 2.2. Ví dụ elaborate: Blue Willow

Blue Willow là tool open-source text-to-image trên Discord: gõ `/imagine` + prompt thì sinh ảnh. Bài này làm ngược: dùng text-to-text để sinh mô tả ảnh rồi plug vào Blue Willow.

Task: sinh mô tả ảnh đẹp để vẽ.

Zero-shot: `write an image descriptions with adjectives and nouns of a Yorkshire dog running in the winter landscape of Brazil`. Phân tích theo bài 068: task là write description, context là vẽ gì, không input data riêng, output indicator implicit chờ đáp án ngay. Vì 0 ví dụ nên model đoán, nhưng output vẫn khá elaborate.

One-shot: thêm chữ `compressed perfect`, kèm một ví dụ nouns/adjectives như blue dog, shimmering snow, rồi output indicator báo bắt đầu làm. Đáp án compressed hơn, nhiều adjectives hơn, concise hơn.

Few-shot: đưa 3 ví dụ — blue dog, red dog, green dog. Model hiểu cần màu sắc mở đầu cho dog. Kết quả: `vivacious violet Yorkshire dog`, fur fluttering (trước đó ví dụ có sweating, crying). Model bắt đúng pattern cần tính từ mô tả dog.

### 2.3. Plug vào Discord và so sánh ảnh

- Zero-shot: cute nhưng model tự đoán, creative freedom lớn nhất.
- One-shot: có ví dụ adjectives/nouns, transcript nhận xét không hơn hẳn ảnh đầu trong context này.
- Few-shot: đúng ý nhất vì ra màu sắc mở đầu như mong muốn. Chạy lại nhiều lần sẽ ra màu khác nhau.

Ba ảnh không hẳn ảnh nào đẹp hơn hẳn, khá giống nhau. Điểm mấu chốt:

> Càng cho nhiều ví dụ để train theo ý mình, model càng ít tự do nghệ thuật, output càng precise đúng liking của bạn.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| One-shot là subset của few-shot | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting | Quy ước chung. |
| Few-shot giúp adapt task mới không cần nhiều data | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/prompt-templates | Docs LangChain có FewShotPromptTemplate đúng tinh thần này. |
| Nhiều ví dụ thì output precise hơn, ít freedom hơn | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/multishot-prompting | Chưa fetch full do giới hạn mạng, giữ mạch gốc. |

> Hộp cập nhật 2026-09-17: Không phát hiện lỗi thời. Không bịa thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Kỹ thuật | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Zero-shot | n = 0 | Đoán tự do |
| One-shot | n = 1 | Một ví dụ dẫn đường |
| Few-shot | n > 1 | Vài ví dụ khóa pattern |

**Chốt: Muốn model làm đúng ý thì cho ví dụ — càng nhiều ví dụ đúng chất, output càng bớt đoán mò.**

---

## 5. Câu hỏi tự kiểm tra

1. Few-shot khác zero-shot ở điểm nào?
2. One-shot có phải tập con few-shot không, vì sao?
3. Task demo trong transcript là gì?
4. Vì sao few-shot ra được violet Yorkshire dog?
5. Đánh đổi giữa creative freedom và precision là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Few-shot kèm một số ít ví dụ để model bắt chước; zero-shot không ví dụ nào, model tự đoán.

**2.** Có. One-shot n = 1, few-shot n > 1, nên one-shot là trường hợp riêng của few-shot.

**3.** Sinh mô tả ảnh text-to-text rồi plug vào Blue Willow text-to-image qua `/imagine`.

**4.** Vì 3 ví dụ đều mở đầu bằng màu sắc blue/red/green dog nên model học pattern cần màu mô tả dog.

**5.** Ít ví dụ thì model tự do sáng tạo nhưng dễ lệch ý; nhiều ví dụ thì bớt tự do nhưng precise đúng liking hơn.

</details>

## 6. Bước tiếp theo

Bài 071 — *Chain-of-Thought Prompting* — dạy model chia bài toán nhiều bước như người.
