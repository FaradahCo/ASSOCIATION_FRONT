import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSignupStore } from './store';
import Button from '../../components/ui/Button';

export default function OtpVerify() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { hibaData, setCurrentStep } = useSignupStore();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();

    // Countdown timer for resend
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (index: number, value: string) => {
    // Only allow digits
    if (value && !/^\d$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 4);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, idx) => {
      if (idx < 4) newOtp[idx] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pastedData.length, 3)]?.focus();
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 4) {
      setError(t('signup.otp.invalidCode'));
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/otp/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          otp: otpCode,
          unn: hibaData?.unifiedNationalNumber,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ OTP verified successfully. Continuing signup flow...');
        setCurrentStep(1);
        navigate('/signup/entity');
      } else {
        setError(t('signup.otp.invalidCode'));
      }
    } catch {
      setError(t('signup.otp.verifyError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;

    setError(null);
    setResendTimer(30);

    try {
      await fetch('/api/otp/resend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          unn: hibaData?.unifiedNationalNumber,
        }),
      });

      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    } catch {
      setError(t('signup.otp.resendError'));
    }
  };

  // Mask email for display
  const maskedEmail = 'msc*********@*****.com';

  return (
    <div className='w-full max-w-md space-y-8'>
      <div className='space-y-3'>
        <h1 className='text-[40px] font-bold leading-normal text-black'>
          {t('signup.otp.title')}
        </h1>
        <p className='text-sm leading-[20px] text-[#6a6a6a]'>
          {t('signup.otp.subtitle')}{' '}
          <span className='font-bold text-[#38383a]'>{maskedEmail}</span>.{' '}
          {t('signup.otp.subtitleEnd')}
        </p>
      </div>

      <form onSubmit={onSubmit} className='space-y-6'>
        <div className='space-y-6'>
          {/* OTP Input Boxes */}
          <div className='flex gap-4 justify-end' dir='rtl'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                disabled={isSubmitting}
                className='w-20 h-20 text-center text-2xl font-bold bg-[#f9fafb] border border-[#e5e7eb] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--Brand-color,#aa1826)] focus:border-transparent transition-all'
              />
            ))}
          </div>

          {/* Resend Timer */}
          <div className='flex items-center justify-end'>
            <button
              type='button'
              onClick={handleResend}
              disabled={resendTimer > 0}
              className='text-sm font-bold text-[#6c737f] disabled:cursor-not-allowed'
            >
              {t('signup.otp.resendIn')} (
              <span className='text-[#007aff]'>{resendTimer}</span>{' '}
              {t('signup.otp.seconds')})
            </button>
          </div>
        </div>

        {error && (
          <div className='p-3 rounded-lg bg-red-50 border border-red-200'>
            <p className='text-sm text-red-600 text-center'>{error}</p>
          </div>
        )}

        <Button
          htmlType='submit'
          type='primary'
          className='w-full !h-14'
          disabled={isSubmitting || otp.join('').length !== 4}
        >
          {isSubmitting ? t('common.loading') : t('signup.otp.verify')}
        </Button>
      </form>
    </div>
  );
}
