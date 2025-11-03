# Activity Manage Profile

```plantuml
@startuml
|U|User
|S|System

|U|
start

:(1) Access profile settings;

|S|
:(2) Verify JWT token;

if (Check JWT valid?) then (No)
  :(2.1) Display error and redirect to sign in;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query user data;
:(4) Display profile form;

|U|
:(5) Choose action (Update Info / Change Password);

if (Action type?) then (Update Info)
  |U|
  :(6) Edit personal information;
  :(7) Click "Save";

  |S|
  repeat
    :(8) Validate data;
  repeat while (Check data valid?) is (No) not (Yes)

  :(9) Check email uniqueness;

  if (Check email available?) then (No)
    :(9.1) Display "Email already exists" error;
    |U|
  else (Yes)
    |S|
    :(10) Update user information;
    :(11) Display success message;

    if (Check email changed?) then (Yes)
      :(11.1) Send notification to old and new email;
    else (No)
    endif

    |U|
  endif

else (Change Password)
  |U|
  :(12) Enter current and new passwords;
  :(13) Click "Change Password";

  |S|
  repeat
    :(14) Validate password format;
  repeat while (Check format valid?) is (No) not (Yes)

  :(15) Verify current password;

  if (Check password correct?) then (No)
    :(15.1) Display "Incorrect password" error;
    |U|
  else (Yes)
    |S|
    :(16) Hash new password;
    :(17) Update password;
    :(18) Send confirmation email;
    :(19) Display success and redirect to sign in;
    |U|
  endif
endif

:(20) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-auth-manage-profile" -->
