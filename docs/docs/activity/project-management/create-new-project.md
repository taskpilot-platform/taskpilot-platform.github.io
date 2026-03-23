# Activity Create New Project

```plantuml
@startuml

|U|User
|S|System

|U|
start
:(1) Access Projects page;

|S|
:(2) Display project list with "Create Project" button;

|U|
:(3) Click "Create Project";

|S|
:(4) Display form \n (name, description, start/end date, heuristic_mode);

repeat
  |U|
  :(5) Enter project information;
  :(6) Click "Create";

  |S|
  :(7) Validate name not empty \n and start date before end date;
  backward: (7.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(8) Insert project (status=ACTIVE);
:(8.1) Initialize empty sprint backlog;
:(9) Add creator as MANAGER in project_members;
:(10) Generate default invite code for project;
:(11) Notify success and redirect to new project page;

|U|
:(12) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-management-create-new-project" -->
