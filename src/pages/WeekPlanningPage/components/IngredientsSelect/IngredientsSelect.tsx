import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';
import { Select } from 'src/components';
import { getIngredientsToSelect } from 'src/utils/ingredients/getIngredientsToSelect';
import { IIngredient } from 'src/types';
import css from './IngredientsSelect.module.sass';
import { isArraysEqual } from 'src/utils/isArraysEqual';

interface IngredientsSelectProps {
  recipeIngredients: string[] | [];
  setRecipeIngredients: React.Dispatch<React.SetStateAction<[] | string[]>>;
  allIngredients: IIngredient[];
  handleGetRecipesByIngredient: () => void;
  isPlanning: boolean;
  planningIngredients: string[];
}

export const IngredientsSelect = ({
  recipeIngredients,
  setRecipeIngredients,
  allIngredients,
  handleGetRecipesByIngredient,
  isPlanning,
  planningIngredients,
}: IngredientsSelectProps) => {
  return (
    <>
      <Select
        value={recipeIngredients}
        setChange={setRecipeIngredients}
        options={getIngredientsToSelect(allIngredients)}
        labelText={'Ингредиенты'}
        multiple
        placeholder={'Выбор'}
        selectClassName={!recipeIngredients ? css.selectPlaceholder : undefined}
      />
      <Button
        className={css.submitButton}
        onClick={handleGetRecipesByIngredient}
        disabled={
          isPlanning || isArraysEqual(recipeIngredients, planningIngredients)
        }
      >
        {isPlanning ? (
          <CircularProgress color='inherit' size={32} />
        ) : (
          'Спланировать'
        )}
      </Button>
    </>
  );
};
