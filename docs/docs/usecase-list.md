# TaskPilot System - Use Case List

Breakdown of use cases by Subsystem / Feature Group for system design and development.

> **Actor Notes:**
>
> - `ad`: System Administrator
> - `pm`: Project Manager
> - `mem`: Project Member

---

## I. Authentication (Auth)

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 1 | Login / Sign In | ad, pm, mem | users |
| 2 | Register / Sign Up | ad, pm, mem | users |
| 3 | Forgot Password | ad, pm, mem | users |
| 4 | Reset Password | ad, pm, mem | users |

---

## II. User Profile

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 5 | Update Personal Information (Name, Password) | ad, pm, mem | users |
| 6 | View User Profile | ad, pm, mem | users |
| 7 | Delete Personal Account | ad, pm, mem | users |

---

## III. User Skills

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 8 | View Personal Skill List | pm, mem | user_skills |
| 9 | View Personal Skill Details | pm, mem | user_skills |
| 10 | Add Personal Skill | pm, mem | user_skills |
| 11 | Update Personal Skill | pm, mem | user_skills |
| 12 | Delete Personal Skill | pm, mem | user_skills |

---

## IV. System Administration (Admin)

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 13 | Configure System Parameters (AI weights) | ad | system_settings |
| 14 | View System Skill Directory | ad | skills |
| 15 | Add System Skill | ad | skills |
| 16 | Edit System Skill | ad | skills |
| 17 | Delete System Skill | ad | skills |
| 18 | View Global User List | ad | users |
| 19 | Add System User | ad | users |
| 20 | Edit System User | ad | users |
| 21 | Delete System User | ad | users |

---

## V. Project Management

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 22 | View Joined Projects | pm, mem | projects, project_members |
| 23 | Create New Project | pm | projects |
| 24 | View Project Details / Summary | pm, mem | projects |
| 25 | Update Project Information | pm | projects |
| 26 | Join Project (via Link/Code) | pm, mem | project_members |
| 27 | Leave Project | pm, mem | project_members |
| 28 | Close / Archive Project | pm | projects |

---

## VI. Project Members

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 29 | View Project Member List | pm, mem | project_members |
| 30 | View Member Details | pm, mem | project_members |
| 31 | Add Member to Project | pm, mem | project_members |
| 32 | Update Member Role | pm | project_members |
| 33 | Remove Member from Project | pm, mem | project_members |

---

## VII. Sprint Management (Agile)

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 34 | View Sprint List | pm, mem | sprints |
| 35 | View Sprint Details | pm, mem | sprints |
| 36 | Create New Sprint | pm, mem | sprints |
| 37 | Update Sprint Information | pm, mem | sprints |
| 38 | Start / Complete Sprint | pm, mem | sprints |
| 39 | Delete Sprint (Move remaining tasks) | pm, mem | sprints |

---

## VIII. Task Management

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 40 | View Kanban Board | pm, mem | tasks |
| 41 | View Backlog | pm, mem | tasks |
| 42 | View Workload (Assigned tasks) | pm, mem | tasks, users |
| 43 | View Task Details | pm, mem | tasks |
| 44 | Create New Task / Sub-task | pm, mem | tasks |
| 45 | Update Task Information | pm, mem | tasks |
| 46 | Update Task Status (Drag & Drop Kanban) | pm, mem | tasks |
| 47 | Assign Assignee & Reporter | pm, mem | tasks, users, user_skills |
| 48 | Delete Task | pm, mem | tasks |

---

## IX. Interaction & Communication

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 49 | View Comments | pm, mem | comments |
| 50 | Write Comment | pm, mem | comments |
| 51 | Edit Comment | pm, mem | comments |
| 52 | Delete Comment | pm, mem | comments |

---

## X. Notification Management

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 53 | Receive Notification | ad, pm, mem | notifications |
| 54 | Mark Notification as Read | ad, pm, mem | notifications |

---

## XI. AI Assistant

| No. | Use-case Name | Actor | Related Table |
| :-- | :------------ | :---- | :------------ |
| 55 | Create New AI Chat Session | pm, mem | chat_sessions |
| 56 | Chat with AI (Send Request / Receive CoT) | pm, mem | chat_messages |
| 57 | View AI Chat History | pm, mem | chat_messages |
| 58 | View AI Activity Logs (Audit) | ad, pm, mem | ai_logs |
| 59 | Request AI Auto-Assignment | pm | tasks, system_settings |

---

**Total: 59 Use Cases across 11 Subsystems**
