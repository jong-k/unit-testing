#include <iostream>
#include <string>

using namespace std;

int main() {
  string str = "Hello, C++ World!";

  size_t pos0 = str.find('l');
  size_t pos1 = str.find("Hello");
  size_t pos2 = str.find("o, ");

  cout << pos0 << endl; // 2
  cout << pos1 << endl; // 0
  cout << pos2 << endl; // 4

  // 존재하지 않는 문자열 찾기 1
  size_t start_index = 15;
  size_t pos3 = str.find("World", start_index);
  // string::npos
  cout << pos3 << endl; // 18446744073709551615

  // 존재하지 않는 문자열 찾기 2
  size_t pos4 = str.find("Python");
  cout << pos4 << endl; // 18446744073709551615

  return 0;
}
