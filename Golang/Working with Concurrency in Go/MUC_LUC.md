# MỤC LỤC — Khóa Working with Concurrency in Go (Golang) (Trevor Sawler)

> Index các bài blog biên soạn từ transcript khóa **Working with Concurrency in Go (Golang)** (Udemy, giảng viên Trevor Sawler).
> Cấu trúc section theo HTML gốc; số bài giữ theo numbering nguồn trên file `.txt` (001–086, khớp 1:1 với HTML mục 1–86).
> Style biên soạn: xem `_STYLE - Blog style guide.md`. Mỗi bài là một file blog tiếng Việt trong thư mục section tương ứng.

**Tổng: 10 section — 86 bài blog**

> Lưu ý numbering: HTML gốc có 10 phần (Phần 1–10) với 86 bài giảng, transcript có 86 file `.txt` (001–086) — khớp hoàn toàn, không có bài nào thiếu transcript.

---

## 01. Introduction

- [001 - Course Introduction](<01. Introduction/001 - Course Introduction.md>) — 🚀 Working with Concurrency in Go: Tổng quan khóa học và triết lý khác biệt của Go
- [002 - About the Instructor](<01. Introduction/002 - About the Instructor.md>) — 👋 Đôi nét về mình: 25 năm làm nghề và hơn ba thập kỷ đứng lớp
- [003 - Installing Go](<01. Introduction/003 - Installing Go.md>) — 🐹 Cài đặt Go: Vài phút là xong, nhanh hơn bạn tưởng
- [004 - Installing VS Code](<01. Introduction/004 - Installing VS Code.md>) — 💻 Cài đặt Visual Studio Code: Bộ vũ khí gọn nhẹ cho Go
- [005 - Installing Make](<01. Introduction/005 - Installing Make.md>) — 🛠️ Cài đặt Make: Chiếc build tool nhỏ mà có võ
- [006 - Asking for Help](<01. Introduction/006 - Asking for Help.md>) — 🙋 Khi cần giúp đỡ: Bốn bước để được hỗ trợ nhanh nhất
- [007 - Mistakes We All Make](<01. Introduction/007 - Mistakes We All Make.md>) — 😅 Sai lầm ai cũng mắc: Vì sao mình không cắt chúng khỏi bài giảng

## 02. Goroutines, the go keyword, and WaitGroups

- [008 - Section Overview](<02. Goroutines, the go keyword, and WaitGroups/008 - Section Overview.md>) — 🧭 Tổng quan Section 2: Goroutines, chữ go và WaitGroups
- [009 - Creating Goroutines](<02. Goroutines, the go keyword, and WaitGroups/009 - Creating Goroutines.md>) — ⚡ Tạo goroutine bằng một chữ go: Dễ tới mức... có vấn đề ngay
- [010 - WaitGroups to the Rescue](<02. Goroutines, the go keyword, and WaitGroups/010 - WaitGroups to the Rescue.md>) — 🛡️ WaitGroups to the Rescue: Chờ goroutine một cách đàng hoàng
- [011 - Testing with WaitGroups](<02. Goroutines, the go keyword, and WaitGroups/011 - Testing with WaitGroups.md>) — 🧪 Viết test cho code concurrent: Bắt goroutine chạy như thật
- [012 - Challenge - WaitGroup](<02. Goroutines, the go keyword, and WaitGroups/012 - Challenge - WaitGroup.md>) — 🎯 Challenge: Tự tay luyện WaitGroup với ba hàm nhỏ
- [013 - Solution to the Challenge](<02. Goroutines, the go keyword, and WaitGroups/013 - Solution to the Challenge.md>) — ✅ Lời giải Challenge: WaitGroup thực chiến và những điều cần nhớ

## 03. Race Conditions, Mutexes, and an Introduction to Channels

