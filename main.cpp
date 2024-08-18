#include <iostream>

using namespace std;

int main() {
  const int a = 13;
  const int b = 4;
  // 정수형 비교 연산
  cout << (a == b) << endl; // 0(숫자)
  cout << (a != b) << endl; // 1
  cout << (a > b) << endl; // 1
  cout << (a < b) << endl; // 0
  cout << (a >= b) << endl; // 1
  cout << (a <= b) << endl; // 0

  // 정수형 비트 연산
  // AND 연산
  cout << (a & b) << endl; // 4
  // OR 연산
  cout << (a | b) << endl; // 13
  return 0;
}
