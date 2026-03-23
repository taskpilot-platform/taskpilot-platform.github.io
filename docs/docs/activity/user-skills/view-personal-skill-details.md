# Activity View Personal Skill Details

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Click on a skill from list;

|S|
:(2) Query skill detail by user_id + skill_id;

if (Skill found?) then (No)
  :(2.1) Display "Skill not found" error;
  |U|
  :(2.2) Confirm end;
  stop
else (Yes)
endif

:(3) Display skill details (name, level 1-5);

|U|
:(4) View skill details;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-skills-view-personal-skill-details" -->
