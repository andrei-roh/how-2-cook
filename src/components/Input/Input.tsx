import { getClassesList } from 'src/utils/getClassesList';
import css from './Input.module.sass';

type InputChange = (value: string) => {
  type: string;
  payload: string;
};

interface InputProps {
  value: string;
  setChange: React.Dispatch<React.SetStateAction<string>> | InputChange;
  type?: 'text' | 'number' | 'search' | 'password';
  name?: string;
  labelText?: string;
  required?: boolean;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  isValidationError?: boolean;
  errorMessage?: string;
}

const positiveIntegerRegex =/^\d+$/;
const validateDigitalValue = (value: string) => positiveIntegerRegex.test(value);

export const Input = ({
  value,
  setChange,
  type = 'text',
  name,
  labelText,
  required = false,
  placeholder,
  labelClassName,
  inputClassName,
  isValidationError,
  errorMessage,
}: InputProps) => {
  const labelClasses = getClassesList(css.label, labelClassName);

  const inputClasses = getClassesList(
    css.input,
    inputClassName,
    isValidationError ? css.inputError : undefined
  );

  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number' && !validateDigitalValue(e.target.value) && e.target.value !== '') {
      return;
    }

    setChange(e.target.value)
  }

  return (
    <label className={labelClasses}>
      {labelText && (
        <div>
          {labelText}
          {required && <span className={css.inputRequired}> *</span>}
        </div>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder || 'Ввод'}
        className={inputClasses}
        value={value}
        onChange={(e) => handleSetChange(e)}
      />
      {isValidationError && (
        <p className={css.validationError}>
          {isValidationError && errorMessage}
        </p>
      )}
    </label>
  );
};
