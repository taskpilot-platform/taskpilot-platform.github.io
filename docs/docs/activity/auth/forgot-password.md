# Activity Forgot Password

```plantuml
@startuml
|U|User
|S|System

|U|
start

:(1) Access forgot password page;

|S|
:(2) Display email input form;

repeat
  |U|
  :(3) Enter email;
  :(4) Click "Send Reset Link";

  |S|
  :(5) Validate email format;
repeat while (Check email format valid?) is (No) not (Yes)

:(6) Check user exists and not locked;

if (Check user exists and active?) then (No)
  :(6.1) Log warning but show success;
  :(7) Display generic success message;
  |U|
  :(8) Confirm end;
  stop
else (Yes)
endif

:(9) Generate reset token with 24h expiry;
:(10) Save token to database;
:(11) Send reset email to user;
:(12) Display generic success message;

|U|
:(13) Receive email;
:(14) Click reset link;

|S|
:(15) Validate reset token and expiry;

if (Check token valid?) then (No)
  :(15.1) Display "Invalid or expired token" error;
  |U|
  :(15.2) Confirm end;
  stop
else (Yes)
endif

:(16) Display password reset form;

repeat
  |U|
  :(17) Enter new password;
  :(18) Click "Reset Password";

  |S|
  :(19) Validate password format;
repeat while (Check password valid?) is (No) not (Yes)

:(20) Hash new password;
:(21) Update password and clear reset token;
:(22) Display success message;

|U|
:(23) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-auth-forgot-password" -->
