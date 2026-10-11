export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLogin({ email, password }) {
  const errors = {};
  if (!email?.trim()) {
    errors.email = 'Please enter your email address';
  } else if (!emailRegex.test(email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!password) {
    errors.password = 'Please enter your password';
  }
  return errors;
}

export function validateSignup(data) {
  const errors = {};
  if (!data.name?.trim()) {
    errors.name = 'Full name is required';
  }
  if (!data.email?.trim()) {
    errors.email = 'Email address is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }
  if (!data.password || data.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }
  if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  return errors;
}

export function passwordStrength(password) {
  if (!password) return 0;
  let s = 0;
  if (password.length >= 8) s++;
  if (/[A-Z]/.test(password)) s++;
  if (/[0-9]/.test(password)) s++;
  if (/[^A-Za-z0-9]/.test(password)) s++;
  return s;
}
