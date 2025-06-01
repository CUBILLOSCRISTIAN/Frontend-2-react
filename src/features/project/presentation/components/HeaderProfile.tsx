import { useState } from "react";

import { useAuth } from "@/core/context/AuthContext";
import { Modal } from "@/shared/components/Modal";
import SVGComponent from "@/shared/components/SVGComponent";
import type { Project } from "../../domain/entities/Project";
import { CreateForm } from "./CreateForm";

export const HeaderProfile = () => {
  const { user } = useAuth();

  const [showForm, setShowForm] = useState(false);
  const [editingProject] = useState<Project | null>(null);

  return (
    <div className="overflow-hidden bg-gray-900">
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-between xl:flex-row">
          <div className="w-full max-w-xl mb-12 xl:pr-16 xl:mb-0 xl:w-7/12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
              Bienvenido, <br className="hidden md:block" />
              <span className="text-teal-accent-400">{user?.name}</span>
            </h2>
            <p className="max-w-xl mb-4 text-base text-gray-400 md:text-lg">
              Esta es tu zona de creación total: diseña proyectos desde cero,
              edítalos a tu estilo y explora lo que otros han construido...
            </p>
            <button
              type="button"
              onClick={() => setShowForm(true)}
              aria-label="Mostrar formulario"
              className="inline-flex items-center font-semibold tracking-wider transition-colors duration-200 text-teal-accent-400 hover:text-teal-accent-700 cursor-pointer focus:outline-none"
            >
              ¡Crea un nuevo proyecto!
              <svg
                className="inline-block w-3 ml-2"
                fill="currentColor"
                viewBox="0 0 12 12"
              >
                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
              </svg>
            </button>
          </div>
          <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
            <div className="relative">
              <SVGComponent percental={"90%"} />
            </div>
          </div>
        </div>
      </div>

      {/* Modal con el formulario */}
      <Modal show={showForm} onClose={() => setShowForm(false)}>
        <CreateForm
          onClose={() => setShowForm(false)}
          initialProject={editingProject || undefined}
        />
      </Modal>
    </div>
  );
};
