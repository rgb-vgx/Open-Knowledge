---
title: 'Multi-Agent Workflow Cơ Bản: Mở Rộng Quy Mô Bằng Cách Chạy Song Song Nhiều
  Phiên Bản Claude Code'
date: '2026-05-12 15:50:07'
date_gmt: '2026-05-12 08:50:07'
modified: '2026-05-12 15:50:07'
status: publish
slug: multi-agent-workflow-co-ban-mo-rong-quy-mo-bang-cach-chay-song-song-nhieu-phien-ban-claude-code
wordpress_id: 770
author: maithuyetedu
original_url: https://com994947723.wordpress.com/2026/05/12/multi-agent-workflow-co-ban-mo-rong-quy-mo-bang-cach-chay-song-song-nhieu-phien-ban-claude-code/
categories:
- Claude Code
tags: []
---

## Bài học này nói về gì?

Bài học này giới thiệu khái niệm "Hello World" của hệ thống Multi-Agent (Đa đặc vụ): Kỹ thuật khởi chạy song song nhiều terminal chứa các instance (phiên bản) Claude Code độc lập trên cùng một repository và cùng một nhánh (branch) Git. Thay vì chờ một Agent xử lý tuần tự từng file từ Frontend đến Backend, chúng ta phân quyền để các Agent làm việc đồng thời, biến Developer từ "Người viết code" thành "Người điều phối" (Orchestrator).

## Vấn đề thực tế (Pain Point)

1. **Nút thắt cổ chai về Inference (Suy luận LLM):** Việc sinh code của AI phụ thuộc vào tốc độ nhả token (Token/s) của các nhà cung cấp API (Anthropic). Nếu bạn yêu cầu AI build một trang web có 10 component, nó sẽ làm tuần tự (chờ xong component 1 mới làm component 2). Quá trình này rất mất thời gian.
2. **Context Overflow (Tràn bộ nhớ ngữ cảnh):** Khi giao một task quá lớn (Fullstack Feature) cho một Agent duy nhất, nó phải nạp cả code Frontend và Backend vào Context Window. Nó sẽ dễ bị "ảo giác" (hallucinate) hoặc quên mất yêu cầu ban đầu.*Giải pháp:* Chia để trị (Divide and Conquer). Tách task lớn thành các task nhỏ độc lập và gán cho các tiến trình (process) Claude Code khác nhau chạy song song.

## Khái niệm cốt lõi

- **Process-level Parallelism (Song song hóa cấp độ tiến trình):** Khởi chạy nhiều lệnh `claude` ở các tab Terminal khác nhau. Mỗi tab là một tiến trình độc lập, sở hữu một Context Window (Session Memory) riêng biệt, nhưng cùng trỏ về một Shared State (Trạng thái chia sẻ) chính là Ổ cứng (File System/Git Repository) của bạn.
- **Task Decoupling (Tách rời rạc tác vụ):** Nguyên lý sống còn của hệ thống Multi-Agent. Các tác vụ được giao cho các Agent không được phép có Dependency (phụ thuộc) lẫn nhau về mặt thời gian hay dữ liệu.
- **Race Condition (Xung đột ghi):** Hiện tượng xảy ra khi hai Agent cùng cố gắng mở và chỉnh sửa chung một file mã nguồn tại cùng một thời điểm, dẫn đến việc dữ liệu của Agent này ghi đè lên dữ liệu của Agent kia.

## Claude Code hoạt động như thế nào? (Abstractions & Workflow)

*(Bổ sung từ tài liệu chính thức)*:

Claude Code CLI không có cơ chế "giao tiếp ngang hàng" (Peer-to-Peer communication) mặc định giữa các terminal.

- Bản thân Claude Code đã abstract đi quá trình Tool Calling (đọc, ghi file).
- Khi bạn chạy 2 tab Terminal, bạn đang có 2 "bộ não" (LLM Sessions) đang gọi API lên Anthropic hoàn toàn độc lập.
- Sự "hợp tác" duy nhất của chúng nằm ở lớp Hệ điều hành (OS File System). Khi Agent A lưu file `Header.tsx`, Agent B nếu có lệnh đọc thư mục sẽ thấy được sự tồn tại của file `Header.tsx` vừa được tạo ra.

## Demo / Flow trong bài học

