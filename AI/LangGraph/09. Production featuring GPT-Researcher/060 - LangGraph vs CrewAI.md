# 🥊 LangGraph vs CrewAI: Đâu là framework cho multi-agent "chạy được" thật sự?

Chào các bạn, Eden đây! 👋 Trong bài này, mình muốn chia sẻ góc nhìn cá nhân về hai framework đình đám nhất cho việc phát triển **generative AI agent** nói chung và **multi-agent architecture (kiến trúc đa tác nhân)** nói riêng: **LangGraph** và **CrewAI**. Cả hai đều tuyệt vời, nhưng chúng khác nhau ở một điểm cực kỳ quan trọng mà mình sắp "bật mí" ngay sau đây.

---

### 🤖 "Multi-agent" theo cách mình định nghĩa

Trước khi so sánh, mình cần làm rõ khái niệm. Khi nói **multi-agent**, mình đang nói về kiến trúc mà mỗi agent về cơ bản là:

* Một **prompt "xịn"** kèm theo một nhân vật (character) — ví dụ một **critique character (nhân vật phản biện)** có nhiệm vụ đưa ra lời góp ý ngắn gọn, sắc bén cho bản nháp bài viết của bạn.
* Hoặc một agent được trang bị **external tools (công cụ bên ngoài)** như web search, truy cập database, v.v.

Các agent này có thể **tương tác với nhau**: agent này gửi message cho agent kia, và output của agent này lại trở thành input của agent khác.

Điểm mấu chốt là chúng không hoạt động biệt lập, mà tạo thành một hệ thống có trao đổi qua lại — và chính cách chúng "nói chuyện" với nhau là thứ quyết định chất lượng đầu ra.

---

### 🎛️ Flow engineering: điểm khác biệt lớn nhất

Theo mình, **LangGraph linh hoạt hơn CrewAI rất nhiều**, và đây là lý do cốt lõi.

LangGraph hiện thực hóa một ý tưởng gọi là **flow engineering (kỹ thuật thiết kế luồng)** — nơi chúng ta, những developer, có **toàn quyền kiểm soát** luồng chạy của các agent:

* Agent nào đang nói chuyện với agent nào.
* **State (trạng thái)** được chia sẻ giữa chúng là gì.
* Luồng thực thi của chương trình sẽ đi theo hình dạng nào.

Điều này cực kỳ quan trọng, bởi nếu để agent quá tự chủ, chúng sẽ "tản mạn" theo muôn hướng và không thật sự hoạt động được. Ví dụ rõ nhất là **AutoGPT** — một dự án tuyệt vời, đầy đổi mới và đẩy xa giới hạn của những gì chúng ta có thể làm, nhưng lại **không thể dùng trong hệ thống production** chính vì agent có quá nhiều tự do. LangGraph giải quyết bài toán đánh đổi giữa **tự do (freedom)** và **kiểm soát (control)** bằng chính các kỹ thuật flow engineering.

---

### 🧭 Kết luận của mình

Ngược lại với LangGraph, **CrewAI "giấu" logic luồng chạy đi**, nên chúng ta không có nhiều quyền kiểm soát flow như khi dùng LangGraph.

Vậy nên, để kết lại: mình cho rằng CrewAI là một framework tốt, nhưng nếu mục tiêu là một **production-grade application** thật sự dùng được với người dùng cuối, thì **LangGraph là lựa chọn đúng đắn** — đơn giản vì quyền kiểm soát mà nó trao cho bạn.

Ở bài tiếp theo, mình sẽ giới thiệu một "hiện thân" hoàn hảo của triết lý này: **GPT Researcher** — research agent mã nguồn mở được xây dựng chuẩn production. Hẹn gặp lại các bạn! 🚀
