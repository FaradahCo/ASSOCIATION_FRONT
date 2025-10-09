import { type PropsWithChildren } from 'react';

type FieldProps = PropsWithChildren<{
  label: string;
  hint?: string;
  error?: string;
  id?: string;
  className?: string;
}>;

const Field = ({ label, hint, error, id, className, children }: FieldProps) => {
  const inputId = id ?? `${label.replace(/\s+/g, '-').toLowerCase()}-input`;
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className='block text-xs font-semibold text-neutral-700 mb-1'
      >
        {label}
      </label>
      {children}
      {error && <p className='mt-1 text-xs text-red-600'>{error}</p>}
      {hint && !error && (
        <p className='mt-1 text-xs text-neutral-500'>{hint}</p>
      )}
    </div>
  );
};

export default Field;
