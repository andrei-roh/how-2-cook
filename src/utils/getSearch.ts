export const getSearch = <T extends { name: string }>(values: T[], value?: string) => {
  if (values.length === 0 || !value) return values;

  const unsensitiveValue = value.toLowerCase();

  return values.filter((user) =>
    user.name.toLowerCase().startsWith(unsensitiveValue)
  );
};
