const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const API_ROUTES = {
    AUTH: {
        LOGIN: `${API_BASE_URL}/login`,
    },

    PATIENTS: {
        CREATE: `${API_BASE_URL}/patients/register`,
        READ: `${API_BASE_URL}/patients`,
        UPDATE: (patient_id: string) =>
            `${API_BASE_URL}/patients/register/${patient_id}`,
        DELETE: (patient_id: string) =>
            `${API_BASE_URL}/patients/${patient_id}`,

        HEALTH_RECORD: {
            CREATE: `${API_BASE_URL}/patients/health_records`,
            READ: `${API_BASE_URL}/patients/health_records`,
            READ_BY_PATIENT_ID: (patient_id: string) =>
                `${API_BASE_URL}/patients/health_records/${patient_id}`,
            UPDATE: (record_id: string) =>
                `${API_BASE_URL}/patients/health_records/${record_id}`,
            DELETE: (record_id: string) =>
                `${API_BASE_URL}/patients/health_records/${record_id}`,
        }
    },

    CONSULTS: {
        CREATE: `${API_BASE_URL}/consults/prescriptions`,
        READ: `${API_BASE_URL}/consults/prescriptions`,
        UPDATE: (prescription_id: string) =>
            `${API_BASE_URL}/consults/prescriptions/${prescription_id}`,
        DELETE: (prescription_id: string) =>
            `${API_BASE_URL}/consults/prescriptions/${prescription_id}`,
    }
};