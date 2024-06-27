import { DishType, ImageType, IRecipe } from './types';

export const ROOT_ROUTE = '/';
export const RECIPES_ROUTE = '/recipes';
export const CREATE_RECIPE_ROUTE = '/recipe/create';
export const SHOW_RECIPE_ROUTE = '/recipe/show/:id';
export const EDIT_RECIPE_ROUTE = '/recipe/edit/:id';
export const INGREDIENTS_ROUTE = '/ingredients';

export const DEFAULT_NOTIFICATION = 'Default Notification Message';
export const NOTIFICATIONS = (value?: string) => ({
  USER_WRONG_EMAIL: `Пользователь с адресом электронной почты ${value} не существует. Проверьте данные или обратитесь к администратору`,
  USER_WRONG_PASSWORD: `Введен неправильный пароль для пользователя ${value}. Проверьте данные или обратитесь к администратору`,
  USER_TOO_MANY_REQUESTS: `Слишком много запросов для пользователя ${value}. Подождите некоторое время или обратитесь к администратору`,
  SIGN_OUT_SUCCESS: `Пользователь ${value} вышел из приложения`,
  SIGN_OUT_ERROR: `Ошибка при выходе пользователя ${value} из приложения`,
  RECIPE_EXISTS: `Рецепт с id ${value} уже существует`,
  RECIPE_CREATED: `Рецепт ${value} создан`,
  RECIPE_DELETED: `Рецепт ${value} удален`,
  RECIPE_CREATION_ERROR: `Ошибка при создании рецепта ${value}`,
  RECIPE_DELETION_ERROR: `Ошибка при удалении рецепта ${value}`,
  RECIPE_DOES_NOT_EXISTS:  `Рецепт ${value} не найден в базе данных`,
  RECIPE_UPDATED:  `Рецепт ${value} обновлен`,
  RECIPE_UPDATE_ERROR: `Ошибка при обновлении рецепта ${value}`,
  IMAGE_TOO_BIG:
    'Извините, загрузка изображения невозможна. Размер не должен превышать 10MB',
  IMAGE_WRONG_TYPE:
    'Извините, загрузка изображения невозможна. Разрешены следующие форматы изображений: png, jpg, jpeg, webp',
  INGREDIENT_EXISTS: `Ингредиент с id ${value} уже существует`,
  INGREDIENT_WITH_NAME_EXISTS: `Ингредиент ${value} уже существует`,
  INGREDIENT_CREATED: `Ингредиент ${value} создан`,
  INGREDIENT_CREATION_ERROR: `Ошибка при создании ингредиента ${value}`,
  INGREDIENT_DOES_NOT_EXISTS:  `Ингредиент ${value} не найден в базе данных`,
  INGREDIENT_DELETED: `Ингредиент ${value} удален`,
  INGREDIENT_DELETION_ERROR: `Ошибка при удалении ингредиента ${value}`,
  INGREDIENT_UPDATED:  `Ингредиент ${value} обновлен`,
  INGREDIENT_UPDATE_ERROR: `Ошибка при обновлении ингредиента ${value}`,
});

export const RECIPES_TABLE_PATH = 'recipes';
export const INGREDIENTS_TABLE_PATH = 'ingredients';

export const IMAGE_TYPE = [
  ImageType.Jpeg,
  ImageType.Jpg,
  ImageType.Png,
  ImageType.Webp,
];

export const DISH_TYPE = [
  { name: 'Основное', value: DishType.Main },
  { name: 'Десерт', value: DishType.Dessert },
  { name: 'Салат', value: DishType.Salat },
  { name: 'Закуска', value: DishType.Snack },
  { name: 'Суп', value: DishType.Soup },
];

export const EMPTY_RECIPE: IRecipe = {
  id: '00000000-0000-0000-0000-000000000000',
  imageUrl: '',
  name: '',
  type: '' as DishType,
  isVegan: false,
  ingredients: '',
  description: '',
};

export const CURRENT_RECIPE = 'CURRENT_RECIPE';