// Formatea dinámicamente la entrada mientras el usuario escribe, en formato DD/MM/AAAA
export const formatDateInput = (text: string) => {
  const cleaned = text.replace(/\D/g, "");

  let formatted = cleaned;
  if (cleaned.length > 2 && cleaned.length <= 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
  } else if (cleaned.length > 4) {
    formatted = `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}/${cleaned.slice(4, 8)}`;
  }
  return formatted;
};

// Formatea la fecha de nacimiento en formato ISO
export const formatDOBToISO = (dob: string) => {
  const [day, month, year] = dob.split("/").map(Number);
  const date = new Date(year, month - 1, day);
  return date.toISOString();
};

// Formatea la fecha en formato DD/MM/YYYY
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return "";
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
