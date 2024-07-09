export const getClassesList = (
  mainClass: string,
  additionalClass?: string,
  errorClass?: string
) => {
  let classesList = `${mainClass.trim()}`;

  if (additionalClass) {
    classesList += ` ${additionalClass.trim()}`;
  }

  if (errorClass) {
    classesList += ` ${errorClass.trim()}`;
  }

  return classesList;
};
