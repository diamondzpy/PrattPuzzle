#include "parser.h"
#include <string>
#include <stdexcept>

Rational BinNode::eval() const {
    Rational a = left->eval();
    Rational b = right->eval();
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: throw std::runtime_error("Unknown operator in evaluation: " + std::string(1, op));
    }
}

Parser::Parser(const std::vector<Token>& tokens, const std::unordered_map<char, int>& precedence)
: t(tokens), prec(precedence) {}

const Token& Parser::peek() const {return t[pos];}
const Token& Parser::read() {return t[pos++];}

bool Parser::match(TokenType tp) {
    if (peek().type == tp) {read(); return true;}
    return false;
};

bool Parser::isInfixOp(const Token& tok) const {
    return tok.type == TokenType::Operator;
};

std::pair<int, int> Parser::infixBindingPower(char op) const {
    auto it = prec.find(op);
    if (it == prec.end()) throw std::runtime_error("Operator missing precedence: " + std::string(1, op));
    int bp = it->second;
    return {bp, bp+1};
}

std::unique_ptr<Node> Parser::parsePrefix() {
    const Token& tok = peek();

    if (tok.type == TokenType::Number) {
        read();
        return std::make_unique<NumNode>(Rational::fromInt(tok.number));
    }

    if (match(TokenType::LParen)) {
        auto inside = parseExpr(0);
        if (!match(TokenType::RParen)) throw std::runtime_error("Missing ')'.");
        return inside;
    }

    throw std::runtime_error("Expected a number or '('.");
};

std::unique_ptr<Node> Parser::parseExpr(int minBp) {
    auto lhs = parsePrefix();

    while (true) {
        const Token& tok = peek();
        if (!isInfixOp(tok)) break;

        auto [lbp, rbp] = infixBindingPower(tok.op);
        if (lbp < minBp) break;

        char op = tok.op;
        read();

        auto rhs = parseExpr(rbp);
        lhs = std::make_unique<BinNode>(op, std::move(lhs), std::move(rhs));
    }

  return lhs;
}

std::unique_ptr<Node> Parser::parseExpression() {
  auto n = parseExpr(0);
  if (peek().type != TokenType::End) {
    throw std::runtime_error("Unexpected extra tokens at end.");
  }
  return n;
}