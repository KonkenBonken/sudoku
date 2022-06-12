const enum Hl { set, clear };

function Animate(generator, speed = 4) {
  const nextFrame = () => {
    let { value: [cells, highLight], done }: { value: [Cell | Cell[], Hl], done: boolean } = generator.next();
    if (done) return;
    skip.addEventListener('click', () => [...generator], { once: true })
    setTimeout(nextFrame, speed);

    if (!Array.isArray(cells))
      cells = [cells];
    for (const cell of cells)
      cell.highlight(highLight);
  }
  nextFrame();
}
