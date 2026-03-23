# Activity Delete System Skill

```plantuml
@startuml
|A|Admin
|S|System

|A|
start

:(1) Select function Skill Directory;

|S|
:(2) Display skill list;

|A|
:(3) Click "Delete" on a skill;

|S|
:(4) Query skill details by skill_id;

if (Skill found?) then (No)
  :(4.1) Display "Skill not found" notification;
  |A|
  :(4.2) Confirm end;
  stop
else (Yes)
endif

:(5) Query count of users who have this skill \n in their profile (user_skills table);
:(6) Display confirmation dialog \n "Delete [skill name]? \n This will remove it from [N] user profiles. \n This action cannot be undone.";

|A|
if (Confirm or Cancel?) then (Cancel)
  |S|
  :(6.1) Close confirmation dialog;
  |A|
  :(6.2) Confirm end;
  stop
else (Confirm)
endif

|S|
:(7) Delete skill record \n (CASCADE to user_skills records);
:(8) Notify success and reload skill list;

|A|
:(9) View updated skill directory;
:(10) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-admin-delete-system-skill" -->
