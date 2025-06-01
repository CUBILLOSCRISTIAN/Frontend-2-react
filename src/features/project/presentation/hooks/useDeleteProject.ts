import { useState } from "react";
import { container } from "@/core/di/container";
import { useAuth } from "@/core/context/AuthContext";

export const useDeleteProject = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const deleteProject = async (projectId: string): Promise<void | null> => {
    if (!user) {
      setError("Usuario no autenticado.");
      return null;
    }

    const deleteProjectUseCase = container.getDeleteProjectUseCase();

    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await deleteProjectUseCase.execute(projectId);
      setSuccess(true);
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteProject,
    loading,
    error,
    success,
  };
};
