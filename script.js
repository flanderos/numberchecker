const inputField = document.querySelector("#text-input");
const submitButton = document.querySelector("#submit-button");
const output = document.querySelector(".output");

let numArray = [];

const checkNumbers = () => {
  const numberSeries = inputField.value.replace(/\s+/g, ","); // Erstatter alle mellomrom med komma
  const numbers = numberSeries.split(",").map(Number);

  let lastNumber = null;
  let hasHole = false;

  for (const num of numbers) {
    if (!isNaN(num)) {
      if (lastNumber !== null && num > lastNumber + 1) {
        hasHole = true;
        break;
      }
      lastNumber = num;
    }
  }

  if (hasHole) {
    output.innerHTML = "Siste nummer før hullet: " + lastNumber;
    output.style.color = "red";
  } else {
    output.innerHTML = "Ingen hull i nummerserien";
    output.style.color = "green";
  }
};

submitButton.addEventListener("click", checkNumbers);
