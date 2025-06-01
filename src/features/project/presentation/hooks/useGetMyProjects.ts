import { useEffect, useState } from "react";
import { container } from "@/core/di/container";
import { useAuth } from "@/core/context/AuthContext";
import type { Project } from "@/features/project/domain/entities/Project";

export const useGetMyProjects = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return;

      const getMyProjectsUseCase = container.getGetMyProjectsUseCase();

      setLoading(true);
      setError(null);

      try {
        const result = await getMyProjectsUseCase.execute(user.id);
        setProjects(result);
        console.log("Projects fetched:", result);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    console.log("Fetching projects...");

    fetchProjects();
  }, [user]);

  const handleRefetch = async () => {
    if (!user) return;

    const getMyProjectsUseCase = container.getGetMyProjectsUseCase();

    setLoading(true);
    setError(null);

    try {
      const result = await getMyProjectsUseCase.execute(user.id);
      setProjects(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return {
    projects,
    loading,
    error,
    refetch: () => handleRefetch(),
  };
};
