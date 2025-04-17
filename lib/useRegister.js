import { useState, useCallback } from "react";
import { isValidEmail } from "./utils";

// Validation helper for password
const validatePassword = (password) => {
  return password && password.length >= 8;
};

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Clear any existing errors
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Validate user data before submitting
  // const validateUserData = useCallback((userData) => {
  // Check required fields
  // const requiredFields = ['email', 'password', 'fullName', 'twitter', 'role', 'project', 'bio', 'event'];

  // for (const field of requiredFields) {
  //   if (!userData[field]) {
  //     throw new Error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
  //   }
  // }

  // Validate email format
  // if (!isValidEmail(userData.email)) {
  //   throw new Error('Please enter a valid email address');
  // }

  // // Validate password length
  // if (!validatePassword(userData.password)) {
  //   throw new Error('Password must be at least 8 characters long');
  // }

  // Validate profile image
  // if (!userData.profileImagePreview) {
  //   throw new Error('Profile image is required');
  // }

  //   return true;
  // }, []);

  // Register user with API
  const registerUser = useCallback(async (userData) => {
    setIsLoading(true);
    setError(null);
    setSuccessData(null);

    try {
      // First validate the user data
      // validateUserData(userData);

      // Send registration request to API
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      // Store success data
      setSuccessData(data);
      setIsLoading(false);
      return data;
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
      throw err;
    }
  }, []);

  return {
    registerUser,
    isLoading,
    error,
    clearError,
    successData,
  };
}
