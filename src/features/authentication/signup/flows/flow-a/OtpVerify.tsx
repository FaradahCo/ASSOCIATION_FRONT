import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Alert } from 'antd';
import { useSignupStore } from '../../store';

export default function OtpVerify() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { hibaData, setCurrentStep } = useSignupStore();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resendTimer, setResendTimer] = useState(30);

  useEffect(() => {
    // Countdown timer for resend
    const interval = setInterval(() => {
      setResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) setError(null);
  };

  const onSubmit = async () => {
    if (otp.length !== 4) {
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
          otp,
          unn: hibaData?.unifiedNationalNumber,
        }),
      });

      const result = await response.json();

      if (result.success) {
        console.log('✅ OTP verified successfully. Continuing signup flow...');
        setCurrentStep(1);
        navigate('/register/profile');
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

      setOtp('');
    } catch {
      setError(t('signup.otp.resendError'));
    }
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        className='space-y-6'
      >
        <Form.Item label={t('signup.otp.codeLabel')} required={false}>
          <Input.OTP
            length={4}
            value={otp}
            onChange={handleOtpChange}
            size='large'
            disabled={isSubmitting}
          />
        </Form.Item>

        {/* Resend Timer */}
        <div className='flex items-center justify-center'>
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

        {error && (
          <Alert
            message={error}
            type='error'
            showIcon
            className='text-center'
          />
        )}

        <Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            block
            loading={isSubmitting}
            disabled={otp.length !== 4}
            className='!h-14 font-semibold'
          >
            {t('signup.otp.verify')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
