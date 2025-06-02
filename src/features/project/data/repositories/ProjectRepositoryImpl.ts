import type { ProjectRepository } from "../../domain/repositories/ProjectRepository";
import type { Project } from "../../domain/entities/Project";
import { FirebaseProjectDatasource } from "../datasources/FirebaseProjectDatasource";
import { ProjectMapper } from "../mappers/ProjectMapper";
import type { CloudinaryService } from "../datasources/CloudinaryService";

export class ProjectRepositoryImpl implements ProjectRepository {
  private readonly datasource: FirebaseProjectDatasource;
  private readonly uploadImageUrl: CloudinaryService;

  constructor(
    datasource: FirebaseProjectDatasource,
    uploadImageToCloudinary: CloudinaryService
  ) {
    this.uploadImageUrl = uploadImageToCloudinary;
    this.datasource = datasource;
  }

  async getOneProject(projectId: string): Promise<Project | null> {
    const dto = await this.datasource.getOneProject(projectId);
    if (!dto) return null;
    return ProjectMapper.toDomain(dto);
  }

  uploadImage(image: File): Promise<string> {
    return this.uploadImageUrl.upload(image);
  }

  async getAllProjects(): Promise<Project[]> {
    const dtos = await this.datasource.getAllProjects();
    return dtos.map(ProjectMapper.toDomain);
  }

  async create(project: Project): Promise<void> {
    const dto = ProjectMapper.toDTO(project);
    await this.datasource.create(dto);
  }

  async getMyProjects(userId: string): Promise<Project[]> {
    const dtos = await this.datasource.getMyProjects(userId);
    return dtos.map(ProjectMapper.toDomain);
  }

  async update(project: Project): Promise<void> {
    const dto = ProjectMapper.toDTO(project);
    await this.datasource.update(dto);
  }

  async delete(projectId: string): Promise<void> {
    await this.datasource.delete(projectId);
  }
}
