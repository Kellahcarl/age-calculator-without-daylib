function calculateDateDifference(userDate, currentDate) {
  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - userDate;

  // Calculate the number of days, months, and years
  const millisecondsInDay = 24 * 60 * 60 * 1000;
  const millisecondsInMonth = millisecondsInDay * 30.44; // Average number of days in a month

 let months = Math.floor(timeDifference / millisecondsInMonth);
  const days = Math.floor(
    (timeDifference % millisecondsInMonth) / millisecondsInDay
  );

  // Calculate the number of years from the number of months
  const years = Math.floor(months / 12);
  months -= years * 12;

  return { years, months, days };
}

// User date
const userDate = new Date("Thu May 05 1988 00:00:00 GMT+0300");

// Current date
const currentDate = new Date("Tue Oct 17 2023 14:51:29 GMT+0300");

const dateDifference = calculateDateDifference(userDate, currentDate);
console.log("Years:", dateDifference.years);
console.log("Months:", dateDifference.months);
console.log("Days:", dateDifference.days);
