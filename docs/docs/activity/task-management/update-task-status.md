# Activity Update Task Status

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Drag task card to new column \n or click status button;

|S|
:(2) Query current task status;
:(3) Verify new status is a valid transition \n (e.g. TODO → IN_PROGRESS → REVIEW → DONE);

if (Transition valid?) then (No)
  :(3.1) Display "Invalid status transition" error;
  |U|
  :(3.2) Confirm end;
  stop
else (Yes)
endif

|S|
:(4) Update task status \n (TODO / IN_PROGRESS / REVIEW / DONE) \n and position in column;

if (Status changed to DONE?) then (Yes)
  :(5a) Decrement assignee's current_workload;
elseif (Status changed away from DONE?) then (Yes)
  :(5b) Re-increment assignee's current_workload;
else (No change)
endif

:(6) Display updated kanban card in new column;

|U|
:(7) View updated board;
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-update-task-status" -->
