# ĐẶC TẢ CÁC USE CASE - AUTHENTICATION (AUTH)

Tài liệu này mô tả các use case thuộc nhóm Xác thực (Authentication). Hệ thống sử dụng JWT token để đảm bảo bảo mật. Các ràng buộc nghiệp vụ và flow được nêu rõ trong từng use case.

---

## UC_AUTH_01: Login / Sign In (Đăng nhập)

### Mô tả ngắn gọn

Người dùng đã có tài khoản đăng nhập vào hệ thống TaskPilot để sử dụng các dịch vụ.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Luồng sự kiện

#### Luồng chính
1. Người dùng truy cập trang đăng nhập.
2. Hệ thống hiển thị form đăng nhập: Username/Email và Password.
3. Người dùng nhập username/email và password, click "Sign In".
4. Hệ thống validate định dạng dữ liệu (không rỗng).
5. Hệ thống truy vấn user theo username hoặc email.
6. Hệ thống kiểm tra tài khoản không bị khóa (is_lock = false).
7. Hệ thống verify password hash.
8. Hệ thống tạo JWT token chứa: user_id, username, role, email.
9. Hệ thống chuyển hướng đến trang chủ.

#### Luồng phụ
- Dữ liệu không hợp lệ → Hiển thị thông báo lỗi, giữ nguyên username/email.
- Thông tin đăng nhập không đúng → Hiển thị: "Username/Email hoặc mật khẩu không đúng" (không tiết lộ user có tồn tại hay không).
- Tài khoản bị khóa → Hiển thị: "Tài khoản đã bị khóa. Vui lòng liên hệ hỗ trợ".
- Lỗi hệ thống → Hiển thị thông báo lỗi chung.

### Yêu cầu đặc biệt

- Rate limiting: 5 lần thất bại / IP / 15 phút (chống brute force).
- Timing attack mitigation: Response time giống nhau cho mọi trường hợp lỗi.
- Password verification: Sử dụng bcrypt.compare() hoặc argon2.verify().

### Điều kiện tiên quyết

- Người dùng đã có tài khoản trong hệ thống.
- Tài khoản không bị khóa (is_lock = false).

### Điều kiện hậu

Nếu thành công: Tạo JWT token, người dùng được xác thực và chuyển về trang chủ.
Nếu thất bại: Ghi log failed login attempt.

---

## UC_AUTH_02: Register / Sign Up (Đăng ký tài khoản)

### Mô tả ngắn gọn

Người dùng mới tạo tài khoản trong hệ thống TaskPilot.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Luồng sự kiện

#### Luồng chính
1. Người dùng truy cập trang đăng ký.
2. Hệ thống hiển thị form đăng ký: Username, Email, Password, Full Name, Phone Number (tùy chọn).
3. Người dùng nhập thông tin và click "Sign Up".
4. Hệ thống validate định dạng dữ liệu (username không rỗng, email format hợp lệ, password ≥ 8 ký tự).
5. Hệ thống kiểm tra username và email chưa tồn tại.
6. Hệ thống hash password (bcrypt/argon2).
7. Hệ thống tạo user mới trong database.
8. Hệ thống tạo JWT token và đăng nhập tự động.
9. Hệ thống chuyển hướng đến trang chủ.

#### Luồng phụ
- Dữ liệu không hợp lệ → Hiển thị thông báo lỗi chi tiết, giữ nguyên dữ liệu (trừ password).
- Username hoặc email đã tồn tại → Hiển thị: "Tên đăng nhập hoặc email đã được sử dụng".
- Lỗi database → Hiển thị thông báo lỗi chung.

### Yêu cầu đặc biệt

- Username: Unique, không phân biệt hoa thường, không chứa khoảng trắng.
- Email: Unique, validate format, không phân biệt hoa thường.
- Password hashing: bcrypt (cost ≥ 10) hoặc argon2id.

### Điều kiện tiên quyết

- Người dùng chưa có tài khoản trong hệ thống.
- Username và email chưa tồn tại.

### Điều kiện hậu

Nếu thành công: Tạo user mới, tạo JWT token, người dùng được đăng nhập tự động.
Nếu thất bại: Không tạo user, giữ nguyên trạng thái.

---

## UC_AUTH_03: Forgot Password (Quên mật khẩu)

### Mô tả ngắn gọn

Người dùng quên mật khẩu yêu cầu gửi link đặt lại mật khẩu qua email.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Luồng sự kiện

