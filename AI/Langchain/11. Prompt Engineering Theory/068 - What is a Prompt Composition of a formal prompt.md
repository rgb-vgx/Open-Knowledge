---
title: "Bai 068 - Prompt la gi va 4 thanh phan"
course: langchain
lesson: 68
status: edited-verified
source: "068 - What is a Prompt Composition of a formal prompt.md"
verified_date: 2026-09-17
langchain_version: "chua chot patch moi nhat tinh den 2026-09-17; khai niem on dinh"
categories: [AI]
tags: [prompt, instruction, context, output-indicator]
doc_refs: ["https://docs.langchain.com/oss/python/langchain/prompt-templates", "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview"]
---

# Bài 068 — Prompt là gì và 4 thành phần

> Nguồn transcript: `068 - What is a Prompt Composition of a formal prompt.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (chưa kiểm chứng full docs do giới hạn mạng, không bịa thêm).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Định nghĩa prompt cho language model.
2. Kể tên 4 thành phần formal của prompt.
3. Giải thích vai trò từng thành phần.
4. Hiểu vì sao thuật ngữ chung giúp cộng tác và tối ưu prompt.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Vì sao cần định nghĩa formal

Giống hóa học hay toán có thuật ngữ riêng, AI và prompt engineering cũng cần ngôn ngữ chung. Có tên gọi thống nhất thì dễ cộng tác, dễ trao đổi ý tưởng, và quan trọng nhất là biết cần sửa mảnh nào khi prompt chưa tốt.

### 2.2. Prompt là gì

> Prompt là input đưa cho AI model để nó sinh output.

Hãy coi prompt là kim chỉ nam: giúp model hiểu ngữ cảnh, xử lý thông tin, sinh câu trả lời relevant và meaningful.

### 2.3. Bốn thành phần

1. **Instruction — trái tim của prompt.** Nói model phải làm task gì: summary, translation, classification. Instruction dựng sân khấu cho toàn bộ response.
2. **Context.** Thông tin bổ sung giúp model hiểu task và trả lời chính xác hơn. Có task không cần context, có task thêm context cải thiện rõ rệt.
3. **Input data.** Dữ liệu model sẽ xử lý để hoàn thành task: đoạn text, image, hay bất kỳ data relevant nào.
4. **Output indicator.** Tín hiệu báo model rằng giờ phải trả lời. Đôi khi implicit nằm trong instruction, đôi khi explicit tách riêng. Bài sau sẽ có ví dụ cụ thể.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Prompt gồm instruction, context, input data, output indicator | VẪN ĐÚNG | https://docs.langchain.com/oss/python/langchain/prompt-templates | Cách chia 4 phần này là quy ước sư phạm của khóa học, docs LangChain dùng tên role messages tương đương. |
| Có thuật ngữ chung giúp customize và optimize | VẪN ĐÚNG | https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview | Docs Anthropic cũng khuyên tách instruction, context, examples rõ ràng. |

> Hộp cập nhật 2026-09-17: Docs hiện tại hay diễn đạt theo system / human / AI messages và variables trong PromptTemplate, nhưng bản chất 4 mảnh trong transcript vẫn giữ nguyên giá trị. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Thành phần | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Instruction | system + task description | Task là gì |
| Context | background info | Bối cảnh để đúng |
| Input data | user variable | Dữ liệu cần xử lý |
| Output indicator | format / cue | Báo hiệu trả lời ngay |

**Chốt: Gọi đúng tên từng mảnh prompt thì mới biết phải sửa mảnh nào khi output lệch.**

---

## 5. Câu hỏi tự kiểm tra

1. Prompt là gì?
2. Vì sao cần thuật ngữ formal?
3. Instruction khác context thế nào?
4. Input data có thể là những dạng nào?
5. Output indicator implicit và explicit khác nhau ra sao?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Input đưa cho model để nó sinh output, đóng vai trò guide hiểu context và sinh response relevant.

**2.** Để có ngôn ngữ chung, dễ cộng tác, dễ trao đổi ý tưởng, và khi optimize biết chính xác mảnh nào cần sửa.

**3.** Instruction nói làm task gì, là trái tim; context là thông tin bổ sung giúp làm task đó chính xác hơn, có task cần có task không.

**4.** Piece of text, image, hoặc bất kỳ data relevant nào cho task.

**5.** Implicit là tín hiệu nằm lẫn trong instruction, explicit là câu báo riêng rằng giờ hãy trả lời. Cả hai đều nhằm báo model đến lúc sinh output.

</details>

## 6. Bước tiếp theo

Bài 069 — *Zero-Shot Prompting* — xem khi không đưa ví dụ nào thì model xoay xở ra sao.
