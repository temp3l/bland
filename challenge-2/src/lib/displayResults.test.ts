/* eslint-disable functional/no-return-void */
import { displayResults } from './displayResults';

jest.mock('readline-sync');

// just a simple positive test here
describe('displayResults', () => {
  it('should display input and sorted elements to the console', () => {
    const consoleLogSpy = jest
      .spyOn(console, 'log')
      .mockImplementation(() => {});

    const input = [3, 1, 4];
    const sortedElements = [1, 3, 4];

    displayResults(input, sortedElements);

    expect(consoleLogSpy).toHaveBeenCalledWith('Input Elements:', input);
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Sorted Elements:',
      sortedElements,
    );
  });
});
