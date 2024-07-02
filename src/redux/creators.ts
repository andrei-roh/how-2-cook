import { createAction } from '@reduxjs/toolkit';
import {
  IIngredient,
  IRecipe,
  IUser,
  RecipeImage,
  ScrollDirection,
} from 'src/types';
import {
  ADD_IMAGES_TO_LIST,
  ADD_INGREDIENTS_TO_LIST,
  ADD_RECIPES_TO_LIST,
  SET_ERROR,
  SET_INGREDIENT_SEARCH_INPUT,
  SET_LOADING,
  SET_MANAGE_RECIPES_SCROLL_DIRECTION,
  SET_MANAGE_RECIPES_SCROLL_SIZE,
  SET_PREVIOUS_ROUTE,
  SET_RECIPE_SEARCH_INPUT,
  SET_SHOW_MENU,
  SET_USER,
  UPDATE_INGREDIENTS_LIST,
  UPDATE_PLANNING_INGREDIENTS_LIST,
  UPDATE_PLANNING_RECIPES_LIST,
  UPDATE_RECIPES_LIST,
} from './types';

export const SET_USER_CREATOR = createAction<IUser>(SET_USER);
export const SET_LOADING_CREATOR = createAction<boolean>(SET_LOADING);
export const SET_ERROR_CREATOR = createAction<unknown>(SET_ERROR);
export const ADD_RECIPES_TO_LIST_CREATOR =
  createAction<IRecipe[]>(ADD_RECIPES_TO_LIST);
export const UPDATE_RECIPES_LIST_CREATOR =
  createAction<IRecipe[]>(UPDATE_RECIPES_LIST);
export const ADD_IMAGES_TO_LIST_CREATOR =
  createAction<RecipeImage[]>(ADD_IMAGES_TO_LIST);
export const SET_RECIPE_SEARCH_INPUT_CREATOR = createAction<string>(
  SET_RECIPE_SEARCH_INPUT
);
export const SET_MANAGE_RECIPES_SCROLL_SIZE_CREATOR = createAction<number>(
  SET_MANAGE_RECIPES_SCROLL_SIZE
);
export const SET_MANAGE_RECIPES_SCROLL_DIRECTION_CREATOR =
  createAction<ScrollDirection>(SET_MANAGE_RECIPES_SCROLL_DIRECTION);
export const SET_SHOW_MENU_CREATOR = createAction<boolean>(SET_SHOW_MENU);
export const ADD_INGREDIENTS_TO_LIST_CREATOR = createAction<IIngredient[]>(
  ADD_INGREDIENTS_TO_LIST
);
export const SET_INGREDIENT_SEARCH_INPUT_CREATOR = createAction<string>(
  SET_INGREDIENT_SEARCH_INPUT
);
export const UPDATE_INGREDIENTS_LIST_CREATOR = createAction<IIngredient[]>(
  UPDATE_INGREDIENTS_LIST
);
export const SET_PREVIOUS_ROUTE_CREATOR =
  createAction<string>(SET_PREVIOUS_ROUTE);
export const UPDATE_PLANNING_INGREDIENTS_LIST_CREATOR = createAction<
  string[]
>(UPDATE_PLANNING_INGREDIENTS_LIST);
export const UPDATE_PLANNING_RECIPES_LIST_CREATOR = createAction<IRecipe[]>(
  UPDATE_PLANNING_RECIPES_LIST
);
