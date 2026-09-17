# 😵💫 AI FOMO là chuyện thường ngày: Khi chính Karpathy cũng thấy mình tụt lại

Chào các bạn, Eden đây! Bài này chúng ta nói về **FOMO (fear of missing out — nỗi sợ bỏ lỡ)** trong môi trường phát triển AI đang thay đổi với tốc độ chóng mặt mà chúng ta đang sống.

Cụ thể hơn, mình muốn bàn về một **bài blog của Andrej Karpathy viết cuối năm 2025** — bài viết đã chạm đúng cảm xúc của rất nhiều người, trong đó có mình. Mình đồng ý và tin vào rất nhiều ý trong đó, nên hôm nay muốn chia sẻ lại cùng các bạn.

---

### 📝 Khi Karpathy cũng nói "tôi thấy mình tụt lại"

Karpathy viết: **"Tôi chưa bao giờ cảm thấy mình tụt lại nhiều đến thế với tư cách một lập trình viên."** — Mình hoàn toàn đồng cảm, và cảm giác này xuất hiện **mỗi ngày**, vì **ngày nào cũng có thứ mới ra đời** và việc theo kịp **tất cả** những gì đang diễn ra trong AI là **bất khả thi**.

**"Nghề này đang được tái cấu trúc mạnh mẽ khi những 'bit' mà lập trình viên đóng góp ngày càng thưa thớt và nằm xen giữa."** Ông có cảm giác mình có thể **mạnh gấp 10 lần (10X)** nếu biết ghép nối đúng những gì đã trở nên khả dụng trong một năm qua — và việc không tận dụng được cú nhảy vọt đó đúng là **"skill issue" (vấn đề kỹ năng)**.

Đây chính là cảm giác FOMO mà tất cả chúng ta đang sống chung: **thấy vô số thông báo, sản phẩm mới, mà không có thời gian để đào sâu vào mọi thứ**.

Ông cũng nói về **một tầng abstraction (trừu tượng hóa) lập trình mới cần phải thành thạo**, nằm trên các tầng quen thuộc bên dưới, bao gồm: **agents, sub-agents, prompt, context, memory, modes, permissions, tools, plugins, skills, hooks, MCP, LSP, slash commands, workflows, tích hợp IDE** — cùng nhu cầu xây dựng **một mental model toàn diện** về điểm mạnh và cạm bẫy của "những thực thể mang tính **stochastic (ngẫu nhiên), fallible (dễ sai), unintelligible (khó hiểu)** và luôn thay đổi", bỗng nhiên **đan xen với kiểu kỹ thuật truyền thống tốt đẹp ngày xưa**.

---

### 🏗️ Software stack đã thay đổi: chúng ta là những orchestrator

TL;DR của tất cả những điều trên: **software stack đã thay đổi**. Chúng ta **không còn viết code — chúng ta viết prompt để code được viết ra**. Ta viết prompt chạy trong agents/subagents, các agent gọi tools, và ta nhận về **artifact (sản phẩm)**. Chúng ta đang trở thành **những orchestrator (người điều phối)**.

Kỹ năng lập trình phần mềm đang **dịch chuyển**: từ việc **viết code giỏi, nắm đúng cú pháp, biết dùng công nghệ** — sang **vai trò orchestrator ở tầng cao hơn**. Giờ ta **quản lý một đội agents**, mỗi agent làm một việc.

Mình rất thích so sánh với **một team lead quản lý kỹ sư**:

1. Team lead giao việc cho các engineer.
2. Team lead review công việc của họ và đưa phản hồi.
3. Vòng lặp cứ tiếp diễn cho đến khi ra sản phẩm cuối cùng.

Điều team lead làm với engineer thì ta cũng làm với agent: **giao task, xem chúng làm thế nào, đôi khi đưa đúng tools và đúng skills để hoàn thành task**. Công việc **dịch chuyển từ viết code sang review nhiều hơn** — đây là sự thay đổi mang tính nền tảng mà chúng ta đang trải nghiệm.

Toàn bộ tech stack mới — agents, subagents, MCP, LSP, slash command, workflows, tích hợp IDE — **là tech stack mới, là ngôn ngữ lập trình mới của tương lai**. Mình nghĩ chúng ta có **đặc ân lớn** khi được trực tiếp chứng kiến mọi thứ tiến hóa nhanh chóng: chúng ta đang chứng kiến **một cuộc dịch chuyển paradigm và một tầng abstraction mới**.

---

### 📜 Từ punch card đến English, và câu chuyện regex của mình

