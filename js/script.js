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
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page
    - ** Bonus **: See the age numbers animate to their final number when the form is submitted
*/

const btnEl = document.getElementById("calculate");
const ageCalc = (event) => {
	event.preventDefault();
	//? Input elements
	const birthDay = document.getElementById("day");
	const birthMonth = document.getElementById("month");
	const birthYear = document.getElementById("year");
	//? Output elements
	const ageDays = document.getElementById("days");
	const ageMonths = document.getElementById("months");
	const ageYears = document.getElementById("years");
	//? Current DD-MM-YYYY
	const currentDate = new Date();
	const currentDay = currentDate.getDate();
	const currentMonth = currentDate.getMonth();
	const currentYear = currentDate.getFullYear();
	//? Difference
	let dayDiff = currentDay - birthDay.value;
	let monthDiff = currentMonth - birthMonth.value;
	let yearDiff = currentYear - birthYear.value;
	//? input styles
	const inputs = document.querySelectorAll(".form--wrapper input");
	const inputStrings = document.querySelectorAll(".form--wrapper label");
	for (const input of inputs) {
		input.style.borderColor = "red";
		input.style.borderColor = "var(--clr-neutral-200)";
	}
	for (const input of inputStrings) {
		input.style.color = "red";
		input.style.color = "var(--clr-neutral-300)";
	}

	//? Check for invalid date
	const isValidDate = (day, month, year) => {
		const date = new Date(year, month - 1, day);
		return (
			date.getFullYear() === year &&
			date.getMonth() === month - 1 &&
			date.getDate() === day
		);
	};

	//? Function: Warning Messages
	const showCorrectWarning = () => {
		const showWarnings = document.querySelectorAll(".warning");

		for (const [i, warning] of showWarnings.entries()) {
			let warningStr = warning.querySelector("p");

			if (
				birthDay.value === "" ||
				birthMonth.value === "" ||
				birthYear.value === ""
			) {
				if (!warningStr) {
					warningStr = document.createElement("p");
					warningStr.innerText = "This field is required";
					warning.appendChild(warningStr);
				}
			} else {
				if (warningStr) {
					warning.removeChild(warningStr);
				}

				const day = parseInt(birthDay.value);
				const month = parseInt(birthMonth.value);
				const year = parseInt(birthYear.value);
				const currentDate = new Date();
				const currentYear = currentDate.getFullYear();

				if (year > currentYear) {
					warningStr = document.createElement("p");
					warningStr.innerText = "Must be in the past";
					warning.appendChild(warningStr);
				} else if (day < 1 || day > 31) {
					warningStr = document.createElement("p");
					warningStr.innerText = "Must be a valid day";
					warning.appendChild(warningStr);
				} else if (month < 1 || month > 12) {
					warningStr = document.createElement("p");
					warningStr.innerText = "Must be a valid month";
					warning.appendChild(warningStr);
				} else if (!isValidDate(day, month, year)) {
					warningStr = document.createElement("p");
					warningStr.innerText = "Invalid date";
					warning.appendChild(warningStr);
				}
			}
		}
	};

	showCorrectWarning();

	if (monthDiff < 0 || dayDiff < 0) {
		monthDiff += 1;
	}

	for (const input of inputs) input.style.borderColor = "red";
	for (const input of inputStrings) input.style.color = "red";
	for (const input of inputs)
		input.style.borderColor = "var(--clr-neutral-200)";
	for (const input of inputStrings)
		input.style.color = "var(--clr-neutral-300)";

	ageDays.innerHTML = dayDiff;
	ageMonths.innerHTML = monthDiff;
	ageYears.innerHTML = yearDiff;
};
btnEl.addEventListener(`click`, ageCalc);
