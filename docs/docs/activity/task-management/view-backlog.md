# Activity View Backlog

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Backlog;

|S|
:(2) Query unassigned sprint tasks;
:(3) Display backlog list \n (task name, status, priority, assignee);

|U|
:(4) View backlog;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-view-backlog" -->
