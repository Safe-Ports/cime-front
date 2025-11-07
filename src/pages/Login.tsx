

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import fondo from "../assets/img/fondo.jpg";
import { login } from "@/services/authService";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Cime");
  const [password, setPassword] = useState("cime1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Por favor, completa todos los campos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { accessToken } = await login(username, password);

      // Puedes guardar el token donde quieras (localStorage, context, etc.)
      sessionStorage.setItem("token", accessToken);

      navigate("/dashboard");
    } catch (err) {
      setError("Credenciales inválidas o error del servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sección izquierda con el formulario */}
      <div className="w-1/2 bg-white flex flex-col justify-start items-start p-12">
        <div className="mb-12 ml-4">
          <img src={logo} alt="Logo" className="w-36" />
        </div>
        <div className="flex flex-1 flex-col justify-center items-start w-full ml-4">
          <div className="w-3/4">
            <h1 className="text-black text-3xl mb-6">Inicia sesión</h1>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <input
                type="text"
                placeholder="Usuario"
                className="w-full p-2 rounded-md bg-gray-200 text-black placeholder-gray-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Contraseña"
                className="w-full p-2 rounded-md bg-gray-200 text-black placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && (
                <p className="text-red-600 text-sm font-medium">{error}</p>
              )}

              <div className="flex space-x-4">
                <button
                  type="button"
                  className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-md"
                  onClick={handleLogin}
                  disabled={loading}
                >
                  {loading ? "Cargando..." : "Inicia sesión"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Sección derecha con la imagen */}
      <div className="w-1/2 relative">
        <img
          src={fondo}
          alt="Fondo"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
