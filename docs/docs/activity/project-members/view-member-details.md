# Activity View Member Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a member;

|S|
:(2) Query member details;

if (Member found?) then (No)
  :(2.1) Display "Member not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display member details \n (name, email, role, skills, \n performance_score, workload);

|U|
:(4) View member details;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-members-view-member-details" -->
