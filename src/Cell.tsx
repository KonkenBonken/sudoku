class Cell {
  el: HTMLElement = <div class="cell" />;
  _value?: number;
  coords: { x: number, y: number };

  constructor(coords: { x: number, y: number }, value?: number) {
    this.value = value;
    this.coords = coords;
  }

  set value(n: number | undefined) {
    this._value = n;
    if (n !== undefined)
      this.el.innerHTML = n.toString();
  }
  get value(): number | undefined {
    return this._value;
  }

  get row() {
    return sudoku.cells[this.coords.y]
      .filter(cell => cell !== this);
  }
  get col() {
    return sudoku.cells.map(row => row[this.coords.x])
      .filter(cell => cell !== this);
  }
}
