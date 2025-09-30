import { type PropsWithChildren } from 'react';

type FieldProps = PropsWithChildren<{
  label: string;
  hint?: string;
  id?: string;
  className?: string;
}>;

const Field = ({ label, hint, id, className, children }: FieldProps) => {
  const inputId = id ?? `${label.replace(/\s+/g, '-').toLowerCase()}-input`;
  return (
    <div className={className}>
      <label
        htmlFor={inputId}
        className='block text-sm font-medium text-gray-700 mb-2'
      >
        {label}
      </label>
      {children}
      {hint && <p className='mt-2 text-sm text-gray-500'>{hint}</p>}
    </div>
  );
};

export default Field;
