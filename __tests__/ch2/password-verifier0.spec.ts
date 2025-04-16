import { verifyPassword } from "../../notes/ch2/password-verifier0";
import { Rule } from "../../notes/ch2/types";

describe("verifyPassword", () => {
  describe("given a failing rule", () => {
    // it returns errors 처럼 읽혀서 자연스럽다 (test 대신 it 사용)
    it("returns errors", () => {
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input,
      });
      const errors = verifyPassword("fake reason", [fakeRule]);
      expect(errors[0]).toContain("fake reason");
    });
  });
});
