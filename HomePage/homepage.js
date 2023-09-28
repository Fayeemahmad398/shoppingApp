import { hanldeHamberger } from "../handleHamber.js";

function NoIllegelAccess() {
  if (!localStorage.getItem("single_user")) {
    window.location.href = `../login/login.html`;
    return;
  }
}

NoIllegelAccess(); //cheking if someone enter to shop without token ,just pulled him out

const products = document.querySelector(".Products");
var modfiedArrOfItems = [];
const url = "https://fakestoreapi.com/products";
let allCartBtns;

async function getDataFromApi() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    console.log(data);
    modifiedData(data);
  } catch (error) {
    console.log(error);
  }
}

getDataFromApi();
//modified the array and stored in local storage
function modifiedData(dataArr) {
  dataArr.forEach((obj) => {
    let color = generateColor();
    let size = generateSize();
    let item = {
      id: obj.id,
      title: obj.title,
      category: obj.category,
      description: obj.description,
      imgUrl: obj.image,
      price: obj.price,
      rating: Math.round(obj.rating.rate),
      color: color,
      size: size,
    };
    modfiedArrOfItems.push(item);
  });

  localStorage.setItem("modfiedArrOfItems", JSON.stringify(modfiedArrOfItems));

  document.querySelector(".circleloader").style.display = "none";
  document.querySelector(".loader").style.display = "none";

  console.log(document.querySelector(".circleloader"));
  ShowBrands(modfiedArrOfItems);
}

// generating the random color
function generateColor() {
  let colors3 = [];
  let colors = ["red", "blue", "green", "grey", "black"];
  while (true) {
    let genColor = colors[Math.floor(Math.random() * colors.length)];
    if (!colors3.includes(genColor)) {
      colors3.push(genColor);
      if (colors3.length == 3) {
        return colors3;
      }
    }
  }
}

// generating the random size
function generateSize() {
  let sizeArr = ["S", "M", "L", "XL"];
  let Size3 = [];
  while (true) {
    let genSize = sizeArr[Math.floor(Math.random() * sizeArr.length)];
    if (!Size3.includes(genSize)) {
      Size3.push(genSize);
      if (Size3.length == 3) {
        return Size3;
      }
    }
  }
}

// showing the products on UI

function ShowBrands(brandsInfoArr) {
  products.innerHTML = "";

  // document.querySelector(".Products").style.display = "grid";

  if (brandsInfoArr.length == 0) {
    products.innerHTML = ` <h1 id="NoData">Oops! No data found on these filters !</h1>`;
    // document.querySelector(".Products").style.display = "block";
  }

  brandsInfoArr.forEach((card) => {
    products.innerHTML += `
    <div class="card" id=${card.id}>
    <div id="img">
    <img
        src="${card.imgUrl}"
        alt="img"
      />
    </div>
    <div class="title">
      <p>Title :${card.title.slice(0, 12)}...</p>
      <hr/>
    </div>
    <div class="dollarsize">
      <p>Price :${card.price}$</p>
      <p>${card.size.toString()}</p>
    </div>
    <div id="colors">
      Colors:
      <div class="color1" style="background-color:${card.color[0]};"></div>
      <div class="color2"style="background-color:${card.color[1]};"></div>
      <div class="color3" style="background-color:${card.color[2]};"></div>
    </div>
    <div id="rating">
      <p>
        Rating  :${Math.round(card.rating)}
      </p>
      <span class="material-icons start">
        star
      </span>
    </div>
    <button class="addCart">
      <a href=""> Add to Cart</a>
    </button>
    </div>
    `;
  });
  allCartBtns = document.getElementsByClassName("addCart");
  holdingAllcartBtns(allCartBtns);
}

// .................................................................
// searching task
document.getElementById("search").focus = function () {
  document.getElementById("search").classList.add("searchagain");
};

const AllCards = document.getElementsByClassName("card");

const search = document.getElementById("search");
document.getElementById("search").addEventListener("keyup", () => {
  let inputval = search.value.trim().toLowerCase();
  for (let i = 0; i < AllCards.length; i++) {
    // console.log("working");
    let title = AllCards[i].querySelector(".title").innerText.toLowerCase();
    title = title.slice(7);
    console.log(title);
    if (title.includes(inputval)) {
      AllCards[i].style.display = "block";
    } else {
      AllCards[i].style.display = "none";
    }
  }
});
// // ...................................................................................
// fitler task is done here
function allSelcetedColors() {
  //maping which color input element  ware checked
  let colors = [];
  let colorsEle = document.querySelectorAll(".colorAll");
  colorsEle.forEach((element) => {
    if (element.checked) {
      colors.push(element.value);
    }
  });
  return colors;
}

function allSelcetedSizes() {
  //maping which size input element  ware checked
  let allSizeEle = document.querySelectorAll(".sizesAll");
  let sizes = [];
  allSizeEle.forEach((element) => {
    if (element.checked) {
      sizes.push(element.value);
    }
  });
  return sizes;
}

function allSelcetedRange() {
  //checking what price range  been selected by user
  let prices = [];
  let pricesEle = document.querySelectorAll(".filterprice");
  pricesEle.forEach((element) => {
    if (element.checked) {
      prices.push(element.value);
    }
  });
  return prices;
}
let filteredMapedObject = {};
// created a object to map all all the inputs array checked ones
let applyBtn = document.getElementById("filter-apply-btn");

applyBtn.addEventListener("click", (event) => {
  document.querySelector(".leftSection").classList.toggle("leftSection2");
  document.querySelector(".expandmore").textContent = "expand_less";

  //applying the filter,on basis conditions, selected as per need
  let selectedColors = allSelcetedColors();
  let selectedSizes = allSelcetedSizes();
  let selectedRanges = allSelcetedRange();
  let ratingValue = document.getElementById("ratingrange").value;

  filteredMapedObject.myColors = selectedColors;
  filteredMapedObject.mySizes = selectedSizes;
  filteredMapedObject.myRange = selectedRanges;
  filteredMapedObject.Rating = ratingValue;
  // console.log(filteredMapedObject);
  filterProductsFromModifiedArr();
});

function filterProductsFromModifiedArr() {
  //filtering applied here
  var filteredOn4filters = [];
  for (let i = 0; i < modfiedArrOfItems.length; i++) {
    let agree = 0;
    if (filteredMapedObject.myColors.length == 0) {
      //taking all products which were not selected by user
      agree++;
    } else if (
      filteredMapedObject.myColors.includes(modfiedArrOfItems[i].color[0]) ||
      filteredMapedObject.myColors.includes(modfiedArrOfItems[i].color[1]) ||
      filteredMapedObject.myColors.includes(modfiedArrOfItems[i].color[2])
    ) {
      agree++;
    }
    if (filteredMapedObject.mySizes.length == 0) {
      agree++;
    } else if (
      filteredMapedObject.mySizes.includes(modfiedArrOfItems[i].size[0]) ||
      filteredMapedObject.mySizes.includes(modfiedArrOfItems[i].size[1]) ||
      filteredMapedObject.mySizes.includes(modfiedArrOfItems[i].size[2])
    ) {
      agree++;
    }
    if (parseInt(filteredMapedObject.Rating) == 1) {
      agree++;
    } else if (
      parseInt(filteredMapedObject.Rating) === modfiedArrOfItems[i].rating
    ) {
      agree++;
    }

    if (filteredMapedObject.myRange.length == 0) {
      agree++;
    } else
      for (let j = 0; j < filteredMapedObject.myRange.length; j++) {
        let low = parseInt(filteredMapedObject.myRange[j].split("-")[0]);
        let high = parseInt(filteredMapedObject.myRange[j].split("-")[1]);
        if (
          modfiedArrOfItems[i].price >= low &&
          modfiedArrOfItems[i].price <= high
        ) {
          agree++;
          break;
        }
      }
    if (agree == 4) {
      filteredOn4filters.push(modfiedArrOfItems[i]);
    }
  }
  colorbtn();
  ShowBrands(filteredOn4filters);
}

function forUncheckedInput() {
  let allInputs = document.getElementsByClassName("allCategories");
  for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].checked = false;
  }
  // allInputs.
}

//filter on category basis
let allButtons = document.querySelectorAll(".category");

for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", (event) => {
    filterOncategoryBasis(event.target.value);
    document.querySelector(`input[type="range"]`).value = "0";
    event.target.classList.add("shakingeffect");
    setTimeout(() => {
      event.target.classList.remove("shakingeffect");
    }, 500);

    colorbtn();
    allButtons[i].style.backgroundColor = "grey";
    allButtons[i].style.color = "red";
  });
}

function colorbtn() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.backgroundColor = "black";
    allButtons[i].style.color = "white";
  }
}
//function filtering on clothes category basis
function filterOncategoryBasis(category) {
  let categoryArr = [];
  for (let i = 0; i < modfiedArrOfItems.length; i++) {
    if (modfiedArrOfItems[i].category == category) {
      categoryArr.push(modfiedArrOfItems[i]);
    }
  }
  if (categoryArr.length == 0) {
    ShowBrands(modfiedArrOfItems);
  } else {
    ShowBrands(categoryArr);
  }
  forUncheckedInput();
}
// ---------------------------------------
var arrOfCarts = [];
function holdingAllcartBtns(allButtons) {
  allCartBtns = allButtons;
  for (let i = 0; i < allCartBtns.length; i++) {
    allCartBtns[i].onclick = (event) => {
      event.preventDefault();
      allCartBtns[i].classList.add("shakingeffect");
      setTimeout(() => {
        allCartBtns[i].classList.remove("shakingeffect");
      }, 500);

      if (event.target.innerText == "Added") {
        return;
      }
      event.target.innerText = "Added";

      let data = JSON.parse(localStorage.getItem("modfiedArrOfItems"));
      let obj;
      data.forEach((obj1) => {
        if (obj1.id == event.target.parentElement.parentElement.id) {
          obj = obj1;
        }
      });

      if (!localStorage.getItem("arrOfCarts")) {
        arrOfCarts.push(obj);
        localStorage.setItem("arrOfCarts", JSON.stringify(arrOfCarts));
      } else {
        arrOfCarts = JSON.parse(localStorage.getItem("arrOfCarts"));
        if (!arrOfCarts.includes(obj)) {
          arrOfCarts.push(obj);
        }
        localStorage.setItem("arrOfCarts", JSON.stringify(arrOfCarts));
      }
    };
  }
}

// -----------------------------------------------------------------

document.getElementById("loginpage").onclick = function () {
  alert("You have already logged in");
};

document.getElementById("signup").onclick = function () {
  alert("You have already signed up");
};

document.querySelector(".hamberger").addEventListener("click", function () {
  hanldeHamberger();
});

document.getElementById("clickToSort").onclick = function () {
  document.querySelector(".leftSection").classList.toggle("leftSection2");
  if (document.querySelector(".expandmore").textContent === "expand_more") {
    document.querySelector(".expandmore").textContent = "expand_less";
  } else {
    document.querySelector(".expandmore").textContent = "expand_more";
  }
};
