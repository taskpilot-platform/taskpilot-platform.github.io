# Activity Delete Comment

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click "Delete" on own comment;

|S|
:(2) Verify user is comment owner;

if (Is owner?) then (No)
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
:(5) Delete comment record;
:(6) Notify success;

|U|
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-interaction-communication-delete-comment" -->
