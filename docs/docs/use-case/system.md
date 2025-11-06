# Use Case System - Tourist Management System

<!-- diagram id="use-case-system" -->

```plantuml
@startuml
left to right direction

actor Customer
actor Staff
actor Admin

package "Tourist Management System" {

  ' Authentication (shared by all)
  usecase UC_AUTH as "Authentication"
  usecase UC_LOGIN as "Sign In"
  usecase UC_SIGNUP as "Sign Up"
  usecase UC_FORGOT as "Forgot Password"
  usecase UC_PROFILE as "Manage Profile"

  ' Customer Use Cases
  package "Customer Functions" {
    usecase UC_BROWSE as "Browse Trips"
    usecase UC_CART as "Adjust Cart"
    usecase UC_FAV as "Adjust Favorite Trips"
    usecase UC_BOOK as "Manage Personal Bookings"
    usecase UC_CHECKOUT as "Checkout Cart"
  }

  ' Staff Use Cases
  package "Staff Functions" {
    usecase UC_ROUTES as "Manage Routes"
    usecase UC_SCHEDULE as "Manage Route Schedule"
    usecase UC_ATTR as "Manage Attractions"
    usecase UC_TRIPS as "Manage Trips"
    usecase UC_BOOKINGS as "Manage Bookings"
    usecase UC_CUSTOMERS as "Manage Customers"
    usecase UC_REPORTS as "View Reports"
  }

  ' Admin Use Cases
  package "Admin Functions" {
    usecase UC_STAFFS as "Manage Staffs"
    usecase UC_SYSTEM as "View System Monitoring"
  }
}

' Customer relationships
Customer -- UC_AUTH
Customer -- UC_BROWSE
Customer -- UC_CART
Customer -- UC_FAV
Customer -- UC_BOOK
Customer -- UC_CHECKOUT

' Staff relationships
Staff -- UC_AUTH
Staff -- UC_ROUTES
Staff -- UC_SCHEDULE
Staff -- UC_ATTR
Staff -- UC_TRIPS
Staff -- UC_BOOKINGS
Staff -- UC_CUSTOMERS
Staff -- UC_REPORTS

' Admin relationships (has all Staff functions + Admin-only functions)
Admin -- UC_AUTH
Admin -- UC_ROUTES
Admin -- UC_SCHEDULE
Admin -- UC_ATTR
Admin -- UC_TRIPS
Admin -- UC_BOOKINGS
Admin -- UC_CUSTOMERS
Admin -- UC_REPORTS
Admin -- UC_STAFFS
Admin -- UC_SYSTEM

' Include relationships
UC_AUTH ..> UC_LOGIN : <<include>>
UC_AUTH ..> UC_SIGNUP : <<include>>
UC_AUTH ..> UC_FORGOT : <<include>>
UC_AUTH ..> UC_PROFILE : <<include>>

@enduml
```

## Description

This diagram shows the complete system overview of the Tourist Management System with all actors and their primary use cases.

### Actors

1. **Customer** - End users who browse and book trips
2. **Staff** - Tourism company employees who manage operations
3. **Admin** - System administrators with full access

### Main Use Case Groups

#### Authentication (All Users)

- Sign In
- Sign Up (Customer only)
- Forgot Password
- Manage Profile

#### Customer Functions

- **Browse Trips** - Search and view available trips
- **Adjust Cart** - Manage shopping cart items
- **Adjust Favorite Trips** - Save favorite trips for later
- **Manage Personal Bookings** - View and manage own bookings
- **Checkout Cart** - Complete booking from cart

#### Staff Functions

- **Manage Routes** - CRUD operations on route templates
- **Manage Route Schedule** - Add/edit/delete attractions in routes (Admin only for add/edit/delete)
- **Manage Attractions** - CRUD operations on attractions (Admin for create)
- **Manage Trips** - Create and manage scheduled trips
- **Manage Bookings** - Handle all customer bookings
- **Manage Customers** - Customer account management
- **View Reports** - Booking, customer, and revenue reports

#### Admin Functions

- **Manage Staffs** - Staff account management (Admin only)
- **View System Monitoring** - System performance and usage monitoring
- All Staff functions are also available to Admin

### Notes

- Admin inherits all Staff permissions plus exclusive admin functions
- Customer functions are isolated from staff operations
- Authentication is required for all actors to access the system
