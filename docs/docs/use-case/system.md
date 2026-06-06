# Use Case Diagram - System Overview

```plantuml
@startuml
left to right direction
skinparam shadowing false
skinparam packageStyle rectangle
skinparam linetype ortho
skinparam actorStyle awesome
skinparam usecase {
  BackgroundColor white
  BorderColor #374151
}
skinparam rectangle {
  BorderColor #6B7280
}

actor "Admin" as Admin
actor "Project Manager" as PM
actor "Project Member" as Member
actor "System\n(External Services)" as SYS

rectangle "TaskPilot System" {

  package "Access & Identity" {
    usecase "Authenticate Account" as U_Auth
    usecase "Recover Password" as U_Recovery
    usecase "Manage Profile" as U_Profile
    U_Recovery ..> U_Auth : <<extend>>
  }

  package "Skills & Work Context" {
    usecase "Manage Personal Skills" as U_PSkills
    usecase "Manage System Skill Directory" as U_SkillDir
    usecase "Configure System Parameters" as U_Config
    usecase "Manage System Users" as U_SysUsers
  }

  package "Project Delivery" {
    usecase "Manage Projects" as U_Projects
    usecase "Manage Project Members" as U_Members
    usecase "Manage Sprints" as U_Sprints
    usecase "Manage Tasks / Kanban / Backlog" as U_Tasks
    usecase "Manage Comments" as U_Comments
    usecase "Manage Notifications" as U_Noti
  }

  package "AI Assistant" {
    usecase "Create AI Chat Session" as U_AI_Session
    usecase "Chat with AI Copilot" as U_AI_Chat
    usecase "View Chat History" as U_AI_History
    usecase "View AI Activity Logs" as U_AI_Logs
    usecase "AI Assignment Recommendation" as U_AI_Assign
    usecase "Pending Action Confirmation" as U_AI_Pending

    U_AI_Assign ..> U_AI_Chat : <<include>>
    U_AI_Pending ..> U_AI_Chat : <<extend>>
    U_AI_Pending ..> U_AI_Assign : <<extend>>
  }

  package "Overview by Actor" {
    usecase "Admin Workspace" as U_AdminWS
    usecase "Manager Workspace" as U_PMWS
    usecase "Member Workspace" as U_MemWS

    U_AdminWS ..> U_Auth : <<include>>
    U_AdminWS ..> U_Profile : <<include>>
    U_AdminWS ..> U_Config : <<include>>
    U_AdminWS ..> U_SkillDir : <<include>>
    U_AdminWS ..> U_SysUsers : <<include>>
    U_AdminWS ..> U_Noti : <<include>>
    U_AdminWS ..> U_AI_Logs : <<include>>

    U_PMWS ..> U_Auth : <<include>>
    U_PMWS ..> U_Profile : <<include>>
    U_PMWS ..> U_PSkills : <<include>>
    U_PMWS ..> U_Projects : <<include>>
    U_PMWS ..> U_Members : <<include>>
    U_PMWS ..> U_Sprints : <<include>>
    U_PMWS ..> U_Tasks : <<include>>
    U_PMWS ..> U_Comments : <<include>>
    U_PMWS ..> U_Noti : <<include>>
    U_PMWS ..> U_AI_Session : <<include>>
    U_PMWS ..> U_AI_Chat : <<include>>
    U_PMWS ..> U_AI_History : <<include>>
    U_PMWS ..> U_AI_Logs : <<include>>
    U_PMWS ..> U_AI_Assign : <<include>>
    U_PMWS ..> U_AI_Pending : <<include>>

    U_MemWS ..> U_Auth : <<include>>
    U_MemWS ..> U_Profile : <<include>>
    U_MemWS ..> U_PSkills : <<include>>
    U_MemWS ..> U_Projects : <<include>>
    U_MemWS ..> U_Tasks : <<include>>
    U_MemWS ..> U_Comments : <<include>>
    U_MemWS ..> U_Noti : <<include>>
    U_MemWS ..> U_AI_Session : <<include>>
    U_MemWS ..> U_AI_Chat : <<include>>
    U_MemWS ..> U_AI_History : <<include>>
    U_MemWS ..> U_AI_Logs : <<include>>
    U_MemWS ..> U_AI_Pending : <<include>>
  }
}

Admin -- U_AdminWS
PM -- U_PMWS
Member -- U_MemWS
SYS -- U_Noti
SYS -- U_AI_Chat

note right of U_Members
Project Member chi thao tac
khi duoc phan quyen quan ly du an
end note

note right of U_Sprints
Project Member chi thao tac
khi duoc phan quyen quan ly du an
end note

note bottom of U_Auth
Chi tiet UC dang nhap/dang ky/quen mat khau/dat lai mat khau
duoc trinh bay o use case chi tiet.
end note

@enduml
```

<!-- diagram id="use-case-system-overview" -->
