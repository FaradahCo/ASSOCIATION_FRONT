import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Result, Button, Alert } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';

export default function ResultApproved() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Result
          status='success'
          icon={<CheckCircleOutlined style={{ color: '#52c41a' }} />}
          title={
            <span className='text-2xl font-bold text-gray-900'>
              {t('signup.result.approved.title')}
            </span>
          }
          subTitle={
            <span className='text-sm text-gray-600'>
              {t('signup.result.approved.message')}
            </span>
          }
          extra={[
            <div key='note' className='mb-6'>
              <Alert
                message={t('signup.result.approved.note')}
                type='success'
                showIcon
              />
            </div>,
            <Button
              key='login'
              type='primary'
              size='large'
              onClick={() => navigate('/auth/login')}
              className='!h-12 !bg-[var(--Brand-color,#AA1826)] hover:!bg-[var(--Brand-color,#AA1826)]/90'
            >
              {t('signup.result.approved.goToLogin')}
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}
