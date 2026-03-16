# ĐẶC TẢ CÁC USE CASE - AUTHENTICATION (AUTH)

Tài liệu này mô tả các use case thuộc nhóm Xác thực (Authentication). Hệ thống sử dụng JWT token để đảm bảo bảo mật. Các ràng buộc nghiệp vụ và flow được nêu rõ trong từng use case.

---

## UC_AUTH_01: Login / Sign In (Đăng nhập)

### Mô tả

Người dùng đã có tài khoản đăng nhập vào hệ thống TaskPilot để sử dụng các dịch vụ quản lý dự án, quản lý task, và tương tác với AI Assistant. Hệ thống hỗ trợ đăng nhập bằng email và password. Sau khi đăng nhập thành công, hệ thống tạo JWT token cho session và chuyển hướng người dùng đến trang chủ.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã có tài khoản trong hệ thống (đã Register)
- Tài khoản không bị khóa (status khác 'OOO' hoặc có cơ chế lock riêng)

### Điều kiện hậu

- Tạo JWT token mới cho session
- Người dùng được xác thực và chuyển về trang chủ
- Ghi log đăng nhập thành công

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang đăng nhập | |
| 2 | | Hiển thị SignInView với form đăng nhập: <br>- Email (*bắt buộc) <br>- Password (*bắt buộc) |
| 3 | Nhập email và password | |
| 4 | Click "Sign In" | |
| 5 | | Validate định dạng dữ liệu: <br>- Email không rỗng, đúng format <br>- Password không rỗng |
| 6 | | Truy vấn user: <br>`SELECT id, email, password_hash, role, status FROM users WHERE email = :email` |
| 7 | | Kiểm tra user tồn tại và status hợp lệ |
| 8 | | Verify password hash bằng bcrypt.compare() |
| 9 | | Sinh JWT token chứa: user_id, email, role, full_name |
| 10 | | Trả về Success và chuyển hướng đến HomeView |
| 11 | Được đăng nhập và xem trang chủ | |

### Luồng sự kiện phụ

**5a. Dữ liệu không hợp lệ:**

- 5a.1. Hiển thị thông báo lỗi: "Invalid data format"
- 5a.2. Giữ nguyên email đã nhập (xóa password)
- 5a.3. Quay lại bước 2

**6a. Thông tin đăng nhập không đúng (email không tồn tại HOẶC password sai):**

- 6a.1. Trả về lỗi generic: "Invalid credentials" (không tiết lộ user có tồn tại hay không - tránh email enumeration)
- 6a.2. Hiển thị: "Email hoặc mật khẩu không đúng"
- 6a.3. Ghi log failed login attempt (email_attempted, ip_address, timestamp)
- 6a.4. Áp dụng rate limiting (5 lần thất bại / IP / 15 phút) để chống brute force attack
- 6a.5. Quay lại bước 2

**7a. Tài khoản không hợp lệ (bị khóa):**

- 7a.1. Trả về lỗi: "Account unavailable"
- 7a.2. Hiển thị: "Tài khoản của bạn hiện không khả dụng. Vui lòng liên hệ quản trị viên"
- 7a.3. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Credential**: Đăng nhập bằng email + password
- **Password Verification**: Sử dụng bcrypt.compare() hoặc argon2.verify() để so sánh hash
- **Rate Limiting**: 5 lần thất bại / IP / 15 phút (chống brute force attack)
- **Session Management**: JWT Access Token: 1 giờ, Refresh Token: 7 ngày
- **Audit Logging**: Ghi log mọi lần đăng nhập (thành công/thất bại) với ip_address, timestamp

### Yêu cầu bảo mật

