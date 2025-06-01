import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ResetPasswordUser } from "../../domain/usecases/resetPasswordUser";
import { FirebaseAuthService } from "../../data/firebaseAuthService";

export const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const navigate = useNavigate();

  // Instancia rápida del caso de uso.
  // En un escenario real, podrías inyectarlo desde un contexto o contenedor de dependencias.
  const resetPasswordUseCase = new ResetPasswordUser(new FirebaseAuthService());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      await resetPasswordUseCase.execute(email);
      setSuccessMsg(
        "Si existe una cuenta asociada, recibirás un correo para restablecer tu contraseña."
      );
      // Opcional: redirigir después de un tiempo, e.g. setTimeout(() => navigate("/login"), 4000);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: unknown) {
      setErrorMsg("Ocurrió un error al solicitar el restablecimiento.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold tracking-wide text-gray-900 dark:text-gray-300">
        Recuperar contraseña
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block font-medium text-gray-700 dark:text-gray-200"
          >
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded bg-white text-gray-900 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="tucorreo@ejemplo.com"
            required
            aria-label="Correo electrónico"
            autoComplete="email"
          />
        </div>

        {errorMsg && (
          <p className="text-red-500 dark:text-red-400 text-sm">{errorMsg}</p>
        )}
        {successMsg && (
          <p className="text-green-600 dark:text-green-400 text-sm">
            {successMsg}
          </p>
        )}

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-black dark:text-gray-100 transition duration-200 rounded shadow-md bg-teal-accent-400 dark:bg-teal-700 hover:bg-teal-accent-700 dark:hover:bg-teal-800 focus:shadow-outline focus:outline-none"
        >
          Recuperar contraseña
        </button>
      </form>

      <div className="mt-4 text-center">
        <button
          className="text-sm text-teal-accent-700 dark:text-teal-400 hover:underline"
          onClick={() => navigate("/login")}
        >
          Volver a iniciar sesión
        </button>
      </div>
    </div>
  );
};
