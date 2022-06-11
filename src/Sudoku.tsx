class Sudoku {
  el: HTMLElement;
  grid: Cell[][] = [];

  constructor() {
    this.el = <div class="grid" />;

    for (let y = 0; y < 9; y++) {
      const row = <div class="row" />;
      this.el.append(row);
      this.grid[y] = Array(9).fill(0).map((_, x) => new Cell({ x, y }));
      row.append(...this.grid[y].map(({ el }) => el));
    }

  }

  get cells() {
    return this.grid.flat()
  }

  clear() {
    for (const cell of this.cells)
      cell.value = undefined;
  }

  fill() {
    let tryCount = 0;
    loop: while (true) {
      this.clear();
      if (++tryCount >= 1000)
        throw `fill failed after ${tryCount} tries`;
      for (const cell of this.cells) {
        let values = cell.legalValues;
        if (values.length == 0)
          continue loop;
        cell.value = values[Math.floor(Math.random() * cell.legalValues.length)]
      }
      break loop;
    }
    return tryCount;
  }

}
