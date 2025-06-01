import type { Project } from "../entities/Project";

export interface ProjectRepository {
  create(project: Omit<Project, "id" | "createdAt">): Promise<void>;
  getMyProjects(userId: string): Promise<Project[]>;
  getAllProjects(): Promise<Project[]>;
  update(project: Project): Promise<void>;
  delete(projectId: string): Promise<void>;
  uploadImage(image: File): Promise<string>;
}
