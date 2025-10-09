import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Form, Input, Button as AntButton } from 'antd';
import { useSignupStore } from '../../store';

interface AssociateRepForm {
  fullName: string;
  email: string;
  position: string;
  phone: string;
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

export default function AssociateRep() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRepresentativeData, representativeData, setCurrentStep } =
    useSignupStore();
  const [form] = Form.useForm<AssociateRepForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: AssociateRepForm) => {
    setIsSubmitting(true);
    try {
      setRepresentativeData(values);
      setCurrentStep(5);
      navigate('/register/result/approved');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={4} />

      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        initialValues={representativeData || undefined}
        className='space-y-3'
      >
        {/* Full Name */}
        <Form.Item
          name='fullName'
          label={t('signup.representative.fullName')}
          required={false}
          rules={[
            {
              required: true,
              message: t('signup.representative.fullNameRequired'),
            },
          ]}
        >
          <Input
            placeholder={t('signup.representative.fullNamePlaceholder')}
            disabled={isSubmitting}
            size='large'
          />
        </Form.Item>

        {/* Email & Position Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='email'
            label={t('signup.representative.email')}
            required={false}
            rules={[
              {
                required: true,
                message: t('signup.representative.emailRequired'),
              },
              {
                type: 'email',
                message: t('signup.representative.emailInvalid'),
              },
            ]}
          >
            <Input
              type='email'
              placeholder={t('signup.representative.emailPlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>

          <Form.Item
            name='position'
            label={t('signup.representative.position')}
            required={false}
            rules={[
              {
                required: true,
                message: t('signup.representative.positionRequired'),
              },
            ]}
          >
            <Input
              placeholder={t('signup.representative.positionPlaceholder')}
              disabled={isSubmitting}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Phone Number */}
        <Form.Item
          name='phone'
          label={t('signup.representative.phone')}
          required={false}
          rules={[
            {
              required: true,
              message: t('signup.representative.phoneRequired'),
            },
            { min: 10, message: t('signup.representative.phoneMinLength') },
          ]}
        >
          <Input
            type='tel'
            placeholder={t('signup.representative.phonePlaceholder')}
            disabled={isSubmitting}
            size='large'
          />
        </Form.Item>

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
            onClick={() => navigate('/register/admin')}
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
