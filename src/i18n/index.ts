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
      forgotPassword: {
        title: 'Forgot your password?',
        subtitle: 'Enter your email to receive a one-time code.',
        emailLabel: 'Email address',
        submit: 'Send OTP',
        successTitle: 'A one-time password (OTP) has been sent to your email.',
      },
      otp: {
        title: 'Enter the 6-digit code',
        subtitle: 'We sent a code to {{email}}. It expires in {{time}}.',
        codeLabel: 'Verification code',
        verify: 'Verify',
        resend: 'Resend OTP',
        resendIn: 'Resend in {{time}}',
        editEmail: 'Change email',
      },
      resetPassword: {
        title: 'Set a new password',
        subtitle: 'Use at least 11 characters with letters, numbers and a special character.',
        password: 'New password',
        confirmPassword: 'Confirm new password',
        submit: 'Update password',
        successTitle: 'Your password has been updated successfully. You can now log in.',
      },
      errors: {
        emailNotRegistered: 'This email is not registered.',
        otpExpired: 'The OTP has expired. Please request a new one.',
        otpInvalid: 'Invalid OTP. Please try again.',
        otpMaxAttempts: 'Too many failed OTP attempts. Please request a new OTP.',
        passwordsDontMatch: 'The new passwords do not match. Please try again.',
        weakPassword: 'Your password must be at least 11 characters and contain letters, numbers, and special characters.',
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
      forgotPassword: {
        title: 'هل نسيت كلمة المرور؟',
        subtitle: 'أدخل بريدك الإلكتروني لتلقي رمز لمرة واحدة.',
        emailLabel: 'عنوان البريد الإلكتروني',
        submit: 'إرسال رمز التحقق',
        successTitle: 'تم إرسال رمز التحقق إلى بريدك الإلكتروني.',
      },
      otp: {
        title: 'أدخل الرمز المكون من 6 أرقام',
        subtitle: 'لقد أرسلنا رمزًا إلى {{email}}. ينتهي في {{time}}.',
        codeLabel: 'رمز التحقق',
        verify: 'تحقق',
        resend: 'إعادة إرسال رمز التحقق',
        resendIn: 'إعادة الإرسال في {{time}}',
        editEmail: 'تغيير البريد الإلكتروني',
      },
      resetPassword: {
        title: 'تعيين كلمة مرور جديدة',
        subtitle: 'استخدم 11 حرفًا على الأقل مع أحرف وأرقام ورمز خاص.',
        password: 'كلمة المرور الجديدة',
        confirmPassword: 'تأكيد كلمة المرور الجديدة',
        submit: 'تحديث كلمة المرور',
        successTitle: 'تم تحديث كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.',
      },
      errors: {
        emailNotRegistered: 'هذا البريد الإلكتروني غير مسجل.',
        otpExpired: 'انتهت صلاحية رمز التحقق. يرجى طلب رمز جديد.',
        otpInvalid: 'رمز التحقق غير صحيح. يرجى المحاولة مرة أخرى.',
        otpMaxAttempts: 'محاولات كثيرة فاشلة. يرجى طلب رمز تحقق جديد.',
        passwordsDontMatch: 'كلمات المرور الجديدة غير متطابقة. يرجى المحاولة مرة أخرى.',
        weakPassword: 'يجب أن تحتوي كلمة المرور على 11 حرفًا على الأقل وتتضمن أحرفًا وأرقامًا ورموزًا خاصة.',
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
