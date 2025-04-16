# ch2. 첫 번째 단위 테스트

## 1. Jest 소개

- 페이스북에서 만든 오픈소스 테스트 프레임워크

### 테스트 파일 생성

테스트 파일 찾는 규칙

- `__tests__` 폴더가 있으면 그 안의 모든 파일을 이름과 상관없이 테스트 파일로 간주하고 불러옴
- 프로젝트의 모든 파일 중 `*.spec.js` 또는 `*.test.js` 로 끝나는 파일을 재귀적으로 탐색

## 2. 라이브러리, 검증, 러너, 리포터

Jest의 역할

1. 테스트를 작성할 때 사용하는 테스트 라이브러리
2. 테스트 내에서 expect 함수를 사용하는 검증(assertion) 라이브러리
3. 테스트 러너(runner)
4. 테스트 실행 결과를 보여주는 테스트 리포터
5. 격리(isolation) 기능: mock, stub, spy(테스트할 함수의 호출 정보만 추적)

## 3. 단위 테스트 프레임워크가 제공하는 기능

테스트 코드의 일관된 형식

- 이미 구조화된 방식으로 테스트를 작성하므로 누구나 쉽게 읽고 이해할 수 있다

반복성

- 새로운 테스트를 작성하는 작업을 쉽게 반복할 수 있다
- 테스트 러너로 테스트 반복 실행이 용이하다

신뢰성과 시간 절약

- 직접 테스트 프레임워크를 만들면 버그 발생에 대처하기 번거로움
- 시간이 없을 때는 제일 중요하다고 생각하는 것만 테스트하고 나머지는 무심코 넘어갈 수 있다. 하지만 이렇게 하면 검증이 빈틈이 많아진다. 테스트 프레임워크를 사용하면 테스트를 작성하기 쉬워져 프로젝트의 버그 발생 확률을 줄일 수 있다

공동의 이해

- 테스트 통과 여부로 팀원들이 작업의 완료 여부를 쉽게 파악 가능

## 4. 예제: 비밀번호 검증 프로젝트

- password-verifier0.ts
- password-verifier0.spec.ts

## 5. verifyPassword() 함수의 1번째 테스트 코드

### 준비-실행-검증(AAA) 패턴

테스트 코드를 준비(arrange) - 실행(act) - 검증(assert)의 AAA 패턴으로 작성

- Given-When-Then 패턴이라고도 함

password-verifier0.spec.ts 예시

```ts
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
```

### USE 전략

테스트 코드 이름을 지을 때 참고할 사항

- 테스트 하려는 대상(Unit: 지금은 verifyPassword() 함수)
- 입력값이나 상황에 대한 설명(Scenario: 결과로 false를 반환하는 상황)
- 기댓값이나 결과에 대한 설명(Expectation: 에러 메시지를 반환)

USE 전략을 활용해서 password-verifier0.spec.ts 리팩토링

- before

```ts
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

test("badly named test", () => {
  const fakeRule = (input: string): Rule => ({
    passed: false,
    reason: "fake reason",
  });

  const errors = verifyPassword("any value", [fakeRule]);
  expect(errors[0]).toMatch("fake reason");
});
```

- after(test 제목 수정)

```ts
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
```

### 문자열 비교와 유지보수성

- toMatch, toContain 메서드를 사용해서 핵심 의미의 문자열이 있는지 정도만 검사하는게 좋다 (완전 일치 검사 대신)
- 문장에서 마침표가 새로 추가된 정도의 변경은 테스트 결과에 영향을 미치면 안됨
- 테스트 코드는 동일한 비즈니스 로직에서 항상 같은 결과를 보장해야 하기에 테스트의 안정성을 높이는 것을 우선시 해야함

### describe 함수로 테스트 그룹화

describe 사용의 장점

- 계층 구조 => test() 혹은 it() 만 사용하는 것 보다 구조적임
- USE 전략의 3가지 내용을 분리하여 가독성 향상 => 각 구역을 명확하게 구분 가능

```ts
// ch2
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

// describe 블록은 테스트 그룹을 만들어줌
describe("verifyPassword", () => {
  test("given a failing rule, returns errors", () => {
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
```

describe를 중첩으로 USE의 각 메시지를 더 명확하게 표현

```ts
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
```

### it 함수

> it()은 test()의 별칭이며, describe 방식과 영어 문법적으로 더 잘 어울린다

test() 를 it() 으로 변경하는 예시

```ts
// ch2
import { verifyPassword } from "../notes/ch2/password-verifier0";
import { Rule } from "../notes/ch2/types";

describe("verifyPassword", () => {
  describe("given a failing rule", () => {
    // it returns errors 처럼 읽혀서 자연스럽다 (test 대신 it 사용)
    it("returns errors", () => {
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input,
      });
      const errors = verifyPassword("any value", [fakeRule]);
      expect(errors[0]).toContain("fake reason");
    });
  });
});
```

### 2가지 Jest 스타일

test() or it() 만 사용

- 간단한 테스트를 간결하게 표현하는 스타일

describe() 중첩 구문 사용

- Jest 보다 원조 격인 자스민 테스팅 프레임워크의 영향을 받아 훨씬 오래전 부터 써 오던 스타일
- BDD 에서 사용하던 스타일

BDD(Behavior Driven Development)

- 스토리와 예제를 사용하여 애플리케이션이 어떻게 동작하는지 설명하는 방법
- 비개발직군과의 협업을 목표로 함

### verifyPassword() 함수 리팩터링

클래스 기반 으로 리팩터링(password-verifier1.ts)

- 일반적으로 상태값을 다루는 코드의 특성상, 두 함수가 반드시 결합되어야 하는데
- 클래스를 사용하면, 내부 상태를 노출하지 않고 테스트를 작성할 수 있다
- before (password-verifier0.spec.js)

```ts
import { verifyPassword } from "../../notes/ch2/password-verifier0";
import { Rule } from "../../notes/ch2/types";

describe("verifyPassword", () => {
  describe("given a failing rule", () => {
    it("returns errors", () => {
      const fakeRule = (input: string): Rule => ({
        passed: false,
        reason: input,
      });
      const errors = verifyPassword("fake reason", [fakeRule]); // 상태 노출됨
      expect(errors[0]).toContain("fake reason");
    });
  });
});
```

- after

```ts
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
      expect(errors[0]).toContain("fake reason");
    });
  });
});
```

새로운 검증을 추가한다면? (2개 이상의 expect문)

- 예시: 새로운 expect 추가

```ts
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
```

- expect 문은 순서대로 실행되고, 에러 발생 시 다음으로 넘어가지 않음
- 그렇다고 expect 문을 주석 처리 하는것은 바람직하지 않음
