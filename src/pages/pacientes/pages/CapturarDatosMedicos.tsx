import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createHealthRecord } from "@/services/healthrecordsService";
import { readPatients } from "@/services/patientsService";
import { API_BASE_URL } from "@/config";

const CapturarDatosMedicos: React.FC = () => {
  const [patients, setPatients] = useState<{ id: string; name: string; surnames: string; gender: string; birthday: string }[]>([]);
  useEffect(() => {
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_BASE_URL}/patients/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      const patientsData = await response.json();

      // 🔍 Intentamos detectar en qué nivel vienen los datos
      if (patientsData?.result && Array.isArray(patientsData.result)) {
  setPatients(patientsData.result);
} else {
  setPatients([]);
}
    } catch (error) {
    }
  };
  fetchData();
}, []);
  const [formData, setFormData] = useState({
    patient_id: "",
    age: "",
    weight: "",
    body_size: "",
    body_temperature: "",
    blood_tension: "",
    heart_rate: "",
    respiratory_rate: "",
    description_discomfort: "",
    chronic_diseases: "",
    previous_surgeries: "",
    allergies: "",
    current_medications: "",
    past_treatments_therapies: "",
    hereditary_diseases: "",
    family_health: "",
    substance_use: "",
    diet: "",
    activity_level: "",
    mental_health: "",
    physical_exam_results: "",
    symptom_description: "",
    symptom_duration_evolution: "",
    symptom_impact_on_daily_life: "",
    medical_consent_form: false,
  });



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    const { name, value, type } = target;
    const checked = (target as HTMLInputElement).checked;
  
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createHealthRecord(formData);
      toast.success("Datos médicos guardados correctamente", { toastId: "health-record-success" });
      setFormData({
        patient_id: "",
        age: "",
        weight: "",
        body_size: "",
        body_temperature: "",
        blood_tension: "",
        heart_rate: "",
        respiratory_rate: "",
        description_discomfort: "",
        chronic_diseases: "",
        previous_surgeries: "",
        allergies: "",
        current_medications: "",
        past_treatments_therapies: "",
        hereditary_diseases: "",
        family_health: "",
        substance_use: "",
        diet: "",
        activity_level: "",
        mental_health: "",
        physical_exam_results: "",
        symptom_description: "",
        symptom_duration_evolution: "",
        symptom_impact_on_daily_life: "",
        medical_consent_form: false,
      });
    } catch (error) {
      toast.error("Error al guardar los datos médicos", { toastId: "health-record-error" });
    }
  };
  
  const isFormValid = Object.values(formData).every(
    (val) => val !== "" && val !== null && val !== undefined
  ) && formData.medical_consent_form;

  const selectedPatient = patients.find(p => p.id === formData.patient_id);

  return (
    <div className="flex justify-center items-start pt-28 pb-10 bg-[#f5f6fa] min-h-screen">
      <div className="bg-[#f0f2f5] p-10 rounded-xl shadow-lg max-w-5xl w-full border border-gray-200">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center tracking-tight">
          Capturar Datos del Paciente
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
          {/* Selector de paciente */}
          <div className="md:col-span-2">
            <label className="block text-base font-semibold text-gray-700 mb-2">Seleccionar Paciente</label>
            <select
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="">Seleccione un paciente</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {`${p.name} ${p.surnames}`}
                </option>
              ))}
            </select>
            {formData.patient_id && selectedPatient && (
              <div className="bg-white p-5 rounded-xl border border-gray-200 mt-4 mb-2 shadow flex flex-col md:flex-row md:space-x-8 space-y-2 md:space-y-0">
                <div>
                  <span className="block text-xs text-gray-500">Nombre</span>
                  <span className="font-medium text-gray-800">{selectedPatient.name} {selectedPatient.surnames}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Género</span>
                  <span className="font-medium text-gray-800">{selectedPatient.gender}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Fecha de Nacimiento</span>
                  <span className="font-medium text-gray-800">{selectedPatient.birthday}</span>
                </div>
                <div>
                  <span className="block text-xs text-gray-500">Edad</span>
                  <span className="font-medium text-gray-800">{formData.age || "No especificada"}</span>
                </div>
              </div>
            )}
          </div>

          {[
            { label: "Edad", name: "age", type: "number" },
            { label: "Peso (kg)", name: "weight", type: "number" },
            { label: "Talla (m)", name: "body_size", type: "number" },
            { label: "Temperatura Corporal (°C)", name: "body_temperature", type: "number" },
            { label: "Tensión Arterial", name: "blood_tension", type: "text" },
            { label: "Frecuencia Cardiaca (bpm)", name: "heart_rate", type: "number" },
            { label: "Frecuencia Respiratoria (rpm)", name: "respiratory_rate", type: "number" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-base font-medium text-gray-700 mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              />
            </div>
          ))}

          {[
            { label: "Descripción del Malestar", name: "description_discomfort" },
            { label: "Enfermedades Crónicas", name: "chronic_diseases" },
            { label: "Cirugías Previas", name: "previous_surgeries" },
            { label: "Alergias", name: "allergies" },
            { label: "Medicamentos Actuales", name: "current_medications" },
            { label: "Tratamientos Previos", name: "past_treatments_therapies" },
            { label: "Enfermedades Hereditarias", name: "hereditary_diseases" },
            { label: "Salud Familiar", name: "family_health" },
            { label: "Uso de Sustancias", name: "substance_use" },
            { label: "Dieta", name: "diet" },
            { label: "Estado de Salud Mental", name: "mental_health" },
            { label: "Resultados del Examen Físico", name: "physical_exam_results" },
            { label: "Descripción del Síntoma", name: "symptom_description" },
            { label: "Duración del Síntoma", name: "symptom_duration_evolution" },
            { label: "Impacto del Síntoma en la Vida Diaria", name: "symptom_impact_on_daily_life" },
          ].map(({ label, name }) => (
            <div key={name} className="md:col-span-2">
              <label className="block text-base font-medium text-gray-700 mb-2">{label}</label>
              <textarea
                name={name}
                rows={2}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
              ></textarea>
            </div>
          ))}

          {/* Nivel de Actividad */}
          <div>
            <label className="block text-base font-medium text-gray-700 mb-2">Nivel de Actividad</label>
            <select
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-white text-gray-800 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition"
            >
              <option value="">Seleccione</option>
              <option value="Sedentary">Sedentario</option>
              <option value="Moderate">Moderado</option>
              <option value="Active">Activo</option>
            </select>
          </div>

          {/* Consentimiento */}
          <div className="md:col-span-2 flex items-center space-x-3 mt-2">
            <input
              type="checkbox"
              name="medical_consent_form"
              checked={formData.medical_consent_form}
              onChange={handleChange}
              className="accent-blue-600 w-5 h-5"
            />
            <label className="text-base font-medium text-gray-700 select-none">
              Acepto el consentimiento médico informado
            </label>
          </div>

          {/* Botón */}
          <div className="md:col-span-2 mt-4">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-3 px-4 rounded-lg font-semibold text-lg shadow transition ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CapturarDatosMedicos;