- [014 - Section Overview](<03. Race Conditions, Mutexes, and an Introduction to Channels/014 - Section Overview.md>) — 🧵 Mở màn Section 3: Race Conditions, Mutex và cánh cửa bước vào Channels
- [015 - Race Conditions Example](<03. Race Conditions, Mutexes, and an Introduction to Channels/015 - Race Conditions Example.md>) — 🐹 Race condition đầu tiên: hai goroutine tranh nhau một biến string
- [016 - Adding sync.Mutex](<03. Race Conditions, Mutexes, and an Introduction to Channels/016 - Adding sync.Mutex.md>) — 🔒 Gắn sync.Mutex vào code: khóa trước khi ghi, mở khóa khi xong
- [017 - Testing for Race Conditions](<03. Race Conditions, Mutexes, and an Introduction to Channels/017 - Testing for Race Conditions.md>) — 🧪 Kiểm tra race condition bằng test: go test -race lộ diện chân tướng
- [018 - A More Complex Example](<03. Race Conditions, Mutexes, and an Introduction to Channels/018 - A More Complex Example.md>) — 💰 Ví dụ phức tạp hơn: dự phóng thu nhập 52 tuần và bài học khóa đúng chỗ
- [019 - Testing the Income Project](<03. Race Conditions, Mutexes, and an Introduction to Channels/019 - Testing the Income Project.md>) — 🧾 Test cho dự án thu nhập: "bắt" stdout bằng os.Pipe và chốt con số $34,320
- [020 - Producer Consumer with Channels](<03. Race Conditions, Mutexes, and an Introduction to Channels/020 - Producer Consumer with Channels.md>) — 🍕 Producer/Consumer: lần đầu chạm vào Channels với bài toán quán pizza
- [021 - The Pizzeria Function](<03. Race Conditions, Mutexes, and an Introduction to Channels/021 - The Pizzeria Function.md>) — 🏪 Dựng quán pizza: seed random, tô màu terminal và chạy producer ở nền
- [022 - The makePizza Function](<03. Race Conditions, Mutexes, and an Introduction to Channels/022 - The makePizza Function.md>) — 👨‍🍳 Viết hàm makePizza: xác suất thất bại và ba biến đếm
- [023 - Finishing the Producer](<03. Race Conditions, Mutexes, and an Introduction to Channels/023 - Finishing the Producer.md>) — 🔀 Hoàn thiện Producer: gặp gỡ select và lời tạm biệt gọn gàng
- [024 - Creating the Consumer](<03. Race Conditions, Mutexes, and an Introduction to Channels/024 - Creating the Consumer.md>) — 🛎️ Consumer vào việc: đặt pizza và nhận kết quả theo cách "xanh đỏ"
- [025 - Finishing Producer Consumer](<03. Race Conditions, Mutexes, and an Introduction to Channels/025 - Finishing Producer Consumer.md>) — 🎉 Tổng kết dự án Pizza: chốt sổ ngày làm việc và nhìn lại hành trình

## 04. A Classic Problem - The Dining Philosophers

- [026 - What We'll Cover](<04. A Classic Problem - The Dining Philosophers/026 - What We'll Cover.md>) — 🍽️ Dining Philosophers: Bài toán kinh điển của Dijkstra mà mọi dân Go nên biết
- [027 - Getting Started](<04. A Classic Problem - The Dining Philosophers/027 - Getting Started.md>) — 🛠️ Khởi động Dining Philosophers: Kiểu dữ liệu, bàn tiệc và những dòng code đầu tiên
- [028 - Implementing the Logic](<04. A Classic Problem - The Dining Philosophers/028 - Implementing the Logic.md>) — ⚙️ Hiện thực logic diningProblem: Ăn, suy nghĩ và cú deadlock kinh điển
- [029 - Challenge - Finish Order](<04. A Classic Problem - The Dining Philosophers/029 - Challenge - Finish Order.md>) — 🧩 Challenge: In ra thứ tự các triết gia kết thúc bữa ăn
- [030 - Solution to Challenge](<04. A Classic Problem - The Dining Philosophers/030 - Solution to Challenge.md>) — 🔒 Lời giải challenge: Khoá orderMutex và ghi lại thứ tự rời bàn
- [031 - Writing a Test](<04. A Classic Problem - The Dining Philosophers/031 - Writing a Test.md>) — 🧪 Viết test cho Dining Philosophers: TestDine và bảng test theo độ trễ

