// src/components/common/http.js
export const apiUrl = 'http://localhost:8000/api';

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