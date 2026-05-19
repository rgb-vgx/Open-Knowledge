---
title: 'Làm Chủ Claude Code: Tối Ưu Hóa Ngữ Cảnh Với Hệ Thống Lệnh Slash (Slash Commands)'
date: '2026-05-11 02:11:43'
date_gmt: '2026-05-10 19:11:43'
modified: '2026-05-11 02:11:43'
status: publish
slug: lam-chu-claude-code-toi-uu-hoa-ngu-canh-voi-he-thong-lenh-slash-slash-commands
wordpress_id: 696
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/lam-chu-claude-code-toi-uu-hoa-ngu-canh-voi-he-thong-lenh-slash-slash-commands/
categories:
- Uncategorized
tags: []
---

Xin chào các bạn! Tiếp nối chuỗi bài về Context Engineering, hôm nay chúng ta sẽ bước vào phần thực hành cốt lõi: Khám phá cách điều khiển và tối ưu hóa **Claude Code** thông qua hệ thống lệnh Slash (Slash commands).

Trong Claude Code, các lệnh bắt đầu bằng dấu gạch chéo `/` chính là công cụ tối thượng để bạn tương tác, điều chỉnh tính năng và quản lý cài đặt trực tiếp ngay trong khung chat. Chỉ cần gõ `/`, một menu danh sách các lệnh khả dụng sẽ mở ra. Dưới đây là những lệnh quan trọng nhất mà bất cứ lập trình viên nào cũng cần nắm vững.

## 1. `/clear` và `/compact`: Nghệ Thuật Giữ Ngữ Cảnh "Sạch Và Gọn"

Khi bạn làm việc liên tục với Claude Code, cuộc hội thoại sẽ nhanh chóng trở nên rất dài. Theo tài liệu phân tích kỹ thuật, điều này dẫn đến ba hệ lụy lớn: làm hệ thống phản hồi chậm hơn, tốn kém nhiều chi phí (token) hơn, và đặc biệt là gây "nhiễu" khiến AI bối rối vì có quá nhiều thông tin dư thừa phải ghi nhớ.

Để giải quyết vấn đề này đúng chuẩn Context Engineering (giữ ngữ cảnh luôn súc tích và tập trung), chúng ta có hai lệnh:

- **Lệnh `/clear`:** Đóng vai trò như một nút "Reset". Lệnh này xóa toàn bộ lịch sử trò chuyện hiện tại, đưa hệ thống về trạng thái "trang giấy trắng" (clean slate). Rất lý tưởng khi bạn vừa hoàn thành một tính năng và muốn chuyển sang một module hoàn toàn mới.
- **Lệnh `/compact`:** Đây là một "phép thuật" thực sự. Thay vì xóa trắng, `/compact` sẽ yêu cầu Claude tự động tóm tắt lại toàn bộ lịch sử hội thoại. Nó chỉ giữ lại những thông tin cốt lõi (key info) và loại bỏ các chi tiết rườm rà.

## 2. `/agents`: Xây Dựng Đội Ngũ Tác Nhân Chuyên Sâu

Khi gõ lệnh `/agents`, bạn đang kích hoạt sức mạnh của luồng làm việc Đa tác nhân (Multi-agent workflow) – một trong những tính năng tiên tiến nhất được đề cập trong tài liệu chính thức của Claude Code.

Hãy hình dung các sub-agents (đại lý phụ) như những chuyên gia được bạn tạo ra cho từng nhiệm vụ cụ thể. Thay vì để một AI ôm đồm mọi thứ, bạn có thể phân chia thành:

- **Code Reviewer:** Chuyên đánh giá và tìm lỗ hổng bảo mật.
- **Debugger:** Chuyên gia rà soát và sửa lỗi.
- **Architect:** Phụ trách thiết kế cấu trúc hệ thống.

Mỗi agent này hoạt động với bộ ngữ cảnh, công cụ và quy tắc riêng biệt. Khi kết hợp lại, một "Lead agent" (tác nhân quản lý) sẽ điều phối công việc của nhóm để hoàn thành những dự án khổng lồ một cách trơn tru.

## 3. `/config`: Tùy Biến Trải Nghiệm Cá Nhân Hóa

Gõ `/config` và nhấn Enter, bạn sẽ mở ra bảng điều khiển cài đặt (Config panel). Claude Code cung cấp mức độ cá nhân hóa cực cao. Một số tính năng đáng chú ý bao gồm:

- **Auto-compact:** Nếu bật tính năng này, Claude sẽ tự động chạy lệnh `/compact` bất cứ khi nào nó nhận thấy cửa sổ ngữ cảnh sắp quá tải, giúp bạn không cần bận tâm về việc dọn dẹp bộ nhớ thủ công.
- **Use To-do list:** AI sẽ tự động phân tích yêu cầu, lập ra một danh sách công việc cần làm và thực thi tuần tự.
- **Checkpointing:** Cho phép lưu lại các điểm khôi phục ở mỗi bước tương tác.
- **Verbose output:** Cung cấp đầu ra cực kỳ chi tiết, giải thích cặn kẽ các bước suy luận.

### Hệ Thống Cấu Hình Phân Cấp (Granular Configuration)

Theo cấu trúc chuẩn của Claude, các cài đặt được chia làm 3 lớp thông minh:

1. **Cài đặt toàn cục (User-wide settings):** Lưu tại thư mục gốc của người dùng (ví dụ: `~/.claude/settings`). Áp dụng cho mọi phiên làm việc của bạn trên mọi dự án.
2. **Cài đặt cấp dự án (Project-specific settings):** Thường nằm trong file `.claude/settings.json` hoặc định hình qua file `CLAUDE.md` tại thư mục gốc dự án. Đây là nơi chứa các quy chuẩn lập trình chung để đồng bộ cho toàn bộ đội ngũ. Kết hợp với tính năng **Auto memory** của Claude, AI sẽ tự học các lệnh build hoặc mẹo debug riêng của dự án mà không cần bạn phải cấu hình tay liên tục.
3. **Cài đặt cục bộ (Local settings):** Nơi chứa những tinh chỉnh cá nhân nhỏ lẻ của riêng bạn, không đẩy lên hệ thống chung của team.

## 4. `/cost`: Minh Bạch Ngân Sách & Chi Phí

Cuối cùng, lệnh `/cost` giúp bạn giám sát chính xác lượng chi phí đã sử dụng.

Nếu bạn đang dùng gói đăng ký trả phí định kỳ (như Claude Pro), bạn có thể không cần quá bận tâm vì hạn mức đã được bao gồm. Tuy nhiên, nếu bạn chạy Claude Code thông qua tài khoản **Anthropic Console (API key)** với mô hình tính phí theo lượng token tiêu thụ, lệnh này cực kỳ quan trọng. Nó mang lại sự minh bạch tuyệt đối – điều mà các lập trình viên từng rất đau đầu khi gặp phải sự cố định giá mập mờ từ một số nền tảng khác trước đây.

---

Hệ thống lệnh Slash chính là chiếc đũa phép giúp bạn giao tiếp và kiểm soát AI Agent một cách hiệu quả nhất. Bằng cách kết hợp `/compact`, làm chủ `/agents` và tinh chỉnh `/config` một cách khôn ngoan, bạn đã chính thức nắm được nghệ thuật Context Engineering trong thực chiến.

Hẹn gặp lại các bạn trong bài viết tiếp theo!