1. **Môi trường:** Dự án "Hooks Hub" (Next.js).
2. **Phân chia Task:**
   - **Tab Terminal 1 (Agent A):** Yêu cầu refactor file `HookCard.tsx` cho đẹp và hiện đại hơn.
   - **Tab Terminal 2 (Agent B):** Cung cấp một ảnh chụp màn hình (Screenshot) và yêu cầu refactor phần Hero Section nằm trong file `page.tsx`.
3. **Thực thi song song:** Instructor nhấn Enter cho cả hai Agent cùng lúc. Cả hai cùng phân tích, lên kế hoạch và sửa code.
4. **Kết quả:** Quá trình hoàn thành nhanh gấp đôi. Vì `HookCard` và `Hero` nằm ở hai file vật lý khác nhau, hai Agent lưu file thành công mà không gây ra bất kỳ lỗi xung đột (Conflict) nào. Instructor tiến hành commit chung toàn bộ thay đổi.

## Phân tích kỹ thuật

### 1. Kiến trúc Shared-State & Race Conditions

Đây là bài toán **Shared-Memory Concurrency** kinh điển trong Khoa học máy tính. Ổ cứng (Disk) chính là Shared Memory.

Nếu cả hai Agent cùng được giao nhiệm vụ: *"Hãy thêm tính năng vào file `page.tsx`"*:

- Agent A đọc `page.tsx` (Version 1).
- Agent B đọc `page.tsx` (Version 1).
- Agent A thêm function A, ghi đè lên disk -> `page.tsx` (Version 2).
- Agent B thêm function B (nhưng trong RAM của nó vẫn nghĩ là đang sửa từ Version 1), ghi đè lên disk -> `page.tsx` (Version 3).
- **Hậu quả:** Function A biến mất hoàn toàn. Kỹ năng cốt lõi của kỹ sư lúc này là phân chia Task sao cho chúng trạm vào các Vùng nhớ (Files) hoàn toàn cách ly (Isolated).

### 2. Sự lệch pha API (Interface Discrepancy)

Như instructor lưu ý, tuyệt đối không dùng luồng này cho các task phụ thuộc tuần tự (như làm API Backend và UI Frontend cùng lúc).

Tại sao? Vì Agent UI sẽ viết code fetch data từ một Endpoint chưa hề tồn tại. Nó sẽ tự "bịa" (mock) ra cấu trúc JSON trả về theo suy nghĩ của nó. Trong khi Agent Backend lại xây dựng API trả về một cấu trúc JSON hoàn toàn khác. Khi gộp lại, hệ thống sẽ sập vì gãy API Contract.

### 3. Prompt Engineering cho Hệ đa tác vụ

Khi giao task cho các Agent song song, Prompt phải cực kỳ cụ thể về ranh giới (Boundaries):

*"Nhiệm vụ của bạn LÀ sửa Component A. KHÔNG ĐƯỢC sửa đổi bất kỳ cấu trúc thư mục hay file nào khác ngoài `ComponentA.tsx`."*

## Ví dụ thực tế (Workflow Engineering)

Giả sử bạn cần chuyển đổi (Migration) một dự án từ JavaScript sang TypeScript. Có hàng trăm file cần gắn Type.

- Bạn mở 4 terminal.
- Agent 1: `Chuyển đổi thư mục /components/ui sang TS. Báo cáo khi xong.`
- Agent 2: `Chuyển đổi thư mục /utils sang TS. Không chạm vào /components.`
- Agent 3: `Chuyển đổi thư mục /hooks sang TS.`
- Agent 4: `Chuyển đổi thư mục /services sang TS.`Trong vòng 5 phút, thay vì 20 phút chạy tuần tự, toàn bộ dự án được migrate. Bạn chỉ cần ngồi xem log và review git diff.

## Ưu điểm / Hạn chế

