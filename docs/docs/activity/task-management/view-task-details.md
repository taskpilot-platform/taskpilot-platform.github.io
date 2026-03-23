# Activity View Task Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a task;

|S|
:(2) Query task details by task_id \n (title, description, status, priority, \n assignee, reporter, tags, \n difficulty_level, required_skills, \n start_date, end_date);

if (Task found?) then (No)
  :(2.1) Display "Task not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query sub-tasks \n (tasks where parent_id = task_id, \n ordered by created_at ASC);
:(4) Query comments for this task \n (join with users for author info, \n ordered by created_at ASC);
:(5) Display task details \n (title, description, status, priority, \n assignee, reporter, tags, difficulty_level, \n required_skills, dates, \n sub-tasks list, comments list, \n edit / delete / assign buttons);

|U|
:(6) View task details;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-view-task-details" -->
