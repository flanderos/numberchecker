const inputField = document.querySelector("#text-input");
const checkButton = document.querySelector("#submit-button");
const formatButton = document.querySelector("#format-button");
const clearButton = document.querySelector("#clear-button");
const output = document.querySelector(".output");

let missingNumbers = [];

checkButton.addEventListener("click", checkNumbers);
formatButton.addEventListener("click", formatAsTable);
clearButton.addEventListener("click", clearOutput);

function checkNumbers() {
  missingNumbers = [];
  const numberSeries = inputField.value.replace(/\s+/g, ",");
  const numbers = numberSeries.split(",").map(Number);

  for (let i = 0; i < numbers.length - 1; i++) {
    const diff = numbers[i + 1] - numbers[i];
    if (diff > 1) {
      for (let j = 1; j < diff; j++) {
        missingNumbers.push(numbers[i] + j);
      }
    }
  }

  if (missingNumbers.length > 0) {
    output.innerHTML = `Missing numbers: ${missingNumbers.join(", ")}`;
  } else {
    output.innerHTML = "No missing numbers";
  }
}

function formatAsTable() {
  const table = document.createElement("table");
  table.classList.add("table");

  for (const num of missingNumbers) {
    const row = table.insertRow();
    const cell = row.insertCell();
    cell.textContent = num;
  }

  output.innerHTML = "";
  output.appendChild(table);
}

const copyButton = document.querySelector("#copy-button");

copyButton.addEventListener("click", () => {
  const copyText = missingNumbers.join("\n"); // add \n to paste in excel
  const textArea = document.createElement("textarea");
  textArea.value = copyText;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);

  alert("Tallene er kopiert til utklippstavlen for bruk i Excel!");
});

function clearOutput() {
  missingNumbers = [];
  output.innerHTML = "";
  inputField.value = "";
  textArea.value = "";
}

function checkZettleSeries() {
  missingNumbers = [];
  const zettleSeries = inputField.value.replace(/\s+/g, ",");
  const zettleNumbers = zettleSeries.split(",").map(Number);

  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];
  const monthWith28Days = [2];

  let prevMonth = -1; // For å håndtere overgangen mellom måneder

  for (let i = 0; i < zettleNumbers.length - 1; i++) {
    const diff = zettleNumbers[i + 1] - zettleNumbers[i];
    const lastTwoDigits = zettleNumbers[i] % 100; // Få de siste to sifrene
    const day = lastTwoDigits % 100; // Få dagen
    const month = Math.floor(lastTwoDigits / 100) % 100; // Få måneden

    if (prevMonth !== month) {
      // Håndter overgangen til ny måned
      prevMonth = month;
    }

    if (
      diff > 1 ||
      (lastTwoDigits >= 31 && lastTwoDigits <= 99) ||
      (lastTwoDigits === 0 && zettleNumbers[i] !== 0) || // Sjekk om tallet er 0, men ikke hvis det er 0 selv
      (lastTwoDigits === 99 && zettleNumbers[i] % 100 !== 0) || // Sjekk om tallet slutter på 00, men ikke hvis det er 0 selv
      (monthsWith31Days.includes(month) && day === 31) || // Sjekk for måneder med 31 dager og dag 31
      (monthsWith30Days.includes(month) && day === 30) ||
      (monthWith28Days.includes(month) && day === 28) // Sjekk for måneder med 30 dager og dag 30
    ) {
      for (let j = 1; j < diff; j++) {
        const nextNumber = zettleNumbers[i] + j;
        const nextTwoDigits = nextNumber % 100;
        const nextTenDigits = nextNumber % 10; // Få det siste sifferet

        if (
          (nextTwoDigits < 31 || nextTwoDigits > 99) &&
          nextTwoDigits !== 29 &&
          nextTwoDigits !== 30 &&
          nextTwoDigits !== 31
        ) {
          missingNumbers.push(nextNumber);
        }
      }
    }
  }

  if (missingNumbers.length > 0) {
    output.innerHTML = `Missing numbers in Zettle series: ${missingNumbers.join(
      ", "
    )}`;
  } else {
    output.innerHTML = "No missing numbers in Zettle series";
  }
}

const zettleButton = document.querySelector("#zettle");
zettleButton.addEventListener("click", checkZettleSeries);
