import { useFormContext } from 'react-hook-form'
import clsx from 'clsx';
import './SelectInput.css';

export type SelectOption = {
  label: string,
  value: string | number,
}

type SelectSize = 'sm' | 'md' | 'lg';

export type SelectProps =
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    name: string,
    label?: string,
    options: SelectOption[],
    inputSize?: SelectSize,
  }
  
const SelectInput = ({
  name,
  label,
  options,
  className,
  inputSize = 'md',
  ...rest
}: SelectProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name as keyof typeof errors]
  return (
    <div className="form-element select-field">
      {label && <label className="form__label select-field__label">{label}</label>}

      <div className="select-field__control">
        <select
          className={clsx(
            'form__input',
            'select',
            `select--${inputSize}`,
            className
          )}
          {...register(name)}
          {...rest}
        >
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="select__chevron">▾</span>
      </div>

      {error && <span className="form__error">{String(error.message)}</span>}
    </div>
  )
}

export default SelectInput