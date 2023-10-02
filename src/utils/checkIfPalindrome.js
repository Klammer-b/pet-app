const checkIfPalindrome = (string) => {
  if (string === undefined) {
    throw new Error('Should be called with argument');
  }

  if (typeof string !== 'string') {
    throw new Error('Value should be a string');
  }

  const revertedString = string.split('').reverse().join('');

  return revertedString === string;
};

module.exports = checkIfPalindrome;
