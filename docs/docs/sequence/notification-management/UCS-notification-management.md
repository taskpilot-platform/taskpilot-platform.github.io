# ĐẶC TẢ CÁC USE CASE - NOTIFICATION MANAGEMENT

Quản lý thông báo trong hệ thống. Notifications được tạo tự động bởi system events (assigned task, deadline near, etc.). User chỉ xem/mark-read notification của chính mình.

---

## UC_NOTI_01 – Receive Notification | Tác nhân: ad, pm, mem | JWT required
Xem danh sách notifications, sắp xếp theo thời gian mới nhất. Highlight unread notifications. Type: SYSTEM, ASSIGNED, DEADLINE_NEAR.

## UC_NOTI_02 – Mark Notification as Read | Tác nhân: ad, pm, mem | JWT + ownership
Click vào notification → mark is_read = true → navigate to link_action (nếu có).

---

| Use Case | Tên | Related Table |
|---|---|---|
| UC_NOTI_01 | Receive Notification | notifications |
| UC_NOTI_02 | Mark Notification as Read | notifications |
