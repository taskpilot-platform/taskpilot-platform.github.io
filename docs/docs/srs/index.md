---
outline: [1, 5]
---

**TMS - Tourist Management System**

## Revision and Signoff Sheet

### Change Record

| Author   | Version | Change reference         | Date       |
| -------- | ------- | ------------------------ | ---------- |
| TMS Team | 0.1.0   | Initial project creation | 03/11/2025 |

### Reviewers

| Name           | Company | Version | Position        | Date       |
| -------------- | ------- | ------- | --------------- | ---------- |
| Đặng Phú Thiện | TMS     | 0.1.0   | Project Manager | 03/11/2025 |

## 1. Introduction

### 1.1 Purpose

This Software Requirements Specification document outlines the comprehensive requirements for the "TMS" (Tourist Management System) platform. This document serves as a detailed technical foundation for the development, deployment, and maintenance of the web application. It provides developers with clear guidelines for planning, task assignment, and implementation. Additionally, quality assurance teams will utilize this document to design test cases that align with specified requirements, ensuring the final product meets both quality standards and user expectations for an online tourism management system.

### 1.2 Scope

This document encompasses the TMS platform, which is designed to provide a comprehensive online tourism management system for booking trips, managing routes and attractions, and handling customer bookings. The system supports multiple user roles including customers, staff, and administrators, each with distinct functionalities for browsing trips, managing bookings, managing routes and attractions, and administering the platform.

### 1.3 Intended Audiences and Document Organization

This document is intended for:

- **Development Team**: Responsible for creating detailed designs, implementing features, and performing unit testing, integration testing, and system testing for the application using ReactJS frontend and Java Spring Boot backend.
- **Quality Assurance Team**: Responsible for conducting user acceptance testing sessions and validating system requirements.
- **Documentation Team**: Responsible for creating user guides and help documentation for the application.
- **Project Stakeholders**: Business owners and managers who need to understand system capabilities and requirements.

Below are the main sections of this document:

- **1. Introduction**: General introduction and overview of this document.
- **2. Functional Requirements**: Detailed description of functional requirements including use cases, sequence diagrams, and activity diagrams.
- **3. Non-functional Requirements**: Description of non-functional requirements such as security, performance, and interface requirements.
- **4. Other Requirements**: Additional requirements including archive functions and other supporting features.
- **5. Appendixes**: Supporting information including glossary, messages, and issues list.

### 1.4 References

| #   | Title             | Version | File Name / Link         | Description                                        |
| --- | ----------------- | ------- | ------------------------ | -------------------------------------------------- |
| 1   | Use Case Diagrams | 0.1.0   | Use Case Documentation   | Complete use case diagrams for all user roles      |
| 2   | Sequence Diagrams | 0.1.0   | Sequence Documentation   | Sequence flow diagrams for all major features      |
| 3   | Activity Diagrams | 0.1.0   | Activity Documentation   | Activity flow diagrams for business processes      |
| 4   | Database Schema   | 0.1.0   | Database Design Document | Entity-relationship diagrams and table definitions |

## 2. Functional Requirements

### 2.1 Use Case Description

#### 2.1.1 Authentication Use Case

##### 2.1.1.1 Sign In

###### Use Case Description

| Name               | Sign In                                                                                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users to authenticate and access the TMS system using their credentials (username/email and password).                    |
| **Actor**          | Customer, Staff, Administrator                                                                                                                 |
| **Trigger**        | User navigates to TMS login page and clicks "Sign In" button after entering credentials.                                                       |
| **Pre-condition**  | User's device must be connected to the internet. User must have an existing account with status "active" in the system. System is operational. |
| **Post-condition** | User is successfully authenticated with valid JWT token, user session is created, and user is redirected to role-appropriate dashboard.        |

###### Sequence Flow

[sequence-auth-sign-in](../sequence/auth/sign-in)

###### Activities Flow

[activity-auth-sign-in](../activity/auth/sign-in)

###### Business Rules

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :-------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)             | BR1     | **Displaying Rules:** The system displays a "Sign In" screen with fields: [txtBoxUsername] for username/email input, [txtBoxPassword] for password input with password masking, [btnSignIn] button for form submission, [linkForgotPassword] hyperlink to password recovery, and [linkSignUp] hyperlink to registration. (Refer to "Sign In" view in "View Description" file)                                                                                                                                                                                                                                                                          |
| (5)             | BR2     | **Validation Rules:** When user enters credentials and clicks [btnSignIn], system uses Text_change() method to validate input. System checks: If [txtBoxUsername].Text.isEmpty() = true OR [txtBoxPassword].Text.isEmpty() = true: System moves to step (4.1) to call displayErrorMessage("Username and password are required.") (Refer to MSG 1). Else: System proceeds to step (5) to send credentials to backend via signIn([txtBoxUsername].Text, [txtBoxPassword].Text) method.                                                                                                                                                                   |
| (7), (8), (8.1) | BR3     | **Querying Rules:** System queries user account from table "User" (Refer to "User" table in "DB Sheet" file) with SQL: "SELECT user_id, username, email, password_hash, role, status, failed_login_attempts, last_failed_login FROM User WHERE (username = [txtBoxUsername].Text OR email = [txtBoxUsername].Text) AND status = 'active'". If COUNT = 0: System moves to step (8.1) to call displayErrorMessage("Invalid username/email or password.") (Refer to MSG 2), increment retry counter, and use case ends at step (5.2). Else: System moves to step (9) to verify password.                                                                  |
| (9), (9.1)      | BR4     | **Validation Rules:** System verifies password by calling bcryptCompare([txtBoxPassword].Text, User.password_hash) method. If bcryptCompare() returns false: System moves to step (9.1) to execute SQL UPDATE: "UPDATE User SET failed_login_attempts = failed_login_attempts + 1, last_failed_login = CURRENT_TIMESTAMP WHERE user_id = [User.user_id]", call displayErrorMessage("Invalid username/email or password.") (Refer to MSG 2), and use case ends at step (5.2). Else: System resets failed_login_attempts to 0 and proceeds to step (10).                                                                                                 |
| (10), (10.1)    | BR5     | **Validation Rules:** System checks account lock status by evaluating condition: If User.failed_login_attempts >= 5 AND (CURRENT_TIMESTAMP - User.last_failed_login) < INTERVAL '15 minutes': System moves to step (10.1) to call displayErrorMessage("Account temporarily locked due to multiple failed login attempts. Please try again after 15 minutes or contact support.") (Refer to MSG 3) and use case ends at step (5.2). Else: System proceeds to step (11) to generate JWT token.                                                                                                                                                           |
| (14)            | BR6     | **Displaying Rules:** System generates JWT token with payload {user_id, username, role, exp: 24h} and stores in browser localStorage by calling localStorage.setItem('authToken', jwt_token). System redirects user to home page using redirectToHomePage(User.role) method. System displays "Home" view corresponding to user role: If User.role = 'CUSTOMER' → display "Customer Home" view; If User.role = 'STAFF' → display "Staff Dashboard" view; If User.role = 'ADMIN' → display "Admin Dashboard" view. (Refer to "Home" view in "View Description" file). System displays success message "Welcome back, [User.username]!" (Refer to MSG 4). |

##### 2.1.1.2 Sign Up

###### Use Case Description

| Name               | Sign Up                                                                                                                 |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows new users to create a Customer account in the TMS system by providing registration information.    |
| **Actor**          | New User (becomes Customer after successful registration)                                                               |
| **Trigger**        | User navigates to TMS registration page and clicks "Sign Up" button after filling in all required fields.               |
| **Pre-condition**  | User's device must be connected to the internet. User does not have an existing account. System is operational.         |
| **Post-condition** | New Customer account is created with status "active", and user is redirected to Sign In page with confirmation message. |

###### Sequence Flow

[sequence-auth-sign-up](../sequence/auth/sign-up)

###### Activities Flow

[activity-auth-sign-up](../activity/auth/sign-up)

###### Business Rules

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)        | BR7     | **Displaying Rules:** The system displays a "Sign Up" screen with registration form fields: [txtBoxUsername] for username (4-20 characters), [txtBoxEmail] for email address, [txtBoxFullName] for full name, [txtBoxPassword] for password with password strength indicator, [txtBoxConfirmPassword] for password confirmation, [chkBoxAgreeTerms] checkbox for terms acceptance, and [btnSignUp] button. (Refer to "Sign Up" view in "View Description" file)                                                                                                                                                                                          |
| (5)        | BR8     | **Validation Rules:** When user enters registration data, system uses Text_change() method to validate in repeat loop: If [txtBoxUsername].Text.length < 4 OR > 20 OR invalid format → displayFieldError() (Refer to MSG 4). If [txtBoxEmail].Text.matches("[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}") = false → displayFieldError() (Refer to MSG 4). If [txtBoxFullName].Text.length < 2 OR > 100 → displayFieldError() (Refer to MSG 4). If [txtBoxPassword].Text.length < 8 OR missing uppercase/lowercase/digit → displayFieldError() (Refer to MSG 4). If [txtBoxConfirmPassword].Text != [txtBoxPassword].Text → displayFieldError() (Refer to MSG 4). |
| (8), (8.1) | BR9     | **Querying Rules:** System queries table "User" (Refer to "User" table in "DB Sheet" file) with SQL: "SELECT COUNT(\*) FROM User WHERE username = [txtBoxUsername].Text OR email = [txtBoxEmail].Text". If COUNT > 0: System moves to step (8.1) to call displayErrorMessage("Username or email already exists.") (Refer to MSG 5) and use case ends. Else: System calls bcryptHash([txtBoxPassword].Text, saltRounds=10), generates user_id via generateUUID(), executes SQL INSERT to create new user with role='CUSTOMER' and cart record.                                                                                                            |
| (17)       | BR10    | **Displaying Rules:** System calls redirectToSignInPage() to navigate to Sign In page and displays success message "Registration successful!" via displaySuccessMessage() (Refer to MSG 6). System sends welcome email to [txtBoxEmail].Text in background.                                                                                                                                                                                                                                                                                                                                                                                              |

##### 2.1.1.3 Forgot Password

###### Use Case Description

| Name               | Forgot Password                                                                                                                    |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users to reset their forgotten password using email verification process.                                     |
| **Actor**          | Customer, Staff, Administrator (who forgot password)                                                                               |
| **Trigger**        | User clicks "Forgot Password" link on Sign In page.                                                                                |
| **Pre-condition**  | User's device must be connected to the internet. User must have registered account with valid email. Email service is operational. |
| **Post-condition** | User receives password reset email with token, sets new password successfully, and can sign in with new credentials.               |

###### Sequence Flow

[sequence-auth-forgot-password](../sequence/auth/forgot-password)

###### Activities Flow

[activity-auth-forgot-password](../activity/auth/forgot-password)

###### Business Rules

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :------------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)                  | BR11    | **Displaying Rules:** System displays "Forgot Password" view containing [txtBoxEmail], [btnSendResetLink], and help text explaining password reset process. (Refer to "Forgot Password" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                               |
| (5)                  | BR12    | **Validation Rules:** When user enters email in repeat loop (steps 3-5), method Text_change() validates [txtBoxEmail].Text matches email regex pattern. If [txtBoxEmail].isEmpty() = true OR format invalid → display error message (Refer to MSG 1), return to step (3). Else proceed to step (6).                                                                                                                                                                                                                                                                                                    |
| (6) through (12)     | BR13    | **Querying Rules:** When user clicks [btnSendResetLink], system checks user existence with SQL: "SELECT user_id, email FROM User WHERE email = [txtBoxEmail].Text AND status = 'active'". If user not found → logWarningEvent(), display generic success message (Refer to MSG 7) to prevent email enumeration, end process. If user exists → generateResetToken() with 24h expiry, SQL: "INSERT INTO Password_Reset_Token (token, user_id, expires_at) VALUES (...)", sendResetEmail(), display generic success message (Refer to MSG 7).                                                             |
| (15), (15.1), (15.2) | BR14    | **Querying Rules:** When user clicks reset link from email, system extracts token from URL parameter and validates with SQL: "SELECT token_id, user_id, expires_at, is_used FROM Password_Reset_Token WHERE token = [extractedToken]". System checks: if token not found OR expires_at < NOW() OR is_used = true → display "Invalid or expired token" error (Refer to MSG 8), end process. Else proceed to step (16). (Refer to "Password_Reset_Token" table in "DB Sheet" file)                                                                                                                       |
| (16)                 | BR15    | **Displaying Rules:** System displays "Set New Password" form containing [txtBoxNewPassword], [txtBoxConfirmPassword], [btnResetPassword], [hiddenToken] field, and password requirements text (min 8 chars, uppercase, lowercase, number). (Refer to "Set New Password" view in "View Description" file)                                                                                                                                                                                                                                                                                              |
| (19)                 | BR16    | **Validation Rules:** When user enters password in repeat loop (steps 17-19), method Text_change() validates [txtBoxNewPassword].Text and [txtBoxConfirmPassword].Text. Checks: if [txtBoxNewPassword].length < 8 OR not contains uppercase OR not contains lowercase OR not contains number OR [txtBoxNewPassword].Text ≠ [txtBoxConfirmPassword].Text → display error message (Refer to MSG 1), return to step (17). Else proceed to step (20).                                                                                                                                                      |
| (20), (21), (22)     | BR17    | **Querying Rules:** When user clicks [btnResetPassword], system hashes new password using bcryptHash([txtBoxNewPassword].Text), updates database with SQL: "UPDATE User SET password_hash = [hashedPassword], updated_at = NOW() WHERE user_id = (SELECT user_id FROM Password_Reset_Token WHERE token = [hiddenToken])", marks token as used with SQL: "UPDATE Password_Reset_Token SET is_used = true WHERE token = [hiddenToken]", displays success "Password reset successful" (Refer to MSG 9), waits 3 seconds, then executes redirectToSignInPage(). (Refer to "User" table in "DB Sheet" file) |

##### 2.1.1.4 Manage Profile

###### Use Case Description

| Name               | Manage Profile                                                                                                                                             |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to view and update their personal profile information including full name, email, phone number, and avatar image. |
| **Actor**          | Customer, Staff, Administrator                                                                                                                             |
| **Trigger**        | User clicks "Profile" or "My Account" menu item from navigation bar.                                                                                       |
| **Pre-condition**  | User's device must be connected to the internet. User must be signed in with valid active session.                                                         |
| **Post-condition** | User's profile information is updated in system, changes are saved to database, and success confirmation is displayed to user.                             |

###### Sequence Flow

[sequence-auth-manage-profile](../sequence/auth/manage-profile)

###### Activities Flow

[activity-auth-manage-profile](../activity/auth/manage-profile)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1)               | BR19    | **Validation Rules:** When user accesses profile settings, system verifies JWT token from localStorage with verifyJWT(). If token invalid OR expired OR not found → display error "Session expired. Please sign in again." (Refer to MSG 10), execute redirectToSignInPage(), end process at step (2.2).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| (3)                      | BR20    | **Querying Rules:** System queries user data from table "User" with SQL: "SELECT user_id, username, email, full_name, phone_number, avatar_url, created_at FROM User WHERE user_id = [CurrentUser.user_id] AND status = 'active'". Stores result in [CurrentUserData] object. (Refer to "User" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| (4)                      | BR21    | **Displaying Rules:** System displays "Manage Profile" view containing two tabs: [tabUpdateInfo] with [txtBoxFullName], [txtBoxEmail], [txtBoxPhoneNumber], [fileUploadAvatar], [btnSave]; and [tabChangePassword] with [txtBoxCurrentPassword], [txtBoxNewPassword], [txtBoxConfirmPassword], [btnChangePassword]. Fields populated with [CurrentUserData] values. (Refer to "Manage Profile" view in "View Description" file)                                                                                                                                                                                                                                                                                                                           |
| (8)                      | BR22    | **Validation Rules:** When user edits fields in repeat loop and clicks [btnSave], system validates using Text_change(): if [txtBoxEmail].isEmpty() = true OR not matches email regex → error; if [txtBoxFullName].length < 2 OR [txtBoxFullName].length > 100 → error; if [txtBoxPhoneNumber].length < 10 OR [txtBoxPhoneNumber].length > 15 OR not matches digit regex → error. If any validation fails → display error (Refer to MSG 1), return to step (6). Else proceed to step (9).                                                                                                                                                                                                                                                                  |
| (9), (9.1), (10), (11)   | BR23    | **Validation Rules:** System checks email uniqueness with SQL: "SELECT COUNT(\*) FROM User WHERE email = [txtBoxEmail].Text AND user_id != [CurrentUser.user_id]". If COUNT > 0 → display error "Email already registered" (Refer to MSG 11), return to step (6). Else system updates with SQL: "UPDATE User SET email = [txtBoxEmail].Text, full_name = [txtBoxFullName].Text, phone_number = [txtBoxPhoneNumber].Text, updated_at = NOW() WHERE user_id = [CurrentUser.user_id]", display success "Profile updated successfully" (Refer to MSG 12). If email changed → sendNotificationEmail(oldEmail, newEmail). (Refer to "User" table in "DB Sheet" file)                                                                                            |
| (14)                     | BR24    | **Validation Rules:** When user enters passwords in repeat loop and clicks [btnChangePassword], system validates using Text_change(): if [txtBoxCurrentPassword].isEmpty() = true → error; if [txtBoxNewPassword].length < 8 OR not contains uppercase OR not contains lowercase OR not contains number → error; if [txtBoxNewPassword].Text ≠ [txtBoxConfirmPassword].Text → error. If any validation fails → display error (Refer to MSG 1), return to step (12). Else proceed to step (15).                                                                                                                                                                                                                                                            |
| (15), (15.1), (16), (17) | BR25    | **Validation Rules:** System verifies current password with bcryptCompare([txtBoxCurrentPassword].Text, [CurrentUserData.password_hash]). If comparison returns false → display error "Incorrect current password" (Refer to MSG 13), return to step (12). Else system hashes new password with bcryptHash([txtBoxNewPassword].Text), then updates database with SQL: "UPDATE User SET password_hash = [hashedPassword], updated_at = NOW() WHERE user_id = [CurrentUser.user_id]", sends confirmation email sendPasswordChangeEmail([CurrentUserData.email]), displays success "Password changed successfully. Please sign in again." (Refer to MSG 14), executes clearJWTToken() and redirectToSignInPage(). (Refer to "User" table in "DB Sheet" file) |

#### 2.1.2 Browse Trips Use Case

##### 2.1.2.1 View and Filter Available Trips

###### Use Case Description

| Name               | View and Filter Available Trips                                                                                                                  |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users to browse and filter available trips in TMS system using various criteria such as destination, date range, and price. |
| **Actor**          | Customer (primary), Staff, Administrator (viewing only)                                                                                          |
| **Trigger**        | User navigates to "Browse Trips" page from navigation bar or after successful sign in (for Customer role).                                       |
| **Pre-condition**  | User's device must be connected to the internet. System has at least one active trip in database. System is operational.                         |
| **Post-condition** | User can view list of available trips matching filter criteria, with pagination, and can select trip to view details or add to cart/favorites.   |

###### Sequence Flow

[sequence-browse-trips-view-and-filter-available-trips](../sequence/browse-trips/view-and-filter-available-trips)

###### Activities Flow

[activity-browse-trips-view-and-filter-available-trips](../activity/browse-trips/view-and-filter-available-trips)

###### Business Rules

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :--------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)        | BR26    | **Displaying Rules:** System displays "Browse Trips" view containing [txtBoxKeyword], [datePickerStartDate], [datePickerEndDate], [sliderPriceRange], [dropdownDestination], [btnSearch], and list of available trips with pagination showing 12 trips per page. (Refer to "Browse Trips" view in "View Description" file)                                                                                                                                                                                                                                                                                                                               |
| (5)        | BR27    | **Validation Rules:** When user submits search in repeat loop (steps 3-5), system validates search criteria using method Text_change(): if [txtBoxKeyword].Text.length > 0 AND [txtBoxKeyword].Text.length < 3 → error; if [datePickerStartDate].Value > [datePickerEndDate].Value → error; if [sliderPriceRange].Min > [sliderPriceRange].Max → error. If validation fails → display error message (Refer to MSG 15, MSG 16), return to step (3). Else proceed to query.                                                                                                                                                                                |
| (5), (5.1) | BR28    | **Querying Rules:** System queries trips from table "Trip" with SQL: "SELECT trip_id, trip_name, destination, departure_date, return_date, price, available_slots, image_url FROM Trip WHERE status = 'active' AND ([txtBoxKeyword].Text = '' OR trip_name LIKE '%[txtBoxKeyword]%' OR destination LIKE '%[txtBoxKeyword]%') AND departure_date BETWEEN [datePickerStartDate] AND [datePickerEndDate] AND price BETWEEN [sliderPriceRange].Min AND [sliderPriceRange].Max ORDER BY departure_date ASC". If COUNT = 0 → display "No trips found matching your criteria" (Refer to MSG 17), return to step (3). (Refer to "Trip" table in "DB Sheet" file) |
| (6)        | BR29    | **Displaying Rules:** System displays search results in grid layout with trip cards. Each card shows: [imgTripThumbnail], [lblTripName], [lblDestination], [lblDepartureDate], [lblPrice], [lblAvailableSlots], [btnViewDetails], [iconAddToFavorites], [btnAddToCart]. Results paginated with 12 items per page. (Refer to "Trip Card" component in "View Description" file)                                                                                                                                                                                                                                                                            |

##### 2.1.2.2 View Trip Details

###### Use Case Description

| Name               | View Trip Details                                                                                                                                                      |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows users to view comprehensive details of a specific trip including itinerary, route attractions, pricing, available slots, and booking information. |
| **Actor**          | Customer (primary), Staff, Administrator                                                                                                                               |
| **Trigger**        | User clicks "View Details" button on a trip card from Browse Trips page, or navigates directly via trip URL.                                                           |
| **Pre-condition**  | User's device must be connected to the internet. Trip ID must exist in database. Trip status must be "active".                                                         |
| **Post-condition** | User can view complete trip information and perform actions: add to cart, add to favorites, share trip, or proceed to booking.                                         |

###### Sequence Flow

[sequence-browse-trips-view-trip-details](../sequence/browse-trips/view-trip-details)

###### Activities Flow

[activity-browse-trips-view-trip-details](../activity/browse-trips/view-trip-details)

###### Business Rules

| Activity   | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :--------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1) | BR30    | **Validation Rules:** When user selects trip in repeat loop (steps 2-3), system verifies trip exists and is active with SQL: "SELECT trip_id, status FROM Trip WHERE trip_id = [trip_id]". If COUNT = 0 OR status != 'active' → display error "Trip not found or no longer available" (Refer to MSG 18), return to step (2). Else proceed to step (4).                                                                                                                                                                                                                                                                                                                                                                                  |
| (4)        | BR31    | **Querying Rules:** System queries full trip details from table "Trip" with SQL: "SELECT t.\*, r.route_name, r.description as route_description, GROUP_CONCAT(a.attraction_name) as attractions FROM Trip t JOIN Route r ON t.route_id = r.route_id LEFT JOIN Route_Attraction ra ON r.route_id = ra.route_id LEFT JOIN Attraction a ON ra.attraction_id = a.attraction_id WHERE t.trip_id = [trip_id] GROUP BY t.trip_id". System displays "Trip Details" view showing: [imgTripGallery], [lblTripName], [lblDestination], [lblDepartureDate], [lblReturnDate], [lblPrice], [lblAvailableSlots], [txtRouteDescription], [listAttractions], [btnAddToCart], [btnAddToFavorites], [btnShare]. (Refer to "Trip" table in "DB Sheet" file) |

#### 2.1.3 Adjust Cart Use Case

##### 2.1.3.1 Add Trip to Cart

###### Use Case Description

| Name               | Add Trip to Cart                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to add a selected trip to their shopping cart for future booking.                                     |
| **Actor**          | Customer (must be signed in)                                                                                                                   |
| **Trigger**        | User clicks "Add to Cart" button on trip card (Browse Trips page) or trip details page.                                                        |
| **Pre-condition**  | User must be signed in with active session. Trip must exist and have status "active". Trip must have available_slots > 0.                      |
| **Post-condition** | Trip is added to user's cart, cart item count is updated, success message is displayed, and user can continue browsing or proceed to checkout. |

###### Sequence Flow

[sequence-adjust-cart-add-trip-to-cart](../sequence/adjust-cart/add-trip-to-cart)

###### Activities Flow

[activity-adjust-cart-add-trip-to-cart](../activity/adjust-cart/add-trip-to-cart)

###### Business Rules

