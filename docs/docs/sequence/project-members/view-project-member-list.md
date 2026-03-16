# Sequence View Project Member List

```plantuml
@startuml
autonumber

actor User as U
boundary MemberListView as MLV
control ProjectMemberController as PMC
entity PROJECT_MEMBERS as PM

U -> MLV: Access project members page
activate U
activate MLV

MLV -> PMC: Request member list (project_id)
activate PMC

PMC -> PMC: Extract user_id from JWT token
activate PMC
deactivate PMC

PMC -> PM: Check permission (user_id, project_id)
activate PM
PMC <-- PM: is_member (boolean)
deactivate PM

alt is_member == true
    PMC -> PM: Query all members of project
    activate PM
    PM -> PM: Query by project_id (join users)
    activate PM
    deactivate PM
    PMC <-- PM: Members data
    deactivate PM
    
    MLV <-- PMC: Member list
    
    MLV -> MLV: Display member list\n(name, email, role, performance_score)
    activate MLV
    deactivate MLV
    
else is_member == false
    MLV <-- PMC: 403 Forbidden / Unauthorized
    
    MLV -> MLV: Display access denied message
    activate MLV
    deactivate MLV
end

deactivate PMC
deactivate MLV
deactivate U

@enduml
```

<!-- diagram id="sequence-project-members-view-project-member-list" -->
