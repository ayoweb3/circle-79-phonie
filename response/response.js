const bodyEl = document.querySelector("body");
const toggleBtn = document.querySelector(".toggle-btn");
const logo = document.querySelector(".logo");
const message = document.querySelector(".submit-message");

toggleBtn.addEventListener("click", e => {
    if (toggleBtn.src.match("dark")) {
       toggleBtn.src = "../images/light-toggle.png";
       logo.src = "../images/light-alt.png"
    }else {
       toggleBtn.src = "../images/dark-toggle.png";
       logo.src = "../images/dark-alt.png";
    }
   bodyEl.classList.toggle("dark");
   message.classList.toggle("dark");
   
   
   })