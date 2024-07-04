import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { Severity } from 'src/types';
import { showNotification } from '../showNotification';
import { NOTIFICATIONS, PLANNING_TABLE_PATH } from 'src/constants';
import { getPlanningList } from './getPlanningList';

export const createPlanningList = async (
  recipesList: string[],
  ingredientsList: string[],
  id: string,
  name: string
): Promise<boolean> => {
  const event = await getPlanningList(id);
  const eventsRef = collection(firebaseDb, PLANNING_TABLE_PATH);

  if (event) {
    showNotification(
      NOTIFICATIONS(id).PLANNING_LIST_EXISTS,
      6000,
      Severity.Error
    );
    return false;
  }

  return await setDoc(doc(eventsRef, id), { id, name, ingredientsList, recipesList })
    .then(() => {
      showNotification(
        NOTIFICATIONS(name).PLANNING_LIST_CREATED,
        3000,
        Severity.Success
      );

      return true;
    })
    .catch(() => {
      showNotification(
        NOTIFICATIONS(name).PLANNING_LIST_CREATION_ERROR,
        3000,
        Severity.Error
      );

      return false;
    });
};
