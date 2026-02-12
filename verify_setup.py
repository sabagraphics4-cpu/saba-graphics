import subprocess
import os
import sys

def verify_cpp():
    exe_path = os.path.join("cpp_module", "processor.exe")
    if not os.path.exists(exe_path):
        print(f"Error: {exe_path} not found.")
        return False
    
    try:
        result = subprocess.check_output([exe_path, "Hello_Saba_Graphics"], text=True)
        if "Processed: scihparG_abaS_olleH [C++ Backend]" in result:
            print("C++ Module Verification: SUCCESS")
            print(f"Output: {result.strip()}")
            return True
        else:
            print("C++ Module Verification: FAILED (Unexpected Output)")
            print(f"Output: {result.strip()}")
            return False
    except Exception as e:
        print(f"C++ Module Verification: FAILED (Exception: {e})")
        return False

if __name__ == "__main__":
    if verify_cpp():
        sys.exit(0)
    else:
        sys.exit(1)
