function findIndexesOfLetterAndSymbols(text) {
  const result = text.split('').reduce(
    (indexes, item, index) => {
      const itemCode = item.charCodeAt();
      if ((itemCode >= 65 && itemCode <= 90) || (itemCode >= 97 && itemCode <= 122)) {
        indexes.letters.push(index);
      } else indexes.symbols.push(index);

      return indexes;
    },
    {
      letters: [],
      symbols: [],
    }
  );
  return result;
}

function revertString(text) {
  try {
    if (!text) {
      return '';
    }
    const str = String(text);
    const indexes = findIndexesOfLetterAndSymbols(str);

    const result = str.split('').reduce((reversedArr, item) => {
      const itemCode = item.charCodeAt();
      if ((itemCode >= 65 && itemCode <= 90) || (itemCode >= 97 && itemCode <= 122)) {
        reversedArr[indexes.letters.pop()] = item;
      } else {
        reversedArr[indexes.symbols.shift()] = item;
      }
      return reversedArr;
    }, []);

    return result.join('');
  } catch (error) {
    console.log(error);
  }
}

console.log(revertString('!strin3g #with! 1spec#ial !s5y$mbols and1! 3#numbers'));
