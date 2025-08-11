import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/profile")({
	component: RouteComponent,
});

function Field({
	label,
	type = "text",
	value,
	onChange,
}: {
	label: string;
	type?: string;
	value: string;
	onChange: (v: string) => void;
}) {
	return (
		<div className="space-y-1.5">
			<Label>{label}</Label>
			<Input type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={label} />
		</div>
	);
}

function RouteComponent() {
	const [name, setName] = useState("Alex Freelancer");
	const [email, setEmail] = useState("alex@example.com");
	const [password, setPassword] = useState("");

	return (
		<div className="space-y-6">
			<h1 className="text-xl font-semibold">Profile Settings</h1>
			<Card>
				<CardHeader>
					<CardTitle>Account</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 sm:grid-cols-2">
						<Field label="Name" value={name} onChange={setName} />
						<Field label="Email" type="email" value={email} onChange={setEmail} />
						<Field label="Password" type="password" value={password} onChange={setPassword} />
					</div>
					<div className="mt-4">
						<Button>Save Changes</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
