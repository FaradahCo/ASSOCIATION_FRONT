import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Form, Input, Select } from 'antd';
import { useSignupStore } from '../../store';

type EntityForm = {
  organizationName: string;
  organizationEmail: string;
  phone: string;
  region: string;
  city: string;
  unifiedNationalNumber: string;
};

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
  const [form] = Form.useForm<EntityForm>();
  const { setEntityData, entityData, setCurrentStep } = useSignupStore();
  const isRTL = i18n.language === 'ar';

  const onSubmit = (values: EntityForm) => {
    setEntityData(values);
    setCurrentStep(2);
    navigate('/register/bank');
  };

  return (
    <div className='w-full max-w-md space-y-8'>
      <StepIndicator currentStep={1} />
      <Form
        form={form}
        onFinish={onSubmit}
        layout='vertical'
        className='space-y-3'
        initialValues={entityData || undefined}
      >
        {/* Organization Name */}
        <Form.Item
          name='organizationName'
          label={t('signup.entity.organizationName')}
          required={false}
          rules={[{ required: true, message: 'Organization name is required' }]}
        >
          <Input
            placeholder={t('signup.entity.organizationNamePlaceholder')}
            size='large'
          />
        </Form.Item>

        {/* Organization Email & Phone Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='organizationEmail'
            label={t('signup.entity.organizationEmail')}
            required={false}
            rules={[
              { required: true, message: 'Email is required' },
              { type: 'email', message: 'Invalid email address' },
            ]}
          >
            <Input
              type='email'
              placeholder={t('signup.entity.organizationEmailPlaceholder')}
              size='large'
            />
          </Form.Item>
          <Form.Item
            name='phone'
            label={t('signup.entity.phone')}
            required={false}
            rules={[
              { required: true, message: 'Phone is required' },
              { min: 10, message: 'Phone number must be at least 10 digits' },
            ]}
          >
            <Input
              type='tel'
              placeholder={t('signup.entity.phonePlaceholder')}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Region & City Row */}
        <div className='grid grid-cols-2 gap-4'>
          <Form.Item
            name='region'
            label={t('signup.entity.region')}
            required={false}
            rules={[{ required: true, message: 'Region is required' }]}
          >
            <Select
              placeholder={t('signup.entity.regionPlaceholder')}
              size='large'
              options={regions.map((r) => ({
                value: r.value,
                label: isRTL ? r.label.ar : r.label.en,
              }))}
            />
          </Form.Item>
          <Form.Item
            name='city'
            label={t('signup.entity.city')}
            required={false}
            rules={[{ required: true, message: 'City is required' }]}
          >
            <Input
              placeholder={t('signup.entity.cityPlaceholder')}
              size='large'
            />
          </Form.Item>
        </div>

        {/* Unified National Number */}
        <Form.Item
          name='unifiedNationalNumber'
          label={t('signup.entity.unn')}
          required={false}
          rules={[
            { required: true, message: 'Unified national number is required' },
          ]}
        >
          <Input placeholder={t('signup.entity.unnPlaceholder')} size='large' />
        </Form.Item>

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
              {t('signup.hibaCheck.submit')}
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
