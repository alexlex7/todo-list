// _#_#_#_#
// #_#_#_#_
// _#_#_#_#
// #_#_#_#_
// _#_#_#_#
// #_#_#_#_
// _#_#_#_#
// #_#_#_#_

function chess(symbols, rows) {
  const result = [];
  let row = '';

  for (let index = 0; index <= rows; index++) {
    if (row.length === symbols) {
      result.push(row);
      row = '';
    }

    for (let i = 0; i < symbols; i++) {
      const isEvenRow = index % 2 === 0;
      const firstSymbol = isEvenRow ? '_' : '#';
      const secondSymbol = isEvenRow ? '#' : '_';

      if (i % 2 === 0) {
        row += firstSymbol;
      } else {
        row += secondSymbol;
      }
    }
  }

  return result.join('\n');
}

console.log(chess(8, 8));
