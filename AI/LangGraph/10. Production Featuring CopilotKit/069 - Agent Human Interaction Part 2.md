# 🧠 Khi state "biết nói": Generative UI động, transparency và bài toán niềm tin với agent

Chào các bạn! Ở phần 2 của cuộc trò chuyện về tương tác người — agent, chúng ta sẽ đi vào những câu hỏi rất "đời": **khi state thay đổi thì giao diện có thay đổi theo không?** và **làm sao để người dùng tin tưởng một agent có thể chạy hàng phút, thậm chí hàng ngày?**

Cùng mình mổ xẻ nhé!

---

### ❓ Câu hỏi mở màn: State thay đổi thì giao diện có "biến hình" theo?

Bối cảnh của câu hỏi rất thực tế: output mà **LLM** trả về có thể là **ngôn ngữ tự nhiên**, nhưng riêng trong **LangGraph**, chúng ta còn có **state (trạng thái)** chứa rất nhiều biến với đủ loại kiểu dữ liệu khác nhau.

Vậy với **CopilotKit**, liệu chúng ta có thể **render những component động khác nhau dựa trên giá trị của state** hay không? Ví dụ: graph state có một "rổ" các field, và chỉ một field thay đổi — một **boolean yes/no**, hay một **chỉ báo (indicator)** rằng có thứ gì đó cần được render. Theo đúng những gì đã thay đổi, giao diện có thể phản ứng tương ứng chứ?

Câu trả lời là: **hoàn toàn được!** CopilotKit gọi đây là một dạng **callback** — một biến thể của **generative UI dựa trên state của agent**.

Điểm khác biệt cốt lõi nằm ở chữ "state": state là thứ **chỉ tồn tại trong agent**, chứ không hề tồn tại trong một lời gọi LLM đơn thuần — *các lời gọi LLM thì không có state*. Và đôi khi, bạn muốn **render cho người dùng thấy agent đang làm gì ngay tại thời điểm nó làm**.

Ví dụ cực kỳ phổ biến: agent đang **tìm kiếm trên web** hàng loạt thông tin, và trong lúc tìm, nó liên tục cập nhật — "à, mình tìm được nguồn này rồi", "tìm được nguồn kia rồi" — và bạn muốn cho người dùng biết **chuyện gì đang diễn ra**.

Cách triển khai thì **rất, rất đơn giản**:

1. Bạn lấy **agent state**.
2. Bạn cung cấp **một function duy nhất**.
3. Function đó trả về **bất kỳ React component nào**.

Phần **streaming và bảo mật** đã được xử lý sẵn, nên mọi thứ sẽ được cập nhật **theo cơ chế reactive**, hễ có dữ liệu mới là giao diện thay đổi ngay trong thời gian thực. Tất cả những gì render ra có thể được hiển thị **trong khung chat**, hoặc bạn chỉ dùng nó như **state trong ứng dụng** và muốn làm gì với nó cũng được. Đây chắc chắn là một **building block (khối xây dựng)** quan trọng.

---

### 🔍 Transparency: lý do lớn nhất để render state của agent

Mình có hỏi tiếp: một trong những phần then chốt để tạo dựng niềm tin giữa người dùng và agent là làm cho agent **minh bạch (transparent)** — hoặc ít nhất là làm cho **UX/UI minh bạch về những gì agent đang làm**. Vậy CopilotKit giúp điều đó như thế nào?

Câu trả lời là: **chính xác, 100%!** Và điều này lại quay về với **generative UI**. Việc render state của agent, cũng như những gì agent đang làm, quan trọng vì hai lý do:

* **Giữ người dùng tập trung (engaged):** bạn không phải nhìn vào một **"spinning wheel" (vòng xoay chờ đợi)** quá lâu mà thấy được tiến trình thật sự.
* **Minh bạch với agent:** chúng ta đã đến giai đoạn mà kết quả của AI **đủ tốt để đưa vào production**, nhưng **chưa đủ đáng tin cậy để chạy production một cách mù quáng** — bạn không thể cứ thế bấm "send" mà không kiểm tra.

Khi người dùng được thấy **agent đang làm gì**, **nó ra câu trả lời đó bằng cách nào**, và **đã dùng những nguồn tài nguyên nào**, họ sẽ có đủ tự tin để sử dụng dữ liệu nhận được. **Xây dựng lòng tin (building confidence) là một phần cực kỳ lớn của AI hiện tại** — và theo dự đoán, sẽ còn kéo dài như vậy một thời gian nữa.

Bên cạnh đó, việc cho người dùng **"nudge" (đẩy) agent đi theo hướng khác khi nó làm sai** cũng rất quan trọng. Một điều thú vị đang được quan sát thấy: **agent càng tự chủ (autonomous) bao nhiêu, bạn lại càng muốn xây dựng nhiều cơ hội cho người dùng can thiệp bấy nhiêu — chứ không phải ít hơn**.

Lý do rất dễ hiểu: nếu agent có thể chạy **10 phút**, chưa nói đến **một ngày hay hai ngày**, bạn thực sự muốn biết chắc nó đang đi đúng hướng. Sẽ là một "cú đau" cực lớn nếu sau tất cả, bạn nhận được một **báo cáo nghiên cứu tuyệt vời... nhưng về sai chủ đề**. Vậy nên: **agent càng chạy lâu, bạn càng cần xây thêm khả năng quan sát (visibility) và cơ hội can thiệp (nudging)**.

---

### ⏱️ Time travel: "cứu cánh" khi agent đi lệch đường

Vậy CopilotKit hỗ trợ người dùng can thiệp bằng cách nào? Hiện tại đã có một loạt **building block** sẵn sàng, và chắc chắn sẽ còn nhiều đổi mới trong khoảng một năm tới. Hiện tại, bạn có:

* **UI** — nền tảng để hiển thị mọi thứ đang diễn ra.
* **Hỗ trợ time travel** — nếu agent làm sai, người dùng có thể **quay ngược về một state tốt đã biết trước đó (previously known good state)**.

Nếu các bạn từng dùng **Android Studio**, hay những sản phẩm dành cho kỹ sư như **v0.dev, Cursor, Bolt**... chắc hẳn đã thấy abstraction này: khả năng **roll back về trạng thái tốt gần nhất** để thử lại theo hướng khác. CopilotKit đang mang chính ý tưởng đó vào thế giới agent.

Các bạn thấy đấy, một agent "biết nói" — biết khoe tiến trình, biết nhận phản hồi và biết quay lui khi cần — chính là kiểu agent mà người dùng dám tin tưởng giao việc. Hãy theo dõi các bài tiếp theo để xem chúng ta sẽ áp dụng những building block này vào dự án thực tế như thế nào nhé! 🚀
