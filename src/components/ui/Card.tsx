import { type PropsWithChildren } from 'react';

type CardProps = PropsWithChildren<{
  className?: string;
}>;

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={`bg-white rounded-2xl shadow-sm ring-1 ring-black/5 ${
        className ?? ''
      }`}
    >
      {children}
    </div>
  );
};

export default Card;
