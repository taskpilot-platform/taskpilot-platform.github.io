# ĐẶC TẢ CÁC USE CASE - USER SKILLS

Tài liệu này mô tả các use case thuộc nhóm Quản lý kỹ năng cá nhân (User Skills). Cho phép người dùng (Project Manager, Project Member) quản lý danh sách kỹ năng cá nhân của mình trong hệ thống TaskPilot. Kỹ năng cá nhân được sử dụng bởi AI Assistant để đề xuất phân công task phù hợp.

---

## UC_SKILL_01: View Personal Skill List (Xem danh sách kỹ năng cá nhân)

### Mô tả

Người dùng xem danh sách tất cả kỹ năng đã đăng ký của mình. Hệ thống truy vấn bảng user_skills kết hợp với bảng skills để lấy tên kỹ năng và mức độ thành thạo (level 1-5). Danh sách được hiển thị dưới dạng bảng hoặc card với tên kỹ năng và level tương ứng.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập và có JWT token hợp lệ

### Điều kiện hậu

- Hiển thị danh sách kỹ năng cá nhân

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang Skills từ menu | |
| 2 | | Verify JWT token và extract user_id |
| 3 | | Truy vấn danh sách kỹ năng: <br>`SELECT us.skill_id, s.name, us.level FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = :user_id` |
| 4 | | Hiển thị danh sách kỹ năng: tên skill, level (1-5) |
| 5 | Xem danh sách kỹ năng | |

### Luồng sự kiện phụ

**3a. Chưa có kỹ năng nào:**

- 3a.1. Hiển thị thông báo: "Bạn chưa thêm kỹ năng nào"
- 3a.2. Hiển thị nút "Add Skill"

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Performance**: Sử dụng JOIN để lấy tên skill từ bảng skills
- **Sorting**: Sắp xếp theo tên skill hoặc level

---

## UC_SKILL_02: View Personal Skill Details (Xem chi tiết kỹ năng)

### Mô tả

Người dùng xem chi tiết một kỹ năng cá nhân cụ thể, bao gồm tên kỹ năng và mức độ thành thạo hiện tại (level 1-5, với 1 là Beginner và 5 là Expert).

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- Kỹ năng tồn tại trong danh sách của user

### Điều kiện hậu

- Hiển thị chi tiết kỹ năng

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào một kỹ năng từ danh sách | |
| 2 | | Truy vấn chi tiết: <br>`SELECT us.level, s.name, s.id FROM user_skills us JOIN skills s ON us.skill_id = s.id WHERE us.user_id = :user_id AND us.skill_id = :skill_id` |
| 3 | | Hiển thị chi tiết: <br>- Skill Name <br>- Level (1-5) với label (Beginner/Intermediate/Advanced/Expert/Master) |

### Luồng sự kiện phụ

**2a. Kỹ năng không tồn tại:**

- 2a.1. Hiển thị: "Kỹ năng không tìm thấy"
- 2a.2. Redirect về danh sách kỹ năng

---

## UC_SKILL_03: Add Personal Skill (Thêm kỹ năng cá nhân)

### Mô tả

Người dùng thêm một kỹ năng mới vào danh sách kỹ năng cá nhân. Hệ thống hiển thị dropdown chứa tất cả system skills (từ bảng skills do Admin quản lý), người dùng chọn skill và đặt mức độ thành thạo (level 1-5). Mỗi user chỉ có thể thêm mỗi skill một lần (primary key composite: user_id + skill_id).

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- Có ít nhất 1 system skill chưa được thêm bởi user

### Điều kiện hậu

- Thêm bản ghi mới vào bảng user_skills
- Kỹ năng xuất hiện trong danh sách kỹ năng cá nhân

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Add Skill" | |
| 2 | | Truy vấn danh sách system skills chưa được thêm: <br>`SELECT s.id, s.name FROM skills s WHERE s.id NOT IN (SELECT skill_id FROM user_skills WHERE user_id = :user_id)` |
| 3 | | Hiển thị form: <br>- Skill dropdown (*bắt buộc) <br>- Level 1-5 (*bắt buộc, mặc định 1) |
| 4 | Chọn skill và đặt level | |
| 5 | Click "Save" | |
| 6 | | Validate: skill_id tồn tại, level trong khoảng 1-5 |
| 7 | | Kiểm tra chưa tồn tại: <br>`SELECT COUNT(*) FROM user_skills WHERE user_id = :user_id AND skill_id = :skill_id` |
| 8 | | Thêm mới: <br>`INSERT INTO user_skills (user_id, skill_id, level) VALUES (:user_id, :skill_id, :level)` |
| 9 | | Hiển thị thông báo thành công và redirect về danh sách |

### Luồng sự kiện phụ

**6a. Dữ liệu không hợp lệ:**

- 6a.1. Hiển thị lỗi validation
- 6a.2. Quay lại bước 3

