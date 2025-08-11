import type { FileRoutesByTo } from "../routeTree.gen";
import {
	Sidebar,
	SidebarContent,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BarChart3, Briefcase, User } from "lucide-react";
import { NavItem } from "@/routes/__root";
export const AppSidebar = () => {
	const items = [
		{
			title: "Overview",
			url: "/",
			icon: BarChart3,
		},
		{
			title: "Projects",
			url: "/projects",
			icon: Briefcase,
		},
		{
			title: "Profile",
			url: "/profile",
			icon: User,
		},
	];
	return (
		<Sidebar>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Application</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							{items.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton asChild>
										<NavItem
											to={
												item.url as keyof FileRoutesByTo
											}
										>
											<span className="size-4">
												<item.icon className="size-4" />
											</span>
											{item.title}
										</NavItem>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
};
