# Activity Assign Assignee & Reporter

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Assign" on a task;

|S|
:(2) Query project members list \n (join users, user_skills);
:(3) Display assignment form \n (assignee dropdown showing workload, \n reporter dropdown);

|U|
:(4) Select assignee and/or reporter;

|S|
:(5) Check if selected assignee is overloaded \n (current_workload > threshold);

if (Assignee overloaded?) then (Yes)
  :(5.1) Display warning \n "This member is overloaded (workload: N)";
else (No)
endif

|U|
:(6) Click "Save";

|S|
:(7) Update task assignee_id and reporter_id;
:(8) Update assignee's current_workload \n (+1 if assigning, -1 if unassigning);
:(9) Notify success;

|U|
:(10) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-assign-assignee-reporter" -->
