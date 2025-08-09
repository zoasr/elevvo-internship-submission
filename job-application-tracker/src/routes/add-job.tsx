import { createFileRoute } from "@tanstack/react-router";
import JobForm from "../components/JobForm";

export const Route = createFileRoute("/add-job")({
	component: AddJob,
});

function AddJob() {
	return (
		<div className="space-y-8">
			<JobForm />
		</div>
	);
}
