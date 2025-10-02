import { Outlet, useLocation } from 'react-router';
import AuthSplit from '../../layouts/AuthSplit';
import { useTranslation } from 'react-i18next';
import LoginImg from '../../assets/loginImg.svg';
import ForgetPasswordImg from '../../assets/forget-password.svg';
import OtpImg from '../../assets/password_otp.svg';
import PadlockImg from '../../assets/Padlock.svg';

const AuthenticationLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Determine the page type and content
  const getPageContent = () => {
    if (pathname.endsWith('/auth/login') || pathname === '/auth') {
      return {
        title: t('login.pageTitle'),
        description: t('login.pageDescription'),
        illustration: <img src={LoginImg} alt='Login Illustration' />,
      };
    }
    
    if (pathname.endsWith('/forgot-password')) {
      return {
        title: t('forgotPassword.title'),
        description: t('forgotPassword.subtitle'),
        illustration: <img src={ForgetPasswordImg} alt='Forgot Password Illustration' />,
      };
    }
    
    if (pathname.endsWith('/otp')) {
      return {
        title: t('otp.title'),
        description: t('otp.subtitle', { email: '', time: '' }).replace('{{email}}', '').replace('{{time}}', ''),
        illustration: <img src={OtpImg} alt='OTP Verification Illustration' />,
      };
    }
    
    if (pathname.includes('/reset-password/')) {
      return {
        title: t('resetPassword.title'),
        description: t('resetPassword.subtitle'),
        illustration: <img src={PadlockImg} alt='Reset Password Illustration' />,
      };
    }
    
    // Default fallback
    return {
      title: t('login.title'),
      description: '',
      illustration: <img src={LoginImg} alt='Auth Illustration' />,
    };
  };

  const { title, description, illustration } = getPageContent();
  const rightTitle = t('login.rightTitle');
  const rightSubtitle = t('login.rightSub');

  return (
    <AuthSplit
      title={title}
      description={description}
      rightTitle={rightTitle}
      rightSubtitle={rightSubtitle}
      rightIllustration={illustration}
    >
      <Outlet />
    </AuthSplit>
  );
};

export default AuthenticationLayout;
