import type { Project } from "@/features/project/domain/entities/Project";
import { useState } from "react";
import { ProjectDialog } from "./ProjectDialog";

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
  isOwner?: boolean;
  onEdit?: (data: Project) => void;
  onDelete?: (id: string) => void;
}

export const ProjectCard = ({
  project,
  onClick,
  isOwner,
  onEdit,
  onDelete,
}: ProjectCardProps) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"edit" | "delete">("edit");

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita que el click en botón dispare el onClick del card
    setDialogMode("edit");
    setDialogOpen(true);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDialogMode("delete");
    setDialogOpen(true);
  };

  const handleSubmitEdit = (data: {
    title: string;
    description: string;
    url: string;
  }) => {
    if (onEdit) {
      onEdit({ ...project, ...data });
    }
    setDialogOpen(false);
  };

  const handleConfirmDelete = () => {
    if (onDelete) {
      onDelete(project.id);
    }
    setDialogOpen(false);
  };

  return (
    <div
      className="h-[280px] flex flex-col justify-between cursor-pointer"
      onClick={() => onClick?.(project)}
    >
      <div className="h-[280px] flex flex-col justify-between">
        <div className="p-8 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-sm dark:shadow-md h-full flex flex-col">
          <p className="mb-3 text-xs font-semibold tracking-wide uppercase">
            <a
              href="/"
              className="transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700"
              aria-label="Category"
              onClick={(e) => e.stopPropagation()}
            >
              {project.tags}
            </a>{" "}
            <span className="text-gray-600 dark:text-gray-400">
              — {project.createdAt.getDate().toString().padStart(2, "0")} -{" "}
              {
                [
                  "ene",
                  "feb",
                  "mar",
                  "abr",
                  "may",
                  "jun",
                  "jul",
                  "ago",
                  "sep",
                  "oct",
                  "nov",
                  "dic",
                ][project.createdAt.getMonth()]
              }{" "}
              - {project.createdAt.getFullYear()}
            </span>
          </p>
          <a
            href={`/project/${project.id}`}
            aria-label="Article"
            title={project.title}
            className="inline-block mb-3 text-2xl font-bold leading-5 text-black dark:text-white transition-colors duration-200 hover:text-teal-accent-400  text-ellipsis"
            onClick={(e) => e.stopPropagation()}
          >
            {project.title}
          </a>

          <p className="mb-5 text-gray-700 dark:text-gray-300 line-clamp-3 overflow-hidden">
            {project.description}
          </p>

          <div className="flex items-center mt-auto">
            <a
              href={project.url}
              aria-label="Author"
              title="Author"
              className="mr-3"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=2&amp;h=750&amp;w=1260"
                alt="avatar"
                className="object-cover w-10 h-10 rounded-full shadow-sm"
              />
            </a>
            <div>
              <a
                href={project.url}
                aria-label="Author"
                title="Author"
                className="font-semibold text-gray-800 dark:text-gray-200 transition-colors duration-200 hover:text-teal-accent-400"
                onClick={(e) => e.stopPropagation()}
              >
                {project.authorName || "John Doe"}
              </a>
              <p className="text-sm font-medium leading-4 text-gray-600 dark:text-gray-400">
                Autor
              </p>
            </div>
          </div>
        </div>
      </div>

      {isOwner && (onEdit || onDelete) && (
        <div className="flex gap-2 mt-4">
          {onEdit && (
            <button
              onClick={handleEditClick}
              className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors duration-200"
            >
              Editar
            </button>
          )}
          {onDelete && (
            <button
              onClick={handleDeleteClick}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-200"
            >
              Eliminar
            </button>
          )}
        </div>
      )}

      {/* Diálogo */}
      <ProjectDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={dialogMode}
        project={project}
        onSubmitEdit={handleSubmitEdit}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};
