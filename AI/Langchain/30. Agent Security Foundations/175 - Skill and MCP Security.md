# 🔐 Skill & MCP: "Tiện lợi" không đồng nghĩa với "an toàn"

> Nguồn: `175-Skill-MCP-Security-Introduction.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/57115483)

Chào các bạn, trong bài này mình muốn nói về **MCP** và **skills** trong thế giới coding agent. Cả hai đều là những phát minh tuyệt vời cho ngành — nhưng nếu dùng không đúng cách, chúng ta đang tự mở cửa cho rủi ro thật sự.

Mình có một câu hỏi cho các bạn: **Bạn có thoải mái tải một file .exe từ kiểu website đáng ngờ không?** Mình hy vọng câu trả lời là không.

---

### 🧩 Bài học từ những file .exe "mùi scam"

Chúng ta được huấn luyện suốt nhiều năm để tránh xa những website như vậy. Chúng tìm cách dụ dỗ ta, và cảm giác thật giống một vụ lừa đảo: nào là **màu mè hoa lá**, nào là **social proof giả tạo**, nào là **thúc ép bạn phải làm mọi thứ ngay lập tức** — tất cả đều "hét" lên rằng đây là thứ độc hại, có thể chứa virus và xâm phạm máy bạn.

Nhưng với **skills** thì sao? Nếu tình cờ tìm thấy một skill giải quyết đúng vấn đề bạn cần, lại có website "xịn" (có thể là **vibe coded** mà nhìn không ra), chúng ta thường:

* **Không có thói quen đọc code của skill**.
* **Không biết ai là tác giả**, cũng không biết động cơ của họ.
* Vẫn cài đặt ngay lập tức mà **không hề thẩm định kỹ lưỡng (due diligence)**.

Và kể cả khi nhận được thông báo **"mọi package đã được cài, không có lỗ hổng nào"**, điều đó cũng chẳng nói lên gì — vì **bản thân skill có thể đã độc hại sẵn rồi**.

---

### 🕵️ Vì sao skill và MCP server còn nguy hiểm hơn file .exe

Điểm mình muốn nhấn mạnh: **skills và MCP server — đặc biệt là bản open source — ngang hàng với những website đáng ngờ kia**, vì đó là code sẽ chạy trên máy bạn, với nguồn gốc bạn không biết và nội dung bạn chưa từng đọc.

Đáng sợ hơn nữa:

* File .exe kia có thể chỉ chạy **một lần**.
* **MCP và skills được kết nối thẳng vào coding agent của bạn**, nên chúng có thể **được kích hoạt nhiều lần**.

| | File .exe từ web lạ | Skills và MCP server |
|---|---|---|
| Nguồn gốc | Website đáng ngờ, mùi scam | Open source, aggregator, repository đầy sao |
| Số lần kích hoạt | Có thể chỉ chạy một lần | Kết nối thẳng vào agent, kích hoạt nhiều lần |
| Thẩm định | Được huấn luyện suốt nhiều năm để tránh | Hầu như không đọc code, không due diligence |

Vấn đề hiện tại của ngành là chúng ta đã quen với việc **không kiểm tra** skills và MCP server mình dùng. Rồi còn có trào lưu chữ **"official"**: official MCP server, official skill. Vô số **skill aggregator** và repository với **hàng tấn sao (stars)** cùng đủ loại social proof — nhưng bài học cốt lõi là: **social proof không đồng nghĩa với security**.

---

### 🧠 Góc tâm lý: chúng ta đang quá tin AI

Ở tầng tâm lý, chúng ta đã quen **chia sẻ quá nhiều (overshare)** với AI và **tin AI mặc định**. Vì thế, chúng ta dễ dàng đưa cho coding agent:

* **Dữ liệu cá nhân**, **dữ liệu độc quyền (proprietary data)** — những thứ lẽ ra không cần chia sẻ.
* Thậm chí cả **bí mật cá nhân**.
* Và **API key gắn với tài khoản thật, có tính phí thật**, với niềm tin rằng agent sẽ không "nổi loạn" với mình.

---

### 🛡️ Hai nguyên tắc vàng để dùng an toàn hơn

Vậy làm sao để dùng skills và MCP an toàn hơn? Mình có hai lời khuyên:

1. **Không tiết lộ bí mật, không chia sẻ thông tin nhạy cảm.** Đây là điều tối kỵ — bạn không biết thông tin đó sẽ đi đâu, bị log ở đâu và bị trace ở đâu.
2. **Nếu thật sự cần cấp API key cho agent** (đôi khi điều này hoàn toàn chính đáng), hãy đưa qua một **secrets manager** để nó truy xuất **lúc runtime** trong script, thay vì viết thẳng **raw API key** vào code.

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Câu hỏi mở đầu về file .exe muốn nhắc chúng ta điều gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Nếu bạn không thoải mái tải một file .exe từ website đáng ngờ, thì cũng đừng cài skill hay MCP server mà không thẩm định.

Giải thích: Chúng ta được huấn luyện tránh xa các website như vậy suốt nhiều năm.

Tham chiếu: Mục Bài học từ những file .exe "mùi scam".

</details>

**Câu 2:** Vì sao thông báo "mọi package đã được cài, không có lỗ hổng nào" không đủ để yên tâm?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì bản thân skill có thể đã độc hại sẵn rồi – thông báo đó chẳng nói lên gì.

Giải thích: Không ai kiểm tra code của skill trước khi cài là vấn đề cốt lõi.

Tham chiếu: Mục Bài học từ những file .exe "mùi scam".

</details>

**Câu 3:** Vì sao skill và MCP server nguy hiểm hơn file .exe?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Vì chúng được kết nối thẳng vào coding agent nên có thể được kích hoạt nhiều lần, với nguồn gốc bạn không biết và nội dung bạn chưa từng đọc.

Giải thích: File .exe có thể chỉ chạy một lần, còn skill và MCP chạy trong suốt quá trình dùng agent.

Tham chiếu: Mục Vì sao skill và MCP server còn nguy hiểm hơn file .exe.

</details>

**Câu 4:** Social proof như hàng tấn sao hay chữ "official" có đảm bảo an toàn không?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không – social proof không đồng nghĩa với security.

Giải thích: Có vô số skill aggregator, repository và official skill, nhưng bài học cốt lõi vẫn là tự thẩm định.

Tham chiếu: Mục Vì sao skill và MCP server còn nguy hiểm hơn file .exe.

</details>

**Câu 5:** Hai nguyên tắc vàng để dùng skills và MCP an toàn hơn là gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Không tiết lộ bí mật hay chia sẻ thông tin nhạy cảm; nếu cần cấp API key thì đưa qua secrets manager để truy xuất lúc runtime, không viết raw key vào code.

Giải thích: Bạn không biết thông tin đó sẽ đi đâu, bị log ở đâu và bị trace ở đâu.

Tham chiếu: Mục Hai nguyên tắc vàng để dùng an toàn hơn.

</details>

Hãy bắt đầu coi mỗi skill bạn cài như một đoạn code lạ chuẩn bị chạy trên máy mình. Hẹn gặp lại ở bài demo tiếp theo! 🚀

## Nguồn tham khảo

- [Udemy — Skill MCP Security Introduction](https://ua.udemy.com/course/langchain/learn/lecture/57115483)
- [Model Context Protocol — Security Best Practices](https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices)
