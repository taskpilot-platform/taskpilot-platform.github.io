# Activity View Comments

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) View task details page;

|S|
:(2) Query comments for the task \n (join with users for author info);

if (Check has comments?) then (No)
  :(2.1) Display "No comments yet" notification \n with add comment prompt;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display comment list \n (author, content, created_at);

:(4) Check if current user owns each comment;

if (Is comment owner?) then (Yes)
  :(4.1) Show edit and delete buttons \n alongside own comments;
  |U|
else (No)
  |U|
endif

:(5) View comments;
:(6) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-interaction-communication-view-comments" -->
