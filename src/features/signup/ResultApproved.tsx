import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

export default function ResultApproved() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <Card className='w-full max-w-md'>
        <div className='text-center'>
          <div className='inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 bg-green-100'>
            <span className='text-4xl'>✓</span>
          </div>
          <h1 className='text-2xl font-bold text-gray-900 mb-3'>
            {t('signup.result.approved.title')}
          </h1>
          <p className='text-sm text-gray-600 mb-8'>
            {t('signup.result.approved.message')}
          </p>

          <div className='p-4 rounded-lg bg-green-50 border border-green-200 mb-8'>
            <p className='text-sm text-green-800'>
              {t('signup.result.approved.note')}
            </p>
          </div>

          <Button
            onClick={() => navigate('/auth/login')}
            type='primary'
            className='w-full'
          >
            {t('signup.result.approved.goToLogin')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
