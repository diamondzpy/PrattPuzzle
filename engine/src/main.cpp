#include "tokenizer.h"
#include "parser.h"
#include <iostream>
#include <unordered_map>
#include <sstream>
#include <stdexcept>
#include <vector>

static std::vector<char> parsePrecList(const std::string& s) {
  std::vector<char> ops;
  std::stringstream ss(s);
  std::string item;

  while (std::getline(ss, item, ',')) {
    if (item.size() != 1) throw std::runtime_error("Each precedence item must be a single char.");
    char c = item[0];
    if (!(isOperatorChar(c))) throw std::runtime_error("Invalid operator in precedence list.");
    ops.push_back(c);
  }

  if (ops.size() != 4) throw std::runtime_error("Precedence list must include exactly 4 operators: +,-,*,/.");
  return ops;
}

static std::unordered_map<char,int> buildPrecMap(const std::vector<char>& orderHighToLow) {
  // higher number => tighter binding
  std::unordered_map<char,int> m;
  int bp = 40;
  for (char c : orderHighToLow) {
    if (m.count(c)) throw std::runtime_error("Duplicate operator in precedence list.");
    m[c] = bp;
    bp -= 10;
  }
  return m;
}

static void validateExprMVP(const std::string& expr) {
  // MVP restriction: only digits, spaces, + - * /
  // (we tokenize parentheses but don't allow them in MVP)
  for (char c : expr) {
    if (std::isdigit((unsigned char)c) || std::isspace((unsigned char)c)) continue;
    if (c=='+' || c=='-' || c=='*' || c=='/') continue;
    throw std::runtime_error("Expression contains unsupported character for MVP.");
  }
}

int main(int argc, char** argv) {
  try {
    if (argc != 3) {
      std::cerr << "Usage: pratt_eval \"EXPR\" \"/,*,+,-\"\n";
      return 2;
    }

    std::string expr = argv[1];
    std::string precStr = argv[2];

    validateExprMVP(expr);

    auto order = parsePrecList(precStr);
    auto precMap = buildPrecMap(order);

    auto toks = tokenize(expr);
    Parser p(toks, precMap);
    auto ast = p.parseExpression();
    Rational result = ast->eval();

    std::cout << result.toString() << "\n";
    return 0;
  } catch (const std::exception& e) {
    std::cerr << "Error: " << e.what() << "\n";
    return 1;
  }
}