import { useForm } from "@tanstack/react-form";
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
import { JobFormSchema } from "@/lib/schemas";
import { Textarea } from "./ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

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
			onChange: JobFormSchema,
		},
		defaultValues: {
			title: job.title,
			company: job.company,
			date: job.date || new Date(),
			notes: job.notes || "",
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
						{field.state.meta.errors[0] ? (
							<em role="alert">
								{field.state.meta.errors[0].message}
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
						{field.state.meta.errors[0] ? (
							<em role="alert">
								{field.state.meta.errors[0].message}
							</em>
						) : null}
					</div>
				)}
			/>
			<form.Field
				name="date"
				children={(field) => (
					<div className="flex flex-col gap-2">
						<label
							htmlFor={field.name}
							className="text-sm font-medium text-card-foreground dark:text-card-foreground-dark"
						>
							Date
						</label>
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant="outline"
									className="w-full justify-start text-left font-normal"
									aria-label="Select a date"
								>
									{field.state.value
										? format(field.state.value, "PPP")
										: "Select a date"}
								</Button>
							</PopoverTrigger>
							<PopoverContent>
								<Calendar
									mode="single"
									selected={field.state.value}
									onSelect={field.handleChange}
									captionLayout="dropdown"
									required
								/>
							</PopoverContent>
						</Popover>
						{field.state.meta.errors[0] ? (
							<em
								role="alert"
								className="text-xs text-destructive dark:text-destructive-dark"
							>
								{field.state.meta.errors[0].message}
							</em>
						) : null}
					</div>
				)}
			/>
			<form.Field
				name="notes"
				children={(field) => (
					<div className="flex flex-col gap-2">
						<label
							htmlFor={field.name}
							className="text-sm font-medium text-card-foreground dark:text-card-foreground-dark"
						>
							Notes
						</label>
						<Textarea
							onChange={(e) => field.handleChange(e.target.value)}
							name={field.name}
							id={field.name}
							value={field.state.value}
							placeholder="Add Job notes here..."
						></Textarea>
						{field.state.meta.errors[0] ? (
							<em
								role="alert"
								className="text-xs text-destructive dark:text-destructive-dark"
							>
								{field.state.meta.errors[0].message}
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
						{field.state.meta.errors[0] ? (
							<em role="alert">
								{field.state.meta.errors[0].message}
							</em>
						) : null}
					</div>
				)}
			/>
			<Button type="submit">Save Changes</Button>
		</form>
	);
}