| **Tiêu chí** | **Ưu điểm** | **Hạn chế (Trade-offs)** |
| --- | --- | --- |
| **Hiệu suất** | Tăng tốc độ phát triển (Development Speed) theo cấp số nhân (dựa trên số task độc lập). Giảm thời gian chờ đợi LLM inference. | **Rate Limits (Giới hạn API):** Chạy quá nhiều Agent cùng lúc sẽ dễ dàng chạm ngưỡng giới hạn Request/Phút của Anthropic API. |
| **Quản lý Context** | Mỗi Agent chỉ nạp code của task nó phụ trách. Ngữ cảnh sạch sẽ, tiết kiệm token, AI suy luận cực kỳ chính xác. | **Git Conflicts:** Nếu chia task không khéo, các Agent có thể cùng sửa chung file `package.json` (do cài thư viện) gây lỗi. |
| **Bảo mật / Rủi ro** | Giới hạn "Vùng nổ" (Blast radius). Agent làm UI sẽ không vô tình phá file Config Database. | Thiếu cơ chế giao tiếp nội bộ (Inter-agent communication). Chúng không biết "đồng nghiệp" của mình đang làm gì. |

## So sánh với công cụ khác

- **LangGraph / CrewAI:** Đây là các framework cấp mã nguồn. Chúng tạo ra một hệ thống Agent có khả năng "trò chuyện" với nhau, tự truyền kết quả cho nhau (Agent A làm xong gửi data cho Agent B). Nó mạnh mẽ nhưng phức tạp để setup.
- **Claude Code CLI:** Tiếp cận theo hướng "Thủ công nhưng thực chiến". Developer đóng vai trò là "Tổng đài viên" phân luồng, gán task thủ công cho từng CLI. Đơn giản, dễ hiệu chỉnh on-the-fly, không cần viết code orchestration.

## Những điều quan trọng cần nhớ

- **Quy tắc vàng:** Chỉ chạy song song các Agent đối với các **Tác vụ độc lập hoàn toàn (Independent Tasks)**.
- Tránh xa các tác vụ tuần tự (Sequential Tasks) hoặc yêu cầu Full-stack trong cùng một phiên chạy song song.
- **Code Modularity (Tính module hóa):** Đây không chỉ là best practice cho con người. Hệ thống chia tách component càng nhỏ gọn (1 file/1 chức năng), bạn càng dễ dàng tung nhiều Agent vào làm việc cùng lúc mà không sợ đụng độ.
- Công việc của bạn chuyển từ "Viết Code" (Coder) sang "Quản lý Dự án & Cấp phát Tài nguyên" (Technical Manager / Orchestrator).

## Góc nhìn dành cho BE Developer

Bài học này chính là việc áp dụng nguyên lý **Actor Model** và **Microservices** vào môi trường Development.

- Giống như việc bạn không thể chia một transaction chuyển tiền ngân hàng ra cho 2 luồng (Threads) chạy song song (vì dính lock row DB), bạn không thể giao 1 chức năng có logic kết dính cao cho 2 Agent.
- Tuy nhiên, nếu hệ thống được thiết kế theo chuẩn **SOLID** (đặc biệt là Single Responsibility Principle), các lớp nghiệp vụ (Layer) bị cô lập hoàn toàn. Lúc đó, AI Workflow sẽ tỏa sáng. Bạn có thể cho một Agent viết các bài Test cho Repository, một Agent khác viết Test cho UseCase cùng một lúc.
- **Tóm lại:** Chất lượng kiến trúc hệ thống (System Architecture) của bạn càng tốt, khả năng tự động hóa và mở rộng bằng AI Agents của bạn càng cao. Mã nguồn rác (Spaghetti code) sẽ giết chết Multi-agent workflow vì chúng sẽ dẫm chân lên nhau.

## Từ khóa / Thuật ngữ (Glossary)

- **Multi-Agent System (Hệ đa đặc vụ):** Một hệ thống có nhiều AI mô hình cùng hoạt động để hoàn thành một dự án.
- **Task Decoupling (Tách rời rạc tác vụ):** Kỹ thuật chia nhỏ một công việc lớn thành các phần không phụ thuộc vào nhau về mặt logic hay dữ liệu.
- **Race Condition (Xung đột ghi đồng thời):** Lỗi xảy ra khi nhiều tiến trình cùng cố gắng thao tác trên một vùng nhớ/file tại cùng một thời điểm mà không có cơ chế khóa (locking).
- **Interface Discrepancy (Sự sai lệch giao diện):** Xảy ra khi hai hệ thống/components cố gắng kết nối với nhau nhưng định dạng dữ liệu (API Contract) bị lệch pha do làm việc thiếu sự thống nhất.
