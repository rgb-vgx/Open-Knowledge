---
title: 'Giải Phóng Sức Mạnh Claude Code: Tự Xây Dựng Lệnh Custom Commands Của Riêng
  Bạn'
date: '2026-05-11 17:04:24'
date_gmt: '2026-05-11 10:04:24'
modified: '2026-05-11 17:04:39'
status: publish
slug: giai-phong-suc-manh-claude-code-tu-xay-dung-lenh-custom-commands-cua-rieng-ban
wordpress_id: 716
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/giai-phong-suc-manh-claude-code-tu-xay-dung-lenh-custom-commands-cua-rieng-ban/
categories:
- Claude Code
tags: []
---

Hôm nay, chúng ta sẽ đi sâu vào một trong những tính năng mang tính cách mạng và quyền lực nhất của hệ thống này: **Custom Commands** (Lệnh tùy chỉnh). Tính năng này cung cấp cho các lập trình viên khả năng sáng tạo vô tận, từ tự động hóa quy trình làm việc (workflow) cho đến những kỹ thuật siêu nâng cao như sinh ra các Agent con (spawning agents) hay siêu gợi ý (meta-prompting).

Hãy cùng mở trình soạn thảo lên và bắt đầu xây dựng những lệnh Slash (`/`) mang dấu ấn của riêng bạn!

## Custom Commands Hoạt Động Như Thế Nào?

Theo tài liệu chính thức từ Anthropic, Custom Commands cho phép bạn tạo ra các lệnh Slash (ví dụ: `/my-command`) bằng cách viết các tệp cấu hình đơn giản. Tương tự như Hệ thống Memory, Custom Commands cũng được phân cấp rõ ràng:

- **Project-scoped (Cấp dự án):** Đặt trong thư mục `.claude/commands/` của dự án. Lệnh này chỉ hoạt động khi bạn mở dự án đó, rất phù hợp cho các quy trình đặc thù của team.
- **User-scoped (Cấp người dùng):** Đặt trong thư mục gốc của bạn (ví dụ: `~/.claude/commands/`). Lệnh này sẽ đi theo bạn và hoạt động trên mọi dự án.

Claude Code hiện hỗ trợ định dạng **Markdown (`.md`)** và cả **YAML**. Dễ sử dụng nhất vẫn là Markdown. Tên tệp tin sẽ chính là tên lệnh của bạn (ví dụ: `commit-code.md` sẽ tạo ra lệnh `/commit-code`).

## Thực Hành 1: Tự Động Hóa Quá Trình Git Commit (`/commit-code`)

Chúng ta luôn đau đầu với việc phải nghĩ ra các dòng *commit message* sao cho ngắn gọn mà vẫn đủ ý. Thay vì tự viết, hãy để Claude Code làm điều đó thông qua một Custom Command.

### Bước 1: Khởi tạo lệnh cơ bản

Trong thư mục dự án của bạn, hãy tạo đường dẫn `.claude/commands/commit-code.md` và nhập nội dung sau:

Markdown

```
# Commit Code

Hãy xem xét các file đã thay đổi và tạo một Git commit với thông điệp tóm tắt những thay đổi đó. 
Luôn cố gắng đưa ra những thông điệp ngắn gọn, súc tích và truyền tải đúng logic nghiệp vụ (business logic).
```

- **Dòng tiêu đề (`# Commit Code`):** Sẽ là phần tên hiển thị trong menu gợi ý của Claude Code.
- **Phần nội dung (Prompt):** Là chỉ thị bạn giao cho AI.

### Bước 2: Thử nghiệm sức mạnh nội tại của Claude

Bây giờ, hãy mở Claude Code và gõ `/commit-code`. Bạn sẽ thấy một điều kỳ diệu xảy ra:

