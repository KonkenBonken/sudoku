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

  *clear() {
    for (const cell of this.cells.filter(cell => cell.value !== undefined)) {
      cell.value = undefined;
      yield cell;
    }
  }

  *fill() {
    let tryCount = 0;
    loop: while (true) {
      yield* this.clear();
      if (++tryCount >= 1000)
        throw `fill failed after ${tryCount} tries`;
      for (const cell of this.cells) {
        let values = cell.legalValues;
        if (values.length == 0)
          continue loop;
        cell.value = values[Math.floor(Math.random() * cell.legalValues.length)]
        yield cell;
      }
      break loop;
    }
    return tryCount;
  }

  *create(difficulty = 10) {
    rerun.disabled = true;
    skip.disabled = false;
    yield* this.fill();
    for (const cell of this.cells) {
      if (Math.random() > 1 / difficulty)
        cell.value = undefined;
      yield cell;
    }
    rerun.disabled = false;
    skip.disabled = true;
  }
}
