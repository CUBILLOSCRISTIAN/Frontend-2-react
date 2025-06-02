import type { Project } from "../entities/Project";
import type { ProjectRepository } from "../repositories/ProjectRepository";

export class GetOneProject {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }
  execute(projectId: string): Promise<Project | null> {
    return this.repo.getOneProject(projectId);
  }
}
