import type { ProjectRepository } from "../repositories/ProjectRepository";
import type { Project } from "../entities/Project";

export class CreateProject {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }

  execute(project: Project): Promise<void> {
    return this.repo.create(project);
  }
}
