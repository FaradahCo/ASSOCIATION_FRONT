// src/features/auth/store.ts
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as api from './api';

type AuthRecoveryState = {
  email: string | null;
  otp: string | null;
  otpExpiresAt: number | null
  otpAttempts: number;
  maxOtpAttempts: number;
  loading: boolean;
  error: string | null;
  success: string | null;
};

type Actions = {
  requestPasswordReset: (email: string) => Promise<void>;
  resendOtp: () => Promise<void>;
  verifyOtp: (code: string) => Promise<string>; 
  resetPassword: (token: string, newPassword: string) => Promise<void>;
  clearError: () => void;
  clearSuccess: () => void;
};

export const useAuthRecoveryStore = create<AuthRecoveryState & Actions>()(
  persist(
    (set, get) => ({
      email: null,
      otp: null,
      otpExpiresAt: null,
      otpAttempts: 0,
      maxOtpAttempts: 5,
      loading: false,
      error: null,
      success: null,

      async requestPasswordReset(email) {
        set({ loading: true, error: null, success: null });
        try {
          const { otp, expiresAt } = await api.requestPasswordReset({ email });
          set({ email, otp, otpExpiresAt: expiresAt, otpAttempts: 0, success: 'otp_sent' });
        } catch (e: unknown) {
          set({ error: e instanceof Error ? e.message : String(e) });
        } finally {
          set({ loading: false });
        }
      },

      async resendOtp() {
        const email = get().email;
        if (!email) return;
        set({ loading: true, error: null, success: null });
        try {
          const { otp, expiresAt } = await api.resendOtp({ email });
          set({ otp, otpExpiresAt: expiresAt, otpAttempts: 0, success: 'otp_resent' });
        } catch (e: unknown) {
          set({ error: e instanceof Error ? e.message : String(e) });
        } finally {
          set({ loading: false });
        }
      },

      async verifyOtp(code) {
        const { email } = get();
        if (!email) throw new Error('No email in context.');
        set({ loading: true, error: null, success: null });
        try {
          const { token } = await api.verifyOtp({ email, code });
          set({ success: 'otp_verified' });
          return token;
        } catch (e: unknown) {
          set({ error: e instanceof Error ? e.message : String(e) });
          throw e;
        } finally {
          set({ loading: false });
        }
      },

      async resetPassword(token, newPassword) {
        set({ loading: true, error: null, success: null });
        try {
          await api.resetPassword({ token, newPassword });
          set({ success: 'password_updated' });
        } catch (e: unknown) {
          set({ error: e instanceof Error ? e.message : String(e) });
        } finally {
          set({ loading: false });
        }
      },

      clearError() { set({ error: null }); },
      clearSuccess() { set({ success: null }); },
    }),
    {
      name: 'auth-recovery',
      storage: createJSONStorage(() => sessionStorage),
    
      partialize: (s) => ({ email: s.email, otpExpiresAt: s.otpExpiresAt }),
    }
  )
);