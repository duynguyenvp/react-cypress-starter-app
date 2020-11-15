export const cloneDate = (date) => {
  if (!date) {
    return null;
  }
  const result = new Date(date);
  if (result === "Invalid Date") {
    return null;
  }
  return result;
};

export const dateToStringFormatCultureVi = (date) => {
  const newDate = cloneDate(date);
  try {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit"
    };
    const result = newDate.toLocaleDateString("vi", options);
    return result.split(",").reverse().join(" ").trim();
  } catch (error) {
    return "";
  }
};

export const dateToStringFormatNoDayCultureVi = (date) => {
  const newDate = cloneDate(date);
  try {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    const result = newDate.toLocaleDateString("vi", options);
    return result.substring(3);
  } catch (error) {
    return "";
  }
};
