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
        this.el.innerHTML = (n ?? '&nbsp;').toString();
    }
    get value() {
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
        return [...Array(10).keys()].filter(n => !(this.row.some(cell => n === cell.value) ||
            this.col.some(cell => n === cell.value)));
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
    grid = [];
    constructor() {
        this.el = El("div", { class: "grid" });
        for (let y = 0; y < 9; y++) {
            const row = El("div", { class: "row" });
            this.el.append(row);
            this.grid[y] = Array(9).fill(0).map((_, x) => new Cell({ x, y }));
            row.append(...this.grid[y].map(({ el }) => el));
        }
    }
    get cells() {
        return this.grid.flat();
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
                cell.value = values[Math.floor(Math.random() * cell.legalValues.length)];
            }
            break loop;
        }
        return tryCount;
    }
    create(difficulty = 10) {
        this.fill();
        for (const cell of this.cells)
            if (Math.random() > 1 / difficulty)
                cell.value = undefined;
    }
}
const body = document.body;
const sudoku = new Sudoku();
body.append(sudoku.el);
sudoku.create();
