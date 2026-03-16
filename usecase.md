# Danh sách Use-case Hệ thống TaskPilot

Bảng phân rã các Use-case theo từng Phân hệ (Subsystem) / Nhóm chức năng, phục vụ cho việc thiết kế và phát triển tính năng.

| STT | Phân hệ (Subsystem) | Tên Use-case chi tiết (Action) | Actor | Related Table |
| :--- | :--- | :--- | :--- | :--- |
| **I** | **Xác thực (Auth)** | | | |
| 1 | | Đăng nhập | ad, pm, mem | users |
| 2 | | Đăng ký tài khoản | ad, pm, mem | users |
| 3 | | Quên mật khẩu | ad, pm, mem | users |
| 4 | | Đặt lại mật khẩu | ad, pm, mem | users |
| **II** | **Quản lý Hồ sơ (Profile)** | | | |
| 5 | | Cài đặt thông tin cá nhân (tên, mk) | ad, pm, mem | users |
| 6 | | Xem hồ sơ người dùng | ad, pm, mem | users |
| 7 | | Xóa tài khoản cá nhân | ad, pm, mem | users |
| **III**| **Kỹ năng cá nhân (User Skills)**| | | |
| 8 | | Truy vấn danh sách kỹ năng cá nhân | pm, mem | user_skills |
| 9 | | Xem chi tiết kỹ năng cá nhân | pm, mem | user_skills |
| 10 | | Thêm kỹ năng cá nhân | pm, mem | user_skills |
| 11 | | Cập nhật kỹ năng cá nhân | pm, mem | user_skills |
| 12 | | Xóa kỹ năng cá nhân | pm, mem | user_skills |
| **IV** | **Quản trị Hệ thống (Admin)** | | | |
| 13 | | Cài đặt tham số hệ thống (AI weights) | ad | system_settings |
| 14 | | Truy vấn danh mục kỹ năng hệ thống | ad | skills |
| 15 | | Thêm / Sửa / Xóa kỹ năng hệ thống | ad | skills |
| 16 | | Truy vấn danh sách người dùng toàn cục| ad | users |
| 17 | | Thêm / Sửa / Xóa người dùng hệ thống | ad | users |
| **V** | **Quản lý Dự án (Projects)** | | | |
| 18 | | Truy vấn danh sách dự án đã tham gia | pm, mem | projects, project_members|
| 19 | | Tạo một dự án mới | pm | projects |
| 20 | | Xem thông tin chi tiết / Summary dự án| pm, mem | projects |
| 21 | | Cập nhật thông tin dự án | pm | projects |
| 22 | | Tham gia dự án (qua link/mã) | pm, mem | project_members |
| 23 | | Rời dự án | pm, mem | project_members |
| 24 | | Đóng / Lưu trữ dự án (Archive) | pm | projects |
| **VI** | **Thành viên Dự án (Members)** | | | |
| 25 | | Truy vấn danh sách thành viên dự án | pm, mem | project_members |
| 26 | | Xem thông tin chi tiết thành viên | pm, mem | project_members |
| 27 | | Thêm thành viên vào dự án | pm, mem | project_members |
| 28 | | Cập nhật role thành viên dự án | pm | project_members |
| 29 | | Xóa thành viên khỏi dự án | pm, mem | project_members |
| **VII**| **Quản lý Sprint (Agile)** | | | |
| 30 | | Truy vấn danh sách Sprint | pm, mem | sprints |
| 31 | | Xem thông tin chi tiết Sprint | pm, mem | sprints |
| 32 | | Tạo mới một Sprint | pm, mem | sprints |
| 33 | | Cập nhật thông tin Sprint | pm, mem | sprints |
| 34 | | Khởi động (Start) / Kết thúc (Complete)| pm, mem | sprints |
| 35 | | Xóa Sprint (chuyển task sang kế tiếp) | pm, mem | sprints |
| **VIII**|**Quản lý Công việc (Tasks)** | | | |
| 36 | | Xem Kanban Board | pm, mem | tasks |
| 37 | | Xem Backlog | pm, mem | tasks |
| 38 | | Xem tải công việc (Assigned tasks) | pm, mem | tasks, users |
| 39 | | Xem chi tiết thông tin Task | pm, mem | tasks |
| 40 | | Tạo Task / Sub-task mới | pm, mem | tasks |
| 41 | | Cập nhật thông tin Task | pm, mem | tasks |
| 42 | | Cập nhật trạng thái (Kéo thả Kanban) | pm, mem | tasks |
| 43 | | Gán người làm (Assignee) & Reporter | pm, mem | tasks, users, user_skills |
| 44 | | Xóa Task | pm, mem | tasks |
| **IX** | **Tương tác & Giao tiếp (Chat)**| | | |
| 45 | | Xem bình luận | pm, mem | comments |
| 46 | | Viết bình luận | pm, mem | comments |
| 47 | | Sửa bình luận | pm, mem | comments |
| 48 | | Xóa bình luận | pm, mem | comments |
| **X** | **Quản lý Thông báo** | | | |
| 49 | | Tiếp nhận thông báo | ad, pm, mem | notifications |
| 50 | | Đánh dấu đã đọc | ad, pm, mem | notifications |
| **XI** | **Trợ lý AI (AI Assistant)** | | | |
| 51 | | Tạo phiên Chat mới với AI | pm, mem | chat_sessions |
| 52 | | Nhắn tin Hỏi đáp với AI (Gửi/Nhận CoT)| pm, mem | chat_messages |
| 53 | | Xem lại lịch sử Chat với AI | pm, mem | chat_messages |
| 54 | | Xem Log hoạt động của AI (Audit) | ad, pm, mem | ai_logs |
| 55 | | Yêu cầu AI phân công tự động | pm | tasks, system_settings |

> **Ghi chú Actor:**
> * `ad`: Admin (Quản trị trị hệ thống)
> * `pm`: Project Manager (Quản lý dự án)
> * `mem`: Member (Thành viên thực thi)