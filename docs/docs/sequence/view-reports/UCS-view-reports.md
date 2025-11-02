# ĐẶC TẢ USE CASE - VIEW REPORTS

Tài liệu này mô tả use case xem báo cáo dành cho Quản trị viên (Admin).

---

## UC_REPORT_01: View Reports (Xem báo cáo)

### Mô tả

Quản trị viên xem các báo cáo thống kê về hoạt động kinh doanh của hệ thống, bao gồm doanh thu, đặt chỗ, tuyến du lịch phổ biến, và khách hàng.

### Tác nhân chính

- Admin

### Điều kiện tiên quyết

- Người dùng đã đăng nhập với vai trò Admin
- Hệ thống có dữ liệu để tạo báo cáo

### Điều kiện hậu

- Hiển thị báo cáo theo tiêu chí đã chọn với các biểu đồ và số liệu thống kê

### Luồng sự kiện chính

| Bước | Admin                           | Hệ thống                                                                                                                                                                                                                                                                                                                                                                                                        |
| ---- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | Chọn chức năng "View Reports"   |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 2    |                                 | Hiển thị trang báo cáo với các tùy chọn: <br>- Loại báo cáo (Doanh thu, Đặt chỗ, Tuyến phổ biến, Khách hàng) <br>- Khoảng thời gian (Ngày, Tuần, Tháng, Quý, Năm, Tùy chọn) <br>- Bộ lọc bổ sung (theo tuyến, trạng thái, v.v.)                                                                                                                                                                                 |
| 3    | Chọn loại báo cáo               |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 4    | Chọn khoảng thời gian           |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 5    | Áp dụng bộ lọc (tùy chọn)       |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 6    | Click "Tạo báo cáo"             |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 7    |                                 | Kiểm tra quyền truy cập (phải là Admin)                                                                                                                                                                                                                                                                                                                                                                         |
| 8    |                                 | Truy vấn dữ liệu theo loại báo cáo: <br>**Doanh thu:** <br>`SELECT DATE(tb.created_at) as date, SUM(i.total_amount) as revenue` <br>`FROM Tour_Booking tb JOIN Invoice i ON tb.id = i.booking_id` <br>`WHERE i.payment_status = 'PAID' AND tb.created_at BETWEEN :start_date AND :end_date` <br>`GROUP BY DATE(tb.created_at) ORDER BY date` <br>_(Các truy vấn khác tùy loại báo cáo - xem chi tiết bên dưới)_ |
| 9    |                                 | Tính toán các chỉ số thống kê: <br>- Tổng cộng (total) <br>- Trung bình (average) <br>- So sánh với kỳ trước (comparison) <br>- Phần trăm thay đổi (percentage change)                                                                                                                                                                                                                                          |
| 10   |                                 | Tạo biểu đồ và bảng dữ liệu                                                                                                                                                                                                                                                                                                                                                                                     |
| 11   |                                 | Hiển thị báo cáo với: <br>- Tiêu đề và thông tin khoảng thời gian <br>- Các chỉ số tổng quan (cards) <br>- Biểu đồ (line, bar, pie charts) <br>- Bảng dữ liệu chi tiết <br>- Nút xuất báo cáo (PDF, Excel)                                                                                                                                                                                                      |
| 12   | Xem và phân tích báo cáo        |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 13   | Click "Xuất báo cáo" (tùy chọn) |                                                                                                                                                                                                                                                                                                                                                                                                                 |
| 14   |                                 | Tạo file PDF hoặc Excel                                                                                                                                                                                                                                                                                                                                                                                         |
| 15   |                                 | Tải xuống file cho Admin                                                                                                                                                                                                                                                                                                                                                                                        |

### Luồng sự kiện phụ

**7a. Người dùng không có quyền Admin:**

- 7a.1. Hệ thống hiển thị thông báo: "Bạn không có quyền truy cập trang này"
- 7a.2. Chuyển hướng về trang chủ
- 7a.3. Kết thúc use case

**8a. Không có dữ liệu trong khoảng thời gian:**

