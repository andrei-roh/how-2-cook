import { IValidationError } from 'src/types';

export const validateLoginValues = (inputValues: IValidationError) => {
  const errors = {} as IValidationError;

  if (!inputValues.email) {
    errors.email = 'Введите электронную почту пользователя';
  }

  if (!inputValues.password) {
    errors.password = 'Введите пароль пользователя';
  }

  return errors;
};
