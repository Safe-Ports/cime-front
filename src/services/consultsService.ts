import { API_ROUTES } from "@/config/api";

// 🔹 Crear consulta
export const createConsult = async (data: any) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.CONSULTS.CREATE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al crear la consulta");
  }

  return response.json();
};

// 🔹 Leer todas las consultas
export const readConsults = async () => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.CONSULTS.READ, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al obtener las consultas");
  }

  return response.json();
};

// 🔹 Actualizar consulta por ID
export const updateConsult = async (consult_id: string, data: any) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.CONSULTS.UPDATE(consult_id), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Error al actualizar la consulta");
  }

  return response.json();
};

// 🔹 Eliminar consulta por ID
export const deleteConsult = async (consult_id: string) => {
  const token = sessionStorage.getItem("token");

  const response = await fetch(API_ROUTES.PATIENTS.CONSULTS.DELETE(consult_id), {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Error al eliminar la consulta");
  }

  return response.json();
};
