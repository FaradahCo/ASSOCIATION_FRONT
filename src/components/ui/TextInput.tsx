import { type ComponentProps } from 'react';
import { Input } from 'antd';

type BaseProps = {
  id?: string;
  className?: string;
};

export const TextInput = ({
  className,
  ...props
}: ComponentProps<typeof Input> & BaseProps) => {
  const classes =
    '!h-12 !rounded-lg !border-neutral-300 !px-4 !text-sm !bg-white hover:!border-neutral-400 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-500/20 !shadow-sm';
  return <Input className={`${classes} ${className ?? ''}`} {...props} />;
};

export const PasswordInput = ({
  className,
  ...props
}: ComponentProps<typeof Input.Password> & BaseProps) => {
  const classes =
    '!h-12 !rounded-lg !border-neutral-300 !px-4 !text-sm !bg-white hover:!border-neutral-400 focus:!border-blue-500 focus:!ring-2 focus:!ring-blue-500/20 !shadow-sm';
  return (
    <Input.Password className={`${classes} ${className ?? ''}`} {...props} />
  );
};
