import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Button, Form, Input, Alert, Result } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { useAuthRecoveryStore } from '../../authentication/login/store';
import {
  isStrongPassword,
  passwordStrengthHint,
} from '../../authentication/login/validation';

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();
  const [form] = Form.useForm<ResetPasswordForm>();

  const { resetPassword, loading, error, success, clearError, clearSuccess } =
    useAuthRecoveryStore();

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

  const handleSubmit = async (values: ResetPasswordForm) => {
    if (token) {
      await resetPassword(token, values.password);
    }
  };

  const handleFieldsChange = () => {
    if (error) clearError();
  };

  const password = Form.useWatch('password', form);

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
      <Result
        status='success'
        icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
        title={t('resetPassword.successTitle')}
        subTitle='Redirecting to login...'
      />
    );
  }
  const strengthHints = password ? passwordStrengthHint(password) : [];
  const showHints = password && strengthHints.length > 0;

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        onFieldsChange={handleFieldsChange}
        layout='vertical'
        className='space-y-1'
      >
        <Form.Item
          name='password'
          required={false}
          label={t('resetPassword.password')}
          help={
            showHints && (
              <div className='mt-2'>
                <p className='text-xs text-gray-500 mb-1'>
                  Password must include:
                </p>
                <ul className='text-xs text-gray-500 space-y-1 list-disc list-inside'>
                  {strengthHints.map((hint, index) => (
                    <li key={index} className='text-red-500'>
                      {hint}
                    </li>
                  ))}
                </ul>
              </div>
            )
          }
          rules={[
            { required: true, message: 'Password is required' },
            {
              validator: (_, value) => {
                if (!value || isStrongPassword(value)) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Password does not meet requirements')
                );
              },
            },
          ]}
        >
          <Input.Password placeholder='Enter new password' size='large' />
        </Form.Item>

        <Form.Item
          name='confirmPassword'
          required={false}
          label={t('resetPassword.confirmPassword')}
          dependencies={['password']}
          rules={[
            { required: true, message: 'Please confirm your password' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t('errors.passwordsDontMatch'))
                );
              },
            }),
          ]}
        >
          <Input.Password placeholder='Confirm new password' size='large' />
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
            {t('resetPassword.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-6 text-center'>
        <button
          type='button'
          onClick={() => navigate('/auth/login')}
          className='text-sm font-medium transition-colors hover:underline'
        >
          ← Back to login
        </button>
      </div>
    </div>
  );
};

export default ResetPassword;
