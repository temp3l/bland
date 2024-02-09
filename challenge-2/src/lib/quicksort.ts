// quicksort.ts

/**
 * Sorts an array of numbers using the quicksort recursive algorithm.
 *
 * @param {number[]} arr - The array to be sorted.
 * @returns {number[]} - The sorted array.
 */
function quicksort(arr: readonly number[]): readonly number[] {
  // Base case: If the array has one element or is empty, it is already sorted
  if (arr.length <= 1) {
    return arr;
  }

  // Destructure the array to get the pivot and the rest of the elements
  const [pivot, ...rest] = arr;

  // Use reduce to partition the array into left and right arrays based on the pivot
  const left = rest.reduce(
    (acc, curr) => (curr < pivot ? [...acc, curr] : acc),
    [],
  );
  const right = rest.reduce(
    (acc, curr) => (curr >= pivot ? [...acc, curr] : acc),
    [],
  );

  // Recursively apply quicksort to left and right arrays, then concatenate the results
  return [...quicksort(left), pivot, ...quicksort(right)];
}

export { quicksort };
