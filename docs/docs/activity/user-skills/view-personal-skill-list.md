# Activity View Personal Skill List

```plantuml
@startuml
|U|User
|S|System

|U|
start
:(1) Access Skills page;

|S|
:(2) Query user skills \n (join user_skills and skills tables);
:(3) Display skill list (name, level);

|U|
:(4) View skill list;
:(5) Confirm end;

stop
@enduml
```

<!-- diagram id="activity-user-skills-view-personal-skill-list" -->
