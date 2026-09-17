# 🎯 Few Shot Prompting: "Dạy" AI bằng vài ví dụ để có kết quả như ý

Nếu zero-shot là cách hỏi AI "chay" không ví dụ, thì hôm nay mình sẽ giới thiệu với các bạn kỹ thuật kế tiếp mạnh mẽ hơn: **Few Shot Prompting (prompt với một vài ví dụ mẫu)**.

Chúng ta sẽ cùng xem một ví dụ thực tế cực kỳ trực quan: so sánh kết quả của **zero-shot, one-shot và few-shot** trên cùng một tác vụ, để thấy rõ sự khác biệt giữa chúng.

---

### 💡 Few-shot prompt hoạt động như thế nào?

Few-shot prompt hoạt động bằng cách **trình cho AI model một số ít ví dụ (examples/shots)** về một tác vụ hay khái niệm cụ thể, kèm theo prompt hoặc instruction.

Model sau đó dùng những ví dụ này để **tạo mới hoặc phân loại (classify)** dữ liệu tương tự như các ví dụ đã cho.

Kỹ thuật này đặc biệt hữu ích trong các tình huống có **lượng dữ liệu hạn chế** cho một tác vụ nhất định — ví dụ một ngôn ngữ hay domain mới nơi dữ liệu khan hiếm.

Nó cũng rất hiệu quả để **nhanh chóng thích nghi model với tác vụ và domain mới**, bởi có thể dùng để tinh chỉnh (fine-tune) những model đã có sẵn mà không cần một lượng lớn dữ liệu mới.

Trong few-shot prompting, chúng ta có các biến thể:

* **One-shot prompt:** model chỉ được cho **đúng một ví dụ** về kết quả chúng ta muốn.
* **Few-shot prompt:** model được cho một **số lượng nhỏ ví dụ**.

Nói cách khác, **one-shot là một tập con (subset) của few-shot**: ở one-shot, **n bằng 1**; còn ở few-shot, **n lớn hơn 1**.

---

### 🖼️ Bài toán thực tế: Sinh mô tả ảnh cho Blue Willow

Các bạn hãy nhìn vào bài toán của chúng ta: một **Discord server của công cụ AI mã nguồn mở có tên Blue Willow**.

Cách dùng công cụ này là bạn gõ lệnh `/imagine`, sau đó cung cấp prompt và nó sẽ tạo ra hình ảnh từ prompt của bạn — công nghệ **text-to-image** quen thuộc.

Nhưng để minh họa, chúng ta sẽ thử sức ở dạng **text-to-text**: tạo ra một mô tả ảnh thật tốt để đưa vào Blue Willow sinh ảnh.

Nhiệm vụ của chúng ta: **viết một mô tả ảnh hay, gồm tính từ và danh từ, về một chú chó Yorkshire đang chạy trong phong cảnh mùa đông ở Brazil.**

*(Nghe hơi lạ đúng không? Mình cố tình chọn tình huống thử thách đấy!)*

---

### 🐶 So sánh ba kỹ thuật: Zero-shot, One-shot và Few-shot

**1. Zero-shot:**

Prompt: *"write an image descriptions with adjectives and nouns of a Yorkshire dog running in the winter landscape of Brazil"*.

Phân tích theo 4 thành phần: task là "viết mô tả ảnh"; context là vẽ gì (chó Yorkshire chạy trong phong cảnh mùa đông ở Brazil); không có input data cụ thể; output indicator gần như ẩn.

Vì không đưa ví dụ nào nên đây là zero-shot prompt. Kết quả khá tốt: một mô tả chi tiết, dùng được.

**2. One-shot:**

Chúng ta tinh chỉnh prompt: *"write a compressed perfect image description with adjectives and nouns of a Yorkshire dog running in the winter landscape in Brazil"*, rồi cung cấp một loạt danh từ và tính từ — **blue dog, shimmering snow**, v.v. — kèm output indicator.

Kết quả tốt hơn: mô tả súc tích hơn (vì đã yêu cầu "compressed"), dùng nhiều tính từ hơn, gọn gàng và dễ đọc hơn.

**3. Few-shot:**

Lần này mình đưa ba ví dụ khác nhau: ví dụ một là **chó xanh (blue dog)**, ví dụ hai là **chó đỏ (red dog)**, ví dụ ba là **chó xanh lá (green dog)**.

Model hiểu ngay rằng chúng ta muốn **một màu sắc mô tả chú chó**. Và kết quả trả về: **"a vivacious violet Yorkshire dog"** — một chú chó Yorkshire màu tím hoạt bát!

Điều thú vị nằm ở chi tiết nhỏ: trong các mô tả trước đó, có lúc chú chó được viết là **đang đổ mồ hôi (sweating)**, rồi **đang khóc (crying)** — và lần này model trả về **bộ lông đang tung bay (fur is fluttering)**.

Nó hiểu chính xác rằng chúng ta muốn một từ mô tả trạng thái/hành động của chú chó. Theo mình, điều này cực kỳ thú vị!

Sau đó mình mang cả ba mô tả đi đưa vào Blue Willow để xem ảnh sinh ra:

* **Ảnh từ zero-shot:** dài, trông rất dễ thương, nhưng model không thực sự biết chúng ta muốn gì — nó đoán và tự do sáng tạo. Dù vậy kết quả vẫn khá tốt.
* **Ảnh từ one-shot:** trong ngữ cảnh này, mình đánh giá nó **không tốt hơn hẳn** so với ảnh đầu tiên.
* **Ảnh từ few-shot:** đây là **ảnh mình thích nhất**, vì model tạo ra đúng thứ chúng ta muốn — màu sắc chú chó xuất hiện ngay đầu mô tả. Nếu chạy lại query nhiều lần, bạn sẽ nhận được những màu sắc khác nhau cho chú chó.

---

### 📌 Bài học cốt lõi

Nhìn vào cả ba bức ảnh, chúng không hẳn bức nào "đẹp hơn" bức nào — chúng khá giống nhau.

Nhưng điều quan trọng nhất cần nhớ về few-shot prompting chính là **số lượng ví dụ bạn đưa cho AI model**.

Càng nhiều câu trả lời và ví dụ mẫu để model "học" theo dữ liệu của bạn, nó càng biết cách điều chỉnh và tinh chỉnh kết quả theo hướng bạn muốn.

Đổi lại, model sẽ có **ít tự do sáng tạo hơn** — nhưng kết quả sẽ **chính xác hơn và hợp gu bạn hơn**.

Đó là lý do vì sao các bạn nên nắm thật chắc sự khác biệt giữa zero-shot, one-shot và few-shot. Ở bài tiếp theo, chúng ta sẽ tiến thêm một bước với **Chain of Thought Prompting** — kỹ thuật giúp AI suy luận từng bước như con người.

Hẹn gặp lại nhé! 🚀
