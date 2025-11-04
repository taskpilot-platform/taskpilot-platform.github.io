import { defineConfig } from "vitepress";
import { configureDiagramsPlugin } from "vitepress-plugin-diagrams";

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: "TMS Docs",
	description: "TMS docs",
	lang: "en-GB",
	markdown: {
		theme: {
			light: "catppuccin-latte",
			dark: "catppuccin-mocha",
		},
		config: (md) => {
			configureDiagramsPlugin(md, {
				krokiServerUrl: process.env.KROKI_SERVER_URL,
			});
		},
	},

	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: "Home", link: "/" },
			{ text: "Overview", link: "/overview" },
			{ text: "Docs", link: "/docs" },
		],

		sidebar: [
			{
				text: "Overview",
				items: [{ text: "Overview", link: "/overview" }],
			},
			{
				text: "Docs",
				items: [
					{
						text: "Use Case",
						collapsed: true,
						items: [
							{
								text: "User",
								link: "/docs/use-case/user",
							},
							{
								text: "Customer",
								link: "/docs/use-case/customer",
							},
							{
								text: "Staff",
								link: "/docs/use-case/staff",
							},
							{
								text: "Admin",
								link: "/docs/use-case/admin",
							},
						],
					},
					{
						text: "Sequence",
						collapsed: true,
						items: [
							{
								text: "Adjust and Track Bookings",
								collapsed: true,
								items: [
									{
										text: "Add New Booking",
										link: "/docs/sequence/adjust-and-track-bookings/add-new-booking",
									},
									{
										text: "Delete Booking",
										link: "/docs/sequence/adjust-and-track-bookings/delete-booking",
									},
									{
										text: "Edit Pre-departure Booking",
										link: "/docs/sequence/adjust-and-track-bookings/edit-pre-departure-booking",
									},
									{
										text: "View and Filter Bookings",
										link: "/docs/sequence/adjust-and-track-bookings/view-and-filter-bookings",
									},
									{
										text: "View Booking Details",
										link: "/docs/sequence/adjust-and-track-bookings/view-booking-details",
									},
									{
										text: "View Booking's Invoice",
										link: "/docs/sequence/adjust-and-track-bookings/view-booking's-invoice",
									},
									{
										text: "UCS-Adjust-and-Track-Bookings",
										link: "/docs/sequence/adjust-and-track-bookings/UCS-adjust-and-track-bookings",
									},
								],
							},
							{
								text: "Adjust Cart",
								collapsed: true,
								items: [
									{
										text: "Add Trip to Cart",
										link: "/docs/sequence/adjust-cart/add-trip-to-cart",
									},
									{
										text: "Edit Trip Details",
										link: "/docs/sequence/adjust-cart/edit-trip-details",
									},
									{
										text: "Remove Trip from Cart",
										link: "/docs/sequence/adjust-cart/remove-trip-from-cart",
									},
									{
										text: "View and Filter Trips in Cart",
										link: "/docs/sequence/adjust-cart/view-and-filter-trips-in-cart",
									},
								],
							},
							{
								text: "Adjust Customers",
								collapsed: true,
								items: [
									{
										text: "Add New Customer",
										link: "/docs/sequence/adjust-customers/add-new-customer",
									},
									{
										text: "Delete Customer",
										link: "/docs/sequence/adjust-customers/delete-customer",
									},
									{
										text: "Edit Customer",
										link: "/docs/sequence/adjust-customers/edit-customer",
									},
									{
										text: "View Customer Details",
										link: "/docs/sequence/adjust-customers/view-customer-details",
									},
									{
										text: "View and Filter Customers",
										link: "/docs/sequence/adjust-customers/view-and-filter-customers",
									},
									{
										text: "UCS-Adjust-Customers",
										link: "/docs/sequence/adjust-customers/UCS-adjust-customers",
									},
								],
							},
							{
								text: "Adjust Favorite Trips",
								collapsed: true,
								items: [
									{
										text: "Toggle Favorite Trip",
										link: "/docs/sequence/adjust-favorite-trips/toggle-favorite-trip",
									},
									{
										text: "View and Filter Favorite Trips",
										link: "/docs/sequence/adjust-favorite-trips/view-and-filter-favorite-trips",
									},
								],
							},
							{
								text: "Adjust Staffs",
								collapsed: true,
								items: [
									{
										text: "Add New Staff",
										link: "/docs/sequence/adjust-staffs/add-new-staff",
									},
									{
										text: "Delete Staff",
										link: "/docs/sequence/adjust-staffs/delete-staff",
									},
									{
										text: "Edit Staff",
										link: "/docs/sequence/adjust-staffs/edit-staff",
									},
									{
										text: "View Staff Details",
										link: "/docs/sequence/adjust-staffs/view-staff-details",
									},
									{
										text: "View and Filter Staffs",
										link: "/docs/sequence/adjust-staffs/view-and-filter-staffs",
									},
									{
										text: "UCS-Adjust-Staffs",
										link: "/docs/sequence/adjust-staffs/UCS-adjust-staffs",
									},
								],
							},
							{
								text: "Auth",
								collapsed: true,
								items: [
									{ text: "Sign In", link: "/docs/sequence/auth/sign-in" },
									{ text: "Sign Up", link: "/docs/sequence/auth/sign-up" },
									{
										text: "Forgot Password",
										link: "/docs/sequence/auth/forgot-password",
									},
									{
										text: "Manage Profile",
										link: "/docs/sequence/auth/manage-profile",
									},
									{ text: "UCS-Auth", link: "/docs/sequence/auth/UCS-auth" },
								],
							},
							{
								text: "Browse Trips",
								collapsed: true,
								items: [
									{
										text: "View and Filter Available Trips",
										link: "/docs/sequence/browse-trips/view-and-filter-available-trips",
									},
									{
										text: "View Trip Details",
										link: "/docs/sequence/browse-trips/view-trip-details",
									},
								],
							},
							{
								text: "Manage Attraction",
								collapsed: true,
								items: [
									{
										text: "Add New Attraction",
										link: "/docs/sequence/manage-attraction/add-new-attraction",
									},
									{
										text: "Delete Attraction",
										link: "/docs/sequence/manage-attraction/delete-attraction",
									},
									{
										text: "Edit Attraction Detail",
										link: "/docs/sequence/manage-attraction/edit-attraction-detail",
									},
									{
										text: "View Attraction Detail",
										link: "/docs/sequence/manage-attraction/view-attraction-detail",
									},
									{
										text: "View and Filter Attractions",
										link: "/docs/sequence/manage-attraction/view-and-filter-attractions",
									},
									{
										text: "UCS-Manage-Attraction",
										link: "/docs/sequence/manage-attraction/UCS-manage-attraction",
									},
								],
							},
							{
								text: "Manage Personal Booking",
								collapsed: true,
								items: [
									{
										text: "Book a Trip",
										link: "/docs/sequence/manage-personal-booking/book-a-trip",
									},
									{
										text: "Checkout Cart",
										link: "/docs/sequence/manage-personal-booking/checkout-cart",
									},
									{
										text: "Edit Upcoming Trip's Passenger Details",
										link: "/docs/sequence/manage-personal-booking/edit-upcoming-trip's-passenger-details",
									},
									{
										text: "View and Filter Personal Bookings",
										link: "/docs/sequence/manage-personal-booking/view-and-filter-personal-bookings",
									},
									{
										text: "View and Pay Booking Invoice Details",
										link: "/docs/sequence/manage-personal-booking/view-and-pay-booking-invoice-details",
									},
									{
										text: "UCS-Manage-Personal-Booking",
										link: "/docs/sequence/manage-personal-booking/UCS-manage-personal-booking",
									},
								],
							},
							{
								text: "Manage Route Schedule",
								collapsed: true,
								items: [
									{
										text: "Add Itinerary",
										link: "/docs/sequence/manage-route-schedule/add-itinerary",
									},
									{
										text: "Delete Itinerary",
										link: "/docs/sequence/manage-route-schedule/delete-itinerary",
									},
									{
										text: "Edit Itinerary",
										link: "/docs/sequence/manage-route-schedule/edit-itinerary",
									},
									{
										text: "View Route Schedule",
										link: "/docs/sequence/manage-route-schedule/view-route-schedule",
									},
									{
										text: "UCS-Manage-Route-Schedule",
										link: "/docs/sequence/manage-route-schedule/UCS-manage-route-schedule",
									},
								],
							},
							{
								text: "Manage Routes",
								collapsed: true,
								items: [
									{
										text: "Add New Route",
										link: "/docs/sequence/manage-routes/add-new-route",
									},
									{
										text: "Delete Route",
										link: "/docs/sequence/manage-routes/delete-route",
									},
									{
										text: "Edit Route Details",
										link: "/docs/sequence/manage-routes/edit-route-details",
									},
									{
										text: "View Route Detail",
										link: "/docs/sequence/manage-routes/view-route-detail",
									},
									{
										text: "View and Filter Routes",
										link: "/docs/sequence/manage-routes/view-and-filter-routes",
									},
									{
										text: "UCS-Manage-Routes",
										link: "/docs/sequence/manage-routes/UCS-manage-routes",
									},
								],
							},
							{
								text: "Manage Trips",
								collapsed: true,
								items: [
									{
										text: "Add New Booking for Trip",
										link: "/docs/sequence/manage-trips/add-new-booking-for-trip",
									},
									{
										text: "Add New Trip",
										link: "/docs/sequence/manage-trips/add-new-trip",
									},
									{
										text: "Delete Trip",
										link: "/docs/sequence/manage-trips/delete-trip",
									},
									{
										text: "Edit Trip",
										link: "/docs/sequence/manage-trips/edit-trip",
									},
									{
										text: "View Trip Details",
										link: "/docs/sequence/manage-trips/view-trip-details",
									},
									{
										text: "View and Filter Trips",
										link: "/docs/sequence/manage-trips/view-and-filter-trips",
									},
									{
										text: "UCS-Manage-Trips",
										link: "/docs/sequence/manage-trips/UCS-manage-trips",
									},
								],
							},
							{
								text: "View Reports",
								collapsed: true,
								items: [
									{
										text: "Revenue Report",
										link: "/docs/sequence/view-reports/revenue-report",
									},
									{
										text: "Booking Report",
										link: "/docs/sequence/view-reports/booking-report",
									},
									{
										text: "Popular Routes Report",
										link: "/docs/sequence/view-reports/popular-routes-report",
									},
									{
										text: "Customer Report",
										link: "/docs/sequence/view-reports/customer-report",
									},
									{
										text: "Export Report",
										link: "/docs/sequence/view-reports/export-report",
									},
									{
										text: "UCS-View-Reports",
										link: "/docs/sequence/view-reports/UCS-view-reports",
									},
								],
							},
						],
					},
					{
						text: "Activity",
						collapsed: true,
						items: [
							{
								text: "Adjust Cart",
								collapsed: true,
								items: [
									{
										text: "Add Trip to Cart",
										link: "/docs/activity/adjust-cart/add-trip-to-cart",
									},
									{
										text: "Edit Trip Details",
										link: "/docs/activity/adjust-cart/edit-trip-details",
									},
									{
										text: "Remove Trip from Cart",
										link: "/docs/activity/adjust-cart/remove-trip-from-cart",
									},
									{
										text: "View and Filter Trips in Cart",
										link: "/docs/activity/adjust-cart/view-and-filter-trips-in-cart",
									},
									{
										text: "UCS-Adjust-Cart",
										link: "/docs/activity/adjust-cart/UCS-adjust-cart",
									},
								],
							},
							{
								text: "Adjust Favorite Trips",
								collapsed: true,
								items: [
									{
										text: "Toggle Favorite Trip",
										link: "/docs/activity/adjust-favorite-trips/toggle-favorite-trip",
									},
									{
										text: "View and Filter Favorite Trips",
										link: "/docs/activity/adjust-favorite-trips/view-and-filter-favorite-trips",
									},
								],
							},
							{
								text: "Auth",
								collapsed: true,
								items: [
									{ text: "Sign In", link: "/docs/activity/auth/sign-in" },
									{ text: "Sign Up", link: "/docs/activity/auth/sign-up" },
									{
										text: "Forgot Password",
										link: "/docs/activity/auth/forgot-password",
									},
									{
										text: "Manage Profile",
										link: "/docs/activity/auth/manage-profile",
									},
								],
							},
							{
								text: "Browse Trips",
								collapsed: true,
								items: [
									{
										text: "View and Filter Available Trips",
										link: "/docs/activity/browse-trips/view-and-filter-available-trips",
									},
									{
										text: "View Trip Details",
										link: "/docs/activity/browse-trips/view-trip-details",
									},
								],
							},
							{
								text: "Manage Personal Booking",
								collapsed: true,
								items: [
									{
										text: "Book a Trip",
										link: "/docs/activity/manage-personal-booking/book-a-trip",
									},
									{
										text: "Checkout Cart",
										link: "/docs/activity/manage-personal-booking/checkout-cart",
									},
									{
										text: "Edit Upcoming Trip's Passenger Details",
										link: "/docs/activity/manage-personal-booking/edit-upcoming-trip's-passenger-details",
									},
									{
										text: "View and Filter Personal Bookings",
										link: "/docs/activity/manage-personal-booking/view-and-filter-personal-bookings",
									},
									{
										text: "View and Pay Booking Invoice Details",
										link: "/docs/activity/manage-personal-booking/view-and-pay-booking-invoice-details",
									},
									{
										text: "UCS-Manage-Personal-Booking",
										link: "/docs/activity/manage-personal-booking/UCS-manage-personal-booking",
									},
								],
							},
							{
								text: "Manage Routes",
								collapsed: true,
								items: [
									{
										text: "Add New Route",
										link: "/docs/activity/manage-routes/add-new-route",
									},
									{
										text: "Delete Route",
										link: "/docs/activity/manage-routes/delete-route",
									},
									{
										text: "Edit Route Details",
										link: "/docs/activity/manage-routes/edit-route-details",
									},
									{
										text: "View and Filter Routes",
										link: "/docs/activity/manage-routes/view-and-filter-routes",
									},
									{
										text: "View Route Detail",
										link: "/docs/activity/manage-routes/view-route-detail",
									},
									{
										text: "UCS-Manage-Routes",
										link: "/docs/activity/manage-routes/UCS-manage-routes",
									},
								],
							},
							{
								text: "Manage Route Schedule",
								collapsed: true,
								items: [
									{
										text: "Add Itinerary",
										link: "/docs/activity/manage-route-schedule/add-itinerary",
									},
									{
										text: "Delete Itinerary",
										link: "/docs/activity/manage-route-schedule/delete-itinerary",
									},
									{
										text: "Edit Itinerary",
										link: "/docs/activity/manage-route-schedule/edit-itinerary",
									},
									{
										text: "View Route Schedule",
										link: "/docs/activity/manage-route-schedule/view-route-schedule",
									},
									{
										text: "UCS-Manage-Route-Schedule",
										link: "/docs/activity/manage-route-schedule/UCS-manage-route-schedule",
									},
								],
							},
							{
								text: "Manage Attraction",
								collapsed: true,
								items: [
									{
										text: "Add New Attraction",
										link: "/docs/activity/manage-attraction/add-new-attraction",
									},
									{
										text: "Delete Attraction",
										link: "/docs/activity/manage-attraction/delete-attraction",
									},
									{
										text: "Edit Attraction Detail",
										link: "/docs/activity/manage-attraction/edit-attraction-detail",
									},
									{
										text: "View Attraction Detail",
										link: "/docs/activity/manage-attraction/view-attraction-detail",
									},
									{
										text: "View and Filter Attractions",
										link: "/docs/activity/manage-attraction/view-and-filter-attractions",
									},
									{
										text: "UCS-Manage-Attraction",
										link: "/docs/activity/manage-attraction/UCS-manage-attraction",
									},
								],
							},
							{
								text: "Adjust Customers",
								collapsed: true,
								items: [
									{
										text: "Add New Customer",
										link: "/docs/activity/adjust-customers/add-new-customer",
									},
									{
										text: "Delete Customer",
										link: "/docs/activity/adjust-customers/delete-customer",
									},
									{
										text: "Edit Customer",
										link: "/docs/activity/adjust-customers/edit-customer",
									},
									{
										text: "View Customer Details",
										link: "/docs/activity/adjust-customers/view-customer-details",
									},
									{
										text: "View and Filter Customers",
										link: "/docs/activity/adjust-customers/view-and-filter-customers",
									},
									{
										text: "UCS-Adjust-Customers",
										link: "/docs/activity/adjust-customers/UCS-adjust-customers",
									},
								],
							},
							{
								text: "Adjust Staffs",
								collapsed: true,
								items: [
									{
										text: "Add New Staff",
										link: "/docs/activity/adjust-staffs/add-new-staff",
									},
									{
										text: "Delete Staff",
										link: "/docs/activity/adjust-staffs/delete-staff",
									},
									{
										text: "Edit Staff",
										link: "/docs/activity/adjust-staffs/edit-staff",
									},
									{
										text: "View Staff Details",
										link: "/docs/activity/adjust-staffs/view-staff-details",
									},
									{
										text: "View and Filter Staffs",
										link: "/docs/activity/adjust-staffs/view-and-filter-staffs",
									},
									{
										text: "UCS-Adjust-Staffs",
										link: "/docs/activity/adjust-staffs/UCS-adjust-staffs",
									},
								],
							},
							{
								text: "Manage Trips",
								collapsed: true,
								items: [
									{
										text: "Add New Trip",
										link: "/docs/activity/manage-trips/add-new-trip",
									},
									{
										text: "Add New Booking for Trip",
										link: "/docs/activity/manage-trips/add-new-booking-for-trip",
									},
									{
										text: "Delete Trip",
										link: "/docs/activity/manage-trips/delete-trip",
									},
									{
										text: "Edit Trip",
										link: "/docs/activity/manage-trips/edit-trip",
									},
									{
										text: "View Trip Details",
										link: "/docs/activity/manage-trips/view-trip-details",
									},
									{
										text: "View and Filter Trips",
										link: "/docs/activity/manage-trips/view-and-filter-trips",
									},
									{
										text: "UCS-Manage-Trips",
										link: "/docs/activity/manage-trips/UCS-manage-trips",
									},
								],
							},
							{
								text: "Adjust and Track Bookings",
								collapsed: true,
								items: [
									{
										text: "Add New Booking",
										link: "/docs/activity/adjust-and-track-bookings/add-new-booking",
									},
									{
										text: "Delete Booking",
										link: "/docs/activity/adjust-and-track-bookings/delete-booking",
									},
									{
										text: "Edit Pre-Departure Booking",
										link: "/docs/activity/adjust-and-track-bookings/edit-pre-departure-booking",
									},
									{
										text: "View Booking Details",
										link: "/docs/activity/adjust-and-track-bookings/view-booking-details",
									},
									{
										text: "View and Filter Bookings",
										link: "/docs/activity/adjust-and-track-bookings/view-and-filter-bookings",
									},
									{
										text: "View Booking's Invoice",
										link: "/docs/activity/adjust-and-track-bookings/view-booking's-invoice",
									},
									{
										text: "UCS-Adjust-and-Track-Bookings",
										link: "/docs/activity/adjust-and-track-bookings/UCS-adjust-and-track-bookings",
									},
								],
							},
							{
								text: "View Reports",
								collapsed: true,
								items: [
									{
										text: "Revenue Report",
										link: "/docs/activity/view-reports/revenue-report",
									},
									{
										text: "Booking Report",
										link: "/docs/activity/view-reports/booking-report",
									},
									{
										text: "Popular Routes Report",
										link: "/docs/activity/view-reports/popular-routes-report",
									},
									{
										text: "Customer Report",
										link: "/docs/activity/view-reports/customer-report",
									},
								],
							},
						],
					},
					{
						text: "Database",
						link: "/docs/database",
					},
					{
						text: "Function Lists",
						link: "/docs/function-list",
					},
					{
						text: "SRS",
						link: "/docs/srs",
					},
				],
			},
		],

		search: {
			provider: "local",
		},

		socialLinks: [
			{
				icon: "github",
				link: "https://github.com/SE357-TMS",
			},
		],
	},
});