## 05. Channels, and another classic - The Sleeping Barber problem

- [032 - What We'll Cover](<05. Channels, and another classic - The Sleeping Barber problem/032 - What We'll Cover.md>) — 💈 Channels và Sleeping Barber: Mở màn section "nặng ký" nhất từ đầu khóa
- [033 - Introduction to Channels](<05. Channels, and another classic - The Sleeping Barber problem/033 - Introduction to Channels.md>) — 🔌 Introduction to Channels: Hai goroutine "nói chuyện" với nhau như thế nào?
- [034 - The Select Statement](<05. Channels, and another classic - The Sleeping Barber problem/034 - The Select Statement.md>) — 🎛️ Select Statement: Khi Go chọn case ngẫu nhiên và cái bẫy deadlock
- [035 - Buffered Channels](<05. Channels, and another classic - The Sleeping Barber problem/035 - Buffered Channels.md>) — 📦 Buffered Channels: Khi channel có "sức chứa" và bạn cần xếp hàng công việc
- [036 - Getting Started with Sleeping Barber](<05. Channels, and another classic - The Sleeping Barber problem/036 - Getting Started with Sleeping Barber.md>) — 💈 Getting Started với Sleeping Barber: Vẽ bản đồ trước khi xây nhà
- [037 - Variables and the Barber Shop](<05. Channels, and another classic - The Sleeping Barber problem/037 - Variables and the Barber Shop.md>) — ⚙️ Variables và Barber Shop: Khai báo "linh hồn" của tiệm hớt tóc
- [038 - Adding a Barber](<05. Channels, and another classic - The Sleeping Barber problem/038 - Adding a Barber.md>) — 💈 Adding a Barber: Frank nhận ca đầu tiên và ngủ một giấc ngon lành
- [039 - Starting the Barbershop as a Goroutine](<05. Channels, and another classic - The Sleeping Barber problem/039 - Starting the Barbershop as a Goroutine.md>) — 🏪 Starting the Barbershop: Cho tiệm chạy nền và đóng cửa đúng giờ
- [040 - Sending Clients to the Shop](<05. Channels, and another classic - The Sleeping Barber problem/040 - Sending Clients to the Shop.md>) — 🚶 Sending Clients to the Shop: Ba số phận của một vị khách
- [041 - Trying Things Out](<05. Channels, and another classic - The Sleeping Barber problem/041 - Trying Things Out.md>) — 🧪 Trying Things Out: Frank quá tải và màn "tăng quân" ngoạn mục

## 06. Final Project - Building a Subscription Service

