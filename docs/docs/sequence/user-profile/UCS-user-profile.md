# ĐẶC TẢ CÁC USE CASE - USER PROFILE

Tài liệu này mô tả các use case thuộc nhóm Quản lý hồ sơ cá nhân (User Profile). Cho phép người dùng xem, cập nhật thông tin cá nhân và xóa tài khoản của mình trong hệ thống TaskPilot.

---

## UC_PROFILE_01: Update Personal Information (Cập nhật thông tin cá nhân)

### Mô tả

Người dùng đã đăng nhập có thể cập nhật thông tin cá nhân của mình bao gồm họ tên, email, và avatar. Username (email) có thể thay đổi nhưng phải đảm bảo tính duy nhất trong hệ thống. Sau khi cập nhật thành công, hệ thống lưu thay đổi vào database và hiển thị thông báo thành công.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- JWT token hợp lệ

### Điều kiện hậu

- Cập nhật thông tin users trong database
- Trường updated_at được cập nhật thành thời điểm hiện tại

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang Profile | |
| 2 | | Verify JWT token và extract user_id |
| 3 | | Query thông tin user: <br>`SELECT full_name, email, avatar_url, status, current_workload, created_at FROM users WHERE id = :user_id` |
| 4 | | Hiển thị Profile View với form chỉnh sửa: <br>- Full Name (*bắt buộc) <br>- Email (*bắt buộc, unique) <br>- Avatar URL (tùy chọn) |
| 5 | Chỉnh sửa thông tin và click "Save" | |
| 6 | | Validate dữ liệu: <br>- Full name không rỗng <br>- Email format hợp lệ <br>- Email unique (ngoại trừ email hiện tại): <br>`SELECT COUNT(*) FROM users WHERE email = :new_email AND id != :user_id` |
| 7 | | Cập nhật thông tin: <br>`UPDATE users SET full_name = :full_name, email = :email, avatar_url = :avatar_url, updated_at = NOW() WHERE id = :user_id` |
| 8 | | Hiển thị thông báo: "Thông tin cá nhân đã được cập nhật thành công" |

### Luồng sự kiện phụ

**6a. Dữ liệu không hợp lệ:**

- 6a.1. Hiển thị lỗi chi tiết (trường nào sai)
- 6a.2. Giữ nguyên dữ liệu đã nhập
- 6a.3. Quay lại bước 4

**6b. Email đã tồn tại (thuộc user khác):**

- 6b.1. Hiển thị: "Email này đã được sử dụng bởi tài khoản khác"
- 6b.2. Quay lại bước 4

**7a. Lỗi khi cập nhật:**

- 7a.1. Hiển thị: "Không thể cập nhật thông tin. Vui lòng thử lại"
- 7a.2. Ghi log lỗi
- 7a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Email uniqueness**: Email phải unique trong toàn hệ thống
- **Input validation**: Validate tất cả input trước khi lưu
- **Audit trail**: updated_at được cập nhật tự động

### Yêu cầu bảo mật

- **Authentication required**: Phải có JWT token hợp lệ
- **Authorization**: User chỉ được sửa thông tin của chính mình
- **XSS/CSRF prevention**: Validate và sanitize tất cả input
- **HTTPS required**: Tất cả thao tác phải qua HTTPS

---

## UC_PROFILE_02: View User Profile (Xem hồ sơ cá nhân)

### Mô tả

Người dùng đã đăng nhập có thể xem thông tin hồ sơ cá nhân của mình, bao gồm họ tên, email, avatar, trạng thái hiện tại, workload hiện tại, và ngày tạo tài khoản.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- JWT token hợp lệ

### Điều kiện hậu

- Hiển thị thông tin profile đầy đủ

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang Profile từ menu | |
| 2 | | Verify JWT token và extract user_id |
| 3 | | Query thông tin user: <br>`SELECT full_name, email, avatar_url, role, status, current_workload, created_at, updated_at FROM users WHERE id = :user_id` |
| 4 | | Hiển thị Profile View với thông tin: <br>- Avatar <br>- Full Name <br>- Email <br>- Role (ADMIN/USER) <br>- Status (AVAILABLE/BUSY/OOO) <br>- Current Workload <br>- Member Since (created_at) |
| 5 | Xem thông tin profile | |

