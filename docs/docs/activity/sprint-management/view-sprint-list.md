# Activity View Sprint List

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Sprints section;

|S|
:(2) Query all sprints for the project \n (with task count);

if (Check has sprints?) then (No)
  :(2.1) Display "No sprints created yet" notification \n with create sprint button;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display sprint list \n (name, status, goal, start/end date, task count);

|U|
:(4) Enter filter criteria \n (status: PLANNING/IN_PROGRESS/COMPLETED);
:(5) Click "Filter";

|S|
:(6) Apply filter criteria to query;

if (Has results?) then (No)
  :(6.1) Display "No results found" notification;
  |U|
else (Yes)
  |S|
  :(7) Display filtered sprint list \n (name, status, goal, start/end date, task count);
  |U|
endif

:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-view-sprint-list" -->
