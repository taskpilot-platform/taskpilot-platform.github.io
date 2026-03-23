# Activity Create New AI Chat Session

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select AI Assistant from menu;

|S|
:(2) Query existing chat sessions for user \n (ordered by created_at DESC);
:(3) Display session list \n (session title, date, message count) \n with "New Chat" button;

|U|
:(4) Click "New Chat";

|S|
:(5) Query user's active projects \n (for optional project context);
:(6) Display new session form \n (optional: link to a project for context);

|U|
:(7) Optionally select a project context;
:(8) Click "Start";

|S|
:(9) Create new chat_session record \n (user_id, project_id if selected, \n auto-generated title, created_at);
:(10) Display new empty chat interface \n (session title editable, project context shown);

|U|
:(11) View new chat session;
:(12) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-ai-assistant-create-new-ai-chat-session" -->
