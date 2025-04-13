// ch2
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

test("badly named test", () => {
  // 준비: fakeRule 함수 생성
  const fakeRule = (input: string): Rule => ({
    passed: false,
    reason: "fake reason",
  });
  // 실행: 첫 번째 매개변수와 fakeRule 함수 전달
  const errors = verifyPassword("any value", [fakeRule]);
  // 검증: 준비 단계에서 설정한 reason과 에러 메시지와 일치하는지 비교
  // expect(errors[0]).toContain("fake reason"); // 아래와 동일
  expect(errors[0]).toMatch("fake reason");
});
