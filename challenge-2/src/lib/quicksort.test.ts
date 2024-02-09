/* eslint-disable functional/no-return-void */
import { quicksort } from './quicksort';

describe('Quicksort', () => {
  it('should sort an array of numbers', () => {
    const input = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
    const expectedOutput = [1, 1, 2, 3, 3, 4, 5, 5, 5, 6, 9];
    expect(quicksort(input)).toEqual(expectedOutput);
  });

  it('should handle an empty array', () => {
    const input: number[] = [];
    expect(quicksort(input)).toEqual([]);
  });

  it('should handle an array with one element', () => {
    const input = [42];
    expect(quicksort(input)).toEqual([42]);
  });

  it('should handle an array with duplicate elements', () => {
    const input = [5, 2, 1, 5, 3, 2];
    const expectedOutput = [1, 2, 2, 3, 5, 5];
    expect(quicksort(input)).toEqual(expectedOutput);
  });
});
