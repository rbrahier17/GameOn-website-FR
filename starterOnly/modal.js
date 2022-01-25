function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg           = document.querySelector(".bground");
const modalBtn          = document.querySelectorAll(".modal-btn");
const closeModalButtons = document.querySelectorAll(".close-modal-btn");
const form              = document.querySelector("#registrationForm");
const submitBtn         = document.querySelector(".btn-submit");
const subConfirmation   = document.querySelector(".confirmation")

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// reset form: content and style
function resetForm() {
  form.reset()
  if (subConfirmation.style.display = "block") {
    subConfirmation.style.display = "none" 
    form.style.display = "block"
  }
  submitBtn.style.background = "grey"
}

// close modal and reset form event
closeModalButtons.forEach((btn) => 
  btn.addEventListener("click", () => { 
    resetForm()
    closeModal() 
  }) 
);