import { useState } from "react";
import { useAuth } from "@/core/context/AuthContext";
import { container } from "@/core/di/container";
import type { Project } from "../../domain/entities/Project";

export const useCreateProject = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createProject = async (project: Project): Promise<void | null> => {
    if (!user) {
      setError("Usuario no autenticado.");
      return null;
    }

    const createProjectUseCase = container.getCreateProjectUseCase();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await createProjectUseCase.execute(project);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    createProject,
    loading,
    error,
    success,
  };
};
