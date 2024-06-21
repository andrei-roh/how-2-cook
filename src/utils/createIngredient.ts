import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { IIngredient, Severity } from 'src/types';
import { showNotification } from './showNotification';
import { getRecipe } from './getRecipe';
import { INGREDIENTS_TABLE_PATH, NOTIFICATIONS } from 'src/constants';

export const createIngredient = async (
  newIngredient: IIngredient
): Promise<boolean> => {
  const event = await getRecipe(newIngredient.id);
  const eventsRef = collection(firebaseDb, INGREDIENTS_TABLE_PATH);

  if (event) {
    showNotification(
      NOTIFICATIONS(newIngredient.id).INGREDIENT_EXISTS,
      6000,
      Severity.Error
    );
    return false;
  }

  try {
    await setDoc(doc(eventsRef, newIngredient.id), newIngredient);

    showNotification(
      NOTIFICATIONS(newIngredient.name).INGREDIENT_CREATED,
      3000,
      Severity.Success
    );

    return true;
  } catch {
    showNotification(
      NOTIFICATIONS(newIngredient.name).INGREDIENT_CREATION_ERROR,
      3000,
      Severity.Error
    );

    return false;
  }
};
