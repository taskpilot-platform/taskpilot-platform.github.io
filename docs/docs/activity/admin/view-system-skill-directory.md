# Activity View System Skill Directory

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Access Skill Directory;

|S|
:(2) Query all system skills;

if (Check has skills?) then (No)
  :(2.1) Display "No skills defined yet" notification \n with add skill button;
  |A|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display skill list \n (id, name);

|A|
:(4) Enter filter criteria \n (keyword: skill name);
:(5) Click "Filter";

|S|
:(6) Apply filter criteria to query;

if (Has results?) then (No)
  :(6.1) Display "No results found" notification;
  |A|
else (Yes)
  |S|
  :(7) Display filtered skill list \n (id, name);
  |A|
endif

:(8) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-view-system-skill-directory" -->
