import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignupStore } from '../../store';
import Field from '../../../../../components/ui/Field';
import { TextInput } from '../../../../../components/ui/TextInput';
import Button from '../../../../../components/ui/Button';
import { Select } from 'antd';

// Validation schema for Step 1: Organization Data
const EntityFormSchema = z.object({
  organizationName: z.string().min(1, 'Organization name is required'),
  organizationEmail: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  region: z.string().min(1, 'Region is required'),
  city: z.string().min(1, 'City is required'),
  unifiedNationalNumber: z
    .string()
    .min(1, 'Unified national number is required'),
});

type EntityForm = z.infer<typeof EntityFormSchema>;

// Saudi Arabia regions
const regions = [
  { value: 'riyadh', label: { en: 'Riyadh', ar: 'الرياض' } },
  { value: 'makkah', label: { en: 'Makkah', ar: 'مكة المكرمة' } },
  { value: 'madinah', label: { en: 'Madinah', ar: 'المدينة المنورة' } },
  {
    value: 'eastern',
    label: { en: 'Eastern Province', ar: 'المنطقة الشرقية' },
  },
  { value: 'asir', label: { en: 'Asir', ar: 'عسير' } },
  { value: 'tabuk', label: { en: 'Tabuk', ar: 'تبوك' } },
  { value: 'qassim', label: { en: 'Qassim', ar: 'القصيم' } },
  { value: 'hail', label: { en: 'Hail', ar: 'حائل' } },
  { value: 'najran', label: { en: 'Najran', ar: 'نجران' } },
  { value: 'jazan', label: { en: 'Jazan', ar: 'جازان' } },
  { value: 'bahah', label: { en: 'Al Bahah', ar: 'الباحة' } },
  { value: 'jawf', label: { en: 'Al Jawf', ar: 'الجوف' } },
  {
    value: 'northern',
    label: { en: 'Northern Borders', ar: 'الحدود الشمالية' },
  },
];

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
                ? 'bg-green-500 text-white'
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

export default function EntityInfo() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { setEntityData, entityData, setCurrentStep } = useSignupStore();
  const isRTL = i18n.language === 'ar';

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<EntityForm>({
    resolver: zodResolver(EntityFormSchema),
    defaultValues: entityData || {
      organizationName: '',
      organizationEmail: '',
      phone: '',
      region: '',
      city: '',
      unifiedNationalNumber: '',
    },
  });

  const selectedRegion = watch('region');

  const onSubmit = (data: EntityForm) => {
    setEntityData(data);
    setCurrentStep(2);
    navigate('/register/bank');
  };


  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={1} />
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Organization Name */}
        <Field
          label={t('signup.entity.organizationName')}
          error={errors.organizationName?.message}
        >
          <TextInput
            {...register('organizationName')}
            placeholder={t('signup.entity.organizationNamePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Organization Email & Phone Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.entity.organizationEmail')}
            error={errors.organizationEmail?.message}
          >
            <TextInput
              {...register('organizationEmail')}
              type='email'
              placeholder={t('signup.entity.organizationEmailPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
          <Field label={t('signup.entity.phone')} error={errors.phone?.message}>
            <TextInput
              {...register('phone')}
              type='tel'
              placeholder={t('signup.entity.phonePlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
        </div>

        {/* Region & City Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.entity.region')}
            error={errors.region?.message}
          >
            <Select
              placeholder={t('signup.entity.regionPlaceholder')}
              value={selectedRegion || undefined}
              onChange={(value) =>
                setValue('region', value, { shouldValidate: true })
              }
              className='w-full'
              size='large'
              disabled={isSubmitting}
              status={errors.region ? 'error' : ''}
              options={regions.map((r) => ({
                value: r.value,
                label: isRTL ? r.label.ar : r.label.en,
              }))}
            />
          </Field>
          <Field label={t('signup.entity.city')} error={errors.city?.message}>
            <TextInput
              {...register('city')}
              placeholder={t('signup.entity.cityPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
        </div>

        {/* Unified National Number */}
        <Field
          label={t('signup.entity.unn')}
          error={errors.unifiedNationalNumber?.message}
        >
          <TextInput
            {...register('unifiedNationalNumber')}
            placeholder={t('signup.entity.unnPlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Buttons */}
        <div className='flex gap-4 pt-4'>
          <Button
            htmlType='submit'
            type='primary'
            className='flex-1 !h-14'
            disabled={isSubmitting}
          >
            {t('signup.hibaCheck.submit')}
          </Button>
        </div>
      </form>
    </div>
  );
}
