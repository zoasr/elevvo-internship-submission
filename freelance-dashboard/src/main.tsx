import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
	RouterProvider,
	createHashHistory,
	createRouter,
} from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

const hashHistory = createHashHistory();
const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	history: hashHistory,
	basepath: "/elevvo-internship-submission/freelance-dashboard/",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
