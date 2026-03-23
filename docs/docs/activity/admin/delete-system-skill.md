# Activity Delete System Skill

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Click "Delete" on a skill;

|S|
:(2) Check users using this skill;
:(3) Display confirmation \n (N users using this skill);

|A|
:(4) Click "Confirm";

|S|
:(5) Delete skill (CASCADE to user_skills);
:(6) Notify success;

|A|
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-delete-system-skill" -->
