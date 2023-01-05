function createRows(length) {
  const rows = {
    even: '',
    odd: '',
  };

  for (let i = 0; i < length; i++) {
    if (i % 2 === 0) {
      rows.even += '_';
      rows.odd += '#';
    } else {
      rows.even += '#';
      rows.odd += '_';
    }
  }

  return rows;
}

function createBoard(rowQuantity, rows) {
  const board = [];

  for (let i = 0; i < rowQuantity; i++) {
    if (i % 2 === 0) {
      board.push(rows.even);
    } else {
      board.push(rows.odd);
    }
  }
  return board.join('\n');
}

function render(board) {
  console.log(board);
}

function renderChessBoard(rowLength, numberOfRows) {
  try {
    const rowLengthNumber = Number(rowLength);
    const numberOfRowsNumber = Number(numberOfRows);
    if (rowLengthNumber < 1 || numberOfRowsNumber < 1) {
      return '';
    }

    const rows = createRows(rowLength);
    const board = createBoard(numberOfRowsNumber, rows);
    render(board);
  } catch (error) {
    console.log(error);
  }
}

renderChessBoard('7', 7);
