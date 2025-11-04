| ID   | Subsystem / Module        | Function ID | Use Case Name (Primary Name)             | Description                                   | Environment | Actors   |       |       | Note |
|------|---------------------------|-------------|------------------------------------------|-----------------------------------------------|-------------|----------|-------|-------|------|
|      |                           |             |                                          |                                               |             | customer | staff | admin |      |
| UC01 | Auth                      | F01         | Sign in                                  | Allow user to log into the system             | Web         | x        | x     | x     | â  |
| UC02 |                           | F02         | Sign up                                  | Allow user to register a new account          | Web         | x        | x     | x     | â  |
| UC03 |                           | F03         | Forget password                          | Recover password via email or OTP             | Web         | x        | x     | x     | â  |
| UC04 |                           | F04         | Manage profile                           | View and edit personal information            | Web         | x        | x     | x     | â  |
| UC05 | Manage Personal bookings  | F05         | Book a trip                              | Customer or staff books a trip                | Web         | x        | x     |       | â  |
| UC06 |                           | F06         | Edit Upcoming Tripâs Passenger Details | Edit passenger details before trip starts     | Web         | x        | x     |       | â  |
| UC07 |                           | F07         | View and Filter Personal Bookings        | View or filter customerâs bookings          | Web         | x        |       |       | â  |
| UC08 |                           | F08         | Checkout cart                            | Complete booking payment process              | Web         | x        |       |       | â  |
| UC09 |                           | F09         | View and Pay Booking Invoice Details     | View and pay for a booking invoice            | Web         | x        |       |       | â  |
| UC10 | Browse Trips              | F10         | View and Filter Available Trips          | Search and filter trips by criteria           | Web         | x        | x     |       | â  |
| UC11 |                           | F11         | View Trip Details                        | View full trip details                        | Web         | x        | x     |       | â  |
| UC12 | Adjust Cart               | F12         | Add Trip to Cart                         | Add selected trip to shopping cart            | Web         | x        |       |       | â  |
| UC13 |                           | F13         | Remove Trip from Cart                    | Modify quantity, date, passenger info in cart | Web         | x        |       |       | â  |
| UC14 |                           | F14         | Edit Cart Details                        | Delete a trip from cart                       | Web         | x        |       |       | â  |
| UC15 |                           | F15         | View and Filter Trips in Cart            | View and filter trips currently in cart       | Web         |          |       |       | â  |
| UC16 | Adjust Favorite Trips     | F16         | Favorite a Trip                          | Mark a trip as favorite                       | Web         | x        |       |       | â  |
| UC17 |                           | F17         | Unfavorite a Trip                        | Remove a trip from favorites                  | Web         | x        |       |       | â  |
| UC18 |                           | F18         | View and Filter Favorite Trips           | View and filter favorite trips                | Web         | x        |       |       | â  |
| UC19 | Manage Routes             | F19         | Add new Route                            | Add a new travel route                        | Web         |          |       |       | â  |
| UC20 |                           | F20         | View Route Detail                        | View details of a route                       | Web         |          |       | x     | â  |
| UC21 |                           | F21         | Edit Route Detail                        | Edit an existing route                        | Web         |          | x     | x     | â  |
| UC22 |                           | F22         | Delete Route                             | Delete a route (only if not referenced)       | Web         |          |       | x     | â  |
| UC23 |                           | F23         | View and Filter Routes                   | View and filter list of routes                | Web         |          |       | x     | â  |
| UC24 | Manage route schedule     | F24         | Add new Itinerary                        | Add a new itinerary for a route               | Web         |          | x     | x     | â  |
| UC25 |                           | F25         | View Route Schedule                      | View all itineraries of a route               | Web         |          |       | x     | â  |
| UC26 |                           | F26         | Edit Itinerary                           | Edit itinerary information                    | Web         |          | x     | x     | â  |
| UC27 |                           | F27         | Delete Itinerary                         | Delete a specific itinerary day               | Web         |          |       | x     | â  |
| UC28 | Manage attraction         | F28         | Add new Attraction                       | Add a new attraction point                    | Web         |          |       | x     | â  |
| UC29 |                           | F29         | View Attraction Detail                   | View attraction information                   | Web         |          |       | x     | â  |
| UC30 |                           | F30         | Edit Attraction Detail                   | Edit existing attraction                      | Web         |          | x     | x     | â  |
| UC31 |                           | F31         | Delete Attraction                        | Delete an attraction if not in use            | Web         |          |       | x     | â  |
| UC32 |                           | F32         | View and Filter Attractions              | View and filter attractions                   | Web         |          |       | x     | â  |
| UC33 | Manage trips              | F33         | Add new Trip                             | Add new trip information                      | Web         |          | x     | x     | â  |
| UC34 |                           | F34         | View Trip Detail                         | View trip details for management              | Web         |          |       | x     | â  |
| UC35 |                           | F35         | Edit Trip                                | Edit trip details                             | Web         |          | x     | x     | â  |
| UC36 |                           | F36         | Delete Trip                              | Delete a trip if not booked                   | Web         |          |       | x     | â  |
| UC37 |                           | F37         | View and Filter Trips                    | View and filter trip list                     | Web         |          | x     | x     | â  |
| UC38 |                           | F38         | Add new Booking                          | Create new booking manually                   | Web         |          |       | x     | â  |
| UC39 | Adjust and track bookings | F39         | View Booking Detail                      | View booking information                      | Web         |          | x     | x     | â  |
| UC40 |                           | F40         | Edit Pre-Departure Booking               | Modify booking before departure               | Web         |          | x     |       | â  |
| UC41 |                           | F41         | Delete Booking                           | Cancel a booking                              | Web         |          | x     |       | â  |
| UC42 |                           | F42         | View and Filter Bookings                 | View and filter booking list                  | Web         |          | x     |       | â  |
| UC43 |                           | F43         | View Booking Invoice                     | View invoice details for a booking            | Web         |          | x     |       | â  |
| UC44 | Adjust customers          | F44         | Add new Customer                         | Add a new customer                            | Web         |          | x     |       | â  |
| UC45 |                           | F45         | View Customer Details                    | View customer profile                         | Web         |          | X     |       | â  |
| UC46 |                           | F46         | Edit Customer                            | Edit customer information                     | Web         |          | x     | x     | â  |
| UC47 |                           | F47         | Delete Customer                          | Delete customer record                        | Web         |          | x     | x     | â  |
| UC48 |                           | F48         | View and Filter Customers                | Search and filter customers                   | Web         |          | x     | x     | â  |
| UC49 | Adjust Staffs             | F49         | Add new Staff                            | Add new staff record                          | Web         |          | x     | x     | â  |
| UC50 |                           | F50         | View Staff Details                       | View staff information                        | Web         |          | x     | x     | â  |
| UC51 |                           | F51         | Edit Staff                               | Edit staff details                            | Web         |          |       | x     | â  |
| UC52 |                           | F52         | Delete Staff                             | Delete staff account                          | Web         |          |       | x     | â  |
| UC53 |                           | F53         | View and Filter Staffs                   | View and filter staff list                    | Web         |          |       | x     | â  |
| UC54 | Report                    | F54         | View Reports                             | View statistical or analytical reports        | Web         |          |       | x     | â  |
