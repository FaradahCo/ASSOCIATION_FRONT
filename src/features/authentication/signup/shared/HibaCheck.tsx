import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Alert } from 'antd';
import { useSignupStore } from '../store';

type HibaCheckForm = {
  unifiedNationalNumber: string;
};

export default function HibaCheck() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm<HibaCheckForm>();
  const { setFlow, setHibaData, setLoading } = useSignupStore();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoadingState] = useState(false);

  const onSubmit = async (values: HibaCheckForm) => {
    setError(null);
    setLoadingState(true);
    setLoading(true);

    try {
      // Mock API call to Hiba system
      const response = await fetch('/api/hiba/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (result.verified) {
        // Flow A: Organization found in Hiba
        console.log(
          '✅ Flow A: Registered user detected. Navigating to OTP verification...'
        );
        setFlow('A');
        setHibaData({
          unifiedNationalNumber: values.unifiedNationalNumber,
          organizationName: result.organizationName,
          isVerified: true,
        });
        navigate('/register/otp');
      } else {
        // Flow B: Organization not found in Hiba
        console.log(
          '🆕 Flow B: New user detected. Navigating to entity information...'
        );
        setFlow('B');
        setHibaData({
          unifiedNationalNumber: values.unifiedNationalNumber,
          isVerified: false,
        });
        navigate('/register/entity');
      }
    } catch {
      setError(t('signup.hibaCheckError'));
    } finally {
      setLoadingState(false);
      setLoading(false);
    }
  };

  const handleFieldsChange = () => {
    if (error) setError(null);
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <Form
        form={form}
        onFinish={onSubmit}
        onFieldsChange={handleFieldsChange}
        layout='vertical'
        className='space-y-8'
      >
        <Form.Item
          name='unifiedNationalNumber'
          required={false}
          label={t('signup.hibaCheck.unnLabel')}
          rules={[
            { required: true, message: 'License number is required' },
            { min: 10, message: 'License number must be at least 10 digits' },
          ]}
        >
          <Input
            placeholder={t('signup.hibaCheck.unnPlaceholder')}
            size='large'
          />
        </Form.Item>

        {error && (
          <Alert message={error} type='error' showIcon className='mb-4' />
        )}

        <Form.Item>
          <Button
            htmlType='submit'
            type='primary'
            size='large'
            block
            loading={loading}
            className='!h-14 font-semibold'
          >
            {t('signup.hibaCheck.submit')}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
