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

The Tourist Management System (TMS) aims to provide a comprehensive and user-friendly platform for managing tourism operations. The system facilitates booking management, route and attraction planning, trip scheduling, and customer relationship management. It enables seamless communication between customers, staff, and administrators through role-based access control.

The TMS platform allows:

- **Customers** to browse available trips, manage bookings, maintain favorite destinations, and handle payment transactions
- **Staff** to manage routes, attractions, trips, bookings, and customer accounts
- **Administrators** to oversee staff accounts, system configurations, and access all management functions

Target deployment: Web Application using ReactJS (Frontend) and Java Spring Boot (Backend)

### 2.2 Domain Model {#22-domain-model}

#### 2.2.1 Diagram {#221-diagram}

![Domain Diagram](./domain_diagram.md)

The domain model illustrates the core business entities and their relationships within the TMS system, organized into four main domains:

1. **User Domain**: Authentication and authorization
2. **Trip Planning Domain**: Routes, attractions, and trip scheduling
3. **Shopping Domain**: Cart and favorites management
4. **Booking Domain**: Reservations, travelers, and invoices

#### 2.2.2 Domain Objects Description {#222-domain-objects-description}

|  #  | Object Name         | Object Description                                                                                                  |
| :-: | :------------------ | :------------------------------------------------------------------------------------------------------------------ |
|  1  | User                | System user account with role-based access (CUSTOMER, STAFF, ADMIN). Contains credentials and personal information. |
|  2  | Category            | Classification for organizing attractions into logical groups.                                                      |
|  3  | Attraction          | Points of interest that can be included in routes. Contains name, description, location, and status.                |
|  4  | Route               | Travel itinerary template from start to end location with duration and associated attractions.                      |
|  5  | Route_Attraction    | Links routes and attractions with day number, visit order, and activity description.                                |
|  6  | Trip                | Scheduled instance of a route with specific dates, pricing, and seat capacity.                                      |
|  7  | Cart                | Shopping cart for holding trip selections before checkout. One cart per customer.                                   |
|  8  | Cart_Item           | Individual trip entry in cart with quantity and price snapshot.                                                     |
|  9  | Favorite_Tour       | Wishlist for customers to save interesting routes without booking.                                                  |
| 10  | Tour_Booking        | Main booking record with trip reference, customer info, seats booked, and status.                                   |
| 11  | Tour_Booking_Detail | Passenger type breakdown (adults vs children) for pricing.                                                          |
| 12  | Booking_Traveler    | Individual traveler details required for documentation.                                                             |
| 13  | Invoice             | Payment record with total amount, status, and method.                                                               |

### 2.3 Use Cases and Actors {#23-use-cases-and-actors}

#### 2.3.1 Diagram {#231-diagram}

<!-- **a. System Use Case - Overview**

Refer to [Use Case Diagrams](../use-case/user.md) in the documentation.

**b. Customer Use Case**

Refer to [Customer Use Case Diagram](../use-case/customer.md)

**c. Staff Use Case**

Refer to [Staff Use Case Diagram](../use-case/staff.md)

**d. Admin Use Case**

Refer to [Admin Use Case Diagram](../use-case/admin.md) -->

#### 2.3.2 Description of Actors {#232-description-of-actors}

| #   | Actor Name | Definition                                                                                                                                                                                                                                                                                                                                                                      |
| :-- | :--------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | Customer   | End users who browse and book trips through the system. Can create accounts, search for trips, manage shopping cart, save favorite routes, make bookings, view booking history, update personal profile, and process payments through integrated gateway. Primary revenue-generating users of the system.                                                                       |
| 2   | Staff      | Tourism company employees who manage operational aspects of the system. Can handle routes (create, edit, delete), manage attractions and their scheduling in routes, create and modify trips, process bookings on behalf of customers, manage customer accounts, and view booking/customer reports. Requires authentication and has elevated permissions compared to customers. |
| 3   | Admin      | System administrators with full access to all functionalities. Can manage staff accounts (create, edit, delete, lock), perform all staff functions, access system-wide reports and analytics, and configure system settings. Highest level of authority in the system with ability to oversee all operations and user activities.                                               |

