import { create } from "zustand";

type Notification = {
	id: string;
	title: string;
	description: string;
	time: string;
	read: boolean;
};

type NotificationsState = {
	notifications: Notification[];
	actions: {
		addNotification: (
			notification: Omit<Notification, "id" | "read">
		) => void;
		markAsRead: (notificationId: string) => void;
		markAllAsRead: () => void;
	};
};

const useNotificationsStore = create<NotificationsState>((set) => ({
	notifications: [
		{
			id: "1",
			title: "New project assigned",
			description:
				"You have been assigned to a new project 'Website Redesign'.",
			time: "2m ago",
			read: false,
		},
		{
			id: "2",
			title: "Invoice paid",
			description: "Invoice #1023 has been paid by Acme Co.",
			time: "1h ago",
			read: false,
		},
		{
			id: "3",
			title: "Task due soon",
			description: "Task 'Homepage Hero' is due tomorrow.",
			time: "Yesterday",
			read: true,
		},
	],
	actions: {
		addNotification: (notification) =>
			set((state) => ({
				notifications: [
					{ ...notification, id: Date.now().toString(), read: false },
					...state.notifications,
				],
			})),
		markAsRead: (notificationId) =>
			set((state) => ({
				notifications: state.notifications.map((n) =>
					n.id === notificationId ? { ...n, read: true } : n
				),
			})),
		markAllAsRead: () =>
			set((state) => ({
				notifications: state.notifications.map((n) => ({
					...n,
					read: true,
				})),
			})),
	},
}));

export const useNotifications = () =>
	useNotificationsStore((select) => select.notifications);

export const useNotificationsActions = () =>
	useNotificationsStore((select) => select.actions);
