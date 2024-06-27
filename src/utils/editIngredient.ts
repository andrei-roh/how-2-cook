import { collection, doc, updateDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IIngredient, Severity } from 'src/types';
import { showNotification } from './showNotification';
import { INGREDIENTS_TABLE_PATH, NOTIFICATIONS } from 'src/constants';
import { getIngredient } from './getIngredient';

export const editIngredient = async (
  ingredientId: string,
  updatedFields: Partial<IIngredient>,
): Promise<boolean> => {
  const ingredient = await getIngredient(ingredientId);
  const ingredientsRef = collection(firebaseDb, INGREDIENTS_TABLE_PATH);

  if (!ingredient) {
    showNotification(
      NOTIFICATIONS(ingredientId).INGREDIENT_DOES_NOT_EXISTS,
      6000,
      Severity.Error
    );
    return false;
  }

  return await updateDoc(doc(ingredientsRef, ingredientId), { ...updatedFields })
    .then(() => {
      showNotification(
        NOTIFICATIONS(ingredientId).INGREDIENT_UPDATED,
        3000,
        Severity.Success
      );

      return true;
    })
    .catch(() => {
      showNotification(
        NOTIFICATIONS(ingredientId).INGREDIENT_UPDATE_ERROR,
        3000,
        Severity.Error
      );

      return false;
    });
};
