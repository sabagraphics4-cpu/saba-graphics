#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install Python modules
pip install -r requirements.txt

# Compile C++ module
# Ensure the directory exists (it should, but good to be safe)
if [ -d "cpp_module" ]; then
    echo "Compiling C++ module..."
    g++ -o cpp_module/processor cpp_module/processor.cpp
    # Make it executable
    chmod +x cpp_module/processor
    echo "Compilation successful."
else
    echo "Warning: cpp_module directory not found. Skipping compilation."
fi
