---
title: Setting App
date: '2025-10-27 00:53:37'
date_gmt: '2025-10-26 17:53:37'
modified: '2025-10-27 01:01:41'
status: publish
slug: setting-app
wordpress_id: 455
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2025/10/27/setting-app/
categories:
- Uncategorized
tags: []
---

Tiếp đến mình sẽ nói về phần menu setting apps thì ở đây nó sẽ nó sẽ chia làm những cái layer, ví dụ như là layer application này, app framework này, service này, communication layer thì cái phần của mình nó sẽ là menu setting apps ở trong này và ở bên trong này thì nó sẽ có chức năng và nhiệm vụ của từng cái block trong cái structure này. Còn menu setting up thì nó sẽ ở phần... mình sẽ nói phần view controller trước đi. Nó sẽ hiển thị cái màn hình ở trên list, trên screen. Hiển thị các cái setting hoặc là thay đổi setting. Hoặc là nhận cái thông tin từ Meta. Set setting based on boy.recon9, có nghĩa là set những cái giá trị dựa trên cái giá trị của thằng boy.recon9.

thì nó sẽ có một cái khối gọi là khối ServiceBridge là chuyên để làm việc với các service nó đang chuyên để làm việc với khối service mỗi cái service thì nó sẽ được tạo ra một cái wrapper vào trong ServiceBridge này khi mình giao tiếp với service thì mình có thể là mình có thể là set xuống hoặc là mình có thể là nhận notify từ service thông qua khối này và đây có cái phần command thì nó sẽ có on start, on stop, có nghĩa là khi mà Khi mà khởi chạy con setting app này hoặc là khi mà nó dừng lại Còn content control thì kiểu như là khi mà chạy lên thì cái mạng hình nào nó sẽ được bật Và khi mà nó chuyển giữa các cái mode của setting ý Ví dụ là từ cái mạng đầu tiên Ví dụ từ cái mạng này, nó xa đến cái mạng này thì nó sẽ là content control Ở đây còn có on or off control, on or off control, on

or off thì nó là cái on screen là những cái mạng hình mà nó đang hiện thị đè lên trên cái app của mình. Nó có thể là Circle là đè lên chỉ trong con app này thôi. Hoặc là cái Circle là System, System Wide. Thì có nghĩa là mình có thể request cái mạng đấy từ một con app khác. Ví dụ con Navi nó request để nó có một cái mạng nó priority rất cao thì nó sẽ đè lên trên con setting app. Thông báo kiểu thế. Back Control thì là... Back Control thì là những cái mà mình có thể là... Sử dụng cái button back để mình có thể trở lại. Nhưng mà con Zik này em đâu thấy button back đâu? Không biết là nó có ghi thử không? Con M7G thì nó có một cái nút back. Ấn vào đấy thì nó sẽ trở lại cái bàn trước.

Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and Right Left and nhưng mà con setting này nó sẽ chia làm 2 tầng là left layer và right layer thì nó sẽ được xử lý vào phần command này Còn những cái phần như là ARB thì thì nó sẽ phục vụ cho phần command này thì mình cũng

nói rồi Cái phần service này thì nó sẽ phục vụ cho cái phần gọi là thay đổi giá trị hoặc là khởi tạo process khi mà start hoặc là đọc những cái giá trị từ batch manager Menu Service thì nó sẽ có cái trách nhiệm gọi là quyết định xem là cái button nó có được hiện hay không, hoặc là cái trạng thái Up và Down của button. Cái button là những cái button ở bên này này. Delete personal data service thì nó sẽ liên quan đến cái phần mà xóa những cái setting của người dùng. Ví dụ là ở đây có cái bản cuối này, bản Reset này. Sửa tiệm Reset này, hoặc là cái mạng Dedit Profile ở trên này. Reset Setting hoặc là Dedit Driver này. Còn Display Service thì nó sẽ liên quan đến xử lý của thằng Display ở đây. Nó sẽ liên quan đến cái thằng... từ trình độ sáng hoặc là trình Day Mode, Night Mode.

Ví dụ ở đây nó sẽ có cái nút Illumination ý. Mình có thể bật lên. Bật lên thì nó màu trắng này, hoặc là tắt đi thì nó sẽ thành màu hơi tối một chút. UserProfileService UserManagement thì nó sẽ là chuyển đổi giữa các profile trên này UserProfile1, UserProfile2 thì nó sẽ được quản lý thông qua UserProfileService Pin Code Verification thì lúc nãy có vài setting liên quan đến pin thì cũng sẽ thông qua đây ở cái mạng này này setting pin setup file Tech Converter Service thì nó sẽ liên quan đến những setting liên quan đến hàn keyboard. Audio Manager thì nó sẽ liên quan đến cái phần setting của thằng Sam setting ở đây. Blog Service thì nó sẽ liên quan đến cái việc cung cấp data của ngày giờ. Tag Service thì nó sẽ liên quan đến việc gửi nhận card.

