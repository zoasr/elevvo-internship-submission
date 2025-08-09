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

export default function JobCard({ job }: { job: Job }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{job.title}</CardTitle>
				<CardDescription>{job.company}</CardDescription>
			</CardHeader>
			<CardContent>
				<Badge>{job.status}</Badge>
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
