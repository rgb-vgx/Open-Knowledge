---
title: 'Nghệ Thuật Viết System Prompt: Đi Tìm Vùng "Goldilocks" Trong Context Engineering'
date: '2026-05-11 02:02:39'
date_gmt: '2026-05-10 19:02:39'
modified: '2026-05-11 02:02:39'
status: publish
slug: nghe-thuat-viet-system-prompt-di-tim-vung-goldilocks-trong-context-engineering
wordpress_id: 693
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/nghe-thuat-viet-system-prompt-di-tim-vung-goldilocks-trong-context-engineering/
categories:
- Uncategorized
tags: []
---

Xin chào các bạn! Chúng ta lại gặp nhau trong loạt bài về Context Engineering. Trong bài viết hôm nay, chúng ta sẽ cùng thảo luận về một thành phần cốt lõi nhưng thường bị hiểu sai: **System Prompt** (Câu lệnh hệ thống) và tầm quan trọng của nó trong việc định hình ngữ cảnh.

Chắc hẳn bạn đã đọc hàng ngàn bài đăng trên Twitter hay LinkedIn khuyên rằng: *"System prompt rất quan trọng, hãy tập trung tối ưu nó!"*. Thú thực, đó là lời khuyên phổ biến nhất trong giới AI Engineering. Vì vậy, thay vì lặp lại sáo ngữ đó, tôi muốn cho bạn thấy thực tế các AI Agent hàng đầu (State-of-the-art Agents) đang sử dụng System Prompt như thế nào.

## Thực Tế Từ Các AI Agent Hàng Đầu

Nếu bạn tìm kiếm trên GitHub, có một kho lưu trữ (repository) cực kỳ nổi tiếng (đạt gần 90.000 sao) chuyên tổng hợp các System Prompt bị rò rỉ của những AI Agent đình đám nhất. Phần lớn trong số đó là các công cụ hỗ trợ lập trình như Claude Code, Cursor, Devin, và cả các trợ lý như Perplexity.

Khi nhìn vào file System Prompt của Claude Code hay Cursor, bạn sẽ thấy chúng dài khoảng 200 dòng code. Với Devin, con số này lên tới 400 dòng. Các mô tả về công cụ (tool descriptions) dài hàng trăm từ được nhúng trực tiếp vào đây.

Mục đích của tôi không phải là phân tích từng dòng lệnh – điều đó cần cả một khóa học riêng – mà để nhấn mạnh một sự thật: **System Prompt là một quá trình tiến hóa liên tục**. Khi các Mô hình Ngôn ngữ Lớn (LLM) ngày càng thông minh, các câu lệnh hệ thống cũng phải được kỹ sư cập nhật và mài giũa không ngừng. Nó là một quá trình lặp đi lặp lại (iterative process) đầy công phu.

## Sự Tương Đồng Với Việc "Chỉ Đường"

Để thiết kế một System Prompt tốt, hãy tưởng tượng bạn đang chỉ đường cho một người lạ:

- Nếu bạn nói: *"Đi về hướng kia kìa"* -> Họ sẽ bối rối và không biết đi đâu.
- Nếu bạn đưa cho họ một cuốn cẩm nang dày 50 trang ghi chi tiết từng ngã rẽ, từng viên gạch trên đường -> Họ sẽ bị quá tải thông tin và cũng chẳng thể đến đích.

Mục tiêu của chúng ta là phải rõ ràng, cụ thể, nhưng chỉ cung cấp **vừa đủ** thông tin để AI hoàn thành nhiệm vụ. Và phần khó nhất chính là tìm ra điểm cân bằng đó.

## Vùng "Goldilocks": Điểm Cân Bằng Hoàn Hảo

Anthropic (công ty tạo ra Claude) gọi điểm cân bằng này là **Vùng Goldilocks** – không quá chung chung, không quá chi tiết, mà "vừa vặn hoàn hảo". Hãy cùng phân tích 3 điểm trên thang đo này:

### 1. Phía Cực Tả: Quá Chi Tiết (Too Specific)

Vấn đề cốt lõi ở đây là chúng ta đang đối xử với LLM như một "cỗ máy trạng thái xác định" (deterministic state machine) thay vì một tác nhân thông minh. Chúng ta "hard-code" các logic cứng nhắc.

