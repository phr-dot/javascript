const modalBtn = document.querySelector(".modal_btn");
const modal = document.querySelector(".modal_wrap");
const closeBtn = document.querySelector(".close_btn");

modalBtn.addEventListener("click", function () {
  modal.classList.add("open");
});
closeBtn.addEventListener("click", function () {
  modal.classList.remove("open");
});
