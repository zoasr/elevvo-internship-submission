import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import type { Job } from "@/types/jobs";
import { useJobsActions } from "@/store/jobs";
import { useRouter } from "@tanstack/react-router";
import { JobFormSchema } from "@/lib/schemas";
import { format } from "date-fns";
import { Textarea } from "./ui/textarea";

export default function JobForm() {
	const { addJob } = useJobsActions();
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			title: "",
			company: "",
			status: "Applied",
			date: new Date(),
			notes: "",
		} as Omit<Job, "id">,
		validators: {
			onChange: JobFormSchema,
		},
		onSubmit: ({ value }) => {
			console.log(value);
			addJob({ ...value, id: crypto.randomUUID() });
			router.navigate({ to: "/" });
			form.reset();
		},
	});

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				void form.handleSubmit();
			}}
			className="space-y-8 container mx-auto max-w-[720px] p-8 rounded-lg shadow-lg bg-card dark:bg-card-dark"
		>
			<form.Field
				name="title"
				children={(field) => (
					<div className="flex flex-col gap-2">
						<label
							htmlFor={field.name}
							className="text-sm font-medium text-card-foreground dark:text-card-foreground-dark"
						>
							Title
						</label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							required
							className="border border-input dark:border-input-dark rounded-md p-2 w-full"
						/>
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
				name="company"
				children={(field) => (
					<div className="flex flex-col gap-2">
						<label
							htmlFor={field.name}
							className="text-sm font-medium text-card-foreground dark:text-card-foreground-dark"
						>
							Company
						</label>
						<Input
							id={field.name}
							name={field.name}
							value={field.state.value}
							onBlur={field.handleBlur}
							onChange={(e) => field.handleChange(e.target.value)}
							required
							className="border border-input dark:border-input-dark rounded-md p-2 w-full"
						/>
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
									defaultMonth={new Date()}
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
					<div className="flex flex-col gap-2">
						<label
							htmlFor={field.name}
							className="text-sm font-medium text-card-foreground dark:text-card-foreground-dark"
						>
							Status
						</label>
						<Select
							onValueChange={(value: Job["status"]) =>
								field.handleChange(value)
							}
							value={field.state.value}
							name={field.name}
							required
						>
							<SelectTrigger
								className="w-full"
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
			<Button
				type="submit"
				className="w-full bg-primary hover:bg-primary/90 text-primary-foreground dark:text-primary-foreground-dark font-bold py-2 px-4 rounded"
			>
				Submit
			</Button>
		</form>
	);
}
