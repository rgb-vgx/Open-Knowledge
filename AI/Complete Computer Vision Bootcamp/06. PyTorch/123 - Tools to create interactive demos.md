---
title: 'Bài 123 — Công cụ tạo demo tương tác: Gradio, Streamlit, Dash, Flask, FastAPI'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 123
status: edited
source: '123 - Tools to create interactive demos.md'
categories:
- AI
tags: []
---

# 🛠️ Chọn công cụ nào để làm UI cho model?

> Nguồn: `123 - Tools to create interactive demos.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094109)

Chào các bạn! Model đã xong, giờ cần một giao diện để người khác upload ảnh và xem kết quả. Bài này mình điểm qua các công cụ tạo **interactive demo**, chia thành hai nhóm lớn, rồi chốt lựa chọn cho dự án: **Gradio** + **Hugging Face Spaces**.

### 🧭 Hai nhóm công cụ

Mình chia các công cụ thành **hai loại**:

* **Loại tự tạo UI và lo backend luôn** — gồm **Dash** (của Plotly), **Streamlit** và **Gradio**. Chúng tự sinh giao diện từ một hàm Python, không cần viết HTML/CSS.
* **Loại chỉ cung cấp API** — gồm **Flask** và **FastAPI**. Chúng cho bạn toàn quyền kiểm soát API và backend, nhưng **không có UI**; bạn phải tự viết front end bằng HTML, CSS, JavaScript hoặc React.

### 🖱️ Loại tự sinh UI: nhanh, gọn, hợp prototype

Dash, Streamlit, Gradio cho phép **tạo UI nhanh**, **tự sinh interface từ hàm Python**. Bạn định nghĩa một hàm Python, gắn input/output là công cụ lo giao diện. Hạn chế: chỉ sinh UI từ **Python**, không sinh từ ngôn ngữ khác.

Nếu bạn muốn làm một **prototype nhỏ** để xem model chạy ra sao và cho người khác dùng thử, đây là lựa chọn hợp lý.

### 🔌 Loại thuần API: linh hoạt nhưng phải tự làm front end

Flask và FastAPI cho phép tạo các **endpoint API**: gọi model, truy vấn database, hay thậm chí chỉ một hàm hello world. Luồng điển hình: front end (HTML/CSS/JS) có nút Submit, bấm vào thì gọi một API; API đó gọi một hàm Python xử lý.

Ví dụ, nút "hello" gọi API một, API này gọi một hàm NLP để dự đoán từ tiếp theo; form email/password bấm login gọi API ba, API này kiểm tra thông tin đăng nhập. Toàn bộ logic là Python, nhưng bạn phải tự dựng front end và nối từng nút với từng API — **phức tạp hơn** nhưng **kiểm soát nhiều hơn**.

Nếu làm một website lớn kiểu Amazon với database, nhiều người dùng, hệ gợi ý sản phẩm, bạn sẽ dùng front end chuyên nghiệp + backend Python qua Flask/FastAPI. Còn để **prototype nhanh**, dùng Dash/Streamlit/Gradio.

### 📊 Dash: mạnh cho ứng dụng dữ liệu

**Dash** (Plotly) phù hợp với ứng dụng **data-intensive**: xem phân bố dữ liệu, vẽ đồ thị số, đồ thị phân loại. App Dash tối giản gồm: cài `dash`, import `dash`, `html`, `dcc`, `callback`, `plotly`, `pandas`; tạo `app`, gán `app.layout` với header, dropdown và graph; dùng callback để vẽ lại graph khi đổi lựa chọn. Chạy bằng `python app.py` — Dash chạy server **Flask** bên dưới.

Mình đánh giá Dash tốt cho dashboard dữ liệu, nhưng với **model inference** thì nên chọn Streamlit hoặc Gradio.

### 🎈 Streamlit: nhiều component sẵn

**Streamlit** mạnh hơn Dash về component. Chỉ cần `st.write`, `st.line_chart`, `st.slider`, `st.file_uploader`, `st.radio`, `st.date_input`, `st.color_picker`… là có ngay UI tương ứng. Có cả component cho chat (như ChatGPT, Gemini). Deploy lên **Streamlit Cloud** rất đơn giản: kết nối GitHub, trỏ vào file `app.py`, nó tự cài và chạy.

Một lưu ý thực tế: tác giả gặp lỗi khi import `torch` trong Streamlit ở phiên bản hiện tại — có thể là vấn đề tạm thời, nhưng đáng để ý.

### 🎛️ Gradio: chọn cho dự án này

**Gradio** cũng đơn giản như Streamlit, có chat component, slider, dataframe, load được 3D model — nói chung làm được những gì Streamlit làm. Ưu điểm chính:

* Tạo UI nhanh.
* Tự sinh interface.
* Hỗ trợ **text, ảnh, audio, video**.
* **Tương thích mượt với Hugging Face Spaces**.

Vì thế mình chọn **Gradio** để dựng app và deploy lên **Hugging Face Spaces**. Bài sau mình sẽ setup **hosting platform** và so sánh các lựa chọn deploy.
