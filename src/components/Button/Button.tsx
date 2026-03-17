import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import "./Button.css";
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
type IconPosition = 'left' | 'right';
type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps =
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant
    icon?: IconDefinition
    iconPosition?: IconPosition
    size?: ButtonSize
  }

const Button = (props: ButtonProps) => {
  const {
    children,
    className = '',
    onClick,
    type = 'button',
    disabled = false,
    variant = 'ghost',
    icon,
    iconPosition = 'left',
    size = 'md',
    ...rest
  } = props;

  const isIconOnly = icon && !children
  const isIconLeft = icon && iconPosition === 'left'
  const isIconRight = icon && iconPosition === 'right'

  return (
      <button
        type={type}
        className={
          clsx(
            'btn',
            `btn--${size}`,
            `btn--${variant}`,
            { 'btn--icon-only': isIconOnly },
            className
          )}
        onClick={onClick}
        disabled={disabled}
        { ...rest }
      >
        {isIconLeft && (
          <FontAwesomeIcon icon={icon} />
        )}

        {children && (
          <span className={clsx(
            'btn__label',
            { 'icon-left': isIconLeft },
            { 'icon-right': isIconRight },
          )}>
            {children}
          </span>
        )}

        { isIconRight && (
          <FontAwesomeIcon icon={icon} />
        )}
      </button>
  )
}

export default Button