- **Brute-force Protection**: Rate limiting 5 lần / IP / 15 phút
- **Timing Attack Mitigation**: Response time giống nhau cho mọi trường hợp lỗi (user không tồn tại vs password sai)
- **Email Enumeration Prevention**: Luôn trả về lỗi generic "Invalid credentials"
- **Secure Password Storage**: Hash với bcrypt cost ≥ 10
- **JWT Security**: Access Token short-lived (1 giờ), signed với RS256 hoặc HS256
- **HTTPS Required**: Tất cả authentication flow phải qua HTTPS trong production

---

## UC_AUTH_02: Register / Sign Up (Đăng ký tài khoản)

### Mô tả

Người dùng mới tạo tài khoản trong hệ thống TaskPilot. Sau khi đăng ký thành công, hệ thống tạo bản ghi users mới với role mặc định là 'USER', sinh JWT token và đăng nhập tự động cho người dùng, sau đó chuyển hướng đến trang chủ.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng chưa có tài khoản trong hệ thống
- Email chưa tồn tại

### Điều kiện hậu

- Tạo mới bản ghi users với role mặc định là 'USER'
- Tạo JWT token và người dùng được đăng nhập tự động
- Chuyển hướng về trang chủ

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Truy cập trang đăng ký | |
| 2 | | Hiển thị SignUpView với form đăng ký: <br>- Email (*bắt buộc, duy nhất, format email hợp lệ) <br>- Full Name (*bắt buộc) <br>- Password (*bắt buộc, ≥8 ký tự) <br>- Avatar URL (tùy chọn) |
| 3 | Nhập thông tin đăng ký | |
| 4 | Click "Sign Up" | |
| 5 | | Validate định dạng dữ liệu: <br>- Email đúng format (regex) <br>- Password đủ mạnh (≥8 ký tự, có chữ hoa, chữ thường, số) <br>- Full name không rỗng |
| 6 | | Kiểm tra email chưa tồn tại: <br>`SELECT COUNT(*) FROM users WHERE email = :email` |
| 7 | | Hash password (bcrypt cost ≥ 10) |
| 8 | | Tạo user mới: <br>`INSERT INTO users (email, full_name, password_hash, avatar_url, role, status, current_workload, created_at, updated_at)` <br>`VALUES (:email, :full_name, :hashed_password, :avatar_url, 'USER', 'AVAILABLE', 0, NOW(), NOW())` <br>`RETURNING id` |
| 9 | | Sinh JWT token chứa: user_id, email, role, full_name |
| 10 | | Trả về Success và chuyển hướng đến HomeView |
| 11 | Được đăng nhập và xem trang chủ | |

### Luồng sự kiện phụ

**5a. Dữ liệu không hợp lệ:**

- 5a.1. Hiển thị thông báo lỗi: "Invalid data format" với chi tiết trường nào sai
- 5a.2. Giữ nguyên dữ liệu đã nhập (trừ password)
- 5a.3. Quay lại bước 2

**6a. Email đã tồn tại:**

- 6a.1. Trả về lỗi: "Email already exists"
- 6a.2. Hiển thị: "Email đã được sử dụng. Vui lòng chọn email khác"
- 6a.3. Quay lại bước 2

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Password hashing**: Phải dùng bcrypt (cost ≥ 10) hoặc argon2id
- **Email**: Unique, validate format, không phân biệt hoa thường
- **Role mặc định**: 'USER' cho người dùng đăng ký mới (system_role enum)
- **Status mặc định**: 'AVAILABLE' (user_status enum)
- **current_workload mặc định**: 0
- **JWT Token Expiry**: Access Token: 1 giờ, Refresh Token: 7 ngày
- **Rate Limiting**: Giới hạn 5 lần đăng ký thất bại / IP / 15 phút

### Yêu cầu bảo mật

- **Password Storage**: Không bao giờ lưu plaintext, chỉ lưu hash (bcrypt cost ≥ 10)
- **Rate Limiting**: 5 lần thất bại / IP / 15 phút
- **HTTPS Only**: Bắt buộc sử dụng HTTPS trong production
- **Input Sanitization**: Validate và sanitize tất cả input để chống XSS

