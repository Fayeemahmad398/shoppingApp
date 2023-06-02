const signup_btn = document.getElementById("loginBtn");
var all_Saved_Users = [];

signup_btn.addEventListener("click", HandleSignup);

function HandleSignup(event) {
  event.preventDefault();
  const first_name = document.getElementById("first-name").value.trim();
  const last_name = document.getElementById("last-name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm_pass = document.getElementById("cnfPass").value.trim();

  if (
    password === confirm_pass &&
    first_name != "" &&
    last_name != "" &&
    email != "" &&
    password != ""
  ) {
    all_Saved_Users = JSON.parse(localStorage.getItem("all_Saved_Users")) || [];
    // console.log(all_Saved_Users);
    let email_used_user;

    // console.log(Array.isArray(all_Saved_Users));
    for (let i = 0; i < all_Saved_Users.length; i++) {
      if (all_Saved_Users[i].email === email) {
        email_used_user = all_Saved_Users[i];
        break;
      }
    }

    if (email_used_user != undefined) {
      alert("This email is already used please try something something else !");
      document.getElementById("email").value = "";
      return;
    }

    let user = {
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      confirm_pass: confirm_pass,
    };

    all_Saved_Users.push(user);

    localStorage.setItem("all_Saved_Users", JSON.stringify(all_Saved_Users));
    window.location.href = "../login/login.html";
  } else {
    alert("Please all information properly");
  }
}
let cartbtn = document.getElementById("cartbtn");
cartbtn.onclick = function () {
  alert("Please Sign up First!");
};

// window.onbeforeunload = () => {
//   localStorage.setItem("all_Saved_Users", JSON.stringify(all_Saved_Users));
// };
document.getElementById("profilebtn").onclick = function () {
  alert("Please sign up first!");
};
document.querySelector(".hamberger").addEventListener("click", function () {
  document.querySelector(".NavbarUl").classList.toggle("boxicon");
});
