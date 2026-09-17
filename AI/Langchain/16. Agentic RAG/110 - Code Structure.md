# 🗂️ Cấu trúc Code "chuẩn production": Repository phải phản chiếu kiến trúc của bạn

Chào các bạn, mình là Eden đây! 👋 Trong video này, chúng ta sẽ cùng "dọn dẹp nhà cửa" một chút: review và tổ chức lại cấu trúc repository.

Mục tiêu rất rõ ràng: code phải **dễ đọc (readable)**, **dễ bảo trì (maintainable)** và **dễ viết test**, từ đó giúp ứng dụng của chúng ta trở nên **robust (vững chắc)** hơn.

---

### 🏗️ Vì sao mình phải refactor lại?

Series video này được lấy cảm hứng từ công trình của **đội ngũ LangChain**, khi họ hiện thực giải pháp advanced RAG với **LangGraph** trong tutorial của mình. Tuy nhiên, mình đã phải refactor lại đôi chỗ.

Lý do là tutorial của họ tập trung nhiều vào **Jupyter notebook**, trong khi chúng ta cần một phần mềm đủ vững chắc để **chạy trong môi trường production**.

Mình luôn thích nói rằng: **cấu trúc repository phải phản chiếu kiến trúc của chính nó** — và trong trường hợp này, chính là **kiến trúc graph**: các **node (nút)** và **edge (cạnh)** mà chúng ta sắp hiện thực.

---

### 🗺️ Bố cục thư mục: mỗi thành phần một "ô"

Phần lớn phần hiện thực sẽ nằm trong package **graph**:

* **graph.py** — nơi kết nối tất cả node và edge lại với nhau.
* **state.py** — chứa **graph state object**, đối tượng sẽ bị thay đổi trong suốt quá trình graph thực thi.
* **const.py** — các hằng số dùng trong phần hiện thực (chủ yếu là **tên các node**).
* **nodes/** — subpackage chứa toàn bộ hiện thực của các node; **mỗi file là một node**.
* **chains/** — mỗi file là một chain khác nhau, **tương ứng với các node**, bởi vì suy cho cùng mỗi node sẽ chạy một LangChain chain.

Ngoài ra, chúng ta cũng cần:

* **tests/** — nơi viết test, với file **test_chains** để kiểm thử các chain.
* **ingestion** — file ở thư mục gốc, chứa logic **tải thông tin về và index vào vector store**.

---

### 🧪 Viết test đầu tiên với Pytest

Nhắc lại một chút về **quy ước đặt tên**, vì điều này cực kỳ quan trọng khi dùng **Pytest**: Pytest sẽ tìm các thư mục bắt đầu bằng **tests** và các file test có **prefix là test**.

Vậy nên mình tạo một **dummy test** để "khởi động" project: hàm **`test_foo`** không trả về gì cả, chỉ đơn giản **assert `1 == 1`** — đương nhiên test này phải pass.

Sau đó, mình chạy lệnh **`pytest .`** trong terminal để bảo Pytest chạy từ thư mục hiện tại (cũng là thư mục gốc của project) và hiển thị output; cờ **`-v`** (verbose) giúp liệt kê rõ những test đã chạy. Kết quả: **test_foo** được chạy đúng như mong đợi.

Để tiện hơn, mình cấu hình runner trong PyCharm:

1. Vào **Edit Configurations** ở góc trên bên phải.
2. Bấm nút **plus**, chọn **Python tests** rồi chọn **Pytest**.
3. Đặt thư mục chạy là **thư mục gốc (script path)**, và tham số truyền vào là **`-v`** giống như lúc nãy.

Giờ thì mình chỉ cần bấm chạy **test_chains** và xem kết quả thực thi chi tiết — rất tiện lợi khi chúng ta viết và chạy test thường xuyên!

---

### 💬 Một lời chia sẻ thẳng thắn

Trước khi kết thúc, mình muốn nói rõ: cấu trúc này **hiệu quả với mình**, chứ mình **không khẳng định đây là cấu trúc tốt nhất** cho mọi ứng dụng graph. Mình chỉ chia sẻ để các bạn tham khảo.

Các bạn sẽ thấy, khi phát triển ứng dụng theo cách này, việc mở rộng, thêm node/edge mới hay bổ sung test đều rất dễ dàng.

*Đừng lo nếu bạn chưa quen với việc "chia ô" code như thế này* — vài video nữa thôi, mọi thứ sẽ vào guồng. Nếu muốn đối chiếu hoặc tải code, các bạn ghé branch **2-project-structure** nhé. Video tiếp theo, chúng ta sẽ hiện thực **ingestion vào ChromaDB** — hẹn gặp lại! 🚀
