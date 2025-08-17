import { Link } from "@tanstack/react-router";
import { Link as LinkIcon } from "lucide-react";
import {
	NavigationMenu,
	NavigationMenuLink,
	NavigationMenuList,
} from "./ui/navigation-menu";

export default function Header() {
	return (
		<header className="flex flex-col gap-4 bg-accent/50 justify-center items-center p-4 border-b-2 border-ring/30 sm:justify-between sm:flex-row text-primary h-fit rounded-b-xl shadow-md shadow-accent/30 z-10">
			<h1 className="text-xl">
				<Link to="/" className="hover:text-gray-300">
					Job Application Tracker
				</Link>
			</h1>
			<NavigationMenu className="flex justify-between">
				<NavigationMenuList>
					<NavigationMenuLink asChild className="bg-black/20">
						<Link
							to="/dashboard"
							className="inline-flex flex-row gap-2"
						>
							Dashboard
							<LinkIcon />
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild className="bg-black/20">
						<Link
							to="/add-job"
							className="inline-flex flex-row gap-2"
						>
							Add Job
							<LinkIcon />
						</Link>
					</NavigationMenuLink>
					<NavigationMenuLink asChild className="bg-black/20">
						<Link
							to="/export-import"
							className="inline-flex flex-row gap-2"
						>
							Export/Import Data
							<LinkIcon className="block" />
						</Link>
					</NavigationMenuLink>
				</NavigationMenuList>
			</NavigationMenu>
		</header>
	);
}
