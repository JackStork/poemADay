function displayDate() {
  const date = new Date();
  let day = date.getDate();
  day = day < 10 ? "0" + day.toString() : day;
  let month = date.getMonth() + 1;
  month = month < 10 ? "0" + month.toString() : month;
  let year = date.getFullYear();
  let shortDate = `${day}/${month}/${year}`;

  return shortDate;
}

export default displayDate;
