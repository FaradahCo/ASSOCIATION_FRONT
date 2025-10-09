import { useTranslation } from 'react-i18next';
import { Button, Checkbox, Form, Input } from 'antd';
import { Link } from 'react-router';

type LoginFormData = {
  email: string;
  password: string;
  remember: boolean;
};

const Login = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm<LoginFormData>();

  const handleSubmit = (values: LoginFormData) => {
    console.log('Login values:', values);
    // TODO: Implement login logic
  };

  return (
    <div>
      <Form
        form={form}
        onFinish={handleSubmit}
        layout='vertical'
        initialValues={{ remember: true }}
        className='space-y-1'
      >
        <Form.Item
          name='email'
          required={false}
          label={t('login.email')}
          rules={[
            { required: true, message: t('login.emailPlaceholder') },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder={t('login.emailPlaceholder')} size='large' />
        </Form.Item>

        <Form.Item
          name='password'
          required={false}
          label={t('login.password')}
          rules={[{ required: true, message: t('login.passwordPlaceholder') }]}
        >
          <Input.Password
            placeholder={t('login.passwordPlaceholder')}
            size='large'
          />
        </Form.Item>

        <div className='flex items-center justify-between pt-2 pb-4'>
          <Form.Item name='remember' valuePropName='checked' noStyle>
            <Checkbox className='text-sm text-gray-600'>
              {t('login.remember')}
            </Checkbox>
          </Form.Item>
          <Link
            to='/auth/forgot-password'
            className='text-sm text-primary font-medium transition-colors hover:underline'
          >
            {t('login.forgot')}
          </Link>
        </div>

        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            block
            className='font-semibold '
          >
            {t('login.submit')}
          </Button>
        </Form.Item>
      </Form>

      <div className='mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          {t('login.noAccount')}{' '}
          <Link
            to='/auth/register'
            className='font-medium transition-colors hover:underline text-primary'
          >
            {t('login.create')}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
