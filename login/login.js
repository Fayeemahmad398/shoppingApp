const loginBtn = document.getElementById("loginBtn");
const email = document.getElementById("email");
const password = document.getElementById("password");
let Users = [];


loginBtn.addEventListener("click", function (event) {
  event.preventDefault();
  //all proper fields are checked here
  if (email.value.trim() == "" || password.value.trim() == "") {
    alert("Please Enter email and password properly");
    return;
  }

  let all_Saved_Users =
    JSON.parse(localStorage.getItem("all_Saved_Users")) || [];
  // No local storage data is there
  if (all_Saved_Users.length == 0) {
    alert("sorry, You have to signup first.");
    window.location.href = "../signupFolder/signup.html";
    return;
  }

  let single_user;
  //checking email is already been used or not
  for (let i = 0; i < all_Saved_Users.length; i++) {
    if (
      all_Saved_Users[i].email === email.value.trim() &&
      all_Saved_Users[i].password === password.value.trim()
    ) {
      single_user = all_Saved_Users[i];
      break;
    }
  }
  // current user data is not found inside already stored data in local storage
  if (!single_user) {
    alert(" User not found !Please signup first");
    return;
  }

  // making a token to eligible person to log in
  const token = generateToken();
  single_user.token = token;
  localStorage.setItem("all_Saved_Users", JSON.stringify(all_Saved_Users));

  localStorage.setItem("single_user", JSON.stringify(single_user));
  window.location.href = "../HomePage/homepage.html";
});

//need to generate the string of length of 16
function generateToken() {
  let someCharacters = "kyamastjugadh55aibhai12344DSGDF#$%$";

  let token = "";
  for (let i = 0; i < 16; i++) {
    token += someCharacters.charAt(Math.random() * someCharacters.length);
  }
  return token;
}



document.getElementById("mycart").onclick = function () {
  alert("Please login first!");
};
document.getElementById("profilebtn").onclick = function () {
  alert("Please login first!");
};
document.querySelector(".hamberger").addEventListener("click", function () {
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
});
