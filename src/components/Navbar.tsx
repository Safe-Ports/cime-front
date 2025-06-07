import { useNavigate } from "react-router-dom";
// import { FaStethoscope, FaPills, FaUserInjured, FaSignOutAlt } from "react-icons/fa";
import { FaStethoscope, FaUserInjured, FaSignOutAlt } from "react-icons/fa";
import logo from "@/assets/img/logo.png";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="w-full bg-white shadow-md fixed top-0 left-0 z-50 flex items-center justify-between py-4 px-6">
      {/* Logo alineado a la izquierda */}
      <div className="flex items-center">
        <img
          src={logo}
          alt="Logo"
          className="cursor-pointer h-12"
          onClick={() => navigate("/dashboard")}
        />
      </div>

      {/* Botones centrados */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => navigate("/dashboard/pacientes")}
        >
          <FaUserInjured className="text-xl text-gray-700" />
        </button>
        {/* <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => navigate("/dashboard/medicamentos")}
        >
          <FaPills className="text-xl text-gray-700" />
        </button> */}
        <button
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => navigate("/dashboard/consultas")}
        >
          <FaStethoscope className="text-xl text-gray-700" />
        </button>
      </div>

      {/* Botón de Logout alineado a la derecha */}
      <div>
        <button
          className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white transition"
          onClick={handleLogout}
        >
          <FaSignOutAlt className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