#### Luồng chính
1. Người dùng click "Forgot Password" từ trang đăng nhập.
2. Hệ thống hiển thị form nhập email.
3. Người dùng nhập email và click "Send Reset Link".
4. Hệ thống validate format email.
5. Hệ thống kiểm tra user tồn tại và tài khoản không bị khóa.
6. Hệ thống sinh reset token (UUID) và lưu với thời hạn 24 giờ.
7. Hệ thống gửi email chứa reset link.
8. Hệ thống hiển thị thông báo: "Nếu email tồn tại, bạn sẽ nhận được link đặt lại mật khẩu" (không tiết lộ email có tồn tại hay không).

#### Luồng phụ
- Email format không hợp lệ → Hiển thị lỗi validation.
- Email không tồn tại hoặc tài khoản bị khóa → Vẫn hiển thị thông báo thành công (bảo mật), không gửi email.
- Lỗi gửi email → Ghi log lỗi, hiển thị thông báo chung.

### Yêu cầu đặc biệt

- Token expiry: 24 giờ.
- Token uniqueness: Mỗi request tạo token mới, vô hiệu hóa token cũ.
- Email enumeration prevention: Không tiết lộ email có tồn tại hay không.
- Rate limiting: Max 3 lần/IP/giờ, max 5 lần/email.

### Điều kiện tiên quyết

- Người dùng đã có tài khoản trong hệ thống.

### Điều kiện hậu

Nếu thành công: Tạo reset token, gửi email chứa link reset.
Nếu thất bại: Không tạo token, hiển thị thông báo chung.

---

## UC_AUTH_04: Reset Password (Đặt lại mật khẩu)

### Mô tả ngắn gọn

Người dùng sử dụng link reset từ email để đặt lại mật khẩu mới.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Luồng sự kiện

#### Luồng chính
1. Người dùng click vào reset link từ email.
2. Hệ thống validate reset token (tồn tại và chưa hết hạn).
3. Hệ thống hiển thị form nhập mật khẩu mới: New Password, Confirm New Password.
4. Người dùng nhập mật khẩu mới và xác nhận, click "Reset Password".
5. Hệ thống validate mật khẩu (≥ 8 ký tự, chứa chữ hoa, chữ thường, số, confirm khớp).
6. Hệ thống hash mật khẩu mới.
7. Hệ thống cập nhật password và xóa reset token.
8. Hệ thống gửi email xác nhận đổi mật khẩu thành công.
9. Hệ thống chuyển hướng đến trang đăng nhập với thông báo thành công.

#### Luồng phụ
- Token không hợp lệ → Hiển thị: "Link đặt lại mật khẩu không hợp lệ", cung cấp link request mới.
- Token hết hạn → Hiển thị: "Link đã hết hạn (hợp lệ trong 24 giờ)", xóa token, cung cấp link request mới.
- Mật khẩu không hợp lệ → Hiển thị lỗi chi tiết (độ dài, ký tự, confirm mismatch).
- Lỗi cập nhật → Hiển thị thông báo lỗi, giữ nguyên token.

### Yêu cầu đặc biệt

- One-time use: Token chỉ dùng 1 lần, sau khi reset thành công bị xóa.
- Password strength: Giống như Register (≥ 8 chars, mixed case, numbers).
- Session invalidation: Sau khi đổi password, tất cả JWT tokens cũ bị vô hiệu hóa.

### Điều kiện tiên quyết

- Người dùng đã yêu cầu Forgot Password (UC_AUTH_03) và nhận được email với link reset.
- Reset token còn hợp lệ (chưa quá 24 giờ).

### Điều kiện hậu

Nếu thành công: Cập nhật password, xóa reset token, chuyển hướng đến trang đăng nhập.
Nếu thất bại: Giữ nguyên password cũ.

---

## Tổng kết

Tài liệu này mô tả **4 use case chính** cho Authentication (Auth):

1. **UC_AUTH_01**: Login / Sign In – Đăng nhập vào hệ thống
2. **UC_AUTH_02**: Register / Sign Up – Đăng ký tài khoản mới
3. **UC_AUTH_03**: Forgot Password – Yêu cầu đặt lại mật khẩu qua email
4. **UC_AUTH_04**: Reset Password – Đặt lại mật khẩu bằng reset token

### Bảng liên quan

| Use Case | Related Table |
|---|---|
| UC_AUTH_01 | users |
| UC_AUTH_02 | users |
| UC_AUTH_03 | users |
| UC_AUTH_04 | users |

### Yêu cầu bảo mật chung

- Password hashing với bcrypt (cost ≥ 10) hoặc argon2id
- JWT token cho session management
- Rate limiting chống brute-force
- Email enumeration prevention
- HTTPS bắt buộc trong production
- XSS/CSRF protection
