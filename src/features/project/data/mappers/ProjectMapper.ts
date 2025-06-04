import type { Project } from "../../domain/entities/Project";
import type { ProjectDTO } from "../dto/ProjectDTO";

export const ProjectMapper = {
  toDTO: (project: Project): ProjectDTO => ({
    id: project.id,
    userId: project.authorId,
    title: project.title,
    authorId: project.authorId,
    authorName: project.authorName,
    url: project.url,
    description: project.description,
    createdAt: project.createdAt.toISOString(),
    isDeleted: project.isdeleted,
    tags: project.tags,
    thumbnailUrl: project.thumbnailUrl,
    visibility: project.visibility,
  }),

  toDomain: (dto: ProjectDTO): Project => ({
    id: dto.id,
    title: dto.title,
    description: dto.description,
    createdAt: dto.createdAt ? new Date(dto.createdAt) : new Date(),
    url: dto.url ?? "",
    authorId: dto.userId,
    authorName: dto.authorName ?? "",
    isdeleted: dto.isDeleted,
    tags: dto.tags ?? [],
    thumbnailUrl: dto.thumbnailUrl!,
    visibility: dto.visibility ?? "public",
    likes: dto.likes ?? 0,
    comments: dto.comments ?? [],
  }),
};
