import { IAction, IState, IUser } from 'src/types';
import { SET_ERROR, SET_LOADING, SET_USER } from './types';

const initialState: IState = {
  user: {} as IUser,
  loading: false,
  error: null,
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
    default:
      return state;
  }
};

export default rootReducer;
