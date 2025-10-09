import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSignupStore } from '../../store';
import Field from '../../../../../components/ui/Field';
import {
  TextInput,
  PasswordInput,
} from '../../../../../components/ui/TextInput';
import Button from '../../../../../components/ui/Button';

// Validation schema for Flow A: Simple Profile Info (after OTP)
const ProfileInfoSchema = z
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

type ProfileInfoForm = z.infer<typeof ProfileInfoSchema>;

export default function ProfileInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAdminData, adminData, setCurrentStep } = useSignupStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileInfoForm>({
    resolver: zodResolver(ProfileInfoSchema),
    defaultValues: adminData || {
      fullName: '',
      email: '',
      position: '',
      phone: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: ProfileInfoForm) => {
    setAdminData(data);
    setCurrentStep(2);
    navigate('/auth/register/result/approved');
  };

  const handleBack = () => {
    navigate('/auth/register/otp');
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>
        {/* Full Name */}
        <Field
          label={t('signup.profile.fullName')}
          error={errors.fullName?.message}
        >
          <TextInput
            {...register('fullName')}
            placeholder={t('signup.profile.fullNamePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Position & Email Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.profile.email')}
            error={errors.email?.message}
          >
            <TextInput
              {...register('email')}
              type='email'
              placeholder={t('signup.profile.emailPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
          <Field
            label={t('signup.profile.position')}
            error={errors.position?.message}
          >
            <TextInput
              {...register('position')}
              placeholder={t('signup.profile.positionPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
        </div>

        {/* Phone Number */}
        <Field label={t('signup.profile.phone')} error={errors.phone?.message}>
          <TextInput
            {...register('phone')}
            type='tel'
            placeholder={t('signup.profile.phonePlaceholder')}
            disabled={isSubmitting}
          />
        </Field>

        {/* Password & Confirm Password Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Field
            label={t('signup.profile.password')}
            error={errors.password?.message}
          >
            <PasswordInput
              {...register('password')}
              placeholder={t('signup.profile.passwordPlaceholder')}
              disabled={isSubmitting}
            />
          </Field>
          <Field
            label={t('signup.profile.confirmPassword')}
            error={errors.confirmPassword?.message}
          >
            <PasswordInput
              {...register('confirmPassword')}
              placeholder={t('signup.profile.passwordPlaceholder')}
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
            {t('signup.entity.next')}
          </Button>
          <button
            type='button'
            onClick={handleBack}
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
