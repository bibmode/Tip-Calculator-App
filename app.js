"use strict";

const inputField = document.querySelector(".input__field");
const peopleField = document.querySelector(".people__field");
const tips = document.querySelectorAll(".tips__option");
const customTip = document.querySelector(".tips__custom");

const tipAmount = document.querySelector("#tip-amount");
const totalAmount = document.querySelector("#total-amount");

const resetBtn = document.querySelector("#reset-button");
const billError = document.querySelector(".error-msg--1");
const peopleError = document.querySelector(".error-msg--2");
const tipError = document.querySelector(".error-msg--3");

let value,
  bill,
  numOfPeople,
  check = [0, 0, 0];

////////////////////////////////////////////////////////////
// BILL VALUE INPUT
inputField.addEventListener("click", function () {
  billError.style.display = "none";

  inputField.addEventListener("mouseleave", function () {
    if (inputField.value.trim() === "" || inputField.value.trim() === "0") {
      inputField.classList.add("focus-error");
      billError.style.display = "block";
      check[0] = 0;
    } else {
      inputField.classList.remove("focus-error");
      billError.style.display = "none";
      bill = inputField.value;
      check[0] = 1;
      computeResults();
    }
  });
});

////////////////////////////////////////////////////////////
// USER PICK TIP PERCENTAGE

tips.forEach((tip) => {
  tip.addEventListener("click", function () {
    tipError.style.display = "none";
    tip.classList.remove("focus-error");

    if (tip.classList.contains("tips__custom")) {
      removeOtherActives(tips);

      tip.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.keyCode === 13) {
          if (getCustomTip(tip.value)) {
            tipError.style.display = "hidden";
            tip.classList.remove("focus-error");
            tip.blur();
            assignTipValue(tip.value);
            check[1] = 1;
            computeResults();
          } else {
            check[1] = 0;
            tipError.style.display = "block";
            tip.classList.add("focus-error");
          }
        }
      });

      tip.addEventListener("mouseleave", function () {
        if (getCustomTip(tip.value)) {
          tipError.style.display = "hidden";
          tip.classList.remove("focus-error");
          assignTipValue(tip.value);
          check[1] = 1;
          computeResults();
        } else {
          tipError.style.display = "block";
          tip.classList.add("focus-error");
          check[1] = 0;
        }
      });
    } else {
      document.querySelector(".tips__custom").value = "";
      tipError.style.display = "hidden";
      customTip.classList.remove("focus-error");

      removeOtherActives(tips);
      tip.classList.add("tip-pick");
      assignTipValue(tip.innerText.slice(0, -1));
      check[1] = 1;
      computeResults();
    }
  });
});

////////////////////////////////////////////////////////////
// BILL VALUE INPUT
peopleField.addEventListener("click", function () {
  peopleError.style.display = "none";

  peopleField.addEventListener("mouseleave", function () {
    if (peopleField.value.trim() === "" || peopleField.value.trim() === "0") {
      peopleField.classList.add("focus-error");
      peopleError.style.display = "block";

      check[2] = 0;
    } else {
      peopleField.classList.remove("focus-error");
      peopleError.style.display = "none";

      numOfPeople = peopleField.value;
      check[2] = 1;
      computeResults();
    }
  });
});

////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

const assignTipValue = function (val) {
  value = Number(val);
};

const removeOtherActives = function (tips) {
  tips.forEach((other) => {
    other.classList.remove("tip-pick");
  });
};

////////////////////////////////////////////////////////////
// COMPUTE RESULTS

const computeResults = function () {
  let ensure = 0;
  check.forEach((val) => {
    if (val === 1) ensure++;
  });

  if (ensure === 3) {
    const calcTip = (Number(bill) * (value / 100)) / Number(numOfPeople);
    const calcTotal = Number(bill) / Number(numOfPeople);

    tipAmount.innerText = `$${calcTip.toFixed(2)}`;
    totalAmount.innerText = `$${(calcTotal + calcTip).toFixed(2)}`;
  }
};

////////////////////////////////////////////////////////////
// RESET

resetBtn.addEventListener("click", function () {
  inputField.value = "";
  peopleField.value = "";
  tipAmount.innerText = "$0.00";
  totalAmount.innerText = "$0.00";
  removeOtherActives(tips);
  check = [0, 0, 0];
});

////////////////////////////////////////////////////////////
// CHECK CUSTOM TIP

const getCustomTip = function (customInput) {
  console.log(customInput);

  if (customInput === null || customInput.trim() === "0") return false;
  else return true;
};
