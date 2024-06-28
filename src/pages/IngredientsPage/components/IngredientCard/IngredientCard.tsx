import css from './IngredientCard.module.sass';
import Box from '@mui/material/Box';
import Edit from 'src/assets/pencil.svg';
import Bin from 'src/assets/paper-bin.svg';
import Accept from 'src/assets/check-square.svg';
import Close from 'src/assets/close-square.svg';
import { Input, Modal } from 'src/components';
import { IIngredient, IState } from 'src/types';
import { useState } from 'react';
import { deleteIngredient } from 'src/utils/deleteIngredient';
import { updateIngredientsList } from 'src/redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { editIngredient } from 'src/utils/editIngredient';

interface IngredientCardProps {
  ingredient: IIngredient;
}

export const IngredientCard = ({ ingredient }: IngredientCardProps) => {
  const dispatch = useDispatch();
  const ingredientsList = useSelector((state: IState) => state.ingredientsList);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [ingredientName, setIngredientName] = useState(ingredient.name);

  const handleStartUpdate = () => {
    if (isUpdate && ingredientName !== ingredient.name) {
      editIngredient(ingredient.id, { name: ingredientName });
    }

    setIsUpdate(!isUpdate);
  };
  const handleDismissUpdate = () => {
    setIngredientName(ingredient.name);
    setIsUpdate(false);
  };
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
      <Box className={css.ingredientContainer}>
        <Input
          value={ingredientName}
          setChange={setIngredientName}
          isDisabled={!isUpdate}
          labelClassName={css.ingredientLabel}
          inputClassName={css.ingredientInput}
          isFocused={isUpdate}
        />
        <Box className={css.buttonsPanel}>
          <Box className={css.updatePanel}>
            {isUpdate && (
              <img
                onClick={handleDismissUpdate}
                className={css.ingredientBlockLogo}
                src={Close}
                alt='Close Edit Ingredient Button'
              />
            )}
            <img
              onClick={handleStartUpdate}
              className={css.ingredientBlockLogo}
              src={isUpdate ? Accept : Edit}
              alt='Accept/Edit Ingredient Button'
            />
          </Box>
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
