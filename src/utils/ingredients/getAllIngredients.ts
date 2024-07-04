import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { INGREDIENTS_TABLE_PATH } from 'src/constants';
import { firebaseDb } from 'src/main';
import { IIngredient } from 'src/types';

export const getAllIngredients = async (): Promise<IIngredient[]> => {
  const queryIngredients = query(
    collection(firebaseDb, INGREDIENTS_TABLE_PATH),
    orderBy('name', 'asc')
  );

  const querySnapshot = await getDocs(queryIngredients);
  const allIngredients: IIngredient[] = [];

  querySnapshot.forEach((record) => {
    allIngredients.push(record.data() as IIngredient);
  });

  return allIngredients;
};
