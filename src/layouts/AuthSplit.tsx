import { type PropsWithChildren, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import Card from '../components/ui/Card';

type Step = { key: string; label: string };

type AuthSplitProps = PropsWithChildren<{
  title: string;
  description?: string;
  stepper?: { steps: Step[]; current: number };
  footer?: ReactNode;
  rightTitle?: string;
  rightSubtitle?: string;
  rightContent?: ReactNode;
  rightIllustration?: ReactNode;
}>;

const AuthSplit = ({
  title,
  description,
  stepper,
  footer,
  rightTitle,
  rightSubtitle,
  rightContent,
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
            <Card className='p-6 lg:p-8 shadow-lg border border-gray-200'>
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

              {stepper && (
                <div className='mb-6'>
                  <div className='flex gap-2'>
                    {stepper.steps.map((s, idx) => (
                      <div
                        key={s.key}
                        className={`h-1.5 flex-1 rounded-full ${
                          idx <= stepper.current ? 'bg-gray-200' : 'bg-gray-200'
                        }`}
                        style={
                          idx <= stepper.current
                            ? { backgroundColor: 'var(--Brand-color, #AA1826)' }
                            : {}
                        }
                        aria-label={s.label}
                      />
                    ))}
                  </div>
                </div>
              )}

              <div className='space-y-6'>{children}</div>

              {footer && <div className='mt-8'>{footer}</div>}
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
            {rightContent}
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
