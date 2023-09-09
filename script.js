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

  for (let i = 0; i < zettleNumbers.length - 1; i++) {
    const diff = zettleNumbers[i + 1] - zettleNumbers[i];
    const lastTwoDigits = zettleNumbers[i] % 100; // Get last two digits

    if (
      diff > 1 ||
      (lastTwoDigits >= 31 && lastTwoDigits <= 99) ||
      lastTwoDigits === 0
    ) {
      for (let j = 1; j < diff; j++) {
        const nextNumber = zettleNumbers[i] + j;
        const nextTwoDigits = nextNumber % 100;
        const nextTenDigits = nextNumber % 10; // get last digit

        if ((nextTwoDigits < 31 || nextTwoDigits > 99) && nextTenDigits !== 0) {
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
