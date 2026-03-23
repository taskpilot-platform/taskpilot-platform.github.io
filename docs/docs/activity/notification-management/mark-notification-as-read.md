# Activity Mark Notification as Read

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click notification bell;

|S|
:(2) Display notification list;

|U|
if (Action?) then (Click specific notification)
  |S|
  :(3a) Fetch notification record;
  :(4a) Verify user owns notification \n (notification.user_id = current user);

  if (User is owner?) then (No)
    :(4a.1) Display "Access denied" error;
    |U|
    :(4a.2) Confirm end;
    stop
  else (Yes)
  endif

  |S|
  :(5a) Update notification is_read = true;
  :(6a) Navigate to link_action target;
else ("Mark all as read")
  |S|
  :(3b) Update all user's notifications \n (is_read = true);
  :(4b) Update notification badge to zero;
endif

|U|
:(7) View updated notifications;
:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-notification-management-mark-notification-as-read" -->
