import { Dialog } from "@headlessui/react";
import { Fragment } from "react";
import { CreateForm } from "./CreateForm";
import type { Project } from "../../domain/entities/Project";

interface ProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "edit" | "delete";
  project: Project;
  onSubmitEdit: (data: {
    title: string;
    description: string;
    url: string;
  }) => void;
  onConfirmDelete: () => void;
  loading?: boolean;
}

export const ProjectDialog = ({
  isOpen,
  onClose,
  mode,
  project,
  onConfirmDelete,
  loading = false,
}: ProjectDialogProps) => {
  return (
    <Dialog open={isOpen} onClose={onClose} as={Fragment}>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
        <Dialog.Panel className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
          {mode === "edit" ? (
            <>
              <Dialog.Title className="text-xl font-bold mb-4 text-center">
                Editar proyecto
              </Dialog.Title>
              <CreateForm onClose={onClose} initialProject={project} />
            </>
          ) : (
            <>
              <Dialog.Title className="text-xl font-bold mb-4 text-center text-red-600">
                Eliminar proyecto
              </Dialog.Title>
              <p className="mb-6 text-center">
                ¿Estás seguro de que deseas eliminar el proyecto{" "}
                <strong>{project.title}</strong>?
              </p>
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={onConfirmDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  disabled={loading}
                >
                  {loading ? "Eliminando..." : "Eliminar"}
                </button>
              </div>
            </>
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};
