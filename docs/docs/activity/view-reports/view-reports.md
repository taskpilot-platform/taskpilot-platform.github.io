# Activity View Reports

````plantuml
@startuml
|A|Admin
|S|System

|A|
start

:(1) Select function View Reports;


:(2) Display report configuration form \n (report type, date range, filters);

repeat
  |A|
  :(3) Select report type \n (Revenue/Booking/Popular Routes/Customer);
  :(4) Select date range (Today/Last 7 days/etc.);
  :(5) Apply optional filters;
  :(6) Click "Generate Report" button;

  |S|
  :(7) Verify parameters valid;
repeat while (Check parameters valid?) is (No) not (Yes)

:(8) Query report data based on type and filters;

if (Check has data?) then (No)
  :(8.1) Display "No data available" notification \n with suggestion to change filters;
  |A|
  :(8.2) Confirm end;
  stop
else (Yes)
  |S|
endif

:(9) Calculate statistics \n (totals, averages, comparisons, % changes);
:(10) Generate charts (line/bar/pie);
:(11) Display report with overview cards, \n charts, data tables, and export buttons;

|A|
:(12) View and analyze report;

if (Check want to export?) then (Yes)
  :(13) Click "Export" button;

  |S|
  :(14) Generate file (PDF or Excel);

  if (Check export successful?) then (No)
    :(14.1) Display error notification;
    |A|
  else (Yes)
    |S|
    :(15) Download file;
    |A|
    :(16) Receive downloaded file;
  endif
  |A|
else (No)
endif

:(17) Confirm end;

stop

@enduml
```<!-- diagram id="activity-view-reports-view-reports" -->
````
