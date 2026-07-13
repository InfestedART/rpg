import clsx from 'clsx';
import './Select.css';

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
  
const Select = (props: SelectProps) => {
  const { label, name, options, className, inputSize = 'md', ...rest } = props;
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
    </div>
  )
}

export default Select