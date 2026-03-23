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

:(3) Query current sprint status;
:(4) Verify valid status transition \n (PLANNING→IN_PROGRESS, IN_PROGRESS→COMPLETED);

if (Transition valid?) then (No)
  :(4.1) Display "Invalid status transition" error;
  |U|
  :(4.2) Confirm end;
  stop
else (Yes)
endif

:(5) Display confirmation dialog;

|U|
:(6) Click "Confirm";

|S|
:(7) Update sprint status \n (IN_PROGRESS or COMPLETED);
:(8) Notify success;

|U|
:(9) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-sprint-management-start-complete-sprint" -->
