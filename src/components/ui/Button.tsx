import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export type ButtonProps = AntButtonProps;

const Button = ({ className, ...props }: ButtonProps) => {
  const primaryClasses =
    '!h-11 !rounded-xl !px-6 !font-semibold !bg-red-700 hover:!bg-red-800 !text-white';
  return (
    <AntButton className={`${primaryClasses} ${className ?? ''}`} {...props} />
  );
};

export default Button;