- **Ví dụ:** *"Nếu người dùng báo lỗi, hãy hỏi chính xác 3 câu hỏi."* Tại sao phải là 3? Lỡ 2 câu là đủ, hoặc cần tới 5 câu thì sao?
- **Hậu quả:** Việc liệt kê mọi kịch bản có thể xảy ra là điều bất khả thi. Nó ép mô hình đi theo những lối mòn định sẵn không khớp với thực tế. Hơn nữa, việc bảo trì sẽ là một cơn ác mộng vì mỗi khi có một trường hợp ngoại lệ (edge case) mới, bạn lại phải sửa prompt. *(Lưu ý: Nếu quy trình của bạn đã có các bước cố định rõ ràng, có lẽ bạn chỉ cần một luồng công việc tự động hóa thông thường thay vì dùng AI Agent).*

### 2. Phía Cực Hữu: Quá Chung Chung (Too Vague)

Vấn đề ở đây là chúng ta cung cấp tín hiệu quá yếu, dẫn đến hành vi của AI không nhất quán.

- **Ví dụ:** *"Hãy hỗ trợ khách hàng theo đúng giá trị cốt lõi của thương hiệu."* Nhưng giá trị đó là gì? AI đâu có biết!
- **Hậu quả:** Prompt kiểu này giả định sai lầm rằng AI có cùng "ngữ cảnh chia sẻ" với bạn. Nó đặt ra những ranh giới mơ hồ kiểu *"chuyển tiếp cho nhân viên con người nếu cần"* (nhưng khi nào là cần?). Không có framework, không có cấu trúc giải quyết vấn đề. Kết quả là trong những lần chạy khác nhau, AI sẽ đưa ra những cách xử lý hoàn toàn khác biệt cho cùng một vấn đề.

### 3. Ở Giữa: Vùng "Goldilocks" (Just Right)

Một System Prompt xuất sắc sẽ nằm ở giữa và hội tụ các yếu tố sau:

- **Xác định danh tính và phạm vi rõ ràng:** Thiết lập ngay ranh giới. Ví dụ: *"Bạn là trợ lý hỗ trợ khách hàng, giải quyết các câu hỏi cơ bản, không xử lý các nghiệp vụ kinh doanh phức tạp."*
- **Trao quyền thay vì gò bó:** Thay vì chỉ định chính xác phải dùng công cụ nào trong tình huống nào, hãy thiết lập mục tiêu (ví dụ: giải quyết vấn đề nhanh chóng, chuyên nghiệp). Hãy tin tưởng rằng Agent sẽ biết cách chọn đúng công cụ khi cần.
- **Cung cấp một "Framework Tư duy" thay vì "Lưu đồ" (Flowchart):** Hướng dẫn AI tư duy theo các bước linh hoạt. Ví dụ quy trình 4 bước: *(1) Xác định vấn đề cốt lõi -> (2) Thu thập ngữ cảnh -> (3) Đưa ra giải pháp rõ ràng -> (4) Xác nhận sự hài lòng*. Đây là định hướng có thể áp dụng cho hàng ngàn kịch bản khác nhau.
- **Thiết lập nguyên tắc (Heuristics):** Đưa ra các quy tắc vàng để AI tự quyết định. Ví dụ: *"Nếu có nhiều giải pháp, hãy chọn giải pháp đơn giản nhất."* (Khá giống với thuật toán Tham lam - Greedy Algorithm trong khoa học máy tính!).

## Tại Sao "Vùng Goldilocks" Lại Vượt Trội?

Prompt quá chi tiết cố gắng suy nghĩ *thay* cho AI và sẽ thất bại khi gặp tình huống nằm ngoài kịch bản. Prompt quá chung chung lại không cho AI đủ nguyên liệu để làm việc.

Trong khi đó, prompt ở vùng Goldilocks tận dụng tối đa thế mạnh tuyệt vời nhất của các LLM hiện đại: **Khả năng nhận diện mẫu (pattern recognition) và áp dụng các quy tắc chung vào những tình huống cụ thể.**

Bằng cách dạy cho AI các "nguyên tắc" (principles) thay vì "quy tắc cứng" (rigid rules), hệ thống sẽ xử lý mượt mà cả những tình huống mới chưa từng gặp. Nó cực kỳ hiệu quả vì không lãng phí từ ngữ: các hướng dẫn được nén lại, không bị trùng lặp và không gây ra các luồng chỉ thị mâu thuẫn cho mô hình.

---

Tóm lại, System Prompt chính là nền móng của Context Engineering. Một System Prompt tốt không phải là bản hướng dẫn chi tiết từng bước, mà là một chiếc la bàn chuẩn xác để AI tự do điều hướng và giải quyết vấn đề một cách thông minh nhất. Cảm ơn các bạn đã theo dõi phần 3, hẹn gặp lại trong những bài viết tiếp theo!
