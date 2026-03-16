# ĐẶC TẢ CÁC USE CASE - PROJECT MANAGEMENT

Tài liệu này mô tả các use case thuộc nhóm Quản lý dự án (Project Management). Cho phép người dùng tạo, xem, cập nhật, tham gia, rời khỏi và đóng/lưu trữ dự án trong hệ thống TaskPilot.

---

## UC_PROJECT_01: View Joined Projects (Xem danh sách dự án đã tham gia)

### Mô tả

Người dùng xem danh sách tất cả dự án mà mình là thành viên. Hệ thống truy vấn bảng project_members kết hợp projects để lấy thông tin dự án và vai trò của user trong từng dự án.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập

### Điều kiện hậu

- Hiển thị danh sách dự án

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang Projects | |
| 2 | | Extract user_id từ JWT token |
| 3 | | Query các project mà user là member (join projects + project_members) |
| 4 | | Hiển thị danh sách: name, status, role, start/end date |

### Luồng sự kiện phụ

**3a. Chưa tham gia dự án nào:**

- 3a.1. Hiển thị: "Bạn chưa tham gia dự án nào"
- 3a.2. Hiển thị nút "Create Project" và "Join Project"

---

## UC_PROJECT_02: Create New Project (Tạo dự án mới)

### Mô tả

Project Manager tạo dự án mới. Hệ thống tạo bản ghi projects và tự động thêm người tạo vào project_members với role = MANAGER. Dự án được tạo với status mặc định là ACTIVE.

### Tác nhân chính

- pm (Project Manager)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập

### Điều kiện hậu

- Tạo bản ghi projects mới (status = ACTIVE)
- Tạo bản ghi project_members cho người tạo (role = MANAGER)

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Create Project" | |
| 2 | | Hiển thị form: <br>- Name (*bắt buộc) <br>- Description (tùy chọn) <br>- Start Date, End Date (tùy chọn) <br>- Heuristic Mode (BALANCED/URGENT/TRAINING, mặc định BALANCED) |
| 3 | Nhập thông tin và click "Create" | |
| 4 | | Validate: name không rỗng |
| 5 | | Insert project mới (status = ACTIVE) |
| 6 | | Insert creator vào project_members (role = MANAGER, performance_score = 0.5) |
| 7 | | Hiển thị thông báo thành công, redirect về project list |

### Luồng sự kiện phụ

**4a. Dữ liệu không hợp lệ:**

- 4a.1. Hiển thị lỗi validation
- 4a.2. Quay lại bước 2

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Status mặc định**: 'ACTIVE' (project_status enum)
- **Heuristic mode**: enum('BALANCED', 'URGENT', 'TRAINING'), mặc định 'BALANCED'
- **Auto-add creator**: Tự động thêm người tạo làm MANAGER
- **performance_score**: Mặc định 0.5

---

## UC_PROJECT_03: View Project Details / Summary (Xem chi tiết dự án)

### Mô tả

Thành viên dự án xem thông tin chi tiết/tổng quan của dự án bao gồm tên, mô tả, trạng thái, ngày bắt đầu/kết thúc, chế độ heuristic, và số lượng thành viên. Chỉ thành viên của dự án mới có quyền xem.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng là thành viên của dự án

### Điều kiện hậu

- Hiển thị chi tiết dự án

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào tên dự án | |
| 2 | | Kiểm tra user là member của project |
| 3 | | Query thông tin project |
| 4 | | Hiển thị: name, description, status, heuristic_mode, dates, member count |

### Luồng sự kiện phụ

**2a. Không phải thành viên:**

- 2a.1. Hiển thị: "Bạn không phải thành viên của dự án này"

---

## UC_PROJECT_04: Update Project Information (Cập nhật thông tin dự án)

### Mô tả

Project Manager cập nhật thông tin dự án: tên, mô tả, ngày, heuristic mode. Chỉ user có role = MANAGER trong project mới được phép cập nhật.

### Tác nhân chính

- pm (Project Manager)

### Điều kiện tiên quyết

- Người dùng là MANAGER trong project
- Project status khác ARCHIVED

### Điều kiện hậu

