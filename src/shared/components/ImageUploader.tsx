import { useRef, useState } from "react";

interface ImageUploaderProps {
  onImageSelect: (file: File) => void;
  initialImageUrl?: string;
}

export const ImageUploader = ({
  onImageSelect,
  initialImageUrl,
}: ImageUploaderProps) => {
  const [preview, setPreview] = useState<string | null>(
    initialImageUrl || null
  );
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onImageSelect(file);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Por favor selecciona un archivo de imagen válido.");
    }
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-medium">Imagen destacada</label>
      <div
        className="w-full h-48 bg-gray-100 border border-dashed border-gray-400 flex items-center justify-center rounded cursor-pointer hover:bg-gray-200"
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <img
            src={preview}
            alt="Preview"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <span className="text-gray-500">
            Haz clic para seleccionar una imagen
          </span>
        )}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>
    </div>
  );
};