| Activity         | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :--------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1)       | BR33    | **Validation Rules:** When user clicks [btnAddToCart] at step (2), system verifies JWT token from localStorage with verifyJWT(). If token invalid OR not found → display error "Please sign in to add trips to cart" (Refer to MSG 19), execute redirectToSignInPage() at step (3.1), user performs login at step (3.2). Else proceed to step (4).                                                                                                                                                                                                                                                                 |
| (5)              | BR34    | **Displaying Rules:** System calls getOrCreateCart([user_id]) to retrieve or initialize cart, then displays "Add to Cart" modal containing [lblTripName], [lblPrice], [numericUpDownQuantity] with default value 1, [lblAvailableSeats], [btnConfirm], [btnCancel]. (Refer to "Add to Cart Form" view in "View Description" file)                                                                                                                                                                                                                                                                                  |
| (8), (9), (10)   | BR35    | **Validation Rules:** When user enters quantity in repeat loop (steps 6-10) and clicks [btnConfirm], system validates: if [numericUpDownQuantity].Value < 1 OR [numericUpDownQuantity].Value > 20 → display error "Quantity must be between 1 and 20" (Refer to MSG 20), return to step (6). System queries available seats with SQL: "SELECT available_slots FROM Trip WHERE trip_id = [trip_id]". If [numericUpDownQuantity].Value > available_slots → display error "Insufficient seats available" (Refer to MSG 21), return to step (6). Else proceed to step (11). (Refer to "Trip" table in "DB Sheet" file) |
| (11), (12), (13) | BR36    | **Querying Rules:** System checks if trip exists in cart with SQL: "SELECT cart_item_id, quantity FROM Cart_Item WHERE cart_id = [cart_id] AND trip_id = [trip_id]". If COUNT > 0 → update with SQL: "UPDATE Cart_Item SET quantity = quantity + [numericUpDownQuantity].Value, updated_at = NOW() WHERE cart_item_id = [cart_item_id]" at step (12). Else insert with SQL: "INSERT INTO Cart_Item (cart_id, trip_id, quantity, price, created_at) VALUES ([cart_id], [trip_id], [numericUpDownQuantity].Value, [trip_price], NOW())" at step (13). (Refer to "Cart_Item" table in "DB Sheet" file)                |
| (14), (15)       | BR37    | **Displaying Rules:** System displays success notification showing trip name and quantity "Added [numericUpDownQuantity].Value x [lblTripName] to cart" (Refer to MSG 22), closes modal, updates [badgeCartCount] icon with new cart item count using getCartItemCount([cart_id]).                                                                                                                                                                                                                                                                                                                                 |

##### 2.1.3.2 Remove Trip from Cart

###### Use Case Description

| Name               | Remove Trip from Cart                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows authenticated users to remove a trip from their shopping cart.                                       |
| **Actor**          | Customer (must be signed in)                                                                                              |
| **Trigger**        | User clicks "Remove" or trash icon button on a trip item in cart view.                                                    |
| **Pre-condition**  | User must be signed in. Trip must exist in user's cart. Cart item must have valid cart_item_id.                           |
| **Post-condition** | Trip is removed from cart, cart item count is updated, cart total is recalculated, and confirmation message is displayed. |

###### Sequence Flow

[sequence-adjust-cart-remove-trip-from-cart](../sequence/adjust-cart/remove-trip-from-cart)

###### Activities Flow

[activity-adjust-cart-remove-trip-from-cart](../activity/adjust-cart/remove-trip-from-cart)

###### Business Rules

| Activity                         | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                      |
| :------------------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)                              | BR38    | **Querying Rules:** When user clicks [btnRemove] at step (1), system queries cart item details with SQL: "SELECT ci.cart_item_id, ci.quantity, t.trip_name, t.price, t.departure_date FROM Cart_Item ci JOIN Trip t ON ci.trip_id = t.trip_id WHERE ci.cart_item_id = [cart_item_id]". Stores in [selectedCartItem]. (Refer to "Cart_Item" and "Trip" tables in "DB Sheet" file)                                                 |
| (3)                              | BR39    | **Displaying Rules:** System displays confirmation modal containing [lblConfirmMessage] "Remove [selectedCartItem.trip_name] from cart?", [lblTripDetails] showing quantity and price, [btnConfirmDelete], [btnCancel]. (Refer to "Remove Confirmation Dialog" in "View Description" file)                                                                                                                                       |
| (4), (4.1), (4.2)                | BR40    | **Selecting Rules:** User clicks button in dialog. If user clicks [btnCancel] → close modal at step (4.1), end use case at step (4.2). If user clicks [btnConfirmDelete] → proceed to step (5).                                                                                                                                                                                                                                  |
| (5)                              | BR41    | **Querying Rules:** System deletes cart item with SQL: "DELETE FROM Cart_Item WHERE cart_item_id = [cart_item_id]". (Refer to "Cart_Item" table in "DB Sheet" file)                                                                                                                                                                                                                                                              |
| (6), (7), (8), (9), (9.1), (9.2) | BR42    | **Displaying Rules:** System displays success notification "Removed [selectedCartItem.trip_name] from cart" (Refer to MSG 23), removes item row from [listCartItems] UI, updates [lblTotalPrice] and [badgeCartCount]. System executes getCartItemCount([cart_id]). If COUNT = 0 → display empty cart message "Your cart is empty. Start exploring tours!" (Refer to MSG 24) at step (9.1), disable [btnCheckout] at step (9.2). |

##### 2.1.3.3 Edit Trip Details in Cart

###### Use Case Description

| Name               | Edit Trip Details in Cart                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to edit quantity of trips in their shopping cart.           |
| **Actor**          | Customer (must be signed in)                                                                         |
| **Trigger**        | User clicks "Edit" button on a trip item in cart view.                                               |
| **Pre-condition**  | User must be signed in. Trip must exist in user's cart. Trip must still be valid and active.         |
| **Post-condition** | Trip quantity is updated in cart, cart total is recalculated, and confirmation message is displayed. |

###### Sequence Flow

[sequence-adjust-cart-edit-trip-details](../sequence/adjust-cart/edit-trip-details)

###### Activities Flow

[activity-adjust-cart-edit-trip-details](../activity/adjust-cart/edit-trip-details)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                     |
| :---------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)               | BR43    | **Querying Rules:** When user clicks [btnEdit] at step (1), system queries cart item with SQL: "SELECT ci.cart_item_id, ci.quantity, t.trip_name, t.available_slots, t.price, t.status FROM Cart_Item ci JOIN Trip t ON ci.trip_id = t.trip_id WHERE ci.cart_item_id = [cart_item_id]". Stores in [editCartItem]. (Refer to "Cart_Item" and "Trip" tables in "DB Sheet" file)                   |
| (3), (3.1), (3.2) | BR44    | **Validation Rules:** System verifies trip still valid with checks: if [editCartItem.status] != 'active' OR [editCartItem.available_slots] = 0 → display warning "This trip is no longer available. Please remove from cart" (Refer to MSG 25), end use case at step (3.2). Else proceed to step (4).                                                                                           |
| (4)               | BR45    | **Displaying Rules:** System displays "Edit Quantity" modal containing [lblTripName], [lblCurrentQuantity], [numericUpDownNewQuantity] with current value, [lblAvailableSeats] showing available slots, [lblTotalPrice] with auto-calculated price, [btnSave], [btnCancel]. (Refer to "Edit Trip Quantity Form" in "View Description" file)                                                     |
| (8)               | BR46    | **Validation Rules:** When user clicks [btnSave] in repeat loop (steps 7-10), system validates at step (8): if [numericUpDownNewQuantity].Value < 1 OR [numericUpDownNewQuantity].Value > 20 → display error "Quantity must be between 1 and 20" (Refer to MSG 20), return to step (5). Else proceed to step (9).                                                                               |
| (9), (10)         | BR47    | **Validation Rules:** System queries available seats with SQL: "SELECT available_slots FROM Trip WHERE trip_id = [editCartItem.trip_id]" at step (9). At step (10), if [numericUpDownNewQuantity].Value > available_slots → display error "Only [available_slots] seats available" (Refer to MSG 21), return to step (5). Else proceed to step (11). (Refer to "Trip" table in "DB Sheet" file) |
| (11)              | BR48    | **Querying Rules:** System updates cart item with SQL: "UPDATE Cart_Item SET quantity = [numericUpDownNewQuantity].Value, updated_at = NOW() WHERE cart_item_id = [cart_item_id]". (Refer to "Cart_Item" table in "DB Sheet" file)                                                                                                                                                              |
| (12), (13)        | BR49    | **Displaying Rules:** System displays success notification "Updated quantity to [numericUpDownNewQuantity].Value" (Refer to MSG 26), closes modal, updates [listCartItems] UI with new quantity, recalculates and updates [lblTotalPrice] on cart page at step (13).                                                                                                                            |

##### 2.1.3.4 View and Filter Trips in Cart

###### Use Case Description

| Name               | View and Filter Trips in Cart                                                                                       |
| :----------------- | :------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows authenticated users to view all trips in their cart and filter them by criteria.               |
| **Actor**          | Customer (must be signed in)                                                                                        |
| **Trigger**        | User clicks cart icon in navigation bar.                                                                            |
| **Pre-condition**  | User must be signed in with valid session.                                                                          |
| **Post-condition** | User views cart with all items, can filter items, and sees updated totals including subtotal, tax, and grand total. |

###### Sequence Flow

[sequence-adjust-cart-view-and-filter-trips-in-cart](../sequence/adjust-cart/view-and-filter-trips-in-cart)

###### Activities Flow

[activity-adjust-cart-view-and-filter-trips-in-cart](../activity/adjust-cart/view-and-filter-trips-in-cart)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR50    | **Querying Rules:** When user clicks [iconCart] at step (1), system queries cart items with SQL: "SELECT ci.cart_item_id, ci.quantity, t.trip_id, t.trip_name, t.destination, t.departure_date, t.price, t.image_url FROM Cart c JOIN Cart_Item ci ON c.cart_id = ci.cart_id JOIN Trip t ON ci.trip_id = t.trip_id WHERE c.user_id = [user_id]". If COUNT = 0 → display empty cart message "Your cart is empty. Start exploring tours!" (Refer to MSG 24) with [btnExploreTours] at step (2.1), end use case at step (2.2). (Refer to "Cart", "Cart_Item", "Trip" tables in "DB Sheet" file) |
| (3)               | BR51    | **Displaying Rules:** System displays "Cart" view containing [listCartItems] with each item showing: [imgTripThumbnail], [lblTripName], [lblDestination], [lblDepartureDate], [lblQuantity], [lblPrice], [btnEdit], [btnRemove]; and [panelCartSummary] showing [lblSubtotal], [lblTax], [lblGrandTotal], [btnCheckout]. (Refer to "Cart" view in "View Description" file)                                                                                                                                                                                                                   |
| (6), (6.1)        | BR52    | **Validation Rules:** When user submits filter in repeat loop (steps 4-6), system validates filter criteria: if [datePickerDepartureDateFrom].Value > [datePickerDepartureDateTo].Value → error. System filters [listCartItems] by destination, date range, price range. If filtered COUNT = 0 → display "No trips match your filters" (Refer to MSG 31) at step (6.1), return to step (4). Else proceed to step (7).                                                                                                                                                                        |
| (7)               | BR53    | **Displaying Rules:** System updates [listCartItems] with filtered results, recalculates [lblSubtotal] = SUM(quantity × price), [lblTax] = subtotal × 0.1, [lblGrandTotal] = subtotal + tax, displays count "[filtered_count] of [total_count] trips in cart".                                                                                                                                                                                                                                                                                                                               |

#### 2.1.4 Adjust Favorite Trips Use Case

##### 2.1.4.1 Toggle Favorite Trip

###### Use Case Description

| Name               | Toggle Favorite Trip                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to add or remove a trip from their favorites list.                    |
| **Actor**          | Customer (must be signed in)                                                                                   |
| **Trigger**        | User clicks heart icon on trip card or trip details page.                                                      |
| **Pre-condition**  | User must be signed in with valid session. Trip must exist and be active.                                      |
| **Post-condition** | Trip is added to or removed from favorites, heart icon is updated, and confirmation notification is displayed. |

###### Sequence Flow

[sequence-adjust-favorite-trips-toggle-favorite-trip](../sequence/adjust-favorite-trips/toggle-favorite-trip)

###### Activities Flow

[activity-adjust-favorite-trips-toggle-favorite-trip](../activity/adjust-favorite-trips/toggle-favorite-trip)

###### Business Rules

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2)   | BR54    | **Validation Rules:** When user clicks [iconHeart] at step (1), system verifies JWT token from localStorage with verifyJWT(). If token invalid OR not found → display "Please sign in to save favorites" (Refer to MSG 27), execute redirectToSignInPage() at step (2.1), user performs login at step (2.2). Else proceed to step (3).                                         |
| (3)                 | BR55    | **Querying Rules:** System checks favorite status with SQL: "SELECT favorite_id FROM Favorite_Tour WHERE user_id = [user_id] AND trip_id = [trip_id]". If COUNT > 0 → proceed to step (4.1) for unfavorite. If COUNT = 0 → proceed to step (3.1) for favorite. (Refer to "Favorite_Tour" table in "DB Sheet" file)                                                             |
| (3.1), (3.2), (3.3) | BR56    | **Querying Rules:** If trip not favorited, system inserts with SQL: "INSERT INTO Favorite_Tour (user_id, trip_id, created_at) VALUES ([user_id], [trip_id], NOW())" at step (3.1), updates [iconHeart] to filled state at step (3.2), displays success notification "Added to favorites!" (Refer to MSG 28) at step (3.3). (Refer to "Favorite_Tour" table in "DB Sheet" file) |
| (4.1), (4.2), (4.3) | BR57    | **Querying Rules:** If trip already favorited, system deletes with SQL: "DELETE FROM Favorite_Tour WHERE user_id = [user_id] AND trip_id = [trip_id]" at step (4.1), updates [iconHeart] to empty state at step (4.2), displays notification "Removed from favorites" (Refer to MSG 29) at step (4.3). (Refer to "Favorite_Tour" table in "DB Sheet" file)                     |

##### 2.1.4.2 View and Filter Favorite Trips

###### Use Case Description

| Name               | View and Filter Favorite Trips                                                                                          |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated users to view their list of favorite trips and filter them by various criteria.      |
| **Actor**          | Customer (must be signed in)                                                                                            |
| **Trigger**        | User navigates to "My Favorites" page from navigation menu.                                                             |
| **Pre-condition**  | User must be signed in with valid session.                                                                              |
| **Post-condition** | User can view their favorite trips list with optional filters applied, and can access trip details or remove favorites. |

###### Sequence Flow

[sequence-adjust-favorite-trips-view-and-filter-favorite-trips](../sequence/adjust-favorite-trips/view-and-filter-favorite-trips)

###### Activities Flow

[activity-adjust-favorite-trips-view-and-filter-favorite-trips](../activity/adjust-favorite-trips/view-and-filter-favorite-trips)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR58    | **Querying Rules:** When user navigates to "My Favorites" at step (1), system queries favorite trips with SQL: "SELECT ft.favorite_id, t.trip_id, t.trip_name, t.destination, t.departure_date, t.price, t.available_slots, t.image_url FROM Favorite_Tour ft JOIN Trip t ON ft.trip_id = t.trip_id WHERE ft.user_id = [user_id] AND t.status = 'active' ORDER BY ft.created_at DESC". If COUNT = 0 → display "No favorite trips yet. Start exploring!" (Refer to MSG 30) with [btnExploreTours] at step (2.1), end use case at step (2.2). (Refer to "Favorite_Tour" and "Trip" tables in "DB Sheet" file) |
| (3)               | BR59    | **Displaying Rules:** System displays "Favorite Trips" view containing [listFavoriteTrips] with each trip showing: [imgTripThumbnail], [lblTripName], [lblDestination], [lblDepartureDate], [lblPrice], [lblAvailableSlots], [iconHeartFilled], [btnViewDetails], [btnAddToCart]. Displays total count "[COUNT] favorite trips". (Refer to "Favorite Trips" view in "View Description" file)                                                                                                                                                                                                                |
| (6), (6.1)        | BR60    | **Validation Rules:** When user submits filter in repeat loop (steps 4-6), system validates filter criteria: if [datePickerDepartureDateFrom].Value > [datePickerDepartureDateTo].Value → error. System filters [listFavoriteTrips] by [dropdownDestination], date range, [sliderPriceRange]. If filtered COUNT = 0 → display "No trips match your filters" (Refer to MSG 31) at step (6.1), return to step (4). Else proceed to step (7).                                                                                                                                                                  |
| (7)               | BR61    | **Displaying Rules:** System updates [listFavoriteTrips] with filtered results, displays count "[filtered_count] of [total_count] favorite trips matching filters".                                                                                                                                                                                                                                                                                                                                                                                                                                         |

#### 2.1.5 Manage Personal Booking Use Case

##### 2.1.5.1 View and Filter Personal Bookings

###### Use Case Description

| Name               | View and Filter Personal Bookings                                                                                         |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows authenticated customers to view their booking history and filter bookings by various criteria.       |
| **Actor**          | Customer (must be signed in)                                                                                              |
| **Trigger**        | User clicks "My Bookings" in navigation menu.                                                                             |
| **Pre-condition**  | User must be signed in with valid session.                                                                                |
| **Post-condition** | User can view their bookings list with tabs (Upcoming/Past) and optional filters applied, and can access booking details. |

###### Sequence Flow

[sequence-manage-personal-booking-view-and-filter-personal-bookings](../sequence/manage-personal-booking/view-and-filter-personal-bookings)

###### Activities Flow

[activity-manage-personal-booking-view-and-filter-personal-bookings](../activity/manage-personal-booking/view-and-filter-personal-bookings)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR62    | **Querying Rules:** When user clicks "My Bookings" at step (1), system queries bookings with SQL: "SELECT tb.booking_id, tb.booking_status, tb.total_amount, tb.created_at, t.trip_name, t.destination, t.departure_date FROM Tour_Booking tb JOIN Trip t ON tb.trip_id = t.trip_id WHERE tb.user_id = [user_id] ORDER BY tb.created_at DESC". If COUNT = 0 → display "No bookings yet. Start exploring tours!" (Refer to MSG 32) with [btnExploreTours] at step (2.1), end use case at step (2.2). (Refer to "Tour_Booking" and "Trip" tables in "DB Sheet" file) |
| (3)               | BR63    | **Displaying Rules:** System displays "My Bookings" view containing [tabUpcoming], [tabPast], [tabCancelled] with bookings list; and filter panel with [dropdownStatus], [datePickerFrom], [datePickerTo], [txtBoxTripName], [btnApplyFilter]. Each booking shows: [lblBookingId], [lblTripName], [lblDestination], [lblDepartureDate], [lblStatus], [lblAmount], [btnViewDetails]. (Refer to "My Bookings" view in "View Description" file)                                                                                                                       |
| (6), (6.1)        | BR64    | **Querying Rules:** When user clicks [btnApplyFilter] at step (5), system queries with SQL: "SELECT tb._, t._ FROM Tour_Booking tb JOIN Trip t ON tb.trip_id = t.trip_id WHERE tb.user_id = [user_id] AND ([dropdownStatus].Value = 'All' OR tb.booking_status = [dropdownStatus].Value) AND t.departure_date BETWEEN [datePickerFrom] AND [datePickerTo] AND ([txtBoxTripName].Text = '' OR t.trip_name LIKE '%[txtBoxTripName]%')". If COUNT = 0 → display "No bookings match your filters" (Refer to MSG 33) at step (6.1). Else proceed to step (7).           |
| (7)               | BR65    | **Displaying Rules:** System updates booking list with filtered results, displays count "[COUNT] bookings found".                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

##### 2.1.5.2 Checkout Cart

###### Use Case Description

| Name               | Checkout Cart                                                                                                                      |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated customers to proceed from cart to create bookings by entering passenger details and confirming. |
| **Actor**          | Customer (must be signed in)                                                                                                       |
| **Trigger**        | User clicks "Checkout" button in cart page.                                                                                        |
| **Pre-condition**  | User must be signed in. Cart must contain valid trip items. Trips must have available seats.                                       |
| **Post-condition** | Bookings are created, invoices are generated, cart is cleared, and confirmation email is sent.                                     |

###### Sequence Flow

[sequence-manage-personal-booking-checkout-cart](../sequence/manage-personal-booking/checkout-cart)

###### Activities Flow

[activity-manage-personal-booking-checkout-cart](../activity/manage-personal-booking/checkout-cart)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (3), (3.1), (3.2) | BR66    | **Querying Rules:** When user clicks [btnCheckout] at step (2), system queries cart with SQL: "SELECT ci.\*, t.trip_name, t.available_slots, t.status FROM Cart_Item ci JOIN Trip t ON ci.trip_id = t.trip_id WHERE ci.cart_id = [cart_id]". If COUNT = 0 → display "Your cart is empty" (Refer to MSG 34) at step (3.1), end use case at step (3.2). (Refer to "Cart_Item" and "Trip" tables in "DB Sheet" file)                                                                                                                                                                                                                           |
| (4), (4.1), (4.2) | BR67    | **Validation Rules:** System verifies all trips at step (4): checks if t.status = 'active' AND t.available_slots >= ci.quantity for each cart item. If any trip invalid → display invalid trips list showing trip names and issues (Refer to MSG 35) at step (4.1), prompt user to remove invalid trips or cancel at step (4.2), end use case. Else proceed to step (5).                                                                                                                                                                                                                                                                    |
| (5)               | BR68    | **Displaying Rules:** System displays "Checkout" form containing: for each trip in cart [sectionTripDetails] with [lblTripName], [numericUpDownPassengerCount]; and [panelTravelerDetails] with fields [txtBoxFullName], [txtBoxIdNumber], [txtBoxPhoneNumber], [txtBoxEmail] for each passenger; [lblTotalAmount], [btnConfirmBooking], [btnCancel]. (Refer to "Checkout Form" view in "View Description" file)                                                                                                                                                                                                                            |
| (8)               | BR69    | **Validation Rules:** When user clicks [btnConfirmBooking] in repeat loop (steps 6-8), system validates at step (8): for each traveler if [txtBoxFullName].isEmpty() = true OR [txtBoxFullName].length < 2 → error; if [txtBoxIdNumber].isEmpty() = true OR [txtBoxIdNumber].length < 9 → error; if [txtBoxPhoneNumber].isEmpty() = true OR not matches phone regex → error; if [txtBoxEmail].isEmpty() = true OR not matches email regex → error. If any validation fails → display error (Refer to MSG 36), return to step (6). Else proceed to step (9).                                                                                 |
| (11), (12), (13)  | BR70    | **Querying Rules:** System starts database transaction: (11) creates bookings with SQL INSERT INTO Tour_Booking, inserts travelers with SQL INSERT INTO Booking_Traveler, generates invoices with SQL INSERT INTO Invoice; (12) updates trip seats with SQL: "UPDATE Trip SET available_slots = available_slots - [quantity]", deletes cart items with SQL: "DELETE FROM Cart_Item WHERE cart_id = [cart_id]"; (13) displays success "Bookings created successfully!" (Refer to MSG 37), sends confirmation email sendBookingConfirmationEmail([email]). (Refer to "Tour_Booking", "Booking_Traveler", "Invoice" tables in "DB Sheet" file) |

##### 2.1.5.3 Edit Upcoming Trip's Passenger Details

###### Use Case Description

| Name               | Edit Upcoming Trip's Passenger Details                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows authenticated customers to edit passenger information for upcoming trips before departure.                                      |
| **Actor**          | Customer (must be signed in)                                                                                                                         |
| **Trigger**        | User clicks "Edit Passengers" button on an upcoming booking details page.                                                                            |
| **Pre-condition**  | User must be signed in. Booking must be in "Confirmed" or "Pending Payment" status. Departure date must be at least 48 hours in the future.          |
| **Post-condition** | Passenger details are updated in database, customer receives email confirmation with updated information, and can view the updated traveler details. |

###### Sequence Flow

[sequence-manage-personal-booking-edit-upcoming-trip's-passenger-details](../sequence/manage-personal-booking/edit-upcoming-trip's-passenger-details)

###### Activities Flow

[activity-manage-personal-booking-edit-upcoming-trip's-passenger-details](../activity/manage-personal-booking/edit-upcoming-trip's-passenger-details)

###### Business Rules

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (3), (4)               | BR71    | **Querying Rules:** When user clicks [btnEditPassengers] at step (5), system queries travelers with SQL: "SELECT bt.traveler_id, bt.full_name, bt.id_number, bt.phone_number, bt.email FROM Booking_Traveler bt WHERE bt.booking_id = [booking_id] ORDER BY bt.traveler_id ASC". Displays travelers in [listTravelers] showing: [lblTravelerName], [lblIdNumber], [lblPhone], [lblEmail], [btnEdit] for each traveler. (Refer to "Booking_Traveler" table in "DB Sheet" file)                                                                                                                                                         |
| (6), (7), (7.1), (7.2) | BR72    | **Validation Rules:** System verifies edit conditions at step (7): queries booking with SQL: "SELECT booking_status, tb.departure_date FROM Tour_Booking tb JOIN Trip t ON tb.trip_id = t.trip_id WHERE tb.booking_id = [booking_id]". Checks if booking_status IN ('Confirmed', 'Pending Payment') AND DATEDIFF(hour, NOW(), departure_date) >= 48. If any condition fails → display "Cannot edit: " with reason (booking cancelled/completed OR departure within 48 hours) (Refer to MSG 38) at step (7.1), user confirms at step (7.2), end use case. Else proceed to step (8). (Refer to "Tour_Booking" table in "DB Sheet" file) |
| (8)                    | BR73    | **Displaying Rules:** System displays "Edit Passenger Details" form containing: for each selected traveler [panelTravelerEdit] with fields [txtBoxFullName], [txtBoxIdNumber], [txtBoxPhoneNumber], [txtBoxEmail] pre-filled with current data; [btnSaveChanges], [btnCancel]. (Refer to "Edit Passenger Details" form in "View Description" file)                                                                                                                                                                                                                                                                                    |
| (11)                   | BR74    | **Validation Rules:** When user clicks [btnSaveChanges] in repeat loop (steps 9-11), system validates at step (11): for each edited traveler if [txtBoxFullName].isEmpty() = true OR [txtBoxFullName].length < 2 → error; if [txtBoxIdNumber].isEmpty() = true OR [txtBoxIdNumber].length < 9 → error; if [txtBoxPhoneNumber].isEmpty() = true OR not matches phone regex → error; if [txtBoxEmail].isEmpty() = true OR not matches email regex → error. If any validation fails → display error (Refer to MSG 39), return to step (9). Else proceed to step (12).                                                                    |
| (12), (13), (14), (15) | BR75    | **Querying Rules:** System starts database transaction at step (12): updates travelers with SQL: "UPDATE Booking_Traveler SET full_name = [new_name], id_number = [new_id], phone_number = [new_phone], email = [new_email], updated_at = NOW() WHERE traveler_id = [traveler_id]" for each edited traveler; (13) commits transaction; (14) displays "Passenger details updated successfully!" (Refer to MSG 40); (15) sends email sendPassengerUpdateConfirmation([email], [booking_id], [updated_travelers]). Customer views updated information at step (16). (Refer to "Booking_Traveler" table in "DB Sheet" file)               |

