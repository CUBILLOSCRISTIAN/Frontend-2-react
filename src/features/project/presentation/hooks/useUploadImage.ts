import { useState } from "react";

import { container } from "@/core/di/container";

export const useUploadImage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (image: File): Promise<string | null> => {
    const uploadImage = container.getUpdaloadImageUseCase();

    setLoading(true);
    setError(null);

    try {
      return await uploadImage.execute(image);
    } catch (err) {
      setError((err as Error).message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImage,
    loading,
    error,
  };
};
