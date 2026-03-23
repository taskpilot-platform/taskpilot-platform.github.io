# Activity Register / Sign Up

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Access sign up page;

|S|
:(2) Display registration form;

repeat
  |U|
  :(3) Enter username, email, password \n and confirm password;
  :(4) Click "Sign Up";

  |S|
  :(5) Validate input format \n (username, email, password strength, \n passwords match);
  backward: (5.1) Display validation error;
repeat while (Format valid?) is (No) not (Yes)

:(5.2) Check email and username uniqueness;

if (Already registered?) then (Yes)
  :(5.3) Display "Email or username already in use" error;
  |U|
  :(5.4) Confirm end;
  stop
else (No)
endif

:(6) Create user record;
:(7) Hash password before storing;
:(8) Set initial status = AVAILABLE, workload = 0;
:(9) Generate JWT token and send welcome email;
:(10) Redirect to home page;

|U|
:(11) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-auth-register" -->
