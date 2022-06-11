const body = document.body,
  sudoku = new Sudoku(),
  rerun: HTMLButtonElement = <button>Run again</button>,
  skip: HTMLButtonElement = <button disabled>Skip animation</button>;
body.append(sudoku.el, rerun, skip);

rerun.addEventListener('click', () => Animate(sudoku.create()));

Animate(sudoku.create())
