# ĐẶC TẢ CÁC USE CASE - INTERACTION & COMMUNICATION

Quản lý comments trên task. Mỗi comment thuộc một task và một user. User chỉ có thể sửa/xóa comment của chính mình.

---

## UC_COMMENT_01 – View Comments | Tác nhân: pm, mem | JWT + membership | Xem danh sách comments trên task

## UC_COMMENT_02 – Write Comment | Tác nhân: pm, mem | JWT + membership | Thêm comment mới vào task. Nội dung không rỗng. Post: Insert bản ghi comments.

## UC_COMMENT_03 – Edit Comment | Tác nhân: pm, mem | JWT + membership + ownership | Chỉ sửa comment của chính mình.

## UC_COMMENT_04 – Delete Comment | Tác nhân: pm, mem | JWT + membership + ownership | Chỉ xóa comment của chính mình. Hiển thị xác nhận.

---

| Use Case | Tên | Related Table |
|---|---|---|
| UC_COMMENT_01 | View Comments | comments |
| UC_COMMENT_02 | Write Comment | comments |
| UC_COMMENT_03 | Edit Comment | comments |
| UC_COMMENT_04 | Delete Comment | comments |
