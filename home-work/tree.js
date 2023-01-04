function renderTreeLeft(rows) {
  const result = [];
  let str = '';
  for (let i = 0; i < rows; i++) {
    for (let index = 0; index <= i; index++) {
      str += '*';
    }

    result.push(str);
    str = '';
  }

  return result.join('\n');
}

function renderTreeRight(rows) {
  const result = [];
  let str = '';
  for (let i = 0; i < rows; i++) {
    for (let index = 0; index < rows; index++) {
      if (index < rows - 1 - i) {
        str += ' ';
      } else {
        str += '*';
      }
    }

    result.push(str);
    str = '';
  }

  return result.join('\n');
}

function renderTreeCenter(rows) {
  const result = [];
  for (let i = 0; i < rows; i++) {
    let str = [];
    for (let index = 0; index < rows - 1; index++) {
      const char = index >= rows - i - 1 ? '*' : ' ';
      str.push(char);
    }

    const row = str.join('') + '*' + str.reverse().join('');
    result.push(row);
  }

  return result.join('\n');
}

console.log(renderTreeLeft(5));
console.log(renderTreeRight(5));
console.log(renderTreeCenter(5));
