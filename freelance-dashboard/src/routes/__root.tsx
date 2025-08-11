import {
	createRootRoute,
	Link,
	Outlet,
	useRouterState,
} from "@tanstack/react-router";
import type { FileRoutesByTo } from "../routeTree.gen";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

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
			className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 [&.active]:bg-gray-200"
			activeProps={{ className: "active font-medium" }}
			onClick={onNavigate}
		>
			{children}
		</Link>
	);
}

function RootComponent() {
	const { matches } = useRouterState();
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="min-h-full text-gray-900 w-full ">
				<header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur">
					<div className="mx-auto flex h-14 max-w-screen-2xl items-center gap-3 px-4">
						<SidebarTrigger />
						<div className="font-semibold">Freelance Admin</div>
						<div className="ml-auto text-sm text-gray-500">
							{matches[matches.length - 1].fullPath}
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
