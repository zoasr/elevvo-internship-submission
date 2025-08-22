import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useJobs, useJobsActions } from "@/store/jobs";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import EditJobForm from "@/components/EditJobForm";
import { useState } from "react";
import { formatDate } from "date-fns";

export const Route = createFileRoute("/jobs/$jobId")({
	component: JobDetails,
});

function JobDetails() {
	const { jobId } = Route.useParams();
	const jobs = useJobs();
	const { deleteJob } = useJobsActions();
	const job = jobs.find((j) => j.id === jobId);
	const [open, setOpen] = useState(false);

	const router = useRouter();

	if (!job) {
		return (
			<div className="flex justify-center items-center w-full h-full text-4xl text-center">
				Job with id {jobId} not found
			</div>
		);
	}

	return (
		<Card className="max-w-[700px] mx-auto">
			<CardHeader>
				<CardTitle>{job.title}</CardTitle>
				<CardDescription>{job.company}</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="flex gap-2">
					<Badge>{job.status}</Badge>
					{job.date ? (
						<Badge>{formatDate(job.date, "do 'of' MMMM")}</Badge>
					) : null}
				</div>
				{job.notes ? (
					<CardDescription className="p-2 text-2xl bg-input rounded-md mt-2 ring-2 ring-primary/20">
						&quot; {job.notes} &quot;
					</CardDescription>
				) : null}
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Dialog open={open} onOpenChange={setOpen}>
					<DialogTrigger asChild>
						<Button>Edit</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Edit Job</DialogTitle>
							<DialogDescription>
								Make changes to your job application here. Click
								save when you&apos;re done.
							</DialogDescription>
						</DialogHeader>
						<EditJobForm job={job} onOpenChange={setOpen} />
					</DialogContent>
				</Dialog>
				<Button
					variant="destructive"
					onClick={() => {
						deleteJob(job);
						router.navigate({ to: "/" });
					}}
				>
					Delete
				</Button>
			</CardFooter>
		</Card>
	);
}
