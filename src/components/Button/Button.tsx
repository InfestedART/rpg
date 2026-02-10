import "./Button.css"

type ButtonProps = {
  children: React.ReactNode
  className?: string;
  onClick: () => void;
  disabled?: boolean;
}

const Button = ({
  children,
  className = '',
  onClick,
  disabled = false
}: ButtonProps) => {
  return (
      <button
        className={`btn ${className}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
  )
}

export default Button