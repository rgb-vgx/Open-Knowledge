# 💬 Tương tác Người — Agent năm 2025: Chat đã đưa chúng ta đến đâu, và bước tiếp theo là gì?

Chào các bạn! Trong bài này, mình mang đến một cuộc trò chuyện rất thú vị về **tương tác giữa con người và agent (human — agent interaction)**: năm 2025, chúng ta đang ở đâu, và đã đi qua con đường nào để đến được trạng thái hiện tại?

Nào, hãy bắt đầu từ thứ quen thuộc nhất: **chat**.

---

### 💬 Chat — modality đã "chinh phục thế giới" và vì sao ta từng xem nhẹ nó

Không thể nói về tương tác người — agent mà không nhắc đến **chat**. Chat đã "chinh phục" cả thế giới, dạy cho số đông cách giao tiếp với máy móc. Cách chúng ta hình dung về chat là **gần giống như Slack với một agent** — một kênh giao tiếp mở giữa hai thực thể thông minh, nơi bạn có thể trao đổi bằng lời đúng những gì bạn có thể truyền đạt bằng một cú bấm phím.

Thú vị là, chính cuộc trò chuyện của mình và người đối thoại lúc đó cũng là một dạng chat — một cuộc chat "đời thực"; **Zoom** chỉ là một dạng chat audio-video. Kiểu ngôn ngữ này tiến hóa để lấp đầy đúng "ngách" đó: giờ đây chúng ta có thể **nói với máy tính như từng nói với con người** — những thực thể thông minh duy nhất mà chúng ta từng biết. Và điều đó đang thay đổi.

Nhìn lại một năm rưỡi sau, có thể thấy chúng ta **chưa đánh giá đủ cao** vai trò của chat, dù nó là một modality cực kỳ mạnh mẽ. Nhưng chat không phải là toàn bộ câu chuyện — vì thế mình sẽ dành chỗ cho nó, rồi đi tiếp sang những phần còn lại.

---

### 🧩 Chat không chỉ là text: generative UI và tương tác hai chiều

Trong giao diện chat, chúng ta muốn sự giao tiếp mở ở **dạng thức phù hợp nhất với công việc**. Điều này bao gồm **generative UI (giao diện sinh động)**: chat có thể trả về những **native component đầy đủ**, có thể tương tác được và tương tác trực tiếp với ứng dụng ngay trong giao diện chat.

Song song đó, các tương tác **human-in-the-loop (con người can thiệp giữa vòng chạy)** được hỗ trợ bởi chính **UX của ứng dụng native**. Bạn hiển thị cho người dùng một vài component, họ tương tác với chúng, và **dữ liệu đó quay trở lại agent** — không chỉ để "chơi" với giao diện, mà để agent hiểu và hành động tiếp.

Đó là phía chat. Còn phía bên kia — phần thú vị không kém — là để agent **sống trong toàn bộ phần còn lại của ứng dụng**.

---

### 🔄 Agent sống trong cả ứng dụng: shared state và những "đường ống" phía sau

Mọi thứ xảy ra trong ứng dụng cần **hiển thị được cho agent**, và agent cũng cần làm được nhiều việc hơn là chỉ trả lời trong chat. Một trong những yếu tố quan trọng nhất là **shared state (trạng thái chia sẻ)** giữa agent và ứng dụng — và nó mang tính **hai chiều (bidirectional)**.

Tất nhiên, đằng sau đó là vô số **edge case (tình huống biên)** cần xử lý, từ việc **truyền dữ liệu hiệu quả** — chỉ gửi những **delta (phần thay đổi)** mỗi khi state được cập nhật — cho đến **bảo mật**: có những state không nên được trao đổi theo cách này hay cách khác. Đây là những "đường ống" (plumbing) mà framework đã lo sẵn, còn về cơ bản thì mọi thứ khá đơn giản: bạn có một state chia sẻ, bạn có một ứng dụng agent.

Bên cạnh đó còn có khoảng **năm kiểu human-in-the-loop** khác nhau mà chúng ta có thể bàn tới. Nhưng điểm cốt lõi cần nhớ là: **mọi thứ đều có biến thể "trong chat" và "ngoài chat"**, và chúng ta không nên đóng khung giao diện vào chat — đôi khi chat không phải là cách tiếp cận đúng.

Nhìn về phía trước, **audio-video như một phần mở rộng của chat** là một modality rất đáng quan tâm. Nó **chưa sẵn sàng cho môi trường production**, nhưng theo dự đoán, trong vòng một năm tới chúng ta sẽ thấy những điều thực sự thú vị ở mảng này.

---

### 🔮 "Chỉ chat là chưa đủ" — và mental model về một copilot ngồi cạnh người dùng

Có người sẽ nói: với một agent, chỉ chat là chưa đủ. Đúng vậy! Đôi khi bạn muốn một **checkbox** để người dùng tích chọn, một câu trả lời **có/không**, hay những **form (biểu mẫu)** khác thay vì gõ text. Chat dù rất "mở" nhưng lại khá hạn chế về mặt trải nghiệm người dùng.

Đại diện của CopilotKit nhấn mạnh một điểm rất quan trọng: **framework thực ra trung lập (agnostic)** với những lựa chọn này. Họ cung cấp các **building block (khối xây dựng)** và bạn được toàn quyền sử dụng theo cách mình muốn — mọi thứ đều có phiên bản trong chat và ngoài chat, và quyết định cuối cùng thuộc về người dùng.

Còn đây là ý kiến cá nhân của anh ấy, nhìn lại một năm rưỡi vừa qua:

* **Chat không chỉ là text:** bạn muốn một khung chat "giàu" (rich chat) với đầy đủ checkbox, component... để tạo điều kiện cho tương tác hai chiều. Điều này cực kỳ quan trọng, và nó có tên gọi: **generative UI**, hay còn được gọi là **human-in-the-loop với giao diện native**.
* **Nhiều tương tác nên diễn ra ở các phần khác của ứng dụng:** chat giống như Slack với agent — khi bạn **pair programming** với một người khác, có lúc bạn muốn trò chuyện với họ, có lúc bạn chỉ muốn nói "này, mình vừa làm xong việc này, bạn thấy sao?".

Và đó chính là **mental model (mô hình tư duy) tốt nhất** để xây dựng những trải nghiệm thật xuất sắc: hãy tưởng tượng có một **thực thể thông minh thứ hai** trong sản phẩm — một **copilot ngồi cạnh người dùng** và hỗ trợ họ trong mọi việc. Sẽ không có chuyện ứng dụng SaaS tương lai chỉ là một ô chat to đùng rồi hết. Điểm mạnh thật sự nằm ở việc kết hợp **kênh giao tiếp** với **UX của ứng dụng native**, và tìm ra cách biểu diễn tối ưu cho từng tương tác.

Các bạn thấy đấy, hành trình thiết kế tương tác người — agent còn rất nhiều đất để khám phá. Hãy tiếp tục theo dõi các bài sau để xem chúng ta sẽ làm chủ nó như thế nào nhé! 🚀
