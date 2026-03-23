# Activity View Project Member List

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Members section;

|S|
:(2) Query project members (join users);
:(3) Display member list \n (name, email, role, performance_score, status);

|U|
:(4) View member list;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-project-members-view-project-member-list" -->
