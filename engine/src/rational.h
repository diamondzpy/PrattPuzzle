#pragma once
#include <cstdint>
#include <string>

/*
The Rational class is used for operating with rational numbers 
to avoid floating-point decimal issues.
It supports construction from integers, conversion to string, and
the basic binary operators.
*/

struct Rational {
    std::int64_t num = 0;
    std::int64_t den = 1;

    Rational() = default;
    Rational(std::int64_t n, std::int64_t d);

    static Rational fromInt(std::int64_t n) {
        return Rational(n, 1);
    }
    
    std::string toString() const;

    void reduce();

    friend Rational operator+(const Rational& a, const Rational& b);
    friend Rational operator-(const Rational& a, const Rational& b);
    friend Rational operator*(const Rational& a, const Rational& b);
    friend Rational operator/(const Rational& a, const Rational& b);
};