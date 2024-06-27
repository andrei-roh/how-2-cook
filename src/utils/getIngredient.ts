import { doc, getDoc } from 'firebase/firestore';
import { INGREDIENTS_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IIngredient } from 'src/types';

export const getIngredient = async (ingredientId: string, ingredientName?: string) => {
  const docRef = doc(firebaseDb, INGREDIENTS_TABLE_PATH, ingredientName ? ingredientName : ingredientId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as IIngredient;
  }

  return undefined;
};
