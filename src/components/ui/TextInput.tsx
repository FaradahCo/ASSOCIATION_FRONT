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
    '!h-11 !rounded-xl !border-neutral-200 !px-3 !text-sm focus:!ring-2 focus:!ring-red-700/30 focus:!border-red-700/50';
  return <Input className={`${classes} ${className ?? ''}`} {...props} />;
};

export const PasswordInput = ({
  className,
  ...props
}: ComponentProps<typeof Input.Password> & BaseProps) => {
  const classes =
    '!h-11 !rounded-xl !border-neutral-200 !px-3 !text-sm focus:!ring-2 focus:!ring-red-700/30 focus:!border-red-700/50';
  return (
    <Input.Password className={`${classes} ${className ?? ''}`} {...props} />
  );
};
