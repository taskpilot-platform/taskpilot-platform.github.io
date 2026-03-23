# Activity View AI Chat History

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select AI Chat History;

|S|
:(2) Query all chat sessions for the user;
:(3) Display session list \n (title, date, message count);

|U|
:(4) Click on a session;

|S|
:(5) Display full conversation;

|U|
:(6) View conversation history;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-ai-assistant-view-ai-chat-history" -->
