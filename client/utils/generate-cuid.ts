export const generateCUID = () => {
  const now = Date.now();
  const sb = [];

  sb.push(toBase36(now));

  for (let i = 0; i < 4; i++) {
    sb.push(getRandomBase36());
  }

  sb.push(toBase36(Math.floor(performance.now() * 1000)));

  return sb.join("");
};

const toBase36 = (num: number) => {
  return num.toString(36);
};

const getRandomBase36 = () => {
  return Math.floor(Math.random() * 36).toString(36);
};
