# Activity View Joined Projects

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Access Projects page;

|S|
:(2) Query projects user is member of \n (with role, member count, dates);

if (Check has projects?) then (No)
  :(2.1) Display "You have not joined any projects yet" \n notification with browse action;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display project list \n (name, status, role, start/end date, member count);

|U|
:(4) Enter filter criteria \n (keyword: project name, \n status: ACTIVE/COMPLETED/ARCHIVED);
:(5) Click "Filter";

|S|
:(6) Apply filter criteria to query;

if (Has results?) then (No)
  :(6.1) Display "No results found" notification;
  |U|
else (Yes)
  |S|
  :(7) Display filtered project list \n (name, status, role, start/end date, member count);
  |U|
endif

:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-management-view-joined-projects" -->
