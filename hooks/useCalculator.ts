import { useEffect, useRef, useState } from "react";

enum Operator {
  add = "+",
  multiply = "x",
  subtract = "-",
  divide = "÷",
}

export const useCalculator = () => {
  const [formula, setFormula] = useState("");
  const [number, setNumber] = useState("0");
  const [prevNumber, setPrevNumber] = useState("0");

  const lastOperation = useRef<Operator>();

  useEffect(() => {
    if (lastOperation.current) {
      const firstFormulaPart = formula.split(" ")[0];
      setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
    } else {
      setFormula(number);
    }
  }, [number]);

  useEffect(() => {
    const subResult = calculateOperations();
    setPrevNumber(`${subResult}`);
  }, [formula]);

  const clean = () => {
    setNumber("0");
    setFormula("0");
    setPrevNumber("0");

    lastOperation.current = undefined;
  };

  const toggleSign = () => {
    if (number.includes("-")) {
      return setNumber(number.replace("-", ""));
    }
    return setNumber("-" + number);
  };

  const deleteLast = () => {
    if (
      number.length === 1 ||
      (number.length === 2 && number.startsWith("-"))
    ) {
      return setNumber("0");
    }
    setNumber(number.slice(0, -1));
  };

  const setLastNumber = () => {
    calculateResult();
    if (number.endsWith(".")) {
      setNumber("0");
      setPrevNumber(number.slice(0, -1));
    } else {
      setPrevNumber(number);
      setNumber("0");
    }
  };

  const divideOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.divide;
  };
  const multiplyOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.multiply;
  };
  const addOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.add;
  };
  const subtractOperation = () => {
    setLastNumber();
    lastOperation.current = Operator.subtract;
  };

  const calculateOperations = () => {
    const [firstValue, operation, secondValue] = formula.split(" ");

    const num1 = Number(firstValue);
    const num2 = Number(secondValue);

    if (isNaN(num2)) return num1;

    switch (operation) {
      case Operator.add:
        return num1 + num2;
      case Operator.subtract:
        return num1 - num2;
      case Operator.divide:
        return num1 / num2;
      case Operator.multiply:
        return num1 * num2;
      default:
        throw new Error(`Operation ${operation} not implemented`);
    }
  };

  const calculateResult = () => {
    const result = calculateOperations();

    setFormula(`${result}`);
    lastOperation.current = undefined;
    setPrevNumber("0");
  };

  const buildNumber = (numberString: string) => {
    if (number.includes(".") && numberString === ".") return;
    if (number.startsWith("0") || number.startsWith("-0")) {
      if (numberString === ".") {
        return setNumber(number + numberString);
      }
      //Evaluar si es otro cero y hay punto
      if (numberString === "0" && number.includes(".")) {
        return setNumber(number + numberString);
      }

      //Evaluar si es diferente de cero, no hay punto y es el primer numero
      if (numberString !== "0" && !number.includes(".")) {
        return setNumber(numberString);
      }

      //Evitar la concatenacion de ceros
      if (numberString === "0" && !number.includes(".")) {
        return;
      }
    }

    setNumber(number + numberString);
  };

  return {
    number,
    prevNumber,
    formula,

    //Methods
    buildNumber,
    clean,
    toggleSign,
    deleteLast,

    //Operations
    divideOperation,
    multiplyOperation,
    addOperation,
    subtractOperation,
    calculateResult,
  };
};
