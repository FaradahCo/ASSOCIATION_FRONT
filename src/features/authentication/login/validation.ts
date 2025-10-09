export const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export const isStrongPassword = (pw: string) =>
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{11,}$/.test(pw);

export const passwordStrengthHint = (pw: string) => {
  const msgs: string[] = [];
  if (pw.length < 11) msgs.push('• At least 11 characters');
  if (!/[A-Za-z]/.test(pw)) msgs.push('• Include a letter');
  if (!/\d/.test(pw)) msgs.push('• Include a number');
  if (!/[^A-Za-z0-9]/.test(pw)) msgs.push('• Include a special character');
  return msgs;
};