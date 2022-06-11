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
    this.el.innerHTML = (n ?? '&nbsp;').toString();
  }
  get value(): number | undefined {
    return this._value;
  }

  get row() {
    return sudoku.grid[this.coords.y]
      .filter(cell => cell !== this);
  }
  get col() {
    return sudoku.grid.map(row => row[this.coords.x])
      .filter(cell => cell !== this);
  }

  get legalValues() {
    return [...Array(10).keys()].filter(n => !(
      this.row.some(cell => n === cell.value) ||
      this.col.some(cell => n === cell.value)
    ))
  }
}
