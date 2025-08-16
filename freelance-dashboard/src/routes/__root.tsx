import {
	createRootRoute,
	Link,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import type { FileRoutesByTo } from "../routeTree.gen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Bell } from "lucide-react";
import {
	useNotifications,
	useNotificationsActions,
	type Notification,
} from "@/store";
import { memo, useEffect, useMemo, useState } from "react";
import { formatTime } from "@/lib/utils";

export const Route = createRootRoute({
	component: RootComponent,
});

export function NavItem({
	to,
	children,
	onNavigate,
}: {
	to: keyof FileRoutesByTo;
	children: React.ReactNode;
	onNavigate?: () => void;
}) {
	return (
		<Link
			to={to}
			className="flex items-center gap-2 rounded-md px-3 py-2 text-sm bg-accent hover:bg-primary [&.active]:bg-primary [&.active]:text-primary-foreground hover:text-primary-foreground transition-[background-color,color] duration-100 [timing-function:ease-in-out]"
			activeProps={{ className: "active font-medium" }}
			onClick={onNavigate}
		>
			{children}
		</Link>
	);
}

const NotificationItem = memo(
	({ notification: n }: { notification: Notification }) => {
		const [_, setupdate] = useState(false);
		const { markAsRead } = useNotificationsActions();

		useEffect(() => {
			const interval = setInterval(() => {
				setupdate((prev) => !prev);
			}, 5000);
			return () => clearInterval(interval);
		}, []);

		const timeDiff = formatTime(n.time);
		return (
			<li
				key={n.id}
				className={`flex items-start gap-3 rounded-md p-2 hover:bg-accent ${!n.read ? "bg-accent" : ""}`}
				onClick={() => markAsRead(n.id)}
			>
				<div
					className={`mt-0.5 h-2 w-2 rounded-full ${!n.read ? "bg-primary" : "bg-transparent"} flex-shrink-0`}
				/>
				<div className="grid gap-0.5">
					<div className="text-sm font-medium leading-tight">
						{n.title}
					</div>
					<div className="text-xs text-muted-foreground">
						{n.description}
					</div>
				</div>
				{timeDiff && (
					<div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
						{timeDiff}
					</div>
				)}
			</li>
		);
	}
);

const NotificationDropdown = memo(() => {
	const [page, setPage] = useState(0);
	const notifications = useNotifications();
	const { markAllAsRead } = useNotificationsActions();

	const pageSize = 5;
	const limitedNotifications = useMemo(
		() => notifications.slice(page * pageSize, (page + 1) * pageSize),
		[notifications, page]
	);

	const notificationsEls = useMemo(
		() =>
			limitedNotifications.map((n) => (
				<NotificationItem notification={n} />
			)),
		[limitedNotifications]
	);

	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button
					variant="ghost"
					size="icon"
					className="h-9 w-9 relative"
					aria-label="Notifications"
				>
					<Bell />
					{notifications.filter((n) => !n.read).length > 0 && (
						<span className="absolute top-0 right-0 rounded-full bg-primary text-primary-foreground aspect-square w-4 flex-shrink-0">
							{notifications.filter((n) => !n.read).length}
						</span>
					)}
				</Button>
			</PopoverTrigger>
			<PopoverContent asChild>
				<div className=" mt-2 w-80 rounded-md border bg-white shadow-lg focus:outline-none">
					<div className="p-3 border-b flex items-center justify-between">
						<div>
							<div className="text-sm font-medium">
								Notifications
							</div>
							<div className="text-xs text-muted-foreground">
								You have{" "}
								{notifications.filter((n) => !n.read).length}{" "}
								unread messages.
							</div>
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={() => markAllAsRead()}
						>
							Mark all as read
						</Button>
					</div>
					<ul className="max-h-[320px] overflow-auto p-2 divide-y divide-gray-200 space-y-2">
						{notificationsEls.length > 0 ? (
							notificationsEls
						) : (
							<li className="p-2 text-center">
								No More Notifications
							</li>
						)}
					</ul>
					<div className="border-t p-2 text-center">
						{page > 0 ? (
							<button
								className="text-xs text-primary hover:underline"
								onClick={() => setPage((prev) => prev - 1)}
							>
								View previous
							</button>
						) : (
							<button
								className="text-xs text-primary hover:underline"
								onClick={() => setPage((prev) => prev + 1)}
							>
								View more
							</button>
						)}
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
});

function RootComponent() {
	const { matches } = useRouterState();
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="min-h-full text-gray-900 w-full ">
				<header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
					<div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
						<SidebarTrigger />
						<div className="font-semibold">
							Freelance Admin Dashboard
						</div>
						<div className="ml-auto flex items-center gap-2">
							<NotificationDropdown />
							<div className="text-sm text-accent-foreground bg-accent px-2 py-1 rounded-md ring-2 ring-primary/30">
								{matches[matches.length - 1].fullPath}
							</div>
						</div>
					</div>
				</header>

				<div className="mx-auto grid max-w-screen-2xl grid-cols-1 h-full w-full">
					<main className="p-4 md:p-6 h-full">
						<Outlet />
					</main>
				</div>
			</div>
		</SidebarProvider>
	);
}
