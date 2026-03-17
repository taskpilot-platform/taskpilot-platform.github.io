<!-- # Docs -->

# TaskPilot - Intelligent Project Management System with an AI Agent

## 1. Introduction

**TaskPilot** is a project management system that integrates an AI virtual assistant (AI Agent), built on Java Spring Boot with a Modular Monolith architecture. The platform supports Agile/Scrum workflows and improves management efficiency through intelligent automation.

## 2. Objectives

This project focuses on researching and implementing an AI Agent that serves as a virtual assistant with the following capabilities:

- **Natural Language Understanding (NLU)**: Interpret diverse user commands and extract intent.
- **Action Execution (Function Calling)**: Automatically invoke business functions to query or update data.
- **Intelligent Recommendation**: Suggest suitable team members for tasks based on real project data.

## 3. Scope

### Flexible Project and Task Management

The platform provides a complete digital workspace where Project Managers can create projects, set timelines, and invite members. Each task is tracked with detailed attributes such as assignee, reporter, deadline, priority, tags, difficulty level, and required skills.

### Progress Visualization with Kanban and Dashboard

An interactive Kanban Board allows drag-and-drop task movement across 4 status columns (TODO -> IN_PROGRESS -> REVIEW -> DONE). The Dashboard provides summary charts for task volume and completion progress.

### Smart Interaction Through the AI Agent

The core feature enables users to issue natural-language commands in a chat interface. The AI analyzes intent and automatically performs actions such as creating tasks, searching data, and updating status. It also applies a smart matching algorithm that combines skill fit and workload to recommend assignees.

### Skill Profile Management and System Configuration

Security is implemented with JWT authentication. Each user manages their own profile and skills, which act as key input for AI-based matching. Administrators can tune recommendation algorithm weights.

## 4. User Roles

| Actor                    | Responsibility                                                           | Use Cases                                  |
| ------------------------ | ------------------------------------------------------------------------ | ------------------------------------------ |
| **Project Manager** (pm) | Coordinate resources, assign tasks, monitor delivery, use AI auto-assign | [Use Case Diagram](./use-case/pm.html)     |
| **Member** (mem)         | Track assigned tasks, update progress, interact with AI chat             | [Use Case Diagram](./use-case/member.html) |
| **Administrator** (ad)   | Manage system settings, accounts, and AI weight configuration            | [Use Case Diagram](./use-case/admin.html)  |

## 5. Use Case Overview

The system includes **59 use cases** across **11 subsystems**:

| #    | Subsystem          | Use Cases                                          | Actor       |
| ---- | ------------------ | -------------------------------------------------- | ----------- |
| I    | Authentication     | Login, Register, Forgot/Reset Password             | ad, pm, mem |
| II   | User Profile       | View/Update Profile, Delete Account                | ad, pm, mem |
| III  | User Skills        | View/Add/Update/Delete Personal Skills             | pm, mem     |
| IV   | System Admin       | System Settings, Skill Directory, User Management  | ad          |
| V    | Project Management | Create/View/Update/Join/Leave/Archive Projects     | pm, mem     |
| VI   | Project Members    | View/Add/Update/Remove Members                     | pm, mem     |
| VII  | Sprint Management  | View/Create/Update/Start/Delete Sprints            | pm, mem     |
| VIII | Task Management    | Kanban, Backlog, Workload, CRUD Tasks, Assign      | pm, mem     |
| IX   | Interaction        | View/Write/Edit/Delete Comments                    | pm, mem     |
| X    | Notification       | Receive/Mark-as-Read Notifications                 | ad, pm, mem |
| XI   | AI Assistant       | Chat Sessions, Chat with AI, Logs, Auto-Assignment | pm, mem     |

📋 [Detailed Use Case List](/docs/usecase-list)

## 6. System Use Case Diagram

→ [System Overview Diagram](./use-case/system.html)

## 7. Technical Architecture

- **Backend**: Java Spring Boot (Modular Monolith)
- **Database**: PostgreSQL (13 tables)
- **Authentication**: JWT Token
- **AI Engine**: NLU + Function Calling + Heuristic Recommendation
- **Frontend**: React (Kanban Board, Dashboard, Chat UI)

Related documentation:

- [Database Schema](/docs/database/)
- [Function List](/docs/function-list/)
- [SRS](/docs/srs/)

## Notes

- Sequence diagrams are written in PlantUML.
- Each diagram has a unique `diagram id`.
- Use cases are grouped by subsystem.
- Sequence details are available in [Sequence](/docs/sequence/auth/login).