##### 2.1.5.4 View and Pay Booking Invoice Details

###### Use Case Description

| Name               | View and Pay Booking Invoice Details                                                                                                                                      |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows authenticated customers to view invoice details for their bookings and process payment for unpaid invoices through integrated payment gateway.       |
| **Actor**          | Customer (must be signed in)                                                                                                                                              |
| **Trigger**        | User clicks "View Invoice" or "Pay Now" button on a booking in their bookings list.                                                                                       |
| **Pre-condition**  | User must be signed in. Booking must exist and belong to the user. Invoice must be generated for the booking.                                                             |
| **Post-condition** | If payment is made: invoice status is updated to "Paid", booking status is updated to "Confirmed", customer receives payment confirmation email with e-ticket attachment. |

###### Sequence Flow

[sequence-manage-personal-booking-view-and-pay-booking-invoice-details](../sequence/manage-personal-booking/view-and-pay-booking-invoice-details)

###### Activities Flow

[activity-manage-personal-booking-view-and-pay-booking-invoice-details](../activity/manage-personal-booking/view-and-pay-booking-invoice-details)

###### Business Rules

| Activity                     | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2)            | BR76    | **Querying Rules:** When user clicks [btnViewInvoice] at step (1), system queries booking with SQL: "SELECT tb.\* FROM Tour_Booking tb WHERE tb.booking_id = [booking_id] AND tb.user_id = [user_id]". If COUNT = 0 OR user_id mismatch → display "Booking not found or access denied" (Refer to MSG 41) at step (2.1), user confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Tour_Booking" table in "DB Sheet" file)                                                                                                                                                                                                                 |
| (3), (4)                     | BR77    | **Querying Rules:** System queries invoice with SQL: "SELECT i.invoice_id, i.payment_status, i.invoice_amount, i.tax_amount, i.total_amount, i.due_date, i.created_at, tb.booking_id, tb.booking_status, t.trip_name, t.destination, t.departure_date FROM Invoice i JOIN Tour_Booking tb ON i.booking_id = tb.booking_id JOIN Trip t ON tb.trip_id = t.trip_id WHERE i.booking_id = [booking_id]". Displays invoice in [panelInvoiceDetails] showing: [lblInvoiceId], [lblAmount], [lblTax], [lblTotal], [lblPaymentStatus], trip details, [btnPayNow]. (Refer to "Invoice", "Tour_Booking", "Trip" tables in "DB Sheet" file)                                 |
| (7), (7.1), (7.2)            | BR78    | **Validation Rules:** When user clicks [btnPayNow] at step (6), system verifies at step (7): checks if i.payment_status != 'Paid' AND tb.booking_status NOT IN ('Cancelled', 'Completed') AND i.due_date >= NOW(). If any condition fails → display "Cannot process payment: " with reason (already paid OR booking cancelled/completed OR invoice overdue) (Refer to MSG 42) at step (7.1), user confirms at step (7.2), end use case. Else proceed to step (8).                                                                                                                                                                                               |
| (8)                          | BR79    | **Displaying Rules:** System displays "Payment Gateway" page containing: [dropdownPaymentMethod] with options (Credit Card, Debit Card, E-Wallet, Bank Transfer); conditional fields based on selection - for cards: [txtBoxCardNumber], [txtBoxCardholderName], [datePickerExpiry], [txtBoxCVV]; for e-wallet: [txtBoxWalletPhone]; for bank transfer: [dropdownBank]. Displays [lblTotalToPay], [btnConfirmPayment], [btnCancel]. (Refer to "Payment Gateway" view in "View Description" file)                                                                                                                                                                |
| (12), (13), (13.1), (13.2)   | BR80    | **Querying Rules:** When user clicks [btnConfirmPayment] at step (11), system processes payment at step (12): calls processPaymentGateway([payment_method], [payment_details], [total_amount]) with payment gateway API. Receives payment result at step (13). If payment_result.status = 'failed' OR payment_result.error != null → display "Payment failed: " with gateway error message (Refer to MSG 43) at step (13.1), user clicks [btnRetry] or [btnChangeMethod] at step (13.2), return to step (8) or (9). Else if payment_result.status = 'success' → proceed to step (14).                                                                           |
| (14), (15), (16), (17), (18) | BR81    | **Querying Rules:** System starts database transaction: (14) updates invoice with SQL: "UPDATE Invoice SET payment_status = 'Paid', payment_method = [method], transaction_id = [gateway_transaction_id], paid_at = NOW() WHERE invoice_id = [invoice_id]"; (15) updates booking status with SQL: "UPDATE Tour_Booking SET booking_status = 'Confirmed' WHERE booking_id = [booking_id]"; (16) commits transaction; (17) displays "Payment successful! Your booking is confirmed." (Refer to MSG 44); (18) sends email sendPaymentConfirmationWithTicket([email], [invoice_id], [e_ticket_pdf]). (Refer to "Invoice", "Tour_Booking" tables in "DB Sheet" file) |
| (19), (20)                   | BR82    | **Displaying Rules:** Customer views success message at step (19) with: [iconCheckmark], [lblSuccessMessage] "Payment successful!", [lblBookingStatus] "Confirmed", [lblTransactionId], [btnDownloadTicket], [btnViewBookingDetails]. User confirms at step (20) to end use case. (Refer to "Payment Success" view in "View Description" file)                                                                                                                                                                                                                                                                                                                  |

#### 2.1.6 Manage Routes Use Case

##### 2.1.6.1 Add New Route

###### Use Case Description

| Name               | Add New Route                                                                                                                        |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to create new travel routes by entering route information including name, start/end points, and duration. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                            |
| **Trigger**        | Staff selects "Add New Route" function in routes management page.                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to routes management module.                                     |
| **Post-condition** | New route is saved to database with all provided information. Staff is redirected to routes list showing the newly created route.    |

###### Sequence Flow

[sequence-manage-routes-add-new-route](../sequence/manage-routes/add-new-route)

###### Activities Flow

[activity-manage-routes-add-new-route](../activity/manage-routes/add-new-route)

###### Business Rules

| Activity      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)           | BR83    | **Displaying Rules:** When staff selects "Add New Route" at step (1), system displays "Add Route" form containing: [txtBoxRouteName], [txtBoxStartLocation], [txtBoxEndLocation], [numericUpDownDurationDays] with range 1-30, [fileUploadRouteImage] accepting .jpg/.png max 5MB, [dropdownStatus] with options (Active, Inactive), [btnSave], [btnCancel]. (Refer to "Add Route Form" view in "View Description" file)                                                                                                                                                          |
| (5)           | BR84    | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 3-5), system validates at step (5): if [txtBoxRouteName].isEmpty() = true OR [txtBoxRouteName].length < 3 → error; if [txtBoxStartLocation].isEmpty() = true → error; if [txtBoxEndLocation].isEmpty() = true → error; if [numericUpDownDurationDays].Value < 1 OR > 30 → error; if [fileUploadRouteImage] provided, check if file.size > 5MB OR file extension not in (".jpg", ".png") → error. If any validation fails → display error (Refer to MSG 45), return to step (3). Else proceed to step (6). |
| (6)           | BR85    | **Querying Rules:** System inserts new route with SQL: "INSERT INTO Route (route_name, start_location, end_location, duration_days, image_url, status, created_at, created_by) VALUES ([route_name], [start_location], [end_location], [duration_days], [uploaded_image_path], [status], NOW(), [staff_id])". (Refer to "Route" table in "DB Sheet" file)                                                                                                                                                                                                                         |
| (7), (8), (9) | BR86    | **Displaying Rules:** System displays success notification "Route created successfully!" (Refer to MSG 46) at step (7), redirects to routes list view showing all routes with new route highlighted. Staff views new route in [listRoutes] at step (8), confirms at step (9) to end use case.                                                                                                                                                                                                                                                                                     |

##### 2.1.6.2 View Route Detail

###### Use Case Description

| Name               | View Route Detail                                                                                                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view detailed information of a specific route including route data, total trips count, and schedule summary by day.                            |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                    |
| **Trigger**        | Staff clicks on a route from the routes list.                                                                                                                                |
| **Pre-condition**  | Staff must be authenticated with staff role. Route must exist in database.                                                                                                   |
| **Post-condition** | Staff views complete route details including basic information, associated trips count, and schedule summary organized by day showing attractions for each day of the route. |

###### Sequence Flow

[sequence-manage-routes-view-route-detail](../sequence/manage-routes/view-route-detail)

###### Activities Flow

[activity-manage-routes-view-route-detail](../activity/manage-routes/view-route-detail)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR87    | **Querying Rules:** When staff clicks route at step (1), system queries with SQL: "SELECT r.route_id, r.route_name, r.start_location, r.end_location, r.duration_days, r.image_url, r.status, r.created_at FROM Route r WHERE r.route_id = [route_id]". If COUNT = 0 → display "Route not found" (Refer to MSG 47) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Route" table in "DB Sheet" file)                                                                                                    |
| (3)               | BR88    | **Querying Rules:** System queries trips count and schedule with SQL: "SELECT COUNT(DISTINCT t.trip_id) as total_trips, ra.day_number, a.attraction_name, a.description FROM Route r LEFT JOIN Trip t ON r.route_id = t.route_id LEFT JOIN Route_Attraction ra ON r.route_id = ra.route_id LEFT JOIN Attraction a ON ra.attraction_id = a.attraction_id WHERE r.route_id = [route_id] GROUP BY ra.day_number, a.attraction_name ORDER BY ra.day_number, ra.visit_order". (Refer to "Trip", "Route_Attraction", "Attraction" tables in "DB Sheet" file) |
| (4), (5), (6)     | BR89    | **Displaying Rules:** System displays "Route Details" view at step (4) containing: [lblRouteName], [lblStartLocation], [lblEndLocation], [lblDurationDays], [imgRouteImage], [lblStatus], [lblTotalTrips] showing trip count; and [panelScheduleSummary] with [listDaySchedule] showing for each day: [lblDayNumber], [listAttractions] with attraction names. Staff views details at step (5), confirms at step (6). (Refer to "Route Details" view in "View Description" file)                                                                       |

##### 2.1.6.3 Edit Route Detail

###### Use Case Description

| Name               | Edit Route Detail                                                                                                                         |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to modify existing route information including name, locations, duration, image, and status.                   |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                 |
| **Trigger**        | Staff selects "Edit Route" function on a route from routes list.                                                                          |
| **Pre-condition**  | Staff must be authenticated with staff role. Route must exist and be in editable state (not archived or locked).                          |
| **Post-condition** | Route information is updated in database with new values. Staff views updated route details in the routes list with success confirmation. |

###### Sequence Flow

[sequence-manage-routes-edit-route-details](../sequence/manage-routes/edit-route-details)

###### Activities Flow

[activity-manage-routes-edit-route-details](../activity/manage-routes/edit-route-details)

###### Business Rules

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2)   | BR90    | **Querying Rules:** When staff selects "Edit Route" at step (1), system queries route with SQL: "SELECT r.\*, COUNT(t.trip_id) as active_trips FROM Route r LEFT JOIN Trip t ON r.route_id = t.route_id AND t.status = 'active' WHERE r.route_id = [route_id] GROUP BY r.route_id". Checks if COUNT = 0 OR r.status = 'Archived'. If route not found OR not editable → display "Cannot edit route: " with reason (not found OR archived OR has active trips) (Refer to MSG 48) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Route" and "Trip" tables in "DB Sheet" file)                                        |
| (3)                 | BR91    | **Displaying Rules:** System displays "Edit Route" form at step (3) containing: [txtBoxRouteName], [txtBoxStartLocation], [txtBoxEndLocation], [numericUpDownDurationDays] with range 1-30, [fileUploadRouteImage] accepting .jpg/.png max 5MB (showing current image thumbnail), [dropdownStatus] with options (Active, Inactive), [btnSave], [btnCancel]. All fields pre-filled with current route data. (Refer to "Edit Route Form" view in "View Description" file)                                                                                                                                                                                            |
| (6)                 | BR92    | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if [txtBoxRouteName].isEmpty() = true OR [txtBoxRouteName].length < 3 → error; if [txtBoxStartLocation].isEmpty() = true → error; if [txtBoxEndLocation].isEmpty() = true → error; if [numericUpDownDurationDays].Value < 1 OR > 30 → error; if [fileUploadRouteImage] changed, check if file.size > 5MB OR file extension not in (".jpg", ".png") → error. Checks constraints: if changing status to Inactive, verify no active trips exist. If any validation fails → display error (Refer to MSG 49), return to step (4). Else proceed to step (7). |
| (7), (8), (9), (10) | BR93    | **Querying Rules:** System updates route with SQL: "UPDATE Route SET route_name = [new_name], start_location = [new_start], end_location = [new_end], duration_days = [new_duration], image_url = [new_image_path], status = [new_status], updated_at = NOW(), updated_by = [staff_id] WHERE route_id = [route_id]" at step (7). Displays success "Route updated successfully!" (Refer to MSG 50) at step (8), reloads routes list. Staff views updated route at step (9), confirms at step (10). (Refer to "Route" table in "DB Sheet" file)                                                                                                                      |

##### 2.1.6.4 Delete Route

###### Use Case Description

| Name               | Delete Route                                                                                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to permanently delete a route from the system after verifying it has no related trips or attraction schedules.                                     |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                     |
| **Trigger**        | Staff clicks "Delete" button on a route in routes list.                                                                                                                       |
| **Pre-condition**  | Staff must be authenticated with staff role. Route must exist. Route must have no related trips or attraction schedules (foreign key constraints satisfied).                  |
| **Post-condition** | Route is permanently removed from database if no dependencies exist. Staff views updated routes list without the deleted route. If dependencies exist, deletion is prevented. |

###### Sequence Flow

[sequence-manage-routes-delete-route](../sequence/manage-routes/delete-route)

###### Activities Flow

[activity-manage-routes-delete-route](../activity/manage-routes/delete-route)

###### Business Rules

| Activity           | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2)  | BR94    | **Querying Rules:** When staff clicks [btnDelete] at step (2), system queries related data at step (3) with SQL: "SELECT COUNT(t.trip_id) as trip_count, COUNT(ra.attraction_id) as attraction_count FROM Route r LEFT JOIN Trip t ON r.route_id = t.route_id LEFT JOIN Route_Attraction ra ON r.route_id = ra.route_id WHERE r.route_id = [route_id] GROUP BY r.route_id". If trip_count > 0 OR attraction_count > 0 → display "Cannot delete route: Route has [X] trips and [Y] attractions. Remove them first." (Refer to MSG 51) at step (3.1), staff confirms at step (3.2), end use case. Else proceed to step (4). (Refer to "Trip", "Route_Attraction" tables in "DB Sheet" file) |
| (4)                | BR95    | **Displaying Rules:** System displays confirmation dialog at step (4) with [lblConfirmMessage] "Are you sure you want to delete route '[route_name]'? This action cannot be undone.", [btnConfirm], [btnCancel]. (Refer to "Delete Confirmation Dialog" in "View Description" file)                                                                                                                                                                                                                                                                                                                                                                                                       |
| (5), (5.1), (5.2)  | BR96    | **Choosing Rules:** Staff clicks [btnConfirm] or [btnCancel] at step (5). If staff clicks [btnCancel] → close dialog at step (5.1), staff confirms at step (5.2), end use case. Else if [btnConfirm] clicked → proceed to step (6).                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| (6), (7), (8), (9) | BR97    | **Querying Rules:** System deletes route in transaction at step (6) with SQL: "DELETE FROM Route WHERE route_id = [route_id]". Displays success "Route deleted successfully!" (Refer to MSG 52) at step (7), reloads routes list view without deleted route. Staff views updated list at step (8), confirms at step (9). (Refer to "Route" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                      |

##### 2.1.6.5 View and Filter Routes

###### Use Case Description

| Name               | View and Filter Routes                                                                                                                                               |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view all routes in the system and filter them by various criteria such as status, name, location, and duration.                        |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                            |
| **Trigger**        | Staff selects "View Routes" function in routes management module.                                                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to routes management module.                                                                     |
| **Post-condition** | Staff views routes list with optional filters applied. Can repeat filter operation multiple times. List shows route cards with basic information and action buttons. |

###### Sequence Flow

[sequence-manage-routes-view-and-filter-routes](../sequence/manage-routes/view-and-filter-routes)

###### Activities Flow

[activity-manage-routes-view-and-filter-routes](../activity/manage-routes/view-and-filter-routes)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR98    | **Querying Rules:** When staff selects "View Routes" at step (1), system queries routes with SQL: "SELECT r.route_id, r.route_name, r.start_location, r.end_location, r.duration_days, r.status, r.image_url, COUNT(t.trip_id) as trips_count FROM Route r LEFT JOIN Trip t ON r.route_id = t.route_id GROUP BY r.route_id ORDER BY r.created_at DESC". If COUNT = 0 → display "No routes found. Add a new route to get started." (Refer to MSG 53) with [btnAddRoute] at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Route" and "Trip" tables in "DB Sheet" file)         |
| (3)               | BR99    | **Displaying Rules:** System displays "Routes List" view at step (3) containing: filter panel with [txtBoxSearchName], [dropdownFilterStatus] with options (All, Active, Inactive), [numericUpDownMinDays], [numericUpDownMaxDays], [btnApplyFilter], [btnClearFilter]; and [listRoutes] showing for each route: [cardRoute] with [imgRouteThumbnail], [lblRouteName], [lblLocations], [lblDuration], [lblStatus], [lblTripsCount], [btnView], [btnEdit], [btnDelete]. Displays total "[COUNT] routes". (Refer to "Routes List" view in "View Description" file)                                                            |
| (6), (6.1)        | BR100   | **Querying Rules:** When staff clicks [btnApplyFilter] at step (5) in repeat loop (steps 4-8), system queries filtered routes at step (6) with SQL: "SELECT r.\_, COUNT(t.trip_id) as trips_count FROM Route r LEFT JOIN Trip t ON r.route_id = t.route_id WHERE ([txtBoxSearchName].Text = '' OR r.route_name LIKE '%[search]%') AND ([dropdownFilterStatus].Value = 'All' OR r.status = [status]) AND r.duration_days BETWEEN [min_days] AND [max_days] GROUP BY r.route_id ORDER BY r.created_at DESC". If COUNT = 0 → display "No routes match your filters" (Refer to MSG 54) at step (6.1). Else proceed to step (7). |
| (7), (8)          | BR101   | **Displaying Rules:** System updates [listRoutes] with filtered results at step (7), displays count "[filtered_count] of [total_count] routes". Staff can repeat filter at step (8) or confirm end. When staff confirms No at step (8), proceed to confirm end.                                                                                                                                                                                                                                                                                                                                                             |

#### 2.1.7 Manage Route Schedule Use Case

##### 2.1.7.1 Add New Itinerary

###### Use Case Description

| Name               | Add New Itinerary                                                                                                                                                       |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to add attractions to a route schedule by specifying day number, visit order, and activity description for each attraction.                  |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                                               |
| **Trigger**        | Admin clicks "Add Attraction" button while viewing a route schedule.                                                                                                    |
| **Pre-condition**  | Admin must be authenticated with admin role. Route must exist and be editable (not closed/archived). At least one attraction must exist in the system.                  |
| **Post-condition** | New itinerary item is added to route schedule with specified day, order, and description. System adjusts visit orders if conflicts exist. Admin views updated schedule. |

###### Sequence Flow

[sequence-manage-route-schedule-add-itinerary](../sequence/manage-route-schedule/add-itinerary)

###### Activities Flow

[activity-manage-route-schedule-add-itinerary](../activity/manage-route-schedule/add-itinerary)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2) | BR102   | **Querying Rules:** When admin clicks [btnAddAttraction] at step (2), system queries at step (3) with SQL: "SELECT r.status, COUNT(a.attraction_id) as available_attractions FROM Route r, Attraction a WHERE r.route_id = [route_id] AND a.status = 'active' GROUP BY r.route_id". Checks if r.status IN ('Closed', 'Archived') OR available_attractions = 0. If route not editable OR no attractions → display "Cannot add: " with reason (route closed/archived OR no active attractions available) (Refer to MSG 55) at step (3.1), admin confirms at step (3.2), end use case. Else proceed to step (4). (Refer to "Route" and "Attraction" tables in "DB Sheet" file) |
| (4)               | BR103   | **Displaying Rules:** System displays "Add Itinerary" form at step (4) containing: [dropdownAttraction] with available attractions list showing attraction names, [numericUpDownDayNumber] with range 1 to route.duration_days, [numericUpDownVisitOrder] with range 1-20, [txtAreaActivityDescription] for description text, [btnSave], [btnCancel]. (Refer to "Add Itinerary Form" view in "View Description" file)                                                                                                                                                                                                                                                       |
| (7)               | BR104   | **Validation Rules:** When admin clicks [btnSave] in repeat loop (steps 5-7), system validates at step (7): if [dropdownAttraction].SelectedValue = null → error; if [numericUpDownDayNumber].Value < 1 OR > route.duration_days → error; if [numericUpDownVisitOrder].Value < 1 OR > 20 → error; if [txtAreaActivityDescription].isEmpty() = true OR [txtAreaActivityDescription].length < 10 → error. Checks duplicate: query if attraction already exists in same route. If duplicate → error. If any validation fails → display error (Refer to MSG 56), return to step (5). Else proceed to step (8).                                                                  |
| (8)               | BR105   | **Querying Rules:** System checks order conflicts at step (8): queries "SELECT order_in_day FROM Route_Attraction WHERE route_id = [route_id] AND day_number = [day] AND order_in_day >= [order]". If conflicts found → updates with SQL: "UPDATE Route_Attraction SET order_in_day = order_in_day + 1 WHERE route_id = [route_id] AND day_number = [day] AND order_in_day >= [order]". Then inserts with SQL: "INSERT INTO Route_Attraction (route_id, attraction_id, day_number, order_in_day, activity_description) VALUES ([route_id], [attraction_id], [day], [order], [description])". (Refer to "Route_Attraction" table in "DB Sheet" file)                         |
| (9), (10), (11)   | BR106   | **Displaying Rules:** System displays success "Attraction added to schedule!" (Refer to MSG 57) at step (9), reloads schedule view showing updated itinerary grouped by days. Admin views updated schedule at step (10), confirms at step (11).                                                                                                                                                                                                                                                                                                                                                                                                                             |

##### 2.1.7.2 View Route Schedule

###### Use Case Description

| Name               | View Route Schedule                                                                                                                                                                                 |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff and admin to view the complete schedule of a route showing all attractions organized by day number with visit order and activity descriptions.                           |
| **Actor**          | Staff or Admin (must be signed in with staff/admin role)                                                                                                                                            |
| **Trigger**        | User selects "View Route Schedule" function or clicks on a route to view its schedule.                                                                                                              |
| **Pre-condition**  | User must be authenticated with staff or admin role. Route must exist in database.                                                                                                                  |
| **Post-condition** | User views route information and complete schedule grouped by days. If user is admin, action buttons (Add/Edit/Delete) are displayed. If schedule is empty, suggestion to add attractions is shown. |

###### Sequence Flow

[sequence-manage-route-schedule-view-route-schedule](../sequence/manage-route-schedule/view-route-schedule)

###### Activities Flow

[activity-manage-route-schedule-view-route-schedule](../activity/manage-route-schedule/view-route-schedule)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR107   | **Querying Rules:** When user selects "View Route Schedule" at step (1), system queries route with SQL: "SELECT r.route_id, r.route_name, r.start_location, r.end_location, r.duration_days, r.status, r.image_url FROM Route r WHERE r.route_id = [route_id]". If COUNT = 0 → display "Route not found" (Refer to MSG 58) at step (2.1), user confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Route" table in "DB Sheet" file)                                                                                                                                                                                                     |
| (3), (3.1), (3.2) | BR108   | **Querying Rules:** System queries schedule at step (3) with SQL: "SELECT ra.day_number, ra.order_in_day, ra.activity_description, a.attraction_id, a.attraction_name, a.location, a.description FROM Route_Attraction ra JOIN Attraction a ON ra.attraction_id = a.attraction_id WHERE ra.route_id = [route_id] ORDER BY ra.day_number ASC, ra.order_in_day ASC". If COUNT = 0 → display "No schedule available. Add attractions to create itinerary." (Refer to MSG 59) with [btnAddAttraction] at step (3.1), user confirms at step (3.2), end use case. Else proceed to step (4). (Refer to "Route_Attraction" and "Attraction" tables in "DB Sheet" file) |
| (4), (5), (6)     | BR109   | **Displaying Rules:** System groups attractions by day_number at step (4). Displays "Route Schedule" view at steps (5-6) containing: route info panel with [imgRouteImage], [lblRouteName], [lblStartEnd], [lblDuration], [lblStatus]; and schedule panel with [listDaySchedule] showing for each day: [lblDayNumber] "Day X", [listAttractions] with [cardAttraction] containing [lblAttractionName], [lblOrder], [lblActivityDescription], [lblLocation]. (Refer to "Route Schedule" view in "View Description" file)                                                                                                                                        |
| (6.1), (7), (8)   | BR110   | **Displaying Rules:** At step (6.1), if user role = 'Admin' → display action buttons [btnAddAttraction], [btnEdit], [btnDelete] for each attraction. Else if role = 'Staff' → hide action buttons. User views schedule at step (7), confirms at step (8).                                                                                                                                                                                                                                                                                                                                                                                                      |

