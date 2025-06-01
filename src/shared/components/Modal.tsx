import React from "react";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ show, onClose, children }: ModalProps) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      {/* ➊  Máximo 90 vh y overflow-y para scroll interno */}
      <div className="relative w-full max-w-3xl bg-white rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 z-20"
        >
          ✖
        </button>

        {/* ➋  Deja el padding dentro para que el scroll se vea bien */}
        <div>{children}</div>
      </div>
    </div>
  );
};
