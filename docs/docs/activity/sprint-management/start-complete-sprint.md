# Activity Start / Complete Sprint

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Start Sprint" or "Complete Sprint";

|S|
:(2) Verify user has MANAGER role;

if (Is Manager?) then (No)
  :(2.1) Display "Access denied" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display confirmation dialog;

|U|
:(4) Click "Confirm";

|S|
:(5) Update sprint status \n (IN_PROGRESS or COMPLETED);
:(6) Notify success;

|U|
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-start-complete-sprint" -->
