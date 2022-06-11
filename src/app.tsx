const body = document.body,
  sudoku = new Sudoku(),
  rerun: HTMLButtonElement = <button>Generate</button>,
  skip: HTMLButtonElement = <button disabled>Skip animation</button>;
body.append(sudoku.el, <div class="ui">{rerun}{skip}</div>);

rerun.addEventListener('click', () => Animate(sudoku.create()));

Animate(sudoku.create())
