# Activity Delete Task

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Delete Task";

|S|
:(2) Verify user is project member \n (MANAGER role, or task reporter/assignee);

if (User authorized?) then (No)
  :(2.1) Display "Access denied" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

|S|
:(3) Check if task has sub-tasks;
:(4) Display confirmation dialog \n "Delete this task? \n Sub-tasks will also be deleted (N sub-tasks).";

|U|
:(5) Click "Confirm";

|S|
:(6) Delete task \n (CASCADE sub-tasks and comments);
:(7) Notify success and redirect \n to Kanban / Backlog view;

|U|
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-delete-task" -->
