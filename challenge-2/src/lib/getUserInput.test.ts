/* eslint-disable functional/no-throw-statements */
/* eslint-disable functional/no-return-void */
import { mocked } from 'jest-mock';
import * as readlineSync from 'readline-sync';

import { getUserInput } from './getUserInput';

jest.mock('readline-sync');

const mockedReadlineSync = mocked(readlineSync);
const mockProcessExit = jest
  .spyOn(process, 'exit')
  .mockImplementation((code) => {
    // Forces the code to throw instead of exit
    throw new Error(`Process.exit(${code})`);
  });

describe('getUserInput', () => {
  beforeEach(() => {
    mockProcessExit.mockClear();
  });

  it('should return an array of user-input elements', () => {
    // first value is the number of elements
    mockedReadlineSync.question.mockReturnValueOnce('4');
    mockedReadlineSync.question.mockReturnValueOnce('5');
    mockedReadlineSync.question.mockReturnValueOnce('2');
    mockedReadlineSync.question.mockReturnValueOnce('3');
    mockedReadlineSync.question.mockReturnValueOnce('3');

    const result = getUserInput();

    expect(result).toEqual([5, 2, 3, 3]);
  });

  it('should exit the program - Invalid input for the number of elements.', () => {
    mockedReadlineSync.question.mockReturnValueOnce('NaN');

    expect(() => getUserInput()).toThrowErrorMatchingSnapshot();
  });

  it('should exit the program - Invalid input for the number of elements.', () => {
    mockedReadlineSync.question.mockReturnValueOnce('2');
    mockedReadlineSync.question.mockReturnValueOnce('100');

    expect(() => getUserInput()).toThrowErrorMatchingSnapshot();
  });
});
