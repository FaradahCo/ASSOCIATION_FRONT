import { type FormEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Field from '../../../components/ui/Field';
import { TextInput } from '../../../components/ui/TextInput';
import Button from '../../../components/ui/Button';
import { useAuthRecoveryStore } from '../../authentication/login/store';
import { isValidEmail } from '../../authentication/login/validation';

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const {
    requestPasswordReset,
    loading,
    error,
    success,
    clearError,
    clearSuccess,
  } = useAuthRecoveryStore();

  useEffect(() => {
    if (success === 'otp_sent') {
      navigate('/auth/forgot-password/otp');
    }
  }, [success, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmailError('');

    if (!email.trim()) {
      setEmailError('Email is required');
      return;
    }

    if (!isValidEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }

    await requestPasswordReset(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (emailError) setEmailError('');
    if (error) clearError();
  };

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <Field label={t('forgotPassword.emailLabel')}>
          <TextInput
            id='email'
            type='email'
            value={email}
            onChange={handleEmailChange}
            placeholder={t('login.emailPlaceholder')}
            aria-describedby={emailError ? 'email-error' : undefined}
          />
          {emailError && (
            <p id='email-error' className='mt-2 text-sm text-red-600'>
              {emailError}
            </p>
          )}
        </Field>

        {error && (
          <div className='p-3 rounded-lg bg-red-50 border border-red-200'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        <div className='pt-2'>
          <Button
            htmlType='submit'
            type='primary'
            className='w-full'
            disabled={loading}
          >
            {loading ? 'Sending...' : t('forgotPassword.submit')}
          </Button>
        </div>
      </form>

      <div className='mt-8 text-center'>
        <button
          type='button'
          onClick={() => navigate('/auth/login')}
          className='text-sm font-medium transition-colors'
          style={{ color: 'var(--Brand-color, #AA1826)' }}
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
