const numArray = [];

function findMissingNumber(numbers) {
  for (let i = 1; i < numbers.length; i++) {
    if (numbers[i] - numbers[i - 1] > 1) {
      return numbers[i - 1];
    }
  }
  return numbers[numbers.length - 1];
}

const lastNumber = findMissingNumber(numSeries);
console.log("Siste nummer før et hopp: " + lastNumber);
