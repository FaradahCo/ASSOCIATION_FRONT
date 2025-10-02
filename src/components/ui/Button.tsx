import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';

export type ButtonProps = AntButtonProps;

const Button = ({ className, style, ...props }: ButtonProps) => {
  const primaryClasses =
    '!h-12 !rounded-lg !px-6 !font-semibold !text-white !shadow-sm hover:!shadow-md !transition-all !duration-200';

  const buttonStyle = {
    backgroundColor: 'var(--Brand-color, #AA1826)',
    borderColor: 'var(--Brand-color, #AA1826)',
    ...style,
  };

  return (
    <AntButton
      className={`${primaryClasses} ${className ?? ''}`}
      style={buttonStyle}
      {...props}
    />
  );
};

export default Button;
