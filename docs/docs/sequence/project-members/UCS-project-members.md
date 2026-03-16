# ĐẶC TẢ CÁC USE CASE - PROJECT MEMBERS

Tài liệu này mô tả các use case thuộc nhóm Quản lý thành viên dự án (Project Members). Cho phép quản lý danh sách, vai trò, và quyền hạn của thành viên trong từng dự án.

---

## UC_MEMBER_01: View Project Member List (Xem danh sách thành viên dự án)

### Mô tả

Thành viên dự án xem danh sách tất cả thành viên trong dự án, bao gồm thông tin: tên, email, vai trò (MANAGER/MEMBER), performance_score, và ngày tham gia.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng là thành viên của dự án

### Điều kiện hậu

- Hiển thị danh sách thành viên

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang Members của project | |
| 2 | | Kiểm tra user là member |
| 3 | | Query tất cả members (join users) |
| 4 | | Hiển thị danh sách: name, email, role, performance_score, joined_at |

### Luồng sự kiện phụ

**2a. Không phải thành viên:**

- 2a.1. Hiển thị: "Bạn không phải thành viên dự án"

---

## UC_MEMBER_02: View Member Details (Xem chi tiết thành viên)

### Mô tả

Xem thông tin chi tiết của một thành viên dự án bao gồm: profile user, vai trò trong project, performance_score, kỹ năng (từ user_skills), và task đang được assign.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng là thành viên của dự án
- Thành viên mục tiêu tồn tại

### Điều kiện hậu

- Hiển thị chi tiết thành viên

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào tên thành viên | |
| 2 | | Query member info (join users, user_skills) |
| 3 | | Hiển thị: name, email, role, performance_score, skills, joined_at |

### Luồng sự kiện phụ

**2a. Member không tồn tại:**

- 2a.1. Hiển thị: "Thành viên không tìm thấy"
- 2a.2. Redirect về danh sách members

---

## UC_MEMBER_03: Add Member to Project (Thêm thành viên vào dự án)

### Mô tả

Thêm một user hiện có vào dự án bằng cách tìm kiếm theo email. User được thêm với role mặc định là MEMBER và performance_score = 0.5. Cần kiểm tra user tồn tại và chưa là thành viên.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng là thành viên dự án
- User mục tiêu tồn tại và chưa là thành viên

### Điều kiện hậu

- Thêm bản ghi project_members (role = MEMBER, performance_score = 0.5)

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Add Member" | |
| 2 | | Hiển thị form tìm kiếm user (email) |
| 3 | Nhập email và click "Add" | |
| 4 | | Validate email format |
| 5 | | Tìm user theo email |
| 6 | | Kiểm tra chưa là thành viên |
| 7 | | Insert vào project_members (role = MEMBER, performance_score = 0.5) |
| 8 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**5a. User không tồn tại:**

- 5a.1. Hiển thị: "Không tìm thấy user với email này"

**6a. Đã là thành viên:**

- 6a.1. Hiển thị: "User này đã là thành viên"

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Composite PK**: (project_id, user_id)
- **Default role**: 'MEMBER'
- **Default performance_score**: 0.5

---

## UC_MEMBER_04: Update Member Role (Cập nhật vai trò thành viên)

### Mô tả

Project Manager thay đổi vai trò của thành viên giữa MANAGER và MEMBER. Chỉ user có role = MANAGER mới có quyền thay đổi role.

### Tác nhân chính

- pm (Project Manager)

### Điều kiện tiên quyết

- Người dùng có role = MANAGER trong dự án

### Điều kiện hậu

- Cập nhật role trong project_members

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Change Role" trên thành viên | |
| 2 | | Kiểm tra user có quyền MANAGER |
| 3 | | Hiển thị role selection: MANAGER / MEMBER |
| 4 | Chọn role mới và click "Save" | |
| 5 | | Cập nhật role |
| 6 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**2a. Không phải MANAGER:**

- 2a.1. Hiển thị: "Chỉ Manager mới có quyền thay đổi role"

### Ràng buộc nghiệp vụ/Kỹ thuật

- **project_role**: enum('MANAGER', 'MEMBER')
- **Authorization**: Chỉ MANAGER mới thay đổi role

---

## UC_MEMBER_05: Remove Member from Project (Xóa thành viên khỏi dự án)

### Mô tả

Xóa một thành viên khỏi dự án. Project Manager có thể xóa bất kỳ thành viên nào. Thành viên cũng có thể tự xóa mình (= Leave Project). Không thể xóa MANAGER duy nhất.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng có quyền MANAGER hoặc đang xóa chính mình
- Không xóa MANAGER duy nhất

### Điều kiện hậu

- Xóa bản ghi project_members

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Remove" trên thành viên | |
| 2 | | Kiểm tra quyền (MANAGER hoặc xóa self) |
| 3 | | Hiển thị xác nhận: "Xóa thành viên này?" |
| 4 | Click "Confirm" | |
| 5 | | Kiểm tra không xóa MANAGER duy nhất |
| 6 | | Xóa bản ghi project_members |
| 7 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**2a. Không có quyền:**

- 2a.1. Hiển thị: "Bạn không có quyền xóa thành viên"

**5a. Xóa MANAGER duy nhất:**

- 5a.1. Hiển thị: "Không thể xóa Manager duy nhất. Chuyển quyền trước."

---

## Tổng kết

| Use Case | Tên | Related Table |
|---|---|---|
| UC_MEMBER_01 | View Project Member List | project_members, users |
| UC_MEMBER_02 | View Member Details | project_members, users, user_skills |
| UC_MEMBER_03 | Add Member to Project | project_members, users |
| UC_MEMBER_04 | Update Member Role | project_members |
| UC_MEMBER_05 | Remove Member from Project | project_members |
