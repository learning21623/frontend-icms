export const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  return /^[6-9]\d{9}$/.test(phone);
};

export const isStrongPassword = (password: string): boolean => {
  return password.length >= 8; // Customize more rules if needed
};
