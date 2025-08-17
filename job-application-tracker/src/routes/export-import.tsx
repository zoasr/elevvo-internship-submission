import {
	AlertDialog,
	AlertDialogTitle,
	AlertDialogHeader,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogCancel,
	AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { JobExportSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { useJobs, useJobsActions } from "@/store/jobs";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod/v4";
import { useState } from "react";
import Dropzone from "react-dropzone";

export const Route = createFileRoute("/export-import")({
	component: RouteComponent,
});

function saveJsonFile(data: any) {
	const blob = new Blob([JSON.stringify(data)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	const today = new Date().toISOString().split("T")[0];
	a.download = `job-applications-${today}.json`;
	a.click();
}

function RouteComponent() {
	const [isDragging, setIsDragging] = useState(false);
	const [dialogOpen, setDialogOpen] = useState(false);
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<string | null>(null);
	const jobs = useJobs();
	const { setJobs } = useJobsActions();
	const handleDrop = (acceptedFiles: File[]) => {
		const file = acceptedFiles[0];
		if (!file) return;

		const isJsonType = file.name.toLowerCase().endsWith(".json");

		if (!isJsonType) {
			setError("Please upload a valid JSON file.");
			return;
		}

		const reader = new FileReader();
		reader.onload = (e) => {
			try {
				const data = JSON.parse(e.target?.result as string);
				// convert date strings to dates
				const dataWithDates = data.map((job: any) => ({
					...job,
					date: new Date(job.date || 0),
				}));

				const parsedData = JobExportSchema.safeParse(dataWithDates);
				if (!parsedData.success) {
					setError(z.prettifyError(parsedData.error));
					return;
				}

				setData(parsedData.data);
				setDialogOpen(true);
				setError(null);
			} catch (err) {
				if (err instanceof Error) {
					setError(err.message);
					console.error(err);
				}
			}
		};
		reader.readAsText(file);
		setIsDragging(false);
		setError(null);
	};
	const handleImport = (data: any) => {
		setJobs(data);
		setDialogOpen(false);
	};
	const handleAppend = (data: any) => {
		setJobs([...jobs, ...data]);
		setDialogOpen(false);
	};
	return (
		<div className="flex flex-col gap-4 container mx-auto max-w-md">
			<h1 className="text-2xl font-bold">Export and Import</h1>
			<p className="text-sm text-gray-500">
				Export and import your job application data to and from a json
				file.
			</p>
			<div className="flex flex-col gap-2">
				<Button onClick={() => saveJsonFile(jobs)}>Export</Button>
				<Dropzone
					onDrop={handleDrop}
					onDragEnter={() => setIsDragging(true)}
					onDragLeave={() => setIsDragging(false)}
				>
					{({ getRootProps, getInputProps }) => (
						<div
							{...getRootProps()}
							className={cn(
								"w-full flex bg-muted flex-col gap-4 items-center justify-center border-1 border-primary border-dashed rounded-[10px] p-4 transition-all duration-300",
								isDragging && "bg-primary/20 border-4"
							)}
						>
							<input {...getInputProps()} />
							<p className="text-sm text-muted-foreground">
								Drag and drop a json file here
							</p>
							<p className="text-xs text-muted-foreground">or</p>
							<Button>
								<span>Browse</span>
							</Button>
						</div>
					)}
				</Dropzone>

				<em
					className="text-red-500 text-center font-bold grid data-[shown=true]:grid-rows-1 data-[shown=false]:sr-only grid-rows-0 transition-all duration-300 ease-in-out bg-red-500/20 rounded-md p-2"
					data-shown={!!error}
				>
					{error}
				</em>
				<em
					className="text-green-500 text-center font-bold grid data-[shown=true]:grid-rows-1 data-[shown=false]:sr-only grid-rows-0 transition-all duration-300 ease-in-out bg-green-500/20 rounded-md p-2"
					data-shown={!!data && !dialogOpen}
				>
					{Array.isArray(data) ? data.length : 0} jobs imported
					successfully
				</em>
			</div>
			<AlertDialog open={dialogOpen} onOpenChange={setDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>
							Are you sure you want to import this json file?
						</AlertDialogTitle>
						<AlertDialogDescription>
							This will replace all your current job applications
							with the ones in the file. you can press "Append to
							existing jobs" to add the jobs to your existing
							jobs.
						</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogCancel onClick={() => setDialogOpen(false)}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={() => handleAppend(data)}>
							Append to existing jobs
						</AlertDialogAction>
						<AlertDialogAction onClick={() => handleImport(data)}>
							Continue
						</AlertDialogAction>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</div>
	);
}
