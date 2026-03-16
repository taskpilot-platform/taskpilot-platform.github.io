# ĐẶC TẢ CÁC USE CASE - SYSTEM ADMINISTRATION (ADMIN)

Tài liệu này mô tả các use case thuộc nhóm Quản trị hệ thống (System Administration). Admin có quyền quản lý các thông số hệ thống (trọng số AI), quản lý danh mục kỹ năng (skills) dùng chung, và quản lý người dùng toàn cục.

---

## UC_ADMIN_01: Configure System Parameters (Cấu hình thông số hệ thống)

### Mô tả

Admin cấu hình các thông số hệ thống được lưu trong bảng system_settings. Các thông số bao gồm trọng số thuật toán AI dùng cho phân công task (heuristic weights), cùng các config khác. Mỗi setting được lưu dạng key-value (key_name, value_json).

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Admin đã đăng nhập với role = 'ADMIN'

### Điều kiện hậu

- Cập nhật/thêm bản ghi trong bảng system_settings

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Truy cập trang System Settings | |
| 2 | | Query tất cả system settings hiện tại |
| 3 | | Hiển thị form cấu hình: key_name, value_json, description |
| 4 | Chỉnh sửa giá trị (ví dụ: heuristic.weights) | |
| 5 | Click "Save" | |
| 6 | | Validate giá trị (JSON format hợp lệ) |
| 7 | | Upsert bản ghi vào system_settings |
| 8 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**6a. Giá trị JSON không hợp lệ:**

- 6a.1. Hiển thị: "Giá trị phải là JSON hợp lệ"
- 6a.2. Quay lại bước 3

### Ràng buộc nghiệp vụ/Kỹ thuật

- **key_name**: VARCHAR, Primary Key
- **value_json**: JSONB, chứa giá trị cấu hình
- **description**: TEXT, mô tả mục đích setting
- **Authorization**: Chỉ ADMIN mới có quyền thao tác

---

## UC_ADMIN_02: View System Skill Directory (Xem danh mục kỹ năng hệ thống)

### Mô tả

Admin xem danh sách tất cả kỹ năng (skills) được định nghĩa trong hệ thống. Đây là danh mục kỹ năng dùng chung mà user có thể chọn khi thêm vào profile cá nhân.

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Admin đã đăng nhập

### Điều kiện hậu

- Hiển thị danh sách kỹ năng hệ thống

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Truy cập trang Skill Directory | |
| 2 | | Query tất cả skills |
| 3 | | Hiển thị danh sách: id, name |

### Luồng sự kiện phụ

**2a. Chưa có skill nào:**

- 2a.1. Hiển thị thông báo "Chưa có kỹ năng nào" và nút "Add Skill"

---

## UC_ADMIN_03: Add System Skill (Thêm kỹ năng hệ thống)

### Mô tả

Admin thêm một kỹ năng mới vào danh mục hệ thống. Tên kỹ năng phải duy nhất (UNIQUE constraint trên cột name). Ví dụ: "Java", "React", "Figma".

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Admin đã đăng nhập
- Tên kỹ năng chưa tồn tại

### Điều kiện hậu

- Thêm bản ghi mới vào bảng skills

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Add Skill" | |
| 2 | | Hiển thị form: Skill Name (*bắt buộc) |
| 3 | Nhập tên skill và click "Save" | |
| 4 | | Validate: tên không rỗng |
| 5 | | Kiểm tra tên skill chưa tồn tại |
| 6 | | Insert skill mới vào bảng skills |
| 7 | | Hiển thị thông báo thành công, redirect về danh sách |

### Luồng sự kiện phụ

**5a. Tên skill đã tồn tại:**

- 5a.1. Hiển thị: "Kỹ năng này đã tồn tại"
- 5a.2. Quay lại bước 2

### Ràng buộc nghiệp vụ/Kỹ thuật

- **name**: VARCHAR, UNIQUE, NOT NULL

---

## UC_ADMIN_04: Edit System Skill (Sửa kỹ năng hệ thống)

### Mô tả

Admin chỉnh sửa tên của một kỹ năng hệ thống. Tên mới phải duy nhất. Thay đổi tên skill sẽ tự động áp dụng cho tất cả user đang có skill đó (do user_skills tham chiếu bằng skill_id).

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Skill tồn tại trong hệ thống

### Điều kiện hậu

- Cập nhật tên skill trong bảng skills

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Edit" trên skill | |
| 2 | | Hiển thị form edit với tên hiện tại |
| 3 | Thay đổi tên skill và click "Save" | |
| 4 | | Validate: tên không rỗng |
| 5 | | Kiểm tra tên mới chưa tồn tại (ngoại trừ skill hiện tại) |
| 6 | | Cập nhật bản ghi |
| 7 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**5a. Tên đã tồn tại:**

- 5a.1. Hiển thị: "Tên kỹ năng đã được sử dụng"
- 5a.2. Quay lại bước 2

---

## UC_ADMIN_05: Delete System Skill (Xóa kỹ năng hệ thống)

### Mô tả

