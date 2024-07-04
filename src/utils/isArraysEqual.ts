export const isArraysEqual = (first: string[], second: string[]): boolean => {
  return (
    JSON.stringify([...first].sort()) === JSON.stringify([...second].sort())
  );
};
