import { Outlet, useLocation } from 'react-router';
import AuthSplit from '../../layouts/AuthSplit';
import { useTranslation } from 'react-i18next';
import LoginImg from '../../assets/loginImg.svg';


const AuthenticationLayout = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isLogin = pathname.endsWith('/auth/login');

  const title = isLogin ? t('login.pageTitle') : t('login.title');
  const description = isLogin ? t('login.pageDescription') : '';
  const rightTitle = t('login.rightTitle');
  const rightSubtitle = t('login.rightSub');

  return (
    <AuthSplit
      title={title}
      description={description}
      rightTitle={rightTitle}
      rightSubtitle={rightSubtitle}
      rightIllustration={<img src={LoginImg} alt='Login Illustration' />}
    >
      <Outlet />
    </AuthSplit>
  );
};

export default AuthenticationLayout;
