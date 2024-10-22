const random = (min, max) => {
  return Math.floor(min + Math.random() * (max - min + 1));
};

let lastHue = null;

const randomColor = () => {
  let hue;
  do {
    hue = random(0, 360);
  } while (lastHue !== null && Math.abs(hue - lastHue) < 30);

  lastHue = hue;

  return `hsl(${hue} ${random(30, 100)}% ${random(40, 90)}%)`;
};

export { randomColor };
