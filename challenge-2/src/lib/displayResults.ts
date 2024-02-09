/**
 * Displays the input and sorted elements to the console.
 * @param {number[]} input - The user-input elements.
 * @param {number[]} sortedElements - The sorted elements.
 */

function displayResults(
  input: readonly number[],
  sortedElements: readonly number[],
  // eslint-disable-next-line functional/no-return-void
): void {
  console.log('Input Elements:', input);
  console.log('Sorted Elements:', sortedElements);
}

export { displayResults };
