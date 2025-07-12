import API from './api';

// Login function
export async function loginUser(username, password) {
  try {
    const response = await API.post('token/', {
      username,
      password
    });
    const token = response.data.token;
    // Save token in localStorage
    localStorage.setItem('token', token);
    return { success: true, token };
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}


// Register function
export async function registerUser(userData) {
  try {
    const response = await API.post('users/register/', userData);
    const token = response.data.token;
    // Save token in localStorage
    localStorage.setItem('token', token);

    return { success: true, token };
  } catch (error) {
    console.error('Register error:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
}
// Logout function
export function logoutUser() {
  // Remove token from localStorage
  localStorage.removeItem('token');
  return { success: true };
}



