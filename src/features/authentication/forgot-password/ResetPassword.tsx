import { type FormEvent, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import Field from '../../../components/ui/Field';
import { PasswordInput } from '../../../components/ui/TextInput';
import Button from '../../../components/ui/Button';
import { useAuthRecoveryStore } from '../../authentication/login/store';
import { isStrongPassword, passwordStrengthHint } from '../../authentication/login/validation';

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  
  const { resetPassword, loading, error, success, clearError, clearSuccess } = useAuthRecoveryStore();

 
  useEffect(() => {
    if (!token) {
      navigate('/auth/forgot-password');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (success === 'password_updated') {
     
      setTimeout(() => {
        navigate('/auth/login');
      }, 2000);
    }
  }, [success, navigate]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPasswordError('');
    setConfirmError('');
    
    if (!password.trim()) {
      setPasswordError('Password is required');
      return;
    }
    
    if (!isStrongPassword(password)) {
      setPasswordError('Password does not meet requirements');
      return;
    }
    
    if (!confirmPassword.trim()) {
      setConfirmError('Please confirm your password');
      return;
    }
    
    if (password !== confirmPassword) {
      setConfirmError(t('errors.passwordsDontMatch'));
      return;
    }

    if (token) {
      await resetPassword(token, password);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (passwordError) setPasswordError('');
    if (error) clearError();
  };

  const handleConfirmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (confirmError) setConfirmError('');
    if (error) clearError();
  };

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  if (!token) {
    return null;
  }

  if (success === 'password_updated') {
    return (
      <div className='text-center space-y-4'>
        <div className='p-4 rounded-lg bg-green-50 border border-green-200'>
          <div className='flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-green-100 rounded-full'>
            <svg className='w-6 h-6 text-green-600' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h3 className='text-lg font-medium text-green-900 mb-2'>Success!</h3>
          <p className='text-sm text-green-700'>{t('resetPassword.successTitle')}</p>
        </div>
        <p className='text-sm text-gray-500'>Redirecting to login...</p>
      </div>
    );
  }

  const strengthHints = passwordStrengthHint(password);
  const showHints = password.length > 0 && strengthHints.length > 0;

  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <Field label={t('resetPassword.password')}>
          <PasswordInput
            id='password'
            value={password}
            onChange={handlePasswordChange}
            placeholder='Enter new password'
            aria-describedby={passwordError ? 'password-error' : showHints ? 'password-hints' : undefined}
          />
          {passwordError && (
            <p id='password-error' className='mt-2 text-sm text-red-600'>
              {passwordError}
            </p>
          )}
          {showHints && (
            <div id='password-hints' className='mt-2'>
              <p className='text-xs text-gray-500 mb-1'>Password must include:</p>
              <ul className='text-xs text-gray-500 space-y-1'>
                {strengthHints.map((hint, index) => (
                  <li key={index} className='text-red-500'>{hint}</li>
                ))}
              </ul>
            </div>
          )}
        </Field>

        <Field label={t('resetPassword.confirmPassword')}>
          <PasswordInput
            id='confirmPassword'
            value={confirmPassword}
            onChange={handleConfirmChange}
            placeholder='Confirm new password'
            aria-describedby={confirmError ? 'confirm-error' : undefined}
          />
          {confirmError && (
            <p id='confirm-error' className='mt-2 text-sm text-red-600'>
              {confirmError}
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
            disabled={loading || !password || !confirmPassword}
          >
            {loading ? 'Updating...' : t('resetPassword.submit')}
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

export default ResetPassword;