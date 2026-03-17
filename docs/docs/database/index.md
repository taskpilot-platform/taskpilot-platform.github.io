# Database

```d2
vars: {
   d2-config: {
      layout-engine: elk
      theme-id: 3
   }
}

system_settings: {
   shape: sql_table
   key_name: varchar {constraint: PK}
   value_json: jsonb
   description: text
}

users: {
   shape: sql_table
   id: bigint {constraint: PK}
   email: varchar {constraint: UNQ}
   full_name: varchar
   password_hash: varchar
   avatar_url: text
   role: system_role {constraint: "enum(ADMIN,USER)"}
   status: user_status {constraint: "enum(AVAILABLE,BUSY,OOO)"}
   current_workload: int
   created_at: timestamp
   updated_at: timestamp
}

# THÊM MỚI BẢNG REFRESH TOKENS Ở ĐÂY
refresh_tokens: {
   shape: sql_table
   id: bigint {constraint: PK}
   token: varchar {constraint: UNQ}
   expiry_date: timestamp
   user_id: bigint {constraint: FK}
}

skills: {
   shape: sql_table
   id: bigint {constraint: PK}
   name: varchar {constraint: UNQ}
}

user_skills: {
   shape: sql_table
   user_id: bigint {constraint: [PK, FK]}
   skill_id: bigint {constraint: [PK, FK]}
   level: int
}

projects: {
   shape: sql_table
   id: bigint {constraint: PK}
   name: varchar
   description: text
   status: project_status {constraint: "enum(PLANNING,ACTIVE,COMPLETED,ARCHIVED)"}
   heuristic_mode: heuristic_mode {constraint: "enum(BALANCED,URGENT,TRAINING)"}
   start_date: date
   end_date: date
   created_at: timestamp
}

project_members: {
   shape: sql_table
   project_id: bigint {constraint: [PK, FK]}
   user_id: bigint {constraint: [PK, FK]}
   role: project_role {constraint: "enum(MANAGER,MEMBER)"}
   performance_score: float
   joined_at: timestamp
}

sprints: {
   shape: sql_table
   id: bigint {constraint: PK}
   project_id: bigint {constraint: FK}
   name: varchar
   goal: text
   status: sprint_status {constraint: "enum(PLANNING,ACTIVE,COMPLETED)"}
   heuristic_mode: heuristic_mode
   start_date: date
   end_date: date
}

tasks: {
   shape: sql_table
   id: bigint {constraint: PK}
   project_id: bigint {constraint: FK}
   parent_id: bigint {constraint: FK}
   sprint_id: bigint {constraint: FK}
   title: varchar
   description: text
   status: task_status {constraint: "enum(TODO,IN_PROGRESS,REVIEW,DONE)"}
   priority: priority_level {constraint: "enum(LOW,MEDIUM,HIGH,URGENT)"}
   position: float
   tags: "text[]"
   difficulty_level: int
   required_skills: jsonb
   assignee_id: bigint {constraint: FK}
   reporter_id: bigint {constraint: FK}
   start_date: timestamp
   due_date: timestamp
   created_at: timestamp
   updated_at: timestamp
}

comments: {
   shape: sql_table
   id: bigint {constraint: PK}
   task_id: bigint {constraint: FK}
   user_id: bigint {constraint: FK}
   content: text
   created_at: timestamp
}

notifications: {
   shape: sql_table
   id: bigint {constraint: PK}
   user_id: bigint {constraint: FK}
   title: varchar
   message: text
   type: notification_type {constraint: "enum(SYSTEM,ASSIGNED,DEADLINE_NEAR)"}
   is_read: boolean
   link_action: varchar
   created_at: timestamp
}

ai_logs: {
   shape: sql_table
   id: bigint {constraint: PK}
   project_id: bigint {constraint: FK}
   user_id: bigint {constraint: FK}
   chat_message_id: bigint {constraint: FK}
   request: text
   response: text
   reasoning: text
   action_taken: varchar
   tool_output: jsonb
   human_feedback: varchar
   created_at: timestamp
}

chat_sessions: {
   shape: sql_table
   id: bigint {constraint: PK}
   user_id: bigint {constraint: FK}
   title: varchar
   created_at: timestamp
}

chat_messages: {
   shape: sql_table
   id: bigint {constraint: PK}
   session_id: bigint {constraint: FK}
   sender: chat_sender {constraint: "enum(USER,ASSISTANT,SYSTEM)"}
   content: text
   created_at: timestamp
}

refresh_tokens.user_id -> users.id
user_skills.user_id -> users.id
user_skills.skill_id -> skills.id
project_members.project_id -> projects.id
project_members.user_id -> users.id
sprints.project_id -> projects.id
tasks.project_id -> projects.id
tasks.parent_id -> tasks.id
tasks.sprint_id -> sprints.id
tasks.assignee_id -> users.id
tasks.reporter_id -> users.id
comments.task_id -> tasks.id
comments.user_id -> users.id
notifications.user_id -> users.id
ai_logs.project_id -> projects.id
ai_logs.user_id -> users.id
ai_logs.chat_message_id -> chat_messages.id
chat_sessions.user_id -> users.id
chat_messages.session_id -> chat_sessions.id

```
