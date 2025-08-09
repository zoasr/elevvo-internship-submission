import { createFileRoute } from "@tanstack/react-router";
import JobList from "../components/JobList";

export const Route = createFileRoute("/dashboard")({
	component: Dashboard,
});

function Dashboard() {
	return <JobList />;
}
