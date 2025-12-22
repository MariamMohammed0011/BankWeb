import { useState } from "react";

export const useFormValidation = () => {
  const [errors, setErrors] = useState({});

  const validateUsername = (username) => {
    if (!username) return "Username is required";
    if (username.length < 3)
      return "Username must be at least 3 characters";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6)
      return "Password must be at least 6 characters";
    return "";
  };

  const validateForm = ({ Username, password }) => {
    const usernameError = validateUsername(Username);
    const passwordError = validatePassword(password);

    setErrors({
      Username: usernameError,
      password: passwordError,
    });

    return !usernameError && !passwordError;
  };

  return {
    errors,
    validateForm,
    validateUsername,
    validatePassword,
  };
};
