# Activity Receive Notification

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click notification bell;

|S|
:(2) Query all notifications for user \n (ordered by created_at DESC);
:(3) Count unread notifications \n (is_read = false);
:(4) Display notification list \n (unread highlighted, read dimmed) \n with badge count;
:(5) Display notification items \n (title, message, type, is_read, \n created_at, link_action);

if (Has unread notifications?) then (Yes)
  :(5.1) Display "Mark all as read" button;
else (No)
endif

|U|
:(6) View notifications;
:(7) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-notification-management-receive-notification" -->