##### 2.1.7.3 Edit Itinerary

###### Use Case Description

| Name               | Edit Itinerary                                                                                                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to modify itinerary details including day number, visit order, and activity description for an attraction in the route schedule.                                     |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                                                                       |
| **Trigger**        | Admin clicks "Edit" button on an attraction in the route schedule view.                                                                                                                         |
| **Pre-condition**  | Admin must be authenticated with admin role. Route must not be closed. Route_Attraction record must exist.                                                                                      |
| **Post-condition** | Itinerary details are updated. If day or order changed, system adjusts visit orders for affected attractions in old and new day positions. Admin views updated schedule with changes reflected. |

###### Sequence Flow

[sequence-manage-route-schedule-edit-itinerary](../sequence/manage-route-schedule/edit-itinerary)

###### Activities Flow

[activity-manage-route-schedule-edit-itinerary](../activity/manage-route-schedule/edit-itinerary)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| :----------------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2)        | BR111   | **Querying Rules:** When admin clicks [btnEdit] at step (2), system queries route status at step (3) with SQL: "SELECT r.status FROM Route r WHERE r.route_id = [route_id]". If r.status = 'Closed' → display "Cannot edit: Route is closed" (Refer to MSG 60) at step (3.1), admin confirms at step (3.2), end use case. Else proceed to step (4). (Refer to "Route" table in "DB Sheet" file)                                                                                                                                                                                                                        |
| (4), (4.1), (4.2), (4.3) | BR112   | **Querying Rules:** System queries itinerary at step (4) with SQL: "SELECT ra.route_id, ra.attraction_id, ra.day_number, ra.order_in_day, ra.activity_description, a.attraction_name FROM Route_Attraction ra JOIN Attraction a ON ra.attraction_id = a.attraction_id WHERE ra.route_id = [route_id] AND ra.attraction_id = [attraction_id]". If COUNT = 0 → display "Attraction not found in schedule" (Refer to MSG 61) at step (4.1), reload schedule at step (4.2), admin confirms at step (4.3), end use case. Else proceed to step (5). (Refer to "Route_Attraction" and "Attraction" tables in "DB Sheet" file) |
| (5)                      | BR113   | **Displaying Rules:** System displays "Edit Itinerary" form at step (5) containing: [lblAttractionName] (read-only) showing current attraction, [numericUpDownDayNumber] with range 1 to route.duration_days pre-filled, [numericUpDownVisitOrder] with range 1-20 pre-filled, [txtAreaActivityDescription] pre-filled with current description, [btnSave], [btnCancel]. (Refer to "Edit Itinerary Form" view in "View Description" file)                                                                                                                                                                              |
| (8)                      | BR114   | **Validation Rules:** When admin clicks [btnSave] in repeat loop (steps 6-8), system validates at step (8): if [numericUpDownDayNumber].Value < 1 OR > route.duration_days → error; if [numericUpDownVisitOrder].Value < 1 OR > 20 → error; if [txtAreaActivityDescription].isEmpty() = true OR [txtAreaActivityDescription].length < 10 → error. If any validation fails → display error (Refer to MSG 62), return to step (6). Else proceed to step (9).                                                                                                                                                             |
| (9), (9.1), (9.2), (9.3) | BR115   | **Querying Rules:** System checks if day or order changed at step (9). If changed: (9.1) stores old values; (9.2) updates with SQL: "UPDATE Route_Attraction SET order_in_day = order_in_day - 1 WHERE route_id = [route_id] AND day_number = [old_day] AND order_in_day > [old_order]"; (9.3) updates with SQL: "UPDATE Route_Attraction SET order_in_day = order_in_day + 1 WHERE route_id = [route_id] AND day_number = [new_day] AND order_in_day >= [new_order] AND attraction_id != [current_attraction]". Else skip to step (10). (Refer to "Route_Attraction" table in "DB Sheet" file)                        |
| (10), (11)               | BR116   | **Querying Rules:** System updates itinerary at step (10) with SQL: "UPDATE Route_Attraction SET day_number = [new_day], order_in_day = [new_order], activity_description = [new_description], updated_at = NOW() WHERE route_id = [route_id] AND attraction_id = [attraction_id]". Commits transaction at step (11). (Refer to "Route_Attraction" table in "DB Sheet" file)                                                                                                                                                                                                                                           |
| (12), (13), (14), (15)   | BR117   | **Displaying Rules:** System displays success "Itinerary updated successfully!" (Refer to MSG 63) at step (12), reloads schedule at step (13) showing updated order and data. Admin views updated schedule at step (14), confirms at step (15).                                                                                                                                                                                                                                                                                                                                                                        |

##### 2.1.7.4 Delete Itinerary

###### Use Case Description

| Name               | Delete Itinerary                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to remove an attraction from the route schedule after verification that it's not the last remaining attraction.                           |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                                            |
| **Trigger**        | Admin clicks "Delete" button on an attraction in the route schedule view.                                                                                            |
| **Pre-condition**  | Admin must be authenticated with admin role. Route must not be closed. Route_Attraction record must exist. Route must have more than one attraction in schedule.     |
| **Post-condition** | Attraction is removed from route schedule. Visit orders for remaining attractions in same day are adjusted. Admin views updated schedule without deleted attraction. |

###### Sequence Flow

[sequence-manage-route-schedule-delete-itinerary](../sequence/manage-route-schedule/delete-itinerary)

###### Activities Flow

[activity-manage-route-schedule-delete-itinerary](../activity/manage-route-schedule/delete-itinerary)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2)        | BR118   | **Querying Rules:** When admin clicks [btnDelete] at step (2), system queries route status at step (3) with SQL: "SELECT r.status FROM Route r WHERE r.route_id = [route_id]". If r.status = 'Closed' → display "Cannot delete: Route is closed" (Refer to MSG 64) at step (3.1), admin confirms at step (3.2), end use case. Else proceed to step (4). (Refer to "Route" table in "DB Sheet" file)                                                                                                                                                            |
| (4), (4.1), (4.2), (4.3) | BR119   | **Querying Rules:** System queries itinerary at step (4) with SQL: "SELECT ra.day_number, ra.order_in_day, a.attraction_name FROM Route_Attraction ra JOIN Attraction a ON ra.attraction_id = a.attraction_id WHERE ra.route_id = [route_id] AND ra.attraction_id = [attraction_id]". If COUNT = 0 → display "Attraction not found in schedule" (Refer to MSG 65) at step (4.1), reload schedule at step (4.2), admin confirms at step (4.3), end use case. Else proceed to step (5). (Refer to "Route_Attraction" and "Attraction" tables in "DB Sheet" file) |
| (5), (5.1), (5.2)        | BR120   | **Querying Rules:** System queries total attractions at step (5) with SQL: "SELECT COUNT(\*) as total FROM Route_Attraction WHERE route_id = [route_id]". If total <= 1 → display "Cannot delete: This is the last attraction in schedule. Route must have at least one attraction." (Refer to MSG 66) at step (5.1), admin confirms at step (5.2), end use case. Else proceed to step (6). (Refer to "Route_Attraction" table in "DB Sheet" file)                                                                                                             |
| (6)                      | BR121   | **Displaying Rules:** System displays confirmation dialog at step (6) with [lblConfirmMessage] "Are you sure you want to remove '[attraction_name]' from Day [day_number]? This action cannot be undone.", [btnConfirm], [btnCancel]. (Refer to "Delete Itinerary Confirmation Dialog" in "View Description" file)                                                                                                                                                                                                                                             |
| (7), (7.1), (7.2)        | BR122   | **Choosing Rules:** Admin clicks [btnConfirm] or [btnCancel] at step (7). If admin clicks [btnCancel] → close dialog at step (7.1), admin confirms at step (7.2), end use case. Else if [btnConfirm] clicked → proceed to step (8).                                                                                                                                                                                                                                                                                                                            |
| (8), (9), (10), (11)     | BR123   | **Querying Rules:** System stores day and order at step (8). Deletes itinerary at step (9) in transaction with SQL: "DELETE FROM Route_Attraction WHERE route_id = [route_id] AND attraction_id = [attraction_id]". Updates remaining orders at step (10) with SQL: "UPDATE Route_Attraction SET order_in_day = order_in_day - 1 WHERE route_id = [route_id] AND day_number = [day] AND order_in_day > [deleted_order]". Commits transaction at step (11). (Refer to "Route_Attraction" table in "DB Sheet" file)                                              |
| (12), (13), (14), (15)   | BR124   | **Displaying Rules:** System displays success "Attraction removed from schedule!" (Refer to MSG 67) at step (12), reloads schedule at step (13) showing updated itinerary. Admin views updated schedule at step (14), confirms at step (15).                                                                                                                                                                                                                                                                                                                   |

#### 2.1.8 Manage Attraction Use Case

##### 2.1.8.1 Add New Attraction

###### Use Case Description

| Name               | Add New Attraction                                                                                                                                              |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to create new attraction records by entering attraction information including name, description, location, category, and status.     |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                                       |
| **Trigger**        | Admin selects "Add New Attraction" function in attractions management page.                                                                                     |
| **Pre-condition**  | Admin must be authenticated with admin role. Admin must have access to attractions management module. At least one category must exist in the system.           |
| **Post-condition** | New attraction is saved to database with status ACTIVE by default. Admin is redirected to attractions list or detail view showing the newly created attraction. |

###### Sequence Flow

[sequence-manage-attraction-add-new-attraction](../sequence/manage-attraction/add-new-attraction)

###### Activities Flow

[activity-manage-attraction-add-new-attraction](../activity/manage-attraction/add-new-attraction)

###### Business Rules

| Activity | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| :------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)      | BR125   | **Displaying Rules:** System displays "Add New Attraction" form at step (2) containing: [txtBoxAttractionName] for attraction name input, [txtAreaDescription] for multiline description text, [txtBoxLocation] for location input, [dropdownCategory] populated with available categories, [dropdownStatus] with default value 'Active', [btnSave], [btnCancel]. (Refer to "Add Attraction Form" view in "View Description" file)                                                                                                                                                                    |
| (4), (5) | BR126   | **Validation Rules:** When admin clicks [btnSave] in repeat loop (steps 3-5), system validates at step (4): if [txtBoxAttractionName].length < 3 → error; if [txtAreaDescription].length < 20 → error; if [txtBoxLocation].isEmpty() = true → error; if [dropdownCategory].SelectedValue = null OR [dropdownStatus].SelectedValue = null → error. Checks duplicate with SQL: "SELECT COUNT(\*) FROM Attraction WHERE attraction_name = [name] AND location = [location]". If duplicate found OR any validation fails → display error (Refer to MSG 68), return to step (3). Else proceed to step (6). |
| (6)      | BR127   | **Querying Rules:** System inserts new attraction at step (6) with SQL: "INSERT INTO Attraction (attraction_name, description, location, category_id, status, created_at, created_by) VALUES ([name], [description], [location], [category_id], [status], NOW(), [admin_id])". (Refer to "Attraction" table in "DB Sheet" file)                                                                                                                                                                                                                                                                       |
| (7), (8) | BR128   | **Displaying Rules:** System displays success message "Attraction created successfully!" (Refer to MSG 69) at step (7), redirects to attractions list view at step (8). Admin views updated list and confirms end.                                                                                                                                                                                                                                                                                                                                                                                    |

##### 2.1.8.2 View Attraction Detail

###### Use Case Description

| Name               | View Attraction Detail                                                                                                                                             |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view detailed information of a specific attraction including basic data, category information, and usage summary in route schedules. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                          |
| **Trigger**        | Staff clicks on an attraction from the attractions list.                                                                                                           |
| **Pre-condition**  | Staff must be authenticated with staff role. Attraction must exist in database.                                                                                    |
| **Post-condition** | Staff views complete attraction details including name, description, location, category, status, and summary of how many routes reference this attraction.         |

###### Sequence Flow

[sequence-manage-attraction-view-attraction-detail](../sequence/manage-attraction/view-attraction-detail)

###### Activities Flow

[activity-manage-attraction-view-attraction-detail](../activity/manage-attraction/view-attraction-detail)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR129   | **Querying Rules:** When staff selects attraction at step (1), system queries attraction data at step (2) with SQL: "SELECT attraction_id, attraction_name, description, location, category_id, status, created_at, updated_at FROM Attraction WHERE attraction_id = [id]". If COUNT = 0 → display "Attraction not found" (Refer to MSG 70) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Attraction" table in "DB Sheet" file)                                                    |
| (3)               | BR130   | **Querying Rules:** System queries category and usage information at step (3) with SQL: "SELECT c.category_name, COUNT(DISTINCT ra.route_id) as routes_count FROM Attraction a JOIN Category c ON a.category_id = c.category_id LEFT JOIN Route_Attraction ra ON a.attraction_id = ra.attraction_id WHERE a.attraction_id = [id] GROUP BY c.category_name". (Refer to "Category" and "Route_Attraction" tables in "DB Sheet" file)                                                                                                   |
| (4), (5), (6)     | BR131   | **Displaying Rules:** System displays "Attraction Detail" view at steps (4-6) containing: [lblAttractionName] showing attraction name, [txtDescription] displaying description text (read-only), [lblLocation] showing location, [lblCategory] showing category name, [lblStatus] showing current status; usage summary panel displaying "Used in [X] routes" with [btnViewRoutes] button if routes_count > 0. Staff views details at step (5), confirms at step (6). (Refer to "Attraction Detail" view in "View Description" file) |

##### 2.1.8.3 Edit Attraction Detail

###### Use Case Description

| Name               | Edit Attraction Detail                                                                                                                                                  |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to modify existing attraction information including name, description, location, category, and status.                                       |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                               |
| **Trigger**        | Staff selects "Edit Attraction" function on an attraction from attractions list.                                                                                        |
| **Pre-condition**  | Staff must be authenticated with staff role. Attraction must exist and be in editable state (not deleted).                                                              |
| **Post-condition** | Attraction information is updated in database with new values. Staff views updated attraction details in the attractions list or detail view with success confirmation. |

###### Sequence Flow

[sequence-manage-attraction-edit-attraction-detail](../sequence/manage-attraction/edit-attraction-detail)

###### Activities Flow

[activity-manage-attraction-edit-attraction-detail](../activity/manage-attraction/edit-attraction-detail)

###### Business Rules

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :------------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2)   | BR132   | **Querying Rules:** When staff selects "Edit Attraction" at step (1), system queries attraction data at step (2) with SQL: "SELECT attraction_id, attraction_name, description, location, category_id, status FROM Attraction WHERE attraction_id = [id]". If COUNT = 0 → display "Attraction not found" (Refer to MSG 71), end use case. If status = 'Deleted' → display "Cannot edit: Attraction has been deleted" (Refer to MSG 71) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Attraction" table in "DB Sheet" file)                                                            |
| (3)                 | BR133   | **Displaying Rules:** System displays "Edit Attraction" form at step (3) containing: [txtBoxAttractionName], [txtAreaDescription], [txtBoxLocation], [dropdownCategory], [dropdownStatus], [btnSave], [btnCancel]. All fields are pre-filled with existing attraction data queried at step (2). (Refer to "Edit Attraction Form" view in "View Description" file)                                                                                                                                                                                                                                                                       |
| (6)                 | BR134   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if [txtBoxAttractionName].length < 3 → error; if [txtAreaDescription].length < 20 → error; if [txtBoxLocation].isEmpty() = true → error; if [dropdownCategory].SelectedValue = null OR [dropdownStatus].SelectedValue = null → error. Checks duplicate with SQL: "SELECT COUNT(\*) FROM Attraction WHERE attraction_name = [name] AND location = [location] AND attraction_id != [current_id]". If duplicate found OR any validation fails → display error (Refer to MSG 72), return to step (4). Else proceed to step (7). |
| (7), (8), (9), (10) | BR135   | **Querying Rules:** System updates attraction at step (7) with SQL: "UPDATE Attraction SET attraction_name = [name], description = [description], location = [location], category_id = [category_id], status = [status], updated_at = NOW() WHERE attraction_id = [id]". Displays success message "Attraction updated successfully!" (Refer to MSG 73) at step (8), reloads attractions list at step (9). Staff views updated list at step (10), confirms end. (Refer to "Attraction" table in "DB Sheet" file)                                                                                                                         |

##### 2.1.8.4 Delete Attraction

###### Use Case Description

| Name               | Delete Attraction                                                                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows staff to remove an attraction from the system. If attraction is referenced in route schedules, system suggests setting status to INACTIVE instead. Otherwise, performs soft delete by setting status to DELETED. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                                                             |
| **Trigger**        | Staff clicks "Delete" button on an attraction in attractions list.                                                                                                                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Attraction must exist.                                                                                                                                                                   |
| **Post-condition** | If no references: attraction status is set to DELETED (soft delete). If has references: attraction status is set to INACTIVE. Staff views updated attractions list with modified or removed attraction.                               |

###### Sequence Flow

[sequence-manage-attraction-delete-attraction](../sequence/manage-attraction/delete-attraction)

###### Activities Flow

[activity-manage-attraction-delete-attraction](../activity/manage-attraction/delete-attraction)

###### Business Rules

