import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addIngredientsToList } from 'src/redux/actions';
import { IIngredient } from 'src/types';
import { getAllIngredients } from 'src/utils/ingredients/getAllIngredients';

export const useCheckAllIngredients = (allIngredients: IIngredient[]) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (allIngredients.length === 0) {
      getAllIngredients().then((result) => {
        dispatch(addIngredientsToList(result));
      });
    }
  }, []);
};
