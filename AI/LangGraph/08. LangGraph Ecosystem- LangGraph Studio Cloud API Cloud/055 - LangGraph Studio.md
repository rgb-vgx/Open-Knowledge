# 🎨 LangGraph Studio: "IDE" giúp bạn nhìn thấy agent đang chạy và debug nhanh gấp nhiều lần

Chào các bạn, Eden đây! 👋
Hy vọng các bạn vẫn đang thấy khóa học thú vị. Trong bài này, mình muốn giới thiệu một thứ **rất mới**: **LangGraph Studio**, hay còn gọi là **LangGraph IDE** — dịch vụ mới của đội ngũ LangChain, có thể **chạy ngay trên máy bạn**.

Mục tiêu của nó rất rõ ràng: giúp chúng ta **debug** và **nhìn rõ hơn** logic LangGraph của mình, từ đó **rút ngắn vòng đời phát triển** và **lặp nhanh hơn** khi xây dựng các agent.

---

### 🌟 LangGraph Studio là gì và làm được gì?

Đây là công cụ **đang ở giai đoạn beta**, nên các bạn có thể gặp **vài trục trặc nhỏ** hoặc kết quả không hoàn toàn giống nhau — nhưng vì nó quá hay và giúp xây agent tốt hơn, nên mình vẫn muốn giới thiệu ngay.

Hiện tại **LangGraph Studio chỉ hỗ trợ máy Mac dùng chip Apple silicon**, nhưng mình đoán trong tương lai gần nó sẽ hỗ trợ thêm các hệ điều hành khác.

Những gì nó cho phép chúng ta làm:

* **Theo dõi quá trình thực thi của các node** và biết **node nào đang chạy theo thời gian thực**.
* Đặt **breakpoint (điểm dừng)** và kiểm tra **state (trạng thái)** trước và sau khi một node thực thi.
* Dùng **graph ID** để quay về IDE quen thuộc — **PyCharm hay VSCode** — sửa logic, và thay đổi đó **tự động được phản chiếu** ngay trong Graph IDE.

Tóm lại, giá trị thật sự nằm ở chỗ: cho chúng ta — những developer — **những vòng lặp thật nhanh** khi phát triển agent LangGraph.

---

### ⚙️ Cài đặt và cấu hình: từ file .dmg đến langgraph.json

Mình bắt đầu từ **repository công khai** (link sẽ nằm ở phần Resources). Các bạn cần có **tài khoản LangSmith** để dùng — hiện tại LangSmith có **gói miễn phí (free tier)**, nên cứ thoải mái đăng ký.

Các bước cài đặt diễn ra rất "Mac" một chút:

1. Tải file **.dmg** từ link download.
2. Kéo ứng dụng vào thư mục **Applications**.
3. Mở ứng dụng và **đăng nhập bằng LangSmith**.
4. Mở project của mình lên trong **LangGraph Studio**.

Nhưng trước khi dùng, chúng ta cần **một chỉnh sửa nhỏ**: tạo file mới tên là **`langgraph.json`**. File JSON này nói cho LangGraph Studio biết:

* **Chúng ta đang debug graph nào** và **cách chạy nó** — graph hiện tại của chúng ta có **display name là `agent`**.
* **Đường dẫn tới compiled graph** — với dự án này là `./graph/graph.py`, vì trong file đó biến **`app`** chứa compiled graph của chúng ta. Phần trước dấu hai chấm là **đường dẫn file**, phần sau là **tên biến** giữ compiled graph.
* **File môi trường** — chúng ta trỏ vào `.env` để Studio biết các **environment variables** và **API key** đang dùng.
* **Dependencies** — mình để một dấu chấm (`.`) trong danh sách, nghĩa là **lấy dependencies từ thư mục gốc**, nơi có file **`poetry.lock`**.

Việc cuối cùng là mở **`pyproject.toml`** và khai báo rõ với dự án Poetry rằng chúng ta muốn dùng **package `graph`** đã tạo, bằng cách thêm entry **`packages`** vào file.

Và nhớ nhé: **Graph IDE thực chất là một Docker container chạy trên máy các bạn**, nên hãy chắc chắn **Docker đã được cài và đang chạy** — mình kiểm tra nhanh bằng lệnh `docker ps`.

---

### 🔍 Chạy thử: nhìn graph "sống" và fork state

Khi mở project trong LangGraph Studio, quá trình load sẽ mất **khoảng vài phút**. Điều gì đang diễn ra bên dưới? Studio đang:

1. Tải image của **LangGraph debugger**.
2. Tạo container từ image đó.
3. **Dockerize ứng dụng của các bạn** và build image.
4. Chạy một container chứa graph của các bạn.

