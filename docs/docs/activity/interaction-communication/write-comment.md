# Activity Write Comment

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Write Comment on task;

|S|
:(2) Display comment input;

repeat
  |U|
  :(3) Enter comment text;
  :(4) Click "Submit";

  |S|
  :(5) Validate comment not empty;
  backward: (5.1) Display validation error;
repeat while (Content valid?) is (No) not (Yes)

:(6) Insert comment record;
:(7) Notify success and display new comment;

|U|
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-interaction-communication-write-comment" -->
