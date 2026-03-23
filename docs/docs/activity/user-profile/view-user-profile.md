# Activity View User Profile

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Profile from menu;

|S|
:(2) Query user info by user_id \n (name, email, avatar, role, status, current_workload);

if (User found?) then (No)
  :(2.1) Display "User not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

|S|
:(3) Query user's skill list \n (join user_skills + skills table);
:(4) Query user's active project memberships \n (projects where user is member, status != CLOSED);
:(5) Display profile \n (name, email, avatar, role, status, \n current_workload, skills list, active projects);

|U|
:(6) View profile details;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-profile-view-user-profile" -->
