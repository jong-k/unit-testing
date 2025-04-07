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