Kiểm tra bằng `docker ps`, mình thấy đang có **3 container chạy**: **LangGraph debugger**, một **container Postgres**, và **container của ứng dụng**. Các bạn không cần biết Docker để dùng Studio, nhưng mình vẫn muốn cho thấy "hậu trường" để các bạn có góc nhìn đầy đủ hơn — và vì theo mình, **quản lý, xử lý deployment cũng là một phần công việc của AI engineer**.

Trong giao diện Studio (đang chạy tại `localhost:56784` và ở trạng thái online), bên trái là **graph Advanced RAG** của chúng ta. Ở ô input phía trên, các bạn nhập giá trị vào **field `question`** rồi submit.

Mình thử hỏi **"what is agent memory"** và xem điều gì xảy ra: graph chạy qua các bước **retrieve tài liệu, grading**, rồi tới **generation node** và trả về câu trả lời. Ở phần **thread**, các bạn sẽ thấy một **UUID do LangGraph Studio tự sinh** — cách tuyệt vời để biết chính xác chuyện gì đã xảy ra trong một lượt chạy (run), state của từng node ra sao.

Ví dụ, ở **grade documents node**, mình thấy có **3 tài liệu** được retrieve từ vector store và cờ **web search = true**. Đi xuống **web search node**, ta có **4 tài liệu** — phần lấy thêm từ web.

Giờ tới phần thú vị: giả sử mình **không muốn chạy web search** và muốn xem kết quả khi bỏ qua nó. Vì sau **grade documents** có một **conditional branch (nhánh điều kiện)** kiểm tra giá trị boolean `web search` trong state, mình chỉ cần **bỏ tick**, rồi bấm **Fork**. Studio sẽ tạo một **thread ID mới** và **resume (tiếp tục) graph sau grade documents node**, nhưng với `web search = false` — nhờ đó **bỏ qua web search**. Đúng y như mong đợi!

*Không có phép thuật nào ở đây cả.* Bí mật nằm ở **container Postgres** mà mình đã nhắc: LangGraph Studio **lưu state sau mỗi lần node thực thi**, cùng toàn bộ dữ liệu về thứ tự các node đã chạy. Tất cả được **persist (lưu bền vững) trong Postgres DB**. Kết hợp với khả năng **reiterate và rerun node với state khác nhau** vốn có của LangGraph, Studio trở thành một giao diện đẹp, tận dụng trọn vẹn các building block của LangGraph.

---

### ⏸️ Interrupts và thay đổi code "nóng" ngay trong lúc chạy

Tiếp theo, mình tạo một **thread mới** và thử đặt **interrupt**. Chúng ta sẽ nói kỹ hơn về interrupts ở section sau, nhưng hiểu đơn giản: đây là cách **dừng graph trước khi một node bất kỳ chạy**. Bạn có thể chọn **bất kỳ node nào** để chặn lại.

Mình chọn interrupt tại **grade documents**. Chạy với câu hỏi **"what is agent memory"**, graph retrieve xong thông tin rồi **dừng ngay trước grade documents** — sau đó chỉ cần bấm tiếp tục để nó chạy nốt. *Các bạn có thể hình dung việc debug ứng dụng LLM trở nên dễ dàng và tiện lợi đến mức nào rồi đấy!*

Mình thử thêm một thread mới với câu **"how to make pizza"** — và đúng như dự đoán, **nó chỉ đi qua web search** rồi trả kết quả về.

Còn đây là "điểm nhấn" cuối: **thay đổi code khi graph đang chạy**. Mình vào **generation node**, thay vì chạy chain như cũ, mình **import `PromptTemplate`** và tạo một template mới tên **`PiratePromptTemplate`**, nhận biến `text` và ra lệnh cho LLM **trả lời như một tên cướp biển**. Chain generation vẫn giữ nguyên như trước, nhưng kết quả được **pipe vào pirate prompt template** (đổ câu trả lời gốc vào biến `text`), rồi pipe tiếp vào **LLM** và parse output thành **một string duy nhất**.

Quay lại IDE, tạo thread mới và hỏi **"what is agent memory"**, chờ graph chạy xong… và câu trả lời cuối cùng **nghe y như cướp biển thật**, với "arr" ở đầu và "me hearties, arr" ở cuối. Đó chính là sức mạnh của việc lặp nhanh trong Studio!

LangGraph Studio đúng là một bổ sung tuyệt vời cho hệ sinh thái LangGraph. Ở bài tiếp theo, chúng ta sẽ bước ra khỏi local và làm quen với **LangGraph Cloud API** — nơi graph của bạn được "hóa thân" thành một web server hoàn chỉnh. Hẹn gặp lại các bạn! 🚀
