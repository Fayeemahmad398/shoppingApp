let noOfItems = 0;
let totalAmount = 0;
let checkList = document.querySelector(".itemBox");
let total = document.querySelector(".total");

function showDataOnList() {
  if (
    !localStorage.getItem("arrOfCarts") ||
    JSON.parse(localStorage.getItem("arrOfCarts")).length == 0
  ) {
    checkList.innerHTML = ``;
    document.getElementById("msgNocart").textContent = "Oops! No Item in Cart ";
    document.getElementById("cartImg").style.display = "block";
    document.getElementById("cartImg").classList.add("shakingeffect");
    setTimeout(() => {
      document.getElementById("cartImg").classList.remove("shakingeffect");
    }, 3000);
    document.querySelector("main").style.display = "block";
    totalAmount = 0;
    total.innerHTML = ` <strong>Total</strong>
    <strong>${totalAmount}$</strong>`;
  } else {
    document.querySelector("main").style.display = "grid";

    document.getElementById("cartImg").style.display = "none";
    document.getElementById("msgNocart").textContent = "MY Cart";

    let cartproducts = JSON.parse(localStorage.getItem("arrOfCarts"));
    let products = document.querySelector(".Products");
    checkList.innerHTML = ``;
    products.innerHTML = ``;
    total.innerHTML = ``;
    totalAmount = calCulateCost();

    cartproducts.forEach((product) => {
      noOfItems++;
      products.innerHTML += `
            <div class="card" id=${product.id}>
            <div id="img">
              <img src=${product.imgUrl} alt="img" />
            </div>
            <div class="title">
              <p>Title :${product.title.slice(0, 12)}...</p>
            </div>
            <div id="dollarsize">
              <p>Price :${product.price}$</p>
              <p>${product.size.toString()}</p>
            </div>
            <div id="colors">
              colors:
              <div class="color1"style="background-color:${
                product.color[0]
              };"></div>
              <div class="color1"style="background-color:${
                product.color[1]
              };"></div>
              <div class="color1"style="background-color:${
                product.color[2]
              };"></div>
            </div>
            <div id="rating">
              <p>
                Rating :${Math.round(product.rating)}
              </p>
              <span class="material-icons start">
                star
              </span>
            </div>
            <button class="addCart" onClick="removeItem(this)">
              <a>Remove Item</a>
            </button>
          </div>
            `;
      checkList.innerHTML += `
            <div class="line">
              <div class="left-content">
                <span>${noOfItems}.</span>
                <span>${product.title.slice(0, 35)}  ==></span>
              </div>
              <span>${product.price}$</span>
            </div>
            `;
    });
    total.innerHTML = ` <strong>Total</strong>
    <strong>${totalAmount}$</strong>`;
  }
}
function calCulateCost() {
  let sum = 0;
  let cartProduct = JSON.parse(localStorage.getItem("arrOfCarts") || []);
  for (let i = 0; i < cartProduct.length; i++) {
    sum += cartProduct[i].price;
  }
  console.log(sum);
  return sum.toFixed(2);
}
showDataOnList();

function removeItem(element) {
  // console.log(element.parentElement.id);
  let cart = JSON.parse(localStorage.getItem("arrOfCarts"));

  // console.log(cart);
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].id == element.parentElement.id) {
      cart.splice(i, 1);
      element.parentElement.remove();
      break;
    }
  }
  // console.log(cart);

  localStorage.setItem("arrOfCarts", JSON.stringify(cart));
  noOfItems = 0;

  showDataOnList();
}

document.getElementById("signup").onclick = function () {
  alert("You have already signed up");
};

document.getElementById("loginpage").onclick = function () {
  alert("You have already logged in !");
};

document.getElementById("checkListBtn").addEventListener("click", () => {
  document.getElementById("checkListBtn").classList.add("shakingeffect");
  setTimeout(() => {
    document.getElementById("checkListBtn").classList.remove("shakingeffect");
  }, 3000);
  if (
    !localStorage.getItem("arrOfCarts") ||
    JSON.parse(localStorage.getItem("arrOfCarts")).length == 0
  ) {
    alert("Add Some items in your cart please !");
    window.location.href = "../HomePage/homepage.html";
    return;
  } else {
    window.location.href = "../razorPay/razorpay.html";
  }
});
document.querySelector(".hamberger").addEventListener("click", function () {
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
});
