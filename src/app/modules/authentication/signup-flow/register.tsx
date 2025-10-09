import { useEffect } from 'react';
import { useNavigate } from 'react-router';

const Register = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to signup flow
    navigate('/auth/register/check', { replace: true });
  }, [navigate]);

  return null;
};

export default Register;
