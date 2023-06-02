function calCulateCost() {
  let sum = 0;
  let cartProduct = JSON.parse(localStorage.getItem("arrOfCarts"));
  for (let i = 0; i < cartProduct.length; i++) {
    sum += cartProduct[i].price;
  }
  return sum.toFixed(2);
}

document.querySelector(".payNow").onclick = function () {
  if (
    !localStorage.getItem("arrOfCarts") ||
    JSON.parse(localStorage.getItem("arrOfCarts")).length == 0
  ) {
    alert("Your Cart is Empty !Please Add some items in your cart");
    location.href="../cart/cart.html";
    return;
  }
  payBillFunc();
};

function payBillFunc(e) {
  var obj = {
    key: "rzp_test_PV1oQ0oMtgXOsq",
    amount: calCulateCost() * 80 * 100,
    currency: "INR",
    name: "Fayeem Ahmad",
    description: "Here it is your order",
    theme: {
      color: "#fff",
    },
    image:
      "https://www.mintformations.co.uk/blog/wp-content/uploads/2020/05/shutterstock_583717939.jpg",
  };
  var rzpy1 = new Razorpay(obj);
  rzpy1.open();
  document.querySelector(".btn").classList.toggle("exit");

  document.querySelector(".exit").innerHTML = "Thank You, Click to Exit Please";

  document.querySelector(".exit").addEventListener("click", () => {
    window.location.href = "../cart/cart.html";
  });
  localStorage.removeItem("arrOfCarts");
  e.preventDefault();
}
document.querySelector(".hamberger").addEventListener("click", function () {
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
});
