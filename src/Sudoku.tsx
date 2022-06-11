class Sudoku {
  el: HTMLElement;
  cells: Cell[][];

  constructor() {
    this.el = <div class="grid" />;
    this.cells = [];

    for (let y = 0; y < 9; y++) {
      const row = <div class="row" />;
      this.el.append(row);
      this.cells[y] = Array(9).fill(0).map((_, x) => new Cell({ x, y }));
      row.append(...this.cells[y].map(({ el }) => el));
    }

  }

  clear() {
    for (const cell of this.cells.flat())
      cell.value = undefined;
  }

  fill() {
    let clearCount = -1;
    loop: while (true) {
      this.clear();
      clearCount++;
      for (const cell of this.cells.flat()) {
        let values = cell.legalValues;
        if (values.length == 0)
          continue loop;
        cell.value = values[Math.floor(Math.random() * cell.legalValues.length)]
      }
      break loop;
    }
    return clearCount;
  }

}
