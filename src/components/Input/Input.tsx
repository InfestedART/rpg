import './Input.css';

type InputSize = 'sm' | 'md' | 'lg';

type InputProps = 
  React.InputHTMLAttributes<HTMLInputElement> & {
    label: string
    inputSize?: InputSize
  }

const Input = ({ label, inputSize = 'md', ...rest }: InputProps) => {
  return (
    <div className="form-element text-input">
      {label && <label className="form__label text-field__label">{label}</label>}
      <input className={`form__input text-input__input ${inputSize}`}  {...rest} />
    </div>
  )
}

export default Input