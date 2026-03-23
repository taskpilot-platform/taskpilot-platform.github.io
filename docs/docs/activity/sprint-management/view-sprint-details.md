# Activity View Sprint Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a sprint;

|S|
:(2) Query sprint details;

if (Sprint found?) then (No)
  :(2.1) Display "Sprint not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query sprint's tasks;
:(4) Display sprint details \n (name, status, dates, task list);

|U|
:(5) View sprint details;
:(6) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-view-sprint-details" -->
