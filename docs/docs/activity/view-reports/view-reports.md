# Activity View Reports

````plantuml
@startuml
|A|Admin
|S|System

|A|
start

:(1) Select function View Reports;

|S|
:(2) Verify admin role;

if (Check user is Admin?) then (No)
  :(2.1) Display access denied notification \n and redirect to home;
  |A|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display report configuration form \n (report type, date range, filters);

repeat
  |A|
  :(4) Select report type \n (Revenue/Booking/Popular Routes/Customer);
  :(5) Select date range (Today/Last 7 days/etc.);
  :(6) Apply optional filters;
  :(7) Click "Generate Report" button;

  |S|
  :(8) Verify parameters valid;
repeat while (Check parameters valid?) is (No) not (Yes)

:(9) Query report data based on type and filters;

if (Check has data?) then (No)
  :(9.1) Display "No data available" notification \n with suggestion to change filters;
  |A|
  :(9.2) Confirm end;
  stop
else (Yes)
  |S|
endif

:(10) Calculate statistics \n (totals, averages, comparisons, % changes);
:(11) Generate charts (line/bar/pie);
:(12) Display report with overview cards, \n charts, data tables, and export buttons;

|A|
:(13) View and analyze report;

if (Check want to export?) then (Yes)
  :(14) Click "Export" button;

  |S|
  :(15) Generate file (PDF or Excel);

  if (Check export successful?) then (No)
    :(15.1) Display error notification;
    |A|
  else (Yes)
    |S|
    :(16) Download file;
    |A|
    :(17) Receive downloaded file;
  endif
  |A|
else (No)
endif

:(18) Confirm end;

stop

@enduml
```<!-- diagram id="activity-view-reports-view-reports" -->
````
