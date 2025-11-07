import { useEffect, useState } from "react";
import { readPatients } from "@/services/patientsService";
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
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [modalType, setModalType] = useState<"consultas" | "historial" | null>(null);
  const [selectedPaciente, setSelectedPaciente] = useState<any | null>(null);

  const [consultas, setConsultas] = useState<any[]>([]);
  const [indexActivo, setIndexActivo] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const patientsData = await readPatients();
      const healthRecordsData = await readHealthRecords();

      setPatients(Array.isArray(patientsData) ? patientsData : (patientsData.result || []));
      setRecords(Array.isArray(healthRecordsData) ? healthRecordsData : (healthRecordsData.result || []));
    };
    fetchData();
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

  // Devuelve el número de historiales médicos para un paciente dado
  const getHistorialCount = (patientId: number) => {
    return records.filter((rec) => rec.patient_id === patientId).length;
  };

  const openModal = async (paciente: any, type: "consultas" | "historial") => {
    setSelectedPaciente(paciente);
    setModalType(type);
    setIndexActivo(0);

    if (type === "consultas") {
      const all = await readHealthRecords();
      const arr = all.result || all;
      const filtradas = arr
        .filter((c: any) => c.patient_id === paciente.id)
        .sort((a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
      setConsultas(filtradas);
    }
    // No carga extra para "historial", ya que los records ya están en estado
  };

  const closeModal = () => {
    setSelectedPaciente(null);
    setModalType(null);
    setConsultas([]);
    setIndexActivo(0);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-5xl w-full border border-gray-300">
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
              <th className="py-2 px-4 border-b text-left">Historiales</th>
              <th className="py-2 px-4 border-b text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map(p => (
              <tr key={p.id}>
                <td className="py-2 px-4 border-b">{p.name} {p.surnames}</td>
                <td className="py-2 px-4 border-b text-center">{getHistorialCount(p.id)}</td>
                <td className="py-2 px-4 border-b flex gap-2">
                  <button
                    onClick={() => alert("Módulo de recetas desactivado temporalmente")}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Recetas
                  </button>
                  <button
                    onClick={() => openModal(p, "historial")}
                    className="bg-gray-700 hover:bg-gray-800 text-white px-3 py-1 rounded text-sm"
                  >
                    Ver Historial
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

        {modalType === "historial" && selectedPaciente && (
          <>
            <h2 className="text-xl font-bold mb-4 text-black">
              Historial Médico de {selectedPaciente.name}
            </h2>
            {records.filter((r) => r.patient_id === selectedPaciente.id).length > 0 ? (
              records
                .filter((r) => r.patient_id === selectedPaciente.id)
                .map((record, index) => (
                  <div key={index} className="border-b border-gray-300 py-2">
                    {Object.entries(record).map(([key, value]) => {
                      if (["id", "patient_id", "created_at", "updated_at", "medical_consent_form"].includes(key)) return null;
                      const label = labelMap[key] || key;
                      return (
                        <p key={key}><strong>{label}:</strong> {String(value || "N/A")}</p>
                      );
                    })}
                    <p><strong>Fecha:</strong> {new Date(record.created_at).toLocaleString()}</p>
                  </div>
                ))
            ) : (
              <p className="text-gray-600">No hay historiales disponibles para este paciente.</p>
            )}
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
