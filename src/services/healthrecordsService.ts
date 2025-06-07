import { API_ROUTES } from "@/config/api";

// 🔹 Crear health record
export const createHealthRecord = async (data: any) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.HEALTH_RECORD.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear expediente médico");
  }

  return response.json();
};

// 🔹 Leer todos los health records
export const readHealthRecords = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.HEALTH_RECORD.READ, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener expedientes médicos");
  }

  return response.json();
};

// 🔹 Actualizar health record
export const updateHealthRecord = async (patient_id: string, data: any) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.HEALTH_RECORD.UPDATE(patient_id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar expediente médico");
  }

  return response.json();
};

// 🔹 Eliminar health record
export const deleteHealthRecord = async (patient_id: string) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.HEALTH_RECORD.DELETE(patient_id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar expediente médico");
  }

  return response.json();
};
