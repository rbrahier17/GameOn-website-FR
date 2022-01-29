// THIS FILE MANAGE THE MODAL INTERACTIONS

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Global variables
const modalbg           = document.querySelector(".bground");
const modalBtn          = document.querySelectorAll(".modal-btn");
const closeModalButtons = document.querySelectorAll(".close-modal-btn");

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
  const form            = document.querySelector("form");
  const subConfirmation = document.querySelector(".confirmation")
  const invalidMessages = document.querySelectorAll(".invalid-message")
  const mainFields      = document.querySelectorAll(".main-field")
  const submitBtn       = document.querySelector(".btn-submit");
  form.reset()
  if (subConfirmation.style.display = "block") {
    subConfirmation.style.display = "none" 
    form.style.display = "block"
  }
  for (let msg of invalidMessages) {
    msg.style.display = "none"
  }
  for (let field of mainFields) {
    field.style.border = "none"
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