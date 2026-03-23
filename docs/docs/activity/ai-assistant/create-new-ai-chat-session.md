# Activity Create New AI Chat Session

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select AI Assistant section;

|S|
:(2) Query existing chat sessions for user \n (ordered by created_at DESC);
:(3) Display session list \n with "New Session" button;

|U|
:(4) Click "New Session";

|S|
:(5) Create new chat_session record \n (user_id, auto-generated title, created_at);
:(6) Display new empty chat interface \n (session title editable);

|U|
:(7) Start typing a message;
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-ai-assistant-create-new-ai-chat-session" -->
