# Activity Join Project

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Access Projects page;

|S|
:(2) Display "Join Project" option;

|U|
:(3) Select Join Project;

|S|
:(4) Display form (invite link/code);

repeat
  |U|
  :(5) Enter invite code;
  :(6) Click "Join";

  |S|
  :(6.1) Validate invite code format;
  :(6.2) Query project by invite code;
  :(6.3) Check user is not already a member;
  backward: (6a) Display specific error \n (invalid format / project not found / \n already a member);
repeat while (All checks passed?) is (No) not (Yes)

:(7) Insert user into project_members (role=MEMBER);
:(7.1) Update user's project membership count;
:(8) Send project join notification to project manager;
:(9) Notify success and redirect to project page;

|U|
:(10) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-management-join-project" -->