Lịch sử ngành phần mềm: thuở đầu là **punch card (thẻ đục lỗ)** đưa cho máy chạy code, rồi đến **Assembly**, rồi **C++ trừu tượng hóa Assembly**, rồi **Python trừu tượng hóa C++** — và giờ **English (tiếng Anh) đang trở thành tầng trừu tượng mới**. Thách thức thật sự là **điều phối cách làm việc với những abstraction mới**, học các giới hạn của chúng, giải quyết và liên tục đẩy giới hạn xa hơn.

Về "kiểu kỹ thuật truyền thống tốt đẹp ngày xưa", mình có ví dụ từ trải nghiệm cá nhân. Hồi làm software engineer, mình **cực kỳ ghét viết regular expression (regex)**. Có một website — **regex101.com** — giúp mọi thứ dễ hơn khi viết regex. Trong công ty mình có một anh **viết regex cực đỉnh**, nổi tiếng khắp công ty với kỹ năng đó. Ai cần viết regex phức tạp đều tìm đến anh.

**Ngày nay, kỹ năng đó không còn hữu dụng nữa** — giống như việc học thuộc bản đồ để lái xe khi bạn đã có **Google Maps hay Waze**. Bạn chỉ cần **hỏi LLM, hoặc Claude Code, hoặc Cursor** cách viết regex mong muốn. Kiểu kỹ thuật truyền thống đang thay đổi, và **rất nhiều kỹ năng, kỹ thuật, thực hành của lập trình viên xưa đã không còn phù hợp**.

Theo mình, **một software engineer giỏi đơn giản là một người giải quyết vấn đề giỏi và luôn tò mò (curious)** — đó là những kỹ năng quan trọng nhất, đúng cho cả kỷ nguyên cũ lẫn tương lai. Và ngày nay, **sự tò mò có sức ảnh hưởng lớn hơn rất nhiều**, vì chính nó thúc đẩy thay đổi, đẩy giới hạn, thử điều mới và làm mọi thứ tốt hơn.

---

### 🧘 Bí quyết sống chung với FOMO: xắn tay áo và tập trung

Karpathy viết: **"Rõ ràng có một công cụ ngoài hành tinh cực mạnh vừa được trao tay, chỉ có điều nó không kèm sách hướng dẫn, và mọi người phải tự mò cách cầm và vận hành nó, trong khi một cơn địa chấn cấp 9 đang làm rung chuyển cả nghề. Hãy xắn tay áo lên để không bị bỏ lại phía sau."**

Điểm then chốt là **"không kèm sách hướng dẫn"** — với mình, **trí tưởng tượng chính là giới hạn**. Mọi công nghệ agents, coding agents ta đang thấy là **những building block xếp lớp lên nhau**, mỗi cái dùng tầng abstraction bên dưới. Cách tốt nhất để hiểu sâu là **nhìn lại lịch sử tiến hóa**:

* Agent bắt đầu từ **ReAct prompt**.
* ReAct prompt tiến hóa thành **function calling**.
* Từ function calling mở ra **agentic workflows**.
* Và giờ ta đang ở **kỷ nguyên deep agents, task delegation và subagents**.

Khi bạn thấy được các iteration tận mắt, bạn **hiểu vấn đề nào tồn tại hôm nay và tool mới giải quyết vấn đề gì** — điều đó **xóa tan cảm giác FOMO**.

Vì không có sách hướng dẫn, **best practice đang được tạo ra ngay lúc này**, và câu trả lời nằm ở **thử nghiệm, thực nghiệm, "xắn tay áo vào bùn"**. Và "thuốc giải" cho FOMO: **dấn thân thử nghiệm**. FOMO sẽ **ở lại lâu dài** — bạn sẽ luôn cảm thấy nó, mình cũng cảm thấy nó mỗi ngày.

Lời khuyên "2 xu" của mình: **focus (tập trung) cực kỳ quan trọng**. Mỗi ngày có vô số tweet, công nghệ mới, sản phẩm mới hứa giải quyết X, Y. **Kỹ năng lọc nhiễu và tập trung vào điều quan trọng** là kỹ năng quý giá, vì mạng xã hội là một **"hang thỏ vô tận"** nếu bạn không tập trung. Cách mình làm: khi lướt Twitter, mình **xem cái gì mới, không đọc hết mọi thứ, không đào sâu mọi thứ**. Nếu thấy điều gì hấp dẫn và **giải quyết vấn đề mình đang muốn giải** — mình mới đào sâu và bắt tay thực hành.

Điểm mấu chốt: **bạn không đơn độc với FOMO**. Tất cả mọi người đều trải qua nó — kể cả mình, kể cả Andrej Karpathy. Hãy chấp nhận nó và tiếp tục sống chung với nó nhé! 🚀
