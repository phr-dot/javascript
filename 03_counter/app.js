const count = document.getElementById("count");
const btns = document.querySelectorAll(".btn");
const price = document.querySelector(".unit_price");
const sum = document.querySelector(".sum");
// console.log(btns);

let unit_price = 15000;
let num = 0;
price.textContent = unit_price;
count.textContent = num;

let total = num * unit_price;
sum.textContent = total;

const showTotal = () => {
  sum.textContent = num * unit_price;
};

btns.forEach((btn) => {
  // console.log(btn)
  btn.addEventListener("click", (e) => {
    // console.log(e.target.classList);
    if (e.target.classList.contains("plus")) {
      num++;
      showTotal();
    } else if (e.target.classList.contains("minus")) {
      num--;
      if (num <= 0) num = 0;
      showTotal();
    } else {
      num = 0;
      showTotal();
    }
    count.textContent = num;
  });
});