- 8a.1. Hệ thống hiển thị thông báo: "Không có dữ liệu trong khoảng thời gian đã chọn"
- 8a.2. Hiển thị gợi ý thay đổi khoảng thời gian hoặc bộ lọc
- 8a.3. Quay lại bước 3

**14a. Lỗi khi tạo file:**

- 14a.1. Hệ thống hiển thị thông báo: "Không thể tạo file báo cáo. Vui lòng thử lại"
- 14a.2. Ghi log lỗi
- 14a.3. Cho phép Admin thử xuất lại

---

## Chi tiết các loại báo cáo

### 1. Báo cáo Doanh thu (Revenue Report)

**Dữ liệu hiển thị:**

- Tổng doanh thu theo ngày/tuần/tháng
- Doanh thu theo tuyến
- Doanh thu theo phương thức thanh toán
- So sánh với kỳ trước

**Truy vấn mẫu:**

```sql
-- Doanh thu theo thời gian
SELECT
    DATE(tb.created_at) as date,
    SUM(i.total_amount) as revenue,
    COUNT(DISTINCT tb.id) as booking_count,
    AVG(i.total_amount) as avg_revenue_per_booking
FROM Tour_Booking tb
JOIN Invoice i ON tb.id = i.booking_id
WHERE i.payment_status = 'PAID'
    AND tb.created_at BETWEEN :start_date AND :end_date
GROUP BY DATE(tb.created_at)
ORDER BY date;

-- Doanh thu theo tuyến
SELECT
    r.name as route_name,
    SUM(i.total_amount) as total_revenue,
    COUNT(DISTINCT tb.id) as booking_count
FROM Tour_Booking tb
JOIN Trip t ON tb.trip_id = t.id
JOIN Route r ON t.route_id = r.id
JOIN Invoice i ON tb.id = i.booking_id
WHERE i.payment_status = 'PAID'
    AND tb.created_at BETWEEN :start_date AND :end_date
GROUP BY r.id, r.name
ORDER BY total_revenue DESC
LIMIT 10;
```

### 2. Báo cáo Đặt chỗ (Booking Report)

**Dữ liệu hiển thị:**

- Số lượng đặt chỗ theo trạng thái
- Số lượng đặt chỗ theo thời gian
- Tỷ lệ hủy đặt chỗ
- Số ghế đã đặt trung bình

**Truy vấn mẫu:**

```sql
-- Thống kê đặt chỗ theo trạng thái
SELECT
    status,
    COUNT(*) as booking_count,
    SUM(seats_booked) as total_seats,
    SUM(total_price) as total_amount
FROM Tour_Booking
WHERE created_at BETWEEN :start_date AND :end_date
GROUP BY status;

-- Đặt chỗ theo thời gian
SELECT
    DATE(created_at) as date,
    COUNT(*) as booking_count,
    SUM(seats_booked) as total_seats
FROM Tour_Booking
WHERE created_at BETWEEN :start_date AND :end_date
GROUP BY DATE(created_at)
ORDER BY date;
```

### 3. Báo cáo Tuyến phổ biến (Popular Routes Report)

**Dữ liệu hiển thị:**

- Top tuyến có nhiều đặt chỗ nhất
- Top tuyến có doanh thu cao nhất
- Tỷ lệ lấp đầy (occupancy rate) theo tuyến
- Xu hướng đặt chỗ theo tuyến

**Truy vấn mẫu:**

```sql
-- Top tuyến phổ biến
SELECT
    r.id,
    r.name,
    r.start_location,
    r.end_location,
    COUNT(DISTINCT tb.id) as booking_count,
    SUM(tb.seats_booked) as total_seats_booked,
    SUM(i.total_amount) as total_revenue,
    AVG(t.total_seats) as avg_total_seats,
    ROUND(AVG(t.booked_seats * 100.0 / t.total_seats), 2) as occupancy_rate
FROM Route r
JOIN Trip t ON r.id = t.route_id
LEFT JOIN Tour_Booking tb ON t.id = tb.trip_id
LEFT JOIN Invoice i ON tb.id = i.booking_id AND i.payment_status = 'PAID'
WHERE t.departure_date BETWEEN :start_date AND :end_date
GROUP BY r.id, r.name, r.start_location, r.end_location
ORDER BY booking_count DESC
LIMIT 20;
```

