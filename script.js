document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll("button");
  const upperNumber = document.getElementById("upperNumber");
  const lowerNumber = document.getElementById("lowerNumber");
  const operator = document.getElementById("operator");
  let firstNumber = "";
  let secondNumber = "";
  let op = "";
  const pi = Math.PI;

  buttons.forEach((button) => {
    button.addEventListener("click", function() {
      const value = button.innerText;
      if (value === "CLR") handleClear()
      else if (value === "DEL" && secondNumber) {
        secondNumber = secondNumber.slice(0, -1)
      }
      else if ((value === "π" || value === ".")
        && (secondNumber.split('.').length === 1) &&
        secondNumber.split("π").length === 1) secondNumber += value
      else if (
        value === "+" ||
        value === "-" ||
        value === "*" ||
        value === "/"
      )
        handleOperator(value);
      else if (value === "=") handleEqual()
      else if ("1234567890%".includes(value)) {
        if (secondNumber.split("π").length === 1 || value === "%") secondNumber += value;
        else {
          secondNumber = pimake(secondNumber)
          firstNumber = secondNumber
          secondNumber = ""
          secondNumber += value
          op = '*';
          operator.innerText = '*';
          upperNumber.innerText = firstNumber;
          lowerNumber.innerText = secondNumber;
        }
      }
      lowerNumber.innerText = secondNumber;
      lowerNumber.scrollLeft = lowerNumber.scrollWidth;
    });
  });

  document.addEventListener("keydown", function(event) {
    const key = event.key;
    if (key === "/") {
      event.preventDefault();
    }
    if (!isNaN(key)) {
      if (secondNumber.split("π").length === 1 || key === "%") secondNumber += key;
      else {
        secondNumber = pimake(secondNumber)
        firstNumber = secondNumber
        secondNumber = ""
        secondNumber += key
        op = '*';
        operator.innerText = '*';
        upperNumber.innerText = firstNumber;
        lowerNumber.innerText = secondNumber;
      }
    }
    if (["+", "-", "*", "/"].includes(key)) {
      handleOperator(key)
    }
    if ((key === "π" || key === ".")
      && (secondNumber.split('.').length === 1)) secondNumber += key
    if (key === "Enter") {
      handleEqual()
    }
    if (key === "Backspace") {
      secondNumber = secondNumber.slice(0, -1) || "";
    }
    if (key === "Escape") {
      handleClear()
    }
    lowerNumber.innerText = secondNumber;
    lowerNumber.scrollLeft = lowerNumber.scrollWidth;
  });

  function handleClear() {
    firstNumber = "";
    secondNumber = "";
    op = "";
    upperNumber.innerText = "";
    lowerNumber.innerText = "";
    operator.innerText = "";
  }

  function handleOperator(value) {
    if (firstNumber !== "" && secondNumber !== "" && op !== "") {
      secondNumber = pimake(secondNumber)
      let result = evaluate(firstNumber, op, secondNumber)
      result = parseFloat(result.toFixed(8))
      op = value;
      operator.innerText = value;
      upperNumber.innerText = result;
      firstNumber = result;
      lowerNumber.innerText = "";
      secondNumber = "";
    }
    else if (firstNumber && op && secondNumber === "") {
      op = value;
      operator.innerText = value;
    }
    else {
      secondNumber = pimake(secondNumber)
      secondNumber = parseFloat(secondNumber);
      firstNumber = secondNumber;
      secondNumber = "";
      op = value;
      operator.innerText = value;
      upperNumber.innerText = firstNumber;
      lowerNumber.innerText = "";
    }
  }

  function handleEqual() {
    if (firstNumber && secondNumber && op) {
      secondNumber = pimake(secondNumber)
      let result = evaluate(firstNumber, op, secondNumber)
      result = parseFloat(result.toFixed(8))
      op = "";
      operator.innerText = "";
      firstNumber = "";
      upperNumber.innerText = "";
      secondNumber = "";
      secondNumber += result;
      lowerNumber.innerText = result;
    }
    else if (firstNumber && op) {
      secondNumber = firstNumber
      lowerNumber.innerText = firstNumber;
      firstNumber = "";
      op = "";
      operator.innerText = op;
      upperNumber.innerText = firstNumber;
    }
    else if (secondNumber) {
      secondNumber = pimake(secondNumber)
      let secondNumberTemp = parseFloat(secondNumber)
      secondNumber = ""
      secondNumber += secondNumberTemp
      lowerNumber.innerText = secondNumber
    }
  }

  function evaluate(input1, op, input2) {
    input1 = input1 === "π" ? pi : input1;
    input2 = input2 === "π" ? pi : input2;
    input1 = parseFloat(input1);
    input2 = parseFloat(input2);

    if (op === "+") {
      return input1 + input2;
    } else if (op === "-") {
      return input1 - input2;
    } else if (op === "*") {
      return input1 * input2;
    } else if (op === "/") {
      return input1 / input2;
    }
  }
  function pimake(number) {
    let perocc = number.split("%").length - 1
    let num = parseFloat(number)
    for (let i = 0; i < perocc; i++) {
      num = num / 100
    }
    if (number.includes('π')) {
      num = num * pi;
    }
    return num
  }
});
