# Activity Edit System Skill

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Click "Edit" on a skill;

|S|
:(2) Query skill details by skill_id;

if (Skill found?) then (No)
  :(2.1) Display "Skill not found" error;
  |A|
  stop
else (Yes)
endif

:(3) Display edit form with current name;

repeat
  |A|
  :(4) Modify skill name;
  :(5) Click "Save";

  |S|
  :(6) Validate not empty and check uniqueness;
  backward: (6.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(7) Update skill record;
:(7.1) Propagate name update to task skill references;
:(8) Notify success and refresh skill list;

|A|
:(9) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-edit-system-skill" -->
