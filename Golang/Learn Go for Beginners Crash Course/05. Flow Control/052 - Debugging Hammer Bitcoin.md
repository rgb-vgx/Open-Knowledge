# 🔍 Debug Hammer Bitcoin — Đọc biến theo từng bước chạy

> Nguồn: `052-Debugging-Hammer-Bitcoin.txt` · [Udemy](https://ua.udemy.com/course/go-programming-language-crash-course/learn/lecture/26162166)

Chào các bạn! Sau khi cấu hình xong VS Code cho console application ở bài trước, hôm nay chúng ta sẽ **thực sự chơi với debugger** trên project Hammer Bitcoin. Đây là bài rất trực quan: các bạn sẽ thấy từng biến của chương trình "sống dậy" theo từng cú step.

### 🧷 Breakpoint đầu tiên — biến `playAgain`

Nhắc lại một điều mình đã nói nhiều lần: bạn **cần file `go.mod`** để debug. May là project Bitcoin Miner đã có sẵn, nên không phải lo.

Mình mở `main.go`, đặt breakpoint ở **dòng 11** bằng cách di chuột cạnh số dòng và click. Rồi vào Run → **Start Debugging**:

* Cửa sổ terminal hiện lên, chương trình dừng ngay ở breakpoint dòng 11.
* Nếu chưa thấy gì từ debugger, hãy click icon debugger ở thanh bên trái.
* Panel biến cho thấy **`playAgain` đang bằng `true`** — vì nó được gán `true` ở dòng 9, trước đó vài dòng.
* Mũi tên nhỏ vẽ đè lên chấm đỏ chỉ đúng dòng chương trình đang tạm dừng.

---

### 🎯 Thêm breakpoint ngay khi chương trình đang chạy

Một điều rất hay của debugger: mình có thể **thêm breakpoint trong lúc chương trình đang dừng**. Lần này mình mở `bitcoinMiner.go` và đặt thêm hai breakpoint — một ở **dòng 48**, một ở **dòng 58** — đơn giản vì mình có thể!

Sau đó bấm **Continue** (phím `F5` trên Mac; trên Windows bạn chỉ cần rê chuột lên nút để xem phím tắt). Chương trình chạy tiếp và dừng ở dòng 48:

* Biến đáng chú ý lúc này là **`stillInOffice`** — đang bằng `true` vì được gán ở dòng 45.
* Dòng 48 là một vòng lặp `for` có điều kiện: **`stillInOffice` phải đúng và `year` phải nhỏ hơn hoặc bằng 10**. Cả hai đều đang đúng, vì `year = 1` và `stillInOffice = true`.

---

### 🧭 Step vào tận standard library

Mình thử **Step Into** — chương trình nhảy sang dòng kế tiếp, kèm theo dấu chỉ dòng đang xét. Biến `computerPrice` chưa có giá trị vì ta đang đứng ngay tại dòng gán nó. Bấm Continue, chương trình nhảy tới hàm **`updateComputerPrice`**.

Bấm step thêm vài lần, ta đi vào biểu thức `rand.Intn(10) + 17` và **nhảy thẳng vào file `rand.go` của standard library** — file không phải do chúng ta viết. Bạn hoàn toàn có thể step từng dòng trong đó để xem thư viện chuẩn làm việc, nhưng *chắc chắn sẽ chán nhanh*, nên cứ Continue mà đi tiếp.

| Biến | Ý nghĩa | Giá trị quan sát được |
|---|---|---|
| `playAgain` | Có chơi lại không | `true` khi mới vào game |
| `stillInOffice` | Còn tại vị hay không | `true` ở những vòng đầu |
| `year` | Năm hiện tại của game | Bắt đầu từ 1 |
| `computerPrice` | Giá máy tính | Chưa có giá trị khi dừng ở dòng khai báo |
| `employeesPaid` | Số nhân viên đã trả lương | 0 |
| `percentStarved` | Phần trăm nhân viên chết đói | 0 |

---

### 🎮 Chơi game và xem biến thay đổi

Đến lượt chơi thử. Trong terminal, mình nhập toàn số 0 cho các câu hỏi: mua 0 máy, bán 0 máy, phân phát 0 bitcoin cho nhân viên. Game nhận xét mình là "người cai trị không giỏi lắm" và hiện dòng chữ vui nhộn **"Oh Great, Bill Gates — 2800 bitcoins remaining"**. Mình phân bổ 0 cho bảo trì, rồi một cú **market crash** ập đến — chương trình dừng lại ở dòng 58.

Mình đặt thêm breakpoint ở **dòng 62** và bấm step để đi vào **`countStarvedEmployees`**:

* Dòng code ở đây tính `employeesPaid` bằng `cashPaidToEmployees / 20`.
* `employeesPaid` bằng 0, `percentStarved` cũng bằng 0 — cả hai hiện rõ trên panel bên trái, cập nhật theo thời gian thực.
* Bấm Continue → **50 employees starved to death**, chương trình lại dừng ở dòng 62.
* Bấm Continue lần nữa: `stillInOffice` giờ đã `false`, nên vòng lặp kết thúc và game thông báo **"your final rating is terrible, we failed the game"**.

---

### 💡 Kết lại

Debugger làm việc đọc code và kiểm tra biến **dễ hơn rất nhiều** so với việc chèn `log` hay `fmt.Println` thủ công. Cách quen tay nhất là… cứ chơi với nó thật nhiều.

Muốn dừng debug, vào menu Run → **Stop Debugging**; ứng dụng vẫn còn chạy trong terminal nên mình nhấn `Ctrl+C` để tắt hẳn. *Các bạn cứ thoải mái đặt breakpoint ở đủ mọi chỗ khi chơi Hammer Bitcoin — sai cũng không sao, debugger chẳng mắng ai bao giờ.*

---

Debugger từ đây sẽ là người bạn đồng hành của các bạn trong suốt khóa học. Bài tiếp theo, chúng ta mang nó sang **Eliza** để xem ba tầng vòng lặp của cô nàng "trí tuệ nhân tạo" này làm việc. Hẹn gặp lại! 🚀

## Nguồn tham khảo

- [Delve — Debugger for the Go programming language](https://github.com/go-delve/delve)
- [Visual Studio Code — Debug code](https://code.visualstudio.com/docs/editor/debugging)
