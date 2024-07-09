import { IValidationError } from 'src/types';
import { describe, it, expect } from 'vitest';
import { validateRecipeValues } from '../validateRecipeValues';

describe('Testing: validateRecipeValues', () => {
  it('should return an error message if imageUrl is not provided', () => {
    const inputValues: IValidationError = {
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'Description',
    };
    const expectedErrors: IValidationError = {
      imageUrl: 'Добавьте изображение',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if name is not provided', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'Description',
    };
    const expectedErrors: IValidationError = {
      name: 'Добавьте название рецепта',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if name is too long', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'a'.repeat(81),
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'Description',
    };
    const expectedErrors: IValidationError = {
      name: 'Слишком длинное название',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if type is not provided', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      ingredients: 'Ingredients',
      description: 'Description',
    };
    const expectedErrors: IValidationError = { type: 'Выберите тип рецепта' };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if ingredients are not provided', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      type: 'Type',
      description: 'Description',
    };
    const expectedErrors: IValidationError = {
      ingredients: 'Добавьте ингридиенты рецепта',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if description is too long (over 2048 characters)', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'a'.repeat(2049),
    };
    const expectedErrors: IValidationError = {
      description: 'Слишком длинное описание ингридиентов',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if description is not provided', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
    };
    const expectedErrors: IValidationError = {
      description: 'Добавьте описание рецепта',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an error message if description is too long (over 4096 characters)', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'a'.repeat(4097),
    };
    const expectedErrors: IValidationError = {
      description: 'Описание слишком длинное',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return multiple error messages if multiple fields are invalid', () => {
    const inputValues: IValidationError = {
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'a'.repeat(4097),
    };
    const expectedErrors: IValidationError = {
      imageUrl: 'Добавьте изображение',
      description: 'Описание слишком длинное',
    };

    expect(validateRecipeValues(inputValues)).toEqual(expectedErrors);
  });

  it('should return an empty object if all fields are valid', () => {
    const inputValues: IValidationError = {
      imageUrl: 'ImageUrl',
      name: 'Recipe',
      type: 'Type',
      ingredients: 'Ingredients',
      description: 'Description',
    };

    expect(validateRecipeValues(inputValues)).toEqual({});
  });
});
