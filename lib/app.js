"use strict";
class Cell {
    el = El("div", { class: "cell" });
    _value;
    coords;
    constructor(coords, value) {
        this.value = value;
        this.coords = coords;
    }
    set value(n) {
        this._value = n;
        if (n !== undefined)
            this.el.innerHTML = n.toString();
    }
    get value() {
        return this._value;
    }
    get row() {
        return sudoku.cells[this.coords.y].filter(cell => cell !== this);
    }
    get col() {
        return sudoku.cells.map(row => row[this.coords.x]).filter(cell => cell !== this);
    }
}
function El(tagName, attrs = {}, ...children) {
    if (typeof tagName !== 'string')
        return tagName(attrs);
    const elem = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs))
        if (key === 'class')
            elem.classList.add(...value.split(' '));
        else {
            elem[key] = value;
            elem.setAttribute(key, value);
        }
    for (const child of children)
        if (Array.isArray(child))
            elem.append(...child);
        else
            elem.append(child);
    return elem;
}
;
class Sudoku {
    el;
    cells;
    constructor() {
        this.el = El("div", { class: "grid" });
        this.cells = [];
        for (let y = 0; y < 9; y++) {
            const row = El("div", { class: "row" });
            this.el.append(row);
            this.cells[y] = Array(9).fill(0).map((_, x) => new Cell({ x, y }, Math.floor(Math.random() * 10)));
            row.append(...this.cells[y].map(({ el }) => el));
        }
    }
}
const body = document.body;
const sudoku = new Sudoku();
body.append(sudoku.el);
