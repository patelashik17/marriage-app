export const formatDate = (dateString: string) => {
  const dateParts = dateString?.split("T");
  const date = dateParts[0];
  const [year, month, day] = date?.split("-");
  const formattedDate = `${day}-${month}-${year}`;

  return formattedDate;
};

export const convertDateFormat = (dateString: string): string => {
  const inputDate: Date = new Date(dateString);

  if (isNaN(inputDate.getTime())) {
    throw new Error("Invalid Date");
  }

  const month: string = String(inputDate.getMonth() + 1).padStart(2, "0");
  const day: string = String(inputDate.getDate()).padStart(2, "0");
  const year: number = inputDate.getFullYear();

  const formattedDate: string = `${month}-${day}-${year}`;

  return formattedDate;
};

export const formatDateFirstMonth = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;
  const formattedDate = formattedMonth + "-" + formattedDay + "-" + year;

  return formattedDate;
};

export function formatDates(inputDateStr: string) {
  const date = new Date(inputDateStr);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}
