const bodyEl = document.querySelector("body");
const titleEl = document.querySelector("h2");
const paraEl = document.querySelector("p");
const btnEl = document.querySelector(".btn1");
const toggleBtn = document.querySelector(".toggle-btn");
const logo = document.querySelector(".logo");
const themeArr = [bodyEl, titleEl, paraEl, btnEl];

toggleBtn.addEventListener("click", e => {
 if (toggleBtn.src.match("dark")) {
    toggleBtn.src = "images/light-toggle.png";
    logo.src = "images/light-alt.png"
 }else {
    toggleBtn.src = "images/dark-toggle.png";
    logo.src = "images/dark-alt.png";
 }

changeTheme(themeArr, "dark")
})

function changeTheme(arr, className) {
    arr.forEach(element => element.classList.toggle(`${className}`));
} 