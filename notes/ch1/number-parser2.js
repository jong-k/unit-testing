let total = 0;

const totalSoFar = () => {
  return total; // 종료점1
};

const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  const result = parseInt(a) + parseInt(b);
  total += result;
  return result; // 종료점2
};

console.log(sum("1,2")); // 3
console.log(totalSoFar()); // 3
