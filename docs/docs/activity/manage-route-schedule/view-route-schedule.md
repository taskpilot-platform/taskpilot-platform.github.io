# Activity View Route Schedule

````plantuml
@startuml
|SA|Staff/Admin
|S|System

|SA|
start

:(1) Select function View Route Schedule;

|S|
:(2) Query route information;

if (Check route exists?) then (No)
  :(2.1) Display "Route not found" notification;
  |SA|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query route attractions with details \n ORDER BY day, order_in_day;

if (Check schedule exists?) then (No)
  :(3.1) Display "No schedule available" notification \n with suggestion to add attractions;
  |SA|
  :(3.2) Confirm end;
  stop
else (Yes)
  |S|
endif

:(4) Group attractions by day;
:(5) Display route information \n (name, start/end location, duration, status, image);
:(6) Display schedule by day with attraction details;

if (Check actor is Admin?) then (Yes)
  :(6.1) Display action buttons (Add, Edit, Delete);
else (No)
  |S|
endif

|SA|
:(7) View schedule details;
:(8) Confirm end;

stop

@enduml
```<!-- diagram id="activity-manage-route-schedule-view-route-schedule" -->
````