#### 2.3.3 Description of Use Cases {#233-description-of-use-cases}

| #   | Use Case Name                          | Definition                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | Primary Actor          |
| --- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | Sign In                                | User authentication process allowing customers, staff, and admin to access the system using username/email and password. System validates credentials, verifies account status (not locked), generates JWT token for session management, and redirects to role-appropriate dashboard. Includes account lockout after 5 failed attempts for security.                                                                                                                               | All Users              |
| 2   | Sign Up                                | New customer self-registration process. Users provide username, email, full name, password (with strength requirements), phone number, and agree to terms. System validates uniqueness of username/email, creates account with CUSTOMER role and ACTIVE status, initializes empty shopping cart, sends welcome email, and redirects to sign-in page.                                                                                                                               | New Customer           |
| 3   | Forgot Password                        | Password recovery workflow using email verification. User submits email address, system generates time-limited reset token (24h expiry), sends reset link via email, validates token upon click, allows user to set new password meeting strength requirements, updates password hash, and invalidates reset token. Prevents email enumeration by showing generic success message.                                                                                                 | All Users              |
| 4   | Manage Profile                         | Account management functionality for viewing and editing personal information. Users can update full name, email, phone number, upload avatar image, and change password (requires current password verification). System validates unique email, sends notification if email changes, requires re-login after password change.                                                                                                                                                    | All Users              |
| 5   | View and Filter Available Trips        | Trip browsing and search feature for customers. Users can filter by keyword (trip/destination name), departure date range, price range, and destination. System displays paginated results (12 per page) with trip cards showing thumbnail, name, destination, dates, price, available seats, and action buttons (view details, add to cart, add to favorites). Empty state shown when no trips match filters.                                                                     | Customer, Staff, Admin |
| 6   | View Trip Details                      | Detailed trip information display showing comprehensive data about a selected trip. Includes full itinerary from associated route, list of attractions with day-by-day schedule, pricing details, available slots, departure/return dates, pickup location, and route description. Customers can add to cart or favorites from this view. Staff can see booking statistics.                                                                                                        | Customer, Staff, Admin |
| 7   | Add Trip to Cart                       | Shopping cart functionality allowing customers to temporarily store trip selections. Users select quantity (number of seats), system validates availability, checks for duplicate entries (updates quantity if exists), stores price snapshot, and updates cart badge counter. Requires authentication - redirects to sign-in if not logged in. Maximum 20 seats per cart item.                                                                                                    | Customer               |
| 8   | Remove Trip from Cart                  | Cart item deletion with confirmation. System displays trip details in confirmation dialog, upon confirmation removes item from database, recalculates cart total, updates UI to remove item row, shows empty cart message if no items remain, and disables checkout button on empty cart.                                                                                                                                                                                          | Customer               |
| 9   | Edit Trip Details in Cart              | Modify quantity of trips in shopping cart. System validates new quantity against available seats, prevents reduction below 1 or increase above 20, checks trip still valid (not canceled/past), updates cart item quantity and recalculates price, refreshes cart view with new totals. Warning shown if trip becomes unavailable during editing.                                                                                                                                  | Customer               |
| 10  | View and Filter Trips in Cart          | Cart overview with filtering capabilities. Displays all cart items with trip details, quantities, and individual/total prices. Users can filter by destination, departure date range, price range. Shows empty cart state with "Explore Tours" button if no items. Calculates subtotal, tax (10%), and grand total. Enables checkout button when items present.                                                                                                                    | Customer               |
| 11  | Toggle Favorite Trip                   | Wishlist functionality for saving interesting trips. Single button toggles favorite status - adds to favorites if not present, removes if already favorited. System checks authentication first (redirects to sign-in if needed), updates database accordingly, changes heart icon state (filled/empty), and shows toast notification confirming action. No quantity or booking commitment required.                                                                               | Customer               |
| 12  | View and Filter Favorite Trips         | Display of user's saved favorite trips with filtering options. Shows list of favorited trips with same information as browse trips view (thumbnail, name, dates, price, seats). Users can filter by destination, date range, price. Each trip has heart icon (filled), view details button, and add to cart button. Empty state encourages exploration when no favorites saved.                                                                                                    | Customer               |
| 13  | Book a Trip                            | Direct trip booking process bypassing cart. Customer selects trip from details page, enters number of adults and children, provides traveler information (name, ID, phone, email for each person), confirms booking. System validates seat availability, creates Tour_Booking with CONFIRMED status, generates associated invoice, decrements available seats on trip, sends confirmation email with e-ticket. Requires authentication.                                            | Customer               |
| 14  | Checkout Cart                          | Bulk booking process from shopping cart. Customer reviews all cart items, enters traveler details for all selected trips, confirms total amount. System validates all trips still available and active, creates multiple bookings in single transaction, generates invoices for each, updates seat availability, clears cart after success, sends confirmation email with all e-tickets. Prevents checkout if any trip becomes invalid.                                            | Customer               |
| 15  | View and Filter Personal Bookings      | Customer's booking history with filtering and tabs. Shows all bookings organized in tabs: Upcoming (future departures), Past (completed trips), Canceled. Users can filter by trip name, booking status, date range. Each booking displays ID, trip/route info, dates, passenger count, total amount, status, and action buttons (view details, view invoice). Empty state when no bookings exist.                                                                                 | Customer               |
| 16  | Edit Upcoming Trip's Passenger Details | Modify traveler information for confirmed bookings. Allowed only for bookings with departure ≥48 hours away and status CONFIRMED/PENDING. Users can update traveler names, ID numbers, phone, email for each passenger. System validates fields, updates database, sends confirmation email to all updated email addresses. Cannot change booking dates or quantity through this function.                                                                                         | Customer               |
| 17  | View and Pay Booking Invoice Details   | Invoice display and payment processing. Shows invoice details (ID, booking info, amounts breakdown, payment status, due date). If unpaid and booking not canceled/completed and not overdue, customer can click "Pay Now" to proceed to payment gateway. System integrates with payment provider, validates payment success, updates invoice status to PAID, updates booking to CONFIRMED, sends email with receipt and e-ticket PDF attachment.                                   | Customer               |
| 18  | Add New Route                          | Route creation function for staff. Staff enters route name, start/end locations, duration in days, uploads route image, sets status. System validates minimum name length (3 chars), duration range (1-30 days), image file requirements (JPG/PNG, max 5MB), creates route record, redirects to routes list with new route highlighted. Foundation for creating trips later.                                                                                                       | Staff                  |
| 19  | View Route Detail                      | Comprehensive route information display. Shows route basic info (name, locations, duration, image, status), counts total trips using this route, displays schedule summary organized by day with associated attractions listed for each day. Staff can see complete itinerary structure. Accessed by clicking route in list.                                                                                                                                                       | Staff, Admin           |
| 20  | Edit Route Detail                      | Modification of existing route information. Staff updates route name, start/end locations, duration, image, or status. System validates same constraints as creation, prevents editing if route has active trips or is archived, updates route record, reloads detail view with changes reflected. Cannot modify core structure if trips already scheduled.                                                                                                                        | Staff                  |
| 21  | Delete Route                           | Route removal with dependency checking. System first checks for related trips and attractions in schedule. If dependencies exist, displays error with details and prevents deletion. If no dependencies, shows confirmation dialog, upon confirm permanently deletes route from database, refreshes routes list. Cannot be undone. Ensures referential integrity.                                                                                                                  | Staff                  |
| 22  | View and Filter Routes                 | Routes list with search and filter capabilities. Displays all routes with cards showing name, start/end locations, duration, status, image thumbnail, and trip count. Staff can filter by route name search, status (All/Active/Inactive), duration range (min/max days). Shows "Add Route" button when no routes exist. Paginated results for large datasets.                                                                                                                     | Staff, Admin           |
| 23  | Add New Itinerary                      | Adding attractions to route schedule. Admin selects attraction from dropdown, specifies day number (1 to route.duration_days), visit order (1-20), and activity description. System validates no duplicate attractions in same route, checks order conflicts, adjusts existing orders if needed, inserts new schedule entry, reloads route schedule view. Builds the day-by-day itinerary structure.                                                                               | Admin                  |
| 24  | View Route Schedule                    | Display of complete route itinerary organized by days. Shows route header info and full schedule grouped by day_number with attractions listed in order_in_day sequence. Each attraction shows name, location, and activity description. Admin sees edit/delete buttons for each item. Staff sees read-only view. Empty message with "Add Attraction" button if no schedule defined.                                                                                               | Staff, Admin           |
| 25  | Edit Itinerary                         | Modification of attraction scheduling in route. Admin can change day number, visit order, or activity description for scheduled attraction. System validates new day within route duration, new order valid (1-20), adjusts conflicts by shifting other attractions, updates database, reloads schedule. Cannot edit if route is closed. Used to refine itinerary after initial creation.                                                                                          | Admin                  |
| 26  | Delete Itinerary                       | Removal of attraction from route schedule. System prevents deletion if attraction is the last one in schedule (route must have at least one). Shows confirmation dialog with attraction name and day. Upon confirm, deletes schedule entry, adjusts visit orders for remaining attractions on same day, reloads schedule view. Cannot edit if route is closed.                                                                                                                     | Admin                  |
| 27  | Add New Attraction                     | Attraction creation for system-wide use. Staff enters attraction name, description, location, selects category, sets status. System validates name length (≥3), description length (≥20), checks for duplicate name+location combination, creates attraction record, redirects to attractions list. These attractions become available for adding to route schedules.                                                                                                              | Admin                  |
| 28  | View Attraction Detail                 | Detailed attraction information display. Shows attraction name, description, location, category, status, and usage summary (number of routes using this attraction). Accessed by clicking attraction in list. Read-only view providing complete context about the attraction.                                                                                                                                                                                                      | Staff, Admin           |
| 29  | Edit Attraction Detail                 | Modification of existing attraction information. Staff updates name, description, location, category, or status. System validates same constraints as creation, checks for duplicate name+location (excluding current record), prevents editing if status is DELETED, updates database, reloads detail view. Changes affect all routes using this attraction.                                                                                                                      | Staff, Admin           |
| 30  | Delete Attraction                      | Attraction removal with soft-delete approach. System first checks if attraction is used in any route schedules. If used, offers to set status to INACTIVE instead of deleting (preserves referential integrity for existing routes). If not used, shows confirmation and sets status to DELETED (soft delete - keeps record but hides from most views). Prevents orphaned schedule references.                                                                                     | Staff, Admin           |
| 31  | View and Filter Attractions            | Attractions list with comprehensive filtering. Displays all non-deleted attractions with cards showing name, location, category, status, and usage count ("Used in X routes"). Users can filter by name search, location search, category dropdown, status dropdown. Shows "No attractions found" when empty. Used as catalog for building route schedules.                                                                                                                        | Staff, Admin           |
| 32  | Add New Trip                           | Trip creation from route template. Staff selects route, sets departure/return dates, enters price, total seats, pickup location, and status. System validates departure in future, return after departure, checks for duplicate trip on same route and date, creates trip record with booked_seats=0, redirects to trips list. Instantiates a bookable trip from route definition.                                                                                                 | Staff                  |
| 33  | View Trip Details                      | Comprehensive trip information display. Shows trip info (route name, dates, price, seats availability with progress bar), booking summary (total bookings, travelers, confirmed count), and route details. Staff sees "Add Booking" button. Provides complete context for managing individual trip.                                                                                                                                                                                | Staff, Admin           |
| 34  | Edit Trip                              | Modification of scheduled trip information. Staff updates departure/return dates, price, total seats, pickup location, or status. System validates dates not in past, return after departure, prevents reducing seats below current booked count, checks editable status (not canceled/completed). Updates database, reloads detail view. Cannot modify if trip already departed.                                                                                                  | Staff                  |
| 35  | Delete Trip                            | Trip removal with booking dependency handling. System checks for pending/confirmed bookings. If bookings exist, offers to cancel trip instead (sets status to CANCELED, cancels all bookings, preserves records). If no bookings, shows confirmation and permanently deletes trip record. Ensures no orphaned bookings remain.                                                                                                                                                     | Staff                  |
| 36  | Add New Booking for Trip               | Staff-assisted booking creation from trip details. Staff searches and selects customer, enters number of adults/children, provides traveler names (one per line), selects payment method, confirms total. System validates trip availability, customer account not locked, sufficient seats, creates booking with CONFIRMED status in transaction (locks trip row to prevent overselling), generates invoice, updates booked_seats, sends confirmation email.                      | Staff                  |
| 37  | View and Filter Trips                  | Trips list with filtering by route, date range, status, and availability. Displays all trips with cards showing route info, dates, price, seats indicator (booked/total), status badge, and action buttons (view, edit, delete, add booking). Staff can filter by specific route, departure date range, trip status, and checkbox for "available seats only". Paginated results. Central operations interface for trip management.                                                 | Staff, Admin           |
| 38  | Add New Booking                        | Generic booking creation function. Staff selects customer and trip from dropdowns, enters passenger details and traveler names, selects payment method, confirms. System validates trip scheduled and in future, customer account active, sufficient seats available, creates booking transaction (locks trip to prevent conflicts), generates invoice, updates seats, clears any cart items, sends confirmation. Alternative to customer self-booking.                            | Staff                  |
| 39  | View and Filter Bookings               | Comprehensive bookings list for operational management. Displays all bookings with customer name/email, route name, departure date, passenger counts, total amount, status, and payment status. Staff can filter by customer name/email search, trip selection, booking status, booking date range. Shows "No bookings" when empty. Primary interface for staff to monitor and manage all reservations.                                                                            | Staff, Admin           |
| 40  | View Booking Details                   | Detailed booking information display. Shows booking info panel (ID, date, status), customer info panel (name, email, phone), trip info panel (route, dates, pickup), passengers panel (adults/children counts, full traveler names list), invoice panel (amount, payment method/status with "View Invoice" button), and action buttons based on status. Complete booking context for staff operations.                                                                             | Staff, Admin           |
| 41  | View Booking's Invoice                 | Invoice detail display for bookings. Shows invoice ID, booking ID, customer name, total amount, payment method, payment status (color-coded: green=PAID, yellow=PENDING, red=FAILED), issued date. Includes "Print" button for generating physical receipts. Accessed from booking details view. Provides payment transaction audit trail.                                                                                                                                         | Staff, Admin           |
| 42  | Edit Pre-departure Booking             | Modification of bookings before trip departure. Staff can update passenger counts (adults/children) and traveler names for bookings with status PENDING/CONFIRMED and departure ≥7 days away (cutoff period). System validates new quantities against availability, updates booking, travelers, and invoice in transaction (locks booking and trip rows), recalculates pricing, adjusts booked_seats on trip. Cannot edit paid bookings without refund processing or after cutoff. | Staff                  |
| 43  | Delete Booking                         | Booking cancellation and removal. System verifies booking status (PENDING/CONFIRMED) and departure ≥7 days away (cutoff). Shows confirmation with impact (frees X seats). Upon confirm, decrements trip's booked_seats, deletes travelers, invoice, and booking record in transaction. Cannot delete if past cutoff or for completed/canceled trips. Provides "undo" for accidental bookings if within policy.                                                                     | Staff                  |
| 44  | Add New Customer                       | Customer account creation by staff (alternative to self-registration). Staff enters username, password, full name, email, phone, address, birthday, gender. System validates username length (≥3), password length (≥6), email format, checks username/email uniqueness, creates User with CUSTOMER role and Active status, creates empty Cart, sends welcome email with credentials. Used for walk-in or phone bookings.                                                          | Staff                  |
| 45  | View and Filter Customers              | Customer database with search and filtering. Displays all customers with cards showing name, email, phone, total bookings count, total spent amount, join date, status, and action buttons. Staff can filter by name search, email search, status dropdown, registration date range. Shows booking statistics for customer relationship insights. Primary interface for customer service operations.                                                                               | Staff, Admin           |
| 46  | View Customer Details                  | Comprehensive customer profile display. Shows personal info panel (name, email, phone, address, status), statistics panel (total bookings, total spent, last booking date), recent bookings list (top 5 most recent), and favorite routes list. Provides 360-degree customer view for personalized service. Action buttons for edit/delete.                                                                                                                                        | Staff, Admin           |
| 47  | Edit Customer                          | Customer information modification by staff. Staff updates full name, email, phone, address, birthday, gender, or account status (Active/Locked). System validates email format, checks email uniqueness (excluding current record), updates database, reloads detail view. Used for correcting customer information or account management (e.g., locking abusive accounts).                                                                                                        | Staff                  |
| 48  | Delete Customer                        | Customer account removal with safety checks. System verifies no active bookings (PENDING/CONFIRMED) or unpaid invoices exist. If violations found, displays error preventing deletion. If safe, shows dialog offering two options: "Set to LOCKED" (soft disable, preserves data) or "Delete Permanently" (hard delete with cart). Deletes cart if permanent deletion chosen. Ensures financial integrity before removal.                                                          | Staff                  |
| 49  | Add New Staff                          | Staff account creation by admin. Admin enters username, password, full name, email, phone, address, birthday, gender. System validates username length (≥3), password length (≥8 for staff), age ≥18 (staff requirement), email format, checks uniqueness, creates User with STAFF role and Active status, creates empty Cart (for consistency), sends welcome email with credentials. Grants operational access to new employee.                                                  | Admin                  |
| 50  | View and Filter Staffs                 | Staff database management interface. Displays all staff members with cards showing name, username, email, phone, total managed bookings count (performance metric), join date, status, and action buttons. Admin can filter by keyword (name/username), phone, lock status checkbox, gender dropdown. Shows "No staffs found" when empty. Primary HR/management interface for workforce oversight.                                                                                 | Admin                  |
| 51  | View Staff Details                     | Detailed staff member profile. Shows personal info panel (name, email, phone, status), work statistics panel (total bookings handled, total trips managed, total routes managed), and recent bookings list (top 10 most recent bookings this staff processed). Provides performance metrics and activity audit. Action buttons for edit/delete.                                                                                                                                    | Admin                  |
| 52  | Edit Staff                             | Staff account modification by admin. Admin updates full name, email, phone, address, birthday, gender, password (optional - if changed, requires 8+ chars and staff will be notified), or account status (Active/Locked). System validates email uniqueness, sends notification email if email/password changed, updates database, reloads detail view. Used for HR updates or security (password reset, account suspension).                                                      | Admin                  |
| 53  | Delete Staff                           | Staff account removal with dependency verification. System checks if staff has managed any active bookings or created any active trips/routes. If dependencies exist, offers to set status to LOCKED instead (preserves audit trail). If no dependencies, shows confirmation and allows permanent deletion (deletes cart too). Cannot delete if financial transactions would be orphaned. Maintains data integrity.                                                                | Admin                  |

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

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term   | Description                                               |
| :----- | :-------------------------------------------------------- |
| _TMS_  | **T**ourist **M**anagement **S**ystem                     |
| _BRD_  | **B**usiness **R**equirements **D**ocument                |
| _SRS_  | **S**oftware **R**equirements **S**pecification           |
| _UC_   | **U**se **C**ase                                          |
| _UI_   | **U**ser **I**nterface                                    |
| _JWT_  | **J**SON **W**eb **T**oken - Authentication mechanism     |
| _CRUD_ | **C**reate, **R**ead, **U**pdate, **D**elete operations   |
| _API_  | **A**pplication **P**rogramming **I**nterface             |
| _FK_   | **F**oreign **K**ey - Database relationship constraint    |
| _PK_   | **P**rimary **K**ey - Database unique identifier          |
| _N/A_  | **N**ot **A**vailable or **N**ot **A**pplicable           |
| _TBD_  | **T**o **b**e **d**etermined or **t**o **b**e **d**efined |

