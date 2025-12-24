# Project Scope

## Topic: Building a Tourist Management System (TMS)

### 1. Actor: Customer

- **Sign In/Sign Up**: The customer can create an account and log into the system. This includes providing personal information and account credentials.
- **Forget Password**: The customer can recover their password via email verification.
- **Manage Profile**: The customer can view and update their personal information including contact details and preferences.
- **Browse Trips**: The customer can view and filter available trips by various criteria such as destination, date, price, and category.
- **View Trip Details**: The customer can view comprehensive information about a trip including itinerary, attractions, pricing, and availability.
- **Adjust Cart**: The customer can add trips to cart, remove trips from cart, and edit cart details such as quantity, travel date, and passenger information.
- **Adjust Favorite Trips**: The customer can mark trips as favorites, remove trips from favorites, and view their favorite trip list.
- **Manage Personal Bookings**: The customer can book trips, edit upcoming trip's passenger details, view and filter personal bookings, checkout cart, and view/pay booking invoice details.

### 2. Actor: Staff

- **Sign In**: The staff can log into the system using their credentials.
- **Manage Profile**: The staff can view and update their personal information.
- **Browse Trips**: The staff can view and filter available trips to assist customers.
- **Manage Routes**: The staff can view route details and edit route information.
- **Manage Route Schedule**: The staff can add new itineraries and edit existing itinerary information for routes.
- **Manage Attractions**: The staff can edit attraction details.
- **Manage Trips**: The staff can add new trips, edit trip details, and view/filter trips.
- **Adjust and Track Bookings**: The staff can view booking details, edit pre-departure bookings, delete bookings, view and filter bookings, and view booking invoices.
- **Adjust Customers**: The staff can add new customers, view customer details, edit customer information, delete customers, and view/filter customer list.
- **Adjust Staffs**: The staff can add new staff and view staff details.

### 3. Actor: Admin

- **Sign In**: The admin can log into the system using their credentials.
- **Manage Profile**: The admin can view and update their personal information.
- **Manage Routes**: The admin can add new routes, view route details, edit route information, delete routes, and view/filter routes. This includes managing travel route information and destinations.
- **Manage Route Schedule**: The admin can add new itineraries, view route schedules, edit itineraries, and delete itineraries. This includes managing day-by-day travel plans for each route.
- **Manage Attractions**: The admin can add new attractions, view attraction details, edit attraction information, delete attractions, and view/filter attractions. This includes managing tourist destinations and points of interest.
- **Manage Trips**: The admin can add new trips, view trip details, edit trips, add new bookings for trips, delete trips, and view/filter trips. This includes managing scheduled departures based on routes.
- **Adjust and Track Bookings**: The admin can add new bookings and view booking details. This includes monitoring all booking activities in the system.
- **Adjust Customers**: The admin can edit customer information and delete customers. This includes managing customer accounts and data.
- **Adjust Staffs**: The admin can add new staff, view staff details, edit staff information, delete staff, and view/filter staff list. This includes managing employee accounts and permissions.
- **View Reports**: The admin can view statistical and analytical reports including booking reports, customer reports, revenue reports, and popular routes reports. This provides insights into business performance and system usage.

### 4. Architecture: Client-Server

- **Frontend**: Web-based application built with React.js and Vite for all actors (Customer, Staff, Admin).
- **Backend**: RESTful API server built with Spring Boot (Java).
- **Database**: Relational database for storing user data, routes, trips, bookings, and transactions.
- **External Services**:
  - Payment Gateway (PayOS) for processing booking payments
  - Email Service for notifications and password recovery
  - Cloud Storage (Cloudinary) for managing trip images and media

### 5. Summary Table

| Module                    | Customer | Staff | Admin |
| ------------------------- | :------: | :---: | :---: |
| Authentication            |    ✓     |   ✓   |   ✓   |
| Browse Trips              |    ✓     |   ✓   |       |
| Adjust Cart               |    ✓     |       |       |
| Adjust Favorite Trips     |    ✓     |       |       |
| Manage Personal Bookings  |    ✓     |       |       |
| Manage Routes             |          |   ✓   |   ✓   |
| Manage Route Schedule     |          |   ✓   |   ✓   |
| Manage Attractions        |          |   ✓   |   ✓   |
| Manage Trips              |          |   ✓   |   ✓   |
| Adjust and Track Bookings |          |   ✓   |   ✓   |
| Adjust Customers          |          |   ✓   |   ✓   |
| Adjust Staffs             |          |   ✓   |   ✓   |
| View Reports              |          |       |   ✓   |
