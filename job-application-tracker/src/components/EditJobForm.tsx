import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useJobsActions } from "@/store/jobs";
import type { Job } from "@/types/jobs";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

export default function EditJobForm({
	job,
	onOpenChange,
}: {
	job: Job;
	onOpenChange: (open: boolean) => void;
}) {
	const { updateJob } = useJobsActions();
	const form = useForm({
		validators: {
			onChange: z.object({
				title: z.string(),
				company: z.string(),
				status: z.union([
					z.literal("Applied"),
					z.literal("Interviewing"),
					z.literal("Offer"),
					z.literal("Rejected"),
					z.literal("Accepted"),
					z.literal("Not selected by the employer"),
				]),
			}),
		},
		defaultValues: {
			title: job.title,
			company: job.company,
			status: job.status,
		} as Omit<Job, "id">,
		onSubmit: ({ value }) => {
			updateJob({ ...value, id: job.id });
			onOpenChange(false);
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-8"
		>
			<form.Field
				name="title"
				children={(field) => (
					<div>
						<label htmlFor={field.name}>Title</label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							required
						/>
						{field.state.meta.errors ? (
							<em role="alert">
								{field.state.meta.errors.join(", ")}
							</em>
						) : null}
					</div>
				)}
			/>
			<form.Field
				name="company"
				children={(field) => (
					<div>
						<label htmlFor={field.name}>Company</label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							required
						/>
						{field.state.meta.errors ? (
							<em role="alert">
								{field.state.meta.errors.join(", ")}
							</em>
						) : null}
					</div>
				)}
			/>
			<form.Field
				name="status"
				children={(field) => (
					<div>
						<label htmlFor={field.name}>Status</label>
						<Select
							onValueChange={(value: Job["status"]) =>
								field.handleChange(value)
							}
							value={field.state.value}
							name={field.name}
							required
						>
							<SelectTrigger
								className="w-[180px]"
								onBlur={field.handleBlur}
								id={field.name}
							>
								<SelectValue placeholder="Select job status" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Stats</SelectLabel>
									<SelectItem value="Applied">
										Applied
									</SelectItem>
									<SelectItem value="Interviewing">
										Interviewing
									</SelectItem>
									<SelectItem value="Offer">Offer</SelectItem>
									<SelectItem value="Rejected">
										Rejected
									</SelectItem>
									<SelectItem value="Accepted">
										Accepted
									</SelectItem>
									<SelectItem value="Not selected by the employer">
										Not selected by the employer
									</SelectItem>
								</SelectGroup>
							</SelectContent>
						</Select>
						{field.state.meta.errors ? (
							<em role="alert">
								{field.state.meta.errors.join(", ")}
							</em>
						) : null}
					</div>
				)}
			/>
			<Button type="submit">Save Changes</Button>
		</form>
	);
}
