# Activity View Task Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a task;

|S|
:(2) Query task details;

if (Task found?) then (No)
  :(2.1) Display "Task not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query sub-tasks and comments;
:(4) Display task details \n (title, description, status, priority, \n assignee, reporter, dates, \n sub-tasks, comments);

|U|
:(5) View task details;
:(6) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-view-task-details" -->
