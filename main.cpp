#include <iostream>

using namespace std;

void modify(int &value) {
  value = 10;
  // value의 메모리 주소 동일
  cout << "주소 " << &value << endl; // 0x16f053658 (3)
  cout << "값: " << value << endl; // 10 (4)
  // 함수가 종료되면 value 변수는 메모리에서 사라짐
}

int main() {
  int value = 5;
  // value의 메모리 주소 동일
  cout << "주소: " << &value << endl; // 0x16f053658 (1)
  cout << "값: " << value << endl; // 5 (2)
  modify(value);
  // 원본 value가 변경됨
  cout << "값: " << value << endl; // 10 (5)

  return 0;
}
