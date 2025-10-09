import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Button, Form, Input, Alert } from 'antd';
import { useAuthRecoveryStore } from '../../authentication/login/store';

type ForgotPasswordForm = {
  email: string;
};

const ForgotPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm<ForgotPasswordForm>();

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

  const handleSubmit = async (values: ForgotPasswordForm) => {
    await requestPasswordReset(values.email);
  };

  const handleFieldChange = () => {
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
      <Form
        form={form}
        onFinish={handleSubmit}
        onFieldsChange={handleFieldChange}
        layout='vertical'
        className='space-y-1'
      >
        <Form.Item
          name='email'
          required={false}
          label={t('forgotPassword.emailLabel')}
          rules={[
            { required: true, message: 'Email is required' },
            { type: 'email', message: 'Please enter a valid email address' },
          ]}
        >
          <Input placeholder={t('login.emailPlaceholder')} size='large' />
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
            className='font-semibold'
          >
            {t('forgotPassword.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-6 text-center'>
        <button
          type='button'
          onClick={() => navigate('/auth/login')}
          className='text-sm font-medium transition-colors hover:underline'
        >
          {t('forgotPassword.backToLogin')}
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
