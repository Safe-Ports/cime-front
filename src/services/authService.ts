import { API_ROUTES } from '@/config/api';

export const login = async (username: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('grant_type', 'password'); // 👈 FASTAPI LO EXIGE

  try {
    const response = await fetch(`${API_ROUTES.AUTH.LOGIN}/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Server error:", errorData);
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