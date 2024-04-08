export interface IUser {
  email: string;
}

export interface IState {
  user: IUser;
  loading: boolean;
  error: null | string;
  recipesList: IRecipe[];
}

export interface IAction {
  type: string;
  payload: never;
}

export interface IValidationError {
  [key: string]: string;
}

export enum FirebaseErrorType {
  InvalidEmail = 'auth/invalid-email',
  InvalidPassword = 'auth/invalid-credential',
  TooManyRequsts = 'auth/too-many-requests',
}

export enum DishType {
  Vegan = 'vegan',
  Meat = 'meat'
}

export interface IRecipe {
  id: string;
  imageUrl: string;
  name: string;
  type: DishType;
  ingredients: string;
  description: string;
}

export enum ImageType {
  Webp = 'image/webp',
  Jpeg = 'image/jpeg',
  Jpg = 'image/jpg',
  Png = 'image/png',
}

export interface IOption {
  name: string;
  value: string;
}