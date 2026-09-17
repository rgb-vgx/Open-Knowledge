# 🎬 Amazon AppStream 2.0 — stream ứng dụng desktop thẳng vào trình duyệt

> Nguồn: `235-AppStream-20-Overview.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/24682648)

Sau WorkSpaces, chúng ta đến với dịch vụ **Amazon AppStream 2.0** — thứ rất dễ bị nhầm với WorkSpaces nhưng mục tiêu hoàn toàn khác. Bài này mình sẽ chỉ rõ sự khác biệt để các bạn không chọn sai đáp án trong đề thi.

---

### 🎯 AppStream 2.0 là gì?

Amazon AppStream 2.0 là dịch vụ **desktop application streaming (truyền phát ứng dụng desktop)**. Thay vì phải mua sắm và cung cấp hạ tầng, các bạn **stream một ứng dụng tới bất kỳ máy tính nào**, và ứng dụng đó được truy cập ngay **từ trong trình duyệt web**.

Ví dụ cụ thể: bạn muốn dùng **Blender** để tạo mô hình 3D trực tiếp trong trình duyệt — hoàn toàn làm được với AppStream 2.0. Tương tự, các bạn có thể dùng **Eclipse**, **Firefox** hay các ứng dụng **OpenOffice**... ngay trong trình duyệt. Đúng như tên gọi, dịch vụ này **tập trung vào từng ứng dụng (application-focused)** và phân phối chúng qua web.

---

### 🔍 AppStream 2.0 vs WorkSpaces — đừng nhầm lẫn!

| Tiêu chí | WorkSpaces | AppStream 2.0 |
|---|---|---|
| Nhận được gì | Desktop Windows/Linux đầy đủ (VDI) | Stream một ứng dụng cụ thể |
| Cách truy cập | Remote desktop application | Trình duyệt web |
| Số ứng dụng | Mở bao nhiêu app tùy thích trong desktop | Stream đúng ứng dụng được chỉ định |
| Trạng thái | On-demand hoặc always on | Không cần kết nối tới virtual desktop |
| Tương thích | Kết nối qua remote desktop | Mọi thiết bị có trình duyệt — tương thích cao hơn |

Tóm lại: **WorkSpaces cho bạn cả một desktop ảo**, còn **AppStream 2.0 cho bạn đúng ứng dụng mình cần**, giao qua trình duyệt.

---

### 💡 Cấu hình linh hoạt theo từng ứng dụng

Một điểm rất hay của AppStream 2.0: các bạn được **cấu hình instance type (loại máy chủ) cho từng ứng dụng**.

Ví dụ với **Photoshop**, các bạn có thể nói: "Ứng dụng này cần nhiều **CPU, RAM và GPU** hơn" — và cấu hình riêng cho nó. Nhờ chạy hoàn toàn trong trình duyệt, AppStream 2.0 hoạt động trên **mọi thiết bị có web browser**, nên khả năng tương thích rộng hơn hẳn.

*Hãy nhớ kỹ cặp đôi này: WorkSpaces = desktop ảo đầy đủ; AppStream 2.0 = stream ứng dụng qua trình duyệt.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Amazon AppStream 2.0 là loại dịch vụ gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Desktop application streaming — stream ứng dụng desktop tới người dùng.

Giải thích: Bạn không cần mua sắm hay provision hạ tầng, ứng dụng được stream tới máy tính của bạn.

Tham chiếu: Mục AppStream 2.0 là gì.

</details>

**Câu 2:** Người dùng truy cập ứng dụng AppStream 2.0 qua đâu?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Trình duyệt web — không cần kết nối tới virtual desktop.

Giải thích: Ứng dụng được deliver ngay trong web browser, dùng được trên mọi thiết bị có trình duyệt.

Tham chiếu: Mục AppStream 2.0 là gì.

</details>

**Câu 3:** Khác biệt chính giữa WorkSpaces và AppStream 2.0 là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** WorkSpaces cho desktop ảo Windows/Linux đầy đủ (kết nối bằng remote desktop); AppStream 2.0 stream một ứng dụng cụ thể vào trình duyệt.

Giải thích: WorkSpaces là VDI đầy đủ, AppStream 2.0 tập trung vào từng ứng dụng.

Tham chiếu: Mục AppStream 2.0 vs WorkSpaces.

</details>

**Câu 4:** Vì sao AppStream 2.0 có khả năng tương thích rộng hơn?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì hoạt động trên mọi thiết bị có web browser.

Giải thích: Không cần cài remote desktop client như WorkSpaces.

Tham chiếu: Mục Cấu hình linh hoạt theo từng ứng dụng.

</details>

**Câu 5:** Ví dụ nào cho thấy AppStream 2.0 cấu hình được instance type theo từng ứng dụng?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Photoshop có thể được cấu hình cần nhiều CPU, RAM và GPU hơn.

Giải thích: Bạn được phép cấu hình instance type riêng cho từng ứng dụng.

Tham chiếu: Mục Cấu hình linh hoạt theo từng ứng dụng.

</details>

---

Vậy là các bạn đã phân biệt được AppStream 2.0 và WorkSpaces. Ở bài tiếp theo, chúng ta bước sang thế giới vạn vật kết nối với **AWS IoT Core**. Hẹn gặp các bạn ở đó! 🚀
