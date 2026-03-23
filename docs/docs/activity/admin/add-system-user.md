# Activity Add System User

```plantuml
@startuml

|A|Admin
|S|System

|A|
start
:(1) Access User Management;

|S|
:(2) Display user list with "Add User" button;

|A|
:(3) Click "Add User";

|S|
:(4) Display form (email, full name, password, role);

repeat
  |A|
  :(5) Enter user information;
  :(6) Click "Save";

  |S|
  :(7) Validate format and check email uniqueness;
  backward: (7.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(8) Hash password;
:(8.1) Verify password hash integrity;
:(9) Insert user (status=AVAILABLE, workload=0);
:(10) Send welcome email with credentials;
:(11) Notify success and display new user in list;

|A|
:(12) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-add-system-user" -->
