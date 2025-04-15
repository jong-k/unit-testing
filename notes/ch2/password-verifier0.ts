import { RuleFunction } from "./types";

export const verifyPassword = (input: string, rules: RuleFunction[]) => {
  const errors: string[] = [];
  rules.forEach((rule) => {
    const result = rule(input);
    if (!result.passed) errors.push(`error ${result.reason}`);
  });
  return errors;
};
