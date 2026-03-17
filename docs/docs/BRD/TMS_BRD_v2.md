# Tourist Management System (TMS) - Business Requirements Document

**Revision History**

| Date       | Version | Author   | Change Description                 |
| ---------- | ------- | -------- | ---------------------------------- |
| 07/11/2025 | 0.1     | TMS Team | Initial creation from SRS document |

**Approval**

| Date       | Version | Approver Name  | Position        |
| ---------- | ------- | -------------- | --------------- |
| 07/11/2025 | 0.1     | Đặng Phú Thiện | Project Manager |

**Table of Contents**

[1 Objective and Scope](#1-objective-and-scope)

[2 Business Requirement](#2-business-requirement)

[2.1 Application Overview](#21-application-overview)

[2.2 Domain Model](#22-domain-model)

[2.2.1 Diagram](#221-diagram)

[2.2.2 Domain Objects Description](#222-domain-objects-description)

[2.3 Use Cases and Actors](#23-use-cases-and-actors)

[2.3.1 Diagram](#231-diagram)

[2.3.2 Description of Actors](#232-description-of-actors)

[2.3.3 Description of Use Cases](#233-description-of-use-cases)

[2.4 Security Matrix](#24-security-matrix)

[2.5 Change Requirement](#25-change-requirement)

[3 Appendix](#3-appendix)

[3.1 Glossary](#31-glossary)

[3.2 Mapping to Web Application](#32-mapping-to-web-application)

[3.3 Open Issues](#33-open-issues)

## 1. Objective and Scope {#1-objective-and-scope}

This document describes the business requirements for TMS (Tourist Management System) Application. It contains the overall description of the application, the scope of implementation, and any changes need to be performed during development of the application.

This document along with the SRS and prototype demo is used for requirements confirmation, and it is to be signed off by the business. Details of business logic and graphic user interface of the application, which are not mentioned in this document, will be implemented as specified in the SRS document.

The TMS application is a comprehensive web-based platform designed to streamline tourism management operations, enabling efficient trip booking, route planning, and customer management across multiple user roles.

## 2. Business Requirement {#2-business-requirement}

### 2.1 Application Overview {#21-application-overview}

The Tourist Management System (TMS) aims to provide a comprehensive and user-friendly platform for managing tourism operations. The system facilitates booking management, route and attraction planning, trip scheduling, and customer relationship management.

The TMS platform allows:

- **Customers** to browse available trips, manage bookings, and handle payment transactions
- **Staff** to manage routes, attractions, trips, bookings, and customer accounts
- **Administrators** to oversee staff accounts and access all management functions

Target deployment: Web Application using ReactJS (Frontend) and Java Spring Boot (Backend)

### 2.2 Domain Model {#22-domain-model}

#### 2.2.1 Diagram {#221-diagram}

![Domain Diagram](./domain_diagram.md)

#### 2.2.2 Domain Objects Description {#222-domain-objects-description}

|  #  | Object Name         | Object Description                                                  |
| :-: | :------------------ | :------------------------------------------------------------------ |
|  1  | User                | System user account with role-based access (CUSTOMER, STAFF, ADMIN) |
|  2  | Category            | Classification for organizing attractions                           |
|  3  | Attraction          | Points of interest that can be included in routes                   |
|  4  | Route               | Travel itinerary template with duration and attractions             |
|  5  | Route_Attraction    | Links routes and attractions with scheduling details                |
|  6  | Trip                | Scheduled instance of a route with dates and pricing                |
|  7  | Cart                | Shopping cart for holding trip selections                           |
|  8  | Cart_Item           | Individual trip entry in cart                                       |
|  9  | Favorite_Tour       | Wishlist for saving routes                                          |
| 10  | Tour_Booking        | Main booking record with customer and trip info                     |
| 11  | Tour_Booking_Detail | Passenger breakdown (adults/children)                               |
| 12  | Booking_Traveler    | Individual traveler details                                         |
| 13  | Invoice             | Payment record with amount and status                               |

### 2.3 Use Cases and Actors {#23-use-cases-and-actors}

#### 2.3.1 Diagram {#231-diagram}

<!--
**a. System Use Case**

Refer to [Use Case Diagrams](../use-case/user.md)

**b. Customer Use Case**

Refer to [Customer Use Case Diagram](../use-case/customer.md)

**c. Staff Use Case**

Refer to [Staff Use Case Diagram](../use-case/staff.md)

**d. Admin Use Case**

Refer to [Admin Use Case Diagram](../use-case/admin.md) -->

#### 2.3.2 Description of Actors {#232-description-of-actors}

| #   | Actor Name | Definition                                                    |
| :-- | :--------- | :------------------------------------------------------------ |
| 1   | Customer   | End users who browse and book trips through the system        |
| 2   | Staff      | Tourism company employees who manage operations               |
| 3   | Admin      | System administrators with full access to all functionalities |

#### 2.3.3 Description of Use Cases {#233-description-of-use-cases}

| #   | Use Case Name                          | Definition                                                      |
| --- | -------------------------------------- | --------------------------------------------------------------- |
| 1   | Sign In                                | User authentication using credentials with JWT token generation |
| 2   | Sign Up                                | Customer self-registration with account creation                |
| 3   | Forgot Password                        | Password recovery via email verification                        |
| 4   | Manage Profile                         | View and update personal information                            |
| 5   | View and Filter Available Trips        | Browse trips with search filters and pagination                 |
| 6   | View Trip Details                      | Display comprehensive trip information with itinerary           |
| 7   | Add Trip to Cart                       | Add trip selections to shopping cart                            |
| 8   | Remove Trip from Cart                  | Delete cart items with confirmation                             |
| 9   | Edit Trip Details in Cart              | Modify cart item quantities                                     |
| 10  | View and Filter Trips in Cart          | Cart overview with filtering capabilities                       |
| 11  | Toggle Favorite Trip                   | Add/remove trips from wishlist                                  |
| 12  | View and Filter Favorite Trips         | Display saved favorite trips                                    |
| 13  | Book a Trip                            | Direct trip booking bypassing cart                              |
| 14  | Checkout Cart                          | Bulk booking process from shopping cart                         |
| 15  | View and Filter Personal Bookings      | Customer booking history organized by status                    |
| 16  | Edit Upcoming Trip's Passenger Details | Modify traveler information for confirmed bookings              |
| 17  | View and Pay Booking Invoice Details   | Invoice display and payment processing                          |
| 18  | Add New Route                          | Staff creates new route template                                |
| 19  | View Route Detail                      | Display complete route information                              |
| 20  | Edit Route Detail                      | Modify existing route information                               |
| 21  | Delete Route                           | Remove route with dependency checking                           |
| 22  | View and Filter Routes                 | Routes list with search capabilities                            |
| 23  | Add New Itinerary                      | Add attractions to route schedule                               |
| 24  | View Route Schedule                    | Display day-by-day itinerary                                    |
| 25  | Edit Itinerary                         | Modify attraction scheduling in route                           |
| 26  | Delete Itinerary                       | Remove attraction from schedule                                 |
| 27  | Add New Attraction                     | Create new attraction record                                    |
| 28  | View Attraction Detail                 | Display attraction information                                  |
| 29  | Edit Attraction Detail                 | Modify attraction details                                       |
| 30  | Delete Attraction                      | Remove or deactivate attraction                                 |
| 31  | View and Filter Attractions            | Attractions catalog with filtering                              |
| 32  | Add New Trip                           | Create bookable trip from route template                        |
| 33  | View Trip Details                      | Staff view of trip with booking summary                         |
| 34  | Edit Trip                              | Modify scheduled trip information                               |
| 35  | Delete Trip                            | Remove trip or cancel with bookings                             |
| 36  | Add New Booking for Trip               | Staff-assisted booking creation                                 |
| 37  | View and Filter Trips                  | Trips management interface                                      |
| 38  | Add New Booking                        | Generic booking creation function                               |
| 39  | View and Filter Bookings               | Comprehensive bookings list                                     |
| 40  | View Booking Details                   | Complete booking information display                            |
| 41  | View Booking's Invoice                 | Invoice detail display for bookings                             |
| 42  | Edit Pre-departure Booking             | Modify bookings before departure                                |
| 43  | Delete Booking                         | Cancel and remove booking                                       |
| 44  | Add New Customer                       | Staff creates customer account                                  |
| 45  | View and Filter Customers              | Customer database management                                    |
| 46  | View Customer Details                  | Complete customer profile                                       |
| 47  | Edit Customer                          | Modify customer information                                     |
| 48  | Delete Customer                        | Remove customer with safety checks                              |
| 49  | Add New Staff                          | Admin creates staff account                                     |
| 50  | View and Filter Staffs                 | Staff database management interface                             |
| 51  | View Staff Details                     | Staff member profile with metrics                               |
| 52  | Edit Staff                             | Modify staff account details                                    |
| 53  | Delete Staff                           | Remove staff with dependency verification                       |
| 54  | View Booking Reports                   | Display booking statistics and analytics                        |
| 55  | View Customer Reports                  | Display customer statistics and analytics                       |
| 56  | View Revenue Reports                   | Display revenue statistics by period                            |

### 2.4 Security Matrix {#24-security-matrix}

| Function                               | Customer | Staff | Admin |
| -------------------------------------- | :------: | :---: | :---: |
| Sign In                                |    X     |   X   |   X   |
| Sign Up                                |    X     |       |       |
| Forgot Password                        |    X     |   X   |   X   |
| Manage Profile                         |    X     |   X   |   X   |
| View and Filter Available Trips        |    X     |   X   |   X   |
| View Trip Details                      |    X     |   X   |   X   |
| Add Trip to Cart                       |    X     |       |       |
| Remove Trip from Cart                  |    X     |       |       |
| Edit Trip Details in Cart              |    X     |       |       |
| View and Filter Trips in Cart          |    X     |       |       |
| Toggle Favorite Trip                   |    X     |       |       |
| View and Filter Favorite Trips         |    X     |       |       |
| Book a Trip                            |    X     |       |       |
| Checkout Cart                          |    X     |       |       |
| View and Filter Personal Bookings      |  X (\*)  |       |       |
| Edit Upcoming Trip's Passenger Details |  X (\*)  |       |       |
| View and Pay Booking Invoice Details   |  X (\*)  |       |       |
| Add New Route                          |          |   X   |   X   |
| View Route Detail                      |          |   X   |   X   |
| Edit Route Detail                      |          |   X   |   X   |
| Delete Route                           |          |   X   |   X   |
| View and Filter Routes                 |          |   X   |   X   |
| Add New Itinerary                      |          |       |   X   |
| View Route Schedule                    |          |   X   |   X   |
| Edit Itinerary                         |          |       |   X   |
| Delete Itinerary                       |          |       |   X   |
| Add New Attraction                     |          |       |   X   |
| View Attraction Detail                 |          |   X   |   X   |
| Edit Attraction Detail                 |          |   X   |   X   |
| Delete Attraction                      |          |   X   |   X   |
| View and Filter Attractions            |          |   X   |   X   |
| Add New Trip                           |          |   X   |   X   |
| View Trip Details                      |          |   X   |   X   |
| Edit Trip                              |          |   X   |   X   |
| Delete Trip                            |          |   X   |   X   |
| Add New Booking for Trip               |          |   X   |   X   |
| View and Filter Trips                  |          |   X   |   X   |
| Add New Booking                        |          |   X   |   X   |
| View and Filter Bookings               |          |   X   |   X   |
| View Booking Details                   |          |   X   |   X   |
| View Booking's Invoice                 |          |   X   |   X   |
| Edit Pre-departure Booking             |          |   X   |   X   |
| Delete Booking                         |          |   X   |   X   |
| Add New Customer                       |          |   X   |   X   |
| View and Filter Customers              |          |   X   |   X   |
| View Customer Details                  |          |   X   |   X   |
| Edit Customer                          |          |   X   |   X   |
| Delete Customer                        |          |   X   |   X   |
| Add New Staff                          |          |       |   X   |
| View and Filter Staffs                 |          |       |   X   |
| View Staff Details                     |          |       |   X   |
| Edit Staff                             |          |       |   X   |
| Delete Staff                           |          |       |   X   |
| View Booking Reports                   |          |   X   |   X   |
| View Customer Reports                  |          |   X   |   X   |
| View Revenue Reports                   |          |   X   |   X   |

**Legend:**

- **X**: User has full permission to perform the action
- **X (\*)**: User has permission only on their own records
- Empty: User does not have permission

### 2.5 Change Requirement {#25-change-requirement}

| #   | Item Name | Change Description                   |
| --- | --------- | ------------------------------------ |
| 1   | N/A       | No changes requested at this version |

## 3. Appendix {#3-appendix}

### 3.1 Glossary {#31-glossary}

| Term   | Description                                     |
| :----- | :---------------------------------------------- |
| _TMS_  | **T**ourist **M**anagement **S**ystem           |
| _BRD_  | **B**usiness **R**equirements **D**ocument      |
| _SRS_  | **S**oftware **R**equirements **S**pecification |
| _UC_   | **U**se **C**ase                                |
| _UI_   | **U**ser **I**nterface                          |
| _JWT_  | **J**SON **W**eb **T**oken                      |
| _CRUD_ | **C**reate, **R**ead, **U**pdate, **D**elete    |
| _N/A_  | **N**ot **A**vailable or **N**ot **A**pplicable |
| _TBD_  | **T**o **b**e **d**etermined                    |

### 3.2 Mapping to Web Application {#32-mapping-to-web-application}

|     | Application Elements            | Web Implementation              |
| :-- | :------------------------------ | :------------------------------ |
|     | **_Use Cases / Features_**      |                                 |
| 1   | Sign In                         | `/auth/sign-in`                 |
| 2   | Sign Up                         | `/auth/sign-up`                 |
| 3   | Forgot Password                 | `/auth/forgot-password`         |
| 4   | Manage Profile                  | `/profile`                      |
| 5   | View and Filter Available Trips | `/trips`                        |
| 6   | View Trip Details               | `/trips/:id`                    |
| 7   | Add/Edit/Remove Cart Items      | `/cart`                         |
| 8   | Favorite Trips                  | `/favorites`                    |
| 9   | Book a Trip                     | `/trips/:id/book`               |
| 10  | Checkout Cart                   | `/checkout`                     |
| 11  | View Personal Bookings          | `/my-bookings`                  |
| 12  | Edit Booking Travelers          | `/bookings/:id/edit-travelers`  |
| 13  | View and Pay Invoice            | `/bookings/:id/invoice`         |
| 14  | Manage Routes                   | `/staff/routes`                 |
| 15  | Manage Route Schedule           | `/staff/routes/:id/schedule`    |
| 16  | Manage Attractions              | `/staff/attractions`            |
| 17  | Manage Trips                    | `/staff/trips`                  |
| 18  | Manage Bookings                 | `/staff/bookings`               |
| 19  | Manage Customers                | `/staff/customers`              |
| 20  | Manage Staffs                   | `/admin/staffs`                 |
| 21  | View Booking Reports            | `/staff/reports/bookings`       |
| 22  | View Customer Reports           | `/staff/reports/customers`      |
| 23  | View Revenue Reports            | `/staff/reports/revenue`        |
|     | **_Data Objects_**              |                                 |
| 1   | User                            | `User` entity                   |
| 2   | Route                           | `Route` entity                  |
| 3   | Attraction                      | `Attraction` entity             |
| 4   | Category                        | `Category` entity               |
| 5   | Route_Attraction                | `Route_Attraction` join table   |
| 6   | Trip                            | `Trip` entity                   |
| 7   | Cart & Cart_Item                | `Cart` and `Cart_Item` entities |
| 8   | Favorite_Tour                   | `Favorite_Tour` join table      |
| 9   | Tour_Booking                    | `Tour_Booking` entity           |
| 10  | Tour_Booking_Detail             | `Tour_Booking_Detail` entity    |
| 11  | Booking_Traveler                | `Booking_Traveler` entity       |
| 12  | Invoice                         | `Invoice` entity                |
|     | **_Actors_**                    |                                 |
| 1   | Customer                        | Role = 'CUSTOMER' in User table |
| 2   | Staff                           | Role = 'STAFF' in User table    |
| 3   | Admin                           | Role = 'ADMIN' in User table    |

### 3.3 Open Issues {#33-open-issues}

| #   | Issue Description                          | Status | Target Resolution Date |
| --- | ------------------------------------------ | ------ | ---------------------- |
| 1   | Integration with payment gateway selection | Open   | TBD                    |
| 2   | Email service provider selection           | Open   | TBD                    |
| 3   | Image storage solution                     | Open   | TBD                    |
| 4   | Refund processing workflow                 | Open   | TBD                    |
| 5   | Multi-language support requirement         | Open   | TBD                    |

---

**Document End**
