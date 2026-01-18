#pragma once
#include "tokenizer.h"
#include "rational.h"
#include <unordered_map>
#include <memory>
#include <string>
#include <vector>

struct Node {
    virtual ~Node() = default;
    virtual Rational eval() const = 0;
};

struct NumNode : Node {
    Rational value;
    explicit NumNode(Rational r): value(r) {}
    Rational eval() const override {return value;}
};

struct BinNode: Node {
    char op;
    std::unique_ptr<Node> left;
    std::unique_ptr<Node> right;

    BinNode(char o, std::unique_ptr<Node> l, std::unique_ptr<Node> r):
    op(o), left(std::move(l)), right(std::move(r)) {}

    Rational eval() const override;
};

class Parser {
    public:
        Parser(const std::vector<Token>& tokens, const std::unordered_map<char, int>& precedence);
        std::unique_ptr<Node> parseExpression();

    private:
        const std::vector<Token>& t;
        std::size_t pos = 0;
        std::unordered_map<char, int> prec;

        const Token& peek() const;
        const Token& read();
        bool match(TokenType tp);

        std::unique_ptr<Node> parseExpr(int minBp);
        std::unique_ptr<Node> parsePrefix();

        bool isInfixOp(const Token& tok) const;
        std::pair<int, int> infixBindingPower(char op) const;
};