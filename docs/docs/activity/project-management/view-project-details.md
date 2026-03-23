# Activity View Project Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on project name;

|S|
:(2) Check user is member of project;

if (User is member?) then (No)
  :(2.1) Display "Access denied" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

|S|
:(3) Query project info \n (name, description, status, \n heuristic_mode, start_date, end_date);
:(4) Query member count and sprint statistics \n (total sprints, active sprint info, \n sprint progress);
:(5) Display project details \n (name, description, status, heuristic_mode, \n dates, member count, active sprint info);

|U|
:(6) View project details;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-management-view-project-details" -->
