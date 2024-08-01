import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addRecipesToList } from 'src/redux/actions';
import { IRecipe } from 'src/types';
import { getAllRecipes } from 'src/utils/recipes/getAllRecipes';

export const useCheckAllRecipes = (allRecipes: IRecipe[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (allRecipes.length === 0) {
      getAllRecipes().then((result) => {
        dispatch(addRecipesToList(result));
      });
    }
  }, []);
};
