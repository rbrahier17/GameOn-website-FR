// THIS FILE MANAGE THE MODAL INTERACTIONS

// Global variables
const modalbg           = document.querySelector(".bground");
const heroSection           = document.querySelector(".hero-section");
const modalBtn          = document.querySelectorAll(".modal-btn");
const closeModalButtons = document.querySelectorAll(".close-modal-btn");

function editNav() {
  const x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
};

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  if (window.matchMedia("(max-width: 640px)").matches) {
    heroSection.style.display = "none";
  }
}

// close modal form
function closeModal() {
  modalbg.style.display = "none";
  if (window.matchMedia("(max-width: 640px)").matches) {
    heroSection.style.display = "block";
  }
}

// Make sure it displays correctly on window resize
window.onresize = () => {
  if (window.matchMedia("(min-width: 640px)").matches) {
    heroSection.style.display = "block";
  }
  if (window.matchMedia("(min-width: 801px)").matches) {
    heroSection.style.display = "grid";
  }
  if (window.matchMedia("(max-width: 640px)").matches && modalbg.style.display == "block") {
    heroSection.style.display = "none";
  }
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
};

// close modal and reset form event
closeModalButtons.forEach((btn) => 
  btn.addEventListener("click", () => { 
    resetForm()
    closeModal() 
  }) 
);