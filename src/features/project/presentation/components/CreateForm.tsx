import { useAuth } from "@/core/context/AuthContext";
import { ImageUploader } from "@/shared/components/ImageUploader";
import { useEffect, useState } from "react";
import type { Project } from "../../domain/entities/Project";
import { useCreateProject } from "../hooks/useCreateProject";
import { useUploadImage } from "../hooks/useUploadImage";

interface CreateFormProps {
  initialProject?: Project;
  onClose: () => void;
}

export const CreateForm = ({ initialProject, onClose }: CreateFormProps) => {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tagsInput, setTagsInput] = useState("");
  const [visibility, setVisibility] = useState<"public" | "private">("public");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const { createProject, loading: creating } = useCreateProject();
  const { uploadImage } = useUploadImage();

  const handleSubmit = async (e: React.FormEvent) => {
    let finalThumbnailUrl = "";

    e.preventDefault();

    const tags = tagsInput
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    if (imageFile) {
      const uploadedUrl = await uploadImage(imageFile);

      if (uploadedUrl) {
        finalThumbnailUrl = uploadedUrl;
      } else {
        alert("Error al subir la imagen. Por favor, inténtalo de nuevo.");
        return;
      }
    }

    const newProject: Project = {
      title,
      description,
      url,
      tags,
      visibility,
      thumbnailUrl: finalThumbnailUrl,
      id: crypto.randomUUID(),
      authorId: user?.id || "",
      authorName: user?.name || "",
      createdAt: new Date(Date.now()),
      isdeleted: false,
    };

    await createProject(newProject);
    onClose();
    window.location.reload();
  };

  useEffect(() => {
    if (initialProject) {
      setTitle(initialProject.title);
      setDescription(initialProject.description);
      setUrl(initialProject.url);
      setTagsInput(initialProject.tags.join(", "));
      setVisibility(initialProject.visibility || "public");
    }
  }, [initialProject]);

  return (
    <div className="relative bg-white  p-7 sm:p-10">
      <h3 className="mb-4 text-xl font-semibold sm:text-center sm:mb-6 sm:text-2xl">
        Tu proyecto
      </h3>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Fila de 2 columnas: Imagen + campos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Columna 1: Imagen */}
          <div className="flex justify-center">
            <div className="w-40 h-40 relative">
              <ImageUploader onImageSelect={setImageFile} />
            </div>
          </div>

          {/* Columna 2: Título, Link, Etiquetas, Visibilidad */}
          <div className="space-y-4">
            <div>
              <label htmlFor="titulo" className="block mb-1 font-medium">
                Título
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={inputStyle}
                id="titulo"
                placeholder="Ej: Mi Proyecto Increíble"
                required
              />
            </div>

            <div>
              <label htmlFor="url" className="block mb-1 font-medium">
                Link
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className={inputStyle}
                id="url"
                placeholder="https://ejemplo.com"
                required
              />
            </div>

            <div>
              <label htmlFor="tags" className="block mb-1 font-medium">
                Etiquetas
              </label>
              <input
                type="text"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className={inputStyle}
                id="tags"
                placeholder="Ej: react, node, firebase"
              />
            </div>

            <div>
              <label htmlFor="visibility" className="block mb-1 font-medium">
                Visibilidad
              </label>
              <select
                id="visibility"
                value={visibility}
                onChange={(e) =>
                  setVisibility(e.target.value as "public" | "private")
                }
                className={inputStyle}
              >
                <option value="public">Público</option>
                <option value="private">Privado</option>
              </select>
            </div>
          </div>
        </div>

        {/* Descripción - fila completa con altura mayor */}
        <div>
          <label htmlFor="descripcion" className="block mb-1 font-medium">
            Descripción
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="descripcion"
            rows={10}
            className={`${inputStyle} resize-none`}
            placeholder="Escribe una descripción detallada de tu proyecto..."
            required
          />
        </div>

        {/* Botón */}
        <div>
          <button
            type="submit"
            disabled={creating}
            className="w-full h-12 font-semibold rounded-md bg-teal-500 text-white hover:bg-teal-600 transition"
          >
            {creating ? "Cargando..." : "Enviar"}
          </button>
        </div>
      </form>
    </div>
  );
};

// Reutiliza este estilo si usas Tailwind
const inputStyle =
  "flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-teal-400 focus:outline-none focus:shadow-outline";
