import css from './IngredientCard.module.sass';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Edit from 'src/assets/pencil.svg';
import Bin from 'src/assets/paper-bin.svg';
import { Modal } from 'src/components';
import { IIngredient, IState } from 'src/types';
import { useState } from 'react';
import { deleteIngredient } from 'src/utils/deleteIngredient';
import { updateIngredientsList } from 'src/redux/actions';
import { useDispatch, useSelector } from 'react-redux';

interface IngredientCardProps {
  ingredient: IIngredient;
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector((state: IState) => state.ingredientsList);
  const [isDelete, setIsDelete] = useState(false);

  const handleShowModal = () => setIsDelete(true);
  const handleCloseModal = () => setIsDelete(false);
  const handleDeleteIngredient = (id: string, name: string) => {
    deleteIngredient(id, name).then((result) => {
      if (result) {
        const deletedIngedientIndex = ingredientsList.findIndex(
          (ingredient) => ingredient.id === id
        );
        const updatedIngredientsList: IIngredient[] = [...ingredientsList];
        updatedIngredientsList.splice(deletedIngedientIndex, 1);

        dispatch(updateIngredientsList([...updatedIngredientsList]));
        handleCloseModal();
      }
    });
  };

  return (
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
          handleSubmit={() =>
            handleDeleteIngredient(ingredient.id, ingredient.name)
          }
          message={`Вы уверены, что хотите удалить ингредиент ${ingredient.name}?`}
        />
      )}
    </>
  );
};
