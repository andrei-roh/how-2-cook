export const ROOT_ROUTE = '/';
export const RECIPES_ROUTE = '/recipes';
export const CREATE_RECIPE_ROUTE = '/recipe/create';

export const DEFAULT_NOTIFICATION = 'Default Notification Message';
export const NOTIFICATION = (value?: string) => ({
  USER_WRONG_EMAIL: `Пользователь с адресом электронной почты ${value} не существует. Проверьте данные или обратитесь к администратору`,
  USER_WRONG_PASSWORD: `Введен неправильный пароль для пользователя ${value}. Проверьте данные или обратитесь к администратору`,
  USER_TOO_MANY_REQUESTS: `Слишком много запросов для пользователя ${value}. Подождите некоторое время или обратитесь к администратору`,
  SIGN_OUT_SUCCESS: `Пользователь ${value} вышел из приложения`,
  SIGN_OUT_ERROR: `Ошибка при выходе пользователя ${value} из приложения`,
});
