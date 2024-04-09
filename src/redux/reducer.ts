import {
  IAction,
  IRecipe,
  IState,
  IUser,
  RecipeImage,
  ScrollDirection,
} from 'src/types';
import {
  ADD_IMAGES_TO_LIST,
  ADD_RECIPES_TO_LIST,
  SET_ERROR,
  SET_LOADING,
  SET_MANAGE_RECIPES_SCROLL_DIRECTION,
  SET_MANAGE_RECIPES_SCROLL_SIZE,
  SET_RECIPE_SEARCH_INPUT,
  SET_USER,
} from './types';

const initialState: IState = {
  user: {} as IUser,
  loading: false,
  error: null,
  recipesList: [] as IRecipe[],
  imagesList: [] as RecipeImage[],
  recipesPage: {
    recipeSearchInput: '',
    scrollDirection: ScrollDirection.Down,
    scrollSize: 0,
  },
};

const rootReducer = (state = initialState, action: IAction) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_RECIPES_TO_LIST:
      return {
        ...state,
        recipesList: [...action.payload, ...state.recipesList],
      };
    case ADD_IMAGES_TO_LIST:
      return {
        ...state,
        imagesList: [...action.payload, ...state.imagesList],
      };
    case SET_RECIPE_SEARCH_INPUT:
      return {
        ...state,
        recipesPage: {
          ...state.recipesPage,
          recipeSearchInput: action.payload,
        },
      };
    case SET_MANAGE_RECIPES_SCROLL_SIZE:
      return {
        ...state,
        recipesPage: {
          ...state.recipesPage,
          scrollSize: action.payload,
        },
      };
    case SET_MANAGE_RECIPES_SCROLL_DIRECTION:
      return {
        ...state,
        recipesPage: {
          ...state.recipesPage,
          scrollDirection: action.payload,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