Customize service thì nó sẽ đề quản với cái phần gọi là vực hình của Customize. Nó sẽ là cái phần này này. Bluetooth service thì... Đấy, thì nó sẽ đề quản với cái phần Bluetooth setting ở đây. Đấy thì ở đấy là những cái service chính mà mình đang được cục. Tiếp đến nữa thì sẽ có cái phần gọi là cái... cái kiếm trúc của con app của mình. Nó sẽ là một cái thằng... gọi là thằng app nó bay trên cái đường. Thì nó sẽ là cái phần màu... trong khách đoạn này. Nó sẽ gồm ViewController rồi là ModeController. Thì ViewController nó sẽ dùng để có chôn cái việc mà hiển thị... của HP. Còn ModeController thì nó sẽ... Nó sẽ làm việc để giao tiếp với những thằng service.

Và thường thì nó sẽ được lưu vào một cái, gọi là service structure để nó lưu lại những cái, những cái chắc cái hỗn bộ, những cái biến của nó vào service structure. Xong là từ thằng view nó sẽ bắp cái service structure này ra. Và nó update hiển thị. Còn cái vòng đời, vòng đời của con app thì nó sẽ được quản lý thông qua thằng application manager và thằng content này. Application Manager với Content thì nó sẽ có những cái kiểu này Đây là một cái... một cái statement chí này Thì nó sẽ...

mỗi một cái statement này thì khi mà đăng ký thì nó sẽ đính kèm với một cái Content Ví dụ cái block này nó sẽ có cái event view entry menu setting này thì nó sẽ đính vào mỗi content và thằng application manager này thì nó sẽ gọi là start và stop at thì cái content này nó sẽ được gọi và nó có thể chuyển đứng giữa những cái mode như này mỗi một cái block ở trong này này thường thì nó sẽ tự trưng cho một cái bản hình và nó có thể là chuyển từ bản này sang bản khác Còn cái thằng key Key Receipt này thì khi user có những thao tác với phim cứng thì nó sẽ có một cái gọi là Key Dictionary Contact của thằng Switch Handler nó gửi cho thằng Kingdom ở đây. Trong này hình như là thiếu một cái hình. Thì thằng Kingdom này nó cũng sẽ gửi lại cho thằng app thông qua cái Framework Message này.

Còn ở đây thì có cái phần Service Barrier, Service API này. Thì mình sẽ liên kết với những cái service bên ngoài, thông qua cái thằng Service Barrier này, và khi mà có phone back, thì nó cũng sẽ gửi trả app của mình. Thông qua cái Facebook Message. Còn Application Manager này thì hầu như là mình cũng ít làm việc trực tiếp lắm. Mình sẽ làm việc thông qua thằng Application Manager này. Application Manager này thì nó là một cái wrapper của thằng Kingdom. Anh chị em có ai hỏi gì không?

### Cấu trúc Ứng dụng Cài đặt (Menu Setting App Structure)

Ứng dụng cài đặt được chia thành nhiều lớp (layer) khác nhau, bao gồm:

- **Application Layer**
- **App Framework Layer**
- **Service Layer**
- **Communication Layer**

Phần chính của ứng dụng là "Menu Z app" nằm trong cấu trúc này, với mỗi khối (block) đều có chức năng và nhiệm vụ cụ thể.

### Các Thành phần Chính và Chức năng

1. **View Controller:**
   - Hiển thị màn hình cài đặt trên giao diện người dùng (list on screen).
   - Cho phép người dùng xem hoặc thay đổi các cài đặt.
   - Nhận thông tin từ "matter setting" dựa trên giá trị của `voicon` (thiết lập giá trị dựa trên `voiconile`).
2. **Service Bridge:**
   - Là khối chuyên trách làm việc với các dịch vụ (service).
   - Mỗi dịch vụ sẽ được tạo một wrapper trong Service Bridge.
   - Cho phép ứng dụng thiết lập giá trị xuống các dịch vụ hoặc nhận thông báo (notify) từ các dịch vụ thông qua khối này.
