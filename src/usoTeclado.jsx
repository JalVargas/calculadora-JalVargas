import { useEffect } from 'react';

const usoTeclado = (input, setInput, calcular) => {
  useEffect(() => {
    const manejarTecla = (e) => {
      const tecla = e.key;

      // Números 0-9
      if (/^[0-9]$/.test(tecla)) {
        setInput(prev => prev + tecla);
        return;
      }

      // Operadores básicos
      if (["+", "-", "*", "/"].includes(tecla)) {
        setInput(prev => prev + tecla);
        return;
      }

      // Enter => calcular
      if (tecla === "Enter") {
        e.preventDefault();
        calcular();
        return;
      }

      // Backspace => borrar último carácter
      if (tecla === "Backspace") {
        e.preventDefault();
        setInput(prev => prev.slice(0, -1));
        return;
      }

      // 'c' o 'C' => limpiar
      if (tecla.toLowerCase() === "c") {
        setInput("");
        return;
      }
    };

    window.addEventListener("keydown", manejarTecla);
    return () => window.removeEventListener("keydown", manejarTecla);
  }, [input, setInput, calcular]);
};

export default usoTeclado;