---

## UC_AUTH_03: Forgot Password (Quên mật khẩu)

### Mô tả

Người dùng đã quên mật khẩu có thể yêu cầu đặt lại mật khẩu thông qua email. Hệ thống sẽ sinh một reset token duy nhất với thời hạn 24 giờ, gửi link chứa token qua email cho người dùng. Hệ thống luôn hiển thị thông báo thành công bất kể email có tồn tại hay không (bảo mật chống email enumeration).

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã có tài khoản trong hệ thống
- Email đã được đăng ký

### Điều kiện hậu

- Tạo reset token với thời hạn 24 giờ
- Gửi email chứa link reset password
- Người dùng có thể đặt lại mật khẩu thông qua link (UC_AUTH_04)

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào "Forgot Password" từ trang Sign In | |
| 2 | | Hiển thị Forgot Password View với form nhập email |
| 3 | Nhập email và click "Send Reset Link" | |
| 4 | | Validate format email |
| 5 | | Kiểm tra tồn tại user: <br>`SELECT id, email, status FROM users WHERE email = :email` |
| 6 | | Nếu user tồn tại và status hợp lệ: <br>1) Sinh reset_token (UUID v4) <br>2) Lưu reset_token với expiry (NOW() + 24 giờ) vào bảng riêng hoặc cache <br>3) Gửi email chứa link: `https://taskpilot.com/reset-password?token={reset_token}` |
| 7 | | Hiển thị thông báo: "Nếu email tồn tại trong hệ thống, bạn sẽ nhận được link đặt lại mật khẩu" <br>(không tiết lộ liệu email có tồn tại hay không) |
| 8 | Kiểm tra email và click vào reset link | → Chuyển đến UC_AUTH_04 (Reset Password) |

### Luồng sự kiện phụ

**4a. Email format không hợp lệ:**

- 4a.1. Hiển thị: "Định dạng email không hợp lệ"
- 4a.2. Quay lại bước 2

**5a. Email không tồn tại hoặc tài khoản không khả dụng:**

- 5a.1. Vẫn hiển thị thông báo thành công như bước 7 (để tránh email enumeration attack)
- 5a.2. Không gửi email
- 5a.3. Ghi log cảnh báo
- 5a.4. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **Token expiry**: 24 giờ kể từ khi tạo
- **Token uniqueness**: Mỗi reset request tạo token mới, vô hiệu hóa token cũ
- **Email enumeration prevention**: Không tiết lộ thông tin về email có tồn tại hay không
- **Rate limiting**: Max 3 lần/IP/giờ, max 5 lần/email
- **Audit trail**: Ghi log mọi reset request (thành công/thất bại) với timestamp và IP

### Yêu cầu bảo mật

- **Token strength**: UUID v4 hoặc secure random string (32+ chars)
- **HTTPS required**: Tất cả flow phải qua HTTPS
- **Email security**: Link chỉ gửi qua email đã đăng ký, không hiển thị trên UI
- **Timing attack mitigation**: Response time giống nhau cho mọi trường hợp

---

## UC_AUTH_04: Reset Password (Đặt lại mật khẩu)

### Mô tả

Người dùng sử dụng link reset password nhận từ email (sau khi thực hiện UC_AUTH_03 - Forgot Password) để đặt lại mật khẩu mới. Hệ thống validate reset token, cho phép nhập mật khẩu mới, hash mật khẩu, cập nhật database, và xóa reset token sau khi hoàn tất. Sau đó chuyển hướng người dùng đến trang đăng nhập.

### Tác nhân chính

- ad (System Administrator)
- pm (Project Manager)
- mem (Project Member)

### Điều kiện tiên quyết

- Người dùng đã thực hiện Forgot Password (UC_AUTH_03) và nhận được email chứa reset link
- Reset token còn hợp lệ (chưa quá 24 giờ, chưa được sử dụng)

