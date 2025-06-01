import { useState } from "react";
import { container } from "@/core/di/container";
import type { Project } from "@/features/project/domain/entities/Project";
import { useAuth } from "@/core/context/AuthContext";

export const useUpdateProject = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateProject = async (project: Project): Promise<void | null> => {
    if (!user) {
      setError("Usuario no autenticado.");
      return null;
    }

    const updateProjectUseCase = container.getUpdateProjectUseCase();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await updateProjectUseCase.execute(project);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    updateProject,
    loading,
    error,
    success,
  };
};
