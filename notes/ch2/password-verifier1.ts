import { RuleFunction } from "./types";

export class PasswordVerifier1 {
  private rules: RuleFunction[];

  constructor() {
    this.rules = [];
  }

  addRule(rule: RuleFunction) {
    this.rules.push(rule);
  }

  verify(input: string) {
    const errors: string[] = [];
    this.rules.forEach((rule) => {
      const result = rule(input);
      if (!result.passed) errors.push(`error ${result.reason}`);
    });
    return errors;
  }
}
