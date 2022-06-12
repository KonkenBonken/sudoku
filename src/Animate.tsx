const enum Hl { set, clear };

function Animate(generator, speed = 4) {
  const nextFrame = () => {
    const { value, done }: { value: [Cell | Cell[], Hl], done: boolean } = generator.next();
    if (done) return;
    let [cells, highLight] = value;
    skip.addEventListener('click', () => [...generator], { once: true })
    setTimeout(nextFrame, speed);

    if (!Array.isArray(cells))
      cells = [cells];
    for (const cell of cells)
      cell.highlight(highLight);
  }
  nextFrame();
}
