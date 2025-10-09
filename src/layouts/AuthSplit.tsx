import { type PropsWithChildren, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

type AuthSplitProps = PropsWithChildren<{
  title: string;
  description?: string;
  rightTitle?: string;
  rightSubtitle?: string;
  rightIllustration?: ReactNode;
}>;

const AuthSplit = ({
  title,
  description,
  rightTitle,
  rightSubtitle,
  children,
  rightIllustration,
}: AuthSplitProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='grid grid-cols-1 lg:grid-cols-2 min-h-screen'>
        {/* Left Panel - Form */}
        <div className='flex items-center justify-center p-4 lg:p-8 bg-gray-100'>
          <div className='w-full max-w-md'>
            <Card className='!p-6 lg:!p-8 !shadow-lg !border !border-gray-200'>
              <div className='mb-8'>
                <h1
                  className={`text-2xl lg:text-3xl font-bold text-gray-900 ${
                    isRTL ? 'text-right' : 'text-left'
                  }`}
                >
                  {title}
                </h1>
                {description && (
                  <p
                    className={`mt-2 text-sm text-gray-600 ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}
                  >
                    {description}
                  </p>
                )}
              </div>

              <div className='space-y-6'>{children}</div>
            </Card>
          </div>
        </div>

        <div
          className='relative flex items-center justify-center p-6 lg:p-12'
          style={{
            background:
              'linear-gradient(180deg, var(--Secondary-Color, #06213E) 0%, #174D88 100%)',
          }}
        >
          <div className='text-center text-white relative z-10'>
            {rightIllustration && (
              <div className='mb-6'>{rightIllustration}</div>
            )}
            {rightTitle && (
              <h2 className='text-2xl lg:text-3xl xl:text-4xl font-bold mb-3 leading-tight text-white'>
                {rightTitle}
              </h2>
            )}
            {rightSubtitle && (
              <p className='text-base lg:text-lg text-white/90 mb-6 leading-relaxed'>
                {rightSubtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthSplit;
