# Activity Edit System User

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Click "Edit" on a user;

|S|
:(2) Query user info by user_id;

if (User found?) then (No)
  :(2.1) Display "User not found" error;
  |A|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display edit form \n (full_name, email, role, status);

repeat
  |A|
  :(4) Modify user information;
  :(5) Click "Save";

  |S|
  :(6) Validate and check email uniqueness;
  backward: (6.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(7) Update user record;
:(8) If email changed: send notification \n to user's new email;
:(9) Notify success and reload user details;

|A|
:(10) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-edit-system-user" -->
