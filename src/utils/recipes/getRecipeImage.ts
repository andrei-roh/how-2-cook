import { getDownloadURL, getStorage, ref } from 'firebase/storage';

export const getRecipeImage = async (imageUrl: string) => {
  const storage = getStorage();
  const httpsReference = ref(storage, imageUrl);

  if (httpsReference) {
    return getDownloadURL(httpsReference);
  }

  return undefined;
};
