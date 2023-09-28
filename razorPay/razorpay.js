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
    location.href = "../cart/cart.html";
    return;
  }
  payBillFunc();
};

/*
<html>
<button id="rzp-button1" class="btn btn-outline-dark btn-lg"><i class="fas fa-money-bill"></i> Own Checkout</button>
<script src="https://checkout.razorpay.com/v1/checkout.js"></script>
<script>
  var options = {
    "key": "[YOUR_KEY_ID]", // Enter the Key ID generated from the Dashboard
    "amount": "1000",
    "currency": "INR",
    "description": "Acme Corp",
    "image": "https://s3.amazonaws.com/rzp-mobile/images/rzp.jpg",
    "prefill":
    {
      "email": "gaurav.kumar@example.com",
      "contact": +919900000000,
    },
    config: {
      display: {
        blocks: {
          utib: { //name for Axis block
            name: "Pay using Axis Bank",
            instruments: [
              {
                method: "card",
                issuers: ["UTIB"]
              },
              {
                method: "netbanking",
                banks: ["UTIB"]
              },
            ]
          },
          other: { //  name for other block
            name: "Other Payment modes",
            instruments: [
              {
                method: "card",
                issuers: ["ICIC"]
              },
              {
                method: 'netbanking',
              }
            ]
          }
        },
        hide: [
          {
          method: "upi"
          }
        ],
        sequence: ["block.utib", "block.other"],
        preferences: {
          show_default_blocks: false // Should Checkout show its default blocks?
        }
      }
    },
    "handler": function (response) {
      alert(response.razorpay_payment_id);
    },
    "modal": {
      "ondismiss": function () {
        if (confirm("Are you sure, you want to close the form?")) {
          txt = "You pressed OK!";
          console.log("Checkout form closed by the user");
        } else {
          txt = "You pressed Cancel!";
          console.log("Complete the Payment")
        }
      }
    }
  };
  var rzp1 = new Razorpay(options);
  document.getElementById('rzp-button1').onclick = function (e) {
    rzp1.open();
    e.preventDefault();
  }
</script>
</html>


*/

function payBillFunc(e) {
  var obj = {
    // key: "rzp_test_PV1oQ0oMtgXOsq",
    key: "rzp_test_4QRLejpsxXKHz7",
    // ,5YK20EpLUf1Ok5soPFRJ39T4"
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
