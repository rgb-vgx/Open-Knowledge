# 🤝 Sub Agents & Hierarchical Delegation: Khi Deep Agent biết "ủy quyền"

Chào các bạn, mình là Eden đây! Chúng ta vừa nói về Planning Tool, còn hôm nay mình muốn giới thiệu một đặc điểm khác cũng quan trọng không kém: khả năng sử dụng **Sub Agents (agent con)**.

---

### 🧩 Sub Agents & Hierarchical Delegation

Deep Agents sử dụng khái niệm **Sub Agents**, qua đó mang lại thứ được gọi là **hierarchical delegation (ủy quyền theo tầng bậc)**. Nghĩa là bản thân Deep Agent có thể **"sinh" ra những phiên bản mới của chính nó**, nhưng những phiên bản này là các Sub Agent **chuyên biệt hóa cho từng tác vụ tập trung**.

Mỗi Sub Agent sẽ có **system prompt riêng**, **description riêng**, và **bộ tool riêng** mà nó được phép dùng. Mình phải nói ý tưởng này thực sự thiên tài — vì nó giống hệt cách chúng ta vận hành ngoài đời thực.

Khi muốn giao một việc cho người khác, chúng ta cần đảm bảo người đó có **đúng kỹ năng và đúng công cụ**, và quan trọng không kém: chúng ta phải biết **giải thích cho họ cần làm gì**.

---

### 🏠 Chuyện mái nhà của mình

Mình lấy ví dụ từ chính nhà mình. Mình không phải tay thợ, chẳng có chút khéo léo nào, khoan tường cũng không biết khoan — mình cực kỳ tệ mấy chuyện này.

Nhà mình có một cửa sập (hatch) trên trần tầng trên cùng. Mỗi khi mưa, hạt mưa đập vào tấm cửa sập phủ sợi thủy tinh (fiberglass) ấy và gây ra tiếng động rất to, vang khắp nhà. Để xử lý, mình mua **cỏ nhân tạo (synthetic grass)** phủ lên tấm fiberglass, giúp tiếng mưa rơi nhẹ đi. Nhưng trần nhà khá cao, phải có loại **thang đặc biệt mở chéo** mới leo lên được... và mình thì chịu.

Thế là mình gọi **bố vợ** — người cực giỏi khoản này. Ông mang theo **đồ nghề riêng**: con dao rọc giấy (box cutter) để cắt cỏ nhân tạo cho vừa kích thước, cái thang riêng để leo lên trần, và tự xử lý hết mọi thứ.

Các bạn có thấy giống không? Mình viết một tin nhắn mô tả tác vụ cần giúp — đó chính là **prompt**. Ông đến với đồ nghề riêng và "system prompt" riêng (tức kỹ năng của ông). Ông làm việc đó **khi mình thậm chí không có mặt**, vì ông có chìa khóa nhà. Kết quả cuối cùng: mọi thứ được sửa xong, mưa xuống không còn vang khắp nhà nữa.

---

### ⚙️ Context Isolation: bài học từ câu chuyện

Điểm quan trọng nhất: trong lúc ông làm việc, **mình không hề biết chuyện gì đang diễn ra**. Về mặt context, ông đang làm việc trong **context isolation (cô lập ngữ cảnh)** — mình chỉ nhận được **kết quả cuối cùng**.

Sub Agents hoạt động y hệt như vậy:

* Chúng làm việc **tách biệt**, chạy trong **context window riêng** mà không làm ô nhiễm context của agent chính.
* Chúng **chuyên biệt hóa**: mỗi Sub Agent có system prompt và bộ tool riêng, có thể khác nhau giữa các Sub Agent.
* Chúng chạy **tool calling loop** và **ReAct loop** của riêng mình, rồi chỉ trả về **kết quả cuối cùng**, không kèm các bước trung gian.

Nhờ mẫu ủy quyền này, agent chính giữ được **context isolation**, không bị công việc chuyên biệt làm xao nhãng "attention", đồng thời có thể **chạy song song** nhiều tác vụ. Kết quả là chất lượng, hiệu quả và độ sâu của câu trả lời đều tăng vọt.

Một ví dụ kỹ thuật với **Claude Code**: nó có thể tạo một **exploration agent (agent thăm dò)** để truy tìm các **authentication pattern (mẫu xác thực)**, và agent này chạy song song cùng lúc với agent chính. Điều đó cho thấy Claude Code cũng đang triển khai kiến trúc này, với khả năng hỗ trợ Sub Agents cực kỳ mạnh mẽ và hữu ích.

---

### ⚠️ Đừng lo nếu thấy quá nhiều lý thuyết!

Mình biết mình đang nói khá nhiều lý thuyết, "vung tay" khá nhiều mà chưa đụng đến phần triển khai. *Các bạn đừng lo nhé — phần implementation chắc chắn sẽ đến, và chúng ta sẽ thấy chính xác cách hiện thực hóa những "phép màu" đó.*

Trước mắt, mình muốn các bạn nắm trọn khái niệm và giao diện, để thấy những khả năng này hiển hiện ra sao trong các công cụ quen thuộc hằng ngày. Ở bài tiếp theo, mình sẽ đi sâu vào **luồng context (context flow)** khi dùng Sub Agents, để các bạn thấy cách chúng giúp tránh phình context và đạt được **context isolation** như thế nào. 🚀
