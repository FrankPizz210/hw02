(function () {
  "use strict";
  
  /*
   * This calculator object keeps track of the state of the calculator.
  */
  function Calcultor() {
    this.curNum = null;
    this.curOpr = null;
    this.prevNum = null;
    this.prevOpr = null;
    this.calculating = false;
    this.resetCur = false;
  }

  /*
   * This function resets all attributes and states of the calculator.
  */ 
  function clear() {
    calc.curNum = null;
    calc.curOpr = null;
    calc.prevNum = null;
    calc.prevOpr = null;
    calc.calculating = false;
    calc.resetCur = false;
    var view = document.getElementById("view");
    view.innerText = 0;
  }

  /*
   * This function handles all the math operations of the calculator.
  */ 
  function calculate() {
    if (calc.prevOpr === "mult") {
      return parseFloat(calc.prevNum) * parseFloat(calc.curNum);
    }
    if (calc.prevOpr === "add") {
      return parseFloat(calc.prevNum) + parseFloat(calc.curNum);
    }
    if (calc.prevOpr === "sub") {
      return parseFloat(calc.prevNum) - parseFloat(calc.curNum);
    }
    if (calc.prevOpr === "divide") {
      var quotient = parseFloat(calc.prevNum) / parseFloat(calc.curNum);
      quotient = quotient.toFixed(5);
      return quotient;
    }
  }

  /*
   * onNumPress either sets a new current value or appends to the current
   * depending of the state of the calculator.
  */ 
  function onNumPress() {
    var num = this.innerText;
    if (calc.curNum) {
      calc.curNum = calc.curNum.toString();
    }
    if (calc.curNum && calc.curNum.includes(".") && num == ".") {
      return;
    }
    var ans = null;
    var view = document.getElementById("view");
    if (calc.prevNum === null && calc.curNum === null) {
      calc.curNum = num;
    }
    else if (calc.resetCur) {
      calc.prevNum = calc.curNum;
      calc.curNum = num;
      calc.resetCur = false;
    }
    else {
      calc.curNum = calc.curNum + num;
    }
    if (ans) {
      view.innerText = ans;
    }
    else {
      view.innerText = calc.curNum;
    }
  }

  /*
    This function is used to determine what the calcultor should do when an
    operation button is clicked.
  */
  function onOprPress() {
    var view = document.getElementById("view");
    calc.curOpr = this.id;
    calc.operationClicked = true;
    if (calc.prevNum === null) {
      calc.calculating = false;
    }
    else {
      calc.calculating = true;
    }
    calc.resetCur = true;
    if (calc.calculating) {
      var ans = calculate();
      view.innerText = ans;
      calc.calculating = false;
      calc.curNum = ans;
      calc.prevNum = calc.curNum;
    }
    calc.prevOpr = calc.curOpr;
  }

  function init() {
    var nums = document.getElementsByClassName("num");
    nums = Array.from(nums);
    nums.forEach(function (num) {
      num.addEventListener("click", onNumPress);
    });
    var clc = document.getElementById("clc");
    clc.addEventListener("click", clear);
    var operators = document.getElementsByClassName("operator");
    operators = Array.from(operators);
    operators.forEach(function (opr) {
      opr.addEventListener("click", onOprPress);
    });
  }

  window.addEventListener("load", init, false);

  var calc = new Calcultor();
})();
