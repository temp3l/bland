/**
 * Checks if a given word or number is a palindrome.
 * Character case is ignored.
 * Special characters are ignored.
 * @param input - The word or number to check for palindrome.
 * @returns True if the input is a palindrome, otherwise false.
 */
export function isPalindrome(input: string): boolean {
  const cleanedInput = input.toLowerCase().replace(/[^a-z0-9]/g, '');
  const reversedInput = [...cleanedInput.split('')].reverse().join('');
  return cleanedInput === reversedInput;
}
