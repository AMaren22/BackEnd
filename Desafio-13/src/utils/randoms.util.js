let quantity = 100000000;

export const randomsNumbers = (numbers) => {
  if (numbers >= 0) {
    quantity = numbers;
  }
  const arr = [];
  for (let i = 0; i < quantity; i++) {
    arr.push(Math.floor(Math.random() * 1000));
  }
  return arr.reduce((a, b) => (a[b] ? (a[b] += 1) : (a[b] = 1), a), {});
};

process.on("message", (obj) => {
  if (obj.msg == "start") {
    const numbers = randomsNumbers(obj.cant);
    process.send(numbers);
  }
});