### Điều kiện hậu

- Cập nhật password_hash trong bảng users
- Xóa/vô hiệu hóa reset token
- Gửi email xác nhận đổi mật khẩu thành công
- Chuyển hướng đến trang đăng nhập

### Luồng sự kiện chính

| Bước | User | Hệ thống |
| ---- | ---- | -------- |
| 1 | Click vào reset link từ email | |
| 2 | | Redirect đến Reset Password View với token trong URL parameter |
| 3 | | Validate token: kiểm tra tồn tại và chưa hết hạn |
| 4 | | Hiển thị form nhập mật khẩu mới: <br>- New Password (*bắt buộc) <br>- Confirm New Password (*bắt buộc) |
| 5 | Nhập mật khẩu mới và xác nhận | |
| 6 | Click "Reset Password" | |
| 7 | | Validate mật khẩu: <br>- ≥8 ký tự <br>- Chứa chữ hoa, chữ thường, số <br>- New Password = Confirm New Password |
| 8 | | Hash mật khẩu mới (bcrypt cost ≥ 10) |
| 9 | | Cập nhật password: <br>`UPDATE users SET password_hash = :new_hash, updated_at = NOW() WHERE id = :user_id` |
| 10 | | Xóa/vô hiệu hóa reset token |
| 11 | | Gửi email xác nhận đổi mật khẩu thành công |
| 12 | | Redirect đến Sign In View với thông báo: "Mật khẩu đã được đặt lại thành công" |
| 13 | Đăng nhập với mật khẩu mới | → UC_AUTH_01 |

### Luồng sự kiện phụ

**3a. Token không hợp lệ:**

- 3a.1. Hiển thị: "Link đặt lại mật khẩu không hợp lệ"
- 3a.2. Cung cấp link "Request New Reset Link"
- 3a.3. Kết thúc use case

**3b. Token đã hết hạn:**

- 3b.1. Hiển thị: "Link đặt lại mật khẩu đã hết hạn (hợp lệ trong 24 giờ)"
- 3b.2. Xóa token hết hạn
- 3b.3. Cung cấp link "Request New Reset Link"
- 3b.4. Kết thúc use case

**7a. Mật khẩu không hợp lệ:**

- 7a.1. Hiển thị lỗi chi tiết (độ dài, ký tự, confirm mismatch)
- 7a.2. Giữ nguyên form
- 7a.3. Quay lại bước 4

**9a. Lỗi khi cập nhật mật khẩu:**

- 9a.1. Hiển thị: "Không thể đặt lại mật khẩu. Vui lòng thử lại"
- 9a.2. Ghi log lỗi
- 9a.3. Giữ nguyên token
- 9a.4. Kết thúc use case

### Ràng buộc nghiệp vụ/Kỹ thuật

- **One-time use**: Token chỉ dùng 1 lần, sau khi reset thành công sẽ bị xóa
- **Password strength**: Giống như Register (≥8 chars, mixed case, numbers)
- **Session invalidation**: Sau khi đổi password, có thể invalidate tất cả JWT tokens cũ
- **Audit trail**: Ghi log mọi reset (thành công/thất bại) với timestamp và IP

### Yêu cầu bảo mật

- **Token validation**: Kiểm tra cả tồn tại và thời hạn
- **HTTPS required**: Tất cả thao tác phải qua HTTPS
- **XSS prevention**: Token không được expose qua JavaScript
- **Password hashing**: bcrypt cost ≥ 10 cho mật khẩu mới

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

### Đặc điểm chung

- **JWT token management**: Session được quản lý bằng JWT
- **Rate limiting**: Bảo vệ chống brute-force và abuse
- **Audit trail**: Ghi log đầy đủ cho security audit
- **Password hashing**: bcrypt (cost ≥ 10)
- **Email enumeration prevention**: Không tiết lộ email tồn tại
- **HTTPS requirement**: Bắt buộc trong production
