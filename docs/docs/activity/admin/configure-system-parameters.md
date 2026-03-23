# Activity Configure System Parameters

```plantuml
@startuml
|A|Admin
|S|System

|A|
start
:(1) Access System Settings;

|S|
:(2) Verify admin privileges;

if (Is Admin?) then (No)
  :(2.1) Display "Access denied" error;
  |A|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query all settings;
:(4) Display config form \n (key_name, value_json, description, \n e.g. max_workload, ai_model, \n sprint_duration_days);

repeat
  |A|
  :(4) Modify setting value;
  :(5) Click "Save";

  |S|
  :(5) Validate JSON format;
  backward: (5.1) Display format error;
repeat while (JSON valid?) is (No) not (Yes)

:(6) Upsert settings record;
:(7) Reload active settings in memory \n (cache invalidation);
:(8) Notify success and display updated values;

|A|
:(9) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-configure-system-parameters" -->
