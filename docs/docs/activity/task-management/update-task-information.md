# Activity Update Task Information

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Edit" on a task;

|S|
:(2) Display edit form \n (title, description, priority, \n sprint, required_skills);

repeat
  |U|
  :(3) Modify task information;
  :(4) Click "Save";

  |S|
  :(5) Validate task data;
  backward: (5.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(6) Update task record;
:(7) Notify success;

|U|
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-update-task-information" -->
