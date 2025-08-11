import { create } from "zustand";
import { useNotificationsStore } from "./notifications";

type Project = {
	id: string;
	name: string;
	status: "in-progress" | "completed" | "on-hold";
	startDate: string;
	endDate: string;
	earnings: number;
};

type ProjectsState = {
	projects: Project[];
	actions: {
		addProject: (project: Project) => void;
		updateProjectStatus: (
			projectId: string,
			status: Project["status"]
		) => void;
	};
};

export const useProjectsStore = create<ProjectsState>((set) => ({
	projects: [
		{
			id: "1",
			name: "Marketing Website",
			status: "in-progress",
			startDate: "2025-08-01",
			endDate: "2025-08-30",
			earnings: 5000,
		},
		{
			id: "2",
			name: "Mobile App MVP",
			status: "on-hold",
			startDate: "2025-09-01",
			endDate: "2025-09-12",
			earnings: 8000,
		},
		{
			id: "3",
			name: "Brand Refresh",
			status: "completed",
			startDate: "2025-07-10",
			endDate: "2025-07-22",
			earnings: 3500,
		},
		{
			id: "4",
			name: "E-commerce Revamp",
			status: "in-progress",
			startDate: "2025-08-15",
			endDate: "2025-09-05",
			earnings: 12000,
		},
	],
	actions: {
		addProject: (project) => {
			set((state) => ({ projects: [...state.projects, project] }));
			useNotificationsStore.getState().actions.addNotification({
				title: "Project Added",
				description: `Project ${project.name} added successfully`,
				time: new Date().toISOString(),
			});
		},
		updateProjectStatus: (projectId, status) => {
			const project = useProjectsStore
				.getState()
				.projects.find((p) => p.id === projectId);
			if (!project) {
				return;
			}
			set((state) => ({
				projects: state.projects.map((p) =>
					p.id === projectId ? { ...p, status } : p
				),
			}));
			useNotificationsStore.getState().actions.addNotification({
				title: "Project Status Updated",
				description: `Project ${project.name} status updated to ${status}`,
				time: new Date().toISOString(),
			});
		},
	},
}));

export const useProjects = () => useProjectsStore((select) => select.projects);
export const useProjectsActions = () =>
	useProjectsStore((select) => select.actions);