Admin xóa một kỹ năng khỏi danh mục hệ thống. Khi xóa, tất cả bản ghi user_skills liên quan sẽ bị xóa cascade (do FK constraint). Hệ thống hiển thị cảnh báo về số user đang sử dụng skill trước khi xóa.

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Skill tồn tại

### Điều kiện hậu

- Xóa bản ghi từ bảng skills
- CASCADE xóa các bản ghi user_skills liên quan

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Delete" trên skill | |
| 2 | | Kiểm tra số user đang sử dụng skill |
| 3 | | Hiển thị xác nhận: "X user đang sử dụng skill này. Bạn có chắc?" |
| 4 | Click "Confirm" | |
| 5 | | Xóa skill (CASCADE đến user_skills) |
| 6 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**4a. Admin hủy xác nhận:**

- 4a.1. Đóng dialog, không thay đổi

---

## UC_ADMIN_06: View Global User List (Xem danh sách người dùng)

### Mô tả

Admin xem danh sách tất cả người dùng trong hệ thống, bao gồm thông tin: email, full_name, role (ADMIN/USER), status (AVAILABLE/BUSY/OOO), và current_workload.

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Admin đã đăng nhập

### Điều kiện hậu

- Hiển thị danh sách user

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Truy cập trang User Management | |
| 2 | | Query tất cả users |
| 3 | | Hiển thị danh sách: name, email, role, status, workload |

---

## UC_ADMIN_07: Add System User (Thêm người dùng)

### Mô tả

Admin tạo tài khoản người dùng mới trong hệ thống. Admin nhập thông tin: email, full_name, password, role. Password được hash trước khi lưu.

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- Admin đã đăng nhập
- Email chưa tồn tại

### Điều kiện hậu

- Tạo bản ghi users mới

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Add User" | |
| 2 | | Hiển thị form: Email, Full Name, Password, Role (ADMIN/USER) |
| 3 | Nhập thông tin và click "Save" | |
| 4 | | Validate dữ liệu (email format, password strength) |
| 5 | | Kiểm tra email chưa tồn tại |
| 6 | | Hash password |
| 7 | | Insert user mới (status = AVAILABLE, current_workload = 0) |
| 8 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**5a. Email đã tồn tại:**

- 5a.1. Hiển thị: "Email đã được sử dụng"
- 5a.2. Quay lại bước 2

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Password hashing**: bcrypt cost ≥ 10
- **Role**: enum('ADMIN', 'USER')
- **Default status**: 'AVAILABLE'
- **Default current_workload**: 0

---

## UC_ADMIN_08: Edit System User (Sửa thông tin người dùng)

### Mô tả

Admin chỉnh sửa thông tin người dùng: full_name, email, role, status. Admin không thể thay đổi password của user (user tự đổi qua Reset Password).

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- User tồn tại

### Điều kiện hậu

- Cập nhật thông tin user

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Edit" trên user | |
| 2 | | Query thông tin user hiện tại |
| 3 | | Hiển thị form edit: full_name, email, role, status |
| 4 | Chỉnh sửa thông tin và click "Save" | |
| 5 | | Validate dữ liệu |
| 6 | | Kiểm tra email unique (nếu thay đổi) |
| 7 | | Cập nhật bản ghi, set updated_at = NOW() |
| 8 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**6a. Email đã tồn tại:**

- 6a.1. Hiển thị: "Email đã được sử dụng bởi tài khoản khác"
- 6a.2. Quay lại bước 3

---

## UC_ADMIN_09: Delete System User (Xóa người dùng)

### Mô tả

Admin xóa tài khoản người dùng khỏi hệ thống. Khi xóa, tất cả dữ liệu liên quan bị xóa cascade: user_skills, project_members, comments, notifications, chat_sessions. Admin không thể xóa tài khoản chính mình.

### Tác nhân chính

- ad (System Administrator)

### Điều kiện tiên quyết

- User tồn tại
- Không phải tài khoản admin đang đăng nhập

### Điều kiện hậu

- Xóa user và cascade dữ liệu liên quan

### Luồng sự kiện chính

| Bước | Admin | Hệ thống |
| ---- | ----- | -------- |
| 1 | Click "Delete" trên user | |
| 2 | | Kiểm tra không phải xóa chính mình |
| 3 | | Hiển thị xác nhận: "Xóa user này? Mọi dữ liệu liên quan sẽ bị mất." |
| 4 | Click "Confirm" | |
| 5 | | Xóa user (CASCADE) |
| 6 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**2a. Xóa chính mình:**

- 2a.1. Hiển thị: "Không thể xóa tài khoản đang đăng nhập"
- 2a.2. Kết thúc

---

## Tổng kết

| Use Case | Tên | Related Table |
|---|---|---|
| UC_ADMIN_01 | Configure System Parameters | system_settings |
| UC_ADMIN_02 | View System Skill Directory | skills |
| UC_ADMIN_03 | Add System Skill | skills |
| UC_ADMIN_04 | Edit System Skill | skills |
| UC_ADMIN_05 | Delete System Skill | skills, user_skills |
| UC_ADMIN_06 | View Global User List | users |
| UC_ADMIN_07 | Add System User | users |
| UC_ADMIN_08 | Edit System User | users |
| UC_ADMIN_09 | Delete System User | users |
