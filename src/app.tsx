const body = document.body;
const sudoku = new Sudoku();
body.append(sudoku.el);
Animate(sudoku.create())
