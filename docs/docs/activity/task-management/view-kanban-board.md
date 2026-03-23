# Activity View Kanban Board

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Kanban Board;

|S|
:(2) Query tasks for the project/sprint;
:(3) Display kanban board \n (columns: TODO / IN_PROGRESS / REVIEW / DONE \n with task cards);

|U|
:(4) View kanban board;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-task-management-view-kanban-board" -->
