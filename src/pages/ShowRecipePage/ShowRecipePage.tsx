import { useEffect } from 'react';
import { TextArea } from 'src/components';
import css from './ShowRecipePage.module.sass';
import { IState } from 'src/types';
import { DISH_TYPE, EMPTY_RECIPE } from 'src/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Vegetarian from 'src/assets/vegetarian.svg';
import { setHeightUsingScroll } from 'src/utils/setHeightUsingScroll';
import Button from '@mui/material/Button';
import { Ingredient } from 'src/components/Ingredient/Ingredient';
import { getIngredientsLabels } from 'src/utils/ingredients/getIngredientsLabels';
import { Box } from '@mui/material';
import { useCheckAuthentication } from 'src/hooks/useCheckAuthentication';
import { useCheckAllIngredients } from 'src/hooks/useCheckAllIngredients';

export const ShowRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);
  const allIngredients = useSelector((state: IState) => state.ingredientsList);
  const previousRoute = useSelector((state: IState) => state.previousRoute);

  const { id: recipeId } = useParams();
  const recipesList = useSelector((state: IState) => state.recipesList);
  const shownRecipe =
    recipesList.find((recipe) => recipe.id === recipeId) || EMPTY_RECIPE;

  const {
    imageUrl,
    name,
    type,
    composition,
    ingredients,
    description,
    isVegan,
  } = shownRecipe;
  const imagesList = useSelector((state: IState) => state.imagesList);
  const currentImageUrl = imagesList.find(
    (image) => image.id === imageUrl
  )?.value;

  const handleShowRecipe = () => {
    navigate(previousRoute);
  };

  useCheckAuthentication(user);
  useCheckAllIngredients(allIngredients);

  useEffect(() => {
    setHeightUsingScroll(document.getElementById('show-recipe-composition'));
    setHeightUsingScroll(document.getElementById('show-recipe-description'));
  }, []);

  return (
    <div className={css.showRecipePageWrapper}>
      {shownRecipe.id !== EMPTY_RECIPE.id ? (
        <>
          <div className={css.showRecipeTitle}>Просмотр Рецепта</div>
          <img
            className={css.recipeImage}
            id={recipeId}
            src={currentImageUrl}
          />
          <div className={css.recipeTitle}>{name}</div>
          <div className={css.recipeType}>
            Тип:
            {DISH_TYPE.find(({ value }) => value === type)?.name}
            {isVegan && <img width={12} src={Vegetarian} />}
          </div>
          <Box className={css.ingredientsBlock}>
            {getIngredientsLabels(allIngredients, ingredients).map(
              (ingredient) => (
                <Ingredient key={ingredient.id} name={ingredient.name} />
              )
            )}
          </Box>
          {composition && (
            <TextArea
              value={composition}
              setChange={() => null}
              labelText='Ингредиенты:'
              isDisabled
              id='show-recipe-composition'
              textAreaClassName={css.recipeIngredients}
              labelClassName={css.showRecipeTextAreaLabel}
            />
          )}
          <TextArea
            value={description}
            setChange={() => null}
            labelText='Описание:'
            isDisabled
            id='show-recipe-description'
            textAreaClassName={css.recipeDescription}
            labelClassName={css.showRecipeTextAreaLabel}
          />
        </>
      ) : (
        <>
          <img className={css.showRecipeLogo} src={Fridge} />
          <div className={css.emptyMessage}>Рецепт не найден</div>
        </>
      )}
      <Button
        variant='outlined'
        onClick={handleShowRecipe}
        className={css.cancelButton}
      >
        Назад
      </Button>
    </div>
  );
};
