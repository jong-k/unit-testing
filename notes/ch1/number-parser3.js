let total = 0;

const totalSoFar = () => {
  return total;
};

const logger = makeLogger();

const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  // 종료점 1 (서드파티 호출)
  logger.info("this is a very important log output", {
    firstNumWas: a,
    secondNumWas: b,
  });

  const result = parseInt(a) + parseInt(b);
  total += result; // 종료점 2 (명령)
  return result; // 종료점 3 (쿼리)
};

console.log(sum("1,2"));
console.log(totalSoFar());
