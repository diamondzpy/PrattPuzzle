#include "tokenizer.h"
#include <cctype>
#include <stdexcept>

std::vector<Token> tokenize(const std::string& s) {
    std::vector<Token> out;
    std::size_t i = 0;

    while (i < s.size()) {
        if (std::isspace((unsigned char) s[i])) {i++; continue;}

        char c = s[i];

        if (std::isdigit((unsigned char) c)) {
            std::int64_t val = c - '0';
            i++;
            while (i < s.size() && std::isdigit((unsigned char) s[i])) {
                val = val * 10 + (s[i] - '0');
                i++;
            }
            out.push_back({TokenType::Number, 0, val});
        }
        
        else if (isOperatorChar(c)) {
            out.push_back({TokenType::Operator, c, 0});
            i++;
        }

        else if (c == '(') {out.push_back({TokenType::LParen}); i++;}
        else if (c == ')') {out.push_back({TokenType::RParen}); i++;}

        else {throw std::runtime_error(std::string("Unexpected character: ") + c);}
    }

    out.push_back({TokenType::End});
    return out;
}