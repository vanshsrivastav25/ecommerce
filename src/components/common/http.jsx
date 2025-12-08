// src/components/common/http.js
export const apiUrl = 'http://localhost:8000/api';

export const adminToken = () => {
  const data = JSON.parse(localStorage.getItem('adminInfo'))
  return data.token;
}

export const userToken = () => {
  const data = JSON.parse(localStorage.getItem('userInfo'))
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

export const STRIPE_PUBLIC_KEY='pk_test_51SMoV511VNpQVwgK7WRszxX1sGGUhB9wTaLqPdKDC13wRHt7OGco0Yi9ic8MsUXQGEi64EyWqjDslWzAeZmeAYBQ00tlJMCQd2'