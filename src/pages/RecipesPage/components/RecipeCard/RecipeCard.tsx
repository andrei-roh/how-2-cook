import css from './RecipeCard.module.sass';
import { IRecipe, IState } from 'src/types';
import Edit from 'src/assets/pencil.svg';
import Show from 'src/assets/eye.svg';
import { useNavigate } from 'react-router-dom';
import { getRecipeImage } from 'src/utils/getRecipeImage';
import { Dispatch } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { addImagesToList } from 'src/redux/actions';
import { DISH_TYPE } from 'src/constants';
import { useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

interface RecipeCardProps extends IRecipe {}

const maxNameLength = 38;

export const RecipeCard = ({ id, imageUrl, name, type }: RecipeCardProps) => {
  const navigate = useNavigate();
  const dispatch: Dispatch = useDispatch();
  const imagesList = useSelector((state: IState) => state.imagesList);
  const currentImageUrl = imagesList.find(
    (image) => image.id === imageUrl
  )?.value;
  const isLongName = name
    .split(' ')
    .some((namePart: string) => namePart.length > maxNameLength);

  const handleEditRecipe = () => {
    navigate(`/recipe/edit/${id}`);
  };

  const handleShowRecipe = () => {
    navigate(`/recipe/show/${id}`);
  };

  useEffect(() => {
    if (!currentImageUrl) {
      getRecipeImage(imageUrl).then((url) => {
        if (url) {
          dispatch(addImagesToList([{ id: imageUrl, value: url }]));
        }
      });
    }
  }, [currentImageUrl, dispatch, id, imageUrl]);

  return (
    <Card className={css.recipeCardWrapper}>
      <Stack className={css.recipeContainer}>
        {currentImageUrl ? (
          <img className={css.recipeCardImage} id={id} src={currentImageUrl} />
        ) : (
          <div className={css.recipeCardLoader}>
            <CircularProgress />
          </div>
        )}
        <Stack className={css.recipeData}>
          <Typography className={css.recipeName}>
            {isLongName ? `${name.slice(0, maxNameLength)}...` : name}
          </Typography>
          <Typography className={css.recipeType}>
            {DISH_TYPE.find(({ value }) => value === type)?.name}
          </Typography>
          <Stack className={css.buttonsPanel}>
            <img
              onClick={handleEditRecipe}
              className={css.recipeCardLogo}
              src={Edit}
              alt='Edit Recipe Button'
            />
            <img
              onClick={handleShowRecipe}
              className={css.recipeCardLogo}
              src={Show}
              alt='Show Recipe Button'
            />
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
};
