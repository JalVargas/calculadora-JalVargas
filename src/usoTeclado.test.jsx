import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import usoTeclado from './usoTeclado';

describe('usoTeclado hook', () => {
  let setInput;
  let calcular;
  let input;

  beforeEach(() => {
    input = '';
    setInput = vi.fn((callback) => {
      if (typeof callback === 'function') {
        input = callback(input);
      } else {
        input = callback;
      }
    });
    calcular = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('numeric key presses', () => {
    it('should handle single digit key press', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '5' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('5');
    });

    it('should handle multiple numeric key presses', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '1' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
      });
      
      expect(setInput).toHaveBeenCalledTimes(3);
      expect(input).toBe('123');
    });

    it('should handle zero key press', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '0' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('0');
    });

    it('should handle all digits 0-9', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
      
      digits.forEach(digit => {
        act(() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { key: digit }));
        });
      });
      
      expect(setInput).toHaveBeenCalledTimes(10);
      expect(input).toBe('0123456789');
    });

    it('should append numeric keys to existing input', () => {
      input = '42';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '7' }));
      });
      
      expect(input).toBe('427');
    });
  });

  describe('operator key presses', () => {
    it('should handle addition operator', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('+');
    });

    it('should handle subtraction operator', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '-' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('-');
    });

    it('should handle multiplication operator', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '*' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('*');
    });

    it('should handle division operator', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '/' }));
      });
      
      expect(setInput).toHaveBeenCalled();
      expect(input).toBe('/');
    });

    it('should append operators to existing input', () => {
      input = '5';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
      });
      
      expect(input).toBe('5+');
    });

    it('should handle mixed numbers and operators', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '2' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '3' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '*' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: '4' }));
      });
      
      expect(input).toBe('2+3*4');
    });
  });

  describe('Enter key press (calculation)', () => {
    it('should trigger calculation on Enter key', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      act(() => {
        window.dispatchEvent(event);
      });
      
      expect(calcular).toHaveBeenCalledTimes(1);
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should prevent default behavior on Enter key', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      const event = new KeyboardEvent('keydown', { key: 'Enter', cancelable: true });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      act(() => {
        window.dispatchEvent(event);
      });
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should call calcular function with current input', () => {
      input = '5+3';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
      });
      
      expect(calcular).toHaveBeenCalled();
    });
  });

  describe('C key press (clear)', () => {
    it('should clear input on lowercase "c" key', () => {
      input = '123';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
      });
      
      expect(setInput).toHaveBeenCalledWith('');
      expect(input).toBe('');
    });

    it('should clear input on uppercase "C" key', () => {
      input = '456';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'C' }));
      });
      
      expect(setInput).toHaveBeenCalledWith('');
      expect(input).toBe('');
    });

    it('should clear complex expressions', () => {
      input = '2+3*4';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
      });
      
      expect(input).toBe('');
    });

    it('should work when input is already empty', () => {
      input = '';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'c' }));
      });
      
      expect(setInput).toHaveBeenCalledWith('');
      expect(input).toBe('');
    });
  });

  describe('Backspace key press', () => {
    it('should delete last character on Backspace', () => {
      input = '123';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      const event = new KeyboardEvent('keydown', { key: 'Backspace' });
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault');
      
      act(() => {
        window.dispatchEvent(event);
      });
      
      expect(input).toBe('12');
      expect(preventDefaultSpy).toHaveBeenCalled();
    });

    it('should handle multiple Backspace presses', () => {
      input = '123';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      });
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      });
      
      expect(input).toBe('1');
    });

    it('should handle Backspace on empty input', () => {
      input = '';
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Backspace' }));
      });
      
      expect(input).toBe('');
    });
  });

  describe('cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
      
      const { unmount } = renderHook(() => usoTeclado(input, setInput, calcular));
      
      unmount();
      
      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
      
      removeEventListenerSpy.mockRestore();
    });
  });

  describe('non-handled keys', () => {
    it('should not trigger any action for letter keys (except C)', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
      });
      
      expect(setInput).not.toHaveBeenCalled();
      expect(calcular).not.toHaveBeenCalled();
    });

    it('should not trigger any action for special keys', () => {
      renderHook(() => usoTeclado(input, setInput, calcular));
      
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Shift' }));
      });
      
      expect(setInput).not.toHaveBeenCalled();
      expect(calcular).not.toHaveBeenCalled();
    });
  });
});
