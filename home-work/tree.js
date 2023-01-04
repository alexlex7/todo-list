function tree(rows) {
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

function treeRight(rows) {
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

function treeCenter(rows) {
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

console.log(tree(5));
console.log(treeRight(5));
console.log(treeCenter(5));
