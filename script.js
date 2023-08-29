const inputField = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");
const output = document.querySelector(".output");
const resultBox = document.querySelector(".result-box");

let numArray = [];

const checkNumbers = () => {
  const numberSeries = inputField.value.replace(/\s+/g, ","); // Erstatter alle mellomrom med komma
  const numbers = numberSeries.split(",").map(Number);

  let lastNumber = null;
  let missingNumber = null;

  for (const num of numbers) {
    if (!isNaN(num)) {
      if (lastNumber !== null && num > lastNumber + 1) {
        missingNumber = lastNumber + 1;
        break;
      }
      lastNumber = num;
    }
  }

  if (missingNumber !== null) {
    output.innerHTML = "Missing number: " + missingNumber;
    output.style.color = "red";
    output.style.fontWeight = "bold";
  } else {
    output.innerHTML = "Ingen hull i nummerserien";
    output.style.color = "green";
    output.style.fontWeight = "normal";
  }
};

submitButton.addEventListener("click", checkNumbers);
