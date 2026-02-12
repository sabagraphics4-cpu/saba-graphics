#include <iostream>
#include <string>
#include <algorithm>

// A simple C++ program to process strings (e.g., reverse them or count characters)
// This simulates a "high-performance" task that the Python backend might offload.

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: processor <input_string>" << std::endl;
        return 1;
    }

    std::string input = argv[1];
    
    // Example processing: Reverse the string and add a "Processed by C++" tag
    std::string reversed = input;
    std::reverse(reversed.begin(), reversed.end());
    
    std::cout << "Original: " << input << " | Processed: " << reversed << " [C++ Backend]" << std::endl;

    return 0;
}
