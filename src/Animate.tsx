function Animate(generator, speed = 2) {
  const nextFrame = () =>
    setTimeout(nextFrame, (generator.next().value ?? 1) * speed)
  nextFrame();
}
