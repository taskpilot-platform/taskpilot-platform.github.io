# Activity Update Sprint Information

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Edit" on a sprint;

|S|
:(2) Verify user has MANAGER role;

if (Is Manager?) then (No)
  :(2.1) Display "Access denied" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display edit form (name, dates);

repeat
  |U|
  :(4) Modify sprint information;
  :(5) Click "Save";

  |S|
  :(6) Validate sprint data;
  backward: (6.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(7) Update sprint record;
:(8) Notify success;

|U|
:(9) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-update-sprint-information" -->
