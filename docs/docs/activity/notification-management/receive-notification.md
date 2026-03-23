# Activity Receive Notification

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click notification bell \n (badge shows unread count);

|S|
:(2) Query all notifications for user \n (ordered by created_at DESC);
:(3) Count unread notifications \n (is_read = false);

if (Has notifications?) then (No)
  :(3.1) Display "No notifications" message;
  |U|
  :(3.2) Confirm end;
  stop
else (Yes)
endif

:(4) Display notification panel \n (unread items highlighted, read items dimmed, \n badge count updated);
:(5) Display each notification \n (title, message, type: TASK_ASSIGNED / \n SPRINT_STARTED / etc., \n created_at, is_read status);

if (Has unread?) then (Yes)
  :(5.1) Show "Mark all as read" button;
else (No)
endif

|U|
:(6) View notifications;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-notification-management-receive-notification" -->
