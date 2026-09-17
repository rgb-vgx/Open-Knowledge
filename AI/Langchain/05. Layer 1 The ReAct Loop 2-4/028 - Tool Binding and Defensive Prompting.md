# 🛡️ Tool Binding và Defensive Prompting: Dạy Agent biết "kỷ luật" trước khi ra trận

Tiếp nối bài trước, hôm nay chúng ta sẽ implement hàm **run_agent** — chính là **vòng lặp ReAct** mà mình đã giới thiệu sơ lược khi nói về thuật toán ReAct. Đây là trái tim của Layer 1, nên các bạn theo sát nhé!

### 📦 Gom tool vào list và tạo tool dictionary

Đầu tiên, mình tạo một **list chứa toàn bộ tool** của agent. Sau đó, mình tạo một **dictionary** với:

1. **Key** là tên của tool.
2. **Value** là chính tool đó — tức function Python.

Mình duyệt qua danh sách tools và truy cập thuộc tính `name` của từng tool để lấy key. Mục đích của dictionary này rất quan trọng: khi LLM trả về **tên tool** cần gọi, ta cần map nó sang **object Python** thật để thực thi. Viết code tới lúc dùng, các bạn sẽ thấy rõ hơn.

---

### 🔌 Khởi tạo LLM và bind tool

Mình dùng `init_chat_model` với provider là **ollama** và model **Qwen3 với 1.7 tỷ tham số**. Điểm hay là nếu muốn chuyển sang **OpenAI**, mình chỉ đổi chuỗi provider và tên model — không cần import object chat model của từng vendor.

Tiếp theo là bước quan trọng: **bind tool vào model** bằng hàm `bind_tools`, truyền vào list tools. Điều này có nghĩa là **mỗi lần gửi request tới LLM, tool descriptions cũng được gửi kèm**.

* Lưu ý: cách này chỉ hoạt động với **LLM hỗ trợ function calling**. Khi đó model có thể trả về câu trả lời dưới dạng **tool call** — tức là quyết định xem cần gọi tool nào.
* `bind_tools` hoạt động với **mọi chat model trong LangChain** hỗ trợ function calling. OpenAI hay Anthropic đều hỗ trợ → chỉ cần đổi chuỗi, không đổi code. Lớp abstraction này thực sự rất tiện.

Mình thêm vài dòng print cho dễ quan sát rồi chạy thử — câu hỏi được in ra đúng như mong đợi.

---

### 🧠 "Bộ não" của agent: System prompt và Defensive Prompting

Giờ đến phần thú vị nhất — mình viết **system prompt** cho agent với nội dung khởi đầu: *"You are a helpful shopping assistant. You have access to a product catalog tool and a discount tool."*

Điểm đặc biệt là mình áp dụng **defensive prompting** — đưa ra một loạt quy tắc nghiêm ngặt:

1. **Không bao giờ đoán hay giả định giá sản phẩm** — luôn phải chọn tool để lấy giá thật.
2. **Bắt buộc gọi `get_product_price`** để lấy giá thực tế.
3. **Chỉ gọi `apply_discount` sau khi** đã nhận được giá từ `get_product_price`.
4. **Truyền đúng con số giá vừa nhận được**, tuyệt đối không truyền một con số do model tự bịa ra.
5. **Không tự tính giảm giá bằng toán học** — luôn dùng tool `apply_discount`.
6. **Nếu người dùng chưa nêu hạng giảm giá** (bronze/silver/gold) thì phải hỏi lại, không được tự giả định.

Vì sao mình lại "khắt khe" như vậy? Vì mình đang dùng **open weight model là Qwen3** — khả năng reasoning thấp hơn nhiều so với các **top tier model** hỗ trợ function calling. Các open weight LLM đôi khi **hallucinate giá sản phẩm**, khiến kết quả không còn bám vào dữ liệu thật. Mình đã thêm các quy tắc này **sau vài lần chạy thử** và tận mắt thấy hiện tượng đó xảy ra.

*Một bài tập nhỏ rất hay:* bạn hãy thử **xóa các quy tắc nghiêm ngặt** này và xem điều gì sẽ xảy ra — biết đâu bạn sẽ có phát hiện thú vị!

---

### 💬 Message người dùng và lần chạy thử đầu tiên

Sau system message, mình thêm phần tử thứ hai vào list messages: một **HumanMessage** chứa câu hỏi nhận từ người dùng — trong trường hợp này là câu hỏi về giá sau khi áp hạng giảm giá gold.

*Nếu bạn chưa rõ các loại message, cứ ghé qua phần glossary của khóa học — mình mô tả chi tiết ở đó.*

Mình lưu lại và chạy thử — mọi thứ hoạt động trơn tru. Ở video tiếp theo, chúng ta sẽ viết phần thân của agent loop: gọi LLM, xử lý tool call, và hoàn thiện vòng lặp ReAct đầu tiên! 🚀
