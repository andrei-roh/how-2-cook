import { IRecipe, IUser, RecipeImage, ScrollDirection } from 'src/types';
import {
  ADD_IMAGES_TO_LIST,
  ADD_RECIPES_TO_LIST,
  SET_ERROR,
  SET_LOADING,
  SET_MANAGE_RECIPES_SCROLL_DIRECTION,
  SET_MANAGE_RECIPES_SCROLL_SIZE,
  SET_RECIPE_SEARCH_INPUT,
  SET_USER,
  UPDATE_RECIPES_LIST,
} from './types';

export const setUser = (editor: IUser) => ({
  type: SET_USER,
  payload: editor,
});

export const setLoading = (isLoading: boolean) => ({
  type: SET_LOADING,
  payload: isLoading,
});

export const setError = (error: unknown) => ({
  type: SET_ERROR,
  payload: error,
});

export const addRecipesToList = (recipes: IRecipe[]) => ({
  type: ADD_RECIPES_TO_LIST,
  payload: recipes,
});

export const updateRecipesList = (recipes: IRecipe[]) => ({
  type: UPDATE_RECIPES_LIST,
  payload: recipes,
});

export const addImagesToList = (
  recipesImages: RecipeImage[]
) => ({
  type: ADD_IMAGES_TO_LIST,
  payload: recipesImages,
});

export const setRecipesPageSearchInput = (searchInput: string) => ({
  type: SET_RECIPE_SEARCH_INPUT,
  payload: searchInput,
});

export const setRecipesPageScrollSize = (scrollSize: number) => ({
  type: SET_MANAGE_RECIPES_SCROLL_SIZE,
  payload: scrollSize,
});

export const setRecipesPageScrollDirection = (
  scrollDirection: ScrollDirection
) => ({
  type: SET_MANAGE_RECIPES_SCROLL_DIRECTION,
  payload: scrollDirection,
});
