export function hanldeHamberger() {
  if (document.querySelector(".hamberger").innerText == "menu") {
    console.log("sdf1");
    document.querySelector(".hamberger").innerText = "close";
  } else {
    console.log("sdf2");
    document.querySelector(".hamberger").innerText = "menu";
  }
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
}
