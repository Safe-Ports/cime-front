// // src/pages/pacientes/pages/RecetasPacientes.tsx
// import React, { useState } from "react";

// const RecetasPacientes: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedReceta, setSelectedReceta] = useState<any>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);

//   const itemsPerPage = 5;

//   // Simulación de datos
//   const recetas = [
//     { id: 1, nombreCompleto: "Juan Pérez", prescription: "Paracetamol 500mg cada 8 horas" },
//     { id: 2, nombreCompleto: "María López", prescription: "Ibuprofeno 200mg cada 6 horas" },
//     // ...agrega más si quieres probar paginación
//   ];

//   const filtered = recetas.filter((r) =>
//     r.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
//   );
//   const totalPages = Math.ceil(filtered.length / itemsPerPage);
//   const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const openModal = (receta: any) => {
//     setSelectedReceta(receta);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setSelectedReceta(null);
//   };

//   return (
//     <div className="flex items-center justify-center py-10 px-4 min-h-screen bg-white">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
//         <h1 className="text-2xl font-bold mb-4 text-black">Listado de Recetas</h1>

//         <input
//           type="text"
//           placeholder="Buscar por nombre..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none text-black"
//         />

//         <table className="min-w-full bg-white text-black table-auto border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left">Nombre Completo</th>
//               <th className="py-2 px-4 border-b text-left">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((receta) => (
//               <tr key={receta.id}>
//                 <td className="py-2 px-4 border-b">{receta.nombreCompleto}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => openModal(receta)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
//                   >
//                     Ver Receta
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
//               currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Anterior
//           </button>
//           <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
//           <button
//             onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
//               currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Siguiente
//           </button>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-300">
//             <button
//               onClick={closeModal}
//               className="absolute top-2 right-2 text-black hover:text-gray-600 text-xl"
//             >
//               &times;
//             </button>
//             <h2 className="text-xl font-bold text-black mb-4">Receta del Paciente</h2>
//             <p className="text-black break-words max-w-full">
//               <strong>Receta:</strong> {selectedReceta?.prescription}
//             </p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RecetasPacientes;

import React, { useEffect, useState } from "react";
import { readPatients } from "@/services/patientsService";
import { readConsults } from "@/services/consultsService";

const RecetasPacientes: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const [recetas, setRecetas] = useState<any[]>([]);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchData = async () => {
      const patients = (await readPatients()).result;
      const consults = await readConsults();

      const merged = consults.result.map((consult: any) => {
        const patient = patients.find((p: any) => p.id === consult.patient_id);
        return {
          id: consult.id,
          nombreCompleto: patient ? `${patient.name} ${patient.surnames}` : "Paciente no encontrado",
          prescription: consult.prescription,
        };
      });

      setRecetas(merged);
    };

    fetchData();
  }, []);

  const filtered = recetas.filter((r) =>
    r.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openModal = (receta: any) => {
    setSelectedReceta(receta);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedReceta(null);
  };

  return (
    <div className="flex items-center justify-center py-10 px-4 min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-black">Listado de Recetas</h1>

        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-4 p-2 border border-gray-300 rounded-md focus:outline-none text-black"
        />

        <table className="min-w-full bg-white text-black table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nombre Completo</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((receta) => (
              <tr key={receta.id}>
                <td className="py-2 px-4 border-b">{receta.nombreCompleto}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => openModal(receta)}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-1 px-3 rounded text-sm"
                  >
                    Ver Receta
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Anterior
          </button>
          <span className="text-gray-700">Página {currentPage} de {totalPages}</span>
          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-300">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-black hover:text-gray-600 text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold text-black mb-4">Receta del Paciente</h2>
            <p className="text-black break-words max-w-full">
              <strong>Receta:</strong> {selectedReceta?.prescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecetasPacientes;
