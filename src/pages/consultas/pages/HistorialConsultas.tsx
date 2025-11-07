// import { useState, useEffect } from "react";
// import { FaTimes } from "react-icons/fa";

// const HistorialConsultas: React.FC = () => {
//   const [pacientes, setPacientes] = useState<any[]>([]);
//   const [filteredPacientes, setFilteredPacientes] = useState<any[]>([]);
//   const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const [searchTerm, setSearchTerm] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   useEffect(() => {
//     const mockData = [
//       {
//         id: "1",
//         nombreCompleto: "Juan Pérez",
//         age: 30,
//         weight: 75,
//         body_size: 1.75,
//         blood_tension: "120/80",
//         body_temperature: 36.6,
//         heart_rate: "72",
//         respiratory_rate: "16",
//         description_discomfort: "Dolor de cabeza",
//         chronic_diseases: "Ninguna",
//         previous_surgeries: "Apendicectomía",
//         allergies: "Penicilina",
//         current_medications: "Paracetamol",
//         past_treatments_therapies: "Fisioterapia",
//         hereditary_diseases: "Diabetes",
//         family_health: "Buena",
//         substance_use: "No",
//         diet: "Balanceada",
//         activity_level: "Activo",
//         mental_health: "Buena",
//         physical_exam_results: "Todo normal",
//         symptom_description: "Dolor persistente",
//         symptom_duration_evolution: "3 días",
//         symptom_impact_on_daily_life: "Moderado",
//       },
//     ];
//     setPacientes(mockData);
//     setFilteredPacientes(mockData);
//   }, []);

//   useEffect(() => {
//     const resultados = pacientes.filter((p) =>
//       p.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredPacientes(resultados);
//     setCurrentPage(1);
//   }, [searchTerm, pacientes]);

//   const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
//   const currentItems = filteredPacientes.slice(
//     (currentPage - 1) * itemsPerPage,
//     currentPage * itemsPerPage
//   );

//   const handleViewDetails = (paciente: any) => {
//     setSelectedPaciente(paciente);
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedPaciente(null);
//     setIsModalOpen(false);
//   };

//   const labelMap: Record<string, string> = {
//     nombreCompleto: "Nombre Completo",
//     age: "Edad",
//     weight: "Peso (kg)",
//     body_size: "Talla (m)",
//     blood_tension: "Tensión Arterial",
//     body_temperature: "Temperatura Corporal (°C)",
//     heart_rate: "Frecuencia Cardiaca (bpm)",
//     respiratory_rate: "Frecuencia Respiratoria (rpm)",
//     description_discomfort: "Descripción del Malestar",
//     chronic_diseases: "Enfermedades Crónicas",
//     previous_surgeries: "Cirugías Previas",
//     allergies: "Alergias",
//     current_medications: "Medicamentos Actuales",
//     past_treatments_therapies: "Tratamientos Terapéuticos Previos",
//     hereditary_diseases: "Enfermedades Hereditarias",
//     family_health: "Salud Familiar",
//     substance_use: "Uso de Sustancias",
//     diet: "Dieta",
//     activity_level: "Nivel de Actividad",
//     mental_health: "Salud Mental",
//     physical_exam_results: "Resultados del Examen Físico",
//     symptom_description: "Descripción del Síntoma",
//     symptom_duration_evolution: "Duración del Síntoma",
//     symptom_impact_on_daily_life: "Impacto del Síntoma en la Vida Diaria",
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-white">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
//         <h1 className="text-2xl font-bold mb-4 text-black">Historial de Consultas</h1>

//         <div className="mb-4">
//           <input
//             type="text"
//             placeholder="Buscar por nombre..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full p-2 border border-gray-300 rounded-md text-black"
//           />
//         </div>

//         <table className="min-w-full bg-white text-black border border-gray-300 table-auto">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left">Nombre Completo</th>
//               <th className="py-2 px-4 border-b text-left">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map((paciente) => (
//               <tr key={paciente.id}>
//                 <td className="py-2 px-4 border-b">{paciente.nombreCompleto}</td>
//                 <td className="py-2 px-4 border-b">
//                   <button
//                     onClick={() => handleViewDetails(paciente)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
//                   >
//                     Ver Detalles
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
//               currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Anterior
//           </button>
//           <span className="text-gray-700">
//             Página {currentPage} de {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${
//               currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
//             }`}
//           >
//             Siguiente
//           </button>
//         </div>
//       </div>

//       {isModalOpen && selectedPaciente && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative border border-gray-300 overflow-y-auto max-h-[90vh]">
//             <button
//               onClick={handleCloseModal}
//               className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
//             >
//               <FaTimes />
//             </button>

//             <h2 className="text-xl font-bold text-black mb-4">Detalles del Paciente</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
//               {Object.entries(selectedPaciente).map(([key, value]) => {
//                 if (key === "id") return null;
//                 const label = labelMap[key] || key;
//                 return (
//                   <div key={key}>
//                     <p className="font-semibold">{label}:</p>
//                     <p>{value || "N/A"}</p>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HistorialConsultas;

import { useState, useEffect } from "react";
import { FaTimes } from "react-icons/fa";
import { readHealthRecords } from "@/services/healthrecordsService";
import { readPatients } from "@/services/patientsService";
import { createConsult } from "@/services/consultsService";
import { toast } from "react-toastify";

const HistorialConsultas: React.FC = () => {
  const [pacientes, setPacientes] = useState<any[]>([]);
  const [filteredPacientes, setFilteredPacientes] = useState<any[]>([]);
  const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isRecetaModalOpen, setIsRecetaModalOpen] = useState(false);
  const [recetaPaciente, setRecetaPaciente] = useState<any | null>(null);
  const [recetaTexto, setRecetaTexto] = useState("");

  const fetchData = async () => {
    try {
      const recordsResponse = await readHealthRecords();
      const patientsResponse = (await readPatients()).result;

      const enriched = recordsResponse.result.map((record: any) => {
        const patient = patientsResponse.find((p: any) => p.id === record.patient_id);
        return {
          ...record,
          nombreCompleto: patient ? `${patient.name} ${patient.surnames}` : "Paciente no encontrado"
        };
      });

      setPacientes(enriched);
      setFilteredPacientes(enriched);
    } catch (error) {
      console.error("Error al cargar historial:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const resultados = pacientes.filter((p) =>
      p.nombreCompleto.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPacientes(resultados);
    setCurrentPage(1);
  }, [searchTerm, pacientes]);

  const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
  const currentItems = filteredPacientes.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleViewDetails = (paciente: any) => {
    setSelectedPaciente(paciente);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPaciente(null);
    setIsModalOpen(false);
  };

  const handleOpenRecetaModal = (paciente: any) => {
    setRecetaPaciente(paciente);
    setRecetaTexto("");
    setIsRecetaModalOpen(true);
  };

  const handleSubmitReceta = async () => {
    if (!recetaPaciente) return;
  
    const payload = {
      patient_id: recetaPaciente.patient_id,
      prescription_medication: [{ medicament_id: "" }],
      prescription: recetaTexto,
    };
  
    try {
      await createConsult(payload);
      toast.success("Receta creada correctamente");
      setIsRecetaModalOpen(false);
      await fetchData();
    } catch (error) {
      toast.error("Error al crear receta");
      console.error(error);
    }
  };


  const labelMap: Record<string, string> = {
    // nombreCompleto: "Nombre Completo",
    age: "Edad",
    weight: "Peso (kg)",
    body_size: "Talla (m)",
    blood_pressure: "Tensión Arterial",
    body_temperature: "Temperatura Corporal (°C)",
    heart_rate: "Frecuencia Cardiaca (bpm)",
    respiratory_rate: "Frecuencia Respiratoria (rpm)",
    description_discomfort: "Descripción del Malestar",
    chronic_diseases: "Enfermedades Crónicas",
    previous_surgeries: "Cirugías Previas",
    allergies: "Alergias",
    current_medications: "Medicamentos Actuales",
    past_treatments_therapies: "Tratamientos Previos",
    hereditary_diseases: "Enfermedades Hereditarias",
    family_health: "Salud Familiar",
    substance_use: "Uso de Sustancias",
    diet: "Dieta",
    activity_level: "Nivel de Actividad",
    mental_health: "Salud Mental",
    physical_exam_results: "Resultados del Examen Físico",
    symptom_description: "Descripción del Síntoma",
    symptom_duration_evolution: "Duración del Síntoma",
    symptom_impact_on_daily_life: "Impacto en la Vida Diaria",
    // medical_consent_form: "Consentimiento Médico",
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-black">Historial de Consultas</h1>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md text-black"
          />
        </div>

        <table className="min-w-full bg-white text-black border border-gray-300 table-auto">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nombre Completo</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((paciente) => (
              <tr key={paciente.id}>
                <td className="py-2 px-4 border-b">{paciente.nombreCompleto}</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(paciente)}
                      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Ver Detalles
                    </button>
                    <button
                      onClick={() => handleOpenRecetaModal(paciente)}
                      className="bg-green-600 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
                    >
                      Crear Receta
                    </button>
                  </div>

                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Anterior
          </button>
          <span className="text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            Siguiente
          </button>
        </div>
      </div>

      {isRecetaModalOpen && recetaPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-300">
            <button
              onClick={() => setIsRecetaModalOpen(false)}
              className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold text-black mb-4">Crear Receta</h2>
            <p className="text-black mb-2 font-semibold">{recetaPaciente.nombreCompleto}</p>

            <textarea
              rows={5}
              placeholder="Escribe la receta aquí..."
              value={recetaTexto}
              onChange={(e) => setRecetaTexto(e.target.value)}
              className="w-full p-2 rounded bg-white text-black border border-gray-300 mb-4"
            ></textarea>

            <button
              onClick={handleSubmitReceta}
              disabled={!recetaTexto.trim()}
              className={`w-full py-2 px-4 rounded transition ${recetaTexto.trim()
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
                }`}
            >
              Guardar Receta
            </button>
          </div>
        </div>
      )}


      {isModalOpen && selectedPaciente && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative border border-gray-300 overflow-y-auto max-h-[90vh]">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
            >
              <FaTimes />
            </button>

            <h2 className="text-xl font-bold text-black mb-4">Detalles del Paciente</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
              {Object.entries(selectedPaciente).map(([key, value]) => {
                if (["id", "created_at", "updated_at", "patient_id", "medical_consent_form", "nombreCompleto"].includes(key)) return null;
                const label = labelMap[key] || key;
                return (
                  <div key={key}>
                    <p className="font-semibold">{label}:</p>
                    <p>{String(value) || "N/A"}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistorialConsultas;
