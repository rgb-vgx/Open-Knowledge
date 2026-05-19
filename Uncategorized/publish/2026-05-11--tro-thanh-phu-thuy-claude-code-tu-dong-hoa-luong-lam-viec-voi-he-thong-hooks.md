---
title: 'Trở Thành "Phù Thủy" Claude Code: Tự Động Hóa Luồng Làm Việc Với Hệ Thống
  Hooks'
date: '2026-05-11 02:16:29'
date_gmt: '2026-05-10 19:16:29'
modified: '2026-05-11 02:16:49'
status: publish
slug: tro-thanh-phu-thuy-claude-code-tu-dong-hoa-luong-lam-viec-voi-he-thong-hooks
wordpress_id: 698
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/11/tro-thanh-phu-thuy-claude-code-tu-dong-hoa-luong-lam-viec-voi-he-thong-hooks/
categories:
- Uncategorized
tags: []
---

---

Xin chào các bạn! Chào mừng trở lại với loạt bài hướng dẫn chuyên sâu về Claude Code và Context Engineering.

Hôm nay, chúng ta sẽ khám phá một trong những tính năng mạnh mẽ và thú vị nhất của Claude Code: **Hooks**. Nếu bạn muốn biến AI Assistant của mình từ một công cụ thụ động thành một cỗ máy tự động hóa thông minh, đây chính là bài viết dành cho bạn.

## Hooks Trong Claude Code Là Gì?

Trong lập trình, "Hook" (cái móc) là một kỹ thuật cho phép bạn can thiệp vào một luồng xử lý có sẵn. Tương tự như vậy, **Hooks trong Claude Code là các lệnh tự động được kích hoạt tại những thời điểm (sự kiện) cụ thể trong quá trình Claude làm việc.**

Bạn có thể thiết lập Hook chạy:

- Trước hoặc sau khi Claude sử dụng một công cụ (tool).
- Khi Claude vừa hoàn thành việc xuất câu trả lời (stop).
- Khi xảy ra lỗi...

**Tại sao Hooks lại quan trọng?**

Nó giúp chúng ta tự động hóa các tác vụ lặp đi lặp lại như: format lại code, chạy Unit Test sau mỗi lần sửa đổi, chặn các đoạn code không an toàn (unsafe edits), hoặc thậm chí... kích hoạt các Sub-agents (tác nhân phụ) với ngữ cảnh riêng biệt. Đây là một bước tiến dài trong Context Engineering, giúp duy trì tính nhất quán và kỷ luật cho dự án của bạn.

---

## Thực Hành: Tạo Hook Phát Âm Thanh Thông Báo Khi Claude Xử Lý Xong

Để làm quen, chúng ta sẽ thực hiện một bài thực hành thú vị: Viết một Hook bằng Python để phát ra một âm thanh (ví dụ: tiếng "Ooh la la") mỗi khi Claude Code hoàn thành việc trả lời bạn.

### Bước 1: Khởi tạo môi trường với `uv`

Trong ví dụ này, chúng ta sẽ sử dụng **`uv`** thay vì `pip` truyền thống.

> *💡 **Thông tin mở rộng:** `uv` là một công cụ quản lý gói Python (Package Manager) được viết bằng Rust bởi đội ngũ Astral. Nó được mệnh danh là giải pháp thay thế siêu tốc cho `pip` và `venv`, giúp khởi tạo môi trường ảo và cài đặt thư viện nhanh hơn gấp hàng chục lần.*

Mở Terminal và khởi tạo môi trường:

Bash

```
uv init
```

Lệnh này sẽ tạo ra một môi trường ảo (virtual environment). Tiếp theo, chúng ta tạo một file có tên `playsound.py`.

### Bước 2: Yêu cầu Claude Code viết script

Bây giờ, hãy mở Claude Code (tích hợp trong Cursor) và yêu cầu nó viết code cho chúng ta bằng cú pháp tag file `@`:

**Prompt:** *"Hãy viết một script Python sử dụng thư viện pygame để phát file âm thanh 'ooh\_la\_la.mp3' mỗi khi script được chạy. Cập nhật vào file @playsound.py"*

**Cơ Chế Bảo Mật Của Claude Code:**

Lúc này, bạn sẽ thấy tính năng bảo mật tuyệt vời của Claude. Giao diện sẽ hiện ra một bản so sánh (Diff view) cho thấy những dòng code được thêm/bớt. Đồng thời, Claude sẽ hỏi ý kiến bạn:

1. **Yes:** Đồng ý cho phép sửa file lần này.
2. **Yes, don't ask again for this session:** Đồng ý và tự động chấp nhận (Auto-accept) các thay đổi trên file này trong suốt phiên làm việc hiện tại.
3. **No:** Từ chối và yêu cầu Claude làm cách khác.

Vì AI xử lý trực tiếp trên mã nguồn của bạn, cơ chế "xin phép" này giúp ngăn chặn các đoạn code độc hại. Chúng ta chọn **Option 2** để làm việc nhanh hơn.

Sau khi Claude viết xong script sử dụng thư viện `pygame`, hãy cài đặt thư viện này thông qua `uv`:

Bash

