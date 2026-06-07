import css from './Button.module.css';
import clsx from 'clsx';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export default function Button({
  text,
  className,
  href,
  target,
  onClick,
  children,
  ...props
}: ButtonProps) {
  if (href) {
    return (
      <Link href={href} target={target} className={clsx(css.btn, className)}>
        {children}
        {text}
      </Link>
    );
  }

  return (
    <button {...props} className={clsx(css.btn, className)} onClick={onClick}>
      {text}
      {children}
    </button>
  );
}
