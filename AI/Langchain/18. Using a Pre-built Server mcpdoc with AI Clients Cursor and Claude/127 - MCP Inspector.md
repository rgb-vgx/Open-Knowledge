# 🕵️ MCP Inspector: "Kính hiển vi" để soi và debug MCP Server (Công cụ mã nguồn mở từ Anthropic)

Chào các bạn, Eden đây! Hôm nay mình muốn giới thiệu **MCP Inspector** – một **dự án mã nguồn mở của team Anthropic**, chính là những người đã tạo ra **MCP (Model Context Protocol)**.

Công cụ này giúp chúng ta **troubleshoot, debug, trace** và **nhìn thấy chính xác điều gì đang diễn ra bên trong MCP server**. Khi bắt tay vào xây MCP server, đây là một trong những tool **quan trọng nhất**, giúp cuộc sống dev của bạn nhẹ nhàng hơn hẳn. Bài này chỉ là **tổng quan nhanh**; phần còn lại của khóa học sẽ dùng đến **hầu hết những tính năng hữu ích** của nó.

---

### 🧪 MCP Inspector là gì và chạy thế nào?

**MCP Inspector** là một **interactive dev tool** dành cho việc **test và debug MCP server**. Nó cho phép developer **inspect và tương tác** với MCP server **mà không cần cài đặt gì cả** – bạn chạy nó **locally từ NPX**.

*Nghĩa là bạn có ngay một "cửa sổ" để nhìn vào server mà không phải dựng thêm bất kỳ môi trường phức tạp nào.*

---

### 📋 Bốn khu vực hữu dụng nhất

Khi kết nối vào một MCP server, bạn sẽ làm việc chủ yếu với:

* **Resources tab:** liệt kê toàn bộ **resource** khả dụng, hiển thị **metadata** và cho phép **inspect nội dung**.
* **Prompts tab:** hiển thị các **prompt template**, các **prompt arguments**, và thậm chí cho phép **test với input tùy chỉnh**.
* **Tools tab:** liệt kê mọi **tool khả dụng** cùng **schema** của chúng, và cho phép **chạy thử tool với input tùy chỉnh**.
* **Notifications pane:** hiển thị **log và notification** do server gửi ra.

---

### 🎬 Demo: kết nối, list tool và chạy thử trong playground

Trong phần demo, mình kết nối tới một server chạy trên **localhost**, và lần này mình dùng **SSE server** chứ không phải **STDIO server**. Sau khi bấm **Connect**, server lộ diện các tool của nó.

Mục tiêu của phần demo rất đơn giản: xem server đang expose những gì, và kiểm tra từng tool chạy ra sao với input thật.

* Bấm **list tools** → server này có **2 tool**: **`list document sources`** và **`fetch docs`**.
* Đây là một **documentation MCP server**, giúp **fetch động tài liệu mới nhất của các package nổi tiếng**. Đừng bận tâm quá về việc server làm gì cụ thể – mình muốn các bạn thấy **cách MCP Inspector hoạt động**.
* Ta có thể **run tool `list document sources`** và xem **output trả về**.
* Với **`fetch docs`**, mình dán một **input động** và xem **kết quả sau khi thực thi tool**.

Cái **playground** này cực kỳ hữu ích để **debug tool** và xác nhận **MCP server của chúng ta đang chạy đúng**.

*Và đây mới chỉ là phần nổi của tảng băng – còn nhiều tính năng rất hữu ích của MCP Inspector sẽ xuất hiện xuyên suốt khóa học.*

Hẹn gặp lại các bạn ở video tiếp theo! 🚀
