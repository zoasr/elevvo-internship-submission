import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge, type BadgeVariants } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Check, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useProjects, useProjectsActions } from "@/store";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/projects")({
	component: RouteComponent,
});

const NewProjectDialog = () => {
	const { addProject } = useProjectsActions();

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button>New Project</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>New Project</DialogTitle>
				</DialogHeader>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						addProject({
							id: Date.now().toString(),
							name: e.currentTarget.projectName.value,
							status: e.currentTarget.status.value,
							startDate: e.currentTarget.startDate.value,
							endDate: e.currentTarget.endDate.value,
							earnings: Number(e.currentTarget.earnings.value),
						});
					}}
				>
					<div className="space-y-2 mb-2">
						<Input
							type="text"
							name="projectName"
							placeholder="Project Name"
							required
						/>
						<Select name="status">
							<SelectTrigger>
								<SelectValue placeholder="Select a status" />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value="in-progress">
									In Progress
								</SelectItem>
								<SelectItem value="completed">
									Completed
								</SelectItem>
								<SelectItem value="on-hold">On Hold</SelectItem>
							</SelectContent>
						</Select>
						<Input
							type="date"
							name="startDate"
							placeholder="Start Date"
							required
						/>
						<Input
							type="date"
							name="endDate"
							placeholder="End Date"
						/>
						<Input
							type="number"
							name="earnings"
							placeholder="Earnings"
							min={1}
						/>
					</div>
					<Button type="submit">Add Project</Button>
				</form>
			</DialogContent>
		</Dialog>
	);
};

function StatusBadge({ status }: { status: string }) {
	const map: Record<
		string,
		{
			variant?: BadgeVariants;
			className?: string;
			icon?: React.ReactNode;
		}
	> = {
		Completed: { variant: "success", icon: <Check /> },
		"In Progress": { variant: "default", icon: <Clock /> },
		"In Review": { variant: "warning", icon: <Clock /> },
		"On Hold": { variant: "destructive", icon: <Clock /> },
	};
	const { variant = "default", className, icon } = map[status] ?? {};
	return (
		<Badge variant={variant} className={cn(className, "w-[100px]")}>
			{icon}
			{status}
		</Badge>
	);
}

function RouteComponent() {
	const projects = useProjects();

	const statusMap: Record<string, string> = {
		"in-progress": "In Progress",
		completed: "Completed",
		"on-hold": "On Hold",
	};
	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold">Projects</h1>
				<NewProjectDialog />
			</div>

			<div className="rounded-lg border bg-white">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Project</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Deadline</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{projects.map((p) => (
							<TableRow key={p.id}>
								<TableCell className="font-medium text-gray-900">
									{p.name}
								</TableCell>
								<TableCell>
									<StatusBadge status={statusMap[p.status]} />
								</TableCell>
								<TableCell className="text-gray-700">
									{p.endDate}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
