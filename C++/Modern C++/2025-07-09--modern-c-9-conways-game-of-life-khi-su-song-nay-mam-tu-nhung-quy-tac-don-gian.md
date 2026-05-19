---
title: 'Modern C++ #9: Conway''s Game of Life: Khi Sự Sống Nảy Mầm từ những Quy tắc
  Đơn giản'
date: '2025-07-09 23:51:43'
date_gmt: '2025-07-09 16:51:43'
modified: '2025-07-10 00:30:08'
status: publish
slug: modern-c-9-conways-game-of-life-khi-su-song-nay-mam-tu-nhung-quy-tac-don-gian
wordpress_id: 111
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/07/09/modern-c-9-conways-game-of-life-khi-su-song-nay-mam-tu-nhung-quy-tac-don-gian/
categories:
- Modern C++
tags: []
---

Vào năm 1970, nhà toán học người Anh John Conway đã sáng tạo ra một thứ không hoàn toàn là "trò chơi" mà đúng hơn là một "thế giới mô phỏng". Ông gọi nó là **Game of Life**. Mục tiêu của ông là tìm ra một tập hợp các quy tắc tối giản có thể tạo ra các hành vi phức tạp, khó đoán và thú vị. Và ông đã thành công ngoài sức tưởng tượng.

Game of Life không phải là một trò chơi bạn "chơi" để thắng thua. Thay vào đó, bạn thiết lập trạng thái ban đầu và chiêm ngưỡng một vũ trụ ảo tự vận hành, nơi sự sống nảy mầm, tiến hóa và lụi tàn.

#### **1. Nền tảng: Automaton Tế bào (Cellular Automaton)**

Game of Life thuộc về một lĩnh vực gọi là **Automaton Tế bào**. Đây là một mô hình toán học bao gồm:

1. Một lưới (grid) các ô (cells).
2. Mỗi ô có một trạng thái hữu hạn (ví dụ: "bật"/"tắt", "sống"/"chết").
3. Trạng thái tiếp theo của một ô phụ thuộc vào trạng thái hiện tại của chính nó và các ô **hàng xóm** xung quanh nó.

Mô hình này cực kỳ mạnh mẽ để mô phỏng các hệ thống tự nhiên có sự tương tác và phản hồi, như cách các hoa văn hình thành trên vỏ sò, hay các phản ứng hóa học.

Một cách triết học hơn, Game of Life là một ví dụ hoàn hảo về:

- **Hệ thống nổi trội (Emergent System):** Nơi "tổng thể lớn hơn tổng các bộ phận". Giống như bộ não con người, từ hàng tỷ tế bào thần kinh đơn giản lại có thể tạo ra ý thức, suy nghĩ và cảm xúc.
- **Hệ thống tự tổ chức (Self-organizing System):** Nơi các thành phần ban đầu hỗn loạn có thể tự sắp xếp thành các cấu trúc ổn định và bền vững.

#### **2. Luật chơi của "Sự Sống"**

Thế giới của Game of Life được đặt trên một lưới 2D vô hạn (trên thực tế, chúng ta sẽ mô phỏng trên một lưới hữu hạn). Mỗi ô trên lưới có hai trạng thái: **Sống** (Alive) hoặc **Chết** (Dead).

Thế giới này tiến hóa qua từng **thế hệ** (generation). Ở mỗi thế hệ, số phận của một ô được quyết định bởi **8 ô hàng xóm** xung quanh nó (theo cả chiều ngang, dọc và chéo).

Các quy tắc do Conway đặt ra cực kỳ đơn giản:

**A. Đối với một ô đang "SỐNG":**

1. **Chết vì cô đơn (Underpopulation):** Nếu có **ít hơn 2** hàng xóm "sống", ô này sẽ "chết" ở thế hệ tiếp theo.
2. **Sống sót (Survival):** Nếu có **đúng 2 hoặc 3** hàng xóm "sống", ô này sẽ tiếp tục "sống" ở thế hệ tiếp theo.
3. **Chết vì quá tải (Overpopulation):** Nếu có **nhiều hơn 3** hàng xóm "sống", ô này sẽ "chết" ở thế hệ tiếp theo.

**B. Đối với một ô đang "CHẾT":**

4. **Hồi sinh (Reproduction):** Nếu có **chính xác 3** hàng xóm "sống", ô này sẽ "hồi sinh" (trở thành ô "sống") ở thế hệ tiếp theo.
5. **Giữ nguyên trạng thái:** Trong mọi trường hợp khác, ô này vẫn sẽ "chết".

#### **3. Tại sao Game of Life lại Hấp dẫn đến vậy?**

Từ 4 quy tắc đơn giản này, vô số các dạng "sự sống" phức tạp đã nảy sinh, được cộng đồng phát hiện và đặt tên:

- **Still Lifes (Tĩnh vật):** Các cấu hình không thay đổi qua các thế hệ.
- **Oscillators (Vật dao động):** Các cấu hình lặp lại trạng thái của chúng sau một vài thế hệ (ví dụ: Blinker, Toad).
- **Spaceships (Tàu vũ trụ):** Các cấu hình di chuyển trên lưới sau mỗi thế hệ (nổi tiếng nhất là Glider).

Điều đáng kinh ngạc hơn nữa là Game of Life đã được chứng minh là **Turing-complete**. Về mặt lý thuyết, điều này có nghĩa là nó có thể được dùng để mô phỏng bất kỳ máy tính nào và giải quyết bất kỳ bài toán tính toán nào!

Game of Life là một minh chứng hùng hồn cho việc sự phức tạp đáng kinh ngạc có thể được tạo ra từ sự đơn giản. Nó không chỉ là một bài tập lập trình thú vị mà còn là một cánh cửa để suy ngẫm về các quy luật cơ bản của vũ trụ. Trong bài học tiếp theo, chúng ta sẽ bắt tay vào việc hiện thực hóa thế giới này bằng C++.

Còn bây giờ, hãy thử tưởng tượng những cấu hình ban đầu và đoán xem chúng sẽ tiến hóa ra sao. Keep coding!
