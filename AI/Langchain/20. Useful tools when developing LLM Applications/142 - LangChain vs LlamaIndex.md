# ⚔️ LangChain vs LlamaIndex: Chọn "Vũ Khí" Nào Cho LLM App?

> Nguồn: `142-LangChain-VS-LlamaIndex.txt` · [Udemy](https://ua.udemy.com/course/langchain/learn/lecture/42379044)

Chào các bạn, mình là Eden đây! 👋 Hôm nay chúng ta sẽ bàn về **điểm giống và khác nhau giữa LangChain và LlamaIndex** — câu hỏi mà mình nhận được không ít lần. Nếu bạn đang cân nhắc framework nào để bắt đầu, bài này dành cho bạn.

---

### 🤝 Điểm chung: Cả hai đều giúp bạn xây LLM App

Mình nói ngay từ đầu cho rõ: **hai framework này rất giống nhau**.

* Nếu bạn muốn phát triển một **LLM application**, bạn có thể làm với **LangChain** — và **cũng có thể làm với LlamaIndex**.
* Cả hai đều cung cấp **hệ thống tiện ích và công cụ** để xây dựng ứng dụng LLM.

Điểm khác biệt đầu tiên nằm ở **mức độ phổ biến**: **LangChain được ưa chuộng hơn**, có **lượng người dùng đông hơn** trong cộng đồng lập trình viên. **LlamaIndex cũng có người dùng**, nhưng **không nhiều bằng LangChain**.

---

### 🎯 Điểm khác: Định hướng dữ liệu vs. Định hướng agent

**LlamaIndex** tập trung nhiều hơn vào **dữ liệu**: cụ thể là **retrieval augmentation**, **tích hợp dữ liệu bên ngoài** vào LLM application — có thể nói nó **thiên về data-oriented**.

Trong khi đó, **LangChain cũng cung cấp đầy đủ những tính năng vừa kể** — không hề thiếu. Hơn nữa, **hỗ trợ retrieval augmentation trong LangChain đã tốt lên rất nhiều**, đặc biệt từ khi họ giới thiệu abstraction mang tên **LangChain Expression Language (LCEL)**, mang lại **độ linh hoạt cao** khi xây dựng các hệ thống RAG.

Theo mình, LLM application thường được chia làm **hai nhóm chính**:

1. **RAG application (retrieval augmentation generation)** — bạn **chat với dữ liệu** của mình, kết nối tới nguồn dữ liệu bên ngoài.
2. **Agentic application** — tận dụng **khả năng suy luận (reasoning)** của LLM để **chọn đúng bộ tool** cần dùng, gọi chúng, và từ đó thực thi những **hành động mang tính phi xác định (non-deterministic)**.

Vậy LlamaIndex có hỗ trợ agent không? **Có** — họ có hiện thực cho **thuật toán ReAct** chẳng hạn. Nhưng phần lớn bộ tính năng agent của họ **xoay quanh retrieval và search**.

Ngược lại, theo đánh giá của mình, **phần agent của LangChain vững chắc và toàn diện hơn nhiều**. LangChain đã có nhiều thay đổi lớn, và với **LangChain Expression Language**, bạn có **rất nhiều linh hoạt** trong cách **chạy agent** cũng như **xác định tool nào sẽ được chọn**.

Mình cũng nhận thấy ở LangChain **nhiều hoạt động nghiên cứu và phát triển hơn hẳn** trong lĩnh vực này — họ dường như **cập nhật nghiên cứu mới nhất** về phát triển LLM agent **nhanh hơn**.

| Tiêu chí | LangChain | LlamaIndex |
|---|---|---|
| Độ phổ biến | Đông người dùng hơn | Ít người dùng hơn |
| Thế mạnh chính | Agent và hệ sinh thái rộng | Dữ liệu, retrieval augmentation |
| RAG | Đầy đủ, tốt lên nhờ LCEL | Rất mạnh, thiên về data-oriented |
| Agent | Vững chắc và toàn diện hơn | Có ReAct nhưng xoay quanh retrieval và search |
| Nghiên cứu và phát triển | Cập nhật nhanh hơn | Chậm hơn theo đánh giá của Eden |

---

### 🏁 Kết luận của mình: Chọn LangChain

Tóm lại, **cả hai framework rất giống nhau**, nhưng nếu hỏi mình chọn cái nào để phát triển LLM application, **mình vẫn chọn LangChain**.

* Kể cả khi ứng dụng của bạn **cực kỳ tập trung vào dữ liệu**, dùng nhiều **retrieval augmentation** và **nguồn dữ liệu bên ngoài** — **mình vẫn chọn LangChain**, vì nó **đáp ứng được những nhu cầu đó**.
* Còn nếu bạn xây dựng **agentic application** — đương nhiên là **LangChain**, vì nó có **hệ sinh thái vững chắc hơn hẳn** cho việc xây agent Generative AI.

*Tất nhiên, đây là góc nhìn và trải nghiệm cá nhân của mình sau nhiều năm gắn bó với hệ sinh thái này — các bạn cứ dùng nó làm điểm tham chiếu, còn lựa chọn cuối cùng vẫn là của bạn.*

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** LangChain và LlamaIndex giống nhau ở điểm nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Cả hai đều dùng để phát triển LLM application, đều cung cấp hệ thống tiện ích và công cụ.

Giải thích: Về cơ bản hai framework rất giống nhau.

Tham chiếu: Mục Điểm chung.

</details>

**Câu 2:** LlamaIndex thiên về hướng nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thiên về dữ liệu — retrieval augmentation, tích hợp nguồn dữ liệu bên ngoài vào LLM application, gọi là data-oriented.

Giải thích: Đây là điểm khác biệt định hướng chính giữa hai framework.

Tham chiếu: Mục Điểm khác.

</details>

**Câu 3:** LLM application thường được chia thành hai nhóm chính nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** RAG application (chat với dữ liệu) và agentic application (dùng reasoning để chọn và gọi tool, thực thi hành động phi xác định).

Giải thích: Cách phân nhóm này giúp định vị thế mạnh từng framework.

Tham chiếu: Mục Điểm khác.

</details>

**Câu 4:** LlamaIndex có hỗ trợ agent không, và khác LangChain thế nào?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Có — có cả hiện thực ReAct, nhưng phần lớn tính năng agent xoay quanh retrieval và search; LangChain được Eden đánh giá vững chắc và toàn diện hơn.

Giải thích: LangChain cũng cập nhật nghiên cứu mới nhanh hơn.

Tham chiếu: Mục Điểm khác.

</details>

**Câu 5:** Eden chọn framework nào và vì sao?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Chọn LangChain — kể cả khi ứng dụng tập trung vào dữ liệu, vì LangChain đáp ứng được; còn agentic application thì hệ sinh thái LangChain mạnh hơn hẳn.

Giải thích: Đây là góc nhìn cá nhân, các bạn vẫn tự quyết định.

Tham chiếu: Mục Kết luận của mình.

</details>

Hy vọng bài viết này giúp các bạn tự tin hơn khi chọn framework cho dự án của mình. Ở các bài tiếp theo, chúng ta vẫn còn nhiều công cụ và kỹ thuật thú vị để khám phá trong hệ sinh thái LangChain. Hẹn gặp lại các bạn! 🚀

## Nguồn tham khảo

- [Udemy — LangChain VS LlamaIndex](https://ua.udemy.com/course/langchain/learn/lecture/42379044)
- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [LlamaIndex — Framework](https://www.llamaindex.ai/framework)
