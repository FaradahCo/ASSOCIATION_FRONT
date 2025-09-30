import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    common: {
      companyLogo: 'COMPANY LOGO',
      poweredBy: 'powered by faradah',
      login: {
        title: 'Welcome back',
        pageTitle: 'Log in',
        pageDescription:
          'We usually place a brief onboarding message here, typically one line long.',
        email: 'Email',
        password: 'Password',
        remember: 'Remember me',
        forgot: 'Forgot password?',
        submit: 'Log in',
        emailPlaceholder: 'Enter your email',
        passwordPlaceholder: 'Enter your password',
        noAccount: 'Don’t have an account?',
        create: 'Create a new account',
        rightTitle: 'Welcome to Company name',
        rightSub:
          'Manage your association with professional confidence and ease.',
      },
    },
  },
  ar: {
    common: {
      companyLogo: 'شعار الشركة',
      poweredBy: 'برعاية faradah',
      login: {
        title: 'مرحبًا بعودتك',
        pageTitle: 'تسجيل الدخول',
        pageDescription:
          'هنا يتم وضع رسالة ترحيبية بالأزرار والتي تكون عادة من سطر.',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        remember: 'تذكرني',
        forgot: 'هل نسيت كلمة المرور؟',
        submit: 'تسجيل الدخول',
        emailPlaceholder: 'أدخل بريدك الإلكتروني',
        passwordPlaceholder: 'أدخل كلمة المرور الخاصة بك',
        noAccount: 'ليس لديك حساب؟',
        create: 'إنشاء حساب جديد',
        rightTitle: 'مرحبا بكم في اسم الشركة',
        rightSub: 'نحن هنا لتسهيل حياتك المهنية',
      },
    },
  },
} as const;

i18n.use(initReactI18next).init({
  resources,
  lng: 'ar',
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
