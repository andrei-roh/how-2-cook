import { useEffect } from 'react';
import { TextArea } from 'src/components';
import css from './ShowRecipePage.module.sass';
import { IState } from 'src/types';
import {
  DISH_TYPE,
  EMPTY_RECIPE,
  RECIPES_ROUTE,
  ROOT_ROUTE,
} from 'src/constants';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Vegetarian from 'src/assets/vegetarian.svg';
import { setHeightUsingScroll } from 'src/utils/setHeightUsingScroll';
import Button from '@mui/material/Button';

export const ShowRecipePage = () => {
  const navigate = useNavigate();
  const user = useSelector((state: IState) => state.user);
  const { id: recipeId } = useParams();
  const recipesList = useSelector((state: IState) => state.recipesList);
  const shownRecipe =
    recipesList.find((recipe) => recipe.id === recipeId) || EMPTY_RECIPE;

  const { imageUrl, name, type, ingredients, description, isVegan } = shownRecipe;
  const imagesList = useSelector((state: IState) => state.imagesList);
  const currentImageUrl = imagesList.find(
    (image) => image.id === imageUrl
  )?.value;

  const handleShowRecipe = () => {
    navigate(RECIPES_ROUTE);
  };

  useEffect(() => {
    if (!user.email) {
      navigate(ROOT_ROUTE);
    }
  }, [navigate, user.email]);

  useEffect(() => {
    setHeightUsingScroll(document.getElementById('show-recipe-ingredients'));
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
            {DISH_TYPE.find(({ value }) => value === type)?.name}
            {isVegan && <img width={12} src={Vegetarian} />}
          </div>
          <TextArea
            value={ingredients}
            setChange={() => null}
            isDisabled
            id='show-recipe-ingredients'
            textAreaClassName={css.recipeIngredients}
            labelClassName={css.showRecipeTextAreaLabel}
          />
          <TextArea
            value={`${description}, ${description}`}
            setChange={() => null}
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
      <Button variant='outlined' onClick={handleShowRecipe} className={css.cancelButton}>
        Назад
      </Button>
    </div>
  );
};
