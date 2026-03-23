# Activity View Sprint Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a sprint from sprint list;

|S|
:(2) Query sprint details by sprint_id \n (name, goal, status, heuristic_mode, \n start_date, end_date);

if (Sprint found?) then (No)
  :(2.1) Display "Sprint not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query sprint's tasks \n (list with title, status, priority, assignee);
:(4) Count tasks by status \n (TODO / IN_PROGRESS / REVIEW / DONE);
:(5) Calculate sprint progress \n (% tasks in DONE status);
:(6) Display sprint details \n (name, goal, status, heuristic_mode, \n start/end date, task list, \n status breakdown, progress %);

|U|
:(7) View sprint details;
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-view-sprint-details" -->
