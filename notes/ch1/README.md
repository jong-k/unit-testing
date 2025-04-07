# ch1. 단위 테스트의 기초

## 1. 단위 테스트 정의

> 특정 모듈이 잘 동작하는지 검증하는 것

- 모든 함수와 메서드에 대해 테스트 케이스 작성
- 테스트를 작성할 대상: 주제, 시스템, 테스트 대상(SUT-Suite Under Test)

SUT

- 무언가를 테스트할 때, 테스트하고자 하는 주요 대상
- 테스트중인 주제, 시스템, 테스트 모음(suite)

Unit(작업 단위)

- 시스템 내 작업 단위 또는 유스 케이스
- 시작(진입점)과 끝(종료점)이 있음
- 예) 어떤 계산된 결과를 반환하는 함수

## 2. 진입점과 종료점

진입점

- 함수나 컴포넌트 등 무언가를 실행
- 이 때, 상태값을 변경하거나 서드파티 API를 호출하는 등 의미 있는 작업을 실행할 것임

종료점

- 작업 단위(함수)가 돌아가는 실행 컨텍스트에서 벗어나서 다시 테스트 코드가 있던 곳(함수를 호출한 곳)으로 되돌아 감

작업 단위 예시(number-parser.js)

```js
// 작업 단위 예시
const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  const result = parseInt(a) + parseInt(b);
  return result;
};
// 진입점 및 종료점
console.log(sum("1,2")); // 3
```

- 진입점과 종료점이 sum(numbers) 부분으로 동일

작업 단위 예시2(number-parser2.js)

```js
let total = 0;

const totalSoFar = () => {
  return total;
};

const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  const result = parseInt(a) + parseInt(b);
  total += result; // 종료점1
  return result; // 종료점2
};

console.log(sum("1,2")); // 3
console.log(totalSoFar()); // 3
```

- sum 함수는 2개의 종료점을 가짐
- 각 종료점은 실제로 코가 수행해야 하는 2가지 중요한 작업을 의미
- sum 함수에 2개의 작업 단위로 합쳐져 있음

### 코드 설계 방향

- 쿼리: 상태를 변경하지 않고 오직 값을 반환
- 명령: 상태를 변경하고 값 반환 X

이 2가지 액션을 분리하는 것이 좋다

작업단위 예시3(number-parser3.js)

```js
let total = 0;

const totalSoFar = () => {
  return total;
};

const logger = makeLogger();

const sum = (numbers) => {
  const [a, b] = numbers.split(",");
  // 종료점 1 (서드파티 함수 호출)
  logger.info("this is a very important log output", {
    firstNumWas: a,
    secondNumWas: b,
  });

  const result = parseInt(a) + parseInt(b);
  total += result; // 종료점 2 (명령)
  return result; // 종료점 3 (쿼리)
};

console.log(sum("1,2"));
console.log(totalSoFar());
```

- 3번째 유형의 종료점 (서드파티 함수 호출 = 의존성 호출)
- 의존성인 logger 함수의 역할을 자세히 몰라도 됨
- 의존성: 단위 테스트 중 온전히 제어할 수 없는 것
  - 파일 시스템 쓰기 작업
  - 네트워크 통신
  - DB 접근 등등
- 의존성이 아닌 것의 예시
  - 어떤 행위를 쉽게 제어 가능
  - 메모리 내에서 실행
  - 빠른 속도로 처리됨

종료점마다 테스트를 만들어서 분리하면 각 테스트끼리 영향을 주지 않고, 더 읽기 쉽고, 디버깅도 쉽다

## 4. 종료점 유형

앞에서 살펴본 sum 함수(작업 단위)의 3가지 유형의 종료점

1.함수가 undefined가 아닌 값을 반환

-Java 에서의 예시: public 이면서 void가 아닌 반환값의 함수

2.함수 호출 전과 후에 상태값이 달라져 내부 상태를 들여다보지 않고도 확인 가능

-상태를 변경

3.코드 실행 주도권이 제3자에게 있는 서드파티 함수 호출

-내가 작성한 코드가 아님

### 단위 테스트

- 작업 단위를 호출하고, 그 작업 단위의 최종 결과로서 하나의 종료점을 테스트 검증 목표로 사용
- 최종 결과가 테스트가 검증하고자 하는 바와 다르면 단위 테스트는 실패

## 5. 다른 종료점, 다른 기법

- 각 종료점마다 테스트를 만들어 분리하는 것이 코드 관리 측면에서 유리
- 종료점 종류에 따라 테스트 방법이 다름

반환 값 있는 종료점

- 작업 단위를 실행하여 진입점을 호출하고 실행 결과 값을 받아 그 값을 확인
- 테스트가 비교적 용이

상태 값을 변경하는 종료점

- 테스트를 위해 함수를 2번 호출해야 할 수 있음
- 약간 더 많은 작업 필요

서드파티 함수를 호출하는 종료점

- 모의 객체(mock object)를 만들어 테스트 결과를 임의로 조작하여 테스트
- 가장 많은 작업 필요 (복잡성을 증가시키고 유지보수가 어려움)

## 1.6 처음부터 테스트 코드 작성

테스트 코드 프레임워크 없이 직접 테스트 코드 작성 (number-parser.js의 sum 함수 테스트)

테스트코드1 custom-test-phase1.js

```js
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
```

테스트코드2 custom-test-phase2.js

```js
import { sum } from "./number-parser.js";
// 값 비교를 위한 헬퍼 함수
const assertEquals = (expected, actual) => {
  if (actual !== expected) {
    throw new Error(`Expected ${expected} but was ${actual}`);
  }
};
// 보다 범용적인 검증 함수
const check = (name, implementation) => {
  try {
    implementation();
    console.log(`${name} PASSED`);
  } catch (e) {
    console.error(`${name} FAILED: ${e.stack}`);
  }
};

check("sum with 2 numbers should sum them up", () => {
  const result = sum("1,2");
  assertEquals(3, result);
});

check("sum with 2 numbers should sum them up", () => {
  const result = sum("10,20");
  assertEquals(20, result); // 30 대신 20을 넣어 일부러 실패
});
```

- 헬퍼함수와 범용적인 검증 함수를 사용하여 재사용성 강화

## 7. 좋은 단위 테스트의 특징

### 좋은 단위 테스트란

좋은 테스트의 기준

- 테스트 작성자의 의도를 이해하기 쉬워야 한다
- 읽고 쓰기 쉬워야 한다
- 테스트를 자동화할 수 있어야 한다
- 같은 조건에서 실행 결과는 항상 같아야 한다
- 의미 있는 테스트여야 하고, 구체적인 결과를 제공하여 문제를 쉽게 파악하고 해결할 수 있어야 한다
- 누구나 쉽게 실행할 수 있어야 한다
- 실패할 경우 무엇이 잘못되었는지 쉽게 알 수 있어야 한다

좋은 단위 테스트

- 빠르게 실행할 수 있어야 함
- 테스트 환경을 일관되게 유지하고, 테스트 결과가 항상 예측 가능해야 한다
- 다른 테스트와 완전히 독립적으로 실행되어야 한다
- 시스템 파일, 네트워크, 데이터베이스가 없어도 메모리 내에서 실행되어야 한다
- 가능한 동기적 흐름으로 실행되어야 한다(가능한 병렬 스레드를 사용하지 않아야 한다)

단위 테스트를 만들기 힘들다면 통합 테스트로 만드는 것도 하나의 방법이다

### 스텁

스텁: 실제 의존성을 흉내내는 가짜 의존성

- 스텁을 사용하면 실제 의존성에 접근하지 않고도 테스트 수행 가능

단위 테스트에는 스텁, 통합 테스트에서는 실제 DB를 사용한다

- 인메모리 데이터베이스는 실제 데이터베이스와 데이터 차이가 있을 수 있고, 테스트 결과의 차이를 만들어낼 수 있다

테스트가 제대로 통과하는지 수동으로 다시 확인해야 하는 테스트는 좋지 않다

### 비동기 코드를 동기적으로 검증하기

- 테스트에서 직접 콜백 함수 호출
- 비동기 작업이 완료될 때까지 대기

### 단위 테스트 체크리스트 (전부 만족시켜야 함)

- 2주, 2개월, 2년 전에 만든 테스트가 여전히 잘 돌아가는지?
- 내가 2개월 전에 작성한 테스트를 다른 팀원이 에러 없이 사용 가능한지?
- 내가 만든 테스트가 수분 내로 실행되는지?
- 버튼 하나만 눌러서 모든 테스트를 실행할 수 있는지?
- 다른 팀 코드에 버그가 있어도 내 테스트는 통과하는지?
- 다른 실행환경에서 테스트가 동일한 결과를 보장하는지?
- DB, 네트워크, 배포 없이 테스트가 동작하는지?
- 하나의 테스트를 변경, 삭제해도 다른 테스트가 영향없이 잘 동작하는지?
