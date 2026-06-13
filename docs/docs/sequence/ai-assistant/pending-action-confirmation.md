# Sequence Pending Action Confirmation

This diagram documents the human-in-the-loop confirmation flow used when AI Copilot proposes a write action. The source is copied from the existing report diagram source rather than invented for the docs site.

```plantuml
@startuml
autonumber
hide footbox
skinparam backgroundColor white
skinparam sequence {
  ArrowColor #333333
  LifeLineBorderColor #777777
  LifeLineBackgroundColor #FFFFFF
  ParticipantBorderColor #777777
  ParticipantBackgroundColor #F7F7F7
  ActorBorderColor #555555
  ActorBackgroundColor #FFFFFF
}

actor User as U
boundary Frontend as FE
control AIController as AIC
control AIService as AIS
control PendingActionWorkflow as PAW
control DomainService as DS
database "Domain data" as DD
entity AI_LOGS as AL

U -> FE: Ask AI to perform a write action
activate U
activate FE

FE -> AIC: Send chat/tool request
activate AIC

AIC -> AIS: Analyze request and tool call
activate AIS

AIS -> PAW: Create pending action\nwith preview and params
activate PAW
PAW -> PAW: Store pending action\n(actionId, userId, sessionId, expiry)
activate PAW
deactivate PAW

PAW -> AL: Record pending action
activate AL
AL -> AL: Insert pending log
activate AL
deactivate AL
PAW <-- AL: Log saved
deactivate AL

AIS <-- PAW: actionId and summary
deactivate PAW
AIC <-- AIS: Pending action payload
deactivate AIS
FE <-- AIC: Confirmation required
deactivate AIC
U <-- FE: Show Confirm / Cancel

alt User confirms
  U -> FE: Confirm action
  FE -> AIC: POST /ai/actions/confirm
  activate AIC

  AIC -> PAW: Check ownership, session, expiry
  activate PAW
  PAW -> PAW: Validate action state
  activate PAW
  deactivate PAW

  PAW -> DS: Execute write action
  activate DS
  DS -> DD: Update domain data
  activate DD
  DD -> DD: Persist mutation
  activate DD
  deactivate DD
  DS <-- DD: Updated
  deactivate DD
  PAW <-- DS: Execution result
  deactivate DS

  PAW -> AL: Record confirmed result
  activate AL
  AL -> AL: Insert confirmation log
  activate AL
  deactivate AL
  PAW <-- AL: Log saved
  deactivate AL

  AIC <-- PAW: Success
  deactivate PAW
  FE <-- AIC: Success
  deactivate AIC
  U <-- FE: Show updated state
else User cancels
  U -> FE: Cancel action
  FE -> AIC: POST /ai/actions/cancel
  activate AIC

  AIC -> PAW: Mark action canceled
  activate PAW
  PAW -> PAW: Remove pending action
  activate PAW
  deactivate PAW

  PAW -> AL: Record cancellation
  activate AL
  AL -> AL: Insert cancellation log
  activate AL
  deactivate AL
  PAW <-- AL: Log saved
  deactivate AL

  AIC <-- PAW: Canceled
  deactivate PAW
  FE <-- AIC: Canceled
  deactivate AIC
  U <-- FE: Show canceled state
end

deactivate FE
deactivate U

@enduml
```

<!-- diagram id="sequence-ai-pending-action-confirmation" -->

Related docs: [SRS pending action confirmation](/docs/srs/#pending-action-confirmation), [AI chat UI](/docs/ui-specification#ai-chat), [Pending action confirmation UI](/docs/ui-specification#pending-action-confirmation).
