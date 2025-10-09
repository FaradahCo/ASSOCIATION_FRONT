import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignupStore } from './store';
import Field from '../../components/ui/Field';
import { TextInput, PasswordInput } from '../../components/ui/TextInput';
import Button from '../../components/ui/Button';

// Validation schema for Step 3: Platform Administrator
const PlatformAdminSchema = z
  .object({
    fullName: z.string().min(1, 'Full name is required'),
    email: z.string().email('Invalid email address'),
    position: z.string().min(1, 'Position is required'),
    phone: z.string().min(10, 'Phone number must be at least 10 digits'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type PlatformAdminForm = z.infer<typeof PlatformAdminSchema>;

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

export default function PlatformAdmin() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAdminData, adminData, setCurrentStep } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PlatformAdminForm>({
    resolver: zodResolver(PlatformAdminSchema),
    defaultValues: adminData || {
      fullName: '',
      email: '',
      position: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: PlatformAdminForm) => {
    setAdminData(data);
    setCurrentStep(4);
    navigate('/signup/representative');
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={3} />

      <div className='space-y-4'>
        <h1 className='text-[40px] font-bold leading-[68px] text-black'>
          {t('signup.admin.title')}
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Full Name */}
        <Field
          label={t('signup.admin.fullName')}
          error={errors.fullName?.message}
        >
          <TextInput
            {...register('fullName')}
            placeholder={t('signup.admin.fullNamePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Position & Email Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.admin.position')}
            error={errors.position?.message}
          >
            <TextInput
              {...register('position')}
              placeholder={t('signup.admin.positionPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>

          <Field label={t('signup.admin.email')} error={errors.email?.message}>
            <TextInput
              {...register('email')}
              type='email'
              placeholder={t('signup.admin.emailPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
        </div>

        {/* Phone Number */}
        <Field label={t('signup.admin.phone')} error={errors.phone?.message}>
          <TextInput
            {...register('phone')}
            type='tel'
            placeholder={t('signup.admin.phonePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Password & Confirm Password Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.admin.confirmPassword')}
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              {...register('confirmPassword')}
              placeholder={t('signup.admin.confirmPasswordPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>

          <Field
            label={t('signup.admin.password')}
            error={errors.password?.message}
          >
            <PasswordInput
              {...register('password')}
              placeholder={t('signup.admin.passwordPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
        </div>

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
            onClick={() => navigate('/signup/bank')}
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
