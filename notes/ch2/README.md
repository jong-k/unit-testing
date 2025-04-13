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
