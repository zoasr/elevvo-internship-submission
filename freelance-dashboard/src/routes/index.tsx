import { createFileRoute } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	BarChart as RBarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid,
	PieChart,
	Pie,
	Cell,
} from "recharts";
import { useEarnings, useNotifications, useProjects } from "@/store";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

const tasks = [
	{ name: "Design", value: 6 },
	{ name: "Dev", value: 10 },
	{ name: "Review", value: 4 },
];
const COLORS = ["#10b981", "#3b82f6", "#f59e0b"];

function StatCard({ title, value }: { title: string; value: string }) {
	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-sm text-gray-500 font-normal">
					{title}
				</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-semibold">{value}</div>
			</CardContent>
		</Card>
	);
}

function RouteComponent() {
	const projects = useProjects();
	const notifications = useNotifications();
	const totalEarnings = useEarnings();

	const monthlyEarnings = projects.reduce(
		(acc, project) => {
			const month = new Date(project.startDate).toLocaleString(
				"default",
				{ month: "short" }
			);
			if (acc[month]) {
				acc[month] += project.earnings;
			} else {
				acc[month] = project.earnings;
			}
			return acc;
		},
		{} as Record<string, number>
	);

	const earningsData = Object.entries(monthlyEarnings).map(
		([month, amt]) => ({ month, amt })
	);
	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard
					title="Total Projects"
					value={projects.length.toString()}
				/>
				<StatCard
					title="Earnings (YTD)"
					value={`${totalEarnings.toLocaleString()}`}
				/>
				<StatCard title="Tasks Due" value="7" />
				<StatCard title="Active Clients" value="5" />
			</div>

			<div className="grid gap-4 lg:grid-cols-3">
				<Card className="lg:col-span-2">
					<CardHeader>
						<CardTitle>Monthly Earnings</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<RBarChart data={earningsData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip />
									<Bar
										dataKey="amt"
										fill="#3b82f6"
										radius={[4, 4, 0, 0]}
									/>
								</RBarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Tasks by Type</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-64">
							<ResponsiveContainer width="100%" height="100%">
								<PieChart>
									<Pie
										data={tasks}
										dataKey="value"
										nameKey="name"
										innerRadius={50}
										outerRadius={80}
										paddingAngle={4}
									>
										{tasks.map((_, index) => (
											<Cell
												key={"cell-${index}"}
												fill={
													COLORS[
														index % COLORS.length
													]
												}
											/>
										))}
									</Pie>
									<Tooltip />
								</PieChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Recent Activity</CardTitle>
				</CardHeader>
				<CardContent>
					<ul className="space-y-2 text-sm text-gray-700 list-disc px-4">
						{notifications.map((n) => (
							<li key={n.id}>
								<div className="font-medium">{n.title}</div>
								<div className="text-xs text-muted-foreground">
									{n.description}
								</div>
							</li>
						))}
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