3. **Common (Các Chức năng Chung):**
   - **`onStart` / `onStop`:** Xử lý khi ứng dụng cài đặt khởi chạy hoặc dừng lại, ví dụ: xác định màn hình nào sẽ được bật khi khởi chạy.
   - **`contentControl`:** Điều khiển việc chuyển đổi giữa các chế độ (mode) của cài đặt, ví dụ: chuyển từ màn hình này sang màn hình khác.
   - **`onFocus`:** Xử lý các màn hình hiển thị đè lên ứng dụng.
     - Có thể ở `scope` (chỉ trong ứng dụng đó) hoặc `system-wide` (có thể yêu cầu màn hình từ một ứng dụng khác, ví dụ: ứng dụng Navi yêu cầu hiển thị một màn hình có độ ưu tiên rất cao để đè lên).
   - **`backControl`:** Chức năng quay lại bằng nút Back. Người nói lưu ý rằng ứng dụng `Zí` có thể không có nút Back vật lý, nhưng `M7G` thì có.
   - **`Left and Right List Control to Panel Controller`:** Một tính năng đặc biệt của ứng dụng cài đặt này là giao diện hai bảng điều khiển (two-panel). Thay vì hiển thị toàn màn hình như các ứng dụng thông thường, nó chia làm hai lớp: `left layer` và `right layer`, được xử lý ở phần `common`.
   - **`ARB`:** Phục vụ cho khối `common`.

### Các Dịch vụ (Services)

1. **Chức năng chung của Service:**
   - Phục vụ việc thay đổi giá trị hoặc khởi tạo tiến trình (process) khi ứng dụng khởi động.
   - Đọc các giá trị từ `backup manager`.
2. **Các Dịch vụ Cụ thể:**
   - **`Menu Service`:** Quyết định liệu nút có được hiển thị hay không, hoặc trạng thái `tap down` của các nút.
   - **`Delete Personal Data Service`:** Liên quan đến việc xóa các cài đặt của người dùng, ví dụ: màn hình reset cài đặt hoặc xóa hồ sơ người lái (driver profile).
   - **`Display Service`:** Xử lý các cài đặt liên quan đến hiển thị, như điều chỉnh độ sáng hoặc chế độ ngày/đêm (`day mode night mode`). Ví dụ: nút `illumination` có thể bật/tắt để chuyển đổi màu sắc (trắng/hơi tối).
   - **`User Profile Service / User Management`:** Quản lý việc chuyển đổi giữa các hồ sơ người dùng (ví dụ: Profile 1, Profile 2).
   - **`Pin Code Verification`:** Xử lý các cài đặt liên quan đến mã PIN, ví dụ: thiết lập PIN.
   - **`Face Converter Service`:** Liên quan đến các cài đặt bàn phím (`keyboard`).
   - **`Audio Manager`:** Liên quan đến các cài đặt âm thanh (`sound setting`).
   - **`Lock Service`:** Cung cấp dữ liệu về ngày giờ.
   - **`Direct Service`:** Liên quan đến việc gửi/nhận C.
   - **`Custom My Service`:** Liên quan đến tùy chỉnh phương tiện (`vehicle custom my`).
   - **`Bluetooth Service`:** Liên quan đến cài đặt Bluetooth.

### Kiến trúc Ứng dụng Dựa trên Kingdom

Kiến trúc của ứng dụng này dựa trên `Kingdom` và được mô tả trong một phần khoanh đỏ, bao gồm:

1. **`View Controller` và `Mode Controller`:**
   - **`View Controller`:** Kiểm soát việc hiển thị của giao diện người máy (`HMI`).
   - **`Mode Controller`:** Làm việc để giao tiếp với các dịch vụ. Thường lưu trữ các trạng thái nội bộ và biến của nó vào một "state center". Sau đó, `View` sẽ lấy dữ liệu từ `state center` để cập nhật hiển thị.
2. **Quản lý Vòng đời Ứng dụng:**
   - Vòng đời của ứng dụng được quản lý thông qua `Application Manager` và `Content`.
   - Mỗi trạng thái mới khi đăng ký sẽ đính kèm với một `content` (ví dụ: khối `view menu setting` sẽ đính kèm vào `content`).
   - `Application Manager` chịu trách nhiệm khởi động (`start`) và dừng (`stop`) ứng dụng, gọi `content` và có thể chuyển đổi giữa các chế độ.
   - Mỗi khối (block) thường tượng trưng cho một màn hình và có thể chuyển đổi giữa các màn hình.
3. **Xử lý Thao tác Phím Cứng (Key Receive):**
   - Khi người dùng thao tác với các phím cứng, một `key list callback` từ `switch HL` sẽ được gửi đến `Kingdom`.
   - `Kingdom` sau đó sẽ gửi lại thông tin này cho ứng dụng thông qua framework.
4. **Tương tác với Dịch vụ Bên ngoài (Service Bridge / Service API):**
   - Ứng dụng liên kết với các dịch vụ bên ngoài thông qua `Service Bridge`.
   - Các `callback` từ dịch vụ cũng sẽ được gửi về ứng dụng thông qua framework.
5. **`Application Manager`:**
   - Người nói cho biết rằng ít khi làm việc trực tiếp với `Application Manager`.
   - Thay vào đó, công việc được thực hiện thông qua `Application Manager`, đây là một wrapper của `Kingdom`.
