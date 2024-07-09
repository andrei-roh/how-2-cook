import { IValidationError } from 'src/types';
import { describe, it, expect } from 'vitest';
import { validateLoginValues } from '../validateLoginValues';

describe('Testing: validateLoginValues', () => {
  it('should return an error message if email is not provided', () => {
    const inputValues: IValidationError = { password: 'password123' };
    const expectedErrors: IValidationError = {
      email: 'Введите электронную почту пользователя',
    };

    expect(validateLoginValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if password is not provided', () => {
    const inputValues: IValidationError = { email: 'test@example.com' };
    const expectedErrors: IValidationError = {
      password: 'Введите пароль пользователя',
    };

    expect(validateLoginValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return error messages if both email and password are not provided', () => {
    const inputValues: IValidationError = {};
    const expectedErrors: IValidationError = {
      email: 'Введите электронную почту пользователя',
      password: 'Введите пароль пользователя',
    };

    expect(validateLoginValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an empty object if both email and password are provided', () => {
    const inputValues: IValidationError = {
      email: 'test@example.com',
      password: 'password123',
    };

    expect(validateLoginValues(inputValues)).toEqual({});
  });
});
