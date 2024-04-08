import { DishType, ImageType } from './types';

export const ROOT_ROUTE = '/';
export const RECIPES_ROUTE = '/recipes';
export const CREATE_RECIPE_ROUTE = '/recipe/create';

export const DEFAULT_NOTIFICATION = 'Default Notification Message';
export const NOTIFICATIONS = (value?: string) => ({
  USER_WRONG_EMAIL: `Пользователь с адресом электронной почты ${value} не существует. Проверьте данные или обратитесь к администратору`,
  USER_WRONG_PASSWORD: `Введен неправильный пароль для пользователя ${value}. Проверьте данные или обратитесь к администратору`,
  USER_TOO_MANY_REQUESTS: `Слишком много запросов для пользователя ${value}. Подождите некоторое время или обратитесь к администратору`,
  SIGN_OUT_SUCCESS: `Пользователь ${value} вышел из приложения`,
  SIGN_OUT_ERROR: `Ошибка при выходе пользователя ${value} из приложения`,
  RECIPE_EXISTS: `Рецепт с id ${value} уже существует`,
  RECIPE_CREATED: `Рецепт ${value} создан`,
  RECIPE_CREATION_ERROR: `Ошибка при создании рецепта ${value}`,
  IMAGE_TOO_BIG:
    'Извините, загрузка изображения невозможна. Размер не должен превышать 10MB',
  IMAGE_WRONG_TYPE:
    'Извините, загрузка изображения невозможна. Разрешены следующие форматы изображений: png, jpg, jpeg, webp',
});

export const RECIPES_TABLE_PATH = 'recipes';

export const IMAGE_TYPE = [
  ImageType.Jpeg,
  ImageType.Jpg,
  ImageType.Png,
  ImageType.Webp,
];

export const DISH_TYPE = [
  { name: 'Мясное', value: DishType.Meat },
  { name: 'Вегетарианское', value: DishType.Vegan },
];
