# Activity View User Profile

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select "My Profile" from menu;

|S|
:(2) Query user info by user_id \n (full_name, email, avatar_url, \n role, status, current_workload);

if (User found?) then (No)
  :(2.1) Display "User not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query user's skill list \n (join user_skills + skills table, \n ordered by level DESC);
:(4) Query user's active project memberships \n (projects where user is member and \n project status != ARCHIVED);
:(5) Display profile page \n (full_name, email, avatar, role, status, \n current_workload, skills list, \n active projects list, \n edit profile / delete account buttons);

|U|
:(6) View profile details;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-profile-view-user-profile" -->
