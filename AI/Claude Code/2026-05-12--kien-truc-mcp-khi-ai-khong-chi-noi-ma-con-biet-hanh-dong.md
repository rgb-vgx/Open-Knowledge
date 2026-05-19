---
title: 'Kiến Trúc MCP: Khi AI Không Chỉ "Nói" Mà Còn Biết "Hành Động"'
date: '2026-05-12 01:16:24'
date_gmt: '2026-05-11 18:16:24'
modified: '2026-05-12 01:16:24'
status: publish
slug: kien-truc-mcp-khi-ai-khong-chi-noi-ma-con-biet-hanh-dong
wordpress_id: 729
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/kien-truc-mcp-khi-ai-khong-chi-noi-ma-con-biet-hanh-dong/
categories:
- Claude Code
tags: []
---

Xin chào các bạn! Ở bài trước, chúng ta đã hiểu tại sao MCP ra đời để giải quyết bài toán "ác mộng tích hợp". Hôm nay, hãy cùng đi sâu vào cấu trúc bên trong và xem cách giao thức này biến những ý tưởng "điên rồ" thành hiện thực.

## 1. Mục Tiêu Của MCP: Chuẩn Hóa "Ngữ Cảnh"

Nhắc lại một chút, mục tiêu của Model Context Protocol là **chuẩn hóa cách các ứng dụng cung cấp ngữ cảnh cho LLM**. Nhưng "ngữ cảnh" ở đây không chỉ đơn thuần là vài dòng chữ bạn gõ vào prompt. Trong hệ sinh thái MCP, ngữ cảnh bao gồm:

- **Thông tin bổ sung:** Dữ liệu từ file, database, tài liệu.
- **Công cụ (Tools):** Các hàm thực thi hành động (gửi mail, chạy lệnh, gọi API).
- **Mẫu câu lệnh (Prompts):** Các template được thiết kế sẵn để tối ưu tư duy cho AI.

Khi có một tiêu chuẩn chung, những thứ "không tưởng" sẽ bắt đầu xuất hiện.

## 2. Câu Chuyện Về Chiếc Bánh Fika: AI Agent Đặt Đồ Ăn

Hãy lấy một ví dụ thực tế từ cộng đồng: Một kỹ sư tên Eric Dickerson đã viết một MCP Server cho **Cursor**. MCP Server này kết nối trực tiếp với tài khoản **Uber Eats** của anh ấy.

Kết quả là gì? Anh ấy chỉ cần gõ vào IDE: *"Tôi muốn ăn Fika, ở đâu có bán bánh này nhỉ?"*.

1. AI không chỉ trả lời bằng văn bản. Nó sử dụng công cụ từ MCP Server để **quét menu** của các cửa hàng gần đó.
2. Nó lọc ra các kết quả phù hợp.
3. Nó hỏi người dùng có muốn đặt không. Khi anh ấy xác nhận, AI tự động gọi tool `Order Food` để **thanh toán và đặt hàng**.

Đây chính là minh chứng cho sức mạnh của MCP: **AI không chỉ biết tư duy, nó đã có "tay chân" để tương tác với thế giới thực.**

## 3. Bản Chất "USB-C": Kết Nối Ứng Dụng, Không Phải Kết Nối Model

Một điểm cực kỳ quan trọng mà bạn cần lưu ý: MCP là giao thức kết nối **AI Applications** (như Claude Code, Claude Desktop, Windsurf, Cursor) chứ không phải kết nối trực tiếp vào các Model (như Sonnet 3.7 hay GPT-4).

Giống như chuẩn USB-C:

- **MCP Server** giống như một thiết bị ngoại vi (ổ cứng, chuột).
- **AI Application** là chiếc laptop. Bạn có thể rút ổ cứng từ máy Mac (Claude Desktop) và cắm vào máy Dell (Windsurf), nó vẫn hoạt động hoàn hảo vì cả hai đều dùng chung chuẩn USB-C. Điều này giúp chúng ta thoát khỏi sự phụ thuộc vào bất kỳ nhà cung cấp LLM nào. Bạn viết công cụ một lần, và dùng nó ở bất cứ đâu.

## 4. Các Thành Phần Cốt Lõi Của Kiến Trúc MCP

Theo tài liệu chính thức từ Anthropic, kiến trúc MCP gồm 3 lớp nhân vật chính:

### **MCP Host (Phía bên trái)**

Đây là ứng dụng đóng vai trò "đầu não", nơi bạn trực tiếp tương tác.

- **Ví dụ:** Claude Code, Claude Desktop, các IDE hỗ trợ MCP (Cursor, Windsurf), hoặc một Agent chuyên biệt do bạn tự viết.
- **Nhiệm vụ:** Tiếp nhận yêu cầu của người dùng và điều phối các nguồn lực từ MCP Server.

### **MCP Server (Phía bên phải)**

Đây là bên cung cấp sức mạnh thực thi và dữ liệu.

- **Nhiệm vụ:** Expose (phơi bày) các **Resources** (dữ liệu như PDF, DB), **Tools** (API gọi thời tiết, đặt hàng), và **Prompts** (mẫu câu lệnh).
- **Giao diện lập trình:** Để một Server hoạt động đúng chuẩn, nó phải triển khai các phương thức như:
  - `list_tools` / `call_tool`: Để AI biết mình có gì và cách dùng.
  - `list_resources`: Để AI biết có nguồn dữ liệu nào.
  - `list_prompts`: Để cung cấp các mẫu câu lệnh tối ưu.

### **MCP Client (Cầu nối ở giữa)**

Nằm bên trong MCP Host, đây là "phiên dịch viên" giúp Host nói chuyện được với Server.

- **Lưu ý kỹ thuật:** Có một mối quan hệ **1-1** giữa MCP Client và MCP Server.
- **Cách hoạt động:** Nếu một MCP Host (như Claude Desktop) muốn kết nối với 5 dịch vụ khác nhau (Thời tiết, GitHub, Slack, Uber Eats, Google Search), nó sẽ phải khởi tạo **5 MCP Clients** tương ứng bên trong để quản lý 5 kết nối này.

---

## Tổng Kết Ưu Điểm Của MCP

1. **Hệ sinh thái Plug-and-Play:** Một danh sách khổng lồ các nguồn dữ liệu và công cụ có sẵn để "cắm vào" AI của bạn ngay lập tức.
2. **Không bị khóa chặt (Decoupling):** Bạn không bị trói buộc vào một nhà cung cấp ứng dụng AI cụ thể. Công cụ của bạn là của bạn.
3. **Tối ưu hóa Context Engineering:** Thay vì nhồi nhét mọi thứ vào prompt, bạn cung cấp cho AI đúng công cụ và đúng dữ liệu vào đúng thời điểm thông qua cơ chế Tool Calling.

Ở bài viết tiếp theo, chúng ta sẽ bắt đầu "đụng chạm" vào mã nguồn: **Cách triển khai một MCP Server đầu tiên.** Hãy sẵn sàng để biến AI của bạn thành một "siêu nhân" thực thụ!
