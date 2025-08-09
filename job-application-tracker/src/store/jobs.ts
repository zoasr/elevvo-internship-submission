import type { Job } from "@/types/jobs";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type JobsStore = {
	jobs: Job[] | [];
	actions: {
		addJob: (job: Job) => void;
		deleteJob: (job: Job) => void;
		updateJob: (job: Job) => void;
	};
};

const useJobsStore = create<JobsStore>()(
	persist(
		(set, _get) => ({
			jobs: [],
			actions: {
				addJob: (job) =>
					set((state) => ({ jobs: [...state.jobs, job] })),
				deleteJob: (job) =>
					set((state) => ({
						jobs: state.jobs.filter((j) => j.id !== job.id),
					})),
				updateJob: (job) =>
					set((state) => ({
						jobs: state.jobs.map((j) =>
							j.id === job.id ? job : j
						),
					})),
			},
		}),
		{
			name: "jobs",
			partialize: (state) => ({
				jobs: state.jobs,
			}),
		}
	)
);

export const useJobs = () => useJobsStore((state) => state.jobs);
export const usePlainJobs = () => useJobsStore.getState().jobs;

export const useJobsActions = () => useJobsStore((state) => state.actions);
export const usePlainJobsActions = () => useJobsStore.getState().actions;
export const useJobsPersist = () => useJobsStore.persist;
