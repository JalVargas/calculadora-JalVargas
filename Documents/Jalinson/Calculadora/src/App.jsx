import { useState } from "react";
import "./App.css";
import usoTeclado from "./usoTeclado.jsx";

function App() {
  const [input, setInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const agregar = (valor) => {
    setInput((prev) => prev + valor);
    if (errorMessage) setErrorMessage("");
  };

  const limpiar = () => {
    setInput("");
    if (errorMessage) setErrorMessage("");
  };

  const calcular = () => {
    try {
      // eslint-disable-next-line no-eval
      const result = eval(input);
  setInput(String(result));
  if (errorMessage) setErrorMessage("");
      // Disparar confetti si la librería está disponible y el resultado es un número o cadena válida
      try {
        const parsed = Number(result);
        if (
          typeof window !== "undefined" &&
          window.confetti &&
          !Number.isNaN(parsed)
        ) {
          window.confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
      } catch (e) {
        // no-op: no bloquear en caso de error con confetti
      }
    } catch (err) {
      // Mostrar mensaje amigable en la UI en caso de error de cálculo
      setErrorMessage("Expresión inválida");
      // Registrar el error en consola para depuración
      // eslint-disable-next-line no-console
      console.error(err);
    }
  };

  // Usar el hook personalizado para el teclado
  usoTeclado(input, setInput, calcular);

  return (
    <div className="calculadora">
      <h2>Calculadora</h2>
      <input value={input} readOnly />
      {errorMessage && (
        <div className="error-message" role="alert">
          {errorMessage}
        </div>
      )}

      <div className="botones">
        <button onClick={() => agregar("1")}>1</button>
        <button onClick={() => agregar("2")}>2</button>
        <button onClick={() => agregar("3")}>3</button>
        <button onClick={() => agregar("+")}>+</button>

        <button onClick={() => agregar("4")}>4</button>
        <button onClick={() => agregar("5")}>5</button>
        <button onClick={() => agregar("6")}>6</button>
        <button onClick={() => agregar("-")}>-</button>

        <button onClick={() => agregar("7")}>7</button>
        <button onClick={() => agregar("8")}>8</button>
        <button onClick={() => agregar("9")}>9</button>
        <button onClick={() => agregar("*")}>*</button>

        <button onClick={() => agregar("0")}>0</button>
        <button onClick={() => agregar("/")}>/</button>

        <button onClick={limpiar}>C</button>
        <button onClick={calcular}>=</button>
      </div>
    </div>
  );
}
export default App;
