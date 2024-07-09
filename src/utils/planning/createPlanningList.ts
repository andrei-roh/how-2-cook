import { collection, doc, setDoc } from 'firebase/firestore';
import { firebaseDb } from 'src/main';
import { Severity } from 'src/types';
import { showNotification } from '../showNotification';
import { NOTIFICATIONS, PLANNING_TABLE_PATH } from 'src/constants';
import { getUserPlanningLists } from './getUserPlanningLists';

export const createPlanningList = async (
  recipesList: string[],
  ingredientsList: string[],
  id: string,
  name: string,
  userEmail: string
): Promise<boolean> => {
  const userPlanningLists = await getUserPlanningLists(userEmail);
  const planningListsRef = collection(firebaseDb, PLANNING_TABLE_PATH);

  return await setDoc(doc(planningListsRef, userEmail), {
    ...userPlanningLists,
    [id]: { id, name, ingredientsList, recipesList },
  })
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
