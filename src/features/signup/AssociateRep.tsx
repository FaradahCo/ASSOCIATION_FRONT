import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignupStore } from './store';
import Field from '../../components/ui/Field';
import { TextInput } from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

// Validation schema for Step 4: Association Representative
const AssociateRepSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address'),
  position: z.string().min(1, 'Position is required'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
});

type AssociateRepForm = z.infer<typeof AssociateRepSchema>;

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

export default function AssociateRep() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setRepresentativeData, representativeData, setCurrentStep } =
    useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssociateRepForm>({
    resolver: zodResolver(AssociateRepSchema),
    defaultValues: representativeData || {
      fullName: '',
      email: '',
      position: '',
      phone: '',
    },
  });

  const onSubmit = async (data: AssociateRepForm) => {
    setRepresentativeData(data);
    setCurrentStep(5);
    navigate('/signup/result/approved');
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={4} />

      <div className='space-y-4'>
        <h1 className='text-[40px] font-bold leading-[68px] text-black'>
          {t('signup.representative.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Full Name */}
        <Field
          label={t('signup.representative.fullName')}
          error={errors.fullName?.message}
        >
          <TextInput
            {...register('fullName')}
            placeholder={t('signup.representative.fullNamePlaceholder')}
            disabled={isSubmitting}
            required
          />
        </Field>

        {/* Position & Email Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.representative.position')}
            error={errors.position?.message}
          >
            <TextInput
              {...register('position')}
              placeholder={t('signup.representative.positionPlaceholder')}
              disabled={isSubmitting}
              required
            />
          </Field>

          <Field
            label={t('signup.representative.email')}
            error={errors.email?.message}
          >
            <TextInput
              {...register('email')}
              type='email'
              placeholder={t('signup.representative.emailPlaceholder')}
              disabled={isSubmitting}
              required
            />
          </Field>
        </div>

        {/* Phone Number */}
        <Field
          label={t('signup.representative.phone')}
          error={errors.phone?.message}
        >
          <TextInput
            {...register('phone')}
            type='tel'
            placeholder={t('signup.representative.phonePlaceholder')}
            disabled={isSubmitting}
            required
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
            {t('common.next')}
          </Button>
          <button
            type='button'
            onClick={() => navigate('/signup/admin')}
            disabled={isSubmitting}
            className='flex-1 h-14 rounded-[20px] text-[#8c8c90] text-base font-normal hover:bg-gray-50 transition-colors'
          >
            {t('common.back')}
          </button>
        </div>
      </form>
    </div>
  );
}
