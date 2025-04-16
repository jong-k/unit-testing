// ch2
import { PasswordVerifier1 } from "../notes/ch2/password-verifier1";
import { Rule } from "../notes/ch2/types";

describe("PasswordVerifier", () => {
  describe("with a failing rule", () => {
    it("has an error message based on the rule.reason", () => {
      const verifier = new PasswordVerifier1();
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input,
      });
      verifier.addRule(fakeRule);
      const errors = verifier.verify("any value");
      expect(errors[0]).toContain("fake reason");
    });
  });
});
