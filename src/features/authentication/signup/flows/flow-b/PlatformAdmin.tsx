import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button as AntButton } from 'antd';
import { useSignupStore } from '../../store';

interface PlatformAdminForm {
  fullName: string;
  email: string;
  position: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

// Step indicator component
const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = [1, 2, 3, 4];

  return (
    <div className='flex items-center justify-center gap-3 mb-8'>
      {steps.map((step) => (
        <div
          key={step}
          className={`
            flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all
            ${
              step < currentStep
                ? 'bg-[var(--Brand-color,#AA1826)] text-white'
                : step === currentStep
                ? 'bg-[var(--Brand-color,#AA1826)] text-white ring-4 ring-red-100'
                : 'bg-gray-200 text-gray-500'
            }
          `}
        >
          {step < currentStep ? '✓' : step}
        </div>
      ))}
    </div>
  );
};

export default function PlatformAdmin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAdminData, adminData, setCurrentStep } = useSignupStore();
  const [form] = Form.useForm<PlatformAdminForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: PlatformAdminForm) => {
    setIsSubmitting(true);
    try {
      setAdminData(values);
      setCurrentStep(4);
      navigate('/register/representative');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={3} />

      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        initialValues={adminData || undefined}
        className='space-y-3'
      >
        {/* Full Name */}
        <Form.Item
          name='fullName'
          label={t('signup.admin.fullName')}
          required={false}
          rules={[
            { required: true, message: t('signup.admin.fullNameRequired') },
          ]}
        >
          <Input
            placeholder={t('signup.admin.fullNamePlaceholder')}
            disabled={isSubmitting}
            size='large'
          />
        </Form.Item>

        {/* Email & Phone Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='email'
            label={t('signup.admin.email')}
            required={false}
            rules={[
              { required: true, message: t('signup.admin.emailRequired') },
              { type: 'email', message: t('signup.admin.emailInvalid') },
            ]}
          >
            <Input
              type='email'
              placeholder={t('signup.admin.emailPlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='phone'
            label={t('signup.admin.phone')}
            required={false}
            rules={[
              { required: true, message: t('signup.admin.phoneRequired') },
              { min: 10, message: t('signup.admin.phoneMinLength') },
            ]}
          >
            <Input
              type='tel'
              placeholder={t('signup.admin.phonePlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Password & Confirm Password Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='password'
            label={t('signup.admin.password')}
            required={false}
            rules={[
              { required: true, message: t('signup.admin.passwordRequired') },
              { min: 8, message: t('signup.admin.passwordMinLength') },
            ]}
          >
            <Input.Password
              placeholder={t('signup.admin.passwordPlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='confirmPassword'
            label={t('signup.admin.confirmPassword')}
            required={false}
            dependencies={['password']}
            rules={[
              {
                required: true,
                message: t('signup.admin.confirmPasswordRequired'),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(t('signup.admin.passwordMismatch'))
                  );
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t('signup.admin.confirmPasswordPlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Buttons */}
        <div className='flex gap-4 pt-4'>
          <Form.Item className='flex-1 mb-0'>
            <AntButton
              htmlType='submit'
              type='primary'
              className='w-full !h-14 !bg-[var(--Brand-color,#AA1826)] hover:!bg-[var(--Brand-color,#AA1826)]/90'
              disabled={isSubmitting}
            >
              {t('signup.entity.next')}
            </AntButton>
          </Form.Item>
          <AntButton
            type='text'
            onClick={() => navigate('/register/bank')}
            disabled={isSubmitting}
            className='flex-1 h-14 !rounded-[20px] !text-[#8c8c90] !text-base hover:!bg-gray-50'
          >
            {t('signup.entity.back')}
          </AntButton>
        </div>
      </Form>
    </div>
  );
}
