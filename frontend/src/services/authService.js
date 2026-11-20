/**
 * MLForge AI - Centralized Authentication Service
 * Communicates with the FastAPI backend over REST APIs with secure credentials.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const AUTH_URL = `${API_BASE_URL}/api/auth`;

/**
 * Helper to parse backend error responses cleanly
 */
async function handleResponseError(response) {
  try {
    const errorData = await response.json();
    if (errorData.detail) {
      if (Array.isArray(errorData.detail)) {
        // Pydantic validation error list
        return errorData.detail.map((err) => err.msg || err.message).join(' ');
      }
      return errorData.detail;
    }
    if (errorData.message) {
      return errorData.message;
    }
  } catch (err) {
    // Non-JSON or connection error
  }
  return `Request failed with status ${response.status}: ${response.statusText}`;
}

export const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password, confirm_password }
   */
  async register(userData) {
    try {
      const response = await fetch(`${AUTH_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Includes HTTP-only session cookies
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorMsg = await handleResponseError(response);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Unable to connect to MLForge backend server. Please verify backend is running on http://localhost:8000.');
      }
      throw err;
    }
  },

  /**
   * Login user with credentials
   * @param {Object} credentials - { email, password, remember_me }
   */
  async login(credentials) {
    try {
      const response = await fetch(`${AUTH_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Includes HTTP-only session cookies
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorMsg = await handleResponseError(response);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Unable to connect to MLForge backend server. Please verify backend is running on http://localhost:8000.');
      }
      throw err;
    }
  },

  /**
   * Logout current session
   */
  async logout() {
    try {
      const response = await fetch(`${AUTH_URL}/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        const errorMsg = await handleResponseError(response);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      // Even if network fails, allow client cleanup
      return { status: 'success', message: 'Logged out locally' };
    }
  },

  /**
   * Retrieve current user profile from active session cookie
   */
  async getCurrentUser() {
    try {
      const response = await fetch(`${AUTH_URL}/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (response.status === 401 || response.status === 403) {
        return null;
      }

      if (!response.ok) {
        return null;
      }

      return await response.json();
    } catch (err) {
      return null;
    }
  },

  /**
   * Request password reset instructions
   * @param {Object} data - { email }
   */
  async forgotPassword(data) {
    try {
      const response = await fetch(`${AUTH_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = await handleResponseError(response);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Unable to connect to MLForge backend server. Please verify backend is running on http://localhost:8000.');
      }
      throw err;
    }
  },

  /**
   * Reset password with token
   * @param {Object} data - { token, new_password, confirm_password }
   */
  async resetPassword(data) {
    try {
      const response = await fetch(`${AUTH_URL}/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorMsg = await handleResponseError(response);
        throw new Error(errorMsg);
      }

      return await response.json();
    } catch (err) {
      if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        throw new Error('Unable to connect to MLForge backend server. Please verify backend is running on http://localhost:8000.');
      }
      throw err;
    }
  },
};

