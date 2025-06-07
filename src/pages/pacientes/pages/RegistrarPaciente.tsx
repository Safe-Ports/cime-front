// import { useState } from "react";

// const RegistrarPaciente: React.FC = () => {
//   const [nombre, setNombre] = useState("");
//   const [apellidos, setApellidos] = useState("");
//   const [fechaNacimiento, setFechaNacimiento] = useState("");
//   const [genero, setGenero] = useState("");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     console.log({ nombre, apellidos, fechaNacimiento, genero });

//     // Reset
//     setNombre("");
//     setApellidos("");
//     setFechaNacimiento("");
//     setGenero("");
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-6 rounded-lg shadow-md w-[600px]"
//       >
//         <h2 className="text-black text-2xl mb-6 text-center">Registrar Paciente</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label htmlFor="nombre" className="block text-black text-sm font-bold mb-1">
//               Nombre
//             </label>
//             <input
//               type="text"
//               id="nombre"
//               value={nombre}
//               onChange={(e) => setNombre(e.target.value)}
//               className="w-full p-2 rounded bg-white text-black border border-gray-300"
//             />
//           </div>

//           <div>
//             <label htmlFor="apellidos" className="block text-black text-sm font-bold mb-1">
//               Apellidos
//             </label>
//             <input
//               type="text"
//               id="apellidos"
//               value={apellidos}
//               onChange={(e) => setApellidos(e.target.value)}
//               className="w-full p-2 rounded bg-white text-black border border-gray-300"
//             />
//           </div>

//           <div>
//             <label htmlFor="fechaNacimiento" className="block text-black text-sm font-bold mb-1">
//               Fecha de Nacimiento
//             </label>
//             <input
//               type="date"
//               id="fechaNacimiento"
//               value={fechaNacimiento}
//               onChange={(e) => setFechaNacimiento(e.target.value)}
//               className="w-full p-2 rounded bg-white text-black border border-gray-300"
//             />
//           </div>

//           <div>
//             <label htmlFor="genero" className="block text-black text-sm font-bold mb-1">
//               Género
//             </label>
//             <select
//               id="genero"
//               value={genero}
//               onChange={(e) => setGenero(e.target.value)}
//               className="w-full p-2 rounded bg-white text-black border border-gray-300"
//             >
//               <option value="">Seleccione el género</option>
//               <option value="Masculino">Masculino</option>
//               <option value="Femenino">Femenino</option>
//             </select>
//           </div>

//           {/* Botón: ocupa ambas columnas */}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//             >
//               Registrar
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default RegistrarPaciente;

import { useState } from "react";
import { toast } from "react-toastify";
import { createPatient } from "@/services/patientsService";

const RegistrarPaciente: React.FC = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [genero, setGenero] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validación
    if (!nombre || !apellidos || !fechaNacimiento || !genero) {
      toast.warn("Por favor, completa todos los campos.");
      return;
    }

    const payload = {
      name: nombre,
      surnames: apellidos,
      birthday: fechaNacimiento.split("-").reverse().join("-"),
      gender: genero,
    };

    console.table(payload);

    try {
      await createPatient(payload);
      toast.success("Paciente registrado correctamente");
      setNombre("");
      setApellidos("");
      setFechaNacimiento("");
      setGenero("");
    } catch (error) {
      toast.error("Error al registrar paciente");
      console.error(error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-6 rounded-lg shadow-md w-[600px]"
      >
        <h2 className="text-black text-2xl mb-6 text-center">Registrar Paciente</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nombre" className="block text-black text-sm font-bold mb-1">
              Nombre
            </label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="apellidos" className="block text-black text-sm font-bold mb-1">
              Apellidos
            </label>
            <input
              type="text"
              id="apellidos"
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="fechaNacimiento" className="block text-black text-sm font-bold mb-1">
              Fecha de Nacimiento
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              value={fechaNacimiento}
              onChange={(e) => setFechaNacimiento(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            />
          </div>

          <div>
            <label htmlFor="genero" className="block text-black text-sm font-bold mb-1">
              Género
            </label>
            <select
              id="genero"
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            >
              <option value="">Seleccione el género</option>
              <option value="Masculino">Masculino</option>
              <option value="Femenino">Femenino</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Registrar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrarPaciente;
