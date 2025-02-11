import React, { useState } from "react";
import "./App.css";

function Calculator() {
  const [expression, setExpression] = useState("");
  const [resultDisplayed, setResultDisplayed] = useState(false);

  // Atualiza o display com números e operadores
  const handleInput = (value) => {
    setExpression((prev) => {
      // Se o usuário pressionou "=" e digita um número, inicia um novo cálculo
      if (resultDisplayed && !isNaN(value)) {
        setResultDisplayed(false);
        return value;
      }

      // Permite operações continuarem após "="
      if (resultDisplayed && /[\+\-\*\/]/.test(value)) {
        setResultDisplayed(false);
        return prev + value;
      }

      // Evita múltiplos zeros no início de um número
      if (prev === "0" && value === "0") return prev;
      if (/(\D)0$/.test(prev) && value === "0") return prev;
      if (prev === "0" && !isNaN(value)) return value;

      // Evita múltiplos pontos decimais no mesmo número
      if (value === ".") {
        const lastNumber = prev.split(/[\+\-\*\/]/).pop();
        if (lastNumber.includes(".")) return prev;
      }

      // Evita múltiplos operadores consecutivos, exceto o negativo "-"
      if (/[\+\-\*\/]$/.test(prev) && /[\+\*\/]/.test(value)) {
        return prev.slice(0, -1) + value;
      }

      return prev + value;
    });
  };

  // Limpa o display
  const handleClear = () => {
    setExpression("");
    setResultDisplayed(false);
  };

  // Avalia a expressão e exibe o resultado
  const handleEquals = () => {
    try {
      const result = eval(expression); // Calcula o resultado
      const roundedResult = Number.isInteger(result) ? result : parseFloat(result.toFixed(4));

      setExpression(roundedResult.toString());
      setResultDisplayed(true); // Marca que o resultado foi exibido
    } catch (error) {
      setExpression("Error");
    }
  };

  return (
    <div id="container">
      <div id="calculator">
        <div id="display">{expression || "0"}</div>
  
        <button className="operation" id="clear" onClick={handleClear}>AC</button>
        <button className="operation" id="divide" onClick={() => handleInput("/")}>÷</button>
        <button className="operation" id="multiply" onClick={() => handleInput("*")}>×</button>
        <button className="operation" id="subtract" onClick={() => handleInput("-")}>-</button>
        <button className="operation" id="add" onClick={() => handleInput("+")}>+</button>
  
        <button className="btn" id="seven" onClick={() => handleInput("7")}>7</button>
        <button className="btn" id="eight" onClick={() => handleInput("8")}>8</button>
        <button className="btn" id="nine" onClick={() => handleInput("9")}>9</button>
  
        <button className="btn" id="four" onClick={() => handleInput("4")}>4</button>
        <button className="btn" id="five" onClick={() => handleInput("5")}>5</button>
        <button className="btn" id="six" onClick={() => handleInput("6")}>6</button>
  
        <button className="btn" id="one" onClick={() => handleInput("1")}>1</button>
        <button className="btn" id="two" onClick={() => handleInput("2")}>2</button>
        <button className="btn" id="three" onClick={() => handleInput("3")}>3</button>
  
        <button className="btn" id="zero" onClick={() => handleInput("0")}>0</button>
        <button className="btn" id="decimal" onClick={() => handleInput(".")}>.</button>
        <button id="equals" onClick={handleEquals}>=</button>
      </div>
  
      <p id="line">Design e código feito por: Isabela Albuquerque</p>
    </div>
  );
  
}

export default Calculator;
