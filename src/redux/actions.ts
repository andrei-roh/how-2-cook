import { IRecipe, IUser } from 'src/types';
import { ADD_RECIPES_TO_LIST, SET_ERROR, SET_LOADING, SET_USER } from './types';

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