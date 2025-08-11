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

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

const earnings = [
	{ month: "Jan", amt: 1200 },
	{ month: "Feb", amt: 2100 },
	{ month: "Mar", amt: 800 },
	{ month: "Apr", amt: 1600 },
	{ month: "May", amt: 2400 },
	{ month: "Jun", amt: 1900 },
];

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
				<CardTitle className="text-sm text-gray-500 font-normal">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="text-2xl font-semibold">{value}</div>
			</CardContent>
		</Card>
	);
}

function RouteComponent() {
	return (
		<div className="space-y-6">
			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<StatCard title="Total Projects" value="12" />
				<StatCard title="Earnings (YTD)" value="$9,000" />
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
								<RBarChart data={earnings}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="month" />
									<YAxis />
									<Tooltip />
									<Bar dataKey="amt" fill="#3b82f6" radius={[4, 4, 0, 0]} />
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
									<Pie data={tasks} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} paddingAngle={4}>
										{tasks.map((entry, index) => (
											<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
					<ul className="space-y-2 text-sm text-gray-700">
						<li>• Invoice #1023 paid by Acme Co.</li>
						<li>• New project brief received from Nova Studio</li>
						<li>• Task "Homepage Hero" due tomorrow</li>
						<li>• Sent proposal to Orbit Labs</li>
					</ul>
				</CardContent>
			</Card>
		</div>
	);
}
