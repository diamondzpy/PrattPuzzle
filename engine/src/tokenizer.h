#pragma once
#include <string>
#include <vector>
#include <cstdint>

/*
The Token class stores a token, which is a number, a binary operator,
left/right parenthesis, or the end-of-file indicator.
The tokenize function takes an expression as a string and tokenizes it.
*/

enum class TokeType {
    Number,
    Operator,
    LParen,
    RParen,
    End
};

struct Token {
    TokenType type;
    char op = 0;
    std::int64_t number = 0;
};

std::vector<Token> tokenize(const std::string& s);