import { http, HttpResponse } from "msw";
import { patientsMock } from "./data/patientsMock";
import { medicalRecordsMock } from "./data/medicalRecordsMock";

const API_BASE = "http://localhost:5173";

// --- 🔹 Inicializar datos dummy en localStorage si no existen ---
const getStored = (key: string, fallback: any[]) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : fallback;
};

let patients = getStored("patients", [
  {
    id: 1,
    name: "Fernando",
    surnames: "Estrada Rosas",
    birthday: "2001-08-28",
    gender: "Masculino",
  },
  {
    id: 2,
    name: "María",
    surnames: "López García",
    birthday: "1995-02-14",
    gender: "Femenino",
  },
  {
    id: 3,
    name: "Carlos",
    surnames: "Hernández Ruiz",
    birthday: "1988-07-10",
    gender: "Masculino",
  },
]);

let healthRecords = getStored("health_records", [
  {
    id: 1,
    patient_id: 1,
    age: 23,
    weight: 70,
    body_size: 1.75,
    body_temperature: 36.8,
    blood_tension: "120/80",
    heart_rate: 72,
    respiratory_rate: 16,
    description_discomfort: "Dolor de cabeza leve",
    chronic_diseases: "Ninguna",
    allergies: "Ninguna",
    current_medications: "Ninguno",
    physical_exam_results: "Normal",
    created_at: "2025-10-10T09:00:00Z",
  },
]);

const saveData = (key: string, data: any) =>
  localStorage.setItem(key, JSON.stringify(data));

export const handlers = [
  // 🔹 GET /patients
  http.get(`${API_BASE}/patients`, () => {
  return HttpResponse.json(patients, { status: 200 });
}),

  // 🔹 POST /patients/register
  http.post(`${API_BASE}/patients/register`, async ({ request }) => {
    const newPatient = await request.json();

    if (!newPatient.name || !newPatient.surnames) {
      return HttpResponse.json(
        { message: "Campos obligatorios" },
        { status: 400 }
      );
    }

    const created = {
      id: patients.length + 1,
      ...newPatient,
    };

    patients.push(created);
    saveData("patients", patients);

    return HttpResponse.json({ result: created }, { status: 201 });
  }),

  // 🔹 GET /patients/health_records
  http.get(`${API_BASE}/patients/health_records`, () => {
    return HttpResponse.json({ result: healthRecords }, { status: 200 });
  }),

  // 🔹 POST /patients/health_records
  http.post(`${API_BASE}/patients/health_records`, async ({ request }) => {
    const newRecord = await request.json();

    if (!newRecord.patient_id || !newRecord.age) {
      return HttpResponse.json(
        { message: "Datos incompletos para crear expediente médico" },
        { status: 400 }
      );
    }

    const createdRecord = {
      id: Date.now(),
      ...newRecord,
      created_at: new Date().toISOString(),
    };

    healthRecords.push(createdRecord);
    saveData("health_records", healthRecords);

    console.log("🧾 Mock record creado:", createdRecord);

    return HttpResponse.json({ result: createdRecord }, { status: 201 });
  }),

    // 🔹 GET /consults/prescriptions
http.get(`${API_BASE}/consults/prescriptions`, () => {
  const prescriptions = [
    {
      id: "r1",
      patient_id: 1, // 🔗 Fernando Estrada Rosas
      prescription: "Paracetamol cada 8 horas por 5 días",
      created_at: "2025-10-10T10:00:00Z",
      medicament_prescriptions: ["Paracetamol", "Ibuprofeno"],
    },
    {
      id: "r2",
      patient_id: 2, // 🔗 María López García
      prescription: "Amoxicilina 500mg cada 12 horas",
      created_at: "2025-10-12T12:00:00Z",
      medicament_prescriptions: ["Amoxicilina"],
    },
    {
      id: "r3",
      patient_id: 3, // 🔗 Carlos Hernández Ruiz
      prescription: "Loratadina 10mg diaria por 7 días",
      created_at: "2025-10-13T09:30:00Z",
      medicament_prescriptions: ["Loratadina"],
    },
  ];

  // 👇 Devolvemos un objeto con la propiedad result
  return HttpResponse.json({ result: prescriptions }, { status: 200 });
}),
];