- [042 - What We'll Cover](<06. Final Project - Building a Subscription Service/042 - What We'll Cover.md>) — 🏗️ Dự án cuối khóa: Subscription Service — nơi concurrency bước vào đời thực
- [043 - Setting Up the Web Application](<06. Final Project - Building a Subscription Service/043 - Setting Up the Web Application.md>) — 🐹 Dựng khung web application cho dự án cuối khóa
- [044 - Docker Development Environment](<06. Final Project - Building a Subscription Service/044 - Docker Development Environment.md>) — 🐳 Dựng môi trường dev bằng Docker: Postgres, Redis và MailHog
- [045 - Adding Postgres](<06. Final Project - Building a Subscription Service/045 - Adding Postgres.md>) — 🐘 Kết nối Postgres: ba hàm nhỏ và một vòng lặp "kiên nhẫn"
- [046 - Setting Up a Makefile](<06. Final Project - Building a Subscription Service/046 - Setting Up a Makefile.md>) — ⚙️ Makefile: build, run, stop — mỗi việc một lệnh `make`
- [047 - Sessions and Redis](<06. Final Project - Building a Subscription Service/047 - Sessions and Redis.md>) — 🔐 Sessions & Redis: ứng dụng "nhớ" người dùng như thế nào?
- [048 - Application Config](<06. Final Project - Building a Subscription Service/048 - Application Config.md>) — 🧰 Application Config: "trạm trung chuyển" của mọi thành phần
- [049 - Routes Handlers and Web Server](<06. Final Project - Building a Subscription Service/049 - Routes Handlers and Web Server.md>) — 🛣️ Route, handler và khoảnh khắc web server "sống" lần đầu
- [050 - Templates and Render Function](<06. Final Project - Building a Subscription Service/050 - Templates and Render Function.md>) — 🎨 Templates & hàm `render`: dạy ứng dụng "nói" HTML
- [051 - Adding Session Middleware](<06. Final Project - Building a Subscription Service/051 - Adding Session Middleware.md>) — 🧩 Session Middleware: Bước đệm nhỏ để ứng dụng web "sống" thật sự
- [052 - Setting Up Stub Handlers and Routes](<06. Final Project - Building a Subscription Service/052 - Setting Up Stub Handlers and Routes.md>) — 🧱 Dựng thêm Stub Handler và Route cho các trang còn lại
- [053 - Implementing Graceful Shutdown](<06. Final Project - Building a Subscription Service/053 - Implementing Graceful Shutdown.md>) — 🛑 Graceful Shutdown: Đừng tắt ứng dụng một cách "phũ phàng"
- [054 - Populating the Database](<06. Final Project - Building a Subscription Service/054 - Populating the Database.md>) — 🗄️ Đổ dữ liệu vào Database: bảng plans, users và user_plans
- [055 - Adding a Data Package and Database Models](<06. Final Project - Building a Subscription Service/055 - Adding a Data Package and Database Models.md>) — 📦 Data Package và Database Models: cầu nối giữa ứng dụng và Postgres
- [056 - Implementing Login and Logout](<06. Final Project - Building a Subscription Service/056 - Implementing Login and Logout.md>) — 🔐 Đăng nhập, Đăng xuất: Khi ứng dụng bắt đầu "nhớ" người dùng

## 07. Sending Email Concurrently

- [057 - What We'll Cover](<07. Sending Email Concurrently/057 - What We'll Cover.md>) — 📬 Gửi email bất đồng bộ: khi lá thư không được phép chặn cả chương trình
- [058 - Getting Started with the Mailer Code](<07. Sending Email Concurrently/058 - Getting Started with the Mailer Code.md>) — 📮 Dựng bộ khung mailer: type Mail, type Message và hàm sendMail
- [059 - Building HTML and Plain Text Messages](<07. Sending Email Concurrently/059 - Building HTML and Plain Text Messages.md>) — 🎨 Hoàn thiện mailer: build message HTML, plain text và inline CSS
- [060 - Sending a Message Synchronously](<07. Sending Email Concurrently/060 - Sending a Message Synchronously.md>) — 🧪 Phát thư đầu tiên: gửi email đồng bộ để kiểm chứng
- [061 - Sending a Message Asynchronously](<07. Sending Email Concurrently/061 - Sending a Message Asynchronously.md>) — 🎧 Gửi email bất đồng bộ: listener goroutine và bộ ba channel
- [062 - Email Helper Function](<07. Sending Email Concurrently/062 - Email Helper Function.md>) — 🧰 Helper function: gửi email chỉ còn đúng một dòng
- [063 - Sending Email on Incorrect Login](<07. Sending Email Concurrently/063 - Sending Email on Incorrect Login.md>) — 🕵️ Bắt quả tang đăng nhập sai: gửi email cảnh báo trong nền
- [064 - Adding Cleanup to Shutdown](<07. Sending Email Concurrently/064 - Adding Cleanup to Shutdown.md>) — 🧯 Dọn dẹp lúc shutdown: tắt ứng dụng mà không bỏ rơi email nào

## 08. Registering a User and Displaying Plans

