document.getElementById("cartBtn").onclick = function () {
  alert("Please log in first !");
  return;
};

document.getElementById("profilebtn").onclick = function () {
  alert("Please log in first !");
};

document.querySelector(".hamberger").addEventListener("click", function () {
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
});
