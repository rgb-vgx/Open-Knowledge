---
title: 'Bài 298 — Vẽ biểu đồ trade-off giữa hiệu năng và tốc độ'
date: '2026-11-23'
course: 'pytorch-deep-learning'
lesson: 298
status: edited
source: '298 - Visualizing the Performance vs Speed Trade-off.md'
categories:
- AI
tags: []
---

# 📈 Vẽ biểu đồ trade-off giữa hiệu năng và tốc độ

> Nguồn: `298 - Visualizing the Performance vs Speed Trade-off.md` · [Udemy](https://viettel.udemy.com/course/pytorch-for-deep-learning/learn/lecture/34055240)

"Một bảng số tốt, một biểu đồ còn tốt hơn." Bài này vẽ **scatter plot** với trục X là **thời gian dự đoán**, trục Y là **test accuracy**, và kích thước điểm thể hiện **kích thước model**. Nhìn vào là thấy ngay vì sao chọn EfficientNet B2.

### 🎯 Mục tiêu biểu đồ

* **X-axis**: prediction time per image (giây).
* **Y-axis**: test accuracy (%).
* **Kích thước điểm**: model size (MB).
* Vị trí lý tưởng: **góc trên bên trái** — accuracy cao nhất, thời gian thấp nhất.

---

### 🧱 Dựng scatter plot

```python
import matplotlib.pyplot as plt

fig, ax = plt.subplots(figsize=(10, 7))

scatter = ax.scatter(
    x=df["time_per_pred_cpu"],
    y=df["test_acc"],
    c=["blue", "orange"],          # mỗi model một màu
    s=df["model_size_mb"] * 10     # kích thước điểm theo model size
)
```

`s` nhận list kích thước — điểm của ViT sẽ to hơn hẳn vì file 327MB.

---

### 🏷️ Thêm tiêu đề, nhãn, grid

```python
ax.set_title("Food Vision Mini inference speed vs performance", fontsize=18)
ax.set_xlabel("Prediction time per image (seconds)", fontsize=14)
ax.set_ylabel("Test accuracy (%)", fontsize=14)
ax.tick_params(axis="both", labelsize=12)
ax.grid(True)
```

---

### 🔤 Chú thích từng điểm

```python
for index, row in df.iterrows():
    ax.annotate(
        row["model"],
        xy=(row["time_per_pred_cpu"] + 0.006, row["test_acc"] + 0.003),
        size=12
    )
```

Lưu ý phiên bản matplotlib: tham số đầu của `Axes.annotate` từng có tên **`s`**, sau đổi thành **`text`**. Nếu gặp lỗi từ khóa, truyền **positional** (như trên) hoặc đổi tên tham số cho khớp version đang dùng. Phần `+ 0.006` / `+ 0.003` chỉ để nhãn không đè lên điểm.

---

### 🔍 Legend theo kích thước model

```python
handles, labels = scatter.legend_elements(prop="sizes", alpha=0.5)
ax.legend(handles, labels, loc="lower right",
          title="Model sizes (MB)", fontsize=12)
```

`legend_elements(prop="sizes")` trích ra các mốc kích thước để người xem hiểu vì sao điểm to nhỏ khác nhau — quan trọng khi chia sẻ biểu đồ cho đồng nghiệp.

Lưu hình nếu muốn mang đi họp:

```python
fig.savefig("food_vision_mini_inference_speed_vs_performance.png")
```

---

### 🧭 Đọc biểu đồ

* **Góc trên trái** = lý tưởng: accuracy cao, thời gian thấp.
* ViT nằm **cao hơn một chút** (accuracy tốt hơn) nhưng **xa về bên phải** (chậm hơn nhiều) và điểm **to hơn** (file lớn hơn).
* EffNetB2 nằm thấp hơn một chút về accuracy nhưng **gần trục tung** hơn — nhanh hơn nhiều.

Đó chính là **performance vs speed trade-off**. Model lớn hơn có dung lượng học cao hơn nên chính xác hơn, nhưng đổi bằng tốc độ. Không phải quy luật tuyệt đối — nhiều nghiên cứu đang cố đẩy điểm về góc trên trái — nhưng với bài toán này, ưu tiên thời gian dự đoán là lựa chọn đúng.

---

Vậy là phần thực nghiệm đã xong: có model chạy tốt, chạy khá nhanh, dù chưa đạt đúng 30ms latency. Giờ là lúc **làm giao diện demo** để đưa Food Vision Mini ra đời. Hẹn gặp ở bài sau.
