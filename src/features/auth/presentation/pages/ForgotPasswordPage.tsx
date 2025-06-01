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
            setSuccessMsg("Si existe una cuenta asociada, recibirás un correo para restablecer tu contraseña.");
            // Opcional: redirigir después de un tiempo, e.g. setTimeout(() => navigate("/login"), 4000);
        } catch (err: any) {
            setErrorMsg(err.message || "Ocurrió un error al solicitar el restablecimiento.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-6 border rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Recuperar contraseña</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block font-medium">Correo electrónico</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded"
                        placeholder="tucorreo@ejemplo.com"
                        required
                    />
                </div>

                {errorMsg && (
                    <p className="text-red-500 text-sm">{errorMsg}</p>
                )}
                {successMsg && (
                    <p className="text-green-600 text-sm">{successMsg}</p>
                )}

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                >
                    Enviar instrucciones
                </button>
            </form>

            <div className="mt-4 text-center">
                <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => navigate("/login")}
                >
                    Volver a iniciar sesión
                </button>
            </div>
        </div>
    );
};
