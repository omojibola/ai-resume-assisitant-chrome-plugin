export interface ValidationErrors {
  [key: string]: string | null;
}

export const validateFullName = (fullName: string): string | null => {
  if (!fullName.trim()) return 'Full Name is required.';
  if (fullName.trim().length < 3)
    return 'Full Name must be at least 3 characters.';
  return null;
};

export const validateEmail = (email: string): string | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return 'Email is required.';
  if (!emailRegex.test(email)) return 'Invalid email address.';
  return null;
};

export const validatePhone = (phone: string): string | null => {
  const phoneRegex = /^\d{10}$/;
  if (!phone.trim()) return 'Phone number is required.';
  if (!phoneRegex.test(phone)) return 'Phone number must be exactly 10 digits.';
  return null;
};

export const validateAdditionalInfo = (
  additionalInfo: string
): string | null => {
  if (additionalInfo.trim() && additionalInfo.trim().length > 500) {
    return 'Additional information must not exceed 500 characters.';
  }
  return null;
};

export const validateForm = (
  formData: Record<string, string>
): ValidationErrors => {
  return {
    fullName: validateFullName(formData.fullName),
    email: validateEmail(formData.email),
    phone: validatePhone(formData.phone),
    additionalInfo: validateAdditionalInfo(formData.additionalInfo),
  };
};
