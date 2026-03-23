# Activity View AI Activity Logs

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Select AI Activity Logs;

|S|
:(2) Query AI logs \n (auto-assignment events, errors);
:(3) Display log list \n (event_type, timestamp, project, result);

|A|
:(4) View AI activity logs;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-ai-assistant-view-ai-activity-logs" -->
