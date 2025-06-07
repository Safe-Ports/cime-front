import { API_ROUTES } from '@/config/api';

export const login = async (username: string, password: string) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  try {
    const response = await fetch(API_ROUTES.AUTH.LOGIN, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Error en el login');
    }

    const data = await response.json();
    return {
      accessToken: data.access_token,
      tokenType: data.token_type,
    };
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
