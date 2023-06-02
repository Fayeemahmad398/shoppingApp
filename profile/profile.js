const firstNameEle = document.getElementById("firstname");
const lastNameEle = document.getElementById("lastname");
const oldpass = document.getElementById("oldpass");
const newpass = document.getElementById("newpass");
const cnfpass = document.getElementById("cnfpass");
const savebtn = document.getElementById("savebtn");
const change_pass_btn = document.getElementById("change_pass_btn");

// if(localStorage.getItem())

let savedAllUsers = JSON.parse(localStorage.getItem("all_Saved_Users"));

let currUser = JSON.parse(localStorage.getItem("single_user")) || [];
if (currUser.length != 0) {
  firstNameEle.value = currUser.first_name;
  lastNameEle.value = currUser.last_name;
}

savebtn.addEventListener("click", saveInfo);

function saveInfo(event) {
  event.preventDefault();

  if (firstNameEle.value.trim() && lastNameEle.value.trim()) {
    currUser.first_name = firstNameEle.value.trim();
    currUser.last_name = lastNameEle.value.trim();
    let index;

    savedAllUsers.forEach((user, ind) => {
      if (currUser.email === user.email) {
        index = ind;
      }
    });

    savedAllUsers[index] = currUser;

    localStorage.setItem("single_user", JSON.stringify(currUser));
    localStorage.setItem("all_Saved_Users", JSON.stringify(savedAllUsers));
  }
}

change_pass_btn.addEventListener("click", change_pass_fun);

function change_pass_fun() {
  if (currUser.password === oldpass.value.trim()) {
    if (newpass.value.trim() === cnfpass.value.trim()) {
      currUser.password = newpass.value.trim();
      currUser.confirm_pass = cnfpass.value.trim();
      let ind;
      localStorage.setItem("single_user", JSON.stringify(currUser));
      savedAllUsers.forEach((user, index) => {
        if (user.email === currUser.email) {
          ind = index;
        }
      });

      savedAllUsers[ind] = currUser;
      localStorage.setItem("all_Saved_Users", JSON.stringify(savedAllUsers));
    } else {
      alert("confirm password should be same as new password");
    }
  } else {
    alert("Password is not correct check it please");
  }
}

document.getElementById("logout").onclick = function (event) {
  event.preventDefault();
  let currUser = JSON.parse(localStorage.getItem("single_user"));
  delete currUser.token;
  localStorage.setItem("single_user", JSON.stringify(currUser));
  localStorage.removeItem("single_user");
  window.location.href = `../login/login.html`;
};
