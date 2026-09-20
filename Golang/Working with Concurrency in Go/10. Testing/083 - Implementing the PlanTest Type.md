# 🥉 PlanTest: "Anh em sinh đôi" của type Plan và màn search/replace chỉn chu

> Nguồn: `083-Implementing-the-PlanTest-type.txt` · [Udemy](https://ua.udemy.com/course/working-with-concurrency-in-go-golang/learn/lecture/32311078)

Type `UserTest` đã sẵn sàng, giờ mình làm **đúng y hệt** như vậy cho `Plan`. Bài này ngắn gọn thôi, nhưng có một chi tiết đáng nhớ: lần này mình sẽ làm màn search/replace **một cách chỉn chu** — khác hẳn phen "quét nhầm cả file" ở bài trước. *Kinh nghiệm xương máu đấy, các bạn ạ!*

### 📋 Copy type `Plan` và thay receiver

Mình mở `plan.go`, copy khai báo type ở đầu file, rồi quay lại `test-models.go` dán vào **cuối file** và đổi tên thành `PlanTest`. Các bạn có thể để nó ở file riêng cũng chẳng sao — không quan trọng lắm.

Tiếp theo, copy toàn bộ các phương thức gắn với `Plan` và dán xuống dưới type `PlanTest`. Lần này mình mở menu edit, chọn **replace**, tìm `p *Plan` và thay bằng `p *PlanTest`, rồi bấm nút "replace all" — gọn gàng, chuẩn xác, không quét nhầm sang file nào cả.

---

### 🧹 Làm cho các phương thức thật "ngốc"

Nguyên tắc giống hệt `UserTest`: **không chạm vào database**, chỉ cần trả về đúng kiểu dữ liệu. Với `GetAll`, mình dọn sạch phần thân hàm cũ và tạo một plan giả duy nhất:

```go
func (p *PlanTest) GetAll() ([]*Plan, error) {
	var plans []*Plan

	plan := Plan{
		ID:         1,
		PlanName:   "bronze plan",
		PlanAmount: 1000,
		CreatedAt:  time.Now(),
		UpdatedAt:  time.Now(),
	}

	plans = append(plans, &plan)

	return plans, nil
}
```

Lưu ý nhỏ: `plans` là slice chứa **con trỏ**, nên khi append mình phải đưa vào **tham chiếu** `&plan`. Các hàm còn lại thì càng đơn giản càng tốt:

* `GetOne` — copy ý tưởng của `GetAll`, trả về plan giả vừa tạo.
* `SubscribeUserToPlan` — chỉ cần `return nil`.
* `AmountForDisplay` — hàm này vẫn cần dùng `fmt.Sprintf` để định dạng, nên nhớ **import `fmt`** vào file. Nếu editor không tự thêm giúp, các bạn cứ gõ tay ở phần import — chuyện nhỏ.

---

### 🔌 Nối `TestNew` vào `setup_test.go`

Cuối cùng, mình sửa `TestNew` để trả về **cả hai** model test thay vì chỉ một:

```go
func TestNew(dbPool *sql.DB) Models {
	DB = dbPool

	return Models{
		User: &UserTest{},
		Plan: &PlanTest{},
	}
}
```

Rồi trong `setup_test.go`, chỗ dựng `testApp`, mình thêm field `Models` — thay vì gọi `data.New` (cần database), mình gọi `data.TestNew(nil)`:

```go
testApp = config{
	session:  session,
	DB:       nil,
	infoLog:  infoLog,
	errorLog: errorLog,
	Models:   data.TestNew(nil),
}
```

Vậy là xong: từ giờ, các test của handler có thể gọi `testApp.Models.User` và `testApp.Models.Plan` thoải mái **mà không cần database nào cả**.

Bài tiếp theo sẽ là phần thú vị nhất — bắt đầu **test handler**, và rồi chúng ta sẽ chạm tới phần **test concurrency**, thứ mà cả khóa học này hướng tới. Hẹn gặp lại các bạn! 🚀
