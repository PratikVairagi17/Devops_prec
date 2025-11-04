def add(x, y):
    return x + y

def subtract(x, y):
    return x - y

def multiply(x, y):
    return x * y

def divide(x, y):
    if y == 0:
        return "Error! Division by zero."
    return x / y

def power(x, y):
    return x ** y

def calculator():
    print("=== Simple Calculator ===")
    print("Operations:")
    print("1. Add")
    print("2. Subtract")
