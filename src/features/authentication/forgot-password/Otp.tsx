import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Input, Alert, Form } from 'antd';
import { useAuthRecoveryStore } from '../../authentication/login/store';

const Otp = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [otp, setOtp] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);

  const {
    email,
    otpExpiresAt,
    verifyOtp,
    resendOtp,
    loading,
    error,
    clearError,
    clearSuccess,
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

  const handleOtpChange = (value: string) => {
    setOtp(value);
    if (error) clearError();
  };

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      return;
    }

    try {
      const token = await verifyOtp(otp);
      navigate(`/auth/forgot-password/reset/${token}`);
    } catch {
      // Error is handled in store
    }
  };

  const handleResend = async () => {
    setOtp('');
    await resendOtp();
  };

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
            time: timeLeft > 0 ? formatTime(timeLeft) : '0:00',
          })}
        </p>
      </div>

      <Form
        form={form}
        onFinish={handleSubmit}
        layout='vertical'
        className='space-y-6'
      >
        <Form.Item label={t('otp.codeLabel')} required={false}>
          <Input.OTP
            length={6}
            value={otp}
            onChange={handleOtpChange}
            size='large'
            disabled={loading}
          />
        </Form.Item>

        {error && (
          <Alert message={error} type='error' showIcon className='mb-4' />
        )}

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            loading={loading}
            disabled={otp.length !== 6}
            className='font-semibold'
          >
            {t('otp.verify')}
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-8 text-center space-y-3'>
        <div>
          {canResend ? (
            <button
              type='button'
              onClick={handleResend}
              className='text-sm font-medium transition-colors hover:underline'
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
        >
          {t('otp.editEmail')}
        </button>
      </div>
    </div>
  );
};

export default Otp;
