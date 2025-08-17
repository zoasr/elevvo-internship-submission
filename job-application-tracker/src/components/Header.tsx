import { Link } from "@tanstack/react-router";
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu";

export default function Header() {
	return (
		<header className="flex flex-col justify-center items-center p-4 border-b-2 sm:justify-between sm:flex-row text-primary bg-background h-fit border-border">
			<h1 className="text-xl">
				<Link to="/" className="hover:text-gray-300">
					Job Application Tracker
				</Link>
			</h1>
			<NavigationMenu className="flex justify-between">
				<NavigationMenuList>
					<NavigationMenuLink asChild>
						<Link to="/dashboard">Dashboard</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link to="/add-job">Add Job</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild>
						<Link to="/export-import">Export/Import Data</Link>
					</NavigationMenuLink>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
