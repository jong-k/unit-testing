#include <iostream>
#include <string>

using namespace std;

int main() {
  string str = "APPLE";

  str += ", World";
  cout << str << endl; // APPLE, World

  str[7] = 'P';
  cout << str << endl; // APPLE, Porld

  // 원본 변경됨
  str.replace(4, 4, "Col");
  cout << str << endl; // APPLColorld

  return 0;
}
