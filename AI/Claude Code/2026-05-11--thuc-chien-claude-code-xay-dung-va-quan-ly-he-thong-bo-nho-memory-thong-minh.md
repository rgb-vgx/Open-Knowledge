---
title: 'Thực Chiến Claude Code: Xây Dựng Và Quản Lý Hệ Thống Bộ Nhớ (Memory) Thông
  Minh'
date: '2026-05-11 15:16:30'
date_gmt: '2026-05-11 08:16:30'
modified: '2026-05-11 16:22:27'
status: publish
slug: thuc-chien-claude-code-xay-dung-va-quan-ly-he-thong-bo-nho-memory-thong-minh
wordpress_id: 708
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/thuc-chien-claude-code-xay-dung-va-quan-ly-he-thong-bo-nho-memory-thong-minh/
categories:
- Claude Code
tags: []
---

---

Xin chào các bạn! Trong các bài viết trước, chúng ta đã tìm hiểu rất nhiều lý thuyết về Context Engineering và hệ thống Memory của Claude Code. Hôm nay, chúng ta sẽ xắn tay áo lên và bước vào phần **Thực hành (Hands-on)** để xem những khái niệm này thực sự hoạt động như thế nào trong một dự án thực tế.

Để minh họa, tôi sẽ sử dụng một dự án mẫu có tên là **Icebreaker** (một ứng dụng Python sử dụng framework LangChain để cào dữ liệu từ LinkedIn/X và tạo ra các đoạn hội thoại mở lời).

Hãy cùng mở Cursor lên, khởi động Claude Code và bắt đầu định hình "bộ não" cho AI của chúng ta!

## 1. Lệnh `/init`: Tự Động Hóa Việc Tạo "Luật" Cho Dự Án

Khi bạn vừa clone một dự án mới về máy, việc đầu tiên cần làm là giúp Claude Code hiểu được toàn cảnh cấu trúc của dự án đó. Thay vì phải ngồi tự viết file `CLAUDE.md` một cách thủ công, tài liệu chính thức của Claude cung cấp cho chúng ta một "vũ khí" cực kỳ mạnh mẽ: lệnh `/init`.

**Cách thực hiện:**

Ngay trong giao diện chat của Claude Code, bạn chỉ cần gõ:

```
/init
```

**Điều gì thực sự xảy ra dưới nền?**

Ngay lập tức, Claude Code sẽ thực hiện một quy trình quét sâu (Deep Scan):

1. Nó duyệt qua tất cả các thư mục và tập tin trong dự án.
2. Đọc các file cấu hình môi trường (như `requirements.txt`, `Pipfile` hoặc `package.json`).
3. Sử dụng các biểu thức chính quy (Regular Expressions) để phân tích cú pháp, xác định tech stack (công nghệ đang dùng), cách quản lý package (ví dụ: `pip` hay `uv`), và các biến môi trường cần thiết.

Chỉ sau 1-2 phút, Claude sẽ đề xuất một file `CLAUDE.md` hoàn chỉnh. Trong dự án Icebreaker, file này đã tự động ghi chú chính xác cách chạy dự án, cài đặt môi trường, và tóm tắt cấu trúc thư mục (phần search, phần summary, phần agents...). Bạn chỉ cần nhấn **Yes** để lưu file này vào thư mục gốc.

> 💡 **Mẹo Kiểm Tra:** Sau khi khởi tạo xong, hãy thử hỏi Claude: *"Dự án này đang dùng tech stack gì?"*. AI sẽ trả lời ngay lập tức và chính xác dựa trên file `CLAUDE.md` vừa tạo. **Lưu ý:** Để chắc chắn Claude đang đọc từ Memory chứ không phải đang "nhìn lén" lịch sử trò chuyện cũ, hãy chạy lệnh `/clear` để xóa trắng ngữ cảnh hội thoại trước khi hỏi nhé!

## 2. Phân Biệt Bộ Nhớ Người Dùng (User Memory) & Bộ Nhớ Dự Án (Project Memory)

Để hiểu rõ cách Claude phân cấp thông tin, chúng ta hãy thử một bài test nhỏ thú vị.

**Bước 1: Ghi nhớ vào Project Memory (Bộ nhớ dự án)**

Trong chat, bạn sử dụng ký tự hashtag `#` (hoặc nhắc trực tiếp): *"Hãy nhớ rằng: Tôi thích ăn Pizza"*.

