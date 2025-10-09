import { type FormEvent } from 'react';
import { useTranslation } from 'react-i18next';
import Field from '../../../components/ui/Field';
import { TextInput, PasswordInput } from '../../../components/ui/TextInput';
import Button from '../../../components/ui/Button';
import { Checkbox } from 'antd';
import { Link } from 'react-router';

const Login = () => {
  const { t } = useTranslation();

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className='space-y-5'>
        <Field label={t('login.email')}>
          <TextInput
            id='email'
            type='email'
            placeholder={t('login.emailPlaceholder')}
          />
        </Field>
        <Field label={t('login.password')}>
          <PasswordInput
            id='password'
            placeholder={t('login.passwordPlaceholder')}
          />
        </Field>
        <div className='flex items-center justify-between pt-2'>
          <Checkbox className='text-sm text-gray-600'>
            {t('login.remember')}
          </Checkbox>
          <Link
            to='/auth/forgot-password'
            className='text-sm font-medium transition-colors'
            style={{ color: 'var(--Brand-color, #AA1826)' }}
          >
            {t('login.forgot')}
          </Link>
        </div>
        <div className='pt-2'>
          <Button htmlType='submit' type='primary' className='w-full'>
            {t('login.submit')}
          </Button>
        </div>
      </form>

      <div className='mt-8 text-center'>
        <p className='text-sm text-gray-600'>
          {t('login.noAccount')}{' '}
          <Link
            to='/auth/register'
            className='font-medium transition-colors'
            style={{ color: 'var(--Brand-color, #AA1826)' }}
          >
            {t('login.create')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
