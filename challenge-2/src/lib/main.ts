// main.ts

import { displayResults } from './displayResults';
import { getUserInput } from './getUserInput';
import { quicksort } from './quicksort';

/**
 * The main entry point for the application.
 */
// eslint-disable-next-line functional/no-return-void
function main(): void {
  const elements = getUserInput();
  const sortedElements = quicksort([...elements]);
  displayResults(elements, sortedElements);
}

//main();

export { main };
