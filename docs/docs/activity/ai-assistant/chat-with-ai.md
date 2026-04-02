# Activity Chat with AI

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Open AI Assistant;

|S|
:(2) Load available chat sessions;

|U|
if (Create new session?) then (Yes)
  :(2.1) Click "New Chat";
  |S|
  :(2.2) Create new chat session record;
else (No)
  :(2.3) Select existing session;
endif

|S|
:(3) Load session context \n (previous messages in session);
:(4) Display chat history and input area;

repeat
  |U|
  :(5) Enter message;
  :(6) Click "Send";

  |S|
  :(7) Validate message not empty;
  backward: (7.1) Display "Message cannot be empty" error;
  :(8) Save user message to chat_messages;
  :(9) Send to AI API \n (with session context and \n project context if relevant);
  :(10) Receive AI response and save to \n chat_messages;
  :(11) Display AI response;
  |U|
  :(12) Read AI response;
repeat while (Continue chatting?) is (Yes) not (No)

|U|
:(13) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-ai-assistant-chat-with-ai" -->
