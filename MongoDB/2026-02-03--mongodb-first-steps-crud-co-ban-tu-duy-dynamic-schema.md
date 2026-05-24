---
title: 'MongoDB Essentials 5: MongoDB First Steps: CRUD Cơ bản &amp; Tư duy Dynamic
  Schema'
date: '2026-02-03 23:52:54'
date_gmt: '2026-02-03 16:52:54'
modified: '2026-03-04 23:57:12'
status: publish
slug: mongodb-first-steps-crud-co-ban-tu-duy-dynamic-schema
wordpress_id: 672
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/02/03/mongodb-first-steps-crud-co-ban-tu-duy-dynamic-schema/
categories:
- MongoDB
tags: []
---

Khác với SQL nơi bạn phải viết hàng loạt lệnh DDL (`CREATE DATABASE`, `CREATE TABLE`, `ALTER TABLE`) trước khi làm bất cứ điều gì, MongoDB áp dụng triết lý **"Lazy Creation"** (Khởi tạo trễ). Mọi thứ được tạo ra ngay khi bạn cần chúng.

## 1. Lazy Creation: Database và Collection

Trong Shell, hãy bắt đầu bằng việc kiểm tra các database hiện có:

JavaScript

```
show dbs
```

Bạn sẽ thấy các database mặc định (`admin`, `local`...). Bây giờ, hãy chuyển sang một database mới tên là `shop`:

JavaScript

```
use shop
```

**Điều thú vị ở đây:** Database `shop` chưa thực sự tồn tại.

- MongoDB chỉ ghi nhận "ý định" của bạn.
- Database và Collection chỉ thực sự được ghi xuống đĩa cứng khi bạn **insert document đầu tiên**.
- Nếu bạn chạy lại `show dbs` ngay lúc này, `shop` vẫn chưa xuất hiện. Đây là hành vi hoàn toàn bình thường.

## 2. CREATE: Insert dữ liệu đầu tiên

Chúng ta sẽ thêm một sản phẩm vào collection `products`. Cú pháp rất giống JavaScript:

JavaScript

```
db.products.insertOne({
  name: "Book",
  price: 12.99
})
```

**Phân tích lệnh:**

1. `db`: Đại diện cho database hiện tại (`shop`).
2. `products`: Tên collection. Vì chưa có, MongoDB sẽ **tự động tạo** nó.
3. `insertOne(...)`: Lệnh thêm một document.
4. **Keys (name, price):** Trong Shell, bạn có thể không cần để tên key trong dấu ngoặc kép (ví dụ `name` thay vì `"name"`). Tuy nhiên, giá trị chuỗi (`"Book"`) bắt buộc phải có ngoặc.

**Kết quả trả về:**

JavaScript

```
{
  acknowledged: true,
  insertedId: ObjectId("64c9f...")
}
```

- **ObjectId:** Bạn không truyền trường `_id`, nên MongoDB tự động sinh ra một `ObjectId` duy nhất (unique) để làm khóa chính (Primary Key). Đây là bắt buộc cho mọi document.

## 3. READ: Truy xuất dữ liệu

Để xem dữ liệu vừa thêm, chúng ta dùng lệnh `find()`:

JavaScript

```
db.products.find()
```

Nếu bạn dùng shell cũ (`mongo`), dữ liệu trả về có thể hơi khó nhìn. Hãy dùng thêm `.pretty()`:

JavaScript

```
db.products.find().pretty()
```

*(Lưu ý: `mongosh` mới đã tự động format đẹp (pretty) mặc định).*

## 4. Chứng minh sức mạnh của Flexible Schema

Đây là phần quan trọng nhất để hiểu sự khác biệt với SQL. Chúng ta sẽ thêm 2 sản phẩm nữa với cấu trúc **hoàn toàn khác nhau** vào cùng collection `products`.

### Trường hợp 1: Thêm trường mới (Schema Evolution)

Thêm một chiếc áo thun, nhưng lần này có thêm trường `description`.

JavaScript

```
db.products.insertOne({
  name: "T-Shirt",
  price: 29.99,
  description: "High quality cotton"
})
```

Trong SQL, lệnh này sẽ lỗi nếu bạn chưa `ALTER TABLE` để thêm cột `description`. Trong MongoDB: **Thành công 100%**.

### Trường hợp 2: Dữ liệu lồng nhau (Embedded Document)

Thêm một máy tính với thông số kỹ thuật phức tạp. Thay vì tạo bảng `ComputerSpecs` riêng, ta nhúng trực tiếp vào.

JavaScript

```
db.products.insertOne({
  name: "Computer",
  price: 1299.99,
  description: "High performance workstation",
  details: {
    cpu: "Intel i9",
    memory: "32GB"
  }
})
```

Hãy chạy `db.products.find()` một lần nữa. Bạn sẽ thấy 3 documents nằm cạnh nhau với cấu trúc khác biệt:

1. **Book:** Chỉ có `name`, `price`.
2. **T-Shirt:** Có thêm `description`.
3. **Computer:** Có `details` (nested object).

## 5. Từ Shell đến Application Code

Bạn có thể tự hỏi: *"Tại sao tôi phải gõ lệnh trong màn hình đen này? Tôi viết code PHP/Node.js/Java mà?"*

Câu trả lời là: **Sự tương đồng (Isomorphism).**

Cú pháp bạn học trong Shell gần như tương đương 1:1 với cú pháp của các **MongoDB Drivers** trong code ứng dụng.

**Ví dụ so sánh:**

- **MongoDB Shell:**JavaScript`db.products.insertOne({ name: "Book", price: 10 })`
- **Node.js Driver:**JavaScript`await db.collection('products').insertOne({ name: "Book", price: 10 });`

Việc thành thạo Shell giúp bạn:

1. **Prototyping:** Thử nghiệm query phức tạp ngay lập tức xem có chạy đúng không trước khi copy vào code.
2. **Debugging:** Khi app chạy sai, bạn vào Shell kiểm tra dữ liệu gốc nhanh nhất.
3. **Ad-hoc Queries:** Sếp yêu cầu xuất báo cáo nhanh, bạn dùng Shell để lấy dữ liệu ngay lập tức.

---

## Kết luận & Takeaways

Qua bài thực hành nhỏ này, chúng ta rút ra được các nguyên lý vận hành:

1. **Implicit Creation:** Không cần khởi tạo trước Database/Collection. Hãy cứ insert, MongoDB sẽ lo phần còn lại.
2. **Auto-generated ID:** Mọi document đều có `_id`. Nếu bạn không cung cấp, MongoDB sẽ tự tạo `ObjectId`.
3. **Flexible Schema:** Bạn có thể lưu trữ các cấu trúc dữ liệu khác nhau trong cùng một collection. Điều này cực kỳ hữu ích cho các sản phẩm có thuộc tính đa dạng (như E-commerce).
4. **Shell là bạn:** Thành thạo Shell là bước đệm để viết code Backend hiệu quả.
