# 💬 Thiết kế ứng dụng chat kiểu WhatsApp — Bước 1: Hiểu bài toán và chốt scope

> Nguồn: `083-Understanding-the-Problem-Defining-the-Scope.txt` · [Udemy](https://ua.udemy.com/course/mastering-system-design-from-basics-to-cracking-interviews/learn/lecture/49824337)

Trong case study đầu tiên của phần thực hành này, mình và các bạn sẽ thiết kế một **ứng dụng chat thời gian thực quy mô production (quy mô vận hành thật)** giống như **WhatsApp**: làm sao để tin nhắn được gửi đi tức thời, đáng tin cậy, bảo mật, và phục vụ được **hàng triệu người dùng đồng thời**.

Trước khi vẽ kiến trúc, chúng ta phải **cực kỳ rõ ràng về thứ mình đang xây**. Mọi quyết định kiến trúc về sau — chọn service nào, database nào, giao tiếp ra sao — đều phải xuất phát từ chính các yêu cầu này. Vậy nên hãy bắt đầu từ bước 1: hiểu bài toán và định nghĩa scope.

---

### 🎯 Yêu cầu chức năng — chúng ta đang xây gì?

Mục tiêu là một ứng dụng chat giống WhatsApp, nơi giao tiếp diễn ra **tức thì, đáng tin cậy và liền mạch**, bất kể số lượng người dùng là bao nhiêu. Các năng lực cốt lõi gồm:

* **Nhắn tin 1-1 và nhắn nhóm** — đây là năng lực nền tảng. Dù cuộc trò chuyện chỉ có hai người hay hàng trăm thành viên, người dùng vẫn kỳ vọng tin nhắn đến được với mọi người **nhanh và đúng thứ tự**.
* **Typing indicator (chỉ báo đang gõ) và trạng thái online** — không chỉ là chi tiết trang trí, chúng làm cuộc trò chuyện trở nên **sống động và tương tác**. Người dùng luôn muốn biết đối phương đang rảnh hay đang phản hồi.
* **Hỗ trợ media phong phú** — chỉ text là không đủ; người dùng cần chia sẻ **hình ảnh, video và tài liệu** dễ dàng như gửi một tin nhắn, mà trải nghiệm vẫn mượt và nhanh.
* **Delivery và read receipt (biên nhận gửi/đã đọc)** — trước khi gửi, người dùng muốn biết rõ hành trình của tin nhắn: đã **gửi đi**, đã **đến người nhận**, hay đã **được đọc**. Sự minh bạch này tạo niềm tin rằng hệ thống đang hoạt động đúng.
* **Hỗ trợ đa thiết bị và đồng bộ** — người ta liên tục chuyển giữa điện thoại, laptop và tablet, và kỳ vọng **mọi cuộc trò chuyện luôn đồng bộ hoàn hảo**. Tin nhắn gửi từ một thiết bị phải xuất hiện ngay trên các thiết bị còn lại, **không trùng lặp, không mâu thuẫn**.

Điểm mấu chốt: khi bước sang phần kiến trúc, chúng ta sẽ liên tục quay lại danh sách này. Mỗi service, mỗi database, mỗi mẫu giao tiếp được thêm vào đều chỉ vì **một lý do duy nhất**: mang những trải nghiệm người dùng trên đến đúng quy mô.

---

### 📊 Yêu cầu phi chức năng — chất lượng của trải nghiệm

Nếu yêu cầu chức năng cho biết ứng dụng phải **làm gì**, thì yêu cầu phi chức năng quyết định **chất lượng** của trải nghiệm đó. Và trong hệ thống quy mô lớn, chúng thường tác động đến kiến trúc **mạnh hơn cả yêu cầu chức năng**.

| Loại yêu cầu | Trả lời câu hỏi | Ví dụ trong hệ thống chat |
|---|---|---|
| Chức năng | Ứng dụng phải làm gì? | Nhắn 1-1, nhắn nhóm, gửi media |
| Phi chức năng | Trải nghiệm phải tốt đến đâu? | Gửi tin dưới 1 giây, mã hóa đầu cuối, luôn sẵn sàng |

Cụ thể, hệ thống của chúng ta cần:

* **Gửi tin dưới một giây** — tin nhắn phải gần như **tức thời**. Chỉ một chút độ trễ cũng đủ khiến cuộc trò chuyện trở nên thiếu tự nhiên, nên **low latency (độ trễ thấp)** là một trong những mục tiêu thiết kế hàng đầu.
* **High availability và fault tolerance** — chat là dịch vụ người dùng kỳ vọng hoạt động **mọi lúc**. Nếu một server hay một thành phần gặp sự cố, người dùng không thể đột nhiên mất khả năng liên lạc. Hệ thống phải tiếp tục vận hành dù có lỗi — vì trong **hệ phân tán (distributed system)**, lỗi là điều không thể tránh.
* **Security (bảo mật)** — vì người dùng chia sẻ thông tin cá nhân, nhạy cảm, tin nhắn phải được bảo vệ bằng **end-to-end encryption (mã hóa đầu cuối)**. Mục tiêu rất đơn giản: **chỉ người gửi và người nhận dự định** mới đọc được nội dung, kể cả khi dữ liệu đi qua nhiều server.
* **Scalability (khả năng mở rộng)** — ứng dụng có thể khởi đầu với vài nghìn người dùng, nhưng một nền tảng thành công sẽ sớm phục vụ **hàng triệu người**. Kiến trúc phải lớn lên bằng cách **thêm hạ tầng**, chứ không phải liên tục thiết kế lại.
* **Trải nghiệm mượt trên mạng không ổn định** — không phải ai cũng có kết nối nhanh, ổn định. Ứng dụng vẫn phải **nhanh nhạy và đáng tin cậy**. Thiết kế cho điều kiện mạng thực tế quan trọng không kém thiết kế cho điều kiện lý tưởng.

Từ đây, chúng ta sẽ luôn tự hỏi cùng một câu: **thiết kế này có giúp gửi tin nhanh, luôn sẵn sàng khi có sự cố, bảo vệ quyền riêng tư, mở rộng êm ái và giữ trải nghiệm tốt trong điều kiện thực tế không?** Đó là tư duy thiết kế hệ thống production.

---

### ⚠️ Những thách thức kỹ thuật định hình kiến trúc

Đây **không phải** danh sách tính năng bổ sung — đây là những bài toán mà kiến trúc của chúng ta bắt buộc phải giải:

1. **Đảm bảo thứ tự và giao nhận tin nhắn** — người dùng kỳ vọng mỗi tin nhắn xuất hiện **đúng một lần và đúng thứ tự**, kể cả khi mạng rớt hoặc client thử lại request. Nếu tin đến sai thứ tự hoặc bị nhân đôi, cuộc trò chuyện lập tức trở nên rối rắm và thiếu tin cậy.
2. **Mạng không ổn định** — phần lớn người dùng dùng thiết bị di động với kết nối thay đổi liên tục: chuyển giữa Wi-Fi và dữ liệu di động, mất sóng trong thang máy, rồi kết nối lại sau khi offline. Hệ thống phải xử lý những gián đoạn này một cách êm ái: tin nhắn được **đệm lại, thử gửi lại và đồng bộ** khi kết nối trở lại.
3. **Bảo mật và quyền riêng tư** — người dùng tin tưởng giao cho nền tảng những cuộc trò chuyện riêng tư, nên **end-to-end encryption phải được xây vào hệ thống ngay từ đầu**. Hạ tầng nhắn tin phải **chuyển tiếp dữ liệu đã mã hóa mà bản thân không thể đọc nội dung**.
4. **Độ trễ** — ứng dụng chat chỉ tự nhiên khi tin nhắn xuất hiện gần như tức thì. Dù hai người ở cùng thành phố hay khác châu lục, kỳ vọng vẫn như nhau: **phản hồi phải có cảm giác real-time**.
5. **Presence (trạng thái hiện diện) và đồng bộ đa thiết bị** — người dùng có thể nhắn từ điện thoại rồi tiếp tục cuộc trò chuyện ngay trên laptop. Trạng thái online, biên nhận và lịch sử hội thoại phải **nhất quán ở mọi nơi**, không có độ trễ đáng chú ý.
6. **Quy mô** — một nền tảng thành công phải phục vụ **hàng triệu người dùng đồng thời**, vô số cuộc trò chuyện đang hoạt động và khối lượng tin nhắn khổng lồ mỗi giây. Kiến trúc phải lớn lên bằng cách **phân tán tải ra nhiều máy**, thay vì dựa vào vài server ngày càng mạnh hơn.

Tất cả những thách thức này sẽ là động lực cho kiến trúc mà chúng ta thiết kế ở các bước sau: mỗi service, mỗi mẫu giao tiếp, mỗi quyết định hạ tầng đều tồn tại để giải một hoặc nhiều bài toán trên, trong khi vẫn giữ hệ thống **nhanh, đáng tin cậy, an toàn và dễ mở rộng**.

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Vì sao chúng ta phải chốt yêu cầu chức năng trước khi thiết kế kiến trúc?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì mọi quyết định kiến trúc về sau đều phải xuất phát từ các yêu cầu đó.

Giải thích: Mỗi service, database và mẫu giao tiếp chỉ nên tồn tại để phục vụ những trải nghiệm người dùng đã định nghĩa.

Tham chiếu: Mục Yêu cầu chức năng — chúng ta đang xây gì.

</details>

**Câu 2:** End-to-end encryption bảo vệ điều gì, ngay cả khi dữ liệu đi qua nhiều server?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chỉ người gửi và người nhận dự định mới đọc được nội dung cuộc trò chuyện.

Giải thích: Hạ tầng có thể chuyển tiếp tin nhắn nhưng không thể đọc nội dung bên trong.

Tham chiếu: Mục Yêu cầu phi chức năng — chất lượng của trải nghiệm.

</details>

**Câu 3:** Hệ thống phải làm gì khi người dùng mất kết nối giữa chừng rồi kết nối lại?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Đệm tin nhắn, thử gửi lại và đồng bộ khi kết nối trở lại.

Giải thích: Người dùng di động liên tục chuyển mạng, mất sóng, nên hệ thống phải xử lý gián đoạn êm ái.

Tham chiếu: Mục Những thách thức kỹ thuật định hình kiến trúc.

</details>

**Câu 4:** Yêu cầu nào nói rằng tin nhắn gửi từ một thiết bị phải hiện trên mọi thiết bị khác mà không trùng lặp?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Hỗ trợ đa thiết bị và đồng bộ.

Giải thích: Đây là một yêu cầu chức năng, đồng thời cũng là thách thức về presence và đồng bộ.

Tham chiếu: Mục Yêu cầu chức năng — chúng ta đang xây gì.

</details>

**Câu 5:** Ở quy mô hàng triệu người dùng, kiến trúc nên mở rộng theo cách nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Phân tán tải ra nhiều máy, thay vì dựa vào vài server ngày càng mạnh hơn.

Giải thích: Quy mô hàng triệu người dùng đồng thời đòi hỏi khả năng mở rộng theo chiều ngang.

Tham chiếu: Mục Những thách thức kỹ thuật định hình kiến trúc.

</details>

---

Vậy là chúng ta đã có bức tranh rõ ràng về bài toán: **một ứng dụng chat real-time phải gửi tin tức thời, đúng thứ tự, an toàn, đồng bộ đa thiết bị và mở rộng được**. Mỗi yêu cầu và thách thức ở bước 1 này sẽ là thước đo cho mọi quyết định kiến trúc phía sau.

Ở bài tiếp theo, chúng ta sẽ **ước lượng quy mô** của nền tảng — bao nhiêu người dùng, bao nhiêu tin nhắn mỗi ngày, và đâu là những điểm nghẽn sẽ xuất hiện. Hẹn gặp lại các bạn! 🚀
