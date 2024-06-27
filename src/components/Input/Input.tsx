import { getClassesList } from 'src/utils/getClassesList';
import css from './Input.module.sass';
import { useEffect, useRef } from 'react';

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
  isDisabled?: boolean;
  placeholder?: string;
  labelClassName?: string;
  inputClassName?: string;
  isValidationError?: boolean;
  errorMessage?: string;
  isFocused?: boolean;
}

const positiveIntegerRegex = /^\d+$/;
const validateDigitalValue = (value: string) =>
  positiveIntegerRegex.test(value);

export const Input = ({
  value,
  setChange,
  type = 'text',
  name,
  labelText,
  required = false,
  isDisabled = false,
  placeholder,
  labelClassName,
  inputClassName,
  isValidationError,
  errorMessage,
  isFocused = false,
}: InputProps) => {
  const labelClasses = getClassesList(css.label, labelClassName);

  const inputClasses = getClassesList(
    css.input,
    inputClassName,
    isValidationError ? css.inputError : undefined
  );

  const inputRef = useRef(null);

  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      type === 'number' &&
      !validateDigitalValue(e.target.value) &&
      e.target.value !== ''
    ) {
      return;
    }

    setChange(e.target.value);
  };

  useEffect(() => {
    if (isFocused && inputRef.current) {
      (inputRef.current as HTMLInputElement).focus();
    }
  }, [isFocused]);

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
        disabled={isDisabled}
        ref={inputRef}
      />
      {isValidationError && (
        <p className={css.validationError}>
          {isValidationError && errorMessage}
        </p>
      )}
    </label>
  );
};
