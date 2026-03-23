# Activity Add System Skill

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Click "Add Skill";

|S|
:(2) Display form (skill name);

repeat
  |A|
  :(3) Enter skill name;
  :(4) Click "Save";

  |S|
  :(5) Validate not empty and check uniqueness;
  backward: (5.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(6) Insert skill record;
:(7) Notify success and redirect to list;

|A|
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-add-system-skill" -->
