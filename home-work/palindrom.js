function checkForPalindrome(word) {
  const wordString = String(word).toLowerCase();
  if (!wordString || wordString?.length === 0) {
    return false;
  }
  if (wordString.split('').reverse().join('') === wordString) {
    return true;
  } else {
    return false;
  }
}

console.log(checkForPalindrome(123321));
console.log(checkForPalindrome('2Wow2'));
console.log(checkForPalindrome('wow'));
console.log(checkForPalindrome(1233213));
console.log(checkForPalindrome('2Wow21'));
console.log(checkForPalindrome('wow1'));
