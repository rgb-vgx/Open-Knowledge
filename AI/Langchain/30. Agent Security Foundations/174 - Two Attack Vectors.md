# ⚠️ Hai bề mặt tấn công (attack surface) của kỷ nguyên agentic coding

Trong chuỗi bài về bảo mật này, mình muốn tập trung vào **hai attack vector (vectơ tấn công)** chính khi làm việc với coding agent. Hiểu rõ hai bề mặt này là bước đầu tiên để biết mình đang phơi bày điều gì trước rủi ro.

---

### 🎛️ Bề mặt thứ nhất: chính "bộ khung" harness

Attack vector đầu tiên là **chính công cụ bạn đang dùng** — **Claude Code**, **Cursor**, hay **anti-gravity CLI**. Nghĩa là bản thân coding agent có thể bị xâm phạm (compromised). Hãy nhìn vào những gì chúng được cấp quyền truy cập:

* **Terminal** — chạy shell, viết code để chạy shell.
* **Credentials, API keys, environment variables**.
* **Toàn bộ máy tính của bạn**, kể cả những file chứa bí mật (secret files).

Nếu agent bị chiếm quyền, **mọi file của bạn cũng bị chiếm theo**. Và không chỉ môi trường phát triển: phần lớn thời gian chúng ta còn có quyền truy cập **production** — production deployment, image building, database production. Khi agent bị xâm phạm, kẻ tấn công có thể **lateral move (di chuyển ngang)** sang các môi trường đó.

Hãy nhân vấn đề lên 100 lần: khi bạn chạy **nhiều agent cùng lúc**, bạn vẫn muốn giữ sự linh hoạt, nhưng không thể sống trong nỗi sợ **production database có thể bị xóa sạch (dropped)** bất cứ lúc nào.

---

### 📦 Bề mặt thứ hai: những "code artifact" do agent viết ra

Bề mặt thứ hai là **code mà coding agent tạo ra**. Đoạn code này có thể mang theo vô số lỗi bảo mật:

* **Authentication không an toàn (insecure authentication)**.
* **Access control không chặt chẽ** (không enforce robust access control).
* **Lộ biến môi trường (exposing environment variables)**.
* **Logic bomb** — đoạn code "ngủ đông" đến khi thỏa điều kiện nào đó mới kích hoạt.
* **Xử lý dữ liệu multi-tenant sai cách**, làm lộ dữ liệu của người dùng này cho người dùng khác.

Nhân vấn đề này với tốc độ viết code hiện nay, chúng ta có ngay một **quả bom hẹn giờ (ticking time bomb)** gồm những bug mới và lỗ hổng mới liên tục được đưa vào phần mềm.

---

### 🔗 Supply chain attack: mối nguy ảnh hưởng cả hai bề mặt

Một loại tấn công đang gia tăng mạnh thời gian gần đây: **software supply chain attack (tấn công chuỗi cung ứng phần mềm)**. Chúng có thể tác động lên **cả hai bề mặt**:

1. **Môi trường phát triển:** coding agent tải tạm một package đã bị xâm phạm — qua đóng góp cho open source hoặc qua một dependency của nó. Package này có thể chạy ngay trong lúc agent đang chạy.
2. **Code artifact:** package bị nhiễm được cài vào code và từ đó **ảnh hưởng đến hệ thống production**.

Mình đang dự định dành hẳn một **section riêng cho supply chain attack**. Còn bây giờ, hãy nhớ rằng an toàn không phải là một tính năng — nó là một thói quen. Hẹn gặp các bạn ở bài sau! 🚀
