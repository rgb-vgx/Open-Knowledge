---
title: "Bai 078 - Privacy va Data Retention voi Managed LLM"
course: langchain
lesson: 78
status: edited-verified
source: "078 - LLMs in Production Privacy and Data Retention.md"
verified_date: 2026-09-17
langchain_version: "chua kiem chung patch moi nhat do gioi han mang tinh den 2026-09-17; noi dung phap ly chi mang tinh gioi thieu"
categories: [AI]
tags: [privacy, data-retention, compliance, managed-LLM]
doc_refs: ["https://platform.openai.com/docs/guides/your-data", "https://docs.anthropic.com/en/docs/build-with-claude/privacy-and-security", "https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance"]
---

# Bài 078 — Privacy và Data Retention với Managed LLM

> Nguồn transcript: `078 - LLMs in Production Privacy and Data Retention.md`
> Ngày đối chiếu docs: 2026-09-17
> Trạng thái: edited-verified (giữ nguyên disclaimer không phải legal advice; chưa kiểm chứng full do giới hạn mạng).

## 1. Mục tiêu bài học

Sau bài này bạn có thể:

1. Nhắc lại disclaimer pháp lý của video gốc.
2. Phân biệt B2C chat product với cloud API cho enterprise.
3. Giải thích lo ngại train model trên data gửi vào.
4. Hiểu ví dụ OpenAI giữ 30 ngày và zero retention.
5. Biết khi nào phải self-host open models dù tốn kém.

---

## 2. Nội dung chính theo mạch transcript

### 2.1. Disclaimer quan trọng

Giảng viên nhấn mạnh: tôi không phải lawyer, đây không phải legal advice, không đại diện vendor nào. Mỗi vendor có EULA/terms of services riêng — tài liệu pháp lý phải đọc. Mọi điều trong video chỉ là $0.02, take with a grain of salt, enterprise phải hỏi legal/privacy team và tự research. Chủ đề huge, video chỉ là introduction vài điểm.

### 2.2. Phạm vi: managed API, không phải app B2C

Đang nói data gửi tới managed model như OpenAI GPT-4o mini hay Vertex AI Gemini qua cloud API cho enterprise/business, không phải ChatGPT hay Gemini (Bard cũ) bản consumer. Mỗi vendor một EULA khác nhau.

### 2.3. Data có bị train tiếp không

Nỗi lo lớn: vendor lấy data gửi vào hay output để train model kế tiếp. Quan sát của giảng viên: hầu hết top-tier models default cam kết không dùng data đó để train, muốn cho train phải opt-in. Với enterprise có proprietary data hay data khách hàng chịu legal obligations thì phải verify điều này.

### 2.4. Retention ví dụ OpenAI

Vendor có lưu data không, lưu bao lâu, vì mục đích gì? Ví dụ OpenAI nói để chống abuse có thể giữ requests 30 ngày rồi xóa, trừ yêu cầu pháp luật khác. Một số khách hàng có zero retention: không log/persist gì, chỉ dùng để serve. Vendor khác có zero retention ngay từ đầu, muốn log phải opt-in. Rules khác nhau và đổi theo thời gian.

### 2.5. Khi cam kết vẫn chưa đủ

Ngân hàng, bảo hiểm chịu regulation rất strict về privacy/sharing customer data thì promises của vendor vẫn chưa đủ. Họ thường self-deploy open-source models trong môi trường mình để kiểm soát data và retention. Giá phải trả: serve LLM khó — scalability, durability, availability, GPUs, người maintain, security cả của open models. Middle ground: host open models trên managed services của cloud provider trong cloud environment của mình, đẩy gánh ops cho provider mà vẫn giữ control và security controls.

---

## 3. Đối chiếu với docs mới nhất

| Claim từ transcript | Kết luận | Docs hiện tại | Ghi chú |
|---|---|---|---|
| Đọc EULA, hỏi legal team, không coi video là legal advice | VẪN ĐÚNG | https://platform.openai.com/docs/guides/your-data | Nguyên tắc bất biến. |
| Default top-tier không train trên API data, muốn thì opt-in | VẪN ĐÚNG về hướng | https://platform.openai.com/docs/guides/your-data | Chưa fetch full do giới hạn mạng; phải check EULA hiện tại từng vendor. |
| Ví dụ giữ 30 ngày, zero retention cho một số khách | GIỮ NGUYÊN lịch sử | https://platform.openai.com/docs/guides/your-data | Chính sách đổi theo thời gian; không dùng số 30 ngày làm fact hiện tại. |
| Self-host khi regulation strict | VẪN ĐÚNG | https://cloud.google.com/vertex-ai/generative-ai/docs/data-governance | Đánh đổi control vs ops cost vẫn đúng. |

> Hộp cập nhật 2026-09-17: Mọi con số và cam kết vendor trong transcript chỉ có giá trị thời điểm quay. Trước khi production phải đọc EULA/docs hiện tại của OpenAI, Anthropic, Google và hỏi legal team. Không thêm code vì transcript không có code.

---

## 4. Tóm tắt

| Câu hỏi | Docs 2026-09-17 | Ghi nhớ |
|---|---|---|
| Dùng data để train? | Default không, opt-in mới có | Verify EULA |
| Giữ bao lâu? | Tùy vendor, ví dụ 30 ngày | Hỏi retention policy |
| Zero retention? | Có cho một số plan/vendor | Không mặc định mọi nơi |
| Strict regulation? | Self-host hoặc VPC/cloud riêng | Đổi control lấy ops cost |

**Chốt: Đưa managed LLM vào production là câu hỏi pháp lý trước khi là câu hỏi kỹ thuật — đọc EULA, hỏi legal, rồi mới chọn kiến trúc.**

---

## 5. Câu hỏi tự kiểm tra

1. Disclaimer của video là gì?
2. Vì sao phân biệt B2C và cloud API?
3. Default về training trên API data theo transcript là gì?
4. Ví dụ retention của OpenAI trong transcript là gì?
5. Vì sao bank/insurer vẫn self-host dù vendor cam kết?

<details>
<summary><b>Xem đáp án</b></summary>

**1.** Không phải lawyer, không legal advice, không đại diện vendor; chỉ $0.02 giáo dục, phải hỏi legal/privacy team và đọc EULA.

**2.** Vì điều khoản data của app consumer khác API enterprise/business; video chỉ nói API cho enterprise.

**3.** Hầu hết top-tier default không dùng data gửi vào/output để train, muốn thì opt-in.

**4.** Để chống abuse có thể giữ requests 30 ngày rồi xóa, trừ yêu cầu luật khác; một số khách có zero retention.

**5.** Vì regulation quá strict về customer data, cam kết vendor vẫn chưa đủ; self-host để kiểm soát data/retention dù tốn ops, GPU, security.

</details>

## 6. Bước tiếp theo

Bài 079 — *Generative UI/UX với CopilotKit* — backend đúng chưa đủ, phải minh bạch tools và sources cho user tin.
