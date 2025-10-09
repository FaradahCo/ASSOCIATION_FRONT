import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input } from 'antd';
import { useSignupStore } from '../../store';

type ProfileInfoForm = {
  fullName: string;
  email: string;
  position: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export default function ProfileInfo() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm<ProfileInfoForm>();
  const { setAdminData, adminData, setCurrentStep } = useSignupStore();

  const onSubmit = (values: ProfileInfoForm) => {
    setAdminData(values);
    setCurrentStep(2);
    navigate('/auth/register/result/approved');
  };

  const handleBack = () => {
    navigate('/auth/register/otp');
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        className='space-y-3'
        initialValues={adminData || undefined}
      >
        {/* Full Name */}
        <Form.Item
          name='fullName'
          label={t('signup.profile.fullName')}
          required={false}
          rules={[{ required: true, message: 'Full name is required' }]}
        >
          <Input
            placeholder={t('signup.profile.fullNamePlaceholder')}
            size='large'
          />
        </Form.Item>

        {/* Position & Email Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='email'
            label={t('signup.profile.email')}
            required={false}
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              type='email'
              placeholder={t('signup.profile.emailPlaceholder')}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='position'
            label={t('signup.profile.position')}
            required={false}
            rules={[{ required: true, message: 'Position is required' }]}
          >
            <Input
              placeholder={t('signup.profile.positionPlaceholder')}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Phone Number */}
        <Form.Item
          name='phone'
          label={t('signup.profile.phone')}
          required={false}
          rules={[
            { required: true, message: 'Phone number is required' },
            { min: 10, message: 'Phone number must be at least 10 digits' },
          ]}
        >
          <Input
            type='tel'
            placeholder={t('signup.profile.phonePlaceholder')}
            size='large'
          />
        </Form.Item>

        {/* Password & Confirm Password Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='password'
            label={t('signup.profile.password')}
            required={false}
            rules={[
              { required: true, message: 'Password is required' },
              { min: 8, message: 'Password must be at least 8 characters' },
            ]}
          >
            <Input.Password
              placeholder={t('signup.profile.passwordPlaceholder')}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='confirmPassword'
            label={t('signup.profile.confirmPassword')}
            required={false}
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Passwords don't match"));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder={t('signup.profile.passwordPlaceholder')}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Buttons */}
        <div className='flex gap-4 pt-4'>
          <Form.Item className='flex-1 mb-0'>
            <Button
              htmlType='submit'
              type='primary'
              size='large'
              block
              className='!h-14 font-semibold'
            >
              {t('signup.entity.next')}
            </Button>
          </Form.Item>
          <button
            type='button'
            onClick={handleBack}
            className='flex-1 h-14 rounded-[20px] text-[#8c8c90] text-base font-normal hover:bg-gray-50 transition-colors'
          >
            {t('signup.entity.back')}
          </button>
        </div>
      </Form>
    </div>
  );
}
