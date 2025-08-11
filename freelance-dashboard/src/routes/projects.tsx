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
import { useProjects } from "@/store";

export const Route = createFileRoute("/projects")({
	component: RouteComponent,
});

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
				<Button>New Project</Button>
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
