# ĐẶC TẢ CÁC USE CASE - AI ASSISTANT

Tài liệu này mô tả các use case thuộc nhóm Trợ lý ảo AI (AI Assistant). AI Agent tích hợp khả năng hiểu ngữ nghĩa (NLU), thực thi hành động (Function Calling), và gợi ý thông minh (Recommendation) cho phân công task.

---

## UC_AI_01 – Create New AI Chat Session | Tác nhân: pm, mem | JWT required
Tạo phiên chat mới. Post: Insert chat_sessions (user_id, title, created_at).

## UC_AI_02 – Chat with AI (Send Request / Receive CoT) | Tác nhân: pm, mem | JWT + session ownership
Gửi tin nhắn → AI phân tích intent (NLU) → thực thi function calling hoặc trả lời → lưu message (USER + ASSISTANT) → ghi log ai_logs.
Post: Insert chat_messages (2 records), insert ai_logs.

## UC_AI_03 – View AI Chat History | Tác nhân: pm, mem | JWT + session ownership
Xem lịch sử các phiên chat và tin nhắn trong từng phiên. Chỉ xem session của chính mình.

## UC_AI_04 – View AI Activity Logs (Audit) | Tác nhân: ad, pm, mem | JWT + membership
Xem nhật ký hoạt động AI trong dự án: request, response, reasoning (chain-of-thought), action_taken, tool_output. Dùng cho audit và review.

## UC_AI_05 – Request AI Auto-Assignment | Tác nhân: pm | JWT + MANAGER role
PM yêu cầu AI gợi ý phân công. Thuật toán: Skill matching × Availability (workload) × Heuristic weights (system_settings). Kết quả: ranked list với scores. PM chấp nhận hoặc từ chối.

| Bước | PM | Hệ thống |
| ---- | -- | -------- |
| 1 | Click "AI Auto-Assign" | |
| 2 | | JWT + MANAGER check |
| 3 | | Lấy task required_skills, difficulty |
| 4 | | Lấy heuristic weights từ system_settings |
| 5 | | Query member skills + workloads |
| 6 | | AI tính matching score per member |
| 7 | | Log reasoning vào ai_logs |
| 8 | | Hiển thị ranked suggestion list |
| 9 | Accept/Reject | |
| 10 | | (Accept) Cập nhật assignee_id + workload |

---

| Use Case | Tên | Related Table |
|---|---|---|
| UC_AI_01 | Create New AI Chat Session | chat_sessions |
| UC_AI_02 | Chat with AI | chat_messages, ai_logs |
| UC_AI_03 | View AI Chat History | chat_messages |
| UC_AI_04 | View AI Activity Logs | ai_logs |
| UC_AI_05 | Request AI Auto-Assignment | tasks, system_settings |
