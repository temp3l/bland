import * as readlineSync from 'readline-sync';

/**
 * Collects user input for the number of elements and their values.
 * @returns {number[]} - The array of user-input elements.
 */
function getUserInput(): readonly number[] {
  const numberOfElements = parseInt(
    readlineSync.question('Enter the number of elements (max 10): '),
    10,
  );

  if (
    isNaN(numberOfElements) ||
    numberOfElements < 1 ||
    numberOfElements > 10
  ) {
    console.error('Invalid input for the number of elements.');
    process.exit(1);
  }

  const elements = Array.from({ length: numberOfElements }).reduce(
    (acc: readonly number[], _, index) => {
      const element = parseFloat(
        readlineSync.question(`Enter element #${index + 1}: `),
      );

      if (isNaN(element)) {
        console.error('Invalid input for element. Please enter a number.');
        process.exit(1);
      }

      return [...acc, element];
    },
    [],
  ) as readonly number[];

  return elements;
}

export { getUserInput };
