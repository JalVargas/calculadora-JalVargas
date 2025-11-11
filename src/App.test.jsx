import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';

describe('App Component', () => {
  describe('agregar function', () => {
    it('should correctly append numbers to the input', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('1'));
      expect(input.value).toBe('1');
      
      fireEvent.click(screen.getByText('2'));
      expect(input.value).toBe('12');
      
      fireEvent.click(screen.getByText('3'));
      expect(input.value).toBe('123');
    });

    it('should correctly append operators to the input', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('+'));
      expect(input.value).toBe('5+');
      
      fireEvent.click(screen.getByText('3'));
      expect(input.value).toBe('5+3');
    });

    it('should append multiple operators and numbers', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('*'));
      fireEvent.click(screen.getByText('4'));
      
      expect(input.value).toBe('2+3*4');
    });

    it('should clear error message when appending after an error', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      // Create an invalid expression
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('='));
      
      // Error message should appear
      expect(screen.getByRole('alert')).toHaveTextContent('Expresión inválida');
      
      // Append a number
      fireEvent.click(screen.getByText('5'));
      
      // Error message should be cleared
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('limpiar function', () => {
    it('should correctly clear the input', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      // Add some content
      fireEvent.click(screen.getByText('1'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('3'));
      expect(input.value).toBe('123');
      
      // Clear the input
      fireEvent.click(screen.getByText('C'));
      expect(input.value).toBe('');
    });

    it('should clear error messages', () => {
      render(<App />);
      
      // Create an invalid expression
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('='));
      
      // Error message should appear
      expect(screen.getByRole('alert')).toHaveTextContent('Expresión inválida');
      
      // Clear
      fireEvent.click(screen.getByText('C'));
      
      // Error message should be cleared
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should clear both input and error messages together', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      // Create an invalid expression
      fireEvent.click(screen.getByText('*'));
      fireEvent.click(screen.getByText('='));
      
      // Verify error message
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      // Clear
      fireEvent.click(screen.getByText('C'));
      
      // Both should be cleared
      expect(input.value).toBe('');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('calcular function', () => {
    beforeEach(() => {
      // Mock window.confetti to avoid errors
      global.window.confetti = vi.fn();
    });

    it('should correctly evaluate a simple addition', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('='));
      
      expect(input.value).toBe('5');
    });

    it('should correctly evaluate a simple subtraction', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('9'));
      fireEvent.click(screen.getByText('-'));
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('='));
      
      expect(input.value).toBe('5');
    });

    it('should correctly evaluate a simple multiplication', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('*'));
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('='));
      
      expect(input.value).toBe('12');
    });

    it('should correctly evaluate a simple division', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('8'));
      fireEvent.click(screen.getByText('/'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      
      expect(input.value).toBe('4');
    });

    it('should correctly evaluate complex expressions with operator precedence', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('3'));
      fireEvent.click(screen.getByText('*'));
      fireEvent.click(screen.getByText('4'));
      fireEvent.click(screen.getByText('='));
      
      expect(input.value).toBe('14'); // 2 + (3 * 4) = 14
    });

    it('should handle invalid expression and show error message', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('='));
      
      expect(screen.getByRole('alert')).toHaveTextContent('Expresión inválida');
      expect(input.value).toBe('+'); // Input should remain unchanged
    });

    it('should handle invalid expression starting with operator', () => {
      render(<App />);
      
      fireEvent.click(screen.getByText('*'));
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('='));
      
      expect(screen.getByRole('alert')).toHaveTextContent('Expresión inválida');
    });

    it('should handle empty input calculation', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('='));
      
      // Empty string evaluates to undefined
      expect(input.value).toBe('undefined');
    });

    it('should clear error message on successful calculation after previous error', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      // Create an error
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('='));
      expect(screen.getByRole('alert')).toBeInTheDocument();
      
      // Clear and enter valid expression
      fireEvent.click(screen.getByText('C'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('+'));
      fireEvent.click(screen.getByText('2'));
      fireEvent.click(screen.getByText('='));
      
      // Should show result without error
      expect(input.value).toBe('4');
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });

    it('should handle division by zero', () => {
      render(<App />);
      const input = screen.getByRole('textbox');
      
      fireEvent.click(screen.getByText('5'));
      fireEvent.click(screen.getByText('/'));
      fireEvent.click(screen.getByText('0'));
      fireEvent.click(screen.getByText('='));
      
      // Division by zero returns Infinity in JavaScript
      expect(input.value).toBe('Infinity');
    });
  });
});
