export const acronym = (str: string) => {
  const matches = str.match(/\b(\w)/g); // ['J','S','O','N']
  const getAcronym = matches?.join("") || ""; // JSON
  return getAcronym;
};
