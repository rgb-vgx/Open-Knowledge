# ⚖️ Tốc độ hay An toàn? Cuộc giằng co mặc định khi đưa coding agent vào quy trình

Khi đưa một **coding agent** vào quy trình làm việc, có một câu hỏi bạn buộc phải trả lời: **ưu tiên tốc độ hay ưu tiên an toàn?**

Trong bài ngắn này, mình muốn chia sẻ góc nhìn về sự đánh đổi đã tồn tại rất nhiều năm nay — và vì sao nó càng trở nên quan trọng trong thời đại agentic dev.

---

### 🧭 Hai đầu của một dải phổ

Sự đánh đổi **velocity (tốc độ) vs security (bảo mật)** không phải chuyện mới — nó đã tồn tại nhiều, rất nhiều năm.

Mỗi công ty, mỗi doanh nghiệp nằm ở đâu đó trên dải phổ này, nghiêng về phía engineering hay phía security **tùy theo văn hóa của công ty**:

* Các **AI native startup** thường nằm hẳn về phía velocity.
* Các **công ty trưởng thành hơn (mature companies)** lại hướng về phía an toàn và bảo mật.

---

### 🔄 Bản chất của sự đánh đổi

Cụ thể, cuộc đánh đổi diễn ra giữa hai thứ:

1. **Thêm security guardrails (rào chắn bảo mật) và các cơ chế bảo vệ** vào code được bàn giao trong **vòng đời phát triển phần mềm (SDLC)**.
2. **Tốc độ và nhịp ship sản phẩm** của đội engineering.

Không có bữa trưa miễn phí: muốn thêm một lớp bảo vệ, bạn sẽ phải trả giá bằng một chút tốc độ. Câu hỏi thật sự là: bạn sẵn sàng trả bao nhiêu?

---

### 🛡️ Coding agent mặc định nghiêng về phía tốc độ

Đây là điểm quan trọng nhất của bài: **coding agent, theo mặc định, luôn nghiêng về velocity** — đơn giản vì khi bạn mới có nó trong tay, nó **không có bất kỳ guardrail nào cả**.

Theo mình, nếu muốn viết ra phần mềm bảo mật và dùng coding agent một cách an toàn, chúng ta **phải chủ động thêm guardrails cùng các cơ chế bảo mật** cho nó.

*Đừng kỳ vọng agent tự biết "cư xử đúng" — bạn mới là người thiết lập luật chơi.*

---

### 💡 Đánh đổi xứng đáng: "Plan twice, cut once"

Mình thừa nhận: việc thêm các cơ chế bảo mật **có thể làm chậm tốc độ ship code**.

Nhưng đổi lại, **độ tự tin của chúng ta vào đoạn code đó cao hơn hẳn** sau khi đã áp dụng những cơ chế ấy.

Mình rất thích câu nói: **"Plan twice, cut once" (đo hai lần, cắt một lần)**.

Trong chuỗi bài tiếp theo, mình sẽ chỉ cho các bạn thấy những gì có thể sai và cách dựng guardrails đúng cách. Hẹn gặp lại các bạn! 🚀
