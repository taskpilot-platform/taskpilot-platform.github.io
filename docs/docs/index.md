<!-- # Docs -->

# TaskPilot - Hệ thống Quản lý Dự án Thông minh với AI Agent

## 1. Giới thiệu

**TaskPilot** là hệ thống quản lý dự án (Project Management) tích hợp Trợ lý ảo AI (AI Agent) được xây dựng trên nền tảng Java Spring Boot theo kiến trúc Modular Monolith. Hệ thống hỗ trợ quy trình phát triển Agile/Scrum và nâng cao hiệu suất quản lý thông qua khả năng tự động hóa thông minh.

## 2. Mục tiêu

Nghiên cứu và triển khai AI Agent đóng vai trò trợ lý ảo với các khả năng:

- **Hiểu ngữ nghĩa (NLU)**: Phân tích câu lệnh đa dạng của người dùng để trích xuất ý định (Intent)
- **Thực thi hành động (Function Calling)**: Tự động gọi các hàm nghiệp vụ để tra cứu hoặc cập nhật dữ liệu
- **Gợi ý thông minh (Recommendation)**: Đề xuất nhân sự phù hợp cho công việc dựa trên dữ liệu thực tế

## 3. Phạm vi đề tài

### Quản lý dự án và công việc linh hoạt

Hệ thống cung cấp không gian làm việc số hóa toàn diện, nơi Project Manager có thể khởi tạo dự án, thiết lập mốc thời gian và mời thành viên tham gia. Mỗi công việc (Task) được gắn các thuộc tính chi tiết: assignee, reporter, deadline, priority, tags, difficulty level và required skills.

### Trực quan hóa tiến độ với Kanban và Dashboard

Giao diện Kanban Board tương tác cho phép kéo thả task giữa 4 cột trạng thái (TODO → IN_PROGRESS → REVIEW → DONE). Dashboard tổng hợp biểu đồ thống kê về số lượng tác vụ và tiến độ hoàn thành.

### Tương tác thông minh qua AI Agent

Tính năng trọng tâm cho phép người dùng ra lệnh bằng ngôn ngữ tự nhiên qua khung chat. AI phân tích ý định → tự động thực thi hành động (tạo task, tìm kiếm, cập nhật status). AI sử dụng thuật toán thông minh phân tích kỹ năng và workload để đề xuất nhân sự phù hợp.

### Quản lý hồ sơ năng lực và Cấu hình hệ thống

Bảo mật qua JWT authentication. Mỗi user quản lý profile và danh sách skills — nguồn dữ liệu đầu vào cho AI matching. Admin có quyền tinh chỉnh trọng số thuật toán gợi ý.

## 4. Đối tượng sử dụng

| Actor                    | Vai trò                                                                    | Use Cases                                    |
| ------------------------ | -------------------------------------------------------------------------- | -------------------------------------------- |
| **Project Manager** (pm) | Điều phối nguồn lực, giao việc, giám sát tổng quan, sử dụng AI auto-assign | [Use Case Diagram](./use-case/staff.html)    |
| **Member** (mem)         | Theo dõi task được giao, cập nhật tiến độ, sử dụng AI chat                 | [Use Case Diagram](./use-case/customer.html) |
| **Administrator** (ad)   | Quản trị hệ thống, tài khoản, cấu hình AI weights                          | [Use Case Diagram](./use-case/admin.html)    |

## 5. Tổng quan Use Cases

Hệ thống gồm **59 use cases** thuộc **11 subsystems**:

| #    | Subsystem          | Use Cases                                          | Actor       |
| ---- | ------------------ | -------------------------------------------------- | ----------- |
| I    | Authentication     | Login, Register, Forgot/Reset Password             | ad, pm, mem |
| II   | User Profile       | View/Update Profile, Delete Account                | ad, pm, mem |
| III  | User Skills        | View/Add/Update/Delete Personal Skills             | pm, mem     |
| IV   | System Admin       | System Settings, Skill Directory, User Management  | ad          |
| V    | Project Management | Create/View/Update/Join/Leave/Archive Projects     | pm, mem     |
| VI   | Project Members    | View/Add/Update/Remove Members                     | pm, mem     |
| VII  | Sprint Management  | View/Create/Update/Start/Delete Sprints            | pm, mem     |
| VIII | Task Management    | Kanban, Backlog, Workload, CRUD Tasks, Assign      | pm, mem     |
| IX   | Interaction        | View/Write/Edit/Delete Comments                    | pm, mem     |
| X    | Notification       | Receive/Mark-as-Read Notifications                 | ad, pm, mem |
| XI   | AI Assistant       | Chat Sessions, Chat with AI, Logs, Auto-Assignment | pm, mem     |

📋 [Danh sách chi tiết Use Cases](/docs/usecase-list)

## 6. Use Case Diagram tổng quát

→ [System Overview Diagram](./use-case/system.html)

## 7. Kiến trúc kỹ thuật

- **Backend**: Java Spring Boot (Modular Monolith)
- **Database**: PostgreSQL (13 tables)
- **Authentication**: JWT Token
- **AI Engine**: NLU + Function Calling + Heuristic Recommendation
- **Frontend**: React (Kanban Board, Dashboard, Chat UI)

Chi tiết:

- [Database Schema](/docs/database/)
- [Function List](/docs/function-list/)
- [SRS](/docs/srs/)

## Notes

- Sequence diagrams sử dụng PlantUML
- Mỗi diagram có `diagram id` duy nhất
- Use cases được nhóm theo subsystem
- Chi tiết sequence diagrams tại [Sequence](/docs/sequence/auth/login)
