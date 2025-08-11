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

export const Route = createFileRoute("/projects")({
	component: RouteComponent,
});

const data = [
	{
		name: "Marketing Website",
		status: "In Progress",
		deadline: "2025-08-30",
	},
	{ name: "Mobile App MVP", status: "On Hold", deadline: "2025-09-12" },
	{ name: "Brand Refresh", status: "Completed", deadline: "2025-07-22" },
	{ name: "E-commerce Revamp", status: "In Review", deadline: "2025-09-05" },
];

function StatusBadge({ status }: { status: string }) {
	const map: Record<
		string,
		{
			variant?: BadgeVariants;
			className?: string;
		}
	> = {
		Completed: { variant: "success" },
		"In Progress": { variant: "default" },
		"In Review": { variant: "warning" },
		"On Hold": { variant: "destructive" },
	};
	const { variant = "default", className } = map[status] ?? {};
	return (
		<Badge variant={variant} className={className}>
			{status}
		</Badge>
	);
}

function RouteComponent() {
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
						{data.map((p) => (
							<TableRow key={p.name}>
								<TableCell className="font-medium text-gray-900">
									{p.name}
								</TableCell>
								<TableCell>
									<StatusBadge status={p.status} />
								</TableCell>
								<TableCell className="text-gray-700">
									{p.deadline}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
