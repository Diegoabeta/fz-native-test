export const isEmail = (value: string | undefined) => {
  if (!value) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

export const isNameValid = (value: string | undefined) => {
  if (!value || value.trim().length < 3) {
    return false;
  }
  return true;
};

export const isPhone = (value: string | undefined) => {
  if (!value || value.length < 10) return false;
  return true;
};

export const isDate = (value: string | undefined) => {
  if (!value || value.length < 10) return false;

  const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dobRegex.test(value)) return false;

  const [day, month, year] = value.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() + 1 !== month ||
    date.getDate() !== day
  ) {
    return false;
  }

  return true;
};
