# 🪟 Hướng dẫn cài AWS CLI trên Windows (Bản 2)

> Nguồn: `020-AWS-CLI-Setup-on-Windows.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20395725)

Trong bài ngắn này, mình sẽ hướng dẫn các bạn **cài AWS CLI phiên bản 2** trên Windows. *Đừng lo, quá trình cài đặt cực kỳ đơn giản* — chỉ khoảng vài cú click.

---

### 📥 Bước 1 — Tìm bộ cài AWS CLI v2

Mở Google và tìm **"aws CLI install windows"**. Trong danh sách kết quả, bạn chọn link cài **AWS CLI version 2 on Windows** — đây là bản **mới nhất**, đảm bảo luôn cập nhật.

*Bản 2 không khác nhiều so với bản 1*: **hiệu năng và khả năng được cải thiện**, còn **API hoàn toàn giống hệt**, kèm **trình cài đặt tốt hơn**.

Tại trang hướng dẫn, kéo xuống mục **Install on Windows** và tải **MSI installer**.

---

### ⚙️ Bước 2 — Chạy MSI installer

1. Mở file installer vừa tải.
2. Bấm **Next**.
3. Chấp nhận **điều khoản license**, bấm **Next**.
4. Bấm **Install** và chờ trong giây lát.
5. Nếu Windows hỏi quyền — bấm **Allow**.
6. Cài xong, bấm **Finish**.

---

### ✅ Bước 3 — Kiểm tra cài đặt

Mở **Command Prompt** trên Windows và gõ:

```powershell
aws --version
```

Nếu kết quả trả về:

* **aws-cli** với version bắt đầu bằng **2**,
* kèm thông tin **Python** và **Windows**,

thì AWS CLI đã được cài đặt thành công và bạn sẵn sàng dùng tiếp.

---

### 🔄 Nâng cấp AWS CLI sau này

Muốn **nâng cấp**? Chỉ cần **tải lại MSI installer** rồi **chạy lại cài đặt** — AWS CLI sẽ được **tự động nâng cấp**.

---

Vậy là AWS CLI đã sẵn sàng trên Windows. Nếu bạn dùng Mac, đừng lo — bài tiếp theo mình sẽ hướng dẫn cài đặt trên macOS. Hẹn gặp các bạn! 🚀