| Activity                              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :------------------------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1)                            | BR136   | **Querying Rules:** When staff clicks [btnDelete] at step (2), system checks references at step (3) with SQL: "SELECT COUNT(\*) FROM Route_Attraction WHERE attraction_id = [id]". If count > 0 → display "This attraction is used in [X] routes. Set status to INACTIVE instead?" (Refer to MSG 74) at step (3.1) with [btnSetInactive], [btnCancel]. Else proceed to step (4). (Refer to "Route_Attraction" table in "DB Sheet" file)                                                                                  |
| (3.2), (3.2.1), (3.2.2)               | BR137   | **Choosing Rules:** At step (3.2), if staff clicks [btnCancel] at step (3.2.1) → close dialog, end use case. If staff clicks [btnSetInactive] at step (3.2.2) → proceed to step (3.3).                                                                                                                                                                                                                                                                                                                                   |
| (3.3)                                 | BR138   | **Querying Rules:** System updates attraction status at step (3.3) with SQL: "UPDATE Attraction SET status = 'Inactive', updated_at = NOW() WHERE attraction_id = [id]". (Refer to "Attraction" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                |
| (3.4), (3.5), (3.6)                   | BR139   | **Displaying Rules:** System displays success message "Attraction status set to INACTIVE!" (Refer to MSG 75) at step (3.4), reloads attractions list at step (3.5). Staff views updated list with status changed at step (3.6), confirms end use case.                                                                                                                                                                                                                                                                   |
| (4)                                   | BR140   | **Displaying Rules:** System displays confirmation dialog at step (4): "Delete '[attraction_name]'? Status will be set to DELETED." with [btnConfirm], [btnCancel].                                                                                                                                                                                                                                                                                                                                                      |
| (5), (5.1), (5.2), (6), (7), (8), (9) | BR141   | **Choosing/Querying Rules:** At step (5), if staff clicks [btnCancel] at step (5.1) → close dialog at step (5.2), end use case. If staff clicks [btnConfirm] → system updates at step (6) with SQL: "UPDATE Attraction SET status = 'Deleted', updated_at = NOW() WHERE attraction_id = [id]". Displays success message "Attraction deleted successfully!" (Refer to MSG 76) at step (7), reloads list at step (8). Staff views updated list at step (9), confirms end. (Refer to "Attraction" table in "DB Sheet" file) |

##### 2.1.8.5 View and Filter Attractions

###### Use Case Description

| Name               | View and Filter Attractions                                                                                                                                                    |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view all attractions in the system and filter them by various criteria such as name, location, category, and status.                             |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                      |
| **Trigger**        | Staff selects "View Attractions" function in attractions management module.                                                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to attractions management module.                                                                          |
| **Post-condition** | Staff views attractions list with optional filters applied. Can repeat filter operation multiple times. List shows attraction cards with basic information and action buttons. |

###### Sequence Flow

[sequence-manage-attraction-view-and-filter-attractions](../sequence/manage-attraction/view-and-filter-attractions)

###### Activities Flow

[activity-manage-attraction-view-and-filter-attractions](../activity/manage-attraction/view-and-filter-attractions)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR142   | **Querying Rules:** When staff selects "View Attractions" at step (1), system queries all attractions at step (2) with SQL: "SELECT a.attraction_id, a.attraction_name, a.description, a.location, a.status, c.category_name, COUNT(ra.route_id) as routes_count FROM Attraction a JOIN Category c ON a.category_id = c.category_id LEFT JOIN Route_Attraction ra ON a.attraction_id = ra.attraction_id WHERE a.status != 'Deleted' GROUP BY a.attraction_id ORDER BY a.created_at DESC". If COUNT = 0 → display "No attractions found" (Refer to MSG 77) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Attraction", "Category", "Route_Attraction" tables in "DB Sheet" file)                                                                                  |
| (3)               | BR143   | **Displaying Rules:** System displays "Attractions List" view at step (3) containing: filter panel with [txtBoxSearchName] for name search, [txtBoxSearchLocation] for location search, [dropdownFilterCategory] populated with all categories, [dropdownFilterStatus] with status options, [btnApplyFilter]; and attractions grid displaying [cardAttraction] for each attraction showing [lblAttractionName], [lblLocation], [lblCategory], [lblStatus], usage indicator "Used in [X] routes", and action buttons [btnView], [btnEdit], [btnDelete]. (Refer to "Attractions List" view in "View Description" file)                                                                                                                                                                                              |
| (6), (6.1)        | BR144   | **Querying Rules:** When staff clicks [btnApplyFilter] in repeat loop (steps 4-6), system applies filters at step (6) with SQL: "SELECT a.attraction_id, a.attraction_name, a.description, a.location, a.status, c.category_name, COUNT(ra.route_id) as routes_count FROM Attraction a JOIN Category c ON a.category_id = c.category_id LEFT JOIN Route_Attraction ra ON a.attraction_id = ra.attraction_id WHERE a.status != 'Deleted' AND (a.attraction_name LIKE '%[name]%' OR [name] = '') AND (a.location LIKE '%[location]%' OR [location] = '') AND (a.category_id = [category] OR [category] = null) AND (a.status = [status] OR [status] = null) GROUP BY a.attraction_id". If COUNT = 0 → display "No attractions match the filter criteria" (Refer to MSG 78) at step (6.1). Else proceed to step (7). |
| (7), (8)          | BR145   | **Displaying Rules:** System updates attractions grid at step (7) with filtered results, displays result count "[filtered_count] of [total_count] attractions" below filter panel. Staff views filtered list at step (8), can repeat filter operation or confirm end use case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |

#### 2.1.9 Manage Trips Use Case

##### 2.1.9.1 Add New Trip

###### Use Case Description

| Name               | Add New Trip                                                                                                                                                                     |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to create new trip records by entering trip information including route, departure/return dates, price, available seats, pickup location, and status. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                        |
| **Trigger**        | Staff selects "Add New Trip" function in trips management page.                                                                                                                  |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to trips management module. At least one route must exist in the system.                                     |
| **Post-condition** | New trip is saved to database with specified departure and return dates. Staff is redirected to trips list or detail view showing the newly created trip.                        |

###### Sequence Flow

[sequence-manage-trips-add-new-trip](../sequence/manage-trips/add-new-trip)

###### Activities Flow

[activity-manage-trips-add-new-trip](../activity/manage-trips/add-new-trip)

###### Business Rules

| Activity       | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)            | BR146   | **Displaying Rules:** System displays "Add New Trip" form at step (2) containing: [dropdownRoute] populated with available routes showing route names, [datePickerDeparture] for departure date selection, [datePickerReturn] for return date selection, [numericUpDownPrice] for trip price, [numericUpDownSeats] for total available seats, [txtBoxPickupLocation] for pickup location, [dropdownStatus] with default value 'Scheduled', [btnSave], [btnCancel]. (Refer to "Add Trip Form" view in "View Description" file)                                                                                                                                                                                                                                        |
| (5), (6)       | BR147   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 3-5), system validates at step (5): if [dropdownRoute].SelectedValue = null → error; if [datePickerDeparture].Value <= NOW() → error "Departure date must be in future"; if [datePickerReturn].Value <= [datePickerDeparture].Value → error "Return date must be after departure"; if [numericUpDownPrice].Value <= 0 OR [numericUpDownSeats].Value <= 0 → error; if [txtBoxPickupLocation].isEmpty() = true → error. At step (6), checks duplicate schedule with SQL: "SELECT COUNT(\*) FROM Trip WHERE route_id = [route_id] AND departure_date = [dep_date]". If duplicate found OR any validation fails → display error (Refer to MSG 79), return to step (3). Else proceed to step (7). |
| (7)            | BR148   | **Querying Rules:** System inserts new trip at step (7) with SQL: "INSERT INTO Trip (route_id, departure_date, return_date, price, total_seats, booked_seats, pickup_location, status, created_at, created_by) VALUES ([route_id], [dep_date], [ret_date], [price], [seats], 0, [pickup], [status], NOW(), [staff_id])". (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                  |
| (8), (9), (10) | BR149   | **Displaying Rules:** System displays success message "Trip created successfully!" (Refer to MSG 80) at step (8), redirects to trips list view at step (9). Staff views new trip in list at step (10), confirms end.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |

##### 2.1.9.2 View Trip Details

###### Use Case Description

| Name               | View Trip Details                                                                                                                                                                |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view detailed information of a specific trip including route info, dates, pricing, seat availability, and booking summary.                         |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                        |
| **Trigger**        | Staff clicks on a trip from the trips list.                                                                                                                                      |
| **Pre-condition**  | Staff must be authenticated with staff role. Trip must exist in database.                                                                                                        |
| **Post-condition** | Staff views complete trip details including route information, departure/return dates, pricing, available/booked seats ratio, and summary of bookings associated with this trip. |

###### Sequence Flow

[sequence-manage-trips-view-trip-details](../sequence/manage-trips/view-trip-details)

###### Activities Flow

[activity-manage-trips-view-trip-details](../activity/manage-trips/view-trip-details)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR150   | **Querying Rules:** When staff selects trip at step (1), system queries trip data at step (2) with SQL: "SELECT t.trip_id, t.departure_date, t.return_date, t.price, t.total_seats, t.booked_seats, t.pickup_location, t.status, r.route_id, r.route_name, r.start_location, r.end_location, r.duration_days FROM Trip t JOIN Route r ON t.route_id = r.route_id WHERE t.trip_id = [id]". If COUNT = 0 → display "Trip not found" (Refer to MSG 81) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Trip" and "Route" tables in "DB Sheet" file)         |
| (3)               | BR151   | **Querying Rules:** System queries booking summary at step (3) with SQL: "SELECT COUNT(\*) as total_bookings, SUM(no_adults + no_children) as total_travelers, SUM(CASE WHEN status = 'CONFIRMED' THEN 1 ELSE 0 END) as confirmed_count FROM Tour_Booking WHERE trip_id = [id]". (Refer to "Tour_Booking" table in "DB Sheet" file)                                                                                                                                                                                                                                                                      |
| (4), (5), (6)     | BR152   | **Displaying Rules:** System displays "Trip Detail" view at steps (4-6) containing: trip info panel with [lblRouteName], [lblStartEnd], [lblDuration], [lblDepartureDate], [lblReturnDate], [lblPrice], [lblPickupLocation], [lblStatus]; seats panel showing [progressBarSeats] with "[booked] / [total] seats booked" and available seats count; booking summary panel displaying total bookings count, total travelers count, confirmed bookings count with [btnViewBookings] button. Staff views details at step (5), confirms at step (6). (Refer to "Trip Detail" view in "View Description" file) |

##### 2.1.9.3 Edit Trip

###### Use Case Description

| Name               | Edit Trip                                                                                                                                                         |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to modify existing trip information including dates, price, seats, pickup location, and status.                                        |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                         |
| **Trigger**        | Staff selects "Edit Trip" function on a trip from trips list.                                                                                                     |
| **Pre-condition**  | Staff must be authenticated with staff role. Trip must exist and be in editable state (not canceled or completed). Trip must not have departure date in the past. |
| **Post-condition** | Trip information is updated in database with new values. Staff views updated trip details in the trips list or detail view with success confirmation.             |

###### Sequence Flow

[sequence-manage-trips-edit-trip](../sequence/manage-trips/edit-trip)

###### Activities Flow

[activity-manage-trips-edit-trip](../activity/manage-trips/edit-trip)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR153   | **Querying Rules:** When staff selects "Edit Trip" at step (1), system queries trip data at step (2) with SQL: "SELECT t.\*, r.route_name FROM Trip t JOIN Route r ON t.route_id = r.route_id WHERE t.trip_id = [id]". If COUNT = 0 → display "Trip not found" (Refer to MSG 82), end use case. If t.status IN ('Canceled', 'Completed') OR t.departure_date < NOW() → display "Cannot edit: Trip is not editable" (Refer to MSG 82) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Trip" and "Route" tables in "DB Sheet" file) |
| (3)               | BR154   | **Displaying Rules:** System displays "Edit Trip" form at step (3) containing: [lblRoute] showing route name (read-only), [datePickerDeparture], [datePickerReturn], [numericUpDownPrice], [numericUpDownSeats], [txtBoxPickupLocation], [dropdownStatus], [btnSave], [btnCancel]. All fields are pre-filled with existing trip data queried at step (2). (Refer to "Edit Trip Form" view in "View Description" file)                                                                                                                                                             |
| (6)               | BR155   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if [datePickerDeparture].Value <= NOW() → error; if [datePickerReturn].Value <= [datePickerDeparture].Value → error; if [numericUpDownPrice].Value <= 0 → error; if [numericUpDownSeats].Value < [current_booked_seats] → error "Cannot reduce seats below booked seats count"; if [txtBoxPickupLocation].isEmpty() = true → error. If any validation fails → display error (Refer to MSG 83), return to step (4). Else proceed to step (7).                          |
| (7)               | BR156   | **Querying Rules:** System updates trip at step (7) with SQL: "UPDATE Trip SET departure_date = [dep_date], return_date = [ret_date], price = [price], total_seats = [seats], pickup_location = [pickup], status = [status], updated_at = NOW() WHERE trip_id = [id]". (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                 |
| (8), (9), (10)    | BR157   | **Displaying Rules:** System displays success message "Trip updated successfully!" (Refer to MSG 84) at step (8), reloads trips list at step (9). Staff views updated trip at step (10), confirms end.                                                                                                                                                                                                                                                                                                                                                                            |

##### 2.1.9.4 Delete Trip

###### Use Case Description

| Name               | Delete Trip                                                                                                                                                                                                            |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to remove a trip from the system. If trip has pending/confirmed bookings, system suggests canceling the trip instead. Otherwise, performs hard delete of the trip record.                   |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                                              |
| **Trigger**        | Staff clicks "Delete" button on a trip in trips list.                                                                                                                                                                  |
| **Pre-condition**  | Staff must be authenticated with staff role. Trip must exist.                                                                                                                                                          |
| **Post-condition** | If no bookings: trip record is permanently deleted from database. If has bookings: trip status is set to CANCELED and all related bookings are canceled. Staff views updated trips list without deleted/canceled trip. |

###### Sequence Flow

[sequence-manage-trips-delete-trip](../sequence/manage-trips/delete-trip)

###### Activities Flow

[activity-manage-trips-delete-trip](../activity/manage-trips/delete-trip)

###### Business Rules

| Activity                              | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------------------------------ | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1)                            | BR158   | **Querying Rules:** When staff clicks [btnDelete] at step (2), system checks related bookings at step (3) with SQL: "SELECT COUNT(\*) as bookings_count, t.route_name FROM Tour_Booking tb JOIN Trip t ON tb.trip_id = t.trip_id WHERE tb.trip_id = [id] AND tb.status IN ('PENDING', 'CONFIRMED') GROUP BY t.route_name". If bookings_count > 0 → display "Cannot delete: Trip has [X] pending/confirmed bookings. Cancel trip instead?" (Refer to MSG 85) at step (3.1) with [btnCancelTrip], [btnClose]. Else proceed to step (4). (Refer to "Tour_Booking" and "Trip" tables in "DB Sheet" file) |
| (3.2), (3.2.1), (3.2.2)               | BR159   | **Choosing Rules:** At step (3.2), if staff clicks [btnClose] at step (3.2.1) → close dialog at step (3.2.2), end use case. If staff clicks [btnCancelTrip] → proceed to step (3.3).                                                                                                                                                                                                                                                                                                                                                                                                                 |
| (3.3)                                 | BR160   | **Querying Rules:** System updates trip status at step (3.3) with SQL: "UPDATE Trip SET status = 'Canceled', updated_at = NOW() WHERE trip_id = [id]". (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                    |
| (3.4), (3.5), (3.6)                   | BR161   | **Displaying Rules:** System displays success message "Trip has been canceled!" (Refer to MSG 86) at step (3.4), reloads trips list at step (3.5). Staff views updated list with trip canceled at step (3.6), confirms end use case.                                                                                                                                                                                                                                                                                                                                                                 |
| (4)                                   | BR162   | **Displaying Rules:** System displays confirmation dialog at step (4): "Delete trip to '[route_name]' on [departure_date]? This action cannot be undone." with [btnConfirm], [btnCancel].                                                                                                                                                                                                                                                                                                                                                                                                            |
| (5), (5.1), (5.2), (6), (7), (8), (9) | BR163   | **Choosing/Querying Rules:** At step (5), if staff clicks [btnCancel] at step (5.1) → close dialog at step (5.2), end use case. If staff clicks [btnConfirm] → system deletes in transaction at step (6) with SQL: "DELETE FROM Trip WHERE trip_id = [id]". Displays success message "Trip deleted successfully!" (Refer to MSG 87) at step (7), reloads list at step (8). Staff views updated list at step (9), confirms end. (Refer to "Trip" table in "DB Sheet" file)                                                                                                                            |

##### 2.1.9.5 Add New Booking for Trip

###### Use Case Description

| Name               | Add New Booking for Trip                                                                                                                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows staff to create a new booking for a specific trip on behalf of a customer, including customer selection, traveler details entry, and invoice generation.               |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                   |
| **Trigger**        | Staff clicks "Add Booking" button on a trip detail page.                                                                                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Trip must exist and be in valid state (Scheduled status, future departure date). Trip must have available seats.                               |
| **Post-condition** | New booking is created with status CONFIRMED. Invoice is generated. Trip's booked_seats count is updated. Staff views booking details or returns to trip details with success confirmation. |

###### Sequence Flow

[sequence-manage-trips-add-new-booking-for-trip](../sequence/manage-trips/add-new-booking-for-trip)

###### Activities Flow

[activity-manage-trips-add-new-booking-for-trip](../activity/manage-trips/add-new-booking-for-trip)

###### Business Rules

| Activity      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3)           | BR164   | **Displaying Rules:** System displays "Add Booking" form at step (3) containing: [txtBoxSearchCustomer] with autocomplete for customer search, [lblSelectedCustomer] showing selected customer info, [numericUpDownAdults] for number of adults (default 1), [numericUpDownChildren] for number of children (default 0), [txtAreaTravelers] for traveler names (one per line), [dropdownPaymentMethod] with payment options, [btnSave], [btnCancel]. (Refer to "Add Booking Form" view in "View Description" file)                                                                                                                                                                                                                                  |
| (7), (8), (9) | BR165   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-9), system validates at step (7): checks trip status with SQL "SELECT status, departure_date, total_seats, booked_seats FROM Trip WHERE trip_id = [id]". If status != 'Scheduled' OR departure_date <= NOW() → error "Trip is not available for booking" (Refer to MSG 88). At step (8), validates customer with SQL "SELECT status FROM User WHERE user_id = [customer_id]". If status = 'Locked' → error "Customer account is locked". At step (9), if ([adults] + [children]) > (total_seats - booked_seats) → error "Not enough seats available". If any validation fails → return to step (4). Else proceed to step (10).                                            |
| (10)          | BR166   | **Displaying Rules:** System calculates and displays booking confirmation dialog at step (10): "Confirm booking for [customer_name]? Total: [adults] adults + [children] children = [total_price] VND. Payment: [method]" with [btnConfirm], [btnCancel].                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| (12)          | BR167   | **Querying Rules:** System begins transaction and locks trip row at step (12) with SQL: "SELECT trip_id, total_seats, booked_seats FROM Trip WHERE trip_id = [id] FOR UPDATE". This prevents concurrent booking conflicts. (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| (13)          | BR168   | **Querying Rules:** System creates booking records at step (13) with SQL: "INSERT INTO Tour_Booking (trip_id, customer_id, no_adults, no_children, total_amount, status, booking_date, created_by) VALUES ([trip_id], [customer_id], [adults], [children], [total_price], 'CONFIRMED', NOW(), [staff_id])". Creates traveler details with SQL: "INSERT INTO Tour_Booking_Detail (booking_id, traveler_name, traveler_age, traveler_type) VALUES ..." for each traveler line. Creates invoice with SQL: "INSERT INTO Invoice (booking_id, total_amount, payment_method, payment_status, issued_date) VALUES ([booking_id], [total], [method], 'PAID', NOW())". (Refer to "Tour_Booking", "Tour_Booking_Detail", "Invoice" tables in "DB Sheet" file) |
| (14)          | BR169   | **Querying Rules:** System updates trip seats at step (14) with SQL: "UPDATE Trip SET booked_seats = booked_seats + [adults] + [children], updated_at = NOW() WHERE trip_id = [id]". Commits transaction successfully. (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| (15), (16)    | BR170   | **Displaying Rules:** System displays success message "Booking created successfully! Booking ID: [booking_id]" (Refer to MSG 89) at step (15). Staff views booking details or trip details at step (16), confirms end.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |

##### 2.1.9.6 View and Filter Trips

###### Use Case Description

| Name               | View and Filter Trips                                                                                                                                                            |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view all trips in the system and filter them by various criteria such as route, departure date range, status, and available seats.                 |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                        |
| **Trigger**        | Staff selects "View Trips" function in trips management module.                                                                                                                  |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to trips management module.                                                                                  |
| **Post-condition** | Staff views trips list with optional filters applied. Can repeat filter operation multiple times. List shows trip cards with route info, dates, pricing, and seats availability. |

###### Sequence Flow

[sequence-manage-trips-view-and-filter-trips](../sequence/manage-trips/view-and-filter-trips)

###### Activities Flow

[activity-manage-trips-view-and-filter-trips](../activity/manage-trips/view-and-filter-trips)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2), (2.1), (2.2) | BR171   | **Querying Rules:** When staff selects "View Trips" at step (1), system queries all trips at step (2) with SQL: "SELECT t.trip_id, t.departure_date, t.return_date, t.price, t.total_seats, t.booked_seats, t.pickup_location, t.status, r.route_id, r.route_name, r.start_location, r.end_location FROM Trip t JOIN Route r ON t.route_id = r.route_id ORDER BY t.departure_date ASC". If COUNT = 0 → display "No trips found" (Refer to MSG 90) at step (2.1), staff confirms at step (2.2), end use case. Else proceed to step (3). (Refer to "Trip" and "Route" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                      |
| (3)               | BR172   | **Displaying Rules:** System displays "Trips List" view at step (3) containing: filter panel with [dropdownFilterRoute] populated with all routes, [datePickerFromDate] for departure date start, [datePickerToDate] for departure date end, [dropdownFilterStatus] with status options, [checkboxAvailableOnly] for filtering trips with available seats, [btnApplyFilter]; and trips grid displaying [cardTrip] for each trip showing [lblRouteName], [lblStartEnd], [lblDepartureDate], [lblReturnDate], [lblPrice], seats indicator "[booked]/[total] seats", [lblStatus], and action buttons [btnView], [btnEdit], [btnDelete], [btnAddBooking]. (Refer to "Trips List" view in "View Description" file)                                                                                                                                                                                                       |
| (6), (6.1)        | BR173   | **Querying Rules:** When staff clicks [btnApplyFilter] in repeat loop (steps 4-6), system validates and applies filters at step (6). If [datePickerFromDate] > [datePickerToDate] → error "Invalid date range". Builds dynamic SQL: "SELECT t.trip_id, t.departure_date, t.return_date, t.price, t.total_seats, t.booked_seats, t.pickup_location, t.status, r.route_id, r.route_name, r.start_location, r.end_location FROM Trip t JOIN Route r ON t.route_id = r.route_id WHERE (r.route_id = [route] OR [route] = null) AND (t.departure_date >= [from_date] OR [from_date] = null) AND (t.departure_date <= [to_date] OR [to_date] = null) AND (t.status = [status] OR [status] = null) AND ([available_only] = false OR t.booked_seats < t.total_seats) ORDER BY t.departure_date ASC". If COUNT = 0 → display "No trips match the filter criteria" (Refer to MSG 91) at step (6.1). Else proceed to step (7). |
| (7), (8)          | BR174   | **Displaying Rules:** System updates trips grid at step (7) with filtered results, displays result count "[filtered_count] of [total_count] trips" below filter panel. Staff views filtered list at step (8), can repeat filter operation or confirm end use case.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

#### 2.1.10 Adjust and Track Bookings Use Case

##### 2.1.10.1 Add New Booking

###### Use Case Description

| Name               | Add New Booking                                                                                                                                                                          |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to create a new booking by selecting a customer and trip, entering traveler details, and generating an invoice.                                               |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                |
| **Trigger**        | Staff selects "Add New Booking" function in bookings management page.                                                                                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. At least one customer and one scheduled trip must exist in the system.                                                                      |
| **Post-condition** | New booking is created with status CONFIRMED. Invoice is generated. Trip's booked_seats count is updated. Staff is redirected to booking details view showing the newly created booking. |

###### Sequence Flow

[sequence-adjust-and-track-bookings-add-new-booking](../sequence/adjust-and-track-bookings/add-new-booking)

###### Activities Flow

[activity-adjust-and-track-bookings-add-new-booking](../activity/adjust-and-track-bookings/add-new-booking)

###### Business Rules

| Activity        | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2)             | BR175   | **Displaying Rules:** System displays "Add New Booking" form at step (2) containing: [txtBoxSearchCustomer] with autocomplete, [lblSelectedCustomer], [dropdownSelectTrip] with available trips, [numericUpDownAdults] (default 1), [numericUpDownChildren] (default 0), [txtAreaTravelers], [dropdownPaymentMethod], [btnSave], [btnCancel]. (Refer to "Add Booking Form" view in "View Description" file)                                                                                                                                                                                                                                                                                                                                 |
| (7)             | BR176   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 3-7), system validates at step (7): if [lblSelectedCustomer] empty OR [dropdownSelectTrip].SelectedValue = null → error. Queries trip: "SELECT status, departure_date, total_seats, booked_seats FROM Trip WHERE trip_id = [id]". If status != 'Scheduled' OR departure_date <= NOW() → error (Refer to MSG 92). Queries customer: "SELECT status FROM User WHERE user_id = [customer_id]". If status = 'Locked' → error (Refer to MSG 93). If ([adults] + [children]) > (total_seats - booked_seats) OR [txtAreaTravelers].lineCount != ([adults] + [children]) → error (Refer to MSG 94). If any validation fails → return to step (3). Else proceed to step (8). |
| (8)             | BR177   | **Querying Rules:** System begins transaction and locks trip at step (8) with SQL: "SELECT \* FROM Trip WHERE trip_id = [id] FOR UPDATE". (Refer to "Trip" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| (8)             | BR178   | **Querying Rules:** System creates booking at step (8): "INSERT INTO Tour_Booking (...) VALUES (...)". Creates travelers: "INSERT INTO Tour_Booking_Detail (booking_id, traveler_name) VALUES ..." for each line. Creates invoice: "INSERT INTO Invoice (...) VALUES (...)". Updates seats: "UPDATE Trip SET booked_seats = booked_seats + [adults] + [children] WHERE trip_id = [id]". Commits transaction. (Refer to "Tour_Booking", "Tour_Booking_Detail", "Invoice", "Trip" tables in "DB Sheet" file)                                                                                                                                                                                                                                  |
| (9), (10), (11) | BR179   | **Displaying Rules:** System displays success "Booking created successfully! Booking ID: [booking_id]" (Refer to MSG 95) at step (9), redirects to details at step (10). Staff confirms end at step (11).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

##### 2.1.10.2 View and Filter Bookings

###### Use Case Description

| Name               | View and Filter Bookings                                                                                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view all bookings in the system and filter them by various criteria such as customer name, trip, booking status, and booking date range.              |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                           |
| **Trigger**        | Staff selects "View Bookings" function in bookings management module.                                                                                                               |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to bookings management module.                                                                                  |
| **Post-condition** | Staff views bookings list with optional filters applied. Can repeat filter operation multiple times. List shows booking cards with customer info, trip details, and payment status. |

###### Sequence Flow

[sequence-adjust-and-track-bookings-view-and-filter-bookings](../sequence/adjust-and-track-bookings/view-and-filter-bookings)

###### Activities Flow

[activity-adjust-and-track-bookings-view-and-filter-bookings](../activity/adjust-and-track-bookings/view-and-filter-bookings)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR180   | **Querying Rules:** When staff selects "View Bookings" at step (1), system queries at step (2) with SQL: "SELECT tb.\*, u.full_name, u.email, t.departure_date, r.route_name, i.payment_status FROM Tour_Booking tb JOIN User u, Trip t, Route r LEFT JOIN Invoice i ... ORDER BY tb.booking_date DESC". If COUNT = 0 → display "No bookings found" (Refer to MSG 96) at step (2.1), end use case. Else proceed to step (3). (Refer to "Tour_Booking", "User", "Trip", "Route", "Invoice" tables in "DB Sheet" file) |
| (3)               | BR181   | **Displaying Rules:** System displays "Bookings List" view at step (3) containing: filter panel with [txtBoxSearchCustomer], [dropdownFilterTrip], [dropdownFilterStatus] (PENDING, CONFIRMED, CANCELED, COMPLETED), [datePickerFromDate], [datePickerToDate], [btnApplyFilter]; and bookings grid with [cardBooking] showing booking ID, customer, route, dates, passengers, amount, status, action buttons. (Refer to "Bookings List" view in "View Description" file)                                             |
| (6), (6.1)        | BR182   | **Querying Rules:** When staff clicks [btnApplyFilter] in repeat loop (steps 4-6), system validates at step (6). If [datePickerFromDate] > [datePickerToDate] → error. Builds dynamic SQL with WHERE (u.full_name LIKE '%[name]%' OR u.email LIKE '%[name]%') AND (t.trip_id = [trip] OR [trip] = null) AND (tb.status = [status] OR [status] = null) AND date range filters. If COUNT = 0 → display "No bookings match the filter criteria" (Refer to MSG 97) at step (6.1). Else proceed to step (7).              |
| (7), (8)          | BR183   | **Displaying Rules:** System updates grid at step (7) with filtered results, displays "[filtered_count] of [total_count] bookings". Staff can repeat or confirm end at step (8).                                                                                                                                                                                                                                                                                                                                     |

##### 2.1.10.3 View Booking Details

###### Use Case Description

| Name               | View Booking Details                                                                                                                                                                         |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view detailed information of a specific booking including customer info, trip details, travelers list, and invoice summary.                                    |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                    |
| **Trigger**        | Staff clicks on a booking from the bookings list.                                                                                                                                            |
| **Pre-condition**  | Staff must be authenticated with staff role. Booking must exist in database.                                                                                                                 |
| **Post-condition** | Staff views complete booking details including customer information, trip schedule, list of travelers, payment status, and available action buttons based on booking status and cutoff date. |

###### Sequence Flow

[sequence-adjust-and-track-bookings-view-booking-details](../sequence/adjust-and-track-bookings/view-booking-details)

###### Activities Flow

[activity-adjust-and-track-bookings-view-booking-details](../activity/adjust-and-track-bookings/view-booking-details)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2), (2.1), (2.2) | BR184   | **Querying Rules:** When staff selects booking at step (1), system queries at step (2) with SQL: "SELECT tb.\*, u.full_name, u.email, u.phone, t.\*, r.\* FROM Tour_Booking tb JOIN User u, Trip t, Route r WHERE tb.booking_id = [id]". If COUNT = 0 → display "Booking not found" (Refer to MSG 98) at step (2.1), end use case. Else proceed to step (3). (Refer to "Tour_Booking", "User", "Trip", "Route" tables in "DB Sheet" file)                                                                                                   |
| (3)               | BR185   | **Querying Rules:** System queries travelers at step (3) with SQL: "SELECT traveler_name FROM Tour_Booking_Detail WHERE booking_id = [id] ORDER BY detail_id". (Refer to "Tour_Booking_Detail" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                    |
| (4)               | BR186   | **Querying Rules:** System queries invoice at step (4) with SQL: "SELECT \* FROM Invoice WHERE booking_id = [id]". (Refer to "Invoice" table in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                                                            |
| (5), (6), (7)     | BR187   | **Displaying Rules:** System displays "Booking Detail" view at steps (5-7) with panels: booking info ([lblBookingId], [lblBookingDate], [lblBookingStatus]); customer info ([lblCustomerName], [lblEmail], [lblPhone]); trip info (route, dates, pickup); passengers ([lblAdultsCount], [lblChildrenCount], [listTravelers]); invoice ([lblTotalAmount], [lblPaymentMethod], [lblPaymentStatus], [btnViewInvoice]); action buttons based on status. Staff confirms at step (7). (Refer to "Booking Detail" view in "View Description" file) |

##### 2.1.10.4 View Booking's Invoice

###### Use Case Description

| Name               | View Booking's Invoice                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view the invoice details associated with a specific booking.                        |
| **Actor**          | Staff (must be signed in with staff role)                                                                         |
| **Trigger**        | Staff clicks "View Invoice" button from booking details page.                                                     |
| **Pre-condition**  | Staff must be authenticated with staff role. Booking must exist. Invoice must be generated for the booking.       |
| **Post-condition** | Staff views complete invoice information including total amount, payment method, payment status, and issued date. |

###### Sequence Flow

[sequence-adjust-and-track-bookings-view-booking's-invoice](../sequence/adjust-and-track-bookings/view-booking's-invoice)

###### Activities Flow

[activity-adjust-and-track-bookings-view-booking's-invoice](../activity/adjust-and-track-bookings/view-booking's-invoice)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR188   | **Querying Rules:** When staff clicks "View Invoice" at step (1), system queries at step (2) with SQL: "SELECT i.\*, tb.booking_id, u.full_name FROM Invoice i JOIN Tour_Booking tb, User u WHERE i.booking_id = [booking_id]". If COUNT = 0 → display "Invoice not found" (Refer to MSG 99) at step (2.1), end use case. Else proceed to step (3). (Refer to "Invoice", "Tour_Booking", "User" tables in "DB Sheet" file) |
| (3), (4), (5)     | BR189   | **Displaying Rules:** System displays "Invoice Detail" view at steps (3-5) with [lblInvoiceId], [lblBookingId], [lblCustomerName], [lblTotalAmount], [lblPaymentMethod], [lblPaymentStatus] color-coded (green=PAID, yellow=PENDING, red=FAILED), [btnPrint]. Staff confirms at step (5). (Refer to "Invoice Detail" view in "View Description" file)                                                                      |

##### 2.1.10.5 Edit Pre-departure Booking

###### Use Case Description

| Name               | Edit Pre-departure Booking                                                                                                                                                                                                                              |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows staff to modify booking information including number of passengers and traveler names for bookings that have not yet departed and are within the editable cutoff period.                                                           |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                                                                               |
| **Trigger**        | Staff selects "Edit Booking" function on a booking from bookings list or booking details.                                                                                                                                                               |
| **Pre-condition**  | Staff must be authenticated with staff role. Booking must exist and be in PENDING or CONFIRMED status. Trip departure date must be at least 7 days in the future (cutoff period). Invoice payment status must not be PAID (or allow refund processing). |
| **Post-condition** | Booking information is updated with new passenger counts and traveler names. Trip's booked_seats count is adjusted (increased or decreased). Invoice total amount is recalculated. Staff views updated booking details with success confirmation.       |

###### Sequence Flow

[sequence-adjust-and-track-bookings-edit-pre-departure-booking](../sequence/adjust-and-track-bookings/edit-pre-departure-booking)

###### Activities Flow

[activity-adjust-and-track-bookings-edit-pre-departure-booking](../activity/adjust-and-track-bookings/edit-pre-departure-booking)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :------ | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR190   | **Querying Rules:** When staff selects "Edit Booking" at step (1), system queries at step (2) with SQL: "SELECT tb.\*, t.departure_date, t.total_seats, t.booked_seats FROM Tour_Booking tb JOIN Trip t, Invoice i WHERE tb.booking_id = [id]". If COUNT = 0 → display "Booking not found" (Refer to MSG 100), end. Calculates cutoff as departure_date - 7 days. If tb.status NOT IN ('PENDING', 'CONFIRMED') OR NOW() > cutoff → display "Cannot edit" with reason (Refer to MSG 100) at step (2.1), end use case. Else proceed to step (3). (Refer to "Tour_Booking", "Trip" tables in "DB Sheet" file) |
| (3)               | BR191   | **Displaying Rules:** System displays "Edit Booking" form at step (3) with [lblBookingId] (read-only), [lblTripInfo] (read-only), [numericUpDownAdults] pre-filled (min 1), [numericUpDownChildren] pre-filled (min 0), [txtAreaTravelers] pre-filled, [lblCurrentTotal], [btnSave], [btnCancel]. (Refer to "Edit Booking Form" view in "View Description" file)                                                                                                                                                                                                                                           |
| (6)               | BR192   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if [numericUpDownAdults] < 1 → error. Calculates delta_seats = (new_adults + new_children) - (old_adults + old_children). If delta_seats > 0 AND delta_seats > available_seats → error (Refer to MSG 101). If [txtAreaTravelers].lineCount != (new_adults + new_children) → error. If any fails → return to step (4). Else proceed to step (7).                                                                                                                                                |
| (7)               | BR193   | **Querying Rules:** System begins transaction and locks at step (7) with SQL: "SELECT \* FROM Tour_Booking WHERE booking_id = [id] FOR UPDATE" and "SELECT \* FROM Trip WHERE trip_id = [trip_id] FOR UPDATE". (Refer to "Tour_Booking", "Trip" tables in "DB Sheet" file)                                                                                                                                                                                                                                                                                                                                 |
| (7)               | BR194   | **Querying Rules:** System updates at step (7): "UPDATE Tour_Booking SET no_adults = [new], no_children = [new], total_amount = [new_total] WHERE booking_id = [id]". Deletes travelers: "DELETE FROM Tour_Booking_Detail WHERE booking_id = [id]". Inserts new: "INSERT INTO Tour_Booking_Detail ..." for each. Updates seats: "UPDATE Trip SET booked_seats = booked_seats + [delta_seats] WHERE trip_id = [trip_id]". Updates invoice: "UPDATE Invoice SET total_amount = [new_total] WHERE booking_id = [id]". Commits. (Refer to tables in "DB Sheet" file)                                           |
| (8), (9), (10)    | BR195   | **Displaying Rules:** System displays success "Booking updated successfully!" (Refer to MSG 102) at step (8), reloads at step (9). Staff confirms end at step (10).                                                                                                                                                                                                                                                                                                                                                                                                                                        |

##### 2.1.10.6 Delete Booking

###### Use Case Description

| Name               | Delete Booking                                                                                                                                                                                         |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to delete a booking from the system. Booking can only be deleted if it's within the cancellation cutoff period and payment hasn't been processed, or if refund is approved. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                                                              |
| **Trigger**        | Staff clicks "Delete" button on a booking in bookings list or booking details.                                                                                                                         |
| **Pre-condition**  | Staff must be authenticated with staff role. Booking must exist. Booking status must be PENDING or CONFIRMED. Trip departure date must be at least 7 days in the future (cutoff period).               |
| **Post-condition** | Booking and related records (travelers, invoice) are permanently deleted from database. Trip's booked_seats count is decreased. Staff views updated bookings list without deleted booking.             |

###### Sequence Flow

[sequence-adjust-and-track-bookings-delete-booking](../sequence/adjust-and-track-bookings/delete-booking)

###### Activities Flow

[activity-adjust-and-track-bookings-delete-booking](../activity/adjust-and-track-bookings/delete-booking)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2) | BR196   | **Querying Rules:** When staff clicks [btnDelete] at step (2), system verifies at step (3) with SQL: "SELECT tb.\*, t.departure_date, r.route_name FROM Tour_Booking tb JOIN Trip t, Route r WHERE tb.booking_id = [id]". Calculates cutoff as departure_date - 7 days. If tb.status NOT IN ('PENDING', 'CONFIRMED') OR NOW() > cutoff → display "Cannot delete" with reason (Refer to MSG 103) at step (3.1), end use case. Else proceed to step (4). (Refer to "Tour_Booking", "Trip", "Route" tables in "DB Sheet" file) |
| (4)               | BR197   | **Displaying Rules:** System displays confirmation at step (4): "Delete booking #[booking_id] for [route_name] on [departure_date]? This will free [adults + children] seats. Cannot be undone." with [btnConfirm], [btnCancel].                                                                                                                                                                                                                                                                                            |
| (5), (5.1), (5.2) | BR198   | **Choosing Rules:** At step (5), if [btnCancel] at step (5.1) → close at step (5.2), end. If [btnConfirm] → proceed to step (6).                                                                                                                                                                                                                                                                                                                                                                                            |
| (6)               | BR199   | **Querying Rules:** System deletes in transaction at step (6): "UPDATE Trip SET booked_seats = booked_seats - [total] WHERE trip_id = [trip_id]". "DELETE FROM Tour_Booking_Detail WHERE booking_id = [id]". "DELETE FROM Invoice WHERE booking_id = [id]". "DELETE FROM Tour_Booking WHERE booking_id = [id]". Commits. (Refer to "Trip", "Tour_Booking_Detail", "Invoice", "Tour_Booking" tables in "DB Sheet" file)                                                                                                      |
| (7), (8), (9)     | BR200   | **Displaying Rules:** System displays success "Booking deleted successfully!" (Refer to MSG 104) at step (7), redirects to list at step (8). Staff confirms end at step (9).                                                                                                                                                                                                                                                                                                                                                |

#### 2.1.11 Adjust Customers Use Case

##### 2.1.11.1 Add New Customer

###### Use Case Description

| Name               | Add New Customer                                                                                                                                                    |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows staff to create new customer accounts by entering customer information and generating login credentials.                                       |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                           |
| **Trigger**        | Staff selects "Add New Customer" function in customers management page.                                                                                             |
| **Pre-condition**  | Staff must be authenticated with staff role. Staff must have access to customers management module.                                                                 |
| **Post-condition** | New customer account is created with role CUSTOMER. Empty cart is created for customer. Welcome email is sent with login credentials. Staff views customer details. |

###### Sequence Flow

[sequence-adjust-customers-add-new-customer](../sequence/adjust-customers/add-new-customer)

###### Activities Flow

[activity-adjust-customers-add-new-customer](../activity/adjust-customers/add-new-customer)

###### Business Rules

| Activity      | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| :------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)           | BR201   | **Displaying Rules:** System displays "Add New Customer" form at step (2) with [txtBoxUsername], [txtBoxPassword], [txtBoxFullName], [txtBoxEmail], [txtBoxPhone], [txtAreaAddress], [datePickerBirthday], [dropdownGender], [btnSave], [btnCancel]. (Refer to "Add Customer Form" view in "View Description" file)                                                                                                                                                                  |
| (5)           | BR202   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 3-5), system validates at step (5): if username.length < 3 OR password.length < 6 OR email invalid format OR phone invalid format → error. Checks unique: "SELECT COUNT(\*) FROM User WHERE username = [username] OR email = [email]". If duplicate found → error (Refer to MSG 105). Else proceed to step (6).                                                                                              |
| (6)           | BR203   | **Querying Rules:** System creates customer in transaction at step (6): "INSERT INTO User (username, password, full_name, email, phone, address, birthday, gender, role, status, created_at) VALUES ([username], HASH([password]), [full_name], [email], [phone], [address], [birthday], [gender], 'CUSTOMER', 'Active', NOW())". Creates cart: "INSERT INTO Cart (customer_id, created_at) VALUES ([user_id], NOW())". Commits. (Refer to "User", "Cart" tables in "DB Sheet" file) |
| (7), (8), (9) | BR204   | **Displaying Rules:** System sends welcome email with credentials at step (7), displays success "Customer created successfully!" (Refer to MSG 106), redirects to details at step (8). Staff confirms end at step (9).                                                                                                                                                                                                                                                               |

