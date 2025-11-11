# Unit Tests Documentation

This document describes the comprehensive unit test suite for the Calculator application.

## Test Setup

The test suite uses:
- **Vitest**: Fast unit test framework
- **@testing-library/react**: Testing utilities for React components
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **@testing-library/user-event**: User interaction simulation

## Running Tests

```bash
# Run tests once
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Run tests with coverage
npm run test:coverage
```

## Test Files

### `src/App.test.jsx`

Tests for the main App component functions:

#### 1. **agregar function** (4 tests)
- ✓ Correctly appends numbers to input
- ✓ Correctly appends operators to input
- ✓ Appends multiple operators and numbers
- ✓ Clears error message when appending after an error

#### 2. **limpiar function** (3 tests)
- ✓ Correctly clears the input
- ✓ Clears error messages
- ✓ Clears both input and error messages together

#### 3. **calcular function** (10 tests)
- ✓ Correctly evaluates simple addition (2+3=5)
- ✓ Correctly evaluates simple subtraction (9-4=5)
- ✓ Correctly evaluates simple multiplication (3*4=12)
- ✓ Correctly evaluates simple division (8/2=4)
- ✓ Correctly evaluates complex expressions with operator precedence (2+3*4=14)
- ✓ Handles invalid expressions and shows error message
- ✓ Handles invalid expressions starting with operators
- ✓ Handles empty input calculation
- ✓ Clears error message on successful calculation after previous error
- ✓ Handles division by zero (returns Infinity)

### `src/usoTeclado.test.jsx`

Tests for the keyboard hook functionality:

#### 4. **Numeric key presses** (5 tests)
- ✓ Handles single digit key press
- ✓ Handles multiple numeric key presses
- ✓ Handles zero key press
- ✓ Handles all digits 0-9
- ✓ Appends numeric keys to existing input

#### 5. **Operator key presses** (6 tests)
- ✓ Handles addition operator (+)
- ✓ Handles subtraction operator (-)
- ✓ Handles multiplication operator (*)
- ✓ Handles division operator (/)
- ✓ Appends operators to existing input
- ✓ Handles mixed numbers and operators

#### 6. **Enter key press** (3 tests)
- ✓ Triggers calculation on Enter key
- ✓ Prevents default behavior on Enter key
- ✓ Calls calcular function with current input

#### 7. **C key press** (4 tests)
- ✓ Clears input on lowercase "c" key
- ✓ Clears input on uppercase "C" key
- ✓ Clears complex expressions
- ✓ Works when input is already empty

#### 8. **Backspace key press** (3 tests)
- ✓ Deletes last character on Backspace
- ✓ Handles multiple Backspace presses
- ✓ Handles Backspace on empty input

#### 9. **Additional tests** (3 tests)
- ✓ Removes event listener on unmount
- ✓ Does not trigger action for non-handled letter keys
- ✓ Does not trigger action for special keys

## Test Coverage Summary

Total: **41 tests** across **2 test files**

All requested test cases are covered:
1. ✅ agregar function correctly appends numbers and operators
2. ✅ limpiar function correctly clears input and error messages
3. ✅ calcular function correctly evaluates valid expressions and handles invalid ones
4. ✅ usoTeclado hook correctly handles numeric key presses
5. ✅ usoTeclado hook correctly triggers calculation on Enter and clears on C

## Key Testing Patterns

### Mocking
- `window.confetti` is mocked to prevent errors during calculation tests
- State setters are mocked in hook tests to verify behavior

### Event Simulation
- `fireEvent.click()` for button clicks
- `window.dispatchEvent(new KeyboardEvent())` for keyboard events
- `act()` wrapper for state updates in hooks

### Assertions
- Value checks using `expect(input.value).toBe()`
- DOM presence checks using `toBeInTheDocument()` and `not.toBeInTheDocument()`
- Function call verification using `toHaveBeenCalled()` and `toHaveBeenCalledTimes()`
- Text content verification using `toHaveTextContent()`

## Notes

- Tests verify both successful operations and error handling
- Edge cases like empty input, division by zero, and invalid expressions are covered
- Event cleanup and memory leak prevention is tested
- Both case-sensitive and case-insensitive keyboard inputs are tested
