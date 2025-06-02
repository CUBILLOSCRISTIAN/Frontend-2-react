import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import type { Project } from "../../domain/entities/Project";

export const useGetOneProject = (projectId: string) => {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async (projectId: string) => {
      const getAllProjectsUseCase = container.getOneProjectUseCase();

      setLoading(true);
      setError(null);

      try {
        const result = await getAllProjectsUseCase.execute(projectId);
        setProject(result);
      } catch (err) {
        setError((err as Error).message);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProject(projectId);
  }, [projectId]);

  return {
    project,
    loading,
    error,
  };
};
