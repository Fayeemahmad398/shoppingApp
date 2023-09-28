import { hanldeHamberger } from "./handleHamber.js";

document.getElementById("cartBtn").onclick = function () {
  alert("Please log in first !");
  return;
};

document.getElementById("profilebtn").onclick = function () {
  alert("Please log in first !");
};

document.querySelector(".hamberger").addEventListener("click", () => {
  hanldeHamberger();
});
