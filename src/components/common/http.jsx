// src/components/common/http.js
export const apiUrl = 'http://localhost:8000/api';

export const adminToken = () => {
  const data = JSON.parse(localStorage.getItem('adminInfo'))
  return data.token;
}

// CSRF token function
export const getCsrfToken = async () => {
  try {
    await fetch('http://localhost:8000/sanctum/csrf-cookie', {
      method: 'GET',
      credentials: 'include'
    });
  } catch (error) {
    console.error('CSRF token error:', error);
  }
};