
export const validateEmployee = (formData) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData.fullName || formData.fullName.length < 3) {
    errors.fullName = "Name must be at least 3 characters";
  }

  if (!formData.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password || formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!formData.departmentId) {
    errors.departmentId = "Please select a government entity";
  }

  return errors;
};
