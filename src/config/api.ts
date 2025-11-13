const API_BASE_URL = "https://api.cimemedics.com.mx";

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/login`,
    },
    PATIENTS: {
        CREATE: `${API_BASE_URL}/patients/register`,
        READ: `${API_BASE_URL}/patients`,
        UPDATE: (patient_id: string) => `${API_BASE_URL}/patients/register/${patient_id}`,
        DELETE: (patient_id: string) => `${API_BASE_URL}/patients/${patient_id}`,
        HEALTH_RECORD: {
            CREATE: `${API_BASE_URL}/patients/health_records`,
            READ: `${API_BASE_URL}/patients/health_records`,
            READ_BY_PATIENT_ID: `${API_BASE_URL}/patients/health_records`,
            UPDATE: (patient_id: string) => `${API_BASE_URL}/patients/health_records/${patient_id}`,
            DELETE: (patient_id: string) => `${API_BASE_URL}/patients/health_records/${patient_id}`,
        },
    CONSULTS: {
        CREATE: `${API_BASE_URL}/consults/prescriptions`,
        READ: `${API_BASE_URL}/consults/prescriptions`,
        UPDATE: (prescription_id: string) => `${API_BASE_URL}/consults/prescriptions/${prescription_id}`,
        DELETE: (prescription_id: string) => `${API_BASE_URL}/consults/prescriptions/${prescription_id}`,
    }
    }
};