#include "rational.h"
#include <stdexcept>
#include <numeric>

Rational::Rational(std::int64_t n, std::int64_t d) : num(n), den(d) {
    if (den == 0) throw std::runtime_error("Division by zero error.");
    reduce();
}

void Rational::reduce() {
    if (den < 0) {
        den *= -1;
        num *= -1;
    }
    auto g = std::gcd(num, den);
    if (g != 0){
        den /= g;
        num /= g;
    }
}

std::string Rational::toString() const {
    if (den == 1) return std::to_string(num);
    return std::to_string(num) + "/" + std::to_string(den);
}

Rational operator+(const Rational& a, const Rational& b) {
    return Rational(a.num*b.den+b.num*a.den, a.den*b.den);
}

Rational operator-(const Rational& a, const Rational& b) {
    return Rational(a.num*b.den-b.num*a.den, a.den*b.den);
}

Rational operator*(const Rational& a, const Rational& b) {
    return Rational(a.num*b.num, a.den*b.den);
}

Rational operator/(const Rational& a, const Rational& b) {
    return Rational(a.num*b.den, a.den*b.num);
}