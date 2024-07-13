let sideBarInnerwidth = $(".sideBar-inner").innerWidth();
let MyData = document.getElementById("MyData");
let searchData = document.getElementById("searchData");
let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;
let submitBtn;

function ShowMeals(arr) {
  let contHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    contHTML += `<div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')" class="meals position-relative overflow-hidden rounded-2">
            <img src="${arr[i].strMealThumb}" class="w-100" alt="">
            <div class="meal-layer position-absolute d-flex align-items-center justify-content-center text-black  p-2">
                <h3>${arr[i].strMeal}</h3>
            </div>
        </div>
    </div>`;
  }
  MyData.innerHTML = contHTML;
}

async function getMealDetails(mealID) {
  MyData.innerHTML = "";
  searchData.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let responseData = await respone.json();
  displayMealDetails(responseData.meals[0]);
}

function openSideBar() {
  $("#sideBar").animate({ left: "0px" }, 600);
  $(".open-close-icon").removeClass("fa-align-justify");
  $(".open-close-icon").addClass("fa-x");
  $(".sideBar-links li").animate({ top: 200 }, 300);
  for (let i = 0; i < 5; i++) {
    $(".sideBar-links li")
      .eq(i)
      .animate({ top: 0 }, (i + 5) * 100);
  }
}
function closeSideBar() {
  $("#sideBar").animate({ left: -sideBarInnerwidth }, 600);
  $(".open-close-icon").addClass("fa-align-justify");
  $(".open-close-icon").removeClass("fa-x");
  $(".sideBar-links li").animate({ top: 300 }, 500);
}
$(document).ready(function () {
  searchByName("").then(() => {
    $(".overlay").fadeOut(10, function () {
      $("#loading").fadeOut(10, function () {
        $("body").css("overflow", "auto");
        $("#loading").remove();
      });
    });
  });

  $("#sideBar").css("left", -sideBarInnerwidth);
  $(" #sideBar .open-close-icon").click(function () {
    if ($("#sideBar").css("left") == "0px") {
      closeSideBar();
    }
     else {
      openSideBar();
    }
  });
});



async function getMealDetails(mealID) {
  MyData.innerHTML = "";
  searchData.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
  let responseData = await respone.json();
  displayMealDetails(responseData.meals[0]);
}

function displayMealDetails(meal) {
  searchData.innerHTML = "";
  let ingredients = ``;
  for (let i = 1; i <= 20; i++) {
    if (meal[`strIngredient${i}`]) {
      ingredients += `<li class="alert alert-info m-2 p-1">${
        meal[`strMeasure${i}`]
      } ${meal[`strIngredient${i}`]}</li>`;
    }
  }

  let tags = meal.strTags?.split(",");
  if (!tags) tags = [];

  let tagsStr = "";
  for (let i = 0; i < tags.length; i++) {
    tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`;
  }

  let contHTML = `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${meal.strMealThumb}"
                    alt="">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`;

            MyData.innerHTML = contHTML;
}

async function getCategories() {
  MyData.innerHTML = "";
  searchData.innerHTML = "";
  let apiResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  let responseData = await apiResponse.json();
  displayCategories(responseData.categories);
}

function displayCategories(arr) {
  let contHTML = ``;
  for (let i = 0; i < arr.length; i++) {
    contHTML += `<div class="col-md-3">
        <div onclick="getCategoryMeals('${
          arr[i].strCategory
        }')" class="meals position-relative overflow-hidden rounded-2">
            <img class="w-100" src="${
              arr[i].strCategoryThumb
            }" alt="" srcset="">
            <div class="meal-layer position-absolute text-center text-black p-2">
                <h3>${arr[i].strCategory}</h3>
                <p>${arr[i].strCategoryDescription
                  .split(" ")
                  .slice(0, 20)
                  .join(" ")}</p>
            </div>
        </div>
</div>`;
  }
  MyData.innerHTML = contHTML;
}

async function getCategoryMeals(category) {
  MyData.innerHTML = "";
  let response = await fetch( `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  let responseData = await response.json();
  ShowMeals(responseData.meals.slice(0, 20));
}

async function getArea() {
  MyData.innerHTML = "";
  searchData.innerHTML = "";

  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let responseData = await respone.json();
  displayArea(responseData.meals);
}

function displayArea(arr) {
  let contHTML = "";

  for (let i = 0; i < arr.length; i++) {
    contHTML += `
        <div class="col-md-3">
                <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center meals">
                        <i class="fa-solid fa-house-laptop fa-4x"></i>
                        <h3>${arr[i].strArea}</h3>
                </div>
        </div>`;
  }

  MyData.innerHTML = contHTML;
}

async function getAreaMeals(area) {
  MyData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let responseData = await response.json();
  ShowMeals(responseData.meals.slice(0, 20));
}

async function getIngredients() {
  MyData.innerHTML = "";
  searchData.innerHTML = "";
  let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
  let responseData = await respone.json();
  displayIngredients(responseData.meals.slice(0, 20));
}

function displayIngredients(arr) {
  let contHTML = "";

  for (let i = 0; i < arr.length; i++) {
    contHTML += `
        <div class="col-md-3">
                <div onclick="getIngredientsMeals('${
                  arr[i].strIngredient
                }')"  class="rounded-2 text-center meals">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    <p>${arr[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
                </div>
        </div>
        `;
  }

  MyData.innerHTML = contHTML;
}

async function getIngredientsMeals(ingredients) {
  MyData.innerHTML = "";
  searchData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
  let responseData = await response.json();
  ShowMeals(responseData.meals.slice(0, 20));
}

$("#sideBar .search").click(function () {
  closeSideBar();
  displaySearchInputs();
});
$("#sideBar .categories").click(function () {
  closeSideBar();
  getCategories();
});
$("#sideBar .area").click(function () {
  closeSideBar();
  getArea();
});
$("#sideBar .ingredients").click(function () {
  closeSideBar();
  getIngredients();
});
$("#sideBar .contact").click(function () {
  closeSideBar();
  displayContacts();
});

function displaySearchInputs() {
  searchData.innerHTML = `
    <div class="row py-4 ">
        <div class="col-md-6 ">
            <input onkeyup="searchByName(this.value)" class="form-control bg-transparent text-white" name="sr" type="text"  placeholder="Search By Name" >
        </div>
        <div class="col-md-6">
            <input onkeyup="searchByFirstLetter(this.value)" maxlength="1" name="sr" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
        </div>
    </div>
    `;
    MyData.innerHTML = "";
}

async function searchByName(term) {
  MyData.innerHTML = "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
  let responseData = await response.json();
  responseData.meals ? ShowMeals(responseData.meals) : ShowMeals([]);
}

async function searchByFirstLetter(term) {
  MyData.innerHTML = "";
  term == "" ? (term = "a") : "";
  let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
  let responseData = await response.json();
  responseData.meals ? ShowMeals(responseData.meals) : ShowMeals([]);
}

function displayContacts() {
  MyData.innerHTML = `<div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                   We didn't Accept Special characters and numbers
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email Should Like --> *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Please Enter Valid Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput" onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div> `;
  submitBtn = document.getElementById("submitBtn");

  document.getElementById("nameInput").addEventListener("focus", () => {
    nameInput = true;
  });

  document.getElementById("emailInput").addEventListener("focus", () => {
    emailInput = true;
  });

  document.getElementById("phoneInput").addEventListener("focus", () => {
    phoneInput = true;
  });

  document.getElementById("ageInput").addEventListener("focus", () => {
    ageInput = true;
  });

  document.getElementById("passwordInput").addEventListener("focus", () => {
    passwordInput = true;
  });

  document.getElementById("repasswordInput").addEventListener("focus", () => {
    repasswordInput = true;
  });
}



function inputsValidation() {
  if (nameInput) {
    if (nameValidation()) {
      document.getElementById("nameAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("nameAlert").classList.replace("d-none", "d-block");
    }
  }

  if (emailInput) {
    if (emailValidation()) {
      document.getElementById("emailAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("emailAlert").classList.replace("d-none", "d-block");
    }
  }

  if (phoneInput) {
    if (phoneValidation()) {
      document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
    }
  }

  if (ageInput) {
    if (ageValidation()) {
      document.getElementById("ageAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("ageAlert").classList.replace("d-none", "d-block");
    }
  }

  if (passwordInput) {
    if (passwordValidation()) {
      document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
    }
  }

  if (repasswordInput) {
    if (repasswordValidation()) {
      document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
    } else {
      document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
    }
  }

  if (nameValidation() && emailValidation() && phoneValidation() && ageValidation() && passwordValidation() && repasswordValidation() ) {
    submitBtn.removeAttribute("disabled");
  } 
  else {
    submitBtn.setAttribute("disabled", true);
  }
}


function nameValidation() {
  let regex = /^([a-z]+[,.]?[ ]?|[a-z]+['-]?)+$/;
  return regex.test(document.getElementById("nameInput").value);
}
function emailValidation() {
  let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(document.getElementById("emailInput").value);
}
function phoneValidation() {
  let regex = /^(\+\d{1,2}\s?)?1?\-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return regex.test(document.getElementById("phoneInput").value);
}
function ageValidation() {
  let regex = /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
  return regex.test(document.getElementById("ageInput").value);
}
function passwordValidation() {
  let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
  return regex.test(document.getElementById("passwordInput").value);
}
function repasswordValidation() {
  return (
    document.getElementById("repasswordInput").value == document.getElementById("passwordInput").value
  );
}
