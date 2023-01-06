function compressString(str) {
  const dictionary = {};

  const arr = str.split(' ');
  let compressedStr = '';

  for (let i = 0; i < arr.length; i++) {
    const currentKey = dictionary[arr[i]];
    if (!currentKey && currentKey !== 0) {
      dictionary[arr[i]] = i;
    }
    compressedStr += dictionary[arr[i]];
  }

  return [compressedStr, dictionary];
}

const [compressedStr, dictionary] = compressString('sun sun moon one moon');

function decompressString(str, dictionary) {
  const transformedDictionary = {};
  let result = '';

  Object.keys(dictionary).forEach(key => {
    transformedDictionary[dictionary[key]] = key;
  });

  const arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    if (i !== 0) {
      result += ' ' + transformedDictionary[arr[i]];
    } else {
      result += transformedDictionary[arr[i]];
    }
  }

  return result;
}

console.log(compressedStr, dictionary);
console.log(decompressString(compressedStr, dictionary));
