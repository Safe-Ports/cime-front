import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/img/logo.png";
import { login } from "@/services/authService";  
export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Cime");
  const [password, setPassword] = useState("cime1");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const frases = [
    "Todo lo puedo en Cristo que me fortalece. - Filipenses 4:13",
    "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios. - Isaías 41:10",
    "El Señor es mi pastor; nada me faltará. - Salmo 23:1",
    "Confía en el Señor con todo tu corazón. - Proverbios 3:5",
    "La fe mueve montañas. - Mateo 17:20",
    "Sé fuerte y valiente. - Josué 1:9",
    "Ama a tu prójimo como a ti mismo. - Mateo 22:39",
    "El amor cubre multitud de pecados. - 1 Pedro 4:8",
    "Dios es nuestro refugio y fortaleza. - Salmo 46:1",
    "Encomienda al Señor tus obras, y tus pensamientos serán afirmados. - Proverbios 16:3",
    "Cada día es una nueva oportunidad para cambiar tu vida.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "No importa lo lento que avances, siempre y cuando no te detengas.",
    "La actitud positiva es el primer paso hacia grandes logros.",
    "Cree en ti mismo y todo será posible.",
    "Los sueños no tienen fecha de caducidad, sigue adelante.",
    "La perseverancia convierte lo imposible en posible.",
    "Rodéate de personas que te inspiren a ser mejor.",
    "El esfuerzo de hoy es la recompensa del mañana.",
    "La felicidad se encuentra en el camino, no solo en la meta."
  ];

  const [fraseActual, setFraseActual] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (token) navigate("/dashboard");
  }, []);

 useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        // Elegir una frase aleatoria diferente a la actual
        let nuevaFrase;
        do {
          nuevaFrase = Math.floor(Math.random() * frases.length);
        } while (nuevaFrase === fraseActual);

        setFraseActual(nuevaFrase);
        setVisible(true);
      }, 400); // breve efecto de transición
    }, 6000); // cambio cada 6 segundos
    return () => clearInterval(interval);
  }, [fraseActual]);

const handleLogin = async () => {
  if (!username || !password) {
    setError("Por favor, completa todos los campos.");
    return;
  }

  setLoading(true);
  setError(null);

  try {
    const { accessToken } = await login(username, password); // se usa servicio real

    if (!accessToken) throw new Error("Token no recibido.");

    sessionStorage.setItem("token", accessToken);
    navigate("/dashboard");
  } catch (error: any) {
    console.error("Error en login:", error);
    setError(error.message || "Credenciales inválidas o error del servidor.");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex h-screen">
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
              {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
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
      <div className="w-1/2 bg-gradient-to-br from-blue-900 to-black flex items-center justify-center p-8">
        <p className={`text-white text-center text-xl font-semibold max-w-lg transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          {frases[fraseActual]}
        </p>
      </div>
    </div>
  );
}