```
uv add pygame
```

Chạy thử lệnh `uv run playsound.py`, nếu bạn nghe thấy âm thanh, script đã hoạt động hoàn hảo!

### Bước 3: Cấu Hình Hook Trong Claude Code

Bây giờ là lúc kết nối script Python vừa tạo vào luồng làm việc của Claude. Chúng ta sẽ sử dụng hệ thống lệnh Slash:

1. Gõ `/hooks` và nhấn Enter.
2. Chọn **Add a hook**.
3. Chọn sự kiện (Event): Ở đây chúng ta chọn **`stop`** (Hook này sẽ kích hoạt ngay khi Claude chuẩn bị kết thúc luồng phản hồi).
4. Nhập lệnh thực thi (Command): Nhập đường dẫn trọn vẹn để chạy file, ví dụ:`uv run /đường_dẫn_tuyệt_đối_đến_thư_mục/playsound.py`
5. Chọn phạm vi: Chọn **Project settings** để Hook này chỉ áp dụng cho dự án hiện tại.

### Bước 4: Khám Phá File Cấu Hình `.claude/settings.json`

Sau khi thiết lập, nếu mở thư mục dự án, bạn sẽ thấy Claude vừa tạo ra một thư mục `.claude` chứa file `settings.json`. Cấu trúc của nó rất trực quan:

JSON

```
{
  "hooks": {
    "stop": [
      {
        "matcher": ".*",
        "type": "command",
        "command": "uv run /path/to/playsound.py"
      }
    ]
  }
}
```

- **`stop`**: Là sự kiện kích hoạt.
- **`matcher`**: Sử dụng Regular Expression (RegEx) để lọc các điều kiện nâng cao (ví dụ: chỉ chạy hook nếu câu trả lời chứa từ khóa nhất định).
- **Danh sách mảng `[]`**: Lưu ý rằng một sự kiện có thể chứa nhiều Hook khác nhau chạy nối tiếp.

**Lưu ý quan trọng:** Để Hook có hiệu lực, bạn cần **thoát khỏi phiên làm việc hiện tại của Claude Code và mở lại**. Bây giờ, hãy thử chat "Hello", và khi Claude trả lời xong, bạn sẽ nghe thấy tiếng chuông thông báo của mình!

---

## Sức Mạnh Thực Sự Của Hooks Nằm Ở Đâu?

Ví dụ trên chỉ là một hàm tiện ích cơ bản (Utility function). Sức mạnh thực sự của Context Engineering với Hooks nằm ở các khía cạnh nâng cao hơn:

1. **Nhận Đối Số (Arguments):** Hook không chỉ chạy một lệnh tĩnh, nó có thể nhận dữ liệu đầu vào chính là *ngữ cảnh hiện tại* của Claude (ví dụ: lịch sử chat, loại công cụ đang được gọi, file đang được chỉnh sửa).
2. **Định Hướng Đầu Ra:** Kết quả trả về của Hook có thể được Claude đọc lại để quyết định bước đi tiếp theo (ví dụ: Hook chạy Unit Test báo lỗi `Failed`, Claude sẽ tự động đọc lỗi đó và bắt đầu debug).
3. **Tổ Chức Chuyên Nghiệp:** Best practice (Phương pháp tối ưu) là bạn nên tạo một thư mục riêng tên là `hooks/` trong dự án để chứa tất cả các script tự động hóa này.

---

## Bonus: Nâng Tầm Thông Báo Với Ntfy.sh

Ở cuối video, tác giả có nhắc đến một dịch vụ rất thú vị để nhận thông báo có tên là **"Notify"** (tên chính xác của công cụ này là **Ntfy.sh**).

> *💡 **Khám phá Ntfy.sh:** Đây là một công cụ mã nguồn mở (Open-source), hoạt động dựa trên cơ chế Pub-Sub (Publish-Subscribe) cực kỳ gọn nhẹ. Thay vì phải thiết lập API phức tạp hay tải các ứng dụng nặng nề, bạn chỉ cần gửi một HTTP Request đơn giản (ví dụ bằng lệnh `curl`) đến một Topic tự chọn trên ntfy.sh. Ngay lập tức, điện thoại của bạn (qua app Ntfy), WhatsApp, hoặc Email sẽ nhận được thông báo đẩy (Push notification).*

Bạn hoàn toàn có thể kết hợp Ntfy.sh vào Hook của Claude Code. Hãy tưởng tượng: Bạn yêu cầu Claude Code refactor (cấu trúc lại) một lượng lớn file code mất khoảng 10 phút. Bạn có thể rời máy đi pha cà phê, và Hook sẽ tự động gửi một thông báo Push về điện thoại của bạn qua Ntfy ngay khi Claude hoàn thành công việc!

---

Hooks chính là cầu nối giúp Claude Code hòa nhập hoàn hảo vào quy trình CI/CD và môi trường làm việc đặc thù của bạn. Trong các bài học tiếp theo, chúng ta sẽ tiến tới những ứng dụng phức tạp hơn của Hooks, bao gồm việc chặn đứng các đoạn code rác và quản lý luồng Sub-agents. Các bạn nhớ đón xem nhé!
