import { Outlet, useMatches } from 'react-router';
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

// Define the type for route metadata
export type AuthLayoutMetadata = {
  titleKey: string;
  descriptionKey?: string;
  illustration:
    | 'login'
    | 'forgotPassword'
    | 'otp'
    | 'padlock'
    | 'signup'
    | 'passwordOtp'
    | 'data'
    | 'bank';
};

// Illustration mapping
const illustrations = {
  login: <img src={LoginImg} alt='Login Illustration' />,
  forgotPassword: (
    <img src={ForgetPasswordImg} alt='Forgot Password Illustration' />
  ),
  otp: <img src={OtpImg} alt='OTP Verification Illustration' />,
  padlock: <img src={PadlockImg} alt='Reset Password Illustration' />,
  signup: <img src={SignupImg} alt='Signup Illustration' />,
  passwordOtp: <img src={PasswordOtpImg} alt='OTP Verification' />,
  data: <img src={DataImg} alt='Data Illustration' />,
  bank: <img src={BankImg} alt='Bank Information' />,
};

const AuthenticationLayout = () => {
  const { t } = useTranslation();
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1];
  const metadata = currentMatch.handle as AuthLayoutMetadata | undefined;

  // Extract metadata with fallbacks
  const title = metadata?.titleKey
    ? t(metadata.titleKey)
    : t('login.pageTitle');
  const description = metadata?.descriptionKey
    ? t(metadata.descriptionKey)
    : '';
  const illustration = metadata?.illustration
    ? illustrations[metadata.illustration]
    : illustrations.login;

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