##### 2.1.11.2 View and Filter Customers

###### Use Case Description

| Name               | View and Filter Customers                                                                                                                                        |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view all customers with statistics and filter them by various criteria.                                                            |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                        |
| **Trigger**        | Staff selects "View Customers" function in customers management module.                                                                                          |
| **Pre-condition**  | Staff must be authenticated with staff role.                                                                                                                     |
| **Post-condition** | Staff views customers list with booking statistics. Can filter by name, email, status, registration date. List shows customer cards with contact info and stats. |

###### Sequence Flow

[sequence-adjust-customers-view-and-filter-customers](../sequence/adjust-customers/view-and-filter-customers)

###### Activities Flow

[activity-adjust-customers-view-and-filter-customers](../activity/adjust-customers/view-and-filter-customers)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR205   | **Querying Rules:** When staff selects "View Customers" at step (1), system queries at step (2) with SQL: "SELECT u.\*, COUNT(tb.booking_id) as total_bookings, SUM(tb.total_amount) as total_spent FROM User u LEFT JOIN Tour_Booking tb ON u.user_id = tb.customer_id WHERE u.role = 'CUSTOMER' GROUP BY u.user_id ORDER BY u.created_at DESC". If COUNT = 0 → display "No customers found" (Refer to MSG 107) at step (2.1), end. Else proceed to step (3). (Refer to "User", "Tour_Booking" tables in "DB Sheet" file) |
| (3)               | BR206   | **Displaying Rules:** System displays "Customers List" view at step (3) with filter panel: [txtBoxSearchName], [txtBoxSearchEmail], [dropdownFilterStatus] (Active, Locked), [datePickerFromDate], [datePickerToDate], [btnApplyFilter]; and grid with [cardCustomer] showing customer info, total bookings, total spent, action buttons. (Refer to "Customers List" view in "View Description" file)                                                                                                                      |
| (6), (6.1)        | BR207   | **Querying Rules:** When staff clicks [btnApplyFilter] in repeat loop (steps 4-6), system validates at step (6). If [datePickerFromDate] > [datePickerToDate] → error. Builds dynamic SQL with WHERE (u.full_name LIKE '%[name]%') AND (u.email LIKE '%[email]%') AND (u.status = [status] OR [status] = null) AND date range. If COUNT = 0 → display "No customers match" (Refer to MSG 108) at step (6.1). Else proceed to step (7).                                                                                     |
| (7), (8)          | BR208   | **Displaying Rules:** System updates grid at step (7) with filtered results, displays "[filtered] of [total] customers". Staff can repeat or confirm end at step (8).                                                                                                                                                                                                                                                                                                                                                      |

##### 2.1.11.3 View Customer Details

###### Use Case Description

| Name               | View Customer Details                                                                                                                                          |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to view comprehensive customer information including personal details, booking statistics, recent bookings, and favorite routes.    |
| **Actor**          | Staff (must be signed in with staff role)                                                                                                                      |
| **Trigger**        | Staff clicks on a customer from customers list.                                                                                                                |
| **Pre-condition**  | Staff must be authenticated with staff role. Customer must exist.                                                                                              |
| **Post-condition** | Staff views complete customer profile with statistics, recent bookings history, favorite routes list, and available action buttons for edit/delete operations. |

###### Sequence Flow

[sequence-adjust-customers-view-customer-details](../sequence/adjust-customers/view-customer-details)

###### Activities Flow

[activity-adjust-customers-view-customer-details](../activity/adjust-customers/view-customer-details)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2), (2.1), (2.2) | BR209   | **Querying Rules:** When staff selects customer at step (1), system queries at step (2) with SQL: "SELECT \* FROM User WHERE user_id = [id] AND role = 'CUSTOMER'". If COUNT = 0 → display "Customer not found" (Refer to MSG 109) at step (2.1), end. Else proceed to step (3). (Refer to "User" table in "DB Sheet" file)                                                                                         |
| (3)               | BR210   | **Querying Rules:** System queries booking stats at step (3) with SQL: "SELECT COUNT(\*) as total_bookings, SUM(total_amount) as total_spent, MAX(booking_date) as last_booking FROM Tour_Booking WHERE customer_id = [id]". (Refer to "Tour_Booking" table in "DB Sheet" file)                                                                                                                                     |
| (4)               | BR211   | **Querying Rules:** System queries recent bookings at step (4) with SQL: "SELECT tb.\*, t.departure_date, r.route_name FROM Tour_Booking tb JOIN Trip t, Route r WHERE tb.customer_id = [id] ORDER BY tb.booking_date DESC LIMIT 5". (Refer to "Tour_Booking", "Trip", "Route" tables in "DB Sheet" file)                                                                                                           |
| (5)               | BR212   | **Querying Rules:** System queries favorites at step (5) with SQL: "SELECT r.\* FROM Favorite_Tour ft JOIN Route r ON ft.route_id = r.route_id WHERE ft.customer_id = [id]". (Refer to "Favorite_Tour", "Route" tables in "DB Sheet" file)                                                                                                                                                                          |
| (6), (7), (8)     | BR213   | **Displaying Rules:** System displays "Customer Detail" view at steps (6-8) with panels: personal info ([lblFullName], [lblEmail], [lblPhone], [lblAddress], [lblStatus]); statistics (total bookings, total spent, last booking date); recent bookings list; favorite routes list; action buttons [btnEdit], [btnDelete]. Staff confirms at step (8). (Refer to "Customer Detail" view in "View Description" file) |

##### 2.1.11.4 Edit Customer

###### Use Case Description

| Name               | Edit Customer                                                                                            |
| :----------------- | :------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to modify customer information including personal details and account status. |
| **Actor**          | Staff (must be signed in with staff role)                                                                |
| **Trigger**        | Staff selects "Edit Customer" function on a customer.                                                    |
| **Pre-condition**  | Staff must be authenticated with staff role. Customer must exist.                                        |
| **Post-condition** | Customer information is updated. Staff views updated customer details with success confirmation.         |

###### Sequence Flow

[sequence-adjust-customers-edit-customer](../sequence/adjust-customers/edit-customer)

###### Activities Flow

[activity-adjust-customers-edit-customer](../activity/adjust-customers/edit-customer)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                 |
| :---------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR214   | **Querying Rules:** When staff selects "Edit Customer" at step (1), system queries at step (2) with SQL: "SELECT \* FROM User WHERE user_id = [id] AND role = 'CUSTOMER'". If COUNT = 0 → display "Customer not found" (Refer to MSG 110), end. Else proceed to step (3). (Refer to "User" table in "DB Sheet" file)                                        |
| (3)               | BR215   | **Displaying Rules:** System displays "Edit Customer" form at step (3) with [lblUsername] (read-only), [txtBoxFullName], [txtBoxEmail], [txtBoxPhone], [txtAreaAddress], [datePickerBirthday], [dropdownGender], [dropdownStatus] (Active, Locked), [btnSave], [btnCancel], all pre-filled. (Refer to "Edit Customer Form" view in "View Description" file) |
| (6)               | BR216   | **Validation Rules:** When staff clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if email invalid format OR phone invalid format → error. Checks unique: "SELECT COUNT(\*) FROM User WHERE email = [email] AND user_id != [current_id]". If duplicate → error (Refer to MSG 111). Else proceed to step (7).                      |
| (7)               | BR217   | **Querying Rules:** System updates at step (7) with SQL: "UPDATE User SET full_name = [name], email = [email], phone = [phone], address = [address], birthday = [birthday], gender = [gender], status = [status], updated_at = NOW() WHERE user_id = [id]". (Refer to "User" table in "DB Sheet" file)                                                      |
| (8), (9), (10)    | BR218   | **Displaying Rules:** System displays success "Customer updated successfully!" (Refer to MSG 112) at step (8), reloads details at step (9). Staff confirms end at step (10).                                                                                                                                                                                |

##### 2.1.11.5 Delete Customer

###### Use Case Description

| Name               | Delete Customer                                                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows staff to delete or disable customer accounts. Cannot delete if customer has active bookings or unpaid invoices. |
| **Actor**          | Staff (must be signed in with staff role)                                                                                            |
| **Trigger**        | Staff clicks "Delete" button on a customer.                                                                                          |
| **Pre-condition**  | Staff must be authenticated with staff role. Customer must exist.                                                                    |
| **Post-condition** | Customer account is either disabled (status set to Locked) or permanently deleted. Staff views updated customers list.               |

###### Sequence Flow

[sequence-adjust-customers-delete-customer](../sequence/adjust-customers/delete-customer)

###### Activities Flow

[activity-adjust-customers-delete-customer](../activity/adjust-customers/delete-customer)

###### Business Rules

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :--------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (3), (3.1), (3.2)      | BR219   | **Querying Rules:** When staff clicks [btnDelete] at step (2), system checks at step (3) with SQL: "SELECT COUNT(\*) as active_bookings FROM Tour_Booking WHERE customer_id = [id] AND status IN ('PENDING', 'CONFIRMED')". Checks unpaid: "SELECT COUNT(\*) FROM Invoice i JOIN Tour_Booking tb WHERE tb.customer_id = [id] AND i.payment_status = 'PENDING'". If active_bookings > 0 OR unpaid > 0 → display "Cannot delete: Customer has active bookings or unpaid invoices" (Refer to MSG 113) at step (3.1), end. Else proceed to step (4). (Refer to "Tour_Booking", "Invoice" tables in "DB Sheet" file) |
| (4)                    | BR220   | **Displaying Rules:** System displays confirmation at step (4): "Delete or disable customer '[full_name]'?" with [btnDisable] "Set to LOCKED status", [btnDeletePermanently] "Delete permanently (cannot undo)", [btnCancel].                                                                                                                                                                                                                                                                                                                                                                                   |
| (5), (5.1), (5.2), (6) | BR221   | **Choosing/Querying Rules:** At step (5), if [btnCancel] at step (5.1) → close at step (5.2), end. If [btnDisable] → "UPDATE User SET status = 'Locked' WHERE user_id = [id]" at step (6). If [btnDeletePermanently] → "DELETE FROM Cart WHERE customer_id = [id]" then "DELETE FROM User WHERE user_id = [id]" at step (6). Commits. (Refer to "User", "Cart" tables in "DB Sheet" file)                                                                                                                                                                                                                       |
| (7), (8), (9)          | BR222   | **Displaying Rules:** System displays success message (Refer to MSG 114) at step (7), redirects to list at step (8). Staff confirms end at step (9).                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

#### 2.1.12 Adjust Staffs Use Case

##### 2.1.12.1 Add New Staff

###### Use Case Description

| Name               | Add New Staff                                                                                                                                           |
| :----------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Description**    | This use case allows admin to create new staff accounts with appropriate credentials and permissions.                                                   |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                               |
| **Trigger**        | Admin selects "Add New Staff" function in staff management page.                                                                                        |
| **Pre-condition**  | Admin must be authenticated with admin role. Admin must have access to staff management module.                                                         |
| **Post-condition** | New staff account is created with role STAFF. Empty cart is created for staff. Welcome email is sent with login credentials. Admin views staff details. |

###### Sequence Flow

[sequence-adjust-staffs-add-new-staff](../sequence/adjust-staffs/add-new-staff)

###### Activities Flow

[activity-adjust-staffs-add-new-staff](../activity/adjust-staffs/add-new-staff)

###### Business Rules

| Activity            | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :------------------ | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)                 | BR223   | **Displaying Rules:** System displays "Add New Staff" form at step (2) with [txtBoxUsername], [txtBoxPassword], [txtBoxFullName], [txtBoxEmail], [txtBoxPhone], [txtAreaAddress], [datePickerBirthday], [dropdownGender], [btnSave], [btnCancel]. (Refer to "Add Staff Form" view in "View Description" file)                                                                                                                                                                  |
| (5)                 | BR224   | **Validation Rules:** When admin clicks [btnSave] in repeat loop (steps 3-5), system validates at step (5): if username.length < 3 OR password.length < 8 OR email invalid OR phone invalid OR age < 18 → error. Checks unique: "SELECT COUNT(\*) FROM User WHERE username = [username] OR email = [email]". If duplicate → error (Refer to MSG 115). Else proceed to step (6).                                                                                                |
| (6)                 | BR225   | **Querying Rules:** System creates staff in transaction at step (6): "INSERT INTO User (username, password, full_name, email, phone, address, birthday, gender, role, status, created_at) VALUES ([username], HASH([password]), [full_name], [email], [phone], [address], [birthday], [gender], 'STAFF', 'Active', NOW())". Creates cart: "INSERT INTO Cart (customer_id, created_at) VALUES ([user_id], NOW())". Commits. (Refer to "User", "Cart" tables in "DB Sheet" file) |
| (7), (8), (9), (10) | BR226   | **Displaying Rules:** System sends welcome email at step (7), displays success "Staff created successfully!" (Refer to MSG 116), redirects to details at step (8-9). Admin confirms end at step (10).                                                                                                                                                                                                                                                                          |

##### 2.1.12.2 View and Filter Staffs

###### Use Case Description

| Name               | View and Filter Staffs                                                                                                                               |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to view all staff members with work statistics and filter them by various criteria.                                       |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                            |
| **Trigger**        | Admin selects "Manage Staffs" function in staff management module.                                                                                   |
| **Pre-condition**  | Admin must be authenticated with admin role.                                                                                                         |
| **Post-condition** | Admin views staffs list with work statistics. Can filter by keyword, phone, lock status, gender. List shows staff cards with contact info and stats. |

###### Sequence Flow

[sequence-adjust-staffs-view-and-filter-staffs](../sequence/adjust-staffs/view-and-filter-staffs)

###### Activities Flow

[activity-adjust-staffs-view-and-filter-staffs](../activity/adjust-staffs/view-and-filter-staffs)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| :---------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR227   | **Querying Rules:** When admin selects "Manage Staffs" at step (1), system queries at step (2) with SQL: "SELECT u.\*, COUNT(tb.booking_id) as total_managed_bookings FROM User u LEFT JOIN Tour_Booking tb ON u.user_id = tb.staff_id WHERE u.role = 'STAFF' GROUP BY u.user_id ORDER BY u.created_at DESC". If COUNT = 0 → display "No staffs found" (Refer to MSG 117) at step (2.1) with add button, end. Else proceed to step (3). (Refer to "User", "Tour_Booking" tables in "DB Sheet" file) |
| (3)               | BR228   | **Displaying Rules:** System displays "Staffs List" view at step (3) with filter panel: [txtBoxKeyword], [txtBoxPhone], [checkboxIsLocked], [dropdownGender], [btnApplyFilter]; and grid with [cardStaff] showing staff info, total managed bookings, action buttons. (Refer to "Staffs List" view in "View Description" file)                                                                                                                                                                      |
| (6), (6.1)        | BR229   | **Querying Rules:** When admin clicks [btnApplyFilter] in repeat loop (steps 4-6), system validates at step (6). Builds dynamic SQL with WHERE (u.full_name LIKE '%[keyword]%' OR u.username LIKE '%[keyword]%') AND (u.phone = [phone] OR [phone] = null) AND (u.status = 'Locked' OR [isLocked] = false) AND (u.gender = [gender] OR [gender] = null). If COUNT = 0 → display "No staffs match" (Refer to MSG 118) at step (6.1). Else proceed to step (7).                                       |
| (7), (8)          | BR230   | **Displaying Rules:** System updates grid at step (7) with filtered results, displays "[filtered] of [total] staffs". Admin can repeat or confirm end at step (8).                                                                                                                                                                                                                                                                                                                                  |