1. Dù bạn không hề viết dòng code Python hay Bash nào, Claude Code vẫn tự động suy luận ra việc phải gọi công cụ (tool call) để chạy lệnh `git diff` hoặc `git status`.
2. Nó sẽ quét các file chưa được theo dõi (untracked files) và đề xuất `git add`.
3. Cuối cùng, nó sẽ tạo ra một đoạn commit message dựa trên nội dung mã nguồn đã thay đổi.

Claude Code xử lý các lệnh Terminal cực kỳ thông minh và luôn hỏi quyền (ask for permission) trước khi thực thi để đảm bảo an toàn.

### Bước 3: Nâng cấp lệnh với biến `$ARGUMENTS`

Đôi khi commit do AI tạo ra hơi chung chung. Bạn muốn đưa thêm "gợi ý" (hint) cho nó? Tài liệu của Claude Code cung cấp một biến môi trường cực kỳ mạnh mẽ: **`$ARGUMENTS`** (hoặc `$arguments`). Biến này giúp lệnh của bạn nhận dữ liệu động từ người dùng.

Hãy sửa lại tệp `commit-code.md` như sau:

Markdown

```
# Commit Code

Hãy xem xét các file đã thay đổi và tạo một Git commit với thông điệp tóm tắt những thay đổi đó. 
Sử dụng gợi ý sau của người dùng để làm chủ đề chính cho thông điệp commit: $ARGUMENTS

Luôn cố gắng đưa ra những thông điệp ngắn gọn, súc tích và truyền tải đúng logic nghiệp vụ.
```

Lần này, khi gõ lệnh, bạn có thể truyền tham số động: `/commit-code Thêm tính năng custom commands cho hệ thống`. Claude sẽ lập tức lấy câu nói của bạn gán vào biến `$ARGUMENTS`, kết hợp với việc đọc file diff, để cho ra một dòng commit message hoàn hảo và cực kỳ bám sát ý đồ của bạn.

## Thực Hành 2: Lệnh Giải Trí (`/dadjokes`)

Để thấy sự linh hoạt, bạn có thể tạo các lệnh không liên quan đến code. Hãy tạo file `dadjokes.md`:

Markdown

```
# Dad Jokes

Hãy kể một câu chuyện cười nhạt (dad joke) liên quan đến chủ đề sau: $ARGUMENTS
```

Thử gõ: `/dadjokes code generation`. Claude có thể sẽ trả lời bạn: *"Tại sao các lập trình viên không bao giờ mệt khi viết vòng lặp? Vì họ luôn thấy nó refreshing (làm mới)!"*. (Dù không buồn cười lắm, nhưng nó chứng minh cơ chế truyền biến hoạt động rất mượt mà!).

## Tại Sao Custom Commands Của Claude Code Lại Vượt Trội?

Nếu bạn đang sử dụng Cursor, bạn có thể thắc mắc: *"Cursor cũng có nút Generate Commit Message tự động mà?"*.

Đúng vậy! Tuy nhiên, tính năng của Cursor là phần mềm được lập trình cứng (hard-coded). Trong khi đó, hệ thống Custom Commands của Claude Code mở ra khả năng **tùy biến không giới hạn (endless customization)**.

Trong môi trường phần mềm doanh nghiệp (Enterprise), mỗi team lại có một tiêu chuẩn khắt khe riêng. Có team dùng Conventional Commits, có team yêu cầu phải gắn mã vé Jira (Jira Ticket ID) vào đầu commit, có team lại có style riêng. Với Claude Code, bạn có thể tùy biến toàn bộ quá trình này sao cho khớp 100% với chuẩn mực của công ty bạn bằng một file Markdown cực kỳ đơn giản.

---

Với Custom Commands, bạn không chỉ đang dùng một AI Assistant, mà bạn đang tự tay lập trình lại "bộ não" của chính nó. Ở các bài viết tiếp theo nâng cao hơn, chúng ta sẽ cùng khám phá cách dùng Slash command để kích hoạt các Agent song song. Hãy chuẩn bị các tệp lệnh của bạn và hẹn gặp lại!
