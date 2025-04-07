// 작업 단위 예시
export const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  const result = parseInt(a) + parseInt(b);
  return result;
};
// 진입점 및 종료점
console.log(sum("1,2")); // 3
