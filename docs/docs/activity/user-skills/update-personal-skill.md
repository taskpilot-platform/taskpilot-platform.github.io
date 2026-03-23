# Activity Update Personal Skill

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Edit" on a skill;

|S|
:(2) Display edit form \n (skill name read-only, level editable);

repeat
  |U|
  :(3) Change level;
  :(4) Click "Save";

  |S|
  :(5) Validate level range (1-5);
  backward: (5.1) Display validation error;
repeat while (Level valid?) is (No) not (Yes)

:(6) Update user_skill record;
:(7) Notify success;

|U|
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-skills-update-personal-skill" -->
