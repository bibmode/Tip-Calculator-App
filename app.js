"use strict";

const inputField = document.querySelector(".input__field");
const peopleField = document.querySelector(".people__field");
const tips = document.querySelectorAll(".tips__option");

let value;

tips.forEach((tip) => {
  tip.addEventListener("click", function () {
    if (tip.classList.contains("tips__custom")) {
      tip.addEventListener("keyup", function (e) {
        e.preventDefault();
        if (e.keyCode === 13) {
          tip.blur();
          assignTipValue(tip.value);
        }
      });

      tip.addEventListener("mouseleave", function () {
        assignTipValue(tip.value);
      });
    } else {
      assignTipValue(tip.innerText.slice(0, -1));
    }
  });
});

const assignTipValue = function (val) {
  value = Number(val);
};
