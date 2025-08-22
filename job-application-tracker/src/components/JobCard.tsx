import type { Job } from "@/types/jobs";
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
import { Link } from "@tanstack/react-router";
import { formatDate } from "date-fns";

export default function JobCard({ job }: { job: Job }) {
	return (
		<Card className="grid border-2 border-ring">
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
					<CardDescription className="p-2 text-2xl bg-input rounded-[5px] mt-4 ring-2 ring-ring/30">
						&quot; {job.notes} &quot;
					</CardDescription>
				) : null}
			</CardContent>
			<CardFooter className="flex gap-2 justify-end">
				<Button asChild>
					<Link to={`/jobs/$jobId`} params={{ jobId: job.id }}>
						View
					</Link>
				</Button>
			</CardFooter>
		</Card>
	);
}
