# Activity Update Personal Information

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Select Edit Profile;

|S|
:(2) Query current user profile;

if (User found?) then (No)
  :(2.1) Display "Profile not found" error;
  |U|
  stop
else (Yes)
endif

:(3) Display edit form \n (full_name, email, avatar_url pre-filled);

repeat
  |U|
  :(4) Modify information;
  :(5) Click "Save";

  |S|
  :(6) Validate format and check email uniqueness;
  backward: (6.1) Display validation error;
repeat while (Data valid?) is (No) not (Yes)

:(7) Update user record;
:(7.1) Update session token with new profile data;
:(8) Notify success;

|U|
:(9) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-profile-update-personal-information" -->
