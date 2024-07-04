import { Action } from '@reduxjs/toolkit';

export interface IUser {
  email: string;
}

export enum DishType {
  Main = 'main',
  Soup = 'soup',
  Dessert = 'dessert',
  Salat = 'salat',
  Snack = 'snack',
}

export type RecipeImage = {
  [key: string]: string;
};

export interface IIngredient {
  id: string;
  name: string;
}

export interface IRecipe {
  id: string;
  imageUrl: string;
  name: string;
  type: DishType;
  isVegan: boolean;
  ingredients: string[];
  description: string;
  composition?: string;
  createdAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
}

export interface IPlanningList {
  id: string;
  name: string;
  ingredientsList: string[];
  recipesList: string[];
}

export interface IState {
  user: IUser;
  loading: boolean;
  error: null | string;
  recipesList: IRecipe[];
  imagesList: RecipeImage[];
  recipesPage: {
    recipeSearchInput: string;
    scrollSize: number;
    scrollDirection: ScrollDirection;
  };
  isMenu: boolean;
  ingredientsList: IIngredient[];
  ingredientsPage: {
    ingredientSearchInput: string;
  }
  previousRoute: string;
  planningPage: {
    ingredientsList: string[];
    recipesList: IRecipe[];
  }
}

export interface IAction extends Action {
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

export enum ScrollDirection {
  Up = 'up',
  Down = 'down',
}

export enum Severity {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}

export interface ICurrentRecipe extends Partial<IRecipe> {}
