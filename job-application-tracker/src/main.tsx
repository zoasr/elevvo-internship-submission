import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
	RouterProvider,
	createMemoryHistory,
	createRouter,
} from "@tanstack/react-router";
import reportWebVitals from "./reportWebVitals.ts";

import { routeTree } from "./routeTree.gen.ts";

import "./styles.css";

const memoryHistory = createMemoryHistory({
	initialEntries: ["/elevvo-internship-submission/job-application-tracker/"],
});
const router = createRouter({
	history: memoryHistory,
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	basepath: "/elevvo-internship-submission/job-application-tracker/",
});

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<RouterProvider router={router} />
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
