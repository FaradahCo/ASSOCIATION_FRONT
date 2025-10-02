import { type FormEvent, useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import Button from '../../components/ui/Button';
import { useAuthRecoveryStore } from './store';

const Otp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const { 
    email, 
    otpExpiresAt, 
    verifyOtp, 
    resendOtp, 
    loading, 
    error, 
    clearError, 
    clearSuccess 
  } = useAuthRecoveryStore();


  useEffect(() => {
    if (!email) {
      navigate('/auth/forgot-password');
    }
  }, [email, navigate]);


  useEffect(() => {
    if (!otpExpiresAt) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((otpExpiresAt - now) / 1000));
      setTimeLeft(remaining);
      
      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [otpExpiresAt]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newValues = [...otpValues];
    newValues[index] = value.slice(-1);
    setOtpValues(newValues);
    
    // Auto-advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (error) clearError();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpValues[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').replace(/\D/g, '');
    const pastedArray = pastedData.slice(0, 6).split('');
    
    const newValues = [...otpValues];
    pastedArray.forEach((digit, index) => {
      if (index < 6) newValues[index] = digit;
    });
    setOtpValues(newValues);
    
    const nextIndex = Math.min(pastedArray.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const code = otpValues.join('');
    
    if (code.length !== 6) {
      return;
    }

    try {
      const token = await verifyOtp(code);
      navigate(`/auth/reset-password/${token}`);
    } catch {
      // Error is handled in store
    }
  };

  const handleResend = async () => {
    await resendOtp();
  };

  const isOtpComplete = otpValues.every(val => val !== '');
  const canResend = timeLeft === 0 && !loading;

  useEffect(() => {
    return () => {
      clearError();
      clearSuccess();
    };
  }, [clearError, clearSuccess]);

  if (!email) {
    return null;
  }

  return (
    <div>
      <div className='mb-8 text-center'>
        <p className='text-sm text-gray-600'>
          {t('otp.subtitle', { 
            email, 
            time: timeLeft > 0 ? formatTime(timeLeft) : '0:00'
          })}
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-4'>
            {t('otp.codeLabel')}
          </label>
          <div className='flex gap-3 justify-center'>
            {otpValues.map((value, index) => (
              <input
                key={index}
                ref={el => { inputRefs.current[index] = el; }}
                type='text'
                value={value}
                onChange={e => handleOtpChange(index, e.target.value)}
                onKeyDown={e => handleKeyDown(index, e)}
                onPaste={handlePaste}
                className='w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 bg-white'
                maxLength={1}
                aria-label={`Digit ${index + 1}`}
              />
            ))}
          </div>
        </div>

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
            disabled={!isOtpComplete || loading}
          >
            {loading ? 'Verifying...' : t('otp.verify')}
          </Button>
        </div>
      </form>

      <div className='mt-8 text-center space-y-3'>
        <div>
          {canResend ? (
            <button
              type='button'
              onClick={handleResend}
              className='text-sm font-medium transition-colors hover:underline'
              style={{ color: 'var(--Brand-color, #AA1826)' }}
              disabled={loading}
            >
              {t('otp.resend')}
            </button>
          ) : (
            <p className='text-sm text-gray-500'>
              {t('otp.resendIn', { time: formatTime(timeLeft) })}
            </p>
          )}
        </div>
        
        <button
          type='button'
          onClick={() => navigate('/auth/forgot-password')}
          className='text-sm font-medium transition-colors hover:underline'
          style={{ color: 'var(--Brand-color, #AA1826)' }}
        >
          {t('otp.editEmail')}
        </button>
      </div>
    </div>
  );
};

export default Otp;