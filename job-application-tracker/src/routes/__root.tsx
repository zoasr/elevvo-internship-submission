import { createRootRoute, Outlet } from "@tanstack/react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const Route = createRootRoute({
	component: () => (
		<div className="min-h-[100dvh] grid grid-rows-[auto_minmax(300px,_1fr)_auto] ">
			<Header />
			<main className="container p-4 mx-auto w-full bg-background">
				<Outlet />
			</main>
			<Footer />
		</div>
	),
});
