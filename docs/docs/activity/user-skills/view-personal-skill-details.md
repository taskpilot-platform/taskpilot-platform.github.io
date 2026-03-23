# Activity View Personal Skill Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a skill from personal skill list;

|S|
:(2) Query user skill record \n (level, date added) \n by user_id + skill_id;

if (Skill found in profile?) then (No)
  :(2.1) Display "Skill not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Query system skill info by skill_id \n (name, description if available);
:(4) Display skill details \n (skill name, level 1–5, skill description, \n date added to profile, edit / delete buttons);

|U|
:(5) View skill details;
:(6) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-skills-view-personal-skill-details" -->