### 3.2 Mapping to Web Application {#32-mapping-to-web-application}

This section describes the mapping between the application features and their web implementation, including data objects, features, and actors.

|     | Application Elements            | Web Implementation                                                            |
| :-- | :------------------------------ | :---------------------------------------------------------------------------- |
|     | **_Use Cases / Features_**      |                                                                               |
| 1   | Sign In                         | `/auth/sign-in` - Authentication view with username/email and password fields |
| 2   | Sign Up                         | `/auth/sign-up` - Customer registration form                                  |
| 3   | Forgot Password                 | `/auth/forgot-password` - Password recovery via email                         |
| 4   | Manage Profile                  | `/profile` - User profile management dashboard                                |
| 5   | View and Filter Available Trips | `/trips` - Public trip browsing with filters                                  |
| 6   | View Trip Details               | `/trips/:id` - Individual trip detail page                                    |
| 7   | Add/Edit/Remove Cart Items      | `/cart` - Shopping cart management                                            |
| 8   | Favorite Trips                  | `/favorites` - Saved trips list                                               |
| 9   | Book a Trip                     | `/trips/:id/book` - Direct booking flow                                       |
| 10  | Checkout Cart                   | `/checkout` - Cart checkout process                                           |
| 11  | View Personal Bookings          | `/my-bookings` - Customer booking history                                     |
| 12  | Edit Booking Travelers          | `/bookings/:id/edit-travelers` - Traveler info editor                         |
| 13  | View and Pay Invoice            | `/bookings/:id/invoice` - Invoice details and payment                         |
| 14  | Manage Routes                   | `/staff/routes` - Route CRUD operations (Staff)                               |
| 15  | Manage Route Schedule           | `/staff/routes/:id/schedule` - Route itinerary editor (Admin)                 |
| 16  | Manage Attractions              | `/staff/attractions` - Attraction CRUD operations                             |
| 17  | Manage Trips                    | `/staff/trips` - Trip scheduling and management                               |
| 18  | Manage Bookings                 | `/staff/bookings` - Booking operations dashboard                              |
| 19  | Manage Customers                | `/staff/customers` - Customer account management                              |
| 20  | Manage Staffs                   | `/admin/staffs` - Staff account management (Admin only)                       |
|     | **_Data Objects_**              |                                                                               |
| 1   | User                            | Mapped to `User` entity in database                                           |
| 2   | Route                           | Mapped to `Route` entity                                                      |
| 3   | Attraction                      | Mapped to `Attraction` entity                                                 |
| 4   | Category                        | Mapped to `Category` entity                                                   |
| 5   | Route_Attraction                | Mapped to `Route_Attraction` join table                                       |
| 6   | Trip                            | Mapped to `Trip` entity                                                       |
| 7   | Cart & Cart_Item                | Mapped to `Cart` and `Cart_Item` entities                                     |
| 8   | Favorite_Tour                   | Mapped to `Favorite_Tour` join table                                          |
| 9   | Tour_Booking                    | Mapped to `Tour_Booking` entity                                               |
| 10  | Tour_Booking_Detail             | Mapped to `Tour_Booking_Detail` entity                                        |
| 11  | Booking_Traveler                | Mapped to `Booking_Traveler` entity                                           |
| 12  | Invoice                         | Mapped to `Invoice` entity                                                    |
|     | **_Actors_**                    |                                                                               |
| 1   | Customer                        | Role = 'CUSTOMER' in User table                                               |
| 2   | Staff                           | Role = 'STAFF' in User table                                                  |
| 3   | Admin                           | Role = 'ADMIN' in User table                                                  |

### 3.3 Open Issues {#33-open-issues}

| #   | Issue Description                                                                                         | Status | Target Resolution Date |
| --- | --------------------------------------------------------------------------------------------------------- | ------ | ---------------------- |
| 1   | Integration with third-party payment gateway (Stripe/PayPal/VNPay) needs final selection and API contract | Open   | TBD                    |
| 2   | Email service provider selection (SendGrid/AWS SES/SMTP)                                                  | Open   | TBD                    |
| 3   | Image storage solution (local filesystem vs cloud storage like AWS S3/Cloudinary)                         | Open   | TBD                    |
| 4   | Refund processing workflow for canceled bookings with paid invoices                                       | Open   | TBD                    |
| 5   | Multi-language support (i18n) requirement confirmation                                                    | Open   | TBD                    |
| 6   | Mobile responsive design requirements for all views                                                       | Open   | TBD                    |
| 7   | Reporting and analytics dashboard requirements for Admin role                                             | Open   | TBD                    |
| 8   | Notification system (in-app notifications, push notifications, SMS) scope                                 | Open   | TBD                    |

---

**Document End**

**Generated from SRS v0.1.0 on 07/11/2025**
