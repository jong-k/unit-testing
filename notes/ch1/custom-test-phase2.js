import { sum } from "./number-parser.js";
// 값 비교를 위한 헬퍼 함수
const assertEquals = (expected, actual) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but was ${actual}`);
  }
};
// 보다 범용적인 검증 함수
const check = (name, implementation) => {
  try {
    implementation();
    console.log(`${name} PASSED`);
  } catch (e) {
    console.error(`${name} FAILED: ${e.stack}`);
  }
};

check("sum with 2 numbers should sum them up", () => {
  const result = sum("1,2");
  assertEquals(3, result);
});

check("sum with 2 numbers should sum them up", () => {
  const result = sum("10,20");
  assertEquals(20, result); // 30 대신 20을 넣어 일부러 실패
});
