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

  get squareIndex() {
    return Math.floor(this.coords.x / 3) + Math.floor(this.coords.y / 3) * 3;
  }

  get square() {
    return sudoku.cells
      .filter(cell =>
        cell.squareIndex === this.squareIndex &&
        cell !== this
      );
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
    return Array(9).fill(0).map((_, i) => i + 1).filter(n => !(
      this.row.some(cell => n === cell.value) ||
      this.col.some(cell => n === cell.value) ||
      this.square.some(cell => n === cell.value)
    ));
  }

  highlight(hl: Hl) {
    this.el.setAttribute('highlight', '');
    if (hl === Hl.set)
      this.el.setAttribute('set', '');
    else if (hl === Hl.clear)
      this.el.setAttribute('clear', '');
    setTimeout(() => ['highlight', 'set', 'clear'].forEach(attr => this.el.removeAttribute(attr)), 1000);
  }
}
