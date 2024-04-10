import { IValidationError } from 'src/types';

export const validateRecipeValues = (inputValues: IValidationError) => {
  const errors = {} as IValidationError;

  if (!inputValues.imageUrl) {
    errors.imageUrl = 'Добавьте изображение';
  }

  if (!inputValues.name) {
    errors.name = 'Добавьте название рецепта';
  }

  if (inputValues.name && inputValues.name.length > 80) {
    errors.name = 'Слишком длинное название';
  }

  if (!inputValues.type) {
    errors.type = 'Выберите тип рецепта';
  }

  if (!inputValues.ingredients) {
    errors.ingredients = 'Добавьте ингриенты рецепта';
  }

  if (inputValues.description && inputValues.description.length > 2048) {
    errors.description = 'Слишком длинное описание ингридиентов';
  }

  if (!inputValues.description) {
    errors.description = 'Добавьте описание рецепта';
  }

  if (inputValues.description && inputValues.description.length > 4096) {
    errors.description = 'Описание слишком длинное';
  }

  return errors;
};
