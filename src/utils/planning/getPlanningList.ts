import { doc, getDoc } from 'firebase/firestore';
import { PLANNING_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IPlanningList } from 'src/types';

export const getPlanningList = async (listId: string) => {
  const docRef = doc(firebaseDb, PLANNING_TABLE_PATH, listId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IPlanningList;
  }

  return undefined;
};
