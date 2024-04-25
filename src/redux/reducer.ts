import { IRecipe, IUser, RecipeImage, ScrollDirection } from 'src/types';

import { createReducer } from '@reduxjs/toolkit';
import {
  ADD_IMAGES_TO_LIST_CREATOR,
  ADD_RECIPES_TO_LIST_CREATOR,
  SET_ERROR_CREATOR,
  SET_LOADING_CREATOR,
  SET_MANAGE_RECIPES_SCROLL_DIRECTION_CREATOR,
  SET_MANAGE_RECIPES_SCROLL_SIZE_CREATOR,
  SET_RECIPE_SEARCH_INPUT_CREATOR,
  SET_USER_CREATOR,
  UPDATE_RECIPES_LIST_CREATOR,
} from './creators';

const initialState = {
  user: {} as IUser,
  loading: false,
  error: null as unknown,
  recipesList: [] as IRecipe[],
  imagesList: [] as RecipeImage[],
  recipesPage: {
    recipeSearchInput: '',
    scrollDirection: ScrollDirection.Down,
    scrollSize: 0,
  },
};

const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(SET_USER_CREATOR, (state, action) => {
      state.user = action.payload;
    })
    .addCase(SET_LOADING_CREATOR, (state, action) => {
      state.loading = action.payload;
    })
    .addCase(SET_ERROR_CREATOR, (state, action) => {
      state.error = action.payload;
    })
    .addCase(ADD_RECIPES_TO_LIST_CREATOR, (state, action) => {
      state.recipesList = [...action.payload, ...state.recipesList];
    })
    .addCase(UPDATE_RECIPES_LIST_CREATOR, (state, action) => {
      state.recipesList = action.payload;
    })
    .addCase(ADD_IMAGES_TO_LIST_CREATOR, (state, action) => {
      state.imagesList = [...action.payload, ...state.imagesList];
    })
    .addCase(SET_RECIPE_SEARCH_INPUT_CREATOR, (state, action) => {
      state.recipesPage.recipeSearchInput = action.payload;
    })
    .addCase(SET_MANAGE_RECIPES_SCROLL_SIZE_CREATOR, (state, action) => {
      state.recipesPage.scrollSize = action.payload;
    })
    .addCase(SET_MANAGE_RECIPES_SCROLL_DIRECTION_CREATOR, (state, action) => {
      state.recipesPage.scrollDirection = action.payload;
    });
});

export default rootReducer;
