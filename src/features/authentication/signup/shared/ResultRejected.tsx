import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Result, Button, Alert } from 'antd';
import { CloseCircleOutlined } from '@ant-design/icons';

export default function ResultRejected() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='w-full max-w-md'>
        <Result
          status='error'
          icon={<CloseCircleOutlined style={{ color: '#ff4d4f' }} />}
          title={
            <span className='text-2xl font-bold text-gray-900'>
              {t('signup.result.rejected.title')}
            </span>
          }
          subTitle={
            <span className='text-sm text-gray-600'>
              {t('signup.result.rejected.message')}
            </span>
          }
          extra={[
            <div key='note' className='mb-6'>
              <Alert
                message={t('signup.result.rejected.note')}
                type='error'
                showIcon
              />
            </div>,
            <Button
              key='retry'
              type='primary'
              size='large'
              onClick={() => navigate('/register/check')}
              className='w-full !h-12 !bg-[var(--Brand-color,#AA1826)] hover:!bg-[var(--Brand-color,#AA1826)]/90 mb-3'
            >
              {t('signup.result.rejected.tryAgain')}
            </Button>,
            <Button
              key='login'
              type='default'
              size='large'
              onClick={() => navigate('/auth/login')}
              className='w-full !h-12'
            >
              {t('signup.result.rejected.backToLogin')}
            </Button>,
          ]}
        />
      </div>
    </div>
  );
}
