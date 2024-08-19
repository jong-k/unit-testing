#include <iostream>
#include <vector>
#include <map>
#include <set>

using namespace std;


int main() {
  vector<int> vec = {1, 2, 3, 4, 5};
  for (int num: vec) {
    cout << num << " "; // 1 2 3 4 5
  }
  cout << endl;

  // map
  map<string, int> fruitMap = {{"apple", 1}, {"banana", 2}, {"cherry", 3}};
  for (const auto &pair: fruitMap) {
    cout << pair.first << "=" << pair.second << " "; // apple=1 banana=2 cherry=3
  }
  cout << endl;

  // set
  set<string> fruitSet = {"apple", "banana", "cherry"};
  cout << "Set: ";
  for (const auto &fruit: fruitSet) {
    cout << fruit << " "; // apple banana cherry
  }

  return 0;
}
