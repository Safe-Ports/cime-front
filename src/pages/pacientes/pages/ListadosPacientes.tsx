// import { useState } from "react";
// import { FaEye, FaNotesMedical } from "react-icons/fa";

// const pacientesDummy = [
//   { id: "1", name: "Juan", surnames: "Pérez" },
//   { id: "2", name: "María", surnames: "Gómez" },
//   { id: "3", name: "Luis", surnames: "Rodríguez" },
// ];

// const recetasDummy = [
//   {
//     id: "r1",
//     id_patient: "1",
//     prescription: "Tomar paracetamol cada 8 horas",
//     created_at: new Date().toISOString(),
//     medicament_prescriptions: ["Paracetamol", "Ibuprofeno"],
//   },
// ];

// const consultasDummy = [
//   {
//     id: 1,
//     age: 32,
//     body_size: "1.75",
//     weight: 72,
//     blood_pressure: "120/80",
//     body_temperature: 36.5,
//     heart_rate: "70",
//     respiratory_rate: "16",
//     chronic_diseases: "Hipertensión",
//     previous_surgeries: "Apendicectomía",
//     allergies: "Penicilina",
//     current_medications: "Ninguno",
//     past_treatments_therapies: "Fisioterapia",
//     hereditary_diseases: "Diabetes",
//     family_health: "Buena",
//     substance_use: "No",
//     diet: "Balanceada",
//     activity_level: "Moderado",
//     mental_health: "Estable",
//     physical_exam_results: "Normal",
//     symptom_description: "Dolor de cabeza",
//     symptom_duration_evolution: "2 días",
//     symptom_impact_on_daily_life: "Leve",
//     created_at: new Date().toISOString(),
//     updated_at: new Date().toISOString(),
//   },
// ];

// const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
//   if (!isOpen) return null;
//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-300 max-h-[90vh] overflow-y-auto">
//         <button
//           onClick={onClose}
//           className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
//         >
//           &times;
//         </button>
//         {children}
//       </div>
//     </div>
//   );
// };

// const ListadoPacientes = () => {
//   const [search, setSearch] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;
//   const filteredPacientes = pacientesDummy.filter(p =>
//     `${p.name} ${p.surnames}`.toLowerCase().includes(search.toLowerCase())
//   );
//   const totalPages = Math.ceil(filteredPacientes.length / itemsPerPage);
//   const currentItems = filteredPacientes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

//   const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);
//   const [modalType, setModalType] = useState<"recetas" | "consultas" | null>(null);

//   const openModal = (paciente: any, type: "recetas" | "consultas") => {
//     setSelectedPaciente(paciente);
//     setModalType(type);
//   };

//   const closeModal = () => {
//     setSelectedPaciente(null);
//     setModalType(null);
//   };

//   const recetaActual = recetasDummy[0];
//   const consultaActual = consultasDummy[0];

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-white">
//       <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
//         <h1 className="text-2xl font-bold mb-4 text-black">Listado de Pacientes</h1>

//         <input
//           type="text"
//           value={search}
//           onChange={e => setSearch(e.target.value)}
//           placeholder="Buscar por nombre..."
//           className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
//         />

//         <table className="min-w-full text-black table-auto border border-gray-300">
//           <thead>
//             <tr>
//               <th className="py-2 px-4 border-b text-left">Nombre</th>
//               <th className="py-2 px-4 border-b text-left">Acciones</th>
//             </tr>
//           </thead>
//           <tbody>
//             {currentItems.map(p => (
//               <tr key={p.id}>
//                 <td className="py-2 px-4 border-b">{p.name} {p.surnames}</td>
//                 <td className="py-2 px-4 border-b flex gap-2">
//                   <button
//                     onClick={() => openModal(p, "recetas")}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
//                   >
//                     <FaNotesMedical /> Recetas
//                   </button>
//                   <button
//                     onClick={() => openModal(p, "consultas")}
//                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
//                   >
//                     <FaEye /> Consultas
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {/* Pagination */}
//         <div className="flex justify-between items-center mt-4">
//           <button
//             onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
//             disabled={currentPage === 1}
//             className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//           >
//             Anterior
//           </button>
//           <span className="text-black">
//             Página {currentPage} de {totalPages}
//           </span>
//           <button
//             onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//           >
//             Siguiente
//           </button>
//         </div>
//       </div>

//       {/* MODAL */}
//       <Modal isOpen={!!modalType} onClose={closeModal}>
//         {modalType === "recetas" && selectedPaciente && (
//           <>
//             <h2 className="text-xl font-bold mb-4 text-black">Recetas de {selectedPaciente.name}</h2>
//             <p><strong>Receta:</strong> {recetaActual.prescription}</p>
//             <p><strong>Fecha:</strong> {new Date(recetaActual.created_at).toLocaleString()}</p>
//             <p><strong>Medicamentos:</strong></p>
//             <ul className="list-disc ml-5">
//               {recetaActual.medicament_prescriptions.map((m, i) => (
//                 <li key={i}>{m}</li>
//               ))}
//             </ul>
//           </>
//         )}

//         {modalType === "consultas" && selectedPaciente && (
//           <>
//             <h2 className="text-xl font-bold mb-4 text-black">Consultas de {selectedPaciente.name}</h2>
//             <p><strong>Edad:</strong> {consultaActual.age}</p>
//             <p><strong>Talla:</strong> {consultaActual.body_size} m</p>
//             <p><strong>Peso:</strong> {consultaActual.weight} kg</p>
//             <p><strong>Presión:</strong> {consultaActual.blood_pressure}</p>
//             <p><strong>Temperatura:</strong> {consultaActual.body_temperature} °C</p>
//             <p><strong>Frecuencia Cardiaca:</strong> {consultaActual.heart_rate}</p>
//             <p><strong>Descripción de Síntomas:</strong> {consultaActual.symptom_description}</p>
//             <p><strong>Fecha:</strong> {new Date(consultaActual.created_at).toLocaleString()}</p>
//           </>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default ListadoPacientes;

import { useEffect, useState } from "react";
import { readPatients } from "@/services/patientsService";
import { readConsults } from "@/services/consultsService";
import { readHealthRecords } from "@/services/healthrecordsService";

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean; onClose: () => void; children: React.ReactNode }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative border border-gray-300 max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-600 text-2xl"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

const ListadoPacientes = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modalType, setModalType] = useState<"recetas" | "consultas" | null>(null);
  const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);

  const [consultas, setConsultas] = useState<any[]>([]);
  const [recetas, setRecetas] = useState<any[]>([]);
  const [indexActivo, setIndexActivo] = useState(0);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await readPatients();
      setPatients(data.result);
    };
    fetchPatients();
  }, []);

  const labelMap: Record<string, string> = {
    age: "Edad",
    weight: "Peso (kg)",
    body_size: "Talla (m)",
    blood_pressure: "Presión Arterial",
    body_temperature: "Temperatura Corporal (°C)",
    heart_rate: "Frecuencia Cardiaca",
    respiratory_rate: "Frecuencia Respiratoria",
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
    medical_consent_form: "Consentimiento Médico",
  };


  const filteredPatients = patients.filter(p =>
    `${p.name} ${p.surnames}`.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const currentItems = filteredPatients.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const openModal = async (paciente: any, type: "recetas" | "consultas") => {
    setSelectedPaciente(paciente);
    setModalType(type);
    setIndexActivo(0);

    if (type === "recetas") {
      const all = await readConsults();
      const filtradas = all.result
        .filter((r: any) => r.patient_id === paciente.id)
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setRecetas(filtradas);
    }

    if (type === "consultas") {
      const all = await readHealthRecords();
      const filtradas = all.result
        .filter((c: any) => c.patient_id === paciente.id)
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setConsultas(filtradas);
    }
  };

  const closeModal = () => {
    setSelectedPaciente(null);
    setModalType(null);
    setConsultas([]);
    setRecetas([]);
    setIndexActivo(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full border border-gray-300">
        <h1 className="text-2xl font-bold mb-4 text-black">Listado de Pacientes</h1>

        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Buscar por nombre..."
          className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
        />

        <table className="min-w-full text-black table-auto border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Nombre</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(p => (
              <tr key={p.id}>
                <td className="py-2 px-4 border-b">{p.name} {p.surnames}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => openModal(p, "recetas")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Recetas
                  </button>
                  <button
                    onClick={() => openModal(p, "consultas")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Consultas
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="text-black">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>

      <Modal isOpen={!!modalType} onClose={closeModal}>
        {modalType === "recetas" && selectedPaciente && recetas.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Recetas de {selectedPaciente.name}</h2>
            <p><strong>Receta:</strong> {recetas[indexActivo].prescription}</p>
            <p><strong>Fecha:</strong> {new Date(recetas[indexActivo].created_at).toLocaleString()}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIndexActivo(prev => Math.max(prev - 1, 0))}
                disabled={indexActivo === 0}
                className="bg-gray-300 text-black px-4 py-1 rounded disabled:opacity-50"
              >Anterior</button>
              <button
                onClick={() => setIndexActivo(prev => Math.min(prev + 1, recetas.length - 1))}
                disabled={indexActivo === recetas.length - 1}
                className="bg-gray-300 text-black px-4 py-1 rounded disabled:opacity-50"
              >Siguiente</button>
            </div>
          </>
        )}

        {modalType === "consultas" && selectedPaciente && consultas.length > 0 && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">Consultas de {selectedPaciente.name}</h2>
            {Object.entries(consultas[indexActivo]).map(([key, value]) => {
              if (["id", "patient_id", "created_at", "updated_at", "medical_consent_form"].includes(key)) return null;
              const label = labelMap[key] || key;
              return (
                <p key={key}><strong>{label}:</strong> {String(value)}</p>
              );
            })}

            <p><strong>Fecha:</strong> {new Date(consultas[indexActivo].created_at).toLocaleString()}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setIndexActivo(prev => Math.max(prev - 1, 0))}
                disabled={indexActivo === 0}
                className="bg-gray-300 text-black px-4 py-1 rounded disabled:opacity-50"
              >Anterior</button>
              <button
                onClick={() => setIndexActivo(prev => Math.min(prev + 1, consultas.length - 1))}
                disabled={indexActivo === consultas.length - 1}
                className="bg-gray-300 text-black px-4 py-1 rounded disabled:opacity-50"
              >Siguiente</button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default ListadoPacientes;
