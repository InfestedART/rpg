import { useFormContext } from 'react-hook-form'
import '../Form.css';
import './TextInput.css';

type TextInputProps = {
  name: string
  label: string
}

const TextInput = ({ name, label }: TextInputProps) => {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  const error = errors[name as keyof typeof errors]

  return (
    <div className="form-element text-input">
      <label className="form__label text-input__label">{label}</label>
      <input className="form__input text-input__input" {...register(name)} />
      {error && <span className="form__error">{String(error.message)}</span>}
    </div>
  )
}

export default TextInput