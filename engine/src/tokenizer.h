#pragma once
#include <string>
#include <string_view>
#include <vector>
#include <cstdint>

/*
The Token class stores a token, which is a number, a binary operator,
left/right parenthesis, or the end-of-file indicator.
The tokenize function takes an expression as a string and tokenizes it.
*/

enum class TokenType {
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

inline constexpr std::string_view OPS = "+-*/";

inline bool isOperatorChar(char c) {
    return OPS.find(c) != std::string_view::npos;
}

std::vector<Token> tokenize(const std::string& s);