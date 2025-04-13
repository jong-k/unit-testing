// ch2
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

// describe 블록을 한번 더 중첩하여 USE 전략의 3가지 내용을 명확하게 구분
describe("verifyPassword", () => {
  describe("given a failing rule", () => {
    test("returns errors", () => {
      // 준비
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input, // input 값 사용
      });
      // 실행
      const errors = verifyPassword("any value", [fakeRule]);
      // 검증
      expect(errors[0]).toContain("fake reason");
    });
  });
});