**7a. Skill đã tồn tại:**

- 7a.1. Hiển thị: "Kỹ năng này đã được thêm"
- 7a.2. Quay lại bước 3

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Composite Primary Key**: (user_id, skill_id) - mỗi skill chỉ thêm 1 lần
- **Level range**: 1-5 (integer)
- **Foreign Key**: user_id → users(id) CASCADE DELETE, skill_id → skills(id) CASCADE DELETE

---

## UC_SKILL_04: Update Personal Skill (Cập nhật kỹ năng cá nhân)

### Mô tả

Người dùng cập nhật mức độ thành thạo (level) của một kỹ năng đã có trong danh sách cá nhân. Tên kỹ năng không thể thay đổi (do tham chiếu từ bảng skills), chỉ có thể thay đổi level (1-5).

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- Kỹ năng tồn tại trong danh sách của user

### Điều kiện hậu

- Cập nhật level trong bảng user_skills

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Edit" trên một kỹ năng | |
| 2 | | Hiển thị form edit: <br>- Skill Name (read-only) <br>- Level 1-5 (editable, hiển thị giá trị hiện tại) |
| 3 | Thay đổi level | |
| 4 | Click "Save" | |
| 5 | | Validate level (1-5) |
| 6 | | Cập nhật: <br>`UPDATE user_skills SET level = :new_level WHERE user_id = :user_id AND skill_id = :skill_id` |
| 7 | | Hiển thị thông báo thành công |

### Luồng sự kiện phụ

**5a. Level không hợp lệ:**

- 5a.1. Hiển thị: "Level phải nằm trong khoảng 1-5"
- 5a.2. Quay lại bước 2

**6a. Kỹ năng không tồn tại:**

- 6a.1. Hiển thị: "Kỹ năng không tìm thấy"
- 6a.2. Redirect về danh sách

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Level range**: 1-5
- **Immutable skill_id**: Không thể thay đổi skill, chỉ thay đổi level
- **AI Impact**: Thay đổi level ảnh hưởng đến đề xuất phân công task của AI

---

## UC_SKILL_05: Delete Personal Skill (Xóa kỹ năng cá nhân)

### Mô tả

Người dùng xóa một kỹ năng khỏi danh sách kỹ năng cá nhân. Hệ thống hiển thị hộp thoại xác nhận trước khi xóa. Sau khi xóa, bản ghi tương ứng trong bảng user_skills bị xóa.

### Tác nhân chính

- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã đăng nhập
- Kỹ năng tồn tại trong danh sách của user

### Điều kiện hậu

- Xóa bản ghi từ bảng user_skills
- Kỹ năng biến mất khỏi danh sách

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click "Delete" trên một kỹ năng | |
| 2 | | Hiển thị hộp thoại xác nhận: "Bạn có chắc chắn muốn xóa kỹ năng này?" |
| 3 | Click "Confirm" | |
| 4 | | Xóa bản ghi: <br>`DELETE FROM user_skills WHERE user_id = :user_id AND skill_id = :skill_id` |
| 5 | | Cập nhật danh sách và hiển thị thông báo thành công |

### Luồng sự kiện phụ

**3a. User hủy xác nhận:**

- 3a.1. Đóng hộp thoại
- 3a.2. Không thay đổi gì

**4a. Kỹ năng không tồn tại:**

- 4a.1. Hiển thị: "Kỹ năng không tìm thấy"
- 4a.2. Refresh danh sách

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Confirmation required**: Yêu cầu xác nhận trước khi xóa
- **AI Impact**: Xóa skill ảnh hưởng đến đề xuất phân công task của AI
- **No cascade**: Xóa user_skill không ảnh hưởng đến bảng skills

---

## Tổng kết

Tài liệu này mô tả **5 use case** cho User Skills:

1. **UC_SKILL_01**: View Personal Skill List – Xem danh sách kỹ năng
2. **UC_SKILL_02**: View Personal Skill Details – Xem chi tiết kỹ năng
3. **UC_SKILL_03**: Add Personal Skill – Thêm kỹ năng mới
4. **UC_SKILL_04**: Update Personal Skill – Cập nhật level kỹ năng
5. **UC_SKILL_05**: Delete Personal Skill – Xóa kỹ năng

### Bảng liên quan

| Use Case | Related Table |
|---|---|
| UC_SKILL_01 | user_skills, skills |
| UC_SKILL_02 | user_skills, skills |
| UC_SKILL_03 | user_skills, skills |
| UC_SKILL_04 | user_skills |
| UC_SKILL_05 | user_skills |

### Vai trò của User Skills trong hệ thống

- **AI Matching**: AI Assistant sử dụng kỹ năng của user để đề xuất phân công task phù hợp
- **Performance Score**: Kết hợp với `performance_score` trong `project_members` để đánh giá năng lực
- **Task Required Skills**: So sánh với `required_skills` (JSONB) trong bảng `tasks`
