import { useEffect } from 'react';

const useKeyboard = (handlers) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      // Números 0-9
      if (/^[0-9]$/.test(key)) {
        handlers.onNumber?.(key);
        return;
      }

      // Operadores básicos
      if (["+", "-", "*", "/"].includes(key)) {
        handlers.onOperator?.(key);
        return;
      }

      // Enter => calcular
      if (key === "Enter") {
        e.preventDefault();
        handlers.onCalculate?.();
        return;
      }

      // Backspace => borrar último carácter
      if (key === "Backspace") {
        e.preventDefault();
        handlers.onDelete?.();
        return;
      }

      // 'c' o 'C' => limpiar
      if (key.toLowerCase() === "c") {
        handlers.onClear?.();
        return;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handlers]);
};

export default useKeyboard;