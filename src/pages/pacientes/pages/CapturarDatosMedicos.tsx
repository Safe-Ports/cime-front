// import React, { useState } from "react";

// const CapturarDatosMedicos: React.FC = () => {
//   const [formData, setFormData] = useState({
//     age: "",
//     weight: "",
//     body_size: "",
//     body_temperature: "",
//     blood_tension: "",
//     heart_rate: "",
//     respiratory_rate: "",
//     description_discomfort: "",
//     chronic_diseases: "",
//     previous_surgeries: "",
//     allergies: "",
//     current_medications: "",
//     past_treatments_therapies: "",
//     hereditary_diseases: "",
//     family_health: "",
//     substance_use: "",
//     diet: "",
//     activity_level: "",
//     mental_health: "",
//     physical_exam_results: "",
//     symptom_description: "",
//     symptom_duration_evolution: "",
//     symptom_impact_on_daily_life: "",
//     medical_consent_form: false,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   return (
//     <div className="flex justify-center items-start pt-28 pb-10 bg-white">
//       <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-5xl w-full">
//         <h2 className="text-2xl font-bold mb-6 text-black text-center">
//           Capturar Datos del Paciente
//         </h2>

//         <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             { label: "Edad", name: "age", type: "number" },
//             { label: "Peso (kg)", name: "weight", type: "number" },
//             { label: "Talla (m)", name: "body_size", type: "number" },
//             { label: "Temperatura Corporal (°C)", name: "body_temperature", type: "number" },
//             { label: "Tensión Arterial", name: "blood_tension", type: "text" },
//             { label: "Frecuencia Cardiaca (bpm)", name: "heart_rate", type: "number" },
//             { label: "Frecuencia Respiratoria (rpm)", name: "respiratory_rate", type: "number" },
//           ].map(({ label, name, type }) => (
//             <div key={name}>
//               <label className="block text-sm font-medium text-black mb-1">{label}</label>
//               <input
//                 type={type}
//                 name={name}
//                 value={formData[name as keyof typeof formData] as string}
//                 onChange={handleChange}
//                 className="w-full p-2 rounded bg-white text-black border border-gray-300"
//               />
//             </div>
//           ))}

//           {[
//             { label: "Descripción del Malestar", name: "description_discomfort" },
//             { label: "Enfermedades Crónicas", name: "chronic_diseases" },
//             { label: "Cirugías Previas", name: "previous_surgeries" },
//             { label: "Alergias", name: "allergies" },
//             { label: "Medicamentos Actuales", name: "current_medications" },
//             { label: "Tratamientos Previos", name: "past_treatments_therapies" },
//             { label: "Enfermedades Hereditarias", name: "hereditary_diseases" },
//             { label: "Salud Familiar", name: "family_health" },
//             { label: "Uso de Sustancias", name: "substance_use" },
//             { label: "Dieta", name: "diet" },
//             { label: "Estado de Salud Mental", name: "mental_health" },
//             { label: "Resultados del Examen Físico", name: "physical_exam_results" },
//             { label: "Descripción del Síntoma", name: "symptom_description" },
//             { label: "Duración del Síntoma", name: "symptom_duration_evolution" },
//             { label: "Impacto del Síntoma en la Vida Diaria", name: "symptom_impact_on_daily_life" },
//           ].map(({ label, name }) => (
//             <div key={name} className="md:col-span-2">
//               <label className="block text-sm font-medium text-black mb-1">{label}</label>
//               <textarea
//                 name={name}
//                 rows={2}
//                 value={formData[name as keyof typeof formData] as string}
//                 onChange={handleChange}
//                 className="w-full p-2 rounded bg-white text-black border border-gray-300"
//               ></textarea>
//             </div>
//           ))}

//           {/* Nivel de Actividad */}
//           <div>
//             <label className="block text-sm font-medium text-black mb-1">Nivel de Actividad</label>
//             <select
//               name="activity_level"
//               value={formData.activity_level}
//               onChange={handleChange}
//               className="w-full p-2 rounded bg-white text-black border border-gray-300"
//             >
//               <option value="">Seleccione</option>
//               <option value="Sedentary">Sedentario</option>
//               <option value="Moderate">Moderado</option>
//               <option value="Active">Activo</option>
//             </select>
//           </div>

//           {/* Consentimiento */}
//           <div className="md:col-span-2 flex items-center space-x-2">
//             <input
//               type="checkbox"
//               name="medical_consent_form"
//               checked={formData.medical_consent_form}
//               onChange={handleChange}
//             />
//             <label className="text-sm font-medium text-black">
//               Acepto el consentimiento médico informado
//             </label>
//           </div>

//           {/* Botón */}
//           <div className="md:col-span-2">
//             <button
//               type="submit"
//               className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
//             >
//               Guardar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CapturarDatosMedicos;

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createHealthRecord  } from "@/services/healthrecordsService";
import { readPatients } from "@/services/patientsService";

const CapturarDatosMedicos: React.FC = () => {
  const [patients, setPatients] = useState<{ id: string; name: string; surnames: string }[]>([]);
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

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const data = await readPatients();
        setPatients(Array.isArray(data) ? data : []);
      } catch (error) {
        toast.error("Error al obtener pacientes");
      }
    };

    fetchPatients();
  }, []);

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
  
      toast.success("Datos médicos guardados correctamente");
  
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
      toast.error("Error al guardar los datos médicos");
      console.error(error);
    }
  };
  
  const isFormValid = Object.values(formData).every(
    (val) => val !== "" && val !== null && val !== undefined
  ) && formData.medical_consent_form;

  return (
    <div className="flex justify-center items-start pt-28 pb-10 bg-white">
      <div className="bg-gray-100 p-8 rounded-lg shadow-md max-w-5xl w-full">
        <h2 className="text-2xl font-bold mb-6 text-black text-center">
          Capturar Datos del Paciente
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Selector de paciente */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-black mb-1">Seleccionar Paciente</label>
            <select
              name="patient_id"
              value={formData.patient_id}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            >
              <option value="">Seleccione un paciente</option>
              {patients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} {p.surnames}
                </option>
              ))}
            </select>
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
              <label className="block text-sm font-medium text-black mb-1">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
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
              <label className="block text-sm font-medium text-black mb-1">{label}</label>
              <textarea
                name={name}
                rows={2}
                value={formData[name as keyof typeof formData] as string}
                onChange={handleChange}
                className="w-full p-2 rounded bg-white text-black border border-gray-300"
              ></textarea>
            </div>
          ))}

          {/* Nivel de Actividad */}
          <div>
            <label className="block text-sm font-medium text-black mb-1">Nivel de Actividad</label>
            <select
              name="activity_level"
              value={formData.activity_level}
              onChange={handleChange}
              className="w-full p-2 rounded bg-white text-black border border-gray-300"
            >
              <option value="">Seleccione</option>
              <option value="Sedentary">Sedentario</option>
              <option value="Moderate">Moderado</option>
              <option value="Active">Activo</option>
            </select>
          </div>

          {/* Consentimiento */}
          <div className="md:col-span-2 flex items-center space-x-2">
            <input
              type="checkbox"
              name="medical_consent_form"
              checked={formData.medical_consent_form}
              onChange={handleChange}
            />
            <label className="text-sm font-medium text-black">
              Acepto el consentimiento médico informado
            </label>
          </div>

          {/* Botón */}
          <div className="md:col-span-2">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`w-full py-2 px-4 rounded transition ${
                isFormValid
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
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
