export interface Rule {
  passed: boolean;
  reason: string;
}

export type RuleFunction = (input: string) => Rule;
