const inputField = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");
const output = document.querySelector(".output");
const resultBox = document.querySelector(".result-box");
const clearButton = document.querySelector(".clearbutton");

let numArray = [];

const checkNumbers = () => {
  const numberSeries = inputField.value.replace(/\s+/g, ","); // Erstatter alle mellomrom med komma
  const numbers = numberSeries.split(",").map(Number);

  let lastNumber = null;
  let missingNumbers = [];

  for (const num of numbers) {
    if (!isNaN(num)) {
      if (lastNumber !== null && num > lastNumber + 1) {
        const missingRange = Array.from(
          { length: num - lastNumber - 1 },
          (_, i) => lastNumber + 1 + i
        );
        missingNumbers = missingNumbers.concat(missingRange);
      }
      lastNumber = num;
    }
  }

  if (missingNumbers.length > 0) {
    const missingNumbersText = missingNumbers.join(", ");
    output.innerHTML = "Missing numbers: " + missingNumbersText;
    output.style.color = "red";
    output.style.fontWeight = "bold";
    clearButton.style.display = "block";
  } else {
    output.innerHTML = "No missing numbers in the number series";
    output.style.color = "green";
    output.style.fontWeight = "normal";
  }
};

const clearNumbers = () => {
  output.innerHTML = "";
  inputField.value = "";
};

submitButton.addEventListener("click", checkNumbers);
clearButton.addEventListener("click", clearNumbers);
