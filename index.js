const day = document.querySelector("#input0");
const month = document.querySelector("#input1");
const year = document.querySelector("#input2");
// console.log(year);

const dayResult = document.querySelector("#days");
const monthResult = document.querySelector("#months");
const yearResult = document.querySelector("#years");

const getResult = document.querySelector("#result");

const today = new Date();

function displayError(i) {
  let label = document.querySelector("#label" + i);
  let input = document.querySelector("#input" + i);
  let el = document.querySelector("#inputError" + i);
  label.style.color = "#ff5959";
  input.style.outline = "1px solid #ff5959";
  el.innerHTML = "This field is required";
  el.style.display = "block";
}

function resetErrorStyle(i) {
  let label = document.querySelector("#label" + i);
  let input = document.querySelector("#input" + i);
  let el = document.querySelector("#inputError" + i);
  label.removeAttribute("style");
  input.removeAttribute("style");
  el.style.display = "none";
}

function resetResultDisplay() {
  dayResult.innerHTML = "--";
  monthResult.innerHTML = "--";
  yearResult.innerHTML = "--";
}

function checkIfValidData(data, i) {
  let label = document.querySelector("#label" + i);
  let input = document.querySelector("#input" + i);
  let element = document.querySelector("#inputError" + i);
  label.style.color = "#ff5959";
  input.style.outline = "1px solid #ff5959";
  element.innerHTML = data;
  element.style.display = "block";
}
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

window.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    getResult.click();
  }
});

getResult.addEventListener("click", () => {
  const valueArray = [day.value, month.value, year.value];
  // console.log(valueArray);

  if (day.value === "" || month.value === "" || year.value === "") {
    for (let i = 0; i < valueArray.length; i++) {
      if (valueArray[i] === "") {
        displayError(i);
      } else {
        resetErrorStyle(i);
      }
    }
    resetResultDisplay();
    return false;
  }

  const result = new Date(year.value, month.value - 1, day.value);
  // console.log(result);
  // console.log(today);

  const dateDifference = calculateDateDifference(result, today);
  
  // console.log(dateDifference);

  if (dateDifference.days <= 0) {
    for (let i = 0; i < valueArray.length; i++) {
      let label = document.querySelector("#label" + i);
      let input = document.querySelector("#input" + i);
      label.style.color = "#ff5959";
      input.style.outline = "1px solid #ff5959";
    }
    let el = document.querySelector("#inputError0");
    el.innerHTML = "Must be a valid date";
    el.style.display = "block";
    resetResultDisplay();
    return false;
  }
  // console.log(year.value);
  const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  // console.log(isLeapYear);

  const thirtyDayMonths = ["4", "06", "9", "11"];
  const thirtyOneDayMonths = ["01", "03", "05", "07", "08", "10", "12"];

  if (month.value === "2") {
    if ((isLeapYear && day.value < 1) || day.value > 29) {
      checkIfValidData("Must be a valid day", 0);
      resetResultDisplay();
      return false;
    }
  } else if (thirtyDayMonths.includes(month.value)) {
    if (day.value < 1 || day.value > 30) {
      checkIfValidData("Must be a valid day", 0);
      resetResultDisplay();
      return false;
    }
  } else if (thirtyOneDayMonths.includes(month.value)) {
    if (day.value < 1 || day.value > 31) {
      checkIfValidData("Must be a valid day", 0);
      resetResultDisplay();
      return false;
    }
  }

  resetErrorStyle(0);

  // const daysDiff = Math.floor(dateDiff / (1000 * 60 * 60 * 24));
  dayResult.innerHTML = dateDifference.days;
  
  

  if (month.value < 1 || month.value > 12) {
    checkIfValidData("Must be a valid month", 1);
    resetResultDisplay();
    return false;
  } else {
    resetErrorStyle( 1 );
    // console.log(today.getFullYear());
    
     
    monthResult.innerHTML = dateDifference.months;
    
  }

  if (year.value < 1000 || year.value >= today.getFullYear()) {
    checkIfValidData("Must be a valid year", 2);
    resetResultDisplay();
    return false;
  } else {
    resetErrorStyle(2);
    
    yearResult.innerHTML = dateDifference.years;
    // console.log( "here" );
   
  }
});
