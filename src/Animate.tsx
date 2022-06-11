function Animate(generator, speed = 4) {
  const nextFrame = () => {
    const { value: cell, done }: { value: Cell, done: boolean } = generator.next();
    if (done) return;
    skip.addEventListener('click', () => [...generator], { once: true })
    setTimeout(nextFrame, speed);
    cell.highlight();
  }
  nextFrame();
}
