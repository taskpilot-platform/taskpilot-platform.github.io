# Sequence Delete Personal Account

```plantuml
@startuml
autonumber

actor User as U
boundary ProfileView as PV
control UserController as UC
entity USERS as US

U -> PV: Click "Delete Account"
activate U
activate PV

PV -> PV: Display confirmation dialog\n"Are you sure? This action cannot be undone."
activate PV
deactivate PV

U -> PV: Enter current password for confirmation
U -> PV: Click "Confirm Delete"
deactivate U

PV -> UC: Send delete account request
activate UC

break Password incorrect
  UC <-- US: Error
  PV <-- UC: Error notification
  PV -> PV: Display "Password incorrect" error
  activate PV
  deactivate PV
end

UC <-- US: Password verified
deactivate US

UC -> US: Delete user account and related data
activate US
US -> US: Delete user record (CASCADE)
activate US
deactivate US
UC <-- US: Account deleted
deactivate US

PV <-- UC: Success notification
deactivate UC

PV -> PV: Clear session
activate PV
deactivate PV

PV -> PV: Redirect to landing page\nwith "Account deleted" message
activate PV
deactivate PV

@enduml
```

<!-- diagram id="sequence-user-profile-delete-personal-account" -->
