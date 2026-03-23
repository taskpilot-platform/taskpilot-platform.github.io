# Activity Create New Task / Sub-task

```plantuml
@startuml

|U|User
|S|System

|U|
start
:(1) Access project task board or backlog;

|S|
:(2) Display task list with "Create Task" button;

|U|
:(3) Click "Create Task";

|S|
:(4) Display form \n (title, description, status, priority, \n assignee, sprint, required_skills, \n parent_task for sub-task);

repeat
  |U|
  :(5) Enter task information;
  :(6) Click "Create";

  |S|
  :(7) Validate title not empty;
  backward: (7.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(8) Insert task record;
:(8.1) Set initial task history entry;
:(9) If assignee selected: update assignee's \n current_workload (+1);
:(10) Send notification to assignee if assigned;
:(11) Notify success and display task \n in Kanban/Backlog;

|U|
:(12) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-create-new-task" -->
