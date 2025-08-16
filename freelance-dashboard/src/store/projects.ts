import { create } from "zustand";
import { useNotificationsStore } from "./notifications";
import { persist } from "zustand/middleware";

export type Project = {
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
		editProject: (projectId: string, project: Partial<Project>) => void;
		deleteProject: (projectId: string) => void;
		updateProjectStatus: (
			projectId: string,
			status: Project["status"]
		) => void;
	};
};

export const useProjectsStore = create<ProjectsState>()(
	persist(
		(set, get) => ({
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
					set((state) => ({
						projects: [...state.projects, project],
					}));
					useNotificationsStore.getState().actions.addNotification({
						title: "Project Added",
						description: `Project ${project.name} added successfully`,
						time: new Date().toISOString(),
					});
				},
				editProject: (projectId, project) => {
					const oldProject = get().projects.find(
						(p) => p.id === projectId
					);
					if (!oldProject) {
						return;
					}
					set((state) => ({
						projects: state.projects.map((p) =>
							p.id === projectId ? { ...p, ...project } : p
						),
					}));
					useNotificationsStore.getState().actions.addNotification({
						title: "Project Updated",
						description: `Project ${project.name} updated successfully`,
						time: new Date().toISOString(),
					});
				},
				deleteProject: (projectId) => {
					const project = get().projects.find(
						(p) => p.id === projectId
					);
					if (!project) {
						return;
					}
					set((state) => ({
						projects: state.projects.filter(
							(p) => p.id !== projectId
						),
					}));
					useNotificationsStore.getState().actions.addNotification({
						title: "Project Deleted",
						description: `Project ${project.name} deleted successfully`,
						time: new Date().toISOString(),
					});
				},
				updateProjectStatus: (projectId, status) => {
					const project = get().projects.find(
						(p) => p.id === projectId
					);
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
		}),
		{
			name: "projects",
			partialize: (state) => ({
				projects: state.projects,
			}),
		}
	)
);

export const useProjects = () => useProjectsStore((select) => select.projects);
export const useProjectsActions = () =>
	useProjectsStore((select) => select.actions);