##### 2.1.12.3 View Staff Details

###### Use Case Description

| Name               | View Staff Details                                                                                                                                                          |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to view comprehensive staff information including personal details, work statistics, and recent bookings handled.                                |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                                                   |
| **Trigger**        | Admin clicks on a staff from staffs list.                                                                                                                                   |
| **Pre-condition**  | Admin must be authenticated with admin role. Staff must exist.                                                                                                              |
| **Post-condition** | Admin views complete staff profile with work statistics (total bookings/trips/routes handled), recent bookings list (TOP 10), and available action buttons for edit/delete. |

###### Sequence Flow

[sequence-adjust-staffs-view-staff-details](../sequence/adjust-staffs/view-staff-details)

###### Activities Flow

[activity-adjust-staffs-view-staff-details](../activity/adjust-staffs/view-staff-details)

###### Business Rules

| Activity          | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                    |
| :---------------- | :------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2), (2.1), (2.2) | BR231   | **Querying Rules:** When admin selects staff at step (1), system queries at step (2) with SQL: "SELECT \* FROM User WHERE user_id = [id] AND role = 'STAFF'". If COUNT = 0 → display "Staff not found" (Refer to MSG 119) at step (2.1), end. Else proceed to step (3). (Refer to "User" table in "DB Sheet" file)                                                                                                             |
| (3)               | BR232   | **Querying Rules:** System queries work stats at step (3) with SQL: "SELECT COUNT(DISTINCT tb.booking_id) as total_bookings, COUNT(DISTINCT t.trip_id) as total_trips, COUNT(DISTINCT r.route_id) as total_routes FROM Tour_Booking tb LEFT JOIN Trip t ON tb.trip_id = t.trip_id LEFT JOIN Route r ON t.route_id = r.route_id WHERE tb.staff_id = [id]". (Refer to "Tour_Booking", "Trip", "Route" tables in "DB Sheet" file) |
| (4)               | BR233   | **Querying Rules:** System queries recent bookings at step (4) with SQL: "SELECT tb.\*, u.full_name, t.departure_date, r.route_name FROM Tour_Booking tb JOIN User u, Trip t, Route r WHERE tb.staff_id = [id] ORDER BY tb.booking_date DESC LIMIT 10". (Refer to "Tour_Booking", "User", "Trip", "Route" tables in "DB Sheet" file)                                                                                           |
| (5), (6), (7)     | BR234   | **Displaying Rules:** System displays "Staff Detail" view at steps (5-7) with panels: personal info ([lblFullName], [lblEmail], [lblPhone], [lblStatus]); work statistics (total bookings, trips, routes handled); recent bookings list (TOP 10); action buttons [btnEdit], [btnDelete]. Admin confirms at step (7). (Refer to "Staff Detail" view in "View Description" file)                                                 |

##### 2.1.12.4 Edit Staff

###### Use Case Description

| Name               | Edit Staff                                                                                                                                    |
| :----------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to modify staff information including personal details, password, and account status.                              |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                     |
| **Trigger**        | Admin selects "Edit Staff" function on a staff.                                                                                               |
| **Pre-condition**  | Admin must be authenticated with admin role. Staff must exist.                                                                                |
| **Post-condition** | Staff information is updated. Notification email sent if email/password changed. Admin views updated staff details with success confirmation. |

###### Sequence Flow

[sequence-adjust-staffs-edit-staff](../sequence/adjust-staffs/edit-staff)

###### Activities Flow

[activity-adjust-staffs-edit-staff](../activity/adjust-staffs/edit-staff)

###### Business Rules

| Activity             | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                 |
| :------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2), (2.1), (2.2)    | BR235   | **Querying Rules:** When admin selects "Edit Staff" at step (1), system queries at step (2) with SQL: "SELECT \* FROM User WHERE user_id = [id] AND role = 'STAFF'". If COUNT = 0 → display "Staff not found" (Refer to MSG 120), end. Else proceed to step (3). (Refer to "User" table in "DB Sheet" file)                                                                                 |
| (3)                  | BR236   | **Displaying Rules:** System displays "Edit Staff" form at step (3) with [lblUsername] (read-only), [txtBoxPassword], [txtBoxFullName], [txtBoxEmail], [txtBoxPhone], [txtAreaAddress], [datePickerBirthday], [dropdownGender], [dropdownStatus] (Active, Locked), [btnSave], [btnCancel], all pre-filled. (Refer to "Edit Staff Form" view in "View Description" file)                     |
| (6)                  | BR237   | **Validation Rules:** When admin clicks [btnSave] in repeat loop (steps 4-6), system validates at step (6): if password not empty AND password.length < 8 → error. If email invalid → error. Checks unique: "SELECT COUNT(\*) FROM User WHERE email = [email] AND user_id != [current_id]". If duplicate → error (Refer to MSG 121). Else proceed to step (7).                              |
| (7)                  | BR238   | **Querying Rules:** System updates at step (7) with SQL: "UPDATE User SET password = CASE WHEN [newPassword] != '' THEN HASH([newPassword]) ELSE password END, full_name = [name], email = [email], phone = [phone], address = [address], birthday = [birthday], gender = [gender], status = [status], updated_at = NOW() WHERE user_id = [id]". (Refer to "User" table in "DB Sheet" file) |
| (8), (9), (10), (11) | BR239   | **Displaying Rules:** System sends notification email if email/password changed at step (8), displays success "Staff updated successfully!" (Refer to MSG 122) at step (9), reloads details at step (10). Admin confirms end at step (11).                                                                                                                                                  |

##### 2.1.12.5 Delete Staff

###### Use Case Description

| Name               | Delete Staff                                                                                                                       |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to delete or disable staff accounts. Cannot delete if staff has active bookings assigned.               |
| **Actor**          | Admin (must be signed in with admin role)                                                                                          |
| **Trigger**        | Admin clicks "Delete" button on a staff.                                                                                           |
| **Pre-condition**  | Admin must be authenticated with admin role. Staff must exist.                                                                     |
| **Post-condition** | Staff account is either disabled (status set to Locked) or permanently deleted. Action is logged. Admin views updated staffs list. |

###### Sequence Flow

[sequence-adjust-staffs-delete-staff](../sequence/adjust-staffs/delete-staff)

###### Activities Flow

[activity-adjust-staffs-delete-staff](../activity/adjust-staffs/delete-staff)

###### Business Rules

| Activity               | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| :--------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (3), (3.1), (3.2)      | BR240   | **Querying Rules:** When admin clicks [btnDelete] at step (2), system checks at step (3) with SQL: "SELECT COUNT(\*) as active_bookings FROM Tour_Booking WHERE staff_id = [id] AND status IN ('PENDING', 'CONFIRMED')". If active_bookings > 0 → display "Cannot delete: Staff has active bookings. Suggest disable instead" (Refer to MSG 123) at step (3.1), end. Else proceed to step (4). (Refer to "Tour_Booking" table in "DB Sheet" file) |
| (4)                    | BR241   | **Displaying Rules:** System displays confirmation at step (4): "Delete or disable staff '[full_name]'?" with [btnDisable] "Set to LOCKED status", [btnDeletePermanently] "Delete permanently (cannot undo)", [btnCancel].                                                                                                                                                                                                                        |
| (5), (5.1), (5.2), (6) | BR242   | **Choosing/Querying Rules:** At step (5), if [btnCancel] at step (5.1) → close at step (5.2), end. If [btnDisable] → "UPDATE User SET status = 'Locked' WHERE user_id = [id]" at step (6). If [btnDeletePermanently] → "DELETE FROM Cart WHERE customer_id = [id]" then "DELETE FROM User WHERE user_id = [id]" at step (6). Commits. (Refer to "User", "Cart" tables in "DB Sheet" file)                                                         |
| (7), (8), (9)          | BR243   | **Displaying Rules:** System logs action, displays success message (Refer to MSG 124) at step (7), redirects to list at step (8). Admin confirms end at step (9).                                                                                                                                                                                                                                                                                 |

#### 2.1.13 View Reports Use Case

##### 2.1.13.1 Revenue Report

###### Use Case Description

| Name               | Revenue Report                                                                                                                           |
| :----------------- | :--------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to generate revenue reports showing total revenue, booking counts, trends over time with line and bar charts. |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                |
| **Trigger**        | Admin selects "Revenue Report" function in reports module.                                                                               |
| **Pre-condition**  | Admin must be authenticated with admin role. System must have booking and invoice data.                                                  |
| **Post-condition** | Admin views revenue report with statistics, charts, and can export to PDF/Excel.                                                         |

###### Sequence Flow

[sequence-view-reports-revenue-report](../sequence/view-reports/revenue-report)

###### Activities Flow

[activity-view-reports-revenue-report](../activity/view-reports/revenue-report)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------------- | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)                      | BR244   | **Displaying Rules:** System displays "Revenue Report Configuration" form at step (2) with [dropdownDateRange], [datePickerFrom], [datePickerTo], [btnGenerate]. (Refer to "Report Configuration" view in "View Description" file)                                                                                                                                                                                                              |
| (3), (4)                 | BR245   | **Validation Rules:** When admin configures and clicks [btnGenerate] in repeat loop (steps 3-4), system validates: if [datePickerFrom] > [datePickerTo] → error. If date range > 2 years → warning. Else proceed to step (5).                                                                                                                                                                                                                   |
| (5), (5.1), (5.2)        | BR246   | **Querying Rules:** System queries revenue at step (5): "SELECT DATE(booking_date) as date, SUM(total_amount) as revenue, COUNT(\*) as bookings FROM Tour_Booking tb JOIN Invoice i WHERE i.payment_status = 'PAID' AND booking_date BETWEEN [from] AND [to] GROUP BY DATE(booking_date)". If COUNT = 0 → display "No data" (Refer to MSG 125) at step (5.1), end. Else proceed. (Refer to "Tour_Booking", "Invoice" tables in "DB Sheet" file) |
| (6), (7)                 | BR247   | **Querying/Displaying Rules:** System calculates statistics and generates line/bar charts at steps (6-7): totals (SUM), averages (AVG), % changes, trends. Displays report with overview cards, charts, data table, export buttons.                                                                                                                                                                                                             |
| (10), (10.1), (11), (12) | BR248   | **Querying/Displaying Rules:** When admin clicks [btnExport] at step (9-10), system generates PDF/Excel at step (10). If fails → error (Refer to MSG 126) at step (10.1). Else downloads at step (11), admin receives at step (12). File: "RevenueReport\_[DateRange]\_[Timestamp].[ext]".                                                                                                                                                      |
| (13)                     | BR249   | **Displaying Rules:** Admin confirms end at step (13).                                                                                                                                                                                                                                                                                                                                                                                          |

##### 2.1.13.2 Booking Report

###### Use Case Description

| Name               | Booking Report                                                                                                                            |
| :----------------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to generate booking reports showing detailed booking information with status distribution and route analytics. |
| **Actor**          | Admin (must be signed in with admin role)                                                                                                 |
| **Trigger**        | Admin selects "Booking Report" function in reports module.                                                                                |
| **Pre-condition**  | Admin must be authenticated with admin role. System must have booking data.                                                               |
| **Post-condition** | Admin views booking report with statistics, pie/bar charts, and can export to PDF/Excel.                                                  |

###### Sequence Flow

[sequence-view-reports-booking-report](../sequence/view-reports/booking-report)

###### Activities Flow

[activity-view-reports-booking-report](../activity/view-reports/booking-report)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2)                      | BR250   | **Displaying Rules:** System displays "Booking Report Configuration" form at step (2) with [dropdownDateRange], [datePickerFrom], [datePickerTo], [dropdownStatusFilter], [dropdownRouteFilter], [btnGenerate].                                                                                                                                                                                                                                                                 |
| (3), (4)                 | BR251   | **Validation Rules:** When admin configures and clicks [btnGenerate] in repeat loop (steps 3-4), system validates: if [datePickerFrom] > [datePickerTo] → error. If date range > 2 years → warning. Else proceed to step (5).                                                                                                                                                                                                                                                   |
| (5), (5.1), (5.2)        | BR252   | **Querying Rules:** System queries bookings at step (5): "SELECT tb.\*, u.full_name, t.\*, r.route_name FROM Tour_Booking tb JOIN User u, Trip t, Route r WHERE booking_date BETWEEN [from] AND [to] AND (status = [filter] OR [filter] IS NULL) AND (r.route_id = [routeFilter] OR [routeFilter] IS NULL)". If COUNT = 0 → display "No data" (Refer to MSG 127) at step (5.1), end. Else proceed. (Refer to "Tour_Booking", "User", "Trip", "Route" tables in "DB Sheet" file) |
| (6), (7)                 | BR253   | **Querying/Displaying Rules:** System calculates statistics and generates pie/bar charts at steps (6-7): totals, status distribution, bookings by route. Displays report with overview cards, charts, data table, export buttons.                                                                                                                                                                                                                                               |
| (10), (10.1), (11), (12) | BR254   | **Querying/Displaying Rules:** When admin clicks [btnExport] at step (9-10), system generates PDF/Excel at step (10). If fails → error (Refer to MSG 128) at step (10.1). Else downloads at step (11), admin receives at step (12). File: "BookingReport\_[DateRange]\_[Timestamp].[ext]".                                                                                                                                                                                      |
| (13)                     | BR255   | **Displaying Rules:** Admin confirms end at step (13).                                                                                                                                                                                                                                                                                                                                                                                                                          |

##### 2.1.13.3 Popular Routes Report

###### Use Case Description

| Name               | Popular Routes Report                                                                                                                |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to generate reports showing most popular routes ranked by booking counts and revenue with bar/pie charts. |
| **Actor**          | Admin (must be signed in with admin role)                                                                                            |
| **Trigger**        | Admin selects "Popular Routes Report" function in reports module.                                                                    |
| **Pre-condition**  | Admin must be authenticated with admin role. System must have routes and booking data.                                               |
| **Post-condition** | Admin views popular routes report with rankings, statistics, charts, and can export to PDF/Excel.                                    |

###### Sequence Flow

[sequence-view-reports-popular-routes-report](../sequence/view-reports/popular-routes-report)

###### Activities Flow

[activity-view-reports-popular-routes-report](../activity/view-reports/popular-routes-report)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :----------------------- | :------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| (2)                      | BR256   | **Displaying Rules:** System displays "Popular Routes Report Configuration" form at step (2) with [dropdownDateRange], [datePickerFrom], [datePickerTo], [numericMinBookings], [btnGenerate].                                                                                                                                                                                                                                                                                                           |
| (3), (4)                 | BR257   | **Validation Rules:** When admin configures and clicks [btnGenerate] in repeat loop (steps 3-4), system validates: if [datePickerFrom] > [datePickerTo] → error. If date range > 2 years → warning. Else proceed to step (5).                                                                                                                                                                                                                                                                           |
| (5), (5.1), (5.2)        | BR258   | **Querying Rules:** System queries popular routes at step (5): "SELECT r.\*, COUNT(tb.booking_id) as total_bookings, SUM(tb.total_amount) as total_revenue FROM Route r JOIN Trip t, Tour_Booking tb WHERE tb.booking_date BETWEEN [from] AND [to] GROUP BY r.route_id HAVING total_bookings >= [minBookings] ORDER BY total_bookings DESC". If COUNT = 0 → display "No data" (Refer to MSG 129) at step (5.1), end. Else proceed. (Refer to "Route", "Trip", "Tour_Booking" tables in "DB Sheet" file) |
| (6), (7)                 | BR259   | **Querying/Displaying Rules:** System calculates rankings and generates bar/pie charts at steps (6-7): top routes, totals, revenue distribution. Displays report with overview cards, charts, data table, export buttons.                                                                                                                                                                                                                                                                               |
| (10), (10.1), (11), (12) | BR260   | **Querying/Displaying Rules:** When admin clicks [btnExport] at step (9-10), system generates PDF/Excel at step (10). If fails → error (Refer to MSG 130) at step (10.1). Else downloads at step (11), admin receives at step (12). File: "PopularRoutesReport\_[DateRange]\_[Timestamp].[ext]".                                                                                                                                                                                                        |
| (13)                     | BR261   | **Displaying Rules:** Admin confirms end at step (13).                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

##### 2.1.13.4 Customer Report

###### Use Case Description

| Name               | Customer Report                                                                                                                      |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------- |
| **Description**    | This use case allows admin to generate customer reports showing customer statistics, top customers by spending, and customer trends. |
| **Actor**          | Admin (must be signed in with admin role)                                                                                            |
| **Trigger**        | Admin selects "Customer Report" function in reports module.                                                                          |
| **Pre-condition**  | Admin must be authenticated with admin role. System must have customer and booking data.                                             |
| **Post-condition** | Admin views customer report with statistics, bar/line charts for top customers and trends, and can export to PDF/Excel.              |

###### Sequence Flow

[sequence-view-reports-customer-report](../sequence/view-reports/customer-report)

###### Activities Flow

[activity-view-reports-customer-report](../activity/view-reports/customer-report)

###### Business Rules

| Activity                 | BR Code | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------------- | :------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| (2)                      | BR262   | **Displaying Rules:** System displays "Customer Report Configuration" form at step (2) with [dropdownDateRange], [datePickerFrom], [datePickerTo], [dropdownCustomerType] (All, New, Returning), [btnGenerate].                                                                                                                                                                                                                                                                                                             |
| (3), (4)                 | BR263   | **Validation Rules:** When admin configures and clicks [btnGenerate] in repeat loop (steps 3-4), system validates: if [datePickerFrom] > [datePickerTo] → error. If date range > 2 years → warning. Else proceed to step (5).                                                                                                                                                                                                                                                                                               |
| (5), (5.1), (5.2)        | BR264   | **Querying Rules:** System queries customers at step (5): "SELECT u.\*, COUNT(tb.booking_id) as total_bookings, SUM(tb.total_amount) as total_spent FROM User u LEFT JOIN Tour_Booking tb ON u.user_id = tb.customer_id WHERE u.role = 'CUSTOMER' AND (tb.booking_date BETWEEN [from] AND [to] OR tb.booking_date IS NULL) GROUP BY u.user_id ORDER BY total_spent DESC". If COUNT = 0 → display "No data" (Refer to MSG 131) at step (5.1), end. Else proceed. (Refer to "User", "Tour_Booking" tables in "DB Sheet" file) |
| (6), (7)                 | BR265   | **Querying/Displaying Rules:** System calculates statistics and generates bar/line charts at steps (6-7): top 10 customers by spending, new customer trends, totals, averages. Displays report with overview cards, charts, data table, export buttons.                                                                                                                                                                                                                                                                     |
| (10), (10.1), (11), (12) | BR266   | **Querying/Displaying Rules:** When admin clicks [btnExport] at step (9-10), system generates PDF/Excel at step (10). If fails → error (Refer to MSG 132) at step (10.1). Else downloads at step (11), admin receives at step (12). File: "CustomerReport\_[DateRange]\_[Timestamp].[ext]".                                                                                                                                                                                                                                 |
| (13)                     | BR267   | **Displaying Rules:** Admin confirms end at step (13).                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### 2.2 List Description

The Electricilies system utilizes the following main data lists and tables:

| \#  | List Code | List Name             | Description                                                                                                                                                                                               |
| :-- | :-------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | List01    | User                  | This list contains all user accounts in the system including customers, staff, and admins. Information includes user ID, name, email, password hash, role, status, registration date, and last login.     |
| 2   | List02    | Account               | This list stores authentication credentials and account linking information. It includes account ID, user ID, username, password hash, third-party provider links, account status, and security settings. |
| 3   | List03    | Product               | This list holds all product information including product ID, name, description, category, price, stock quantity, SKU, brand, status, created date, and modified date.                                    |
| 4   | List04    | Product Image         | This list stores product images with image ID, product ID, image URL, image order, and upload date. Each product can have multiple images.                                                                |
| 5   | List05    | Product Specification | This list contains product specifications with specification ID, product ID, specification name, and specification value.                                                                                 |
| 6   | List06    | Cart                  | This list manages shopping cart items with cart ID, customer ID, product ID, quantity, added date, and cart session ID.                                                                                   |
| 7   | List07    | Order                 | This list stores order information including order ID, customer ID, order date, order status, total amount, shipping address, billing address, payment method, and tracking number.                       |
| 8   | List08    | Order Item            | This list contains individual items in each order with order item ID, order ID, product ID, quantity, unit price, and subtotal.                                                                           |
| 9   | List09    | Review                | This list holds product reviews with review ID, product ID, customer ID, rating (1-5), review title, review text, helpful count, status, and created date.                                                |
| 10  | List10    | Review Image          | This list stores review images with image ID, review ID, image URL, and upload date.                                                                                                                      |
| 11  | List11    | Document              | This list contains system documents and guides with document ID, title, category, content, target audience, status, created date, last modified date, and author ID.                                      |
| 12  | List12    | Document Version      | This list tracks document version history with version ID, document ID, version number, content snapshot, change log, and version date.                                                                   |
| 13  | List13    | Staff Activity        | This list logs staff activities with activity ID, staff ID, activity type, activity description, timestamp, and affected entity.                                                                          |
| 14  | List14    | Customer Report       | This list stores aggregated customer statistics and metrics for reporting purposes.                                                                                                                       |
| 15  | List15    | Staff Report          | This list stores aggregated staff performance statistics and metrics for reporting purposes.                                                                                                              |
| 16  | List16    | Shop Report           | This list stores aggregated shop-wide statistics including sales, revenue, inventory, and customer metrics.                                                                                               |
| 17  | List17    | Monitoring Data       | This list contains system monitoring metrics including uptime, response time, error logs, resource usage, and performance data.                                                                           |
| 18  | List18    | User Audit            | This list tracks user-related administrative actions with audit ID, actor ID, action type, target user ID, timestamp, and change details.                                                                 |
| 19  | List19    | Account Provider      | This list manages third-party authentication provider linkages with provider ID, user ID, provider name, provider user ID, and linked date.                                                               |
| 20  | List20    | Product Return        | This list manages product return requests with return ID, order ID, product ID, customer ID, reason, status, request date, and resolution date.                                                           |
| 21  | List21    | Password Reset Token  | This list stores password reset tokens with token ID, user ID, reset token, expiration time, and used status.                                                                                             |
| 22  | List22    | Order History         | This list tracks order status changes and events with history ID, order ID, status, event type, timestamp, and notes.                                                                                     |
| 23  | List23    | Review Audit          | This list logs review moderation actions with audit ID, review ID, staff ID, action type, reason, and timestamp.                                                                                          |
| 24  | List24    | Document Audit        | This list logs document management actions with audit ID, document ID, admin ID, action type, and timestamp.                                                                                              |
| 25  | List25    | Account Activity      | This list tracks account-related events including login attempts, password changes, and profile updates with activity ID, user ID, activity type, IP address, device info, timestamp, and status.         |

### 2.3 View Description

The Electricilies system provides the following main views/screens:

| \#  | View Code | View Name              | Description                                                                                                                                                                                        | User Role              |
| :-- | :-------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------- |
| 1   | View01    | Sign Up                | Registration form for new customers with fields for username, password, email, full name, and sign-up button.                                                                                      | Guest                  |
| 2   | View02    | Sign In                | Login form with username/email and password fields, sign-in button, forgot password link, and sign-up link.                                                                                        | Guest                  |
| 3   | View03    | Home View              | Main landing page displaying featured products, categories, search bar, navigation menu, cart icon, and user account menu.                                                                         | All                    |
| 4   | View04    | Profile View           | User profile page showing personal information, edit profile button, change password option, account activity link, linked accounts section, and delete account option.                            | Customer, Staff, Admin |
| 5   | View05    | Product List           | Grid or list view of products with product cards showing thumbnail, name, price, rating, and quick actions. Includes pagination and sorting options.                                               | All                    |
| 6   | View06    | Product Search         | Search results page with filters sidebar, search criteria display, product grid, sorting options, and result count.                                                                                | All                    |
| 7   | View07    | Product Detail         | Detailed product page with image gallery, product information, price, availability, quantity selector, add to cart button, specifications table, reviews section, and suggested products carousel. | All                    |
| 8   | View08    | Cart View              | Shopping cart page listing cart items with product details, quantity selectors, remove buttons, cart summary panel, and checkout button.                                                           | Customer               |
| 9   | View09    | Checkout View          | Checkout page with delivery information form, payment method selection, order summary, and place order button.                                                                                     | Customer               |
| 10  | View10    | Order Management       | Order history page listing orders with order cards showing order number, date, status, total, and action buttons. Includes search and filter options.                                              | Customer               |
| 11  | View11    | Order Detail           | Detailed order page showing order timeline, product list, order summary, shipping information, billing information, and available actions.                                                         | Customer               |
| 12  | View12    | Product Review         | Review submission form with star rating selector, review title input, review text area, image upload section, and submit button.                                                                   | Customer               |
| 13  | View13    | Customer Report        | Customer's personal analytics dashboard with charts showing purchase history, spending analysis, and statistics. Includes report type and time range selectors.                                    | Customer               |
| 14  | View14    | Document Management    | Document listing page organized by categories with document cards, search box, and filter options. For customers, read-only view. For admins, includes create/edit/delete actions.                 | Admin                  |
| 15  | View15    | Document Detail        | Document content page displaying title, formatted content, last updated date, and related documents. Includes edit options for admin.                                                              | Admin                  |
| 16  | View16    | Product Management     | Product management dashboard for staff with product table, search box, filters, add product button, and action buttons for each product.                                                           | Staff                  |
| 17  | View17    | Product Detail (Staff) | Product edit form for staff with fields for all product information, image uploader, specifications editor, and save button.                                                                       | Staff                  |
| 18  | View18    | User Management        | User management page for staff/admin with user table, search box, filters, and action buttons based on role.                                                                                       | Staff, Admin           |
| 19  | View19    | User Detail            | User information page showing user details, role selector (admin only), and user statistics.                                                                                                       | Staff, Admin           |
| 20  | View20    | Staff Self Report      | Staff's personal performance dashboard with activity charts, statistics cards, and productivity metrics.                                                                                           | Staff                  |
| 21  | View21    | Shop Report            | Comprehensive shop analytics dashboard for admin with multiple charts showing sales, revenue, inventory, and customer metrics. Includes report type and time range selectors.                      | Admin                  |
| 22  | View22    | System Monitoring      | System health dashboard for admin showing real-time metrics, status indicators, performance charts, error logs, and resource usage.                                                                | Admin                  |
| 23  | View23    | Confirmation Dialog    | Modal dialog for confirming critical actions with message, cancel button, and confirm button.                                                                                                      | All                    |
| 24  | View24    | Password Recovery      | Password reset request form with email field and send reset email button.                                                                                                                          | Guest                  |
| 25  | View25    | Account Activity       | List of account-related events showing timestamp, activity type, IP address, device info, and status.                                                                                              | Customer, Staff, Admin |

