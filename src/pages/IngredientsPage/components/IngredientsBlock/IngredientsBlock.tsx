import css from './IngredientsBlock.module.sass';
import { IIngredient } from 'src/types';
import Fridge from 'src/assets/hand-drawn-food.svg';
import Pancakes from 'src/assets/pancakes.svg';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { Modal } from 'src/components';
import Edit from 'src/assets/pencil.svg';
import Bin from 'src/assets/paper-bin.svg';

interface IngredientsBlockPros {
  ingredients: IIngredient[];
  isSearch: boolean;
}

export const IngredientsBlock = ({
  ingredients,
  isSearch,
}: IngredientsBlockPros) => {
  const [isDelete, setIsDelete] = useState(false);

  const handleShowModal = () => setIsDelete(true);
  const handleCloseModal = () => setIsDelete(false);

  if (ingredients.length === 0) {
    return (
      <Stack
        direction='column'
        useFlexGap
        spacing={2}
        className={css.ingredientsServiceWrapper}
      >
        {isSearch ? (
          <>
            <img className={css.ingredientsBlockLogo} src={Pancakes} />
            <Typography className={css.emptyMessage}>
              Ингредиенты не найдены
            </Typography>
          </>
        ) : (
          <>
            <img className={css.ingredientsBlockLogo} src={Fridge} />
            <Typography className={css.emptyMessage}>
              Добавьте первый ингредиент
            </Typography>
          </>
        )}
      </Stack>
    );
  }

  return (
    <Stack
      direction='column'
      useFlexGap
      spacing={2}
      className={css.ingredientsBlockWrapper}
    >
      {ingredients.map((ingredient) => (
        <>
          <Box
            key={ingredient.id}
            {...ingredient}
            className={css.ingredientContainer}
          >
            <Typography variant='button'>{ingredient.name}</Typography>
            <Box className={css.buttonsPanel}>
              <img
                onClick={() => null}
                className={css.ingredientBlockLogo}
                src={Edit}
                alt='Edit Ingredient Button'
              />
              <img
                onClick={handleShowModal}
                className={css.ingredientBlockLogo}
                src={Bin}
                alt='Delete Ingredient Button'
              />
            </Box>
          </Box>
          {isDelete && (
            <Modal
              cancelButtonMessage='Отмена'
              submitButtonMessage='Удалить'
              isLoading={false}
              handleClose={handleCloseModal}
              handleSubmit={() => null}
              message={`Вы уверены, что хотите удалить ингредиент ${ingredient.name}?`}
            />
          )}
        </>
      ))}
    </Stack>
  );
};
