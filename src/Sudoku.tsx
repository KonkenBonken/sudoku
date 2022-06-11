class Sudoku {
  el: HTMLElement;
  cells: Cell[][];

  constructor() {
    this.el = <div class="grid" />;
    this.cells = [];

    for (let y = 0; y < 9; y++) {
      const row = <div class="row" />;
      this.el.append(row);
      this.cells[y] = Array(9).fill(0).map((_, x) => new Cell({ x, y }, Math.floor(Math.random() * 10)));
      row.append(...this.cells[y].map(({ el }) => el));
    }

  }
}