- [065 - Section Overview](<08. Registering a User and Displaying Plans/065 - Section Overview.md>) — 🗺️ Section mới: Đăng ký người dùng & hiển thị các gói Subscription
- [066 - Mail Templates and URL Signer](<08. Registering a User and Displaying Plans/066 - Mail Templates and URL Signer.md>) — 📧 Mail Templates & URL Signer: tấm khiên cho link kích hoạt
- [067 - Handler to Create a User](<08. Registering a User and Displaying Plans/067 - Handler to Create a User.md>) — 📝 Handler `postRegisterPage`: tạo user, ký URL, gửi email kích hoạt
- [068 - Activating a User](<08. Registering a User and Displaying Plans/068 - Activating a User.md>) — 🔓 Kích hoạt tài khoản: xác thực chữ ký URL rồi bật user
- [069 - User Data in Templates](<08. Registering a User and Displaying Plans/069 - User Data in Templates.md>) — 🙋 Đưa dữ liệu user vào mọi template: mở khóa cho trang Plans
- [070 - Displaying the Plans Page](<08. Registering a User and Displaying Plans/070 - Displaying the Plans Page.md>) — 💳 Trang Subscription Plans: bảng ba gói và nút Select
- [071 - Plans Route and Testing](<08. Registering a User and Displaying Plans/071 - Plans Route and Testing.md>) — 🧪 Nối route `/plans` và thử nghiệm: link navbar & trạng thái Current plan
- [072 - Stub Handler for Choosing a Plan](<08. Registering a User and Displaying Plans/072 - Stub Handler for Choosing a Plan.md>) — 🧩 Stub handler `subscribeToPlan`: bản đồ cho section tiếp theo

## 09. Adding Concurrency to Choosing a Plan

- [073 - Section Overview](<09. Adding Concurrency to Choosing a Plan/073 - Section Overview.md>) — 🚀 Đưa concurrency vào luồng subscribe: hóa đơn, PDF manual và đăng ký gói cùng chạy nền
- [074 - Getting the Plan ID, Plan and User](<09. Adding Concurrency to Choosing a Plan/074 - Getting the Plan ID, Plan and User.md>) — 🛡️ Middleware "giữ cửa" khu member & lấy đủ plan ID, plan, user trước khi subscribe
- [075 - Generating an Invoice](<09. Adding Concurrency to Choosing a Plan/075 - Generating an Invoice.md>) — 🧾 Sinh hóa đơn chạy nền: WaitGroup, "tổng đài" bắt lỗi và hai template mới
- [076 - Generating a Manual](<09. Adding Concurrency to Choosing a Plan/076 - Generating a Manual.md>) — 📄 Tự sinh PDF manual: gofpdf, importer và chiêu đính kèm file với tên tùy biến
- [077 - Trying It Out and Subscribing a User](<09. Adding Concurrency to Choosing a Plan/077 - Trying It Out and Subscribing a User.md>) — 🕵️ Chạy thử & săn bug: hóa đơn "mất" $20, PDF thiếu tên và cú subscribe hoàn chỉnh

## 10. Testing

- [078 - Section Overview](<10. Testing/078 - Section Overview.md>) — 🧪 Section cuối cùng: Viết test cho dự án Subscription Service
- [079 - Setting Up Our Tests](<10. Testing/079 - Setting Up Our Tests.md>) — 🛠️ Dựng môi trường test: setup_test.go và "cỗ máy" TestMain
- [080 - Testing Routes](<10. Testing/080 - Testing Routes.md>) — 🧭 Test đầu tiên: Làm sao biết mọi route đã thật sự được đăng ký?
- [081 - Testing the Renderer](<10. Testing/081 - Testing the Renderer.md>) — 🎨 Test renderer: Bơm session vào request để trang render được
- [082 - Making Data Testable](<10. Testing/082 - Making Data Testable.md>) — 📦 Làm data package dễ test: Interfaces và bộ đôi model giả
- [083 - Implementing the PlanTest Type](<10. Testing/083 - Implementing the PlanTest Type.md>) — 🥉 PlanTest: "Anh em sinh đôi" của type Plan và màn search/replace chỉn chu
- [084 - Testing Handlers](<10. Testing/084 - Testing Handlers.md>) — 🧑🍳 Bắt đầu test handler: Trang chủ rồi tới table-driven test
- [085 - Testing the Login Handler](<10. Testing/085 - Testing the Login Handler.md>) — 🔐 Test login handler: Từ lỗi bí ẩn tới go tool cover
- [086 - Testing a Concurrency Handler](<10. Testing/086 - Testing a Concurrency Handler.md>) — 🌀 Test handler dùng concurrency: Wait.Wait() treo máy và hai lỗi ẩn trong dummy mailer