### Luồng sự kiện phụ

**3a. User không tồn tại (token lỗi):**

- 3a.1. Hiển thị thông báo lỗi
- 3a.2. Redirect đến trang đăng nhập
- 3a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Read-only view**: Trang xem profile chỉ hiển thị, không cho chỉnh sửa trực tiếp
- **Performance**: Cache profile data nếu cần

---

## UC_PROFILE_03: Delete Personal Account (Xóa tài khoản cá nhân)

### Mô tả

Người dùng có thể xóa tài khoản cá nhân của mình khỏi hệ thống TaskPilot. Đây là thao tác không thể hoàn tác (irreversible). Hệ thống yêu cầu xác nhận bằng mật khẩu hiện tại trước khi xóa. Khi xóa user, tất cả dữ liệu liên quan (user_skills, project_members, comments, notifications, chat_sessions) sẽ bị xóa cascade.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- JWT token hợp lệ

### Điều kiện hậu

- Xóa bản ghi users và tất cả dữ liệu liên quan (cascade)
- Clear JWT token và session
- Chuyển hướng đến trang landing

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Delete Account" trong trang Profile | |
| 2 | | Hiển thị hộp thoại xác nhận: "Bạn có chắc chắn muốn xóa tài khoản? Hành động này không thể hoàn tác." |
| 3 | Nhập mật khẩu hiện tại để xác nhận | |
| 4 | Click "Confirm Delete" | |
| 5 | | Verify mật khẩu hiện tại: <br>`SELECT password_hash FROM users WHERE id = :user_id` <br>So sánh bằng bcrypt.compare() |
| 6 | | Xóa user và cascade dữ liệu liên quan: <br>`DELETE FROM users WHERE id = :user_id` <br>Cascade: user_skills, project_members, comments, notifications, chat_sessions |
| 7 | | Clear JWT token và session |
| 8 | | Redirect đến trang landing với thông báo: "Tài khoản đã được xóa thành công" |

### Luồng sự kiện phụ

**5a. Mật khẩu không đúng:**

- 5a.1. Hiển thị: "Mật khẩu không chính xác"
- 5a.2. Ghi log cảnh báo (possible unauthorized access attempt)
- 5a.3. Quay lại bước 2

**3a. User hủy xác nhận:**

- 3a.1. Đóng hộp thoại xác nhận
- 3a.2. Không thay đổi gì
- 3a.3. Kết thúc use case

**6a. Lỗi khi xóa:**

- 6a.1. Hiển thị: "Không thể xóa tài khoản. Vui lòng thử lại"
- 6a.2. Ghi log lỗi
- 6a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Irreversible action**: Không thể hoàn tác sau khi xóa
- **Password confirmation**: Yêu cầu nhập mật khẩu để xác nhận danh tính
- **Cascade delete**: Xóa tất cả dữ liệu liên quan
- **Audit trail**: Ghi log xóa tài khoản (user_id, timestamp, ip_address)

### Yêu cầu bảo mật

- **Re-authentication**: Bắt buộc nhập mật khẩu để xác nhận
- **Rate limiting**: Giới hạn số lần nhập sai mật khẩu
- **Audit logging**: Ghi log đầy đủ trước khi xóa

---

## Tổng kết

Tài liệu này mô tả **3 use case** cho User Profile:

1. **UC_PROFILE_01**: Update Personal Information – Cập nhật thông tin cá nhân
2. **UC_PROFILE_02**: View User Profile – Xem hồ sơ cá nhân
3. **UC_PROFILE_03**: Delete Personal Account – Xóa tài khoản cá nhân

### Bảng liên quan

| Use Case | Related Table |
|---|---|
| UC_PROFILE_01 | users |
| UC_PROFILE_02 | users |
| UC_PROFILE_03 | users, user_skills, project_members, comments, notifications, chat_sessions |
