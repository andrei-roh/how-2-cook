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

export const addImagesToList = (recipesImages: RecipeImage[]) => ({
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

export const setShowMenu = (isMenu: boolean) => ({
  type: SET_SHOW_MENU,
  payload: isMenu,
});

export const addIngredientsToList = (ingredients: IIngredient[]) => ({
  type: ADD_INGREDIENTS_TO_LIST,
  payload: ingredients,
});

export const setIngredientsPageSearchInput = (searchInput: string) => ({
  type: SET_INGREDIENT_SEARCH_INPUT,
  payload: searchInput,
});

export const updateIngredientsList = (ingredients: IIngredient[]) => ({
  type: UPDATE_INGREDIENTS_LIST,
  payload: ingredients,
});

export const setPreviousRoute = (route: string) => ({
  type: SET_PREVIOUS_ROUTE,
  payload: route,
});

export const updatePlanningIngredientsList = (ingredients: string[]) => ({
  type: UPDATE_PLANNING_INGREDIENTS_LIST,
  payload: ingredients,
});

export const updatePlanningRecipesList = (recipes: IRecipe[]) => ({
  type: UPDATE_PLANNING_RECIPES_LIST,
  payload: recipes,
});
