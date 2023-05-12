export const convertDate = (date) => {
  if (!date) return "";
  const newDate = new Date(date);
  return newDate instanceof Date && !isNaN(newDate);
};

export const convertDateFromDb = (date) => {
  if (!date) return "";
  const newDate = new Date(date);
  return `${newDate.getDay()}/${newDate.getMonth()}/${newDate.getFullYear()}`;
};