### 4. Báo cáo Khách hàng (Customer Report)

**Dữ liệu hiển thị:**

- Số lượng khách hàng mới
- Top khách hàng có nhiều đặt chỗ nhất
- Top khách hàng có doanh thu cao nhất
- Phân tích hành vi khách hàng

**Truy vấn mẫu:**

```sql
-- Khách hàng mới
SELECT
    COUNT(*) as new_customers
FROM User
WHERE role = 'CUSTOMER'
    AND created_at BETWEEN :start_date AND :end_date;

-- Top khách hàng
SELECT
    u.id,
    u.full_name,
    u.email,
    COUNT(DISTINCT tb.id) as booking_count,
    SUM(i.total_amount) as total_spent,
    AVG(i.total_amount) as avg_order_value
FROM User u
JOIN Tour_Booking tb ON u.id = tb.user_id
JOIN Invoice i ON tb.id = i.booking_id
WHERE i.payment_status = 'PAID'
    AND tb.created_at BETWEEN :start_date AND :end_date
GROUP BY u.id, u.full_name, u.email
ORDER BY total_spent DESC
LIMIT 20;
```

---

## Quy tắc nghiệp vụ (Business Rules)

### BR_REPORT_01: Ràng buộc về quyền truy cập

- Chỉ Admin mới có quyền xem tất cả báo cáo
- Báo cáo luôn dựa trên dữ liệu đã được thanh toán (payment_status = 'PAID') trừ khi chỉ định khác

### BR_REPORT_02: Ràng buộc về khoảng thời gian

- Khoảng thời gian mặc định là 30 ngày gần nhất
- Khoảng thời gian tối đa là 2 năm
- Ngày bắt đầu phải nhỏ hơn ngày kết thúc

### BR_REPORT_03: Ràng buộc về hiển thị

- Dữ liệu được làm tròn đến 2 chữ số thập phân
- Tiền tệ hiển thị theo định dạng VNĐ
- Biểu đồ tự động chọn loại phù hợp với dữ liệu (line, bar, pie)

### BR_REPORT_04: Ràng buộc về xuất file

- File PDF: bao gồm logo, tiêu đề, ngày tạo, và tất cả biểu đồ
- File Excel: bao gồm nhiều sheet cho các bảng dữ liệu khác nhau
- Tên file theo format: `[loai-bao-cao]_[ngay-bat-dau]_[ngay-ket-thuc].pdf/xlsx`

### BR_REPORT_05: Ràng buộc về hiệu năng

- Báo cáo được cache trong 5 phút với cùng tham số
- Dữ liệu lớn (>10000 records) được phân trang
- Truy vấn timeout sau 30 giây

---

## Ghi chú bổ sung

### Trải nghiệm người dùng (UX Notes)

1. **Loading indicator**: Hiển thị progress bar khi đang tạo báo cáo
2. **Interactive charts**: Biểu đồ có thể click để xem chi tiết
3. **Filters persistence**: Lưu bộ lọc đã chọn trong session
4. **Quick date ranges**: Buttons cho "Hôm nay", "7 ngày qua", "30 ngày qua", "Tháng này", "Tháng trước"

### Tối ưu hóa hiệu năng

1. **Database indexing**: Index trên created_at, payment_status, status
2. **Aggregation pipeline**: Sử dụng materialized views cho dữ liệu thống kê
3. **Caching**: Redis cache cho báo cáo thường xem
4. **Async processing**: Xuất file lớn sử dụng background job

### Mở rộng tương lai

1. **Scheduled reports**: Tự động gửi báo cáo định kỳ qua email
2. **Custom reports**: Cho phép Admin tạo báo cáo tùy chỉnh
3. **Real-time dashboard**: Dashboard cập nhật real-time với WebSocket
4. **Comparative analysis**: So sánh nhiều khoảng thời gian cùng lúc
5. **Predictive analytics**: Dự đoán xu hướng bằng ML
