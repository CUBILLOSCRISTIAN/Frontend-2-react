import type { Project } from "@/features/project/domain/entities/Project";
import { ProjectCard } from "./ProjectCard";
import { ProjectCardSkeleton } from "./ProjectCardSkeleton";
import { useAuth } from "@/core/context/AuthContext";
import { useUpdateProject } from "../hooks/useUpdateProject";
import { useDeleteProject } from "../hooks/useDeleteProject";
import { Blog } from "./Blog";

interface ProjectListProps {
  projects: Project[];
  loading: boolean;
  onRefresh?: () => Promise<void>;
}

export const ProjectList = ({
  projects,
  loading,
  onRefresh,
}: ProjectListProps) => {
  const { user } = useAuth();

  const { updateProject } = useUpdateProject();

  const { deleteProject } = useDeleteProject();

  const handleEdit = async (data: Project) => {
    await updateProject(data);
    onRefresh?.();
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
    onRefresh?.();
  };

  if (loading) {
    return (
      <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <p className="text-center text-gray-600 dark:text-gray-300">
        No tienes proyectos aún.
      </p>
    );
  }

  return (
    <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {projects.map((project) => (
        <Blog
          key={project.id}
          project={project}
          isOwner={project.authorId === user?.id}
          onClick={() => {}}
          onEdit={(data) => {
            handleEdit(data);
          }}
          onDelete={(id) => {
            handleDelete(id);
          }}
        />
      ))}
    </div>
  );
};
