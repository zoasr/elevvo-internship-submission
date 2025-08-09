export type Job = {
	id: string;
	title: string;
	company: string;
	date: Date;
	notes?: string;
	status:
		| "Applied"
		| "Interviewing"
		| "Offer"
		| "Rejected"
		| "Accepted"
		| "Not selected by the employer";
};
