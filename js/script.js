"use strict";

/*
## The challenge - users should be able to: 
- View an age in years, months, and days after submitting a valid date through the form
- Receive validation errors if:
  - Any field is empty when the form is submitted
  - The day number is not between 1-31
  - The month number is not between 1-12
  - The year is in the future
  - The date is invalid e.g. 31/04/1991 (there are 30 days in April)
  - ** Bonus **: See the age numbers animate to their final number when the form is submitted
*/
const btnEl = document.getElementById("calculate");

//? Input elements
const birthDay = document.getElementById("day");
const birthMonth = document.getElementById("month");
const birthYear = document.getElementById("year");

birthYear.max = new Date().getFullYear();

//? Function: Show Error Message
const checkError = () => {
	//? Input & label elements to be styled
	const inputs = document.querySelectorAll(".form--wrapper input");
	const inputStrings = document.querySelectorAll(".form--wrapper label");
	const inputOutlineOnFocus = document.querySelectorAll(
		".form--wrapper input:is(:focus, :focus-visible, :-moz-focusring)"
	);
	//? Error elements
	const dayError = document.getElementById("error-day");
	const monthError = document.getElementById("error-month");
	const yearError = document.getElementById("error-year");

	//? Function: Change label color & input border color to red
	const errorStyle = (showError) => {
		for (const focus of inputOutlineOnFocus) {
			focus.style.outlineColor = showError
				? "red"
				: "var(--clr-accent-primary)";
		}
		for (const input of inputs) {
			input.style.borderColor = showError ? "red" : "var(--clr-neutral-200)";
		}
		for (const input of inputStrings) {
			input.style.color = showError ? "red" : "var(--clr-neutral-300)";
		}
	};

	const showError = (errorElement, errorMessage) => {
		errorElement.innerHTML = errorMessage;
		errorStyle(true);
		return false;
	};

	const clearError = (errorElement) => {
		errorElement.innerHTML = "";
		return true;
	};

	if (!birthDay.value || !birthMonth.value || !birthYear.value) {
		return (
			showError(dayError, "This field is required") &&
			showError(monthError, "This field is required") &&
			showError(yearError, "This field is required")
		);
	}

	if (!birthDay.checkValidity()) {
		clearError(monthError);
		clearError(yearError);
		return showError(dayError, "Must be a valid day");
	}

	if (!birthMonth.checkValidity()) {
		clearError(dayError);
		clearError(yearError);
		return showError(monthError, "Must be a valid month");
	}

	if (!birthYear.checkValidity()) {
		clearError(dayError);
		clearError(monthError);
		return showError(yearError, "Must be in the past");
	}

	if (
		!birthDay.checkValidity() ||
		!birthMonth.checkValidity() ||
		!birthYear.checkValidity()
	) {
		return (
			showError(dayError, "Must be a valid day") &&
			showError(monthError, "Must be a valid month") &&
			showError(yearError, "Must be in the past")
		);
	}

	if (
		!birthDay.checkValidity() &&
		!birthMonth.checkValidity() &&
		!birthYear.checkValidity()
	) {
		return (
			showError(dayError, "Must be a valid date") &&
			showError(monthError, "Must be a valid date") &&
			showError(yearError, "Must be in the date")
		);
	}

	errorStyle(false);
	clearError(dayError);
	clearError(monthError);
	clearError(yearError);

	return true;
};

const ageCalc = (event) => {
	event.preventDefault();
	//? Output elements
	const ageDays = document.getElementById("days");
	const ageMonths = document.getElementById("months");
	const ageYears = document.getElementById("years");
	//? Current DD-MM-YYYY
	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth() + 1;
	const currentYear = currentDate.getFullYear();

	//TODO Fix calculation
	//? Difference
	let dayDiff = currentDay - birthDay.value;
	let monthDiff = currentMonth - birthMonth.value;
	let yearDiff = currentYear - birthYear.value;

	//! Nov, 22, 1999 = [23yrs, 6mons, 15days]
	//! Nov, 02, 1998 = [24yrs, 7mons, 4days]
	//! 06, 07, 2023 = [0yrs, -1mons , 0days]
	console.log(dayDiff, monthDiff, yearDiff);
	if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
		yearDiff--;
		monthDiff += 12;
	}

	if (dayDiff < 0) {
		const prevMonthLastDay = new Date(currentYear, currentMonth - 1, 0);
		dayDiff += prevMonthLastDay.getDate();
		monthDiff--;
	}

	ageDays.innerHTML = dayDiff;
	ageMonths.innerHTML = monthDiff;
	ageYears.innerHTML = yearDiff;

	//? Check for invalid date
	const isValid = checkError();
	if (isValid) {
		const isValidDate = (day, month, year) => {
			const date = new Date(year, month - 1, day);
			return (
				date.getFullYear() === year &&
				date.getMonth() === month - 1 &&
				date.getDate() === day
			);
		};
	}
};

btnEl.addEventListener(`click`, ageCalc);
