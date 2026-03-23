# Activity View Global User List

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Access User Management;

|S|
:(2) Query all users \n (with role, status, workload);

if (Check has users?) then (No)
  :(2.1) Display "No users found" notification \n with invite action;
  |A|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display user list \n (name, email, role, status, workload);

|A|
:(4) Enter filter criteria \n (keyword: name/email, role: ADMIN/MANAGER/MEMBER, \n status: AVAILABLE/BUSY/OFFLINE);
:(5) Click "Filter";

|S|
:(6) Apply filter criteria to query;

if (Has results?) then (No)
  :(6.1) Display "No results found" notification;
  |A|
else (Yes)
  |S|
  :(7) Display filtered user list \n (name, email, role, status, workload);
  |A|
endif

:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-view-global-user-list" -->
