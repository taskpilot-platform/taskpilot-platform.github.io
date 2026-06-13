---
outline: [2, 3]
---

# API Endpoints

TaskPilot backend uses Spring Boot with Springdoc OpenAPI. The backend config defines a TaskPilot OpenAPI document with JWT bearer authentication.

## Swagger / OpenAPI

| Item | Value |
| --- | --- |
| Local Swagger UI | `/swagger-ui/index.html` or `/swagger-ui.html` |
| Local OpenAPI JSON | `/v3/api-docs` |
| OpenAPI source | `taskpilot-infrastructure/src/main/java/com/taskpilot/infrastructure/config/OpenApiConfig.java` |
| Security scheme | HTTP bearer JWT named `bearerAuth` |
| Deployed Swagger URL | [Hugging Face Space Swagger UI](https://taskpilot952476-taskpilot.hf.space/swagger-ui/index.html#/) |

The Swagger/OpenAPI link reflects the demo deployment available at the time of report completion. Endpoint paths below are extracted from Spring controller annotations.

## Endpoint groups

| Group | Related use case group(s) |
| --- | --- |
| Authentication | Authentication |
| Users / Profile / Skills | User Profile, User Skills |
| Projects | Project Management, Project Members |
| Sprints | Sprint Management |
| Tasks / Kanban | Task Management |
| Comments / Mentions | Interaction & Communication |
| Notifications | Notification Management |
| AI Chat / Copilot | AI Assistant |
| Assignment Recommendation | AI Assistant, Task Management |
| Admin / System Settings | System Administration |

## Extracted endpoints

| Method | Path | Module | Description | Auth required |
| --- | --- | --- | --- | --- |
| GET | `/api/v1/admin/skills` | Admin - Skill Directory | View Directory | Yes |
| POST | `/api/v1/admin/skills` | Admin - Skill Directory | Add System Skill | Yes |
| DELETE | `/api/v1/admin/skills/{id}` | Admin - Skill Directory | Delete System Skill | Yes |
| GET | `/api/v1/admin/skills/{id}` | Admin - Skill Directory | View Skill Detail | Yes |
| PUT | `/api/v1/admin/skills/{id}` | Admin - Skill Directory | Edit System Skill | Yes |
| GET | `/api/v1/admin/settings` | Admin - System Settings | View Config | Yes |
| PUT | `/api/v1/admin/settings` | Admin - System Settings | Update Config | Yes |
| GET | `/api/v1/admin/users` | Admin - User Management | View Global User List | Yes |
| POST | `/api/v1/admin/users` | Admin - User Management | Add System User | Yes |
| DELETE | `/api/v1/admin/users/{id}` | Admin - User Management | Delete System User | Yes |
| GET | `/api/v1/admin/users/{id}` | Admin - User Management | View User Detail | Yes |
| PUT | `/api/v1/admin/users/{id}` | Admin - User Management | Edit System User | Yes |
| PUT | `/api/v1/admin/users/{id}/reset-password` | Admin - User Management | Reset User Password | Yes |
| POST | `/api/v1/ai/auto-assign` | AI Copilot | Request AI auto-assignment recommendations | Yes |
| GET | `/api/v1/ai/logs` | AI Copilot | View AI activity audit logs | Yes |
| PATCH | `/api/v1/ai/logs/{logId}/feedback` | AI Copilot | Update human feedback on an AI log (ACCEPTED / REJECTED) | Yes |
| GET | `/api/v1/ai/sessions` | AI Copilot | List all chat sessions for the current user | Yes |
| POST | `/api/v1/ai/sessions` | AI Copilot | Create a new AI chat session | Yes |
| DELETE | `/api/v1/ai/sessions/{sessionId}` | AI Copilot | Delete a chat session (and all its messages) | Yes |
| GET | `/api/v1/ai/sessions/{sessionId}` | AI Copilot | Get a specific chat session | Yes |
| GET | `/api/v1/ai/sessions/{sessionId}/messages` | AI Copilot | Get paginated message history for a session | Yes |
| GET | `/api/v1/ai/sessions/{sessionId}/stream` | AI Copilot | Stream AI chat response via SSE | Yes |
| POST | `/api/v1/ai/sessions/{sessionId}/stream` | AI Copilot | Stream AI chat response via SSE (POST body) | Yes |
| GET | `/api/v1/ai/sessions/{sessionId}/stream-status` | AI Copilot | Get latest stream processing phase for a chat session | Yes |
| PATCH | `/api/v1/ai/sessions/{sessionId}/title` | AI Copilot | Update session title | Yes |
| POST | `/api/v1/auth/forgot-password` | Authentication | Forgot Password | No |
| POST | `/api/v1/auth/login` | Authentication | User Login | No |
| POST | `/api/v1/auth/logout` | Authentication | User Logout | Yes |
| POST | `/api/v1/auth/refresh` | Authentication | Refresh Access Token | Refresh token |
| POST | `/api/v1/auth/register` | Authentication | Register new user | No |
| POST | `/api/v1/auth/reset-password` | Authentication | Reset Password | No |
| GET | `/api/v1/comments` | Comments / Mentions | Comments / Mentions | Yes |
| GET | `/api/v1/tasks/{taskId}/comments` | Comments / Mentions | Comments / Mentions | Yes |
| POST | `/api/v1/tasks/{taskId}/comments` | Comments / Mentions | Comments / Mentions | Yes |
| DELETE | `/api/v1/tasks/{taskId}/comments/{commentId}` | Comments / Mentions | Comments / Mentions | Yes |
| PUT | `/api/v1/tasks/{taskId}/comments/{commentId}` | Comments / Mentions | Comments / Mentions | Yes |
| GET | `/api/v1/tasks/{taskId}/comments/mention-candidates` | Comments / Mentions | Comments / Mentions | Yes |
| GET | `/api/v1/tasks/{taskId}/comments/stream` | Comments / Mentions | Comments / Mentions | Yes |
| PUT | `/api/v1/notifications/{notificationId}/read` | Notifications | Mark one notification as read | Yes |
| GET | `/api/v1/notifications/my` | Notifications | Get my notifications | Yes |
| GET | `/api/v1/notifications/my/stream` | Notifications | Stream my notifications | Yes |
| GET | `/api/v1/notifications/my/unread-count` | Notifications | Get unread notifications count | Yes |
| PUT | `/api/v1/notifications/read-all` | Notifications | Mark all notifications as read | Yes |
| GET | `/api/v1/users/me/skills` | Personal Skills | View List | Yes |
| POST | `/api/v1/users/me/skills` | Personal Skills | Add Skill | Yes |
| DELETE | `/api/v1/users/me/skills/{skill_id}` | Personal Skills | Delete Skill | Yes |
| GET | `/api/v1/users/me/skills/{skill_id}` | Personal Skills | View Detail | Yes |
| PUT | `/api/v1/users/me/skills/{skill_id}` | Personal Skills | Update Skill | Yes |
| GET | `/api/v1/users/me/skills/directory` | Personal Skills | View Skill Directory | Yes |
| POST | `/api/v1/projects` | Projects | Create project | Yes |
| DELETE | `/api/v1/projects/{projectId}` | Projects | Delete project | Yes |
| GET | `/api/v1/projects/{projectId}` | Projects | Get project detail | Yes |
| PUT | `/api/v1/projects/{projectId}` | Projects | Update project | Yes |
| POST | `/api/v1/projects/{projectId}/archive` | Projects | Archive project | Yes |
| DELETE | `/api/v1/projects/{projectId}/leave` | Projects | Leave project | Yes |
| GET | `/api/v1/projects/{projectId}/members` | Projects | Get project members | Yes |
| DELETE | `/api/v1/projects/{projectId}/members/{userId}` | Projects | Remove member | Yes |
| PUT | `/api/v1/projects/{projectId}/members/{userId}/role` | Projects | Update member role | Yes |
| POST | `/api/v1/projects/{projectId}/restore` | Projects | Restore project | Yes |
| GET | `/api/v1/projects/{projectId}/summary` | Projects | Get project summary | Yes |
| POST | `/api/v1/projects/join` | Projects | Join project | Yes |
| GET | `/api/v1/projects/my` | Projects | Get my projects | Yes |
| GET | `/api/v1/projects/{projectId}/backlog` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| GET | `/api/v1/projects/{projectId}/board` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| GET | `/api/v1/projects/{projectId}/sprints` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| POST | `/api/v1/projects/{projectId}/sprints` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| DELETE | `/api/v1/projects/{projectId}/sprints/{sprintId}` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| PUT | `/api/v1/projects/{projectId}/sprints/{sprintId}` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| POST | `/api/v1/projects/{projectId}/sprints/{sprintId}/complete` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| POST | `/api/v1/projects/{projectId}/sprints/{sprintId}/start` | Sprints / Backlog / Board | Sprints / Backlog / Board | Yes |
| GET | `/api/v1/skills/search` | System Skills | Search System Skills | Yes |
| GET | `/api/v1/tasks` | Tasks / Kanban | Tasks / Kanban | Yes |
| POST | `/api/v1/tasks` | Tasks / Kanban | Tasks / Kanban | Yes |
| DELETE | `/api/v1/tasks/{taskId}` | Tasks / Kanban | Tasks / Kanban | Yes |
| GET | `/api/v1/tasks/{taskId}` | Tasks / Kanban | Tasks / Kanban | Yes |
| PUT | `/api/v1/tasks/{taskId}` | Tasks / Kanban | Tasks / Kanban | Yes |
| PATCH | `/api/v1/tasks/{taskId}/kanban` | Tasks / Kanban | Tasks / Kanban | Yes |
| PATCH | `/api/v1/tasks/{taskId}/sprint` | Tasks / Kanban | Tasks / Kanban | Yes |
| GET | `/api/v1/tasks/{taskId}/subtasks` | Tasks / Kanban | Tasks / Kanban | Yes |
| GET | `/api/v1/projects/{projectId}/labels` | Tasks / Labels | Tasks / Labels | Yes |
| POST | `/api/v1/projects/{projectId}/labels` | Tasks / Labels | Tasks / Labels | Yes |
| DELETE | `/api/v1/projects/{projectId}/labels/{labelId}` | Tasks / Labels | Tasks / Labels | Yes |
| GET | `/api/v1/projects/{projectId}/timeline` | Timeline | Timeline | Yes |
| DELETE | `/api/v1/users/me` | User Profile | Delete Account | Yes |
| GET | `/api/v1/users/me` | User Profile | View Profile | Yes |
| PUT | `/api/v1/users/me` | User Profile | Update Info | Yes |
| POST | `/api/v1/users/me/avatar` | User Profile | Upload Avatar | Yes |
| PUT | `/api/v1/users/me/password` | User Profile | Change Password | Yes |

## Notes

- Exact request/response schemas should be inspected in Swagger UI or generated OpenAPI JSON.
- AI write actions proposed through tool calling are protected by pending action confirmation rather than direct execution.
- SSE endpoints are present for notification stream, comment stream and AI chat streaming.
