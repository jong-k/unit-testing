import { sum } from "./number-parser.js";

const parserTest = () => {
  try {
    const result = sum("1,2"); // 실제 모듈(SUT)
    if (result === 3) {
      console.log("parserTest exapmle 1 PASSED");
    } else {
      throw new Error(`parserTest: expected 3 but was ${result}`);
    }
  } catch (e) {
    console.error(e.stack);
  }
};

parserTest();
