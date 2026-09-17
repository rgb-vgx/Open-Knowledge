# 🗂️ Cấu trúc code "chuẩn production": Để repository phản ánh đúng kiến trúc graph

Chào các bạn, Eden đây! Trong bài này, chúng ta sẽ cùng xem qua **cấu trúc repository** để tổ chức code sao cho dễ đọc, dễ bảo trì và dễ viết test — từ đó ứng dụng của chúng ta trở nên **robust (vững chắc)** hơn.

### 🏗️ Triết lý: Repository structure phải phản ánh architecture

Series này được truyền cảm hứng từ công trình của **đội ngũ LangChain** khi triển khai giải pháp RAG nâng cao với LangGraph, nhưng mình đã phải **refactor** lại khá nhiều: tutorial của họ tập trung vào **Jupyter notebook**, trong khi chúng ta cần một phần mềm đủ vững chắc để **chạy trong môi trường production**.

Mình luôn tâm niệm một câu: **"Cấu trúc repository nên phản ánh kiến trúc của chính nó."** Với chúng ta, đó chính là **kiến trúc graph** — các **node (nút)** và **edge (cạnh)** mà chúng ta sẽ triển khai.

*Một lời chia sẻ thật lòng:* đây là cách tổ chức hiệu quả với mình, chứ mình không dám khẳng định đây là cấu trúc tốt nhất cho mọi ứng dụng graph. Các bạn cứ xem như một gợi ý tham khảo nhé.

---

### 📁 Bóc tách từng thành phần trong gói `graph`

Phần lớn code sẽ nằm trong package **graph** mà chúng ta sắp tạo:

* **graph.py** — nơi kết nối tất cả các node, edge và mối liên hệ giữa chúng.
* **state.py** — chứa **graph state object (đối tượng trạng thái)** sẽ bị thay đổi trong suốt quá trình graph thực thi.
* **const.py** — chứa các **hằng số (constants)**, chủ yếu là tên các node.
* **nodes/** — subpackage chứa toàn bộ implementation của các node; **mỗi file là một node**.
* **chains/** — mỗi file là một **chain khác nhau**, và chúng nên tương ứng với các node, bởi vì suy cho cùng mỗi node sẽ chạy một chain của LangChain.
* **chains/tests/test_chains.py** — nơi viết test cho các chain.

Ngoài ra, ở thư mục gốc chúng ta có file **ingestion** — chứa toàn bộ logic tải dữ liệu về để đánh index vào vector store.

Một chi tiết nhỏ nhưng quan trọng: **quy tắc đặt tên**. Chúng ta dùng **Pytest** để điều phối và chạy test, mà Pytest sẽ tìm các thư mục **bắt đầu bằng `tests`** và các file test có **tiền tố `test`**. Vì vậy hãy đặt tên cẩn thận ngay từ đầu.

---

### ✅ Chạy thử "test đầu tiên" và cấu hình PyCharm

Để chắc chắn mọi thứ hoạt động, mình thêm một test "dummy" vào `test_chains.py`:

```python
def test_foo():
    assert 1 == 1
```

Test này đương nhiên phải pass. Mình chạy lệnh `pytest . -v` trong terminal, trong đó dấu `.` nghĩa là chạy Pytest từ **thư mục hiện tại** (thư mục gốc dự án) và hiển thị kết quả ra stdout, còn `-v` là **verbose flag** giúp hiện rõ những test đã chạy. Kết quả: Pytest chạy `test_foo` từ file `test_chains` đúng như mong đợi.

Sau đó, mình cấu hình luôn **runner trong PyCharm**: vào **Edit configurations** ở góc trên bên phải, bấm nút **plus**, chọn **Python tests** rồi chọn **Pytest**; đặt **script path** là thư mục gốc và **parameters** là `. -v` giống như vừa rồi. Chạy thử — test thành công, và chúng ta còn xem được chi tiết quá trình thực thi. Điều này sẽ rất tiện lợi khi viết và chạy test về sau.

Vậy là xong cấu trúc dự án! Các bạn có thể đối chiếu toàn bộ code ở branch **two project structure**. Trong video tiếp theo, chúng ta sẽ triển khai **ingestion vào ChromaDB**. Hẹn gặp lại các bạn! 🚀
