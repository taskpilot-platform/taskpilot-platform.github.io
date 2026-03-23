# Activity View Workload

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Workload view;

|S|
:(2) Query workload data for all members;
:(3) Display workload chart \n (member name, current_workload, assigned tasks);

|U|
:(4) View workload chart;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-view-workload" -->