Claude sẽ ghi thông tin này vào file `CLAUDE.md` tại thư mục dự án hiện tại. Bạn có thể mở file này lên để kiểm chứng.

**Bước 2: Ghi nhớ vào User Memory (Bộ nhớ người dùng)**

Tiếp theo, bạn dùng lệnh `#` và nói: *"Hãy nhớ vào bộ nhớ người dùng (User Memory) rằng: Tôi thích ăn Hamburger"*.

Lúc này, thông tin sẽ không nằm trong thư mục dự án nữa, mà được lưu ở thư mục gốc của hệ thống máy tính của bạn (thường là `~/.claude/claude.md`).

**Sự khác biệt là gì?**

Sau khi chạy `/clear` để xóa lịch sử, bạn hỏi lại: *"Tôi thích ăn gì?"*.

Claude Code sẽ trả lời: *"Bạn thích ăn Pizza và Hamburger"*.

Hệ thống của Claude đã tự động "trộn" (merge) ngữ cảnh từ file `CLAUDE.md` của dự án (Pizza) và file `.claude.md` của cá nhân bạn (Hamburger) lại với nhau. Điều này có nghĩa là, thói quen cá nhân của bạn (User Memory) sẽ đi theo bạn qua mọi dự án, trong khi luật của dự án (Project Memory) chỉ tồn tại ở dự án đó.

## 3. Quản Lý Ngữ Cảnh Quy Mô Lớn: Phân Tán Các File `CLAUDE.md`

Điều gì xảy ra nếu dự án của bạn là một hệ thống Monorepo khổng lồ? Bạn không thể nhồi nhét mọi thứ vào một file `CLAUDE.md` duy nhất. Nó sẽ quá lớn, làm lãng phí Token và khiến AI dễ bị nhầm lẫn (Context Confusion).

Theo tài liệu từ Anthropic, Claude Code hỗ trợ một tính năng tuyệt vời: **Traverse đệ quy (Recursive Traversal)**.

Bạn hoàn toàn có thể tạo nhiều file `CLAUDE.md` và đặt chúng ở các thư mục con khác nhau:

- `/server/CLAUDE.md`: Chứa luật cho Backend, database, API.
- `/client/CLAUDE.md`: Chứa luật cho Frontend, UI/UX, React/Vue.
- `/devops/CLAUDE.md`: Chứa luật cho Docker, CI/CD.

Khi bạn đang đứng làm việc ở thư mục `/server/src/`, Claude Code sẽ đọc file `CLAUDE.md` tại thư mục `server/`, sau đó quét ngược lên thư mục gốc. Nó sẽ **không** đọc file ở thư mục `client/`. Cách cấu trúc này giúp ngữ cảnh của AI luôn sắc bén và liên quan mật thiết đến vùng code bạn đang thao tác.

## 4. Tầm Cao Mới: Chuyển Đổi Ngữ Cảnh Động Bằng Hooks

Sẽ ra sao nếu chúng ta kết hợp hệ thống Memory với hệ thống Hooks? Bạn sẽ có trong tay quyền năng kiểm soát hoàn toàn hệ thống AI Agent!

Thay vì load toàn bộ ngữ cảnh, bạn có thể thiết lập một **Context Switch Hook**. Cụ thể:

- Bạn viết một Hook kiểm tra luồng tin nhắn đầu vào (User Input) của người dùng.
- Nếu người dùng chat từ khóa "database" -> Hook tự động đính kèm tệp ngữ cảnh `database_rules.md` vào Claude.
- Nếu người dùng chat "frontend" -> Hook tự động đính kèm `frontend_components.md`.

Sự kết hợp này tạo ra một sự phân bổ trí nhớ hoàn hảo. Các Sub-agents của bạn chỉ nhận đúng thông tin chúng cần vào đúng thời điểm, không thừa không thiếu. Đó chính là đỉnh cao của Context Engineering mà các ứng dụng hiện đại đang hướng tới.

---

Tóm lại, thông qua lệnh `/init`, việc hiểu rõ cơ chế quét file đệ quy và khả năng phân cấp dữ liệu, bạn hoàn toàn có thể biến file `CLAUDE.md` thành một cuốn bách khoa toàn thư sắc bén cho AI của mình. Hãy thử cấu trúc lại thư mục dự án của bạn và tạo các file Memory chuyên biệt để thấy hiệu năng thay đổi khác biệt thế nào nhé! Chúc các bạn code vui vẻ!
