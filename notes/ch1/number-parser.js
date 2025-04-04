// 작업 단위 예시
const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  const result = parseInt(a) + parseInt(b);
  return result;
};

console.log(sum("1,2")); // 3