- Cập nhật bản ghi projects

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Edit Project" | |
| 2 | | Kiểm tra user có role MANAGER |
| 3 | | Hiển thị form edit: name, description, dates, heuristic_mode |
| 4 | Chỉnh sửa và click "Save" | |
| 5 | | Validate dữ liệu |
| 6 | | Cập nhật bản ghi |
| 7 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**2a. Không phải MANAGER:**

- 2a.1. Hiển thị: "Chỉ Project Manager mới có thể chỉnh sửa"

---

## UC_PROJECT_05: Join Project via Link/Code (Tham gia dự án)

### Mô tả

Người dùng tham gia dự án thông qua invite link hoặc project code. Hệ thống validate code, kiểm tra user chưa là thành viên, và thêm vào project_members với role = MEMBER.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- Có invite link/code hợp lệ
- Chưa là thành viên dự án

### Điều kiện hậu

- Thêm bản ghi project_members (role = MEMBER)

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập Join Project page | |
| 2 | | Hiển thị form nhập invite link/code |
| 3 | Nhập code và click "Join" | |
| 4 | | Validate project code |
| 5 | | Kiểm tra user chưa là member |
| 6 | | Insert vào project_members (role = MEMBER, performance_score = 0.5) |
| 7 | | Hiển thị thông báo thành công, redirect đến project page |

### Luồng sự kiện phụ

**4a. Code không hợp lệ:**

- 4a.1. Hiển thị: "Mã dự án không hợp lệ"

**5a. Đã là thành viên:**

- 5a.1. Hiển thị: "Bạn đã là thành viên của dự án này"

---

## UC_PROJECT_06: Leave Project (Rời dự án)

### Mô tả

Thành viên dự án rời khỏi dự án. Nếu user là MANAGER duy nhất, hệ thống yêu cầu chuyển quyền MANAGER cho người khác trước khi rời.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đang là thành viên dự án
- Nếu là MANAGER: phải có ít nhất 1 MANAGER khác

### Điều kiện hậu

- Xóa bản ghi project_members

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Leave Project" | |
| 2 | | Hiển thị xác nhận: "Bạn có chắc muốn rời khỏi dự án?" |
| 3 | Click "Confirm" | |
| 4 | | Kiểm tra nếu là MANAGER duy nhất |
| 5 | | Xóa bản ghi project_members |
| 6 | | Redirect về project list |

### Luồng sự kiện phụ

**4a. Là MANAGER duy nhất:**

- 4a.1. Hiển thị: "Bạn là Manager duy nhất. Vui lòng chuyển quyền trước khi rời"
- 4a.2. Kết thúc

---

## UC_PROJECT_07: Close / Archive Project (Đóng / Lưu trữ dự án)

### Mô tả

Project Manager đóng (COMPLETED) hoặc lưu trữ (ARCHIVED) dự án. Sau khi đóng/lưu trữ, thành viên không thể tạo mới task hoặc sprint nhưng vẫn có thể xem dữ liệu.

### Tác nhân chính

- pm (Project Manager)

### Điều kiện tiên quyết

- Người dùng có role = MANAGER
- Project status hiện tại là ACTIVE hoặc PLANNING

### Điều kiện hậu

- Cập nhật status thành COMPLETED hoặc ARCHIVED

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Close" hoặc "Archive" | |
| 2 | | Kiểm tra role MANAGER |
| 3 | | Hiển thị xác nhận: "Đóng/Lưu trữ dự án? Thành viên sẽ không thể tạo task/sprint mới." |
| 4 | Click "Confirm" | |
| 5 | | Cập nhật status (COMPLETED hoặc ARCHIVED) |
| 6 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**2a. Không phải MANAGER:**

- 2a.1. Hiển thị: "Chỉ Manager mới có thể đóng/lưu trữ dự án"

---

## Tổng kết

| Use Case | Tên | Related Table |
|---|---|---|
| UC_PROJECT_01 | View Joined Projects | projects, project_members |
| UC_PROJECT_02 | Create New Project | projects, project_members |
| UC_PROJECT_03 | View Project Details / Summary | projects |
| UC_PROJECT_04 | Update Project Information | projects |
| UC_PROJECT_05 | Join Project (via Link/Code) | project_members |
| UC_PROJECT_06 | Leave Project | project_members |
| UC_PROJECT_07 | Close / Archive Project | projects |
