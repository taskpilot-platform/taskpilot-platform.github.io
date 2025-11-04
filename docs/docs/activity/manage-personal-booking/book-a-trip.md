# Activity Book a Trip

```plantuml
@startuml
|C|Customer
|S|System

|C|
start

:(1) View trip details;
:(2) Click book now button;

|S|
:(3) Verify authentication status;

if (Check user authenticated?) then (No)
  :(3.1) Display login required notification;

  |C|
  :(3.2) Perform login;

  |S|
else (Yes)
endif

:(4) Display booking form;

repeat
  |C|
  :(5) Enter number of adults and children;
  :(6) Enter passenger information;
  :(7) Submit booking information;

  |S|
  :(8) Verify booking data;

  if (Check data valid?) then (No)
    :(8.1) Display validation error;
    |C|
  else (Yes)
    |S|
    :(9) Verify seat availability;

    if (Check enough seats available?) then (No)
      :(9.1) Display insufficient seats notification;
      |C|
    else (Yes)
      |S|
      :(10) Calculate total price;
      :(11) Update booking data;
      :(12) Display success notification;
      :(13) Notify booking confirmation via email;

    endif
  endif
  :(14) Verify valid data and seats available;
  backward: (14.1) Display error notification;
repeat while (Check data valid and seats available?) is (No) not (Yes)

:(14) Confirm end;

stop

@enduml
```

<!-- diagram id="activity-manage-personal-booking-book-a-trip" -->
