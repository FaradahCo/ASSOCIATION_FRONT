import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type SignupFlow = 'A' | 'B';

export interface SignupState {
  // Flow control
  currentStep: number;
  flow: SignupFlow | null;
  
  // Form data
  hibaData: {
    unifiedNationalNumber: string;
    organizationName?: string;
    isVerified?: boolean;
  } | null;
  
  entityData: {
    organizationName: string;
    organizationEmail: string;
    phone: string;
    region: string;
    city: string;
    unifiedNationalNumber: string;
  } | null;
  
  bankData: {
    bankAccountName: string;
    bankName: string;
    iban: string;
    ibanFile?: File | null;
  } | null;
  
  adminData: {
    fullName: string;
    email: string;
    position: string;
    phone: string;
    password: string;
    confirmPassword: string;
  } | null;
  
  representativeData: {
    fullName: string;
    email: string;
    position: string;
    phone: string;
  } | null;
  
  // UI state
  isLoading: boolean;
  error: string | null;
  
  // Actions
  setFlow: (flow: SignupFlow) => void;
  setCurrentStep: (step: number) => void;
  setHibaData: (data: SignupState['hibaData']) => void;
  setEntityData: (data: SignupState['entityData']) => void;
  setBankData: (data: SignupState['bankData']) => void;
  setAdminData: (data: SignupState['adminData']) => void;
  setRepresentativeData: (data: SignupState['representativeData']) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

const initialState = {
  currentStep: 0,
  flow: null,
  hibaData: null,
  entityData: null,
  bankData: null,
  adminData: null,
  representativeData: null,
  isLoading: false,
  error: null,
};

export const useSignupStore = create<SignupState>()(
  devtools(
    (set, get) => ({
      ...initialState,
      
      setFlow: (flow) => set({ flow }),
      setCurrentStep: (currentStep) => set({ currentStep }),
      setHibaData: (hibaData) => set({ hibaData }),
      setEntityData: (entityData) => set({ entityData }),
      setBankData: (bankData) => set({ bankData }),
      setAdminData: (adminData) => set({ adminData }),
      setRepresentativeData: (representativeData) => set({ representativeData }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error }),
      
      nextStep: () => {
        const { currentStep, flow } = get();
        const maxSteps = flow === 'A' ? 6 : 5; // Flow A has OTP step
        if (currentStep < maxSteps) {
          set({ currentStep: currentStep + 1 });
        }
      },
      
      prevStep: () => {
        const { currentStep } = get();
        if (currentStep > 0) {
          set({ currentStep: currentStep - 1 });
        }
      },
      
      reset: () => set(initialState),
    }),
    { name: 'signup-store' }
  )
);