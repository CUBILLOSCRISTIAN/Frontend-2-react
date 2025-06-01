import type { ProjectRepository } from "../repositories/ProjectRepository";

export class UploadImage {
  private readonly repo: ProjectRepository;
  constructor(repo: ProjectRepository) {
    this.repo = repo;
  }

  execute(image: File): Promise<string> {
    return this.repo.uploadImage(image);
  }
}
