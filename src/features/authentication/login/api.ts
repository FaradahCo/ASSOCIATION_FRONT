// src/features/auth/api.ts
const MOCK_USERS = new Map([
  ['user@example.com', { id: '1', email: 'user@example.com', passwordHash: 'old' }],
]);

const OTP_STORE: Record<string, { code: string; expiresAt: number; attempts: number }> = {};

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
const genCode = () => '000000'; // Simple OTP for testing
const EXPIRY_MS = 5 * 60 * 1000; // 5 minutes
const MAX_ATTEMPTS = 5;

export async function requestPasswordReset({ email }: { email: string }) {
  await delay(400);
  if (!MOCK_USERS.has(email)) {
    throw new Error('This email is not registered.');
  }
  const code = genCode();
  OTP_STORE[email] = { code, expiresAt: Date.now() + EXPIRY_MS, attempts: 0 };
  return { otp: code, expiresAt: OTP_STORE[email].expiresAt };
}

export async function resendOtp({ email }: { email: string }) {
  await delay(300);
  if (!MOCK_USERS.has(email)) throw new Error('This email is not registered.');
  const code = genCode();
  OTP_STORE[email] = { code, expiresAt: Date.now() + EXPIRY_MS, attempts: 0 };
  return { otp: code, expiresAt: OTP_STORE[email].expiresAt };
}

export async function verifyOtp({ email, code }: { email: string; code: string }) {
  await delay(300);
  const rec = OTP_STORE[email];
  if (!rec) throw new Error('The OTP has expired. Please request a new one.');
  if (Date.now() > rec.expiresAt) {
    delete OTP_STORE[email];
    throw new Error('The OTP has expired. Please request a new one.');
  }
  if (rec.attempts >= MAX_ATTEMPTS) throw new Error('Too many failed OTP attempts. Please request a new OTP.');
  if (code !== rec.code) {
    rec.attempts += 1;
    throw new Error('Invalid OTP. Please try again.');
  }
  const token = `reset-${Math.random().toString(36).slice(2)}`;
  delete OTP_STORE[email];
  return { token };
}

const strong = (pw: string) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{11,}$/.test(pw);

export async function resetPassword({ token, newPassword }: { token: string; newPassword: string }) {
  await delay(400);
  if (!token?.startsWith('reset-')) throw new Error('Invalid reset token.');
  if (!strong(newPassword)) {
    throw new Error('Your password must be at least 11 characters and contain letters, numbers, and special characters.');
  }
  return { ok: true };
}