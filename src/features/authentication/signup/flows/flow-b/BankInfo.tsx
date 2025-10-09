import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignupStore } from '../../store';
import { Select } from 'antd';
import Field from '../../../../../components/ui/Field';
import { TextInput } from '../../../../../components/ui/TextInput';
import Button from '../../../../../components/ui/Button';
import FileUpload from '../../../../../components/ui/FileUpload';

// Validation schema for Step 2: Bank Information
const BankInfoSchema = z.object({
  bankAccountName: z.string().min(1, 'Bank account name is required'),
  bankName: z.string().min(1, 'Bank name is required'),
  iban: z
    .string()
    .min(24, 'IBAN must be 24 characters')
    .max(24, 'IBAN must be 24 characters'),
  ibanFile: z.instanceof(File).optional().nullable(),
});

type BankInfoForm = z.infer<typeof BankInfoSchema>;

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

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BankInfoForm>({
    resolver: zodResolver(BankInfoSchema),
    defaultValues: bankData || {
      bankAccountName: '',
      bankName: '',
      iban: '',
      ibanFile: null,
    },
  });

  const onSubmit = async (data: BankInfoForm) => {
    setBankData({ ...data, ibanFile: uploadedFile });
    setCurrentStep(3);
    navigate('/register/admin');
  };

  const handleFileUpload = (file: File | null) => {
    setUploadedFile(file);
    setValue('ibanFile', file);
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={2} />

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Bank Account Name */}
        <Field
          label={t('signup.bank.bankAccountName')}
          error={errors.bankAccountName?.message}
        >
          <TextInput
            {...register('bankAccountName')}
            placeholder={t('signup.bank.bankAccountNamePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Bank Name */}
        <Field
          label={t('signup.bank.bankName')}
          error={errors.bankName?.message}
        >
          <Controller
            name='bankName'
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                placeholder={t('signup.bank.bankNamePlaceholder')}
                disabled={isSubmitting}
                className='w-full'
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
            )}
          />
        </Field>

        {/* IBAN Number */}
        <Field label={t('signup.bank.iban')} error={errors.iban?.message}>
          <TextInput
            {...register('iban')}
            placeholder={t('signup.bank.ibanPlaceholder')}
            maxLength={24}
            disabled={isSubmitting}
          />
          <p className='text-xs text-gray-500 mt-1'>
            {t('signup.bank.ibanHint')}
          </p>
        </Field>

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
          <Button
            htmlType='submit'
            type='primary'
            className='flex-1 !h-14'
            disabled={isSubmitting}
          >
            {t('signup.entity.next')}
          </Button>
          <button
            type='button'
            onClick={() => navigate('/register/entity')}
            disabled={isSubmitting}
            className='flex-1 h-14 rounded-[20px] text-[#8c8c90] text-base font-normal hover:bg-gray-50 transition-colors'
          >
            {t('signup.entity.back')}
          </button>
        </div>
      </form>
    </div>
  );
}
