function Animate(generator, speed = 4) {
  const nextFrame = () => {
    const { value: cell, done }: { value: Cell, done: boolean } = generator.next();
    if (done) return;
    setTimeout(nextFrame, speed);
    cell.highlight();
  }
  nextFrame();
}