## 3. Non-functional Requirements

### 3.1 User Access and Security

| Function                      | Guest | Customer | Staff | Admin |
| :---------------------------- | :---: | :------: | :---: | :---: |
| **Manage Account Functions**  |
| Sign Up                       |   X   |          |       |       |
| Sign In                       |   X   |    X     |   X   |   X   |
| Sign Out                      |       |    X     |   X   |   X   |
| Edit Profile                  |       |  X(\*)   | X(\*) | X(\*) |
| Link Account With Third Party |       |  X(\*)   | X(\*) | X(\*) |
| Delete Account                |       |  X(\*)   | X(\*) | X(\*) |
| Reset Password                |       |  X(\*)   | X(\*) | X(\*) |
| View Account Activity         |       |  X(\*)   | X(\*) | X(\*) |
| Recover Account               |   X   |    X     |   X   |   X   |
| **View Product Functions**    |
| View Product                  |   X   |    X     |   X   |   X   |
| Search Product                |   X   |    X     |   X   |   X   |
| View Product Detail           |   X   |    X     |   X   |   X   |
| View Product Reviews          |   X   |    X     |   X   |   X   |
| View Suggested Products       |   X   |    X     |   X   |   X   |
| Add Product to Cart           |       |    X     |       |       |
| **Manage Cart Functions**     |
| Manage Cart                   |       |  X(\*)   |       |       |
| Change Product Amount         |       |  X(\*)   |       |       |
| Remove Product from Cart      |       |  X(\*)   |       |       |
| Purchase                      |       |  X(\*)   |       |       |
| **View Order Functions**      |
| View Order                    |       |  X(\*)   |       |       |
| Search Order                  |       |  X(\*)   |       |       |
| View Order Detail             |       |  X(\*)   |       |       |
| Cancel Order                  |       |  X(\*)   |       |       |
| Return Product                |       |  X(\*)   |       |       |
| Review Product                |       |  X(\*)   |       |       |
| **Other Customer Functions**  |
| Contact Support               |   X   |    X     |       |       |
| View Customer Self Report     |       |  X(\*)   |       |       |
| View Document                 |   X   |    X     |   X   |   X   |
| **Manage Product Functions**  |
| Manage Product                |       |          |   X   |   X   |
| Add Product                   |       |          |   X   |   X   |
| Update Product                |       |          |   X   |   X   |
| Delete Product                |       |          |   X   |   X   |
| Search Product (Staff)        |       |          |   X   |   X   |
| Delete Review                 |       |          |   X   |   X   |
| **Manage User Functions**     |
| Manage User                   |       |          |   X   |   X   |
| Search User                   |       |          |   X   |   X   |
| View Customer Report          |       |          |   X   |   X   |
| Change User Roles             |       |          |       |   X   |
| Delete User                   |       |          |       |   X   |
| View Staff Report             |       |          |       |   X   |
| **Admin Functions**           |
| View Shop Report              |       |          |       |   X   |
| View System Monitoring        |       |          |       |   X   |
| Adjust Document               |       |          |       |   X   |
| Create Document               |       |          |       |   X   |
| Update Document               |       |          |       |   X   |
| Delete Document               |       |          |       |   X   |
| Search Document (Admin)       |       |          |       |   X   |
| **Staff Functions**           |
| View Staff Self Report        |       |          | X(\*) | X(\*) |

**Legend:**

- X: User has full permission to perform the action
- X(\*): User has permission to perform the action on their own items only
- X(\*\*): User has permission to perform the action on items sent to them only

**Security Requirements:**

- JWT must be expired shortly, no more than 5 minutes
- HTTPS must be enforced for all connections
- API endpoints must validate authentication tokens
- Failed login attempts limited to 3 before temporary account lock (15 minutes)
- Sensitive data (payment info) must be encrypted at rest
- SQL injection prevention through parameterized queries
- XSS protection through input sanitization and output encoding
- CSRF tokens required for all state-changing operations
- File upload restrictions: max 5MB for product images, 2MB for review images
- Rate limiting: max 100 requests per minute per IP address
- Admin actions must be logged in audit trail
- User sessions must be invalidated on password change or role change

### 3.2 Performance Requirements

**Response Time:**

- Page load time: < 3 seconds for 95% of requests
- API response time: < 500ms for 90% of requests
- Database query time: < 200ms for standard queries
- Search results: < 1 second for product/user/document searches
- Image loading: < 2 seconds for product images with lazy loading
- Cart operations: < 300ms for add/update/remove operations
- Report generation: < 5 seconds for standard reports

**Scalability:**

- Support minimum 1,000 concurrent users
- Support minimum 10,000 active customer accounts
- Support minimum 5,000 staff members
- Support minimum 50,000 products in catalog
- Database capable of handling 100,000 orders per year
- Support minimum 500,000 product reviews
- Cart operations support 500 concurrent transactions
- System should scale horizontally with load balancer

**Availability:**

- 99.5% uptime during business hours (24/7)
- Scheduled maintenance windows: 2 AM - 4 AM on weekends
- Maximum unplanned downtime: 4 hours per month
- Backup systems with < 15 minutes failover time
- Database replication for high availability
- Automated health checks every 5 minutes
- Disaster recovery plan with < 1 hour recovery time

**Data Volume:**

- Product images: Max 5MB per image, up to 10 images per product
- Review images: Max 2MB per image, up to 5 images per review
- Document content: Max 10MB per document
- Database growth rate: Estimated 20% annually
- Daily backup of all transactional data
- Archive old orders after 2 years (keep for compliance)
- Log retention: 90 days for application logs, 1 year for audit logs
- Maximum cart size: 100 items per customer
- Maximum document file size: 10MB

**Caching:**

- Product catalog cached for 5 minutes
- User session data cached for session duration
- Static assets cached for 7 days with CDN
- Database query results cached for frequently accessed data
- Cache invalidation on data updates

### 3.3 Implementation Requirements

**Technology Stack:**

- Frontend: React.js with Next.js framework
- Backend: Go (Golang) for API services
- Authentication: Keycloak for identity and access management
- Database: PostgreSQL for relational data
- Search Engine: ParadeDB for product/user/document search
- File Storage: AWS S3 or compatible object storage
- CDN: CloudFlare or AWS CloudFront for static assets
- Monitoring: Prometheus, Loki, Grafana for system monitoring

**Development Environment:**

- Version Control: Git with Github Flow branching strategy
- CI/CD: GitHub Actions
- Code Quality: SonarQube for code analysis
- Testing: Jest for frontend, Go test for backend
- API Documentation: Swagger/OpenAPI specification
- Containerization: Docker for development and deployment
- Orchestration: Kubernetes for production deployment

**Deployment:**

- Development: Local Docker containers
- Staging: Kubernetes cluster on cloud provider
- Production: Kubernetes cluster with auto-scaling
- Database: PostgreSQL on Kubernetes
- Monitoring: Integrated logging and monitoring stack

**Security Implementation:**

- Authentication: OAuth 2.0 / OpenID Connect via Keycloak
- Authorization: Role-Based Access Control (RBAC)
- API Security: JWT tokens
- Communication: TLS 1.3 for all external connections
- Database: Encrypted at rest and in transit
- Secrets Management: HashiCorp Vault or AWS Secrets Manager, or encrypted secret on repositories
- Penetration Testing: Quarterly security audits

**Compliance:**

- GDPR compliance for EU customers
- PCI DSS compliance for payment processing
- Data retention policies per regulatory requirements
- Privacy policy and terms of service
- Cookie consent management

## 4. Other Requirements

### 4.1 Archive Function

| List                   | Actor        | Condition                                                                                                                                         |
| :--------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------ |
| Order                  | Admin        | The Admin is able to archive completed orders older than 2 years. Archived orders remain accessible for compliance but are moved to cold storage. |
| User                   | Admin        | The Admin is able to archive deleted user accounts after 90 days of deletion. Personal data is anonymized per GDPR requirements.                  |
| Product                | Staff, Admin | Staff/Admin can archive discontinued products. Archived products are hidden from customer view but retain historical data for reporting.          |
| Review                 | Staff, Admin | Staff/Admin can archive old reviews (older than 3 years) while maintaining review statistics.                                                     |
| Document               | Admin        | The Admin is able to archive outdated documents. Archived documents are not visible to users but accessible to admin for historical reference.    |
| Staff Activity Log     | Admin        | The Admin is able to archive staff activity logs older than 1 year for audit compliance.                                                          |
| System Monitoring Data | Admin        | The Admin is able to archive system monitoring data older than 90 days to maintain database performance.                                          |

### 4.2 Security Audit Function

Enable Security Audit Function for "Admin" to track critical system events:

- User account creation, modification, and deletion
- User role changes and permission modifications
- Failed login attempts and account lockouts
- Password changes and password reset requests
- Product creation, modification, and deletion
- Order modifications and cancellations
- Review deletions and moderation actions
- Document creation, modification, and deletion
- System configuration changes
- Admin access to sensitive user data
- API authentication failures
- Suspicious activity patterns (e.g., rapid requests, unauthorized access attempts)

All audit logs include: timestamp, actor ID, action type, affected entity, IP address, user agent, and action result. Audit logs are immutable and retained for minimum 1 year for compliance purposes.

### 4.3 Electricilies Sites

| \#  | Site Name     | Description                                                                                                                                                                                                                                                                                                                                                                   |
| :-- | :------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Customer Site | This is the main e-commerce website for customers. It provides functionalities to browse products, search products, view product details and reviews, manage shopping cart, place orders, track orders, write reviews, view documents, contact support, and view personal reports.                                                                                            |
| 2   | Staff Site    | This site is designed for staff members. It enables them to manage products (add, update, delete), moderate product reviews, search products with advanced filters, view and manage users (customers only), view customer reports, and view their own performance reports.                                                                                                    |
| 3   | Admin Site    | This is the control console for administrators. It provides full access to manage users (including staff), change user roles, view comprehensive shop reports, monitor system health and performance, manage system documents, view staff performance reports, and access all staff functionalities. Admin site includes advanced analytics and system configuration options. |

### 4.4 Electricilies Lists

Refer to section 2.2 List Description for detailed information about all lists/tables used in the Electricilies system.

### 4.5 Custom Pages

Custom pages implemented in the Electricilies system:

| \#  | Page Name            | Description                                                      | User Role               |
| :-- | :------------------- | :--------------------------------------------------------------- | :---------------------- |
| 1   | Dashboard            | Personalized dashboard showing quick stats and recent activities | Customer, Staff, Admin  |
| 2   | Analytics Dashboard  | Comprehensive analytics page with customizable widgets           | Admin                   |
| 3   | Inventory Management | Advanced inventory tracking and low-stock alerts                 | Staff, Admin            |
| 4   | Bulk Operations      | Interface for bulk product updates and data import/export        | Staff, Admin            |
| 5   | Notification Center  | Centralized notification management for all system alerts        | All authenticated users |
| 6   | Order Tracking       | Real-time order tracking with map integration                    | Customer                |
| 7   | Wishlist             | Product wishlist management for customers                        | Customer                |
| 8   | Comparison Tool      | Side-by-side product comparison interface                        | Customer                |
| 9   | Advanced Search      | Advanced search page with multiple filter options                | All                     |
| 10  | Category Management  | Product category hierarchy management                            | Admin                   |

### 4.6 Scheduled Agents

Scheduled jobs and automated tasks in the Electricilies system:

| \#  | Agent Name                    | Schedule                    | Description                                                                        |
| :-- | :---------------------------- | :-------------------------- | :--------------------------------------------------------------------------------- |
| 1   | Order Status Sync             | Every 15 minutes            | Synchronizes order status with shipping providers and updates tracking information |
| 2   | Inventory Alert               | Daily at 8:00 AM            | Checks inventory levels and sends low-stock alerts to staff                        |
| 3   | Abandoned Cart Reminder       | Daily at 10:00 AM           | Sends email reminders to customers with abandoned carts (older than 24 hours)      |
| 4   | Review Notification           | Daily at 9:00 AM            | Sends email notifications to customers prompting them to review delivered orders   |
| 5   | Report Generation             | Daily at 1:00 AM            | Generates and caches daily sales and performance reports                           |
| 6   | Database Backup               | Daily at 2:00 AM            | Performs full database backup and verification                                     |
| 7   | Log Cleanup                   | Weekly on Sunday at 3:00 AM | Archives old logs and cleans up temporary data                                     |
| 10  | Analytics Aggregation         | Daily at 4:00 AM            | Aggregates daily analytics data for reporting                                      |
| 11  | Product Recommendation Update | Daily at 5:00 AM            | Updates product recommendation algorithm with latest purchase data                 |
| 12  | Price Update                  | As configured               | Processes scheduled price changes and promotional pricing                          |

### 4.7 Technical Concern

**Scalability Concerns:**

- **High Traffic Events:** System must handle traffic spikes during sales events (Black Friday, Flash Sales). Implement auto-scaling, CDN caching, and queue-based order processing to maintain performance.

- **Large Product Catalog:** With 50,000+ products, search and filtering performance is critical. ParadeDB indexing and optimized database queries with proper indexing are essential.

- **Image Storage:** Large volume of product and review images can impact storage costs and performance. Implement image compression, lazy loading, CDN delivery, and tiered storage (hot/cold) strategy.

**Data Management Concerns:**

- **Data Volume Growth:** 20% annual growth requires capacity planning for database, storage, and backup systems. Implement data archiving strategy for old orders and reviews.

- **Search Performance:** Full-text search across products, documents, and users with complex filters requires optimized ParadeDB configuration and query optimization.

- **Report Generation:** Complex reports with large datasets may impact database performance. Implement report caching, pre-aggregation of metrics, and scheduled report generation during off-peak hours.

**Security Concerns:**

- **PCI DSS Compliance:** Payment processing must comply with PCI DSS standards. Use tokenization and never store full credit card data. Implement third-party payment gateway integration (Stripe, PayPal).

- **Data Privacy:** GDPR compliance requires proper consent management, right to be forgotten, data portability, and data encryption. Implement personal data anonymization for archived users.

- **API Security:** Public APIs must be protected against abuse. Implement rate limiting, API key rotation, request validation, and DDoS protection.

**Performance Concerns:**

- **Database Queries:** Complex queries for reports and analytics can impact database performance. Implement read replicas, query optimization, and appropriate indexing strategy.

- **Concurrent Users:** Target of 1,000 concurrent users requires horizontal scaling capability. Implement stateless application design, session management in Redis, and load balancing.

- **Real-time Updates:** Cart synchronization, inventory updates, and order status require real-time or near-real-time processing. Implement WebSocket connections for live updates and message queue for asynchronous processing.

**Integration Concerns:**

- **Third-party Services:** Dependencies on external services (payment gateway, shipping providers, email service, support chat) require proper error handling, retry logic, and fallback mechanisms.

- **Authentication Provider:** Keycloak integration requires proper configuration, token management, and session synchronization. Implement token refresh mechanism and handle authentication failures gracefully.

**Operational Concerns:**

- **Monitoring and Alerting:** Critical for maintaining 99.5% uptime. Implement comprehensive monitoring for application health, database performance, API response times, error rates, and resource utilization.

- **Deployment Strategy:** Zero-downtime deployments are essential for 24/7 availability. Implement blue-green deployment or rolling updates with health checks.

- **Disaster Recovery:** RTO (Recovery Time Objective) of < 1 hour requires automated backup verification, documented recovery procedures, and regular disaster recovery drills.

## 5. Appendixes

### 5.1 Glossary

The list below contains all the necessary terms to interpret the document, including acronyms and abbreviations.

| Term       | Description                                                             |
| :--------- | :---------------------------------------------------------------------- |
| _API_      | **A**pplication **P**rogramming **I**nterface                           |
| _AWS_      | **A**mazon **W**eb **S**ervices                                         |
| _BR_       | **B**usiness **R**ule                                                   |
| _CDN_      | **C**ontent **D**elivery **N**etwork                                    |
| _CLV_      | **C**ustomer **L**ifetime **V**alue                                     |
| _CPU_      | **C**entral **P**rocessing **U**nit                                     |
| _CRUD_     | **C**reate, **R**ead, **U**pdate, **D**elete                            |
| _CSRF_     | **C**ross-**S**ite **R**equest **F**orgery                              |
| _DB_       | **D**ata**b**ase                                                        |
| _GDPR_     | **G**eneral **D**ata **P**rotection **R**egulation                      |
| _HTML_     | **H**yper**T**ext **M**arkup **L**anguage                               |
| _HTTPS_    | **H**yper**T**ext **T**ransfer **P**rotocol **S**ecure                  |
| _ID_       | **Id**entifier                                                          |
| _IP_       | **I**nternet **P**rotocol                                               |
| _JPG/JPEG_ | **J**oint **P**hotographic **E**xperts **G**roup (image format)         |
| _JSON_     | **J**ava**S**cript **O**bject **N**otation                              |
| _JWT_      | **J**SON **W**eb **T**oken                                              |
| _MB_       | **M**ega**b**yte                                                        |
| _MSG_      | **M**es**s**a**g**e                                                     |
| _N/A_      | **N**ot **A**vailable or **N**ot **A**pplicable                         |
| _OAuth_    | **O**pen **Auth**orization                                              |
| _PCI DSS_  | **P**ayment **C**ard **I**ndustry **D**ata **S**ecurity **S**tandard    |
| _PDF_      | **P**ortable **D**ocument **F**ormat                                    |
| _PNG_      | **P**ortable **N**etwork **G**raphics (image format)                    |
| _RBAC_     | **R**ole-**B**ased **A**ccess **C**ontrol                               |
| _REST_     | **RE**presentational **S**tate **T**ransfer                             |
| _RTO_      | **R**ecovery **T**ime **O**bjective                                     |
| _SEO_      | **S**earch **E**ngine **O**ptimization                                  |
| _SKU_      | **S**tock **K**eeping **U**nit                                          |
| _SQL_      | **S**tructured **Q**uery **L**anguage                                   |
| _SRS_      | **S**oftware **R**equirements **S**pecification                         |
| _SSL/TLS_  | **S**ecure **S**ockets **L**ayer / **T**ransport **L**ayer **S**ecurity |
| _TBD_      | **T**o **b**e **d**etermined or **t**o **b**e **d**efined               |
| _UC_       | **U**se **C**ase                                                        |
| _UI_       | **U**ser **I**nterface                                                  |
| _URL_      | **U**niform **R**esource **L**ocator                                    |
| _UUID_     | **U**niversally **U**nique **Id**entifier                               |
| _XSS_      | **C**ross-**S**ite **S**cripting                                        |

### 5.2 Mapping to Notes Application

\*\* There is no mapping between the Electricilies application and any source Notes application. \*\*

### 5.3 Messages

This section describes the details of messages used in business rules including error messages, confirmation messages, success messages, and informational messages.

| Message Code | Message Content                                                                                                              | Button |
| :----------- | :--------------------------------------------------------------------------------------------------------------------------- | :----- |
| MSG 1        | This field is required. Please provide valid information to proceed.                                                         | Ok     |
| MSG 2        | This username or email is already registered. Please use a different one.                                                    | Ok     |
| MSG 3        | Invalid authorization code or verifier. Please try again.                                                                    | Ok     |
| MSG 4        | Invalid authentication token. Please sign in again.                                                                          | Ok     |
| MSG 5        | Invalid username/email or password. Please check your credentials and try again.                                             | Ok     |
| MSG 6        | You have been successfully signed out. Redirecting to sign in page...                                                        | Ok     |
| MSG 7        | Email address is already registered by another account. Please use a different email.                                        | Ok     |
| MSG 8        | Phone number is already registered by another account. Please use a different phone.                                         | Ok     |
| MSG 9        | Profile updated successfully.                                                                                                | Ok     |
| MSG 10       | This account is already linked to this provider or provider account is linked to another user.                               | Ok     |
| MSG 11       | Account linked successfully with third-party provider.                                                                       | Ok     |
| MSG 12       | Cannot delete account. You have pending orders or active subscriptions that must be resolved first.                          | Ok     |
| MSG 13       | Your account has been deleted successfully. Thank you for using our service.                                                 | Ok     |
| MSG 14       | Password does not meet requirements. Must be at least 8 characters with uppercase, lowercase, number, and special character. | Ok     |
| MSG 15       | Current password is incorrect. Please try again.                                                                             | Ok     |
| MSG 16       | Password updated successfully.                                                                                               | Ok     |
| MSG 17       | If this email is registered, you will receive a password reset link shortly.                                                 | Ok     |
| MSG 18       | Password reset email sent successfully. Please check your inbox and follow the instructions.                                 | Ok     |
| MSG 19       | Invalid quantity. Please enter a valid positive number that does not exceed available stock.                                 | Ok     |
| MSG 20       | Total quantity exceeds available stock. Please reduce quantity.                                                              | Ok     |
| MSG 21       | Product added to cart successfully.                                                                                          | Ok     |
| MSG 22       | Cart updated successfully.                                                                                                   | Ok     |
| MSG 23       | Product not found in cart.                                                                                                   | Ok     |
| MSG 24       | Product removed from cart successfully.                                                                                      | Ok     |
| MSG 25       | Cannot proceed to checkout. Some items in your cart are no longer available or have insufficient stock.                      | Ok     |
| MSG 26       | Cannot proceed to checkout. One or more products are no longer available.                                                    | Ok     |
| MSG 27       | Cannot cancel order. Order has already been shipped or is not in cancellable status.                                         | Ok     |
| MSG 28       | Order cancelled successfully. Refund will be processed within 3-5 business days.                                             | Ok     |
| MSG 29       | Cannot return product. Product is not eligible for return or return period has expired.                                      | Ok     |
| MSG 30       | Return request created successfully. Please check your email for return instructions.                                        | Ok     |
| MSG 31       | Invalid review content. Please ensure all required fields are filled correctly.                                              | Ok     |
| MSG 32       | Cannot submit review. You have not purchased this product or have already reviewed it.                                       | Ok     |
| MSG 33       | Thank you for your review! It will be published after moderation.                                                            | Ok     |
| MSG 34       | Invalid product data. Please check all required fields and try again.                                                        | Ok     |
| MSG 35       | Cannot save product. SKU already exists or validation failed.                                                                | Ok     |
| MSG 36       | Product created successfully.                                                                                                | Ok     |
| MSG 37       | Product updated successfully.                                                                                                | Ok     |
| MSG 38       | Cannot delete product. Product has pending orders or is in active carts.                                                     | Ok     |
| MSG 39       | Product deleted successfully.                                                                                                | Ok     |
| MSG 40       | Review not found.                                                                                                            | Ok     |
| MSG 41       | Review deleted successfully.                                                                                                 | Ok     |
| MSG 42       | Invalid role change. Please select a different role.                                                                         | Ok     |
| MSG 43       | Cannot change user role. User has pending administrative actions.                                                            | Ok     |
| MSG 44       | User role updated successfully. User will need to sign in again.                                                             | Ok     |
| MSG 45       | Cannot delete user. User has pending orders or active disputes.                                                              | Ok     |
| MSG 46       | User deleted successfully.                                                                                                   | Ok     |
| MSG 47       | Invalid document data. Please check all required fields.                                                                     | Ok     |
| MSG 48       | Cannot save document. Title already exists in this category or validation failed.                                            | Ok     |
| MSG 49       | Document created successfully.                                                                                               | Ok     |
| MSG 50       | Document updated successfully.                                                                                               | Ok     |
| MSG 51       | Document not found.                                                                                                          | Ok     |
| MSG 52       | Document deleted successfully.                                                                                               | Ok     |

### 5.4 Issues List

N/A
