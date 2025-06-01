import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/core/context/AuthContext";
import { AppError } from "@/core/errors/AppError";

export const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!email || !password) {
      setError("Por favor completa todos los campos.");
      setLoading(false);
      return;
    }

    try {
      await login(email, password);
      navigate("/mis-proyectos");
    } catch (err) {
      if (err instanceof AppError) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-1 sm:mb-2">
        <label htmlFor="email" className="inline-block mb-1 font-medium">
          Correo
        </label>
        <input
          type="text"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="mb-1 sm:mb-2">
        <label htmlFor="password" className="inline-block mb-1 font-medium">
          Contraseña
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-grow w-full h-12 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
            id="password"
            name="password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>
      <div className="mt-4 mb-2 sm:mb-4">
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide transition duration-200 rounded shadow-md bg-teal-accent-400 hover:bg-teal-accent-700 focus:shadow-outline focus:outline-none"
        >
          {loading ? "Cargando..." : "Iniciar sesión"}
        </button>
      </div>
      {error && <p className="text-xs text-red-600 sm:text-sm">{error}</p>}

      <div className="text-center text-sm mt-2">
        <a
          href="/forgot-password"
          className="text-teal-accent-700 hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </a>
      </div>

      <p
        className="mt-4 text-xs text-gray-600 sm:text-sm
        "
      >
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="text-teal-accent-700 hover:underline">
          Regístrate
        </a>
      </p>
    </form>
  );
};
