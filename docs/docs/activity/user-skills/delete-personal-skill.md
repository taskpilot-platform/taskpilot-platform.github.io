# Activity Delete Personal Skill

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Delete" on a skill;

|S|
:(2) Display confirmation dialog;

|U|
:(3) Click "Confirm";

|S|
:(4) Delete user_skill record;
:(5) Update skill list and notify success;

|U|
:(6) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-skills-delete-personal-skill" -->
