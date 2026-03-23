# Activity Add Member to Project

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Access Project Members page;

|S|
:(2) Display member list with "Add Member" button;

|U|
:(3) Click "Add Member";

|S|
:(4) Display form (user email, role selection);

repeat
  |U|
  :(5) Enter user email;
  :(6) Click "Add";

  |S|
  :(6.1) Check email format valid;
  :(6.2) Query user by email;
  :(6.3) Check user not already in project;
  backward: (6a) Display specific error \n (invalid format / user not found / \n already a member);
repeat while (All checks passed?) is (No) not (Yes)

:(7) Insert project_member record (role=MEMBER);
:(7.1) Update project member count;
:(8) Send project invitation notification to user;
:(9) Notify success and refresh member list;

|U|
:(10) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-members-add-member-to-project" -->
