# 📋 Tổng kết Deployment: Bản đồ dịch vụ deployment và developer trên AWS

> Nguồn: `132-Deployment-Summary.txt` · [Udemy](https://ua.udemy.com/course/aws-certified-cloud-practitioner-new/learn/lecture/20216544)

Chúng ta đã đi qua một loạt dịch vụ triển khai và quản lý hạ tầng. Bài này mình sẽ **hệ thống hóa toàn bộ** để các bạn có một bức tranh thật rõ ràng — kiểu "sổ tay ôn thi" ấy.

*Đây là bài tổng kết cực kỳ quan trọng, nhất là khi đề thi hay hỏi "dịch vụ nào dùng cho việc gì".* Cùng điểm lại nhé!

---

### 🧱 Nhóm dịch vụ Deployment

* **CloudFormation** — công cụ **AWS-only**, cho phép **Infrastructure as Code** (hạ tầng dưới dạng code) và hoạt động với gần như mọi loại tài nguyên AWS. Bạn tạo **templates**, dùng chúng để deploy hạ tầng và tái sử dụng **giữa các Region và account** — giúp hạ tầng thực sự **repeatable** (tái lặp được).
* **Elastic Beanstalk** — cũng là **AWS-only**, là một **PaaS** (Platform as a Service — nền tảng như một dịch vụ), giới hạn ở một số ngôn ngữ lập trình nhất định hoặc **Docker**. Bạn deploy code nhất quán với một kiến trúc đã biết, ví dụ **load balancer + EC2 instances + RDS database**.
* **CodeDeploy** — deploy và upgrade ứng dụng lên servers, có thể trên AWS (ví dụ EC2 instances) **hoặc on-premises**. Vì vậy nó được gọi là **hybrid service**.
* **Systems Manager** — cũng là **hybrid service**, cho phép **patch, configure và run commands ở quy mô lớn** trên mọi servers.

| Dịch vụ | Vai trò chính | Điểm cần nhớ |
|---|---|---|
| CloudFormation | Infrastructure as Code | AWS-only, template dùng lại giữa Region và account |
| Elastic Beanstalk | PaaS | AWS-only, giới hạn ngôn ngữ hoặc Docker |
| CodeDeploy | Deploy và upgrade app lên servers | Hybrid — cả AWS lẫn on-premises |
| Systems Manager | Patch, configure, run commands | Hybrid — quản lý fleet ở quy mô lớn |

---

### 🧑‍💻 Nhóm dịch vụ Developer

* **CodeCommit** — lưu code trong **private Git repository**, cho bạn một **code repo được quản lý phiên bản** (dịch vụ này **có xuất hiện trong đề thi** đấy nhé).
* **CodeBuild** — build và test code trên AWS theo kiểu **serverless**.
* **CodeDeploy** — deploy code lên servers (được xếp vào cả nhóm deployment lẫn developer vì chúng đi cùng nhau).
* **CodePipeline** — **orchestration** (điều phối) pipeline trong AWS: từ code → build → test → deployment → provisioning...
* **CodeArtifact** — lưu trữ **software packages và dependencies** trên AWS.
* **CDK** — định nghĩa hạ tầng cloud bằng **ngôn ngữ lập trình**, ví dụ JavaScript, TypeScript, Java, Python... Code sau đó được **compile thành CloudFormation template**.

| Dịch vụ | Vai trò chính |
|---|---|
| CodeCommit | Lưu code trong private Git repository |
| CodeBuild | Build và test code theo kiểu serverless |
| CodeDeploy | Deploy code lên servers |
| CodePipeline | Điều phối pipeline trong AWS |
| CodeArtifact | Lưu software packages và dependencies |
| CDK | Định nghĩa hạ tầng bằng ngôn ngữ lập trình |

---

### 🎯 Tự kiểm tra nhanh

**Câu 1:** Dịch vụ nào là Infrastructure as Code của AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CloudFormation.

Giải thích: AWS-only, dùng templates để deploy hạ tầng và tái sử dụng giữa các Region và account.

Tham chiếu: Mục Nhóm dịch vụ Deployment.

</details>

**Câu 2:** Dịch vụ nào là PaaS, giới hạn ở một số ngôn ngữ hoặc Docker?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Elastic Beanstalk.

Giải thích: Bạn deploy code nhất quán với kiến trúc đã biết, ví dụ load balancer + EC2 + RDS.

Tham chiếu: Mục Nhóm dịch vụ Deployment.

</details>

**Câu 3:** Dịch vụ nào là hybrid, deploy app lên cả EC2 lẫn on-premises?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CodeDeploy.

Giải thích: Nó deploy và upgrade ứng dụng lên servers ở cả hai môi trường.

Tham chiếu: Mục Nhóm dịch vụ Deployment.

</details>

**Câu 4:** Dịch vụ nào điều phối pipeline trong AWS?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** CodePipeline.

Giải thích: Điều phối từ code → build → test → deployment → provisioning...

Tham chiếu: Mục Nhóm dịch vụ Developer.

</details>

**Câu 5:** CDK biên dịch hạ tầng của bạn thành gì?

<details>
<summary><b>Xem đáp án</b></summary>

**Đáp án:** Thành CloudFormation template.

Giải thích: CDK cho phép định nghĩa hạ tầng bằng ngôn ngữ lập trình như JavaScript, TypeScript, Java, Python...

Tham chiếu: Mục Nhóm dịch vụ Developer.

</details>

---

Vậy là các bạn đã nắm trọn bộ dịch vụ deployment và developer của AWS. *Hãy coi bảng tổng kết này là "phao cứu sinh" mỗi khi ôn thi: dịch vụ nào AWS-only, dịch vụ nào hybrid, dịch vụ nào làm gì.*

Chúng ta đã hoàn thành phần **Deployments & Managing Infrastructure at Scale**, và ở phần tiếp theo, khóa học sẽ mở ra chủ đề mới. Hẹn gặp các bạn ở đó! 🚀
