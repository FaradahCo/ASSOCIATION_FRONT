import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Form, Input, Select, Button as AntButton } from 'antd';
import { useSignupStore } from '../../store';
import FileUpload from '../../../../../components/ui/FileUpload';

interface BankInfoForm {
  bankAccountName: string;
  bankName: string;
  iban: string;
  ibanFile?: File | null;
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

export default function BankInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setBankData, bankData, setCurrentStep } = useSignupStore();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [form] = Form.useForm<BankInfoForm>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (values: BankInfoForm) => {
    setIsSubmitting(true);
    try {
      setBankData({ ...values, ibanFile: uploadedFile });
      setCurrentStep(3);
      navigate('/register/admin');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
    form.setFieldValue('ibanFile', file);
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={2} />

      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        initialValues={bankData || undefined}
        className='space-y-3'
      >
        {/* Bank Account Name */}
        <Form.Item
          name='bankAccountName'
          label={t('signup.bank.bankAccountName')}
          required={false}
          rules={[
            {
              required: true,
              message: t('signup.bank.bankAccountNameRequired'),
            },
          ]}
        >
          <Input
            placeholder={t('signup.bank.bankAccountNamePlaceholder')}
            disabled={isSubmitting}
            size='large'
          />
        </Form.Item>

        {/* Bank Name */}
        <Form.Item
          name='bankName'
          label={t('signup.bank.bankName')}
          required={false}
          rules={[
            { required: true, message: t('signup.bank.bankNameRequired') },
          ]}
        >
          <Select
            placeholder={t('signup.bank.bankNamePlaceholder')}
            disabled={isSubmitting}
            size='large'
            showSearch
            options={[
              { label: t('signup.bank.banks.alrajhi'), value: 'alrajhi' },
              { label: t('signup.bank.banks.sab'), value: 'sab' },
              { label: t('signup.bank.banks.alahli'), value: 'alahli' },
              { label: t('signup.bank.banks.riyad'), value: 'riyad' },
              { label: t('signup.bank.banks.alinma'), value: 'alinma' },
              { label: t('signup.bank.banks.samba'), value: 'samba' },
              { label: t('signup.bank.banks.aljazira'), value: 'aljazira' },
              { label: t('signup.bank.banks.albilad'), value: 'albilad' },
            ]}
          />
        </Form.Item>

        {/* IBAN Number */}
        <Form.Item
          name='iban'
          label={t('signup.bank.iban')}
          required={false}
          rules={[
            { required: true, message: t('signup.bank.ibanRequired') },
            { len: 24, message: t('signup.bank.ibanLength') },
            {
              pattern: /^SA\d{22}$/,
              message: t('signup.bank.ibanFormat'),
            },
          ]}
          extra={
            <p className='text-xs text-gray-500 mt-1'>
              {t('signup.bank.ibanHint')}
            </p>
          }
        >
          <Input
            placeholder={t('signup.bank.ibanPlaceholder')}
            maxLength={24}
            disabled={isSubmitting}
            size='large'
          />
        </Form.Item>

        {/* IBAN File Upload */}
        <FileUpload
          label={t('signup.bank.ibanFile')}
          accept='.pdf,.jpg,.jpeg,.png'
          maxSize={5}
          onChange={handleFileUpload}
          value={uploadedFile}
        />

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
            onClick={() => navigate('/register/entity')}
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
