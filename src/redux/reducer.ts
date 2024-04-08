import { IAction, IRecipe, IState, IUser } from 'src/types';
import { ADD_RECIPES_TO_LIST, SET_ERROR, SET_LOADING, SET_USER } from './types';

const initialState: IState = {
  user: {} as IUser,
  loading: false,
  error: null,
  recipesList: [] as IRecipe[],
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
    default:
      return state;
  }
};

export default rootReducer;
