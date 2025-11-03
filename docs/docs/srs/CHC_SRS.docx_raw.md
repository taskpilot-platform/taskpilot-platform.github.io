

**SOFTWARE REQUIREMENTS SPECIFICATION**

Child Health Care App

**Revision and Signoff Sheet**

**Change Record**

| Author | Version | Change reference | Date |
| ----- | ----- | ----- | ----- |
| Tuan-Thanh Phan | 0.1.0 | Initial creation  | 10/11/2023 |
| Tuan-Thanh Phan | 0.2.0 | Update appendixes  | 15/11/2023 |
| Tuan-Thanh Phan | 0.3.0 | Add introduction | 20/11/2023 |
| Tuan-Thanh Phan | 0.4.0 | Update non-functional and other requirements | 25/11/2023 |
| Tuan-Thanh Phan | 0.5.0 | Describe use case in details | 30/11/2023 |
| Tuan-Thanh Phan | 0.6.0 | Add sequence flow for use case description | 16/12/2023 |
| Tuan-Thanh Phan | 0.7.0 | Add activities flow and business rules for it | 23/12/2023 |
| Tuan-Thanh Phan | 0.8.0 | Complete requirement direction | 31/12/2023 |

**Reviewers**

| Name | Company | Version  | Position | Date |
| ----- | ----- | ----- | ----- | ----- |
| Trinh-Dong Nguyen | FPT | 0.1.0 | AD Team Lead | 11/11/2023 |
| Trinh-Dong Nguyen | FPT | 0.2.0 | AD Team Lead | 17/11/2023 |
| Trinh-Dong Nguyen | FPT | 0.3.0 | AD Team Lead | 22/11/2023 |
| Trinh-Dong Nguyen | FPT | 0.4.0 | AD Team Lead | 27/11/2023 |
| Trinh-Dong Nguyen | FPT | 0.5.0 | AD Team Lead | 2/12/2023 |
| Trinh-Dong Nguyen | FPT | 0.6.0 | AD Team Lead | 20/12/2023 |
| Trinh-Dong Nguyen | FPT | 0.7.0 | AD Team Lead | 30/12/2023 |
| Trinh-Dong Nguyen | FPT | 0.8.0 | AD Team Lead | 9/1/2024 |

Table of Contents

1\.	Introduction	[7](#table-of-contents)

1.1	Purpose	[7](#purpose)

1.2	Scope	[7](#scope)

1.3	Intended Audiences and Document Organization	[7](#intended-audiences-and-document-organization)

1.4	References	[8](#references)

2\.	Functional Requirements	[8](#functional-requirements)

2.1	Use Case Description	[8](#use-case-description)

2.1.1	Sign In Use Case	[8](#sign-in-use-case)

2.1.2	Adjust Doctor Use Case	[11](#adjust-doctor-use-case)

2.1.2.1	Adjust Doctor	[11](#adjust-doctor)

2.1.2.2	Create Doctor	[13](#use-case-description)

2.1.2.3	Update Doctor	[17](#update-doctor)

2.1.2.4	Delete Doctor	[23](#delete-doctor)

2.1.2.5	Search Doctor	[26](#search-doctor)

2.1.3	Adjust Parent Use Case	[28](#adjust-parent-use-case)

2.1.3.1	Adjust Parent	[28](#adjust-parent)

2.1.3.2	Create Parent	[30](#create-parent)

2.1.3.3	Update Parent	[34](#update-parent)

2.1.3.4	Delete Parent	[40](#delete-parent)

2.1.3.5	Search Parent	[43](#search-parent)

2.1.4	Adjust Document Use Case	[45](#adjust-document-use-case)

2.1.4.1	Adjust Document	[45](#adjust-document)

2.1.4.2	Create Document	[47](#create-document)

2.1.4.3	Update Document	[50](#update-document)

2.1.4.4	Delete Document	[55](#delete-document)

2.1.4.5	Search Document	[58](#search-document)

2.1.5	View User’s Report Use Case	[60](#view-user’s-report-use-case)

2.1.6	Supervise Prescription Use Case	[63](#supervise-prescription-use-case)

2.1.6.1	Supervise Prescription	[63](#supervise-prescription)

2.1.6.2	Create Prescription	[65](#create-prescription)

2.1.6.3	Update Prescription	[69](#update-prescription)

2.1.6.4	Delete Prescription	[75](#delete-prescription)

2.1.6.5	Search Prescription	[78](#search-prescription)

2.1.7	Supervise Immunization Schedule Use Case	[80](#supervise-immunization-schedule-use-case)

2.1.7.1	Supervise Immunization Schedule	[80](#supervise-immunization-schedule)

2.1.7.2	Create Immunization Schedule	[82](#create-immunization-schedule)

2.1.7.3	Update Immunization Schedule	[87](#update-immunization-schedule)

2.1.7.4	Delete Immunization Schedule	[92](#delete-immunization-schedule)

2.1.7.5	Search Immunization Schedule	[95](#search-immunization-schedule)

2.1.8	Supervise Child Use Case	[97](#supervise-child-use-case)

2.1.8.1	Supervise Child	[97](#supervise-child)

2.1.8.2	Create Child	[99](#create-child)

2.1.8.3	Update Child	[102](#update-child)

2.1.8.4	Delete Child	[107](#delete-child)

2.1.8.5	Search Child	[110](#search-child)

2.1.8.6	View Health Update History	[112](#view-health-update-history)

2.1.9	Chat Use Case	[115](#chat-use-case)

2.1.9.1	Chat	[115](#chat)

2.1.9.2	Create Chat	[117](#create-chat)

2.1.9.3	Reply Message	[119](#reply-message)

2.1.9.4	Delete Chat	[122](#delete-chat)

2.1.9.5	Search Chat	[125](#search-chat)

2.1.10	Monitor Child Health Status Use Case	[127](#monitor-child-health-status-use-case)

2.1.10.1	Monitor Child Health Status	[127](#monitor-child-health-status)

2.1.10.2	Monitor Child’s Events	[129](#monitor-child’s-events)

2.1.10.3	Monitor Child’s Meal Times	[132](#monitor-child’s-meal-times)

2.1.10.4	Monitor Child’s Sleep Times	[134](#monitor-child’s-sleep-times)

2.1.11	View Doctor Instruction Use Case	[136](#view-doctor-instruction-use-case)

2.1.11.1	View Doctor Instruction	[136](#view-doctor-instruction)

2.1.11.2	View Prescription	[137](#view-prescription)

2.1.11.3	View Immunization Schedule	[140](#view-immunization-schedule)

2.1.12	View Document Use Case	[143](#view-document-use-case)

2.1.13	Track Child Events Use Case	[146](#track-child-events-use-case)

2.1.13.1	Track Child Events	[146](#track-child-events)

2.1.13.2	Create Child Event	[148](#create-child-event)

2.1.13.3	Update Child Event	[152](#update-child-event)

2.1.13.4	Delete Child Event	[158](#delete-child-event)

2.1.13.5	Search Child Event	[161](#search-child-event)

2.1.14	Track Meal Times Use Case	[163](#track-meal-times-use-case)

2.1.14.1	Track Meal Times	[163](#track-meal-times)

2.1.14.2	Create Meal Time	[165](#create-meal-time)

2.1.14.3	Update Meal Time	[169](#update-meal-time)

2.1.14.4	Delete Meal Time	[175](#delete-meal-time)

2.1.14.5	Search Meal Time	[178](#search-meal-time)

2.1.15	Track Sleep Times Use Case	[180](#track-sleep-times-use-case)

2.1.15.1	Track Sleep Times	[180](#track-sleep-times)

2.1.15.2	View Sleep Time History	[182](#view-sleep-time-history)

2.1.15.3	Update Sleep Time	[184](#update-sleep-time)

2.1.16	Sign Up for Parent Use Case	[190](#sign-up-for-parent-use-case)

2.2	List Description	[194](#list-description)

2.3	View Description	[194](#view-description)

3\.	Non-functional Requirements	[194](#non-functional-requirements)

3.1	User Access and Security	[194](#user-access-and-security)

3.2	Performance Requirements	[195](#performance-requirements)

3.3	Implementation Requirements	[195](#implementation-requirements)

4\.	Other Requirements	[196](#other-requirements)

4.1	Archive Function	[196](#archive-function)

4.2	Security Audit Function	[196](#security-audit-function)

4.3	ChildHeathCare Sites	[196](#childheathcare-sites)

4.4	ChildHeathCare Lists	[197](#childheathcare-lists)

4.5	Custom Pages	[198](#custom-pages)

4.6	Scheduled Agents	[198](#scheduled-agents)

4.7	Technical Concern	[198](#technical-concern)

5\.	Appendixes	[198](#appendixes)

5.1	Glossary	[198](#glossary)

5.2	Mapping to Notes Application	[199](#mapping-to-notes-application)

5.3	Messages	[199](#messages)

5.4	Issues List	[200](#issues-list)

1. # **Introduction**

   1. ## **Purpose** {#purpose}

This Software Requirements Specification and Design document is to outline the software requirements for the "Building a Child Health Care App" project. This document provides a detailed technical foundation for the deployment, development, and operation of the mobile app and website on various platforms. It serves as a comprehensive guide for developers to plan, assign tasks, and implement the application. Additionally, testers will utilize this document to design test cases that align with the specified requirements, ensuring the final product meets quality standards and user expectations.

2. ## **Scope** {#scope}

This document covers the Child Health Care Application, which is part of the broader initiative to improve child health management through digital solutions.

3. ## **Intended Audiences and Document Organization** {#intended-audiences-and-document-organization}

This document is intended for:

* Development team: Responsible to develop detailed design, implement and perform unit test, integration test and system test for the migrated application.

* Data Migration team: Responsible for creating data migration scripts and performing data migration for the application.

* Documentation Team: Responsible for writing User Guide for the application.

* UAT team: Responsible for conducting user acceptance test sessions with end users.

Below are main sections of the document:

* **1\. Introduction**: This section describes the general introduction of this document.

* **2\. Functional Requirements**: This section describes the functional requirements in detail.

* **3\. Non-functional Requirements:** This section describes the non-functional requirements of this application such as user access and security, interfaces, screens, and performance.

* **4\. Other Requirements:** This section describes other requirements such as archive or security audit function.

* **5\. Appendixes**: This section describes other requirements for this application and other supporting information for this document**.**

* NOTE: Please refer to section 6.1 for all acronyms and abbreviations you may encounter within this document.

  4. ## **References** {#references}

| \# | Title | Version | File Name / Link | Description |
| :---- | :---- | :---- | :---- | :---- |
| 1 | User Interface | 0.2.0 | [Link Figma](https://www.figma.com/file/wfLzvdcBdVF93qsQDap0Ug/Child-Heath-Care-App?type=design&node-id=0%3A1&mode=design&t=F8yPVCyEL9WzTbWy-1) | Demo high fidelity user interface |
| 2 | List Description | 0.1.0 | [List Description](https://docs.google.com/spreadsheets/d/12pebLWNzOPKNrp7vxsM0F_Pjz-t4UlBd/edit?usp=sharing&ouid=113501547392927788195&rtpof=true&sd=true) | Description of list in the system |
| 3 | View Description | 0.1.0 | [View Description](https://docs.google.com/spreadsheets/d/1HQO1TrThuybBoEOO-bhkHMX_US9A19pj/edit?usp=drive_link&ouid=113501547392927788195&rtpof=true&sd=true) | Description of view/screen in the system |
| 4 | DB Sheet | 0.1.0 | [DB Sheet](https://docs.google.com/spreadsheets/d/10tdZEAt8wQPeb0exBtucTdgUfLLpRNZH/edit?usp=sharing&ouid=113501547392927788195&rtpof=true&sd=true) | Description of table to store data in database |

2. # **Functional Requirements** {#functional-requirements}

   1. ## **Use Case Description** {#use-case-description}

      1. ### *Sign In Use Case* {#sign-in-use-case}

##### Use Case Description

| Name | Sign In  |
| :---- | :---- |
| **Description** | This use case allows the users to sign in into the system using their account. |
| **Actor** | Admin, Doctor, Parent |
| **Trigger** | When the user clicks on the “Sign In” button on the corresponding screen. |
| **Pre-condition** | User’s device must be connected to the internet. User’s account must have been in the system. |
| **Post-condition** | User is signed in the system. |

##### Sequence Flow

![][image1]

##### Activities Flow

![][image2]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Sign In” screen. (Refer to “Sign In” view in “View Description” file) |
| (4) | BR2 | **Validation Rules:** When user click button “Sign In” on the screen. The system will use method ValidateInput(username, password) to check event that the input is valid (empty or not) with parameter of \[txtBoxUsername\].Text and \[txtBoxPassword\].Text. If the input is not valid, the system moves to step (4.1) and displays an error message (Refer to MSG 1).  Else system moves to step (4.2) and send input data to the database by function SignIn (username, password) to check data in the database if it exists in the system. |
| (5) | BR3 | **Validation Rules:** The input data (username and password) will be checked by table “ACCOUNT” in the database (Refer to “Account” table in “DB Sheet” file) if it exists in the system. If the account is not correct, the system moves to step (5.1) and calls function displayErrorMessage() to display an error message (Refer to MSG 2). Else system moves to step (5.2) and displays a successful message MSG3, close this “Sign In” screen by method Close() and redirect to “Home Screen” view. (Refer to “Home Screen” view in the “View Description” file).  |

2. ### *Adjust Doctor Use Case* {#adjust-doctor-use-case}

   1. #### Adjust Doctor  {#adjust-doctor}

##### Use Case Description

| Name | Adjust Doctor  |
| :---- | :---- |
| **Description** | This use case allows the admin to choose one of the corresponding functions of CRUD to adjust doctor information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Doctor” button on the left navigation sidebar. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The doctor information is updated to the corresponding function that the admin executes. |

##### Sequence Flow

![][image3]

##### Activities Flow

![][image4]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Doctor Management” screen. (Refer to “Doctor Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Admin can only choose one feature at a time to use. |

2. #### Create Doctor 

##### Use Case Description

| Name | Create Doctor  |
| :---- | :---- |
| **Description** | This use case allows the admin to create a new doctor information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Add new doctor” button on the top left of datagrid in the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The doctor information will be stored into the system and display new record on datagrid. |

##### Sequence Flow

![][image5]

##### Activities Flow

![][image6]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Doctor Information” screen. (Refer to “Doctor Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the admin enters doctor information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[txtBoxName\], \[txtBoxEmail\], \[txtBoxPhone\] and \[txtBoxSpeciality\].  If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) If one of the txtBox.text is in the wrong format (E.g: \[txtBoxPhone\] but enter letters, or \[txtBoxEmail\] but not in the correct format ..@... Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4\) |
| (5) | BR3 | **Validation Rules:** When the admin clicks the “Save” button for saving data of doctor information. System will move to step (4) to send data to database by method SaveDoctorInformation(Doctor doctor) with parameter “doctor” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message. If \[Doctor.Email\] or \[Doctor.Phone\] is already registered in the system, the system displays an error message. (Refer to MSG 5 or MSG 6 corresponding to each field) Else data of the doctor information will be stored as a new record in table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Doctor Information” screen and display a list with updated data on the datagrid. |

3. #### Update Doctor {#update-doctor}

##### Use Case Description

| Name | Update Doctor |
| :---- | :---- |
| **Description** | This use case allows the admin to update existing doctor information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The doctor information will be updated in the system and display new record on datagrid. |

##### Sequence Flow

![][image7]

##### Activities Flow

![][image8]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file) with syntax “SELECT \* FROM Doctor WHERE doctorID \= \[Doctor.ID\]“ with \[Doctor.ID\] is retrieved from the item clicked on the datagrid. After retrieving data from the database, the system call method displayDoctorInformationScreen(Doctor doctor) with Doctor is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Doctor Information” screen (Refer to “Doctor Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR3 | **Validation Rules:** When the admin enters doctor information on the screen. The system will use the Text\_change() method to check whether the input is valid (empty, wrong format or not). These fields include: \[txtBoxName\], \[txtBoxEmail\], \[txtBoxPhone\] and \[txtBoxSpeciality\].  If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1). If one of the txtBox.text is in the wrong format (E.g: \[txtBoxPhone\] but enter letters, or \[txtBoxEmail\] but not in the correct format ..@... Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4). |
| (8) | BR4 | **Validation Rules:** When the admin clicks the “Save” button for saving data of doctor information. System will move to step (7) to send data to the database by method SaveDoctorInformation(Doctor doctor) with parameter “doctor” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file) to check if there is any constraints.  If the input is not valid: System moves to step (8.1) to display an error message. If \[Doctor.Email\] or \[Doctor.Phone\] is already registered in the system, the system displays an error message. (Refer to MSG 5 or MSG 6 corresponding to each field) Else data of the doctor information will be stored as a new record in table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Doctor Information” screen and display a list with updated data on the datagrid. |

4. #### Delete Doctor {#delete-doctor}

##### Use Case Description

| Name | Delete Doctor |
| :---- | :---- |
| **Description** | This use case allows the admin to delete a doctor information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Delete\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The doctor information will be removed from the system and display data change on datagrid. |

##### Sequence Flow

![][image9]

##### Activities Flow

![][image10]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Admin select the corresponding button to process the next step. If the admin clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else admin clicks “Confirm” button, use case moves to step (3) and call method DeleteDoctor(Doctor doctor) to process deleting request with Doctor is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the doctor information will be deleted in table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and displays a list with updated data on the datagrid. |

5. #### Search Doctor {#search-doctor}

##### Use Case Description

| Name | Search Doctor |
| :---- | :---- |
| **Description** | This use case allows the admin to search doctor information in the system based on input keywords. |
| **Actor** | Admin |
| **Trigger** | When admin enter searching keywords in the \[SearchBox\] on the top left of the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The datagrid of doctor information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image11]

##### Activities Flow

![][image12]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the admin enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “DOCTOR” in the database (Refer to “Doctor” table in “DB Sheet” file) with syntax “SELECT \* FROM Doctor WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Doctor Management” screen (Refer to “Doctor Management” view in “View Description” file) with data on the datagrid that is updated according to the entered keywords. |

3. ### *Adjust Parent Use Case* {#adjust-parent-use-case}

   1. #### Adjust Parent {#adjust-parent}

##### Use Case Description

| Name | Adjust Parent  |
| :---- | :---- |
| **Description** | This use case allows the admin to choose one of the corresponding functions of CRUD to adjust parent information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Parent” button on the left navigation sidebar. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The parent information is updated to the corresponding function that the admin executes. |

##### Sequence Flow

![][image13]

##### Activities Flow

![][image14]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Parent Management” screen. (Refer to “Parent Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Admin can only choose one feature at a time to use. |

2. #### Create Parent {#create-parent}

##### Use Case Description

| Name | Create Parent  |
| :---- | :---- |
| **Description** | This use case allows the admin to create a new parent information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Add new parent” button on the top left of datagrid in the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The parent information will be stored into the system and display new record on datagrid. |

##### Sequence Flow

![][image15]

##### Activities Flow

![][image16]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Parent Information” screen. (Refer to “Parent Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the admin enters parent information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[txtBoxName\], \[txtBoxEmail\], \[txtBoxPhone\] and \[txtBoxAddress\].  If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) If one of the txtBox.text is in the wrong format (E.g: \[txtBoxPhone\] but enter letters, or \[txtBoxEmail\] but not in the correct format ..@... Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4\) |
| (5) | BR3 | **Validation Rules:** When the admin clicks the “Save” button for saving data of parent information. System will move to step (4) to send data to the database by method SaveParentInformation(Parent parent) with parameter “parent” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message. If \[Parent.Email\] or \[Parent.Phone\] is already registered in the system, the system displays an error message. (Refer to MSG 5 or MSG 6 corresponding to each field) Else data of the parent information will be stored as a new record in table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Parent Information” screen and display a list with updated data on the datagrid. |

3. #### Update Parent  {#update-parent}

##### Use Case Description

| Name | Update Parent |
| :---- | :---- |
| **Description** | This use case allows the admin to update existing parent information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The parent information will be updated in the system and display new records on datagrid. |

##### Sequence Flow

![][image17]

##### Activities Flow

![][image18]

##### 

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file) with syntax “SELECT \* FROM Parent WHERE parentID \= \[Parent.ID\]“ with \[Parent.ID\] is retrieved from the item clicked on the datagrid. After retrieving data from the database, the system call method displayParentInformationScreen(Parent parent) with Parent is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Parent Information” screen (Refer to “Parent Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR3 | **Validation Rules:** When the admin enters parent information on the screen. The system will use the Text\_change() method to check whether the input is valid (empty, wrong format or not). These fields include: \[txtBoxName\], \[txtBoxEmail\], \[txtBoxPhone\] and \[txtBoxAddress\].  If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1). If one of the txtBox.text is in the wrong format (E.g: \[txtBoxPhone\] but enter letters, or \[txtBoxEmail\] but not in the correct format ..@... Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4). |
| (8) | BR4 | **Validation Rules:** When the admin clicks the “Save” button for saving data of parent information. System will move to step (7) to send data to the database by method SaveParentInformation(Parent parent) with parameter “parent” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file) to check if there is any constraints.  If the input is not valid: System moves to step (8.1) to display an error message. If \[Parent.Email\] or \[Parent.Phone\] is already registered in the system, the system displays an error message. (Refer to MSG 5 or MSG 6 corresponding to each field) Else data of the parent information will be stored as a new record in table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Parent Information” screen and display a list with updated data on the datagrid. |

4. #### Delete Parent {#delete-parent}

##### Use Case Description

| Name | Delete Parent |
| :---- | :---- |
| **Description** | This use case allows the admin to delete a parent information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Delete\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The parent information will be removed from the system and display data change on datagrid. |

##### Sequence Flow

![][image19]

##### Activities Flow

![][image20]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Admin select the corresponding button to process the next step. If the admin clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else admin clicks “Confirm” button, use case moves to step (3) and call method DeleteParent(Parent parent) to process deleting request with Parent is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the parent information will be deleted in table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and displays a list with updated data on the datagrid. |

5. #### Search Parent {#search-parent}

##### Use Case Description

| Name | Search Parent |
| :---- | :---- |
| **Description** | This use case allows the admin to search parent information in the system based on input keywords. |
| **Actor** | Admin |
| **Trigger** | When admin enter searching keywords in the \[SearchBox\] on the top left of the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The datagrid of parent information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image21]

##### Activities Flow

![][image12]

##### Business Rules 

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the admin enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “PARENT” in the database (Refer to “Parent” table in “DB Sheet” file) with syntax “SELECT \* FROM Parent WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Parent Management” screen (Refer to “Parent Management” view in “View Description” file) with data on the datagrid that is updated according to the entered keywords. |

4. ### *Adjust Document Use Case* {#adjust-document-use-case}

   1. #### Adjust Document {#adjust-document}

##### Use Case Description

| Name | Adjust Document  |
| :---- | :---- |
| **Description** | This use case allows the admin to choose one of the corresponding functions of CRUD to adjust document information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Document” button on the left navigation sidebar. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The document information is updated to the corresponding function that the admin executes. |

##### Sequence Flow

![][image22]

##### Activities Flow

![][image23]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Document Management” screen. (Refer to “Document Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Admin can only choose one feature at a time to use. |

2. #### Create Document {#create-document}

##### Use Case Description

| Name | Create Document  |
| :---- | :---- |
| **Description** | This use case allows the admin to create a new document information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the “Add new document” button on the top left of datagrid in the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The document information will be stored into the system and display new record on datagrid. |

##### Sequence Flow

![][image24]

##### Activities Flow

![][image25]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Document Information” screen. (Refer to “Document Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the admin enters document information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[txtBoxTitle\], \[richTxtBoxContent\] and \[PictureBox\]. If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (5) | BR3 | **Validation Rules:** When the admin clicks the “Save” button for saving data of document information. System will move to step (4) to send data to database by method SaveDocumentInformation(Document document) with parameter “document” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message. If \[PictureBox\].Size \> 5 MB, system will display an error message (Refer to MSG 8). Else data of the document information will be stored as a new record in table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Document Information” screen and display a list with updated data on the datagrid. |

3. #### Update Document  {#update-document}

##### Use Case Description

| Name | Update Document |
| :---- | :---- |
| **Description** | This use case allows the admin to update existing document information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The document information will be updated in the system and display new record on datagrid. |

##### Sequence Flow

![][image26]

##### Activities Flow

![][image27]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) with syntax “SELECT \* FROM Document WHERE documentID \= \[Document.ID\]“ with \[Document.ID\] is retrieved from the item clicked on the datagrid. After retrieving data from the database, the system call method displayDocumentInformationScreen(Document document) with Document is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Document Information” screen (Refer to “Document Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR3 | **Validation Rules:** When the admin enters document information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[txtBoxTitle\], \[richTxtBoxContent\] and \[PictureBox\]. If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (8) | BR4 | **Validation Rules:** When the admin clicks the “Save” button for saving data of document information. System will move to step (7) to send data to database by method SaveDocumentInformation(Document document) with parameter “document” is an object class with all information in these \[txtBox\] above. The input data will be checked by table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (8.1) to display an error message. If \[PictureBox\].Size \> 5 MB, system will display an error message (Refer to MSG 8). Else data of the document information will be stored as a new record in table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Document Information” screen and display a list with updated data on the datagrid. |

4. #### Delete Document {#delete-document}

##### Use Case Description

| Name | Delete Document |
| :---- | :---- |
| **Description** | This use case allows the admin to delete a document information in the system. |
| **Actor** | Admin |
| **Trigger** | When the admin clicks on the \[Icon Delete\] button on the right of each item on the datagrid. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The document information will be removed from the system and display data change on datagrid. |

##### Sequence Flow

![][image28]

##### Activities Flow

![][image29]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Admin select the corresponding button to process the next step. If the admin clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else admin clicks “Confirm” button, use case moves to step (3) and call method DeleteDocument(Document document) to process deleting request with Document is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the document information will be deleted in table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and displays a list with updated data on the datagrid. |

5. #### Search Document {#search-document}

##### Use Case Description

| Name | Search Document |
| :---- | :---- |
| **Description** | This use case allows the admin to search document information in the system based on input keywords. |
| **Actor** | Admin |
| **Trigger** | When admin enter searching keywords in the \[SearchBox\] on the top left of the screen. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The datagrid of document information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image30]

##### Activities Flow

![][image12]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the admin enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) with syntax “SELECT \* FROM Document WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Document Management” screen (Refer to “Document Management” view in “View Description” file) with data on the datagrid that is updated according to the entered keywords. |

5. ### *View User’s Report Use Case* {#view-user’s-report-use-case}

##### Use Case Description

| Name | View User’s Report  |
| :---- | :---- |
| **Description** | This use case allows the admin to view the report usage in the system. |
| **Actor** | Admin |
| **Trigger** | When admin clicks on “Statistic” button on the left navigation sidebar. |
| **Pre-condition** | Admin’s device must be connected to the internet. Admin is signed in with their account. |
| **Post-condition** | The screen will display report data as the chosen type and timestamp. |

##### Sequence Flow

![][image31]

##### Activities Flow

![][image32]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “User’s Report” screen. (Refer to “Statistic Screen” view in “View Description” file). |
| (4) | BR2 | **Submitting Rules:** When the admin choose timestamp in step (3), check that \[TimeStemp\] \<= \[CurrentDateTime\].Value and types of report must be items in “List Type” (includes “Doctor” and “Child”).  |
| (6) | BR3 | **Displaying Rules:** When the admin chooses \[ReportType\] and \[TimeStamp\], the system calls getReportData(type, timeStamp) method and queries data based on two conditions in the database. ❖      The data might be “Doctor” or “Child” usage in the system. System queries in the corresponding table “Doctor” or “Child” (Refer to table “Doctor” or “Child” in “DB Sheet” file). After retrieving data, the system displays corresponding data in “BarChart”. |

6. ### *Supervise Prescription Use Case* {#supervise-prescription-use-case}

   1. #### Supervise Prescription {#supervise-prescription}

##### Use Case Description

| Name | Supervise Prescription |
| :---- | :---- |
| **Description** | This use case allows the doctor to choose one of the corresponding functions of CRUD to adjust prescription information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the “Instructions/Prescriptions” button on the bottom navigation. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The prescription information is updated to the corresponding function that the doctor executes. |

##### Sequence Flow

![][image33]

##### Activities Flow

![][image34]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Prescription Management” screen. (Refer to “Prescription Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Doctor can only choose one feature at a time to use. |

2. #### Create Prescription {#create-prescription}

##### Use Case Description

| Name | Create Prescription  |
| :---- | :---- |
| **Description** | This use case allows the doctor to create a new parent information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the \[Icon Add\] button on the top right of the “Prescription Management” screen. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The prescription information will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image35]

##### Activities Flow

![][image36]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Prescription Information” screen. (Refer to “Prescription Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the doctor enters prescription information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtMedicine\]. “List of children” will get data from table “CHILD” (Refer to table “Child” in “DB Sheet” file) and displays all items in “List of children”. \[DateTimePicker\].Value for prescription must \>= \[CurrentDateTime\].Value.  If the input is not valid: System moves to step (4.1) to display an error message. If \[inputTxtMedicine\].Text isEmpty() \= “true”, the system will display a message for requiring doctor to enter mandatory data. (Refer to MSG 1\) |
| (5) | BR3 | **Validation Rules:** When the doctor clicks the “Save” button for saving data of prescription information. System will move to step (4) to send data to database by method SavePrescriptionInformation(Prescription prescription) with parameter “prescription” is an object class with all information in these input above. The input data will be checked by table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Prescription Information” screen and display a list with updated data on the list view. |

3. #### Update Prescription  {#update-prescription}

##### Use Case Description

| Name | Update Prescription |
| :---- | :---- |
| **Description** | This use case allows the doctor to update existing prescription information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The prescription information will be updated in the system and display new record on the list view. |

##### Sequence Flow

![][image37]

##### Activities Flow

![][image38]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file) with syntax “SELECT \* FROM Prescription WHERE prescriptiontID \= \[Prescription.ID\]“ with \[Prescription.ID\] and corresponding “PrescriptionDetails” is retrieved from the item clicked on the list view. After retrieving data from the database, the system call method displayPrescriptionInformationScreen(Prescription prescription) with Prescription is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Prescription Information” screen (Refer to “Prescription Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR3 | **Validation Rules:** When the doctor enters prescription information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtMedicine\]. “List of children” will get data from table “CHILD” (Refer to table “Child” in “DB Sheet” file) and displays all items in “List of children”. \[DateTimePicker\].Value for prescription must \>= \[CurrentDateTime\].Value.  If the input is not valid: System moves to step (4.1) to display an error message. If \[inputTxtMedicine\].Text isEmpty() \= “true”, the system will display a message for requiring doctor to enter mandatory data. (Refer to MSG 1\) |
| (8) | BR4 | **Validation Rules:** When the doctor clicks the “Save” button for saving data of prescription information. System will move to step (4) to send data to database by method SavePrescriptionInformation(Prescription prescription) with parameter “prescription” is an object class with all information in these input above. The input data will be checked by table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Prescription Information” screen and display a list with updated data on the list view. |

4. #### Delete Prescription {#delete-prescription}

##### Use Case Description	

| Name | Delete Prescription |
| :---- | :---- |
| **Description** | When the doctor holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Doctor |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The prescription information will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image39]

##### Activities Flow

![][image40]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Doctor selects the corresponding button to process the next step. If the doctor clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else doctor clicks “Confirm” button, use case moves to step (3) and call method DeletePrescription(Prescription prescription) to process deleting request with Prescription is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the parent information will be deleted in table “PRESCRIPTION” and “PRESCRIPTIONDETAILS” in the database (Refer to “Prescription” and “PrescriptionDetails” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Prescription {#search-prescription}

##### Use Case Description

| Name | Search Prescription |
| :---- | :---- |
| **Description** | This use case allows the doctor to search prescription information in the system based on input keywords. |
| **Actor** | Doctor |
| **Trigger** | When doctor enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The list view of prescription information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image41]

##### Activities Flow

![][image42]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the doctor enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “PRESCRIPTION” in the database (Refer to “Prescription” table in “DB Sheet” file) with syntax “SELECT \* FROM Prescription WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Prescription Management” screen (Refer to “Prescription Management” view in “View Description” file) with data on the datagrid that is updated according to the entered keywords. |

7. ### *Supervise Immunization Schedule Use Case* {#supervise-immunization-schedule-use-case}

   1. #### Supervise Immunization Schedule {#supervise-immunization-schedule}

##### Use Case Description

| Name | Supervise Immunization schedule |
| :---- | :---- |
| **Description** | This use case allows the doctor to choose one of the corresponding functions of CRUD to adjust immunization schedule information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the “Instructions/Immunization schedules” button on the bottom navigation. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The immunization schedule information is updated to the corresponding function that the doctor executes. |

##### Sequence Flow

![][image43]

##### Activities Flow

![][image44]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Immunization schedule Management” screen. (Refer to “Immunization schedule Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Doctor can only choose one feature at a time to use. |

2. #### Create Immunization Schedule {#create-immunization-schedule}

##### Use Case Description

| Name | Create Immunization schedule  |
| :---- | :---- |
| **Description** | This use case allows the doctor to create a new parent information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the \[Icon Add\] button on the top right of the “Immunization Schedule Management” screen. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The immunization schedule information will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image45]

##### Activities Flow

![][image46]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Immunization Schedule Information” screen. (Refer to “Immunization Schedule Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the doctor enters immunization schedule information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtVaccine\]. “List of children” will get data from table “CHILD” (Refer to table “Child” in “DB Sheet” file) and displays all items in “List of children”. \[DateTimePicker\].Value for immunization schedule must \>= \[CurrentDateTime\].Value.  If the input is not valid: System moves to step (4.1) to display an error message. If \[inputTxtVaccine\].Text isEmpty() \= “true”, the system will display a message for requiring doctor to enter mandatory data. (Refer to MSG 1\) |
| (5) | BR3 | **Validation Rules:** When the doctor clicks the “Save” button for saving data of immunization schedule information. System will move to step (4) to send data to database by method SaveImmunization scheduleInformation(ImmunizationSchedule immunizationSchedule) with parameter “immunizationSchedule” is an object class with all information in these input above. The input data will be checked by table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “ImmunizationSchedule” and “ImmunizationScheduleDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “IMMUNIZATION SCHEDULE” and “IMMUNIZATION SCHEDULEDETAILS” in the database (Refer to “Immunization schedule” and “Immunization scheduleDetails” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Immunization schedule Information” screen and display a list with updated data on the list view. |

3. #### Update Immunization Schedule  {#update-immunization-schedule}

##### Use Case Description

| Name | Update Immunization schedule |
| :---- | :---- |
| **Description** | This use case allows the doctor to update existing immunization schedule information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The immunization schedule information will be updated in the system and display new record on list view. |

##### Sequence Flow

![][image47]

##### Activities Flow

![][image48]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “Immunization schedule” and “Immunization scheduleDetails” table in “DB Sheet” file) with syntax “SELECT \* FROM Immunization schedule WHERE scheduleId \= \[ImmunizationSchedule.ID\]“ with \[Immunization schedule.ID\] and corresponding “ImmunizationScheduleDetails” is retrieved from the item clicked on the list view. After retrieving data from the database, the system call method displayImmunization scheduleInformationScreen(ImmunizationSchedule immunizationSchedule) with Immunization schedule is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Immunization Schedule Information” screen (Refer to “Immunization Schedule Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR3 | **Validation Rules:** When the doctor enters immunization schedule information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtVaccine\]. “List of children” will get data from table “CHILD” (Refer to table “Child” in “DB Sheet” file) and displays all items in “List of children”. \[DateTimePicker\].Value for immunization schedule must \>= \[CurrentDateTime\].Value.  If the input is not valid: System moves to step (4.1) to display an error message. If \[inputTxtVaccine\].Text isEmpty() \= “true”, the system will display a message for requiring doctor to enter mandatory data. (Refer to MSG 1\) |
| (8) | BR4 | **Validation Rules:** When the doctor clicks the “Save” button for saving data of immunization schedule information. System will move to step (4) to send data to database by method SaveImmunization scheduleInformation(ImmunizationSchedule immunizationSchedule) with parameter “immunizationSchedule” is an object class with all information in these input above. The input data will be checked by table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “ImmunizationSchedule” and “ImmunizationScheduleDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “ImmunizationSchedule” and “ImmunizationScheduleDetails” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Immunization Schedule Information” screen and display a list with updated data on the list view. |

4. #### Delete Immunization Schedule {#delete-immunization-schedule}

##### Use Case Description

| Name | Delete Immunization schedule |
| :---- | :---- |
| **Description** | When the doctor holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Doctor |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The immunization schedule information will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image49]

##### Activities Flow

![][image50]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Doctor selects the corresponding button to process the next step. If the doctor clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else doctor clicks “Confirm” button, use case moves to step (3) and call method DeleteSchedule(ImmunizationSchedule immunizationSchedule) to process deleting request with ImmunizationSchedule is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “ImmunizationSchedule” and “ImmunizationScheduleDetails” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the parent information will be deleted in table “IMMUNIZATIONSCHEDULE” and “IMMUNIZATIONSCHEDULEDETAILS” in the database (Refer to “ImmunizationSchedule” and “ImmunizationScheduleDetails” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Immunization Schedule {#search-immunization-schedule}

##### Use Case Description

| Name | Search Immunization schedule |
| :---- | :---- |
| **Description** | This use case allows the doctor to search immunization schedule information in the system based on input keywords. |
| **Actor** | Doctor |
| **Trigger** | When doctor enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Doctor’s device must be connected to the internet. Doctor is signed in with their account. |
| **Post-condition** | The list view of immunization schedule information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image51]

##### Activities Flow

![][image42]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the doctor enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “IMMUNIZATIONSCHEDULE” in the database (Refer to “ImmunizationSchedule” table in “DB Sheet” file) with syntax “SELECT \* FROM ImmunizationSchedule WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Immunization Schedule Management” screen (Refer to “Immunization Schedule Management” view in “View Description” file) with data on the datagrid that is updated according to the entered keywords. |

8. ### *Supervise Child Use Case* {#supervise-child-use-case}

   1. #### Supervise Child {#supervise-child}

##### Use Case Description

| Name | Supervise Child |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to choose one of the corresponding functions of CRUD to adjust child information in the system. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the “Child” button on the bottom navigation. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The child information is updated to the corresponding function that the doctor/parent executes. |

##### Sequence Flow

![][image52]

##### Activities Flow

![][image53]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Child Management” screen. (Refer to “Child Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Doctor/Parent can only choose one feature at a time to use. |

2. #### Create Child {#create-child}

##### Use Case Description

| Name | Create Child  |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to create a new child information in the system. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon Add\] button on the top right of the “Child Management” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The child information will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image54]

##### Activities Flow

![][image55]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Child Information” screen. (Refer to “Child Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the doctor/parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtName\], \[inputTxtDob\], \[inputTxtGender\], \[inputTextHeight\] and \[inputTxtWeight\].  If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) If one of the txtBox.text is in the wrong format (E.g: \[inputTextHeight\], \[inputTxtWeight\] but enter letters. Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4\) |
| (5) | BR3 | **Validation Rules:** When the doctor/parent clicks the “Save” button for saving data of child  information. System will move to step (4) to send data to database by method SaveChildInformation(Child child) with parameter “child” is an object class with all information in these input above. The input data will be checked by table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Child Information” screen and display a list with updated data on the list view. |

3. #### Update Child  {#update-child}

##### Use Case Description

| Name | Update Child |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to update existing child information in the system. |
| **Actor** | Doctor |
| **Trigger** | When the doctor/parent clicks on the \[Icon Edit\] button on the right of each item on the datagrid. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The child information will be updated in the system and display new record on datagrid. |

##### Sequence Flow

![][image56]

##### Activities Flow

![][image57]

##### Business Rules	

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file) with syntax “SELECT \* FROM Child WHERE childID \= \[Child.ID\]“ with \[Child.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayChildInformationScreen(Child child) with Child is an object in class. |
| (4) | BR1 | **Displaying Rules:** The system displays a “Child Information” screen (Refer to “Child Information” view in “View Description” file) filled with data queried in step (3). |
| (6) | BR2 | **Validation Rules:** When the doctor/parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtName\], \[inputTxtDob\], \[inputTxtGender\], \[inputTextHeight\] and \[inputTxtWeight\].  If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) If one of the txtBox.text is in the wrong format (E.g: \[inputTextHeight\], \[inputTxtWeight\] but enter letters. Then the system displays an error message to notify the admin to enter again. (Refer to MSG 4\) |
| (8) | BR3 | **Validation Rules:** When the doctor/parent clicks the “Save” button for saving data of child  information. System will move to step (7) to send data to database by method SaveChildInformation(Child child) with parameter “child” is an object class with all information in these input above. The input data will be checked by table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (8.1) to display an error message (Refer to MSG 9). Else systems store all information in table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Child Information” screen and display a list with updated data on the list view. |

4. #### Delete Child {#delete-child}

##### Use Case Description

| Name | Delete Prescription |
| :---- | :---- |
| **Description** | When the doctor/parent holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The child information will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image58]

##### Activities Flow

![][image59]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Doctor/Parent selects the corresponding button to process the next step. If the doctor/parent clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else doctor/parent clicks “Confirm” button, use case moves to step (3) and call method DeleteChild(Child child) to process deleting request with Child is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “CHILD” in the database (Refer to “Prescription” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the child information will be deleted in table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Child {#search-child}

##### Use Case Description

| Name | Search Prescription |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to search child information in the system based on input keywords. |
| **Actor** | Doctor/Parent |
| **Trigger** | When doctor/parent enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The list view of child information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image60]

##### Activities Flow

![][image61]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the doctor/parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file) with syntax “SELECT \* FROM Child WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Child Management” screen (Refer to “Child Management” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |

6. #### View Health Update History {#view-health-update-history}

##### Use Case Description	

| Name | View Health Update History |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to view health update history of the corresponding child. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon History\] on the top right of the “Child Management” view. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | List of health update history information of the corresponding child. |

##### Sequence Flow

![][image62]

##### Activities Flow

![][image63]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “CHILD” in the database (Refer to “Child” table in “DB Sheet” file) with syntax “SELECT \* FROM Child WHERE childID \= \[Child.ID\]“ with \[Child.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayChildInformationScreen(Child child) with Child is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “List of Child Health Update Information” screen (Refer to “List of Child Health Update Information” view in “View Description” file) filled with data queried in step (3). |

2. ### *Chat Use Case* {#chat-use-case}

   1. #### Chat {#chat}

##### Use Case Description

| Name | Supervise Prescription |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to choose one of the corresponding functions of chat in the system. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon Chat\] button on the top right of the “Home Screen”. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The chat message is updated to the corresponding function that the doctor/parent executes. |

##### Sequence Flow

![][image64]

##### Activities Flow

![][image65]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Chat” screen. (Refer to “Chat” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Doctor/Parent can only choose one feature at a time to use. |

2. #### Create Chat {#create-chat}

##### Use Case Description

| Name | Create Chat  |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to create a new chat in the system. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon Add\] button on the top right of the “Chat” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The chat conversation will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image66]

##### Activities Flow

![][image67]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Connecting Rules:** When doctor/parent selects an account to start a new chat, system will get that account’s data by \[userId\] and use method ConnectChat(senderId, receiverId) to connect chat the screen with the corresponding user, which \[senderId\] is the user who are searching the account to chat and \[receiverId\] is the opposite. |
| (4) | BR2 | **Displaying Rules:** After getting selected account data, system displays a “Message” screen. (Refer to “Message” view in “View Description” file) |

3. #### Reply Message  {#reply-message}

##### Use Case Description

| Name | Repl Prescription |
| :---- | :---- |
| **Description** | This use case allows doctor/parent to reply message of the corresponding chat. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon Send\] button on the bottom right of the “Message” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The chat conversation will be updated with latest sent message. |

##### Sequence Flow

![][image68]

##### Activities Flow

![][image69]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “CHAT” and “MESSAGE” in the database (Refer to “Chat” and “Message” table in “DB Sheet” file) with syntax “SELECT \* FROM Chat WHERE chatID= \[Chat.ID\]“ with \[Chat.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayChatInformationScreen(Chat chat) and corresponding “Message” is retrieved from the Chat object. |
| (4) | BR2 | **Displaying Rules:** After getting selected account data, system displays a “Message” screen. (Refer to “Message” view in “View Description” file) filled with data queried in step (3). |
| (7) | BR3 | **Storing Rules:** When the doctor/parent clicks the \[Icon Send\] button for sending message. System will move to step (6) to send data to database by method SendMessage(Message message) with parameter “message” is an object class with all information in these input above. The input data will be checked by table “MESSAGE” in the database (Refer to “Message” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (8.1) to display an error message (Refer to MSG 9). Else systems store message information in table “MESSAGE” in the database (Refer to “Message” table in “DB Sheet” file). |
| (8) | BR4 | **Displaying Rules:** After getting selected account data, system displays a “Message” screen. (Refer to “Message” view in “View Description” file) |

4. #### Delete Chat {#delete-chat}

##### Use Case Description

| Name | Delete Chat |
| :---- | :---- |
| **Description** | When the doctor/parent holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The chat conversation will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image70]

##### Activities Flow

![][image71]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Doctor/Parent selects the corresponding button to process the next step. If the doctor/parent clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else doctor/parent clicks “Confirm” button, use case moves to step (3) and call method DeleteChat(Chat chat) to process deleting request with Child is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “CHAT” and corresponding “MESSAGE” in the database (Refer to “Chat” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the child information will be deleted in table “Chat” and corresponding “Message” in the database (Refer to “Chat” and “Message” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Chat {#search-chat}

##### Use Case Description

| Name | Search Chat |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to search chat conversation based on input keywords. |
| **Actor** | Doctor/Parent |
| **Trigger** | When doctor/parent enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The list view of chat conversation will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image72]

##### Activities Flow

![][image61]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the doctor/parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “CHAT” in the database (Refer to “Chat” table in “DB Sheet” file) with syntax “SELECT \* FROM Chat WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Chat” screen (Refer to “Chat” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |

3. ### *Monitor Child Health Status Use Case* {#monitor-child-health-status-use-case}

   1. #### Monitor Child Health Status {#monitor-child-health-status}

##### Use Case Description

| Name | Monitor Child Health Status |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to choose one of the corresponding functions for monitoring child health status. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Events/Icon Chart\] button on the bottom naviagtion of the “Home Screen”. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The data will be displayed as the selected chart. |

##### Sequence Flow

![][image73]

##### Activities Flow

![][image74]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Child Management” screen. (Refer to “Child Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Doctor/Parent can only choose one feature at a time to use. |

2. #### Monitor Child’s Events {#monitor-child’s-events}

##### Use Case Description

| Name | Monitor Child’s Events |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to monitor child events in visual user interface with bar chart. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the “Events” button on the “Monitor Health Status” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The data will be displayed data as the selected options. |

##### Sequence Flow

![][image75]

##### Activities Flow

![][image76]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Monitor Child Events” screen. (Refer to “Monitor Child Events” view in “View Description” file) |
| (4) | BR2 | **Querying Rules:** When the doctor/parent clicks on the event want to view details, system get its information by method displayEventInformation(Event event) which “event” will be retreived by its \[eventId\]. System queries data from “CHILDEVENT” table (Refer to “ChildEvent” table in the “DB Sheet” file). After retrieving data, the system moves to step (5) and displays “Child Event Information” screen (Refer to “Child Event Information” in the “View Description” file) and will be filled with queried data.  |

3. #### Monitor Child’s Meal Times {#monitor-child’s-meal-times}

##### Use Case Description

| Name | Monitor Child’s Meal Times |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to monitor child meal times in visual user interface with bar chart. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the “Meal Times” button on the “Monitor Health Status” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The data will be displayed as the selected options. |

##### Sequence Flow

![][image77]

##### Activities Flow

![][image78]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Monitor Meal Times” screen. (Refer to “Monitor Meal Times” view in “View Description” file) |
| (4) | BR2 | **Querying Rules:** When the doctor/parent clicks on the meal want to view details, system get its information by method displayMealInformation(MealTime mealTime) which “mealTime” will be retrieved by its \[mealTimeId\]. System queries data from “MEALTIME” table (Refer to “MealTime” table in the “DB Sheet” file). After retrieving data, system moves to step (5) and displays “Meal Time Information” screen (Refer to “Meal Time Information” in the “View Description” file) and will be filled with queried data.  |

4. #### Monitor Child’s Sleep Times {#monitor-child’s-sleep-times}

##### Use Case Description

| Name | Monitor Child’s Sleep Times |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to monitor child sleep times in visual user interface with bar chart. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the “Sleep Times” button on the “Monitor Health Status” screen. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | The data will be displayed as the selected options. |

##### Sequence Flow

![][image79]

##### Activities Flow

![][image80]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Monitor Sleep Times” screen. (Refer to “Monitor Sleep Times” view in “View Description” file) |
| (4) | BR2 | **Querying Rules:** When the doctor/parent clicks on the sleep want to view details, system get its information by method displaySleepInformation(SleepTime sleepTime) which “sleepTime” will be retrieved by its \[sleepTimeId\]. System queries data from “SLEEPTIME” table (Refer to “SleepTime” table in the “DB Sheet” file). After retreiving data, system moves to step (5) and displays “Sleep Time Information” screen (Refer to “Sleep Time Information” in the “View Description” file) and will be filled with queried data.  |

4. ### *View Doctor Instruction Use Case* {#view-doctor-instruction-use-case}

   1. #### View Doctor Instruction {#view-doctor-instruction}

##### Use Case Description

| Name | View Doctor Instruction |
| :---- | :---- |
| **Description** | This use case allows the parent to view one of the instructions of doctor, these includes “Immunization Schedule” and “Prescription”.  |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Instructions” button on the bottom navigation. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The system will display the corresponding screen with selected options. |

##### Sequence Flow

![][image81]

##### Activities Flow

![][image82]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Instructions” screen. (Refer to “Instructions” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Parent can only choose one feature at a time to use. |

2. #### View Prescription {#view-prescription}

##### Use Case Description

| Name | View Prescription |
| :---- | :---- |
| **Description** | This use case allows the parent to view list of “Prescription” that was given by their doctor.  |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Instructions/Prescriptions” button on the corresponding screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The system will display a list of prescription that was given by doctor. |

##### Sequence Flow

![][image83]

##### Activities Flow

![][image84]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Prescription Management” screen. (Refer to “Prescription Management” view in “View Description” file) with list of prescriptions of that account. |
| (4) | BR2 | **Searching Rules:** When the parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “PRESCRIPTION” in the database (Refer to “Prescription” table in “DB Sheet” file) with syntax “SELECT \* FROM Prescription WHERE …” based on the specific requirement. |
| (5) | BR3 | **Displaying Rules:** The system displays a “Prescription Management” screen (Refer to “Prescription Management” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |
| (8) | BR4 | **Querying Rules:** When the parent selects an item on the “List of Prescription”, the system calls method getPrescriptionInformation(Prescription prescription) which parameter “prescription” is clicked. System queries data in the table “PRESCRIPTION” in the database (Refer to “Prescription” table in “DB Sheet” file) with syntax “SELECT \* FROM Prescription WHERE prescriptionID \= \[Prescription.ID\]“ with \[Prescription.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayPrescriptionInformationScreen(Prescription prescription) with Prescription is an object in class. |

3. #### View Immunization Schedule {#view-immunization-schedule}

##### Use Case Description

| Name | View Immunization Schedule |
| :---- | :---- |
| **Description** | This use case allows the parent to view list of “Immunization Schedule” that was given by their doctor.  |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Instructions/Immunization Schedule” button on the corresponding screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The system will display a list of immunization schedules that was given by the doctor. |

##### Sequence Flow

![][image85]

##### Activities Flow

![][image86]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Immunization Schedule Management” screen. (Refer to “Immunization Schedule Management” view in “View Description” file) with list of prescriptions of that account. |
| (4) | BR2 | **Searching Rules:** When the parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “IMMUNIZATIONSCHEDULE” in the database (Refer to “ImmunizationSchedule” table in “DB Sheet” file) with syntax “SELECT \* FROM ImmunizationSchedule WHERE …” based on the specific requirement. |
| (5) | BR3 | **Displaying Rules:** The system displays a “Immunization Schedule Management” screen (Refer to “Immunization Schedule Management” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |
| (8) | BR4 | **Querying Rules:** When the parent selects an item on the “List of Schedules”, system calls method getImmunizationScheduleInformation(ImmunizationSchedule immunizationSchedule) which parameter “immunizationSchedule” is clicked item. System queries data in the table “IMMUNIZATIONSCHEDULE” in the database (Refer to “ImmunizationSchedule” table in “DB Sheet” file) with syntax “SELECT \* FROM ImmunizationSchedule WHERE ImmunizationScheduleID= \[ImmunizationSchedule.ID\]“ with \[ImmunizationSchedule.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method display ImmunizationScheduleInformationScreen(ImmunizationSchedule immunizationSchedule) with immunizationSchedule is an object in class. |

5. ### *View Document Use Case* {#view-document-use-case}

##### Use Case Description

| Name | View Document |
| :---- | :---- |
| **Description** | This use case allows the parent to view list of “Documents” that was given by admin or doctor.  |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Tips” button on the bottom navigaiton of the “Home” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The system will display a list of tips that was given by admin/doctor. |

##### Sequence Flow

![][image87]

##### Activities Flow

![][image88]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Tips” screen. (Refer to “Tips” view in “View Description” file) with list of documents. |
| (4) | BR2 | **Searching Rules:** When the parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) with syntax “SELECT \* FROM Document WHERE …” based on the specific requirement. |
| (5) | BR3 | **Displaying Rules:** The system displays a “Tips” screen (Refer to “Tips” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |
| (8) | BR4 | **Querying Rules:** When the parent selects an item on the “List of Tips”, system calls method getTipsInformation(Tip tip) which parameter “tip” is clicked item. System queries data in the table “DOCUMENT” in the database (Refer to “Document” table in “DB Sheet” file) with syntax “SELECT \* FROM Document WHERE documentID \= \[Document.ID\]“ with \[Document.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayTipInformationScreen(Tip tip) with Tip is an object in class. |

6. ### *Track Child Events Use Case* {#track-child-events-use-case}

   1. #### Track Child Events {#track-child-events}

##### Use Case Description

| Name | Track Child Events |
| :---- | :---- |
| **Description** | This use case allows the parent to choose one of the corresponding functions of CRUD to adjust child event information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Events/Child Event” button on the corresponding screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The child event information is updated to the corresponding function that the parent executes. |

##### Sequence Flow

![][image89]

##### Activities Flow

![][image90]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Event Management” screen. (Refer to “Event Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Parents can only choose one feature at a time to use. |

2. #### Create Child Event {#create-child-event}

##### Use Case Description

| Name | Create Child Event |
| :---- | :---- |
| **Description** | This use case allows the parent to create a new child event information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the \[Icon Add\] button on the top right of the “Child Event Management” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The child event information will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image91]

##### Activities Flow

![][image92]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Child Event Information” screen. (Refer to “Child Event Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtEventName\], \[inputTxtLocation\], \[cbBoxChild\], \[dateTimePicker\] and \[inputTxtDescription\].  \[dateTimePicker\].Value must be \<= \[CurrentDateTime\].Value. If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (5) | BR3 | **Validation Rules:** When the parent clicks the “Save” button for saving data of child event information. System will move to step (4) to send data to database by method SaveChildEventInformation(ChildEvent childEvent) with parameter “childEvent” is an object class with all information in these input above. The input data will be checked by table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Child Event Information” screen and display a list with updated data on the list view. |

3. #### Update Child Event  {#update-child-event}

##### Use Case Description

| Name | Update Child Event |
| :---- | :---- |
| **Description** | This use case allows the parent to update existing parent information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the \[Icon Edit\] button on the right of the “Child Event Information” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The child event information will be updated in the system and display new record on datagrid. |

##### Sequence Flow

![][image93]

##### Activities Flow

![][image94]

##### 

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file) with syntax “SELECT \* FROM ChildEvent WHERE childEventID \= \[ChildEvent.ID\]“ with \[ChildEvent.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayChildEventInformationScreen(ChildEvent childEvent) with ChildEvent is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Child Event Information” screen. (Refer to “Child Event Information” view in “View Description” file) filled with queried data in step (3). |
| (6) | BR3 | **Validation Rules:** When the parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtEventName\], \[inputTxtLocation\], \[cbBoxChild\], \[dateTimePicker\] and \[inputTxtDescription\].  \[dateTimePicker\].Value must be \<= \[CurrentDateTime\].Value. If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (8) | BR4 | **Validation Rules:** When the parent clicks the “Save” button for saving data of child event information. System will move to step (7) to send data to database by method SaveChildEventInformation(ChildEvent childEvent) with parameter “childEvent” is an object class with all information in these input above. The input data will be checked by table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (8.1) to display an error message (Refer to MSG 9). Else systems store all information in table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Child Event Information” screen and display a list with updated data on the list view. |

4. #### Delete Child Event {#delete-child-event}

##### Use Case Description

| Name | Delete Child Event |
| :---- | :---- |
| **Description** | When the parent holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Parent |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The child event information will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image95]

##### Activities Flow

![][image96]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Parent selects the corresponding button to process the next step. If the parent clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else parent clicks “Confirm” button, use case moves to step (3) and call method DeleteChildEvent(ChildEvent childEventt) to process deleting request with ChildEvent is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the child event information will be deleted in table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Child Event {#search-child-event}

##### Use Case Description

| Name | Search Child Event |
| :---- | :---- |
| **Description** | This use case allows the parent to search child event information in the system based on input keywords. |
| **Actor** | Parent |
| **Trigger** | When parent enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The list view of child event information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image97]

##### Activities Flow

![][image98]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “CHILDEVENT” in the database (Refer to “ChildEvent” table in “DB Sheet” file) with syntax “SELECT \* FROM ChildEvent WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Event Management” screen (Refer to “Child Event Management” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |

7. ### *Track Meal Times Use Case* {#track-meal-times-use-case}

   1. #### Track Meal Times {#track-meal-times}

##### Use Case Description

| Name | Track Meal times |
| :---- | :---- |
| **Description** | This use case allows the parent to choose one of the corresponding functions of CRUD to adjust meal time information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Events/Meal time” button on the corresponding screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The meal time information is updated to the corresponding function that the parent executes. |

##### Sequence Flow

![][image99]

##### Activities Flow

![][image100]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Meal Management” screen. (Refer to “Meal Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Parent can only choose one feature at a time to use. |

2. #### Create Meal Time {#create-meal-time}

##### Use Case Description

| Name | Create Meal time |
| :---- | :---- |
| **Description** | This use case allows the parent to create a new meal time information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the \[Icon Add\] button on the top right of the “MealTime Management” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The mealtime information will be stored into the system and display a new record on the corresponding list view. |

##### Sequence Flow

![][image101]

##### Activities Flow

![][image102]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Mealtime Information” screen. (Refer to “Mealtime Information” view in “View Description” file) |
| (3) | BR2 | **Validation Rules:** When the parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtSource\], \[ \[cbBoxChild\], \[dateTimePicker\], \[inputTxtDescription\] and some details information of that meal \[inputTxtFood\] and \[inputTxtCalories\].  \[dateTimePicker\].Value must be \<= \[CurrentDateTime\].Value. If the input is not valid: System moves to step (4.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (5) | BR3 | **Validation Rules:** When the parent clicks the “Save” button for saving data of meal time information. System will move to step (4) to send data to database by method SaveMealTimeInformation(MealTime mealTime) with parameter “mealTime” is an object class with all information in these input above. The input data will be checked by table “MEALTIME” and corresponding “MEALTIME DETAILS” in the database (Refer to “MealTime” and “MealTimeDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (5.1) to display an error message (Refer to MSG 9). Else systems store all information in table “MEALTIME” and corresponding “MEALTIME DETAILS” in the database (Refer to “MealTime” and “MealTimeDetails” table in “DB Sheet” file). System moves to step (6) and displays successful notification (Refer to MSG 7), use method Close() to close the “Meal Time Information” screen and display a list with updated data on the list view. |

3. #### Update Meal Time  {#update-meal-time}

##### Use Case Description

| Name | Update Meal time |
| :---- | :---- |
| **Description** | This use case allows the parent to update existing meal information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the \[Icon Edit\] button on the right of the “Mealtime Information” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The mealtime information will be updated in the system and display new record on datagrid. |

##### Sequence Flow

![][image103]

##### Activities Flow

![][image104]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “MEALTIME” and corresponding “MEALTIME DETAILS” in the database (Refer to “MealTime” and “MealTimeDetails” table in “DB Sheet” file) with syntax “SELECT \* FROM MealTime WHERE mealTimeID \= \[MealTime.ID\]“ with \[MealTime.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displayMealTimeInformationScreen(MealTime mealTime) with MealTime is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Meal Time Information” screen. (Refer to “Meal Time Information” view in “View Description” file) filled with queried data in step (3). |
| (6) | BR3 | **Validation Rules:** When the parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtSource\], \[ \[cbBoxChild\], \[dateTimePicker\], \[inputTxtDescription\] and some details information of that meal \[inputTxtFood\] and \[inputTxtCalories\].  \[dateTimePicker\].Value must be \<= \[CurrentDateTime\].Value. If the input is not valid: System moves to step (6.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (8) | BR4 | **Validation Rules:** When the parent clicks the “Save” button for saving data of meal time information. System will move to step (7) to send data to database by method SaveMealTimeInformation(MealTime mealTime) with parameter “mealTime” is an object class with all information in these input above. The input data will be checked by table “MEALTIME” and corresponding “MEALTIME DETAILS” in the database (Refer to “MealTime” and “MealTimeDetails” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (8.1) to display an error message (Refer to MSG 9). Else systems store all information in table “MEALTIME” and corresponding “MEALTIME DETAILS” in the database (Refer to “MealTime” and “MealTimeDetails” table in “DB Sheet” file). System moves to step (9) and displays successful notification (Refer to MSG 7), use method Close() to close the “Meal Time Information” screen and display a list with updated data on the list view. |

4. #### Delete Meal Time	 {#delete-meal-time}

##### Use Case Description

| Name | Delete Meal time |
| :---- | :---- |
| **Description** | When the parent holds and swipes to the right of the item on the list view, the system displays a \[Icon Delete\] to ask for deleting the item. |
| **Actor** | Parent |
| **Trigger** | When the doctor hold and swipe to the right of the item on list view, system displays a \[Icon Delete\] to ask for deleting item. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The mealtime information will be removed from the system and display data change on list view. |

##### Sequence Flow

![][image105]

##### Activities Flow

![][image106]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Displaying Rules:** The system displays a “Confirmation message box” screen. (Refer to “Confirmation message box” view in “View Description” file) with a message (Refer to MSG 11). |
| (2.1), (2.2) | BR2 | **Selecting Rules:** Parent selects the corresponding button to process the next step. If the parent clicks the “Cancel” button, the “Confirmation message box” uses method Close() to close the screen and use case ends. Else parent clicks “Confirm” button, use case moves to step (3) and call method DeleteChildMealTime(MealTime mealTime) to process deleting request with MealTime is an object of class. |
| (4) | BR3 | **Validation Rules:** The selected data will be checked by table “MEALTIME” in the database (Refer to “MealTime” table in “DB Sheet” file) to check if there are any constraints.  If the selection is not valid, the system moves to step (4.1) to display an error message (Refer to MSG 9). Else data of the mealtime information will be deleted in table “MEALTIME” in the database (Refer to “MealTime” table in “DB Sheet” file). System moves to step (5) and displays successful notification (Refer to MSG 7\) and display a list with updated data on the list view. |

5. #### Search Meal Time {#search-meal-time}

##### Use Case Description	

| Name | Search Meal time |
| :---- | :---- |
| **Description** | This use case allows the parent to search mealtime information in the system based on input keywords. |
| **Actor** | Parent |
| **Trigger** | When parent enters searching keywords in the \[SearchBox\] on the top right of the screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The list view of mealtime information will be filtered by keywords and displayed on the screen. |

##### Sequence Flow

![][image107]

##### Activities Flow

![][image12]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Searching Rules:** When the parent enters the search criteria in the search box, the system uses the Text\_change(Event e) method to handle this searching request.  System queries data in the table “MEALTIME” in the database (Refer to “MealTime” table in “DB Sheet” file) with syntax “SELECT \* FROM MealTime WHERE …” based on the specific requirement. |
| (4) | BR2 | **Displaying Rules:** The system displays a “Meal Time Management” screen (Refer to “Meal Time Management” view in “View Description” file) with data on the list view that is updated according to the entered keywords. |

8. ### *Track Sleep Times Use Case* {#track-sleep-times-use-case}

   1. #### Track Sleep Times {#track-sleep-times}

##### Use Case Description

| Name | Track Sleep Times |
| :---- | :---- |
| **Description** | This use case allows the parent to choose one of the corresponding functions of CRUD to adjust sleep time information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Events/Sleep Time” button on the corresponding screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The sleep time information is updated to the corresponding function that the parent executes. |

##### Sequence Flow

![][image108]

##### Activities Flow

![][image109]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Sleep Management” screen. (Refer to “Sleep Management” view in “View Description” file) |
| (2) | BR2 | **Choosing Rules:** Parent can only choose one feature at a time to use. |

2. #### View Sleep Time History	 {#view-sleep-time-history}

##### Use Case Description

| Name | Search Sleep Time |
| :---- | :---- |
| **Description** | This use case allows the doctor/parent to view health update history of the corresponding child. |
| **Actor** | Doctor/Parent |
| **Trigger** | When the doctor/parent clicks on the \[Icon History\] on the top right of the “Child Management” view. |
| **Pre-condition** | Doctor/Parent’s device must be connected to the internet. Doctor/Parent is signed in with their account. |
| **Post-condition** | List of health update history information of the corresponding child. |

##### Sequence Flow

![][image110]

##### Activities Flow

![][image111]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (3) | BR1 | **Querying Rules:** System queries data in the table “SLEEPTIME” in the database (Refer to “SleepTime” table in “DB Sheet” file) with syntax “SELECT \* FROM SleepTime WHERE sleepTimeID \= \[SleepTime.ID\]“ with \[SleepTime.ID\] from the item clicked on the list view. After retrieving data from the database, the system call method displaySleepTimeInformationScreen(SleepTime sleepTime) with SleepTime is an object in class. |
| (4) | BR2 | **Displaying Rules:** The system displays a “List of Sleep Time Information” screen (Refer to “List of Sleep Time Information” view in “View Description” file) filled with data queried in step (3). |

3. #### Update Sleep Time {#update-sleep-time}

##### Use Case Description

| Name | Update Sleep Time |
| :---- | :---- |
| **Description** | This use case allows the parent to update existing sleep time information in the system. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the \[Icon Edit\] button on the right of the “Sleep Time Information” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. Parent is signed in with their account. |
| **Post-condition** | The sleep time information will be updated in the system and display new record on the list view. |

##### Sequence Flow

![][image112]

##### Activities Flow

![][image113]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (2) | BR1 | **Querying Rules:** System queries data in the table “SLEEPTIME” in the database (Refer to “SleepTime” table in “DB Sheet” file) with syntax “SELECT \* FROM SleepTime WHERE sleepTimeID \= \[SleepTime.ID\]“ with \[SleepTime.ID\] from the item clicked on the list view. If there is no data in the datase, system will display screen with empty information. After retrieving data from the database, the system call method displaySleepTimeInformationScreen(SleepTime sleepTime) with SleepTime is an object in class. |
| (3) | BR2 | **Displaying Rules:** The system displays a “SleepTime Information” screen. (Refer to “SleepTime Information” view in “View Description” file) filled with queried data in step (2). |
| (5) | BR3 | **Validation Rules:** When the parent enters child information on the screen. The system will use the Text\_change() method to check that the input is valid (empty, wrong format or not). These fields include: \[inputTxtLocation\], \[inputTxtSleepQuality\], \[dateTimePicker\] and \[inputTxtDescription\].  \[dateTimePicker\].Value must be \<= \[CurrentDateTime\].Value. If the input is not valid: System moves to step (5.1) to display an error message. If one of the txtBox.Text isEmpty() \= “true”, the system will display a message for requiring admin to enter mandatory data. (Refer to MSG 1\) |
| (7) | BR4 | **Validation Rules:** When the parent clicks the “Save” button for saving data of child sleep time information. System will move to step (6) to send data to database by method SaveSleepTimeInformation(SleepTime sleepTime) with parameter “sleepTime” is an object class with all information in these input above. The input data will be checked by table “SLEEPTIME” in the database (Refer to “SleepTime” table in “DB Sheet” file) to check if there are any constraints.  If the input is not valid: System moves to step (7.1) to display an error message (Refer to MSG 9). Else systems store all information in table “SLEEPTIME” in the database (Refer to “SleepTime” table in “DB Sheet” file). System moves to step (8) and displays successful notification (Refer to MSG 7), use method Close() to close the “Sleep Time Information” screen and display a list with updated data on the list view. |

9. ### *Sign Up for Parent Use Case* {#sign-up-for-parent-use-case}

##### Use Case Description

| Name | Sign Up for Parent  |
| :---- | :---- |
| **Description** | This use case allows the parent to sign up new account and use it to sign in into the system using that account. |
| **Actor** | Parent |
| **Trigger** | When the parent clicks on the “Sign Up” button on the “Sign In” screen. |
| **Pre-condition** | Parent’s device must be connected to the internet. |
| **Post-condition** | Parent’s account is created in the system and redirect to “Home Screen”. |

##### Sequence Flow	

![][image114]

##### Activities Flow

![][image115]

##### Business Rules

| Activity | BR Code | Description |
| :---- | :---- | :---- |
| (1) | BR1 | **Displaying Rules:** The system displays a “Sign Up” screen. (Refer to “Sign Up” view in “View Description” file) |
| (4) | BR2 | **Validation Rules:** When user click button “Sign Up” on the screen. The system will use method ValidateInput(username, password) to check event that the input is valid (empty or not) with parameter of \[txtBoxUsername\].Text and \[txtBoxPassword\].Text. If the input is not valid, the system moves to step (4.1) and displays an error message (Refer to MSG 1).  Else system moves to step (4.2) and send input data to the database by function CreateAccount (username, password) to process next step. |
| (5) | BR3 | **Validation Rules:** The input data (username and password) will be checked by table “ACCOUNT” in the database (Refer to “Account” table in “DB Sheet” file) if it exists in the system. If the account is existed, the system moves to step (5.1) and calls function displayErrorMessage() to display an error message (Refer to MSG 10). Else system moves to step (5.2) and displays a successful message MSG3, close this “Sign Up” screen by method Close() and redirect to “Home Screen” view. (Refer to “Home Screen” view in the “View Description” file).  |

2. ## **List Description** {#list-description}

![A screenshot of a computerDescription automatically generated][image116]

3. ## **View Description** {#view-description}

![A screenshot of a computerDescription automatically generated][image117]

2. # **Non-functional Requirements** {#non-functional-requirements}

   1. ## **User Access and Security**  {#user-access-and-security}

|                        Actor Function | Admin | Parent | Doctor |
| ----- | :---: | :---: | :---: |
| Adjust Doctor | X |  |  |
| Adjust Parent | X |  |  |
| Adjust Document | X |  |  |
| View User's Report | X |  |  |
| Supervise Prescription |  |  | X |
| Supervise Immunization Schedule |  |  | X |
| Supervise Child |  | X | X |
| Chat |  | X | X |
| Monitor Child Health Status |  | X | X |
| View Doctor Instruction |  | X |  |
| View Document |  | X |  |
| Track Child Events |  | X |  |
| Track Meal Times |  | X |  |
| Track Sleep Times |  | X |  |
| Sign Up for Parent |  | X |  |
| Sign In |  | X |  |

X: User has full permission to do the action.

X(\*): User has permission to do the action on his own items.

X(\*\*):  User has permission to do the action on items sent to him only.

2. ## **Performance Requirements** {#performance-requirements}

**Number of users**

* Number of concurrent users: 500\.  
* Number of business users: 50\.

**Data volume**

* Number of documents: 10,000.  
* Data growth rate: 20% annually.

**Level of availability**

24/7 availability required for this application.

**Usage frequency**

Daily

3. ## **Implementation Requirements** {#implementation-requirements}

**Location**

The location where this website and mobile will be deployed: Ho Chi Minh City.

**Read-only Duration**	

The duration this application can be set to read-only for a maximum duration of1 day.

**Read-only Timeframe**	

The timeframe this application can be set to read-only: 2 AM \- 4 AM EST.

**Maintenance Window**	

The maintenance window for the application is scheduled on a quarterly basis, during the last weekend of each quarter.

**Overall conversion timeline**

Data conversion activities are planned on the 5th and 20th of every month are the major update dates.

**Other plans and activities**

\[N/A\]

3. # **Other Requirements** {#other-requirements}

   1. ## **Archive Function** {#archive-function}

| List | Actor | Condition |
| :---- | :---- | :---- |
| Parent information | Admin | The Admin is able to archive items in the "Parent Information" list by created date. |
| Doctor information | Admin | The Admin is able to archive items in the "Doctor Information" list by created date. |
| Document  | Admin | The Admin is able to archive items in the "Document" list by created date. |
| Prescription | Doctor | The Doctor is able to archive items in the "Prescription" list by created date. |
| Immunization schedule | Doctor | The Doctor is able to archive items in the "Immunization schedule" list by created date. |
| Child information | Doctor / Parent | The Doctor/Parent is able to archive items in the "Child information" list by created date. |
| Child activity | Parent  | The Parent is able to archive items in the "Child activity" list by created date. |

   2. ## **Security Audit Function** {#security-audit-function}

Enable Security Audit Function for "Admin" to track any modifications on user’s permissions.

3. ## **ChildHeathCare Sites** {#childheathcare-sites}

| \# | Site Name | Description |
| :---- | :---- | :---- |
| 1 | Admin Site | This is the control console for administrators. It provides functionalities to Create, Read, Update, and Delete (CRUD) information related to Doctors, Parents, and Documents. Additionally, it allows admins to view User's Reports, providing a comprehensive overview of the system's usage and user activities. |
| 2 | Doctor site | This site is designed for doctors. It enables them to create prescriptions and immunization schedules for parents. It also facilitates communication between doctors and parents through a chat feature, allowing for real-time consultation and advice. |
| 3 | Parent site | It allows parents to manage their children's health information and view documents provided by admins.  Parents can also view prescriptions and schedules set by doctors.  The chat feature enables parents to communicate directly with doctors for any health-related queries or concerns. |

   4. ## **ChildHeathCare Lists** {#childheathcare-lists}

| \# | List Code | List Name | Description |
| ----- | ----- | :---: | :---- |
| 1 | List01 | Parent information | This list contains all the relevant information about the parents using the application. It includes details such as parent’s name, contact information, and their associated children in the system. |
| 2 | List02 | Doctor information | This list stores the details of the doctors available on the platform.  Information includes the doctor’s name, specialization, and contact information.  |
| 3 | List03 | Document | This list holds various documents provided by the admin or the doctors.  These could be general health tips, prescriptions, immunization schedules, or any other relevant health documents. |
| 4 | List04 | Prescription | This list contains the prescriptions provided by the doctors for each child.  Each prescription would include details like the medicine name, dosage, frequency, and duration. |
| 5 | List05 | Immunization schedule | This list holds the immunization schedules for each child.  It includes details like the name of the vaccine, the date it was given, the date for the next dose, and any additional notes. |
| 6 | List06 | Child information | This list contains all the relevant information about the children.  It may includes details such as the child’s name, date of birth, medical history, and associated parent information. |
| 7 | List07 | Child activity | This list tracks the various activities of each child.  These activities could include feeding times, sleep patterns, and any other significant activities or milestones. |

   5. ## **Custom Pages** {#custom-pages}

*\* There is no custom page implemented in this application. \**

6. ## **Scheduled Agents** {#scheduled-agents}

*\* There is no scheduled agent implemented in this application. \**

7. ## **Technical Concern** {#technical-concern}

**Low Growth Rate:** If the growth rate of the application’s user base or data volume is low, there is less risk of performance issues. However, it’s important to plan for potential future growth to ensure the application can scale effectively.

**Large Data Volume:** A huge amount of data can lead to saving/loading issues. It can slow down database queries and increase the load time of pages. Efficient data management strategies and optimization of database queries can help mitigate these issues.

**Excessive Content on a Single Page:** Too much content on a single page can lead to longer load times and a less responsive user interface. Implementing pagination or infinite scrolling can help manage the amount of content displayed at once.

**High Traffic:** If the application experiences high levels of traffic, it could strain the server and lead to slower response times. Implementing load balancing and caching strategies can help manage high traffic.

**Security Measures:** While necessary, certain security measures can impact performance. For example, data encryption and decryption can be resource intensive. It’s important to implement security measures in a way that balances safety and performance.

4. # **Appendixes** {#appendixes}

   1. ## **Glossary** {#glossary}

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term | Description |
| :---- | :---- |
| *BR* | **B**usiness **R**ule |
| *CBR* | **C**ommon **B**usiness **R**ule |
| *DB* | Notes **D**ata**b**ase |
| *MSG* | **M**es**s**a**g**e |
| *UC* | **U**se **C**ase |
| *N/A* | **N**ot **A**vailable or **N**ot **A**pplicable, used to indicate when information in a certain section could not be provided because it does not apply to this application. |
| *UI* | **U**ser **I**nterface |
| *SRS* | **S**oftware **R**equirements **S**pecification |
| *TBD* | **T**o **b**e **d**etermined or **t**o **b**e **d**efined |

2. ## **Mapping to Notes Application** {#mapping-to-notes-application}

*\* There is no mapping between the migrated application and its source Notes application. \**

3. ## **Messages** {#messages}

This section describes the details of messages used in business rules e.g. error messages, confirmation messages, etc.

| Message Code | Message Content | Button |
| :---- | :---- | ----- |
| MSG 1 | This field is mandatory. You must provide information in this field to proceed. | Ok |
| MSG 2 | Your username or password might be wrong. Please check and try again later. | Ok |
| MSG 3 | Sign in successful. | Ok |
| MSG 4 | Your information is not in the correct format. Please check again. | Ok |
| MSG 5 | Your entered email had been existed in the system. Please check again. | Ok |
| MSG 6 | Your entered phone number had been existed in the system. Please check again.  | Ok |
| MSG 7 | Save data successful. | Ok |
| MSG 8 | The size of image is too large. You need to compress it to upload. | Ok |
| MSG 9 | Your action is failed due to constraints in the system. | Ok |
| MSG 10 | This username had been existed in the system. Please choose another username. | Ok |
| MSG 11 | Are you sure you want to delete this \[item\]? | Yes/No |

4. ## **Issues List** {#issues-list}

N/A