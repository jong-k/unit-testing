// ch2
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

// unit, scenario, expectation 순으로 테스트 이름 기재
test("verifyPassword, given a failing rule, returns errors", () => {
  const fakeRule = (input: string): Rule => ({
    passed: false,
    reason: "fake reason",
  });

  const errors = verifyPassword("any value", [fakeRule]);
  expect(errors[0]).toContain("fake reason");
});
