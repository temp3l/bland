/* eslint functional/no-return-void: "off" */

import { isPalindrome } from './palindrome';

describe('isPalindrome', () => {
  describe('List of Palindromes', () => {
    const palindromes = [
      'Deleveled✅',
      'radar',
      'civic',
      'kayak          😊',
      'level',
      'racecar',
      'rotor',
      'refer',
      'deed',
      'noon',
      'civic',
      '1221',
    ];

    palindromes.forEach((phrase, index) => {
      it(`should identify "${phrase}" as a palindrome (Test Case ${index + 1})`, () => {
        expect(isPalindrome(phrase)).toBe(true);
      });
    });
  });

  describe('List of Palindromes with Special Characters, Punctuation, and Asymmetrical Whitespaces', () => {
    const palindromes = [
      'Deleveled🔥!',
      `Delevel
      ed`,
      'A man, a plan, a canal: Panama',
      'Was it a car or a cat I saw?',
      "Madam, in Eden, I'm Adam.",
      'No lemon, no melon',
      'Mr. Owl ate my metal worm!',
      'A Santa lived as a devil at NASA. ✨',
      'Step on no pets.',
      'A man, a plan, a cat, a ham, a yak, a yam, a hat, a canal-Panama!',
      'Are we not pure? “No sir!” Panama’s moody Noriega brags. “It is garbage!” Irony dooms a man; a prisoner up to new era.',
    ];

    palindromes.forEach((phrase, index) => {
      it(`should identify "${phrase}" as a palindrome (Test Case ${index + 1})`, () => {
        expect(isPalindrome(phrase)).toBe(true);
      });
    });
  });

  describe('Words and phrases that are NOT Palindromes', () => {
    const phrases = [
      '1337 💀',
      'banana',
      'lollipop',
      'Bland Group, 😊 no gnalB',
      'Bland Group, do gnalB',
      'Bland Group, pull up, nU Group, dnalB',
      'Bland Group, madam, do gnalB',
      'Bland Group, level, nU Group, dnalB 🎉',
    ];

    phrases.forEach((phrase, index) => {
      it(`should NOT identify "${phrase}" as a palindrome (Test Case ${index + 1})`, () => {
        expect(isPalindrome(phrase)).toBe(false);
      });
    });
  });
});
