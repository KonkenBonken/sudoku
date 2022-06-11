const body = document.body,
  sudoku = new Sudoku(),
  rerun: HTMLButtonElement = <button onclick={() => Animate(sudoku.create(0))}>Generate</button>,
  skip: HTMLButtonElement = <button disabled>Skip animation</button>;
body.append(sudoku.el, <div class="ui">{rerun}{skip}</div>);

Animate(sudoku.create(0))
