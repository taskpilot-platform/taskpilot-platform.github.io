# ĐẶC TẢ CÁC USE CASE - TASK MANAGEMENT

Tài liệu này mô tả các use case thuộc nhóm Quản lý Task (Task Management). Hệ thống TaskPilot hỗ trợ quản lý task theo mô hình Kanban với 4 trạng thái: TODO, IN_PROGRESS, REVIEW, DONE. Task hỗ trợ sub-task (parent_id), tagging, difficulty_level, required_skills cho AI matching.

---

## UC_TASK_01: View Kanban Board
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Xem bảng Kanban hiển thị tasks theo 4 cột trạng thái. Tasks được lọc theo sprint hiện tại.

## UC_TASK_02: View Backlog
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Xem danh sách tasks chưa được assign vào sprint (sprint_id = NULL).

## UC_TASK_03: View Workload
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Xem phân bổ workload của các thành viên, hiển thị current_workload và số tasks đang assign.

## UC_TASK_04: View Task Details
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Xem chi tiết task: title, description, status, priority, assignee, reporter, tags, difficulty_level, required_skills, dates, sub-tasks.

## UC_TASK_05: Create New Task / Sub-task
### Tác nhân: pm, mem | Điều kiện: JWT + membership, project ACTIVE
Tạo task mới với status mặc định TODO. Nếu có parent_id → tạo sub-task. Hậu điều kiện: Insert bản ghi tasks.

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Create Task" | |
| 2 | | JWT + membership check |
| 3 | | Hiển thị form: Title(*), Description, Priority, Sprint, Tags, Difficulty, Required Skills, Assignee, Reporter, Dates |
| 4 | Nhập thông tin, click "Create" | |
| 5 | | Validate, insert task (status=TODO) |

## UC_TASK_06: Update Task Information
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Cập nhật title, description, priority, tags, difficulty_level, required_skills, dates. Set updated_at = NOW().

## UC_TASK_07: Update Task Status (Drag & Drop Kanban)
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Kéo thả task giữa các cột Kanban. Cập nhật status và position.

## UC_TASK_08: Assign Assignee & Reporter
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Phân công assignee (người thực hiện) và reporter (người báo cáo). Cập nhật current_workload của assignee.

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Assign" | |
| 2 | | JWT + membership check |
| 3 | | Lấy danh sách project members |
| 4 | Chọn assignee/reporter, click "Save" | |
| 5 | | Cập nhật assignee_id, reporter_id |
| 6 | | Recalculate current_workload |

## UC_TASK_09: Delete Task
### Tác nhân: pm, mem | Điều kiện: JWT + membership
Xóa task. Sub-tasks bị CASCADE xóa theo (parent_id FK). Yêu cầu xác nhận.

---

## Tổng kết

| Use Case | Tên | Related Table |
|---|---|---|
| UC_TASK_01 | View Kanban Board | tasks |
| UC_TASK_02 | View Backlog | tasks |
| UC_TASK_03 | View Workload | tasks, users |
| UC_TASK_04 | View Task Details | tasks |
| UC_TASK_05 | Create New Task / Sub-task | tasks |
| UC_TASK_06 | Update Task Information | tasks |
| UC_TASK_07 | Update Task Status (D&D) | tasks |
| UC_TASK_08 | Assign Assignee & Reporter | tasks, users, user_skills |
| UC_TASK_09 | Delete Task | tasks |
