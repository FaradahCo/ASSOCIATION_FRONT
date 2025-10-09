import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { HibaCheckSchema } from './schemas/hibaCheck';
import { useSignupStore } from './store';
import Field from '../../components/ui/Field';
import { TextInput } from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

type HibaCheckForm = {
  unifiedNationalNumber: string;
};

export default function HibaCheck() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setFlow, setHibaData, setLoading } = useSignupStore();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<HibaCheckForm>({
    resolver: zodResolver(HibaCheckSchema),
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {
      unifiedNationalNumber: '',
    },
  });

  const onSubmit = async (data: HibaCheckForm) => {
    setError(null);
    setLoading(true);

    try {
      // Mock API call to Hiba system
      const response = await fetch('/api/hiba/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.verified) {
        // Flow A: Organization found in Hiba
        console.log(
          '✅ Flow A: Registered user detected. Navigating to OTP verification...'
        );
        setFlow('A');
        setHibaData({
          unifiedNationalNumber: data.unifiedNationalNumber,
          organizationName: result.organizationName,
          isVerified: true,
        });
        navigate('/signup/otp');
      } else {
        // Flow B: Organization not found in Hiba
        console.log(
          '🆕 Flow B: New user detected. Navigating to entity information...'
        );
        setFlow('B');
        setHibaData({
          unifiedNationalNumber: data.unifiedNationalNumber,
          isVerified: false,
        });
        navigate('/signup/entity');
      }
    } catch {
      setError(t('signup.hibaCheckError'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <div className='space-y-3'>
        <h1 className='text-[40px] font-bold leading-[68px] text-black'>
          {t('signup.hibaCheck.title')}
        </h1>
        <p className='text-lg leading-[1.5] text-[#6c737f]'>
          {t('signup.hibaCheck.subtitle')}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <Field
          label={t('signup.hibaCheck.unnLabel')}
          error={
            touchedFields.unifiedNationalNumber
              ? errors.unifiedNationalNumber?.message
              : undefined
          }
        >
          <TextInput
            {...register('unifiedNationalNumber')}
            placeholder={t('signup.hibaCheck.unnPlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {error && (
          <div className='p-3 rounded-lg bg-red-50 border border-red-200'>
            <p className='text-sm text-red-600'>{error}</p>
          </div>
        )}

        <Button
          htmlType='submit'
          type='primary'
          className='w-full !h-14'
          disabled={isSubmitting}
        >
          {isSubmitting ? t('common.loading') : t('signup.hibaCheck.submit')}
        </Button>
      </form>
    </div>
  );
}
