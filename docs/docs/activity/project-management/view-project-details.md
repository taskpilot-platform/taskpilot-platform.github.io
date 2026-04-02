# Activity View Project Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on project name from project list;

|S|
:(2) Check user is member of project;

if (User is member?) then (No)
  :(2.1) Display "You are not a member of this project" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query project info \n (name, description, status, \n heuristic_mode, start_date, end_date, \n invite_code);
:(4) Query member count and user's role in project;
:(5) Query active sprint info \n (current sprint name, status, \n task completion %, start/end date);
:(6) Display project overview \n (name, description, status, heuristic_mode, \n dates, member count, user role, \n active sprint summary, invite code);

|U|
:(7) View project details;
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-management-view-project-details" -->
