# Sequence Create New Task / Sub-task

```plantuml
@startuml
autonumber

actor User as U
boundary CreateTaskView as CTV
control TaskController as TC
entity PROJECT_MEMBERS as PM
entity TASKS as T

U -> CTV: Click "Create Task"
activate U
activate CTV

CTV -> TC: Initialize create (project_id, parent_id?)
activate TC
CTV <-- TC: Form ready ( kèm list members, tags...)
deactivate TC

CTV -> CTV: Display create task form\n(title, description, priority,\nsprint, tags, difficulty_level,\nrequired_skills, assignee, reporter,\nstart/due date)
activate CTV
deactivate CTV

U -> CTV: Enter task information
U -> CTV: Click "Create"
deactivate U

CTV -> CTV: Validate data (Frontend format check)
activate CTV
deactivate CTV

break Invalid data
    CTV -> CTV: Display validation errors
    activate CTV
    deactivate CTV
end

CTV -> TC: Send create request (task_data, current_user)
activate TC

' Bắt đầu validate Business Logic ở Backend
TC -> PM: Check Assignee & Reporter
activate PM
PM -> PM: Validate if users exist\nin project_id
activate PM
deactivate PM
TC <-- PM: Validation result
deactivate PM

break Users not in project
    CTV <-- TC: 400 Bad Request / Invalid Assignee
    CTV -> CTV: Display error message
    activate CTV
    deactivate CTV
end

' Nếu là tạo Sub-task thì check thêm Parent
alt parent_id is provided
    TC -> T: Check parent task exists
    activate T
    TC <-- T: Parent task data
    deactivate T
    
    break Parent task not found
        CTV <-- TC: 404 Parent Not Found
        CTV -> CTV: Display error message
        activate CTV
        deactivate CTV
    end
end

' Mọi thứ pass hết mới cho Insert
TC -> T: Insert new task
activate T
T -> T: Insert record (status = TODO, project_id)
activate T
deactivate T
TC <-- T: Task created
deactivate T

CTV <-- TC: Success notification (201 Created)
deactivate TC

CTV -> CTV: Display success and redirect
activate CTV
deactivate CTV

@enduml

<!-- diagram id="sequence-task-management-create-new-task" -->
