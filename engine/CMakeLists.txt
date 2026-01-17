cmake_minimum_required(VERSION 3.16)
project(pratt_engine LANGUAGES CXX)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

add_executable(pratt_eval
  src/main.cpp
  src/tokenizer.cpp
  src/parser.cpp
  src/rational.cpp
)

target_include_directories(pratt_eval PRIVATE src)