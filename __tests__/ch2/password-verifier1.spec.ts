import { PasswordVerifier1 } from "../../notes/ch2/password-verifier1";
import { Rule } from "../../notes/ch2/types";

describe("PasswordVerifier", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input,
      });
      verifier.addRule(fakeRule);
      const errors = verifier.verify("fake reason");
      // 새로운 검증 추가
      // 실패 시 테스트 러너가 오류를 받고 다음 테스트로 이동하므로
      // 해당 라인 아래의 expect 문이 실행되지 않음
      expect(errors.length).toBe(2);
      expect(errors[0]).toContain("fake reason");
    });
  });
});
