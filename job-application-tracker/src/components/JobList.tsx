import { useJobs } from "@/store/jobs";
import JobCard from "./JobCard";
import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function JobList() {
	const jobs = useJobs();

	return (
		<>
			{jobs.length > 0 ? (
				<div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
					{jobs.map((job) => (
						<JobCard key={job.id} job={job} />
					))}
				</div>
			) : (
				<div className="flex flex-col gap-8 justify-center items-center w-full h-full text-4xl text-center">
					No jobs found
					<Button>
						<Link to="/add-job">Add one</Link>
					</Button>
				</div>
			)}
		</>
	);
}
