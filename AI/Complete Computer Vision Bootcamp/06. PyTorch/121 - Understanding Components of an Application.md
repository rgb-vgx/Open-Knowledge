---
title: 'Bài 121 — Bốn thành phần cốt lõi của một ứng dụng machine learning'
date: '2026-11-23'
course: 'complete-computer-vision'
lesson: 121
status: edited
source: '121 - Understanding Components of an Application.md'
categories:
- AI
tags: []
---

# 🧩 Một ứng dụng ML gồm những gì?

> Nguồn: `121 - Understanding Components of an Application.md` · [Udemy](https://viettel.udemy.com/course/complete-computer-vision-bootcamp-with-pytoch-tensorflow/learn/lecture/49094013)

Chào các bạn! Mình đã có model CNN phân loại cat/dog/person và đã train xong. Nhưng để người khác dùng được, ta cần biến nó thành một **ứng dụng web**: người dùng upload ảnh, nhận dự đoán ngay. Trước khi code, bài này mình dựng bức tranh tổng thể — ứng dụng ML có **bốn thành phần** nào.

### 🖥️ Front end: phần nhìn thấy

**Front end** là phần **hiển thị** mà người dùng thấy trên trình duyệt. Trong ứng dụng của mình nó đảm nhận đúng hai việc:

1. Cho phép người dùng **upload ảnh** (kéo thả hoặc chọn file).
2. **Hiển thị dự đoán** trả về từ backend.

Hai việc này là "upload" và "see prediction" — front end chỉ lo giao diện, không chứa logic model.

---

### ⚙️ Back end: nơi xử lý logic

**Back end** chịu trách nhiệm **logic và xử lý**, gồm hai phần:

* **Pre-processing** — transform ảnh, đưa về đúng định dạng model cần (resize, tensor, normalize).
* **Post-processing** — nhận index/dự đoán từ model, map sang nhãn, ghi text lên ảnh.

Back end cũng là nơi **load model**, quyết định chạy **CPU hay GPU**, và gọi inference bằng PyTorch. Toàn bộ phần "inference" gồm: pre-processing → model inference → post-processing. Input là ảnh, output là nhãn `dog`/`cat`/`person`.

---

### 🧠 Model: trái tim của ứng dụng

**Model** là thành phần thứ ba — ở đây là một **deep learning model** đã train để phân loại cat, dog, person, chính là **custom CNN** mình tự dựng bằng PyTorch ở bài trước. Back end gọi model bằng cách đưa tensor vào và nhận tensor xác suất ra.

---

### ☁️ Deployment: đưa app lên internet

**Deployment** không hẳn là một "thành phần" mà là **chiến lược** chọn nơi host ứng dụng để người khác truy cập. Có nhiều lựa chọn:

* **Hugging Face Spaces** — miễn phí, có các gói trả phí linh hoạt hơn.
* **AWS**, **Google Cloud (GCP)**, **Azure**.
* **Streamlit Cloud** — miễn phí, có free tier.

Trong dự án này mình chọn **Hugging Face Spaces**.

---

### 🔗 Ghép các mảnh lại thành luồng chạy

Hãy hình dung luồng end-to-end. Front end có ô upload ảnh và nút **Submit**. Khi bấm Submit, ảnh được gửi sang back end. Back end load ảnh, chuyển sang tensor, resize/transform theo đúng input dimension model cần, rồi gọi inference. Model trả về tensor, back end dùng `torch.argmax` (hoặc `torch.max`) lấy lớp khả năng cao nhất, map sang nhãn, viết chữ lên ảnh, rồi **trả kết quả về front end**.

Front end hiển thị đồng thời hai thứ: **text box** chứa nhãn (ví dụ "person") và **ảnh đã ghi chữ** "person" lên góc trên bên trái. Toàn bộ front end + back end được **đóng gói** (không phải Python package, chỉ là gói code) và đưa lên một môi trường duy nhất — ở đây là Hugging Face Spaces.

Nếu chỉ chạy local thì không ai ngoài bạn dùng được. Đó lý do phải deployment: wrap cả gói front end + back end rồi host online.

Một điểm mình muốn nhấn mạnh: trong back end, phần **inference** là sợi dây nối các mảnh. Nó nhận input là ảnh, đi qua pre-processing, gọi model (input tensor, output tensor), rồi post-processing trả ra nhãn. Tách bạch được ba khâu này sẽ giúp việc debug và tái sử dụng dễ hơn nhiều.

Tóm lại, bốn thành phần là **front end, back end, model, deployment**. Nắm được bức tranh này rồi, các bài sau mình sẽ code từng phần. Trước hết, bài tiếp theo nói rõ hơn deployment là gì.
