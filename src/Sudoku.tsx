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

  row(y) {
    return this.grid[y];
  }
  col(x) {
    return this.grid.map(row => row[x]);
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
      for (const row of this.grid) {
        let arr = [...Array(9).keys()].sort(() => Math.random() - .5);
        for (const i in row) {
          row[i].value = arr[i];
          yield row[i];
        }
      }
      break loop;
    }
    return tryCount;
  }

  *create(difficulty = 10) {
    rerun.disabled = true;
    skip.disabled = false;
    try {
      yield* this.fill();
      for (const cell of this.cells) {
        if (Math.random() > 1 / difficulty)
          cell.value = undefined;
        yield cell;
      }
    } catch (e) { console.error(e) }

    rerun.disabled = false;
    skip.disabled = true;
  }
}
