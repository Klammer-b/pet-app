const checkIfPalindrome = require('./checkIfPalindrome');

describe('checkIfPalindrome', () => {
  it('returns true if string is a palindrome', () => {
    const string = 'wow';
    expect(checkIfPalindrome(string)).toBe(true);
  });

  it('returns false if string is not a palindrome', () => {
    const string = 'wol';
    expect(checkIfPalindrome(string)).toBe(false);
  });

  it('returns true if string is empty', () => {
    const string = '';
    expect(checkIfPalindrome(string)).toBe(true);
  });

  it('throws an error if value is not a string', () => {
    expect(() => checkIfPalindrome(5)).toThrowError(
      new Error('Value should be a string'),
    );
  });

  it('throws an error if value is not a string', () => {
    expect(() => checkIfPalindrome()).toThrowError(
      new Error('Should be called with argument'),
    );
  });
});
