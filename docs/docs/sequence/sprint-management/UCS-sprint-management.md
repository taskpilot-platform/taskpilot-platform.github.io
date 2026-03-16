# ĐẶC TẢ CÁC USE CASE - SPRINT MANAGEMENT (AGILE)

Tài liệu này mô tả các use case thuộc nhóm Quản lý Sprint (Sprint Management). TaskPilot hỗ trợ quản lý Agile/Scrum với các Sprint, cho phép tổ chức task theo chu kỳ phát triển.

---

## UC_SPRINT_01: View Sprint List (Xem danh sách Sprint)

### Mô tả
Thành viên dự án xem danh sách tất cả Sprint trong dự án. Mỗi Sprint hiển thị: name, status (PLANNING/ACTIVE/COMPLETED), goal, start/end date.

### Tác nhân: pm, mem
### Điều kiện tiên quyết: Đăng nhập, là thành viên dự án (JWT + membership check)
### Điều kiện hậu: Hiển thị danh sách sprint

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập Sprint page | |
| 2 | | Extract user_id từ JWT, kiểm tra membership |
| 3 | | Query sprints theo project_id |
| 4 | | Hiển thị danh sách: name, status, goal, dates |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden

---

## UC_SPRINT_02: View Sprint Details (Xem chi tiết Sprint)

### Mô tả
Xem chi tiết Sprint bao gồm: name, goal, status, heuristic_mode (ghi đè project), start/end date, và danh sách task thuộc sprint.

### Tác nhân: pm, mem
### Điều kiện tiên quyết: Đăng nhập, là thành viên dự án
### Điều kiện hậu: Hiển thị chi tiết sprint

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào sprint | |
| 2 | | JWT + membership check |
| 3 | | Query sprint detail |
| 4 | | Hiển thị: name, goal, status, heuristic_mode, dates, tasks |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden
**3a. Sprint không tồn tại:** → 404 Not found

---

## UC_SPRINT_03: Create New Sprint (Tạo Sprint mới)

### Mô tả
Thành viên tạo Sprint mới trong dự án. Sprint được tạo với status mặc định là PLANNING. Có thể đặt heuristic_mode riêng để ghi đè chế độ của project.

### Tác nhân: pm, mem
### Điều kiện tiên quyết: Đăng nhập, là thành viên dự án, project status = ACTIVE
### Điều kiện hậu: Tạo bản ghi sprints mới (status = PLANNING)

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Create Sprint" | |
| 2 | | JWT + membership check |
| 3 | | Hiển thị form: Name (*), Goal, Start/End Date, Heuristic Mode |
| 4 | Nhập thông tin và click "Create" | |
| 5 | | Validate dữ liệu |
| 6 | | Insert sprint (status = PLANNING) |
| 7 | | Redirect về sprint list |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden
**5a. Dữ liệu không hợp lệ:** → Hiển thị lỗi

### Ràng buộc
- **status mặc định**: 'PLANNING'
- **heuristic_mode**: Tùy chọn, ghi đè project setting

---

## UC_SPRINT_04: Update Sprint Information (Cập nhật Sprint)

### Mô tả
Thành viên cập nhật thông tin Sprint: name, goal, dates, heuristic_mode.

### Tác nhân: pm, mem
### Điều kiện tiên quyết: Đăng nhập, là thành viên, sprint tồn tại
### Điều kiện hậu: Cập nhật bản ghi sprints

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Edit Sprint" | |
| 2 | | JWT + membership check |
| 3 | | Hiển thị form edit |
| 4 | Chỉnh sửa và click "Save" | |
| 5 | | Validate + cập nhật |
| 6 | | Hiển thị thành công |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden

---

## UC_SPRINT_05: Start / Complete Sprint (Bắt đầu / Hoàn thành Sprint)

### Mô tả
Chuyển trạng thái Sprint: PLANNING → ACTIVE (Start) hoặc ACTIVE → COMPLETED (Complete). Chỉ cho phép chuyển trạng thái hợp lệ.

### Tác nhân: pm, mem
### Điều kiện tiên quyết: JWT + membership, sprint status valid cho transition
### Điều kiện hậu: Cập nhật status sprint

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Start" hoặc "Complete" | |
| 2 | | JWT + membership check |
| 3 | | Kiểm tra current status hợp lệ cho transition |
| 4 | | Cập nhật status |
| 5 | | Hiển thị status badge mới |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden
**3a. Transition không hợp lệ:** → Hiển thị lỗi "Invalid status transition"

---

## UC_SPRINT_06: Delete Sprint (Xóa Sprint)

### Mô tả
Xóa Sprint khỏi dự án. Các task thuộc sprint bị xóa sẽ được chuyển về backlog (sprint_id = NULL theo constraint SET NULL).

### Tác nhân: pm, mem
### Điều kiện tiên quyết: JWT + membership, sprint tồn tại
### Điều kiện hậu: Xóa sprint, các task liên quan chuyển về backlog

### Luồng sự kiện chính
| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Delete" trên sprint | |
| 2 | | JWT + membership check |
| 3 | | Hiển thị xác nhận: "Xóa sprint? Task sẽ chuyển về backlog." |
| 4 | Click "Confirm" | |
| 5 | | Chuyển task về backlog (sprint_id = NULL) |
| 6 | | Xóa sprint |
| 7 | | Hiển thị thành công |

### Luồng phụ
**2a. Không phải thành viên:** → 403 Forbidden

---

## Tổng kết

| Use Case | Tên | Related Table |
|---|---|---|
| UC_SPRINT_01 | View Sprint List | sprints |
| UC_SPRINT_02 | View Sprint Details | sprints |
| UC_SPRINT_03 | Create New Sprint | sprints |
| UC_SPRINT_04 | Update Sprint Information | sprints |
| UC_SPRINT_05 | Start / Complete Sprint | sprints |
| UC_SPRINT_06 | Delete Sprint | sprints, tasks |
