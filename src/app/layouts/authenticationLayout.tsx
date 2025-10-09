import { Outlet, useLocation } from 'react-router';
import AuthSplit from '../../layouts/AuthSplit';
import { useTranslation } from 'react-i18next';
import LoginImg from '../../assets/loginImg.svg';
import ForgetPasswordImg from '../../assets/forget-password.svg';
import OtpImg from '../../assets/password_otp.svg';
import PadlockImg from '../../assets/Padlock.svg';
import SignupImg from '../../assets/signup.svg';
import PasswordOtpImg from '../../assets/password_otp.svg';
import DataImg from '../../assets/data.svg';
import BankImg from '../../assets/bank.svg';

const AuthenticationLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  // Determine the page type and content
  const getPageContent = () => {
    // Authentication routes
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
        illustration: (
          <img src={ForgetPasswordImg} alt='Forgot Password Illustration' />
        ),
      };
    }

    if (pathname.includes('/otp') && !pathname.includes('/register')) {
      return {
        title: t('otp.title'),
        description: t('otp.subtitle', { email: '', time: '' })
          .replace('{{email}}', '')
          .replace('{{time}}', ''),
        illustration: <img src={OtpImg} alt='OTP Verification Illustration' />,
      };
    }

    if (pathname.includes('/reset-password/')) {
      return {
        title: t('resetPassword.title'),
        description: t('resetPassword.subtitle'),
        illustration: (
          <img src={PadlockImg} alt='Reset Password Illustration' />
        ),
      };
    }

    // Signup routes - Dynamic illustration based on flow
    if (pathname.includes('/register')) {
      // First screen - always signup.svg
      if (pathname.includes('/check')) {
        return {
          title: t('signup.hibaCheck.title'),
          description: t('signup.hibaCheck.subtitle'),
          illustration: <img src={SignupImg} alt='Signup Illustration' />,
        };
      }

      // OTP screen - password_otp.svg (Flow A only)
      if (pathname.includes('/otp')) {
        return {
          title: t('signup.otp.title'),
          description: t('signup.otp.subtitle'),
          illustration: <img src={PasswordOtpImg} alt='OTP Verification' />,
        };
      }

      // Entity step - data.svg (both flows)
      if (pathname.includes('/entity')) {
        return {
          title: t('signup.hibaCheck.title'),
          illustration: <img src={DataImg} alt='Entity Information' />,
        };
      }

          if (pathname.includes('/profile')) {
            return {
              title: t('signup.hibaCheck.title'),
              // description: t('signup.entity.subtitle'),
              illustration: <img src={DataImg} alt='Entity Information' />,
            };
          }

      // Bank step - bank.svg (Flow B only, but shown for all)
      if (pathname.includes('/bank')) {
        return {
          title: t('signup.hibaCheck.title'),
         
          illustration: <img src={BankImg} alt='Bank Information' />,
        };
      }

      // Admin step - data.svg
      if (pathname.includes('/admin')) {
        return {
          title: t('signup.hibaCheck.title'),
          
          illustration: <img src={DataImg} alt='Admin Information' />,
        };
      }

      // Representative step - data.svg
      if (pathname.includes('/representative')) {
        return {
          title: t('signup.hibaCheck.title'),
         
          illustration: <img src={DataImg} alt='Representative Information' />,
        };
      }

      // Result pages - data.svg
      if (pathname.includes('/result/')) {
        return {
          title: t('signup.result.title'),
          description: t('signup.result.subtitle'),
          illustration: <img src={DataImg} alt='Result' />,
        };
      }

      // Default signup illustration (fallback)
      return {
        title: t('signup.hibaCheck.title'),
        description: t('signup.hibaCheck.subtitle'),
        illustration: <img src={SignupImg} alt='Signup' />,
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
