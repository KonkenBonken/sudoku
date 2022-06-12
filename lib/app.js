"use strict";
function Animate(generator, speed = 4) {
    const nextFrame = () => {
        let { value: cells, done } = generator.next();
        if (done)
            return;
        skip.addEventListener('click', () => [...generator], { once: true });
        setTimeout(nextFrame, speed);
        if (!Array.isArray(cells))
            cells = [cells];
        for (const cell of cells)
            cell.highlight();
    };
    nextFrame();
}
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
        return Array(9).fill(0).map((_, i) => i + 1).filter(n => !(this.row.some(cell => n === cell.value) ||
            this.col.some(cell => n === cell.value)));
    }
    highlight() {
        this.el.setAttribute('highlight', '');
        setTimeout(() => this.el.removeAttribute('highlight'), 1000);
    }
}
function El(tagName, attrs, ...children) {
    if (attrs == null)
        attrs = {};
    if (typeof tagName !== 'string')
        return tagName(attrs);
    const elem = document.createElement(tagName);
    for (const [key, value] of Object.entries(attrs))
        if (key === 'class')
            elem.classList.add(...value.split(' '));
        else if (key.startsWith('on'))
            elem.addEventListener(key.substr(2), value);
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
                let arr = Array(9).fill(0).map((_, i) => i + 1).sort(() => Math.random() - .5);
                for (const x in row) {
                    const i = arr.findIndex(n => !this.col(x).map(c => c.value).includes(n)), value = arr.splice(i, 1)[0];
                    if (!value || i == -1)
                        continue loop;
                    row[x].value = value;
                    yield row[x];
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
        }
        catch (e) {
            console.error(e);
        }
        rerun.disabled = false;
        skip.disabled = true;
    }
}
const body = document.body, sudoku = new Sudoku(), rerun = El("button", { onclick: () => Animate(sudoku.create(0)) }, "Generate"), skip = El("button", { disabled: true }, "Skip animation");
body.append(sudoku.el, El("div", { class: "ui" },
    rerun,
    skip));
Animate(sudoku.create(0));
