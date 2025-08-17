import { z } from "zod";

export const JobFormSchema = z.object({
	title: z.string(),
	company: z.string(),
	date: z.date(),
	notes: z.string().optional(),
	status: z.union([
		z.literal("Applied"),
		z.literal("Interviewing"),
		z.literal("Offer"),
		z.literal("Rejected"),
		z.literal("Accepted"),
		z.literal("Not selected by the employer"),
	]),
});

export const JobExportSchema = JobFormSchema.extend({
	id: z.string(),
}).array();
