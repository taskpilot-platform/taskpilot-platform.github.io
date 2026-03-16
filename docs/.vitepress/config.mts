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
					text: "Sequence",
					collapsed: true,
					items: [
						{
							text: "Authentication (Auth)",
							collapsed: true,
							items: [
								{
									text: "Login / Sign In",
									link: "/docs/sequence/auth/login",
								},
								{
									text: "Register / Sign Up",
									link: "/docs/sequence/auth/register",
								},
								{
									text: "Forgot Password",
									link: "/docs/sequence/auth/forgot-password",
								},
								{
									text: "Reset Password",
									link: "/docs/sequence/auth/reset-password",
								},
							],
						},
						{
							text: "User Profile",
							collapsed: true,
							items: [
								{
									text: "Update Personal Information",
									link: "/docs/sequence/user-profile/update-personal-information",
								},
								{
									text: "View User Profile",
									link: "/docs/sequence/user-profile/view-user-profile",
								},
								{
									text: "Delete Personal Account",
									link: "/docs/sequence/user-profile/delete-personal-account",
								},
							],
						},
						{
							text: "User Skills",
							collapsed: true,
							items: [
								{
									text: "View Personal Skill List",
									link: "/docs/sequence/user-skills/view-personal-skill-list",
								},
								{
									text: "View Personal Skill Details",
									link: "/docs/sequence/user-skills/view-personal-skill-details",
								},
								{
									text: "Add Personal Skill",
									link: "/docs/sequence/user-skills/add-personal-skill",
								},
								{
									text: "Update Personal Skill",
									link: "/docs/sequence/user-skills/update-personal-skill",
								},
								{
									text: "Delete Personal Skill",
									link: "/docs/sequence/user-skills/delete-personal-skill",
								},
							],
						},
						{
							text: "System Administration (Admin)",
							collapsed: true,
							items: [
								{
									text: "Configure System Parameters",
									link: "/docs/sequence/admin/configure-system-parameters",
								},
								{
									text: "View System Skill Directory",
									link: "/docs/sequence/admin/view-system-skill-directory",
								},
								{
									text: "Add System Skill",
									link: "/docs/sequence/admin/add-system-skill",
								},
								{
									text: "Edit System Skill",
									link: "/docs/sequence/admin/edit-system-skill",
								},
								{
									text: "Delete System Skill",
									link: "/docs/sequence/admin/delete-system-skill",
								},
								{
									text: "View Global User List",
									link: "/docs/sequence/admin/view-global-user-list",
								},
								{
									text: "Add System User",
									link: "/docs/sequence/admin/add-system-user",
								},
								{
									text: "Edit System User",
									link: "/docs/sequence/admin/edit-system-user",
								},
								{
									text: "Delete System User",
									link: "/docs/sequence/admin/delete-system-user",
								},
							],
						},
						{
							text: "Project Management",
							collapsed: true,
							items: [
								{
									text: "View Joined Projects",
									link: "/docs/sequence/project-management/view-joined-projects",
								},
								{
									text: "Create New Project",
									link: "/docs/sequence/project-management/create-new-project",
								},
								{
									text: "View Project Details / Summary",
									link: "/docs/sequence/project-management/view-project-details",
								},
								{
									text: "Update Project Information",
									link: "/docs/sequence/project-management/update-project-information",
								},
								{
									text: "Join Project (via Link/Code)",
									link: "/docs/sequence/project-management/join-project",
								},
								{
									text: "Leave Project",
									link: "/docs/sequence/project-management/leave-project",
								},
								{
									text: "Close / Archive Project",
									link: "/docs/sequence/project-management/close-archive-project",
								},
							],
						},
						{
							text: "Project Members",
							collapsed: true,
							items: [
								{
									text: "View Project Member List",
									link: "/docs/sequence/project-members/view-project-member-list",
								},
								{
									text: "View Member Details",
									link: "/docs/sequence/project-members/view-member-details",
								},
								{
									text: "Add Member to Project",
									link: "/docs/sequence/project-members/add-member-to-project",
								},
								{
									text: "Update Member Role",
									link: "/docs/sequence/project-members/update-member-role",
								},
								{
									text: "Remove Member from Project",
									link: "/docs/sequence/project-members/remove-member-from-project",
								},
							],
						},
						{
							text: "Sprint Management (Agile)",
							collapsed: true,
							items: [
								{
									text: "View Sprint List",
									link: "/docs/sequence/sprint-management/view-sprint-list",
								},
								{
									text: "View Sprint Details",
									link: "/docs/sequence/sprint-management/view-sprint-details",
								},
								{
									text: "Create New Sprint",
									link: "/docs/sequence/sprint-management/create-new-sprint",
								},
								{
									text: "Update Sprint Information",
									link: "/docs/sequence/sprint-management/update-sprint-information",
								},
								{
									text: "Start / Complete Sprint",
									link: "/docs/sequence/sprint-management/start-complete-sprint",
								},
								{
									text: "Delete Sprint",
									link: "/docs/sequence/sprint-management/delete-sprint",
								},
							],
						},
						{
							text: "Task Management",
							collapsed: true,
							items: [
								{
									text: "View Kanban Board",
									link: "/docs/sequence/task-management/view-kanban-board",
								},
								{
									text: "View Backlog",
									link: "/docs/sequence/task-management/view-backlog",
								},
								{
									text: "View Workload",
									link: "/docs/sequence/task-management/view-workload",
								},
								{
									text: "View Task Details",
									link: "/docs/sequence/task-management/view-task-details",
								},
								{
									text: "Create New Task / Sub-task",
									link: "/docs/sequence/task-management/create-new-task",
								},
								{
									text: "Update Task Information",
									link: "/docs/sequence/task-management/update-task-information",
								},
								{
									text: "Update Task Status (Drag & Drop)",
									link: "/docs/sequence/task-management/update-task-status",
								},
								{
									text: "Assign Assignee & Reporter",
									link: "/docs/sequence/task-management/assign-assignee-reporter",
								},
								{
									text: "Delete Task",
									link: "/docs/sequence/task-management/delete-task",
								},
							],
						},
						{
							text: "Interaction & Communication",
							collapsed: true,
							items: [
								{
									text: "View Comments",
									link: "/docs/sequence/interaction-communication/view-comments",
								},
								{
									text: "Write Comment",
									link: "/docs/sequence/interaction-communication/write-comment",
								},
								{
									text: "Edit Comment",
									link: "/docs/sequence/interaction-communication/edit-comment",
								},
								{
									text: "Delete Comment",
									link: "/docs/sequence/interaction-communication/delete-comment",
								},
							],
						},
						{
							text: "Notification Management",
							collapsed: true,
							items: [
								{
									text: "Receive Notification",
									link: "/docs/sequence/notification-management/receive-notification",
								},
								{
									text: "Mark Notification as Read",
									link: "/docs/sequence/notification-management/mark-notification-as-read",
								},
							],
						},
						{
							text: "AI Assistant",
							collapsed: true,
							items: [
								{
									text: "Create New AI Chat Session",
									link: "/docs/sequence/ai-assistant/create-new-ai-chat-session",
								},
								{
									text: "Chat with AI",
									link: "/docs/sequence/ai-assistant/chat-with-ai",
								},
								{
									text: "View AI Chat History",
									link: "/docs/sequence/ai-assistant/view-ai-chat-history",
								},
								{
									text: "View AI Activity Logs",
									link: "/docs/sequence/ai-assistant/view-ai-activity-logs",
								},
								{
									text: "Request AI Auto-Assignment",
									link: "/docs/sequence/ai-assistant/request-ai-auto-assignment",
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
