import { API_ROUTES } from "@/config/api";

interface PatientData {
  name: string;
  surnames: string;
  gender: string;
  birthday: string;
}

// 🔹 Crear paciente
export const createPatient = async (data: PatientData) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear paciente");
  }

  return response.json();
};

// 🔹 Leer todos los pacientes
export const readPatients = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(`${API_ROUTES.PATIENTS.READ}/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener pacientes");
  }

  return response.json();
};

// 🔹 Actualizar paciente por ID
export const updatePatient = async (patient_id: string, data: PatientData) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.UPDATE(patient_id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar paciente");
  }

  return response.json();
};

// 🔹 Eliminar paciente por ID
export const deletePatient = async (patient_id: string) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.DELETE(patient_id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar paciente");
  }

  return response.json();
};
