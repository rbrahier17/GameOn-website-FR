/** 
 * THIS FILE MANAGE ALL THE FORM VALIDATION 
 * The objective is to have all the validation logic in this file, without rely on HTML attributes as much as possible. 
 * REASONS: 
 * - Keep a clear separation between the structure of the web page in the HTML and the validation logic side in the javascript file.
 * - Build a personalized validation to improve user experience.
 * - Have more control over validation without being dependent on another program (like browser-implemented validation).
 * - Uderstand how works form validation process and practice javascript as much as possible in this project.
 *
 * SUMMARY:
 * - 1. INITIALIZE GLOBAL VARIABLES
 * - 2. UTILITY FUNCTIONS
 * - 3. SETUP SPECIFIC VALIDATION FOR EACH INPUT
 * - 4. INITIALIZE VALIDATION
 */


// 1. INITIALIZE GLOBAL VARIABLES

// The objective is to have as few global variables as possible to not "polute" the global environment.

const form = document.querySelector("form");

/**  
 * The set object is used to store unique values.
 * It is used here to store the id of an input when it is valid.
 * This will allows to simply check the size of the set to determine if every input is valid.
 */
let validInputsSet = new Set([]);


// 2. UTILITY FUNCTIONS

/** 
 * Returns true if an input receiving a string type value is empty.
 * It uses the trim() method to remove whitespace from both ends of the string.
 */ 
function isEmpty(input) {
  return input.value.trim().length === 0;
}

/** 
 * On some navigators, with HTML input attribute type="date" it is possible to enter a year containing up to 6 digits.
 * But the format requires a 4-digit year, this function solves -partially- this problem.
 * If the date input value contains more than 10 chars, the value is sliced to respect the expected format.
 */
function preventEnterInvalidDateFormat(dateInput) {
  dateInput.addEventListener("input", (e) => {
    if (e.target.value.length > 10) {
      e.target.value = `${e.target.value.slice(0,4)}${e.target.value.slice(5,11)}`
    }
  })
}

// Displays an invalid message for a specific input element
function displayInvalidMsg(input, invalidMsg) {
  let invalidMsgElement = document.querySelector(`.invalid-${input.id}`);
  invalidMsgElement.innerText = invalidMsg
  invalidMsgElement.style.display = "block";
  input.style.border = "2px solid #e54858"; // applies red border
}

// Hides an invalid message for a specific input element
function hideInvalidMsg(input) {
  let invalidMsgElement = document.querySelector(`.invalid-${input.id}`);
  invalidMsgElement.style.display = "none";
  input.style.border = "none" // removes border
}

// Check birthdate validity
// Returns false if no birthdate value 
// Returns false if birthdate is in the future or if birthdate is before 120 years 
function birthdateIsValid(birthdateInput) {
  let dateToday = new Date;
  let date120YearsAgo = new Date(new Date().setFullYear(dateToday.getFullYear() - 120));
  if (birthdateInput.value) {
    let birthdateIsInFuture = birthdateInput.valueAsDate.getTime() > dateToday.getTime();
    let birthdateIsTooOld = birthdateInput.valueAsDate.getTime() < date120YearsAgo.getTime();
    return birthdateIsInFuture || birthdateIsTooOld ? false : true
  } else {
    return false
  }
}


// 3. SETUP SPECIFIC VALIDATION FOR EACH INPUT

// Setup first name input validation
function setupFirstNameInput() {
  const firstNameInput      = document.querySelector("#firstName");
  const regex               = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/); 
  const errorMsg            = "Votre prénom doit être composé de 2 à 30 caractères. Les chiffres et symboles spéciaux ne sont pas valides.";
  let   displayErrorMsgCond = () => !isEmpty(firstNameInput) && !regex.test(firstNameInput.value);
  let   hideMsgCond         = () => isEmpty(firstNameInput) || regex.test(firstNameInput.value);
  let   validInputCond      = () => !isEmpty(firstNameInput) && regex.test(firstNameInput.value);
  firstNameInput.addEventListener("focusout", () => { 
    if (displayErrorMsgCond()) displayInvalidMsg(firstNameInput, errorMsg); 
  });
  firstNameInput.addEventListener("input", () => { 
    if (hideMsgCond()) hideInvalidMsg(firstNameInput); 
    validInputCond() ? validInputsSet.add(firstNameInput.id) : validInputsSet.delete(firstNameInput.id);
  })
  form.addEventListener("submit", () => {
    if (isEmpty(firstNameInput)) displayInvalidMsg(firstNameInput, "Ce champ est requis pour pouvoir soumettre le formulaire.")
    else if (displayErrorMsgCond()) displayInvalidMsg(firstNameInput, errorMsg)
  }) 
}

//  Setup last name input validation
function setupLastNameInput() {
  const lastNameInput       = document.querySelector("#lastName");
  const regex               = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/); 
  const errorMsg            = "Votre nom doit être composé de 2 à 30 caractères. Les chiffres et symboles spéciaux ne sont pas valides."
  let   displayErrorMsgCond = () => !isEmpty(lastNameInput) && !regex.test(lastNameInput.value);
  let   hideMsgCond         = () => isEmpty(lastNameInput) || regex.test(lastNameInput.value);
  let   validInputCond      = () => !isEmpty(lastNameInput) && regex.test(lastNameInput.value);
  lastNameInput.addEventListener("focusout", () => { 
    if (displayErrorMsgCond()) displayInvalidMsg(lastNameInput, errorMsg); 
  });
  lastNameInput.addEventListener("input", () => { 
    if (hideMsgCond()) hideInvalidMsg(lastNameInput); 
    validInputCond() ? validInputsSet.add(lastNameInput.id) : validInputsSet.delete(lastNameInput.id);
  })
  form.addEventListener("submit", () => {
    if (isEmpty(lastNameInput)) displayInvalidMsg(lastNameInput, "Ce champ est requis pour pouvoir soumettre le formulaire.")
    else if (displayErrorMsgCond()) displayInvalidMsg(lastNameInput, errorMsg)
  }) 
}

//  Setup email input validation
function setupEmailInput() {
  const emailInput          = document.querySelector("#email");
  const regex               = new RegExp(/^[\w\-.+]+@([\w-]+\.)+[\w-]{2,3}$/); 
  const errorMsg            = "Votre email doit respecter un format valide. Exemple: john.doe@mail.com."
  let   displayErrorMsgCond = () => !isEmpty(emailInput) && !regex.test(emailInput.value);
  let   hideMsgCond         = () => isEmpty(emailInput) || regex.test(emailInput.value);
  let   validInputCond      = () => !isEmpty(emailInput) && regex.test(emailInput.value);
  emailInput.addEventListener("focusout", () => { 
    if (displayErrorMsgCond()) displayInvalidMsg(emailInput, errorMsg); 
  });
  emailInput.addEventListener("input", () => { 
    if (hideMsgCond()) hideInvalidMsg(emailInput); 
    validInputCond() ? validInputsSet.add(emailInput.id) : validInputsSet.delete(emailInput.id);
  })
  form.addEventListener("submit", () => {
    if (isEmpty(emailInput)) displayInvalidMsg(emailInput, "Ce champ est requis pour pouvoir soumettre le formulaire.")
    else if (displayErrorMsgCond()) displayInvalidMsg(emailInput, errorMsg)
  }) 
}

//  Setup birthdate input validation
function setupBirthdateInput() {
  const birthdateInput = document.querySelector("#birthdate");
  const regex          = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/); 
  const errorMsg       = "Veuillez respecter un format de date valide type JJ/MM/AAAA. Si votre année de naissance est antérieure à 120 ans vous ne jouez probablement plus au jeux vidéos. Si  votre année de naissance est ultérieure à l'année actuelle vous n'y jouez probablement pas encore."
  preventEnterInvalidDateFormat(birthdateInput)
  let   displayErrorMsgCond = () => !isEmpty(birthdateInput) && (!regex.test(birthdateInput.value) || !birthdateIsValid(birthdateInput));
  let   hideMsgCond         = () => isEmpty(birthdateInput) || (regex.test(birthdateInput.value) && birthdateIsValid(birthdateInput));
  let   validInputCond      = () => !isEmpty(birthdateInput) && (regex.test(birthdateInput.value) && birthdateIsValid(birthdateInput));
  birthdateInput.addEventListener("focusout", () => { 
    if (displayErrorMsgCond()) displayInvalidMsg(birthdateInput, errorMsg); 
  });
  birthdateInput.addEventListener("input", () => { 
    if (hideMsgCond()) hideInvalidMsg(birthdateInput); 
    validInputCond() ? validInputsSet.add(birthdateInput.id) : validInputsSet.delete(birthdateInput.id);
  })
  form.addEventListener("submit", () => {
    if (isEmpty(birthdateInput)) displayInvalidMsg(birthdateInput, "Ce champ est requis pour pouvoir soumettre le formulaire.")
    else if (displayErrorMsgCond()) displayInvalidMsg(birthdateInput, errorMsg)
  }) 
}

//  Setup tournaments quantity input validation
function setupTournamentsQtyInput() {
  const tournamentsQtyInput = document.querySelector("#quantity");
  const regex               = new RegExp(/^([0-9]|[1-9][0-9])$/); 
  const errorMsg            = "Le nombre de tournois doit être compris entre 0 et 99.";
  let   displayErrorMsgCond = () => !isEmpty(tournamentsQtyInput) && !regex.test(tournamentsQtyInput.value);
  let   hideMsgCond         = () => isEmpty(tournamentsQtyInput) || regex.test(tournamentsQtyInput.value);
  let   validInputCond      = () => !isEmpty(tournamentsQtyInput) && regex.test(tournamentsQtyInput.value);
  tournamentsQtyInput.addEventListener("focusout", () => { 
    if (displayErrorMsgCond()) displayInvalidMsg(tournamentsQtyInput, errorMsg); 
  });
  tournamentsQtyInput.addEventListener("input", () => { 
    if (hideMsgCond()) hideInvalidMsg(tournamentsQtyInput); 
    validInputCond() ? validInputsSet.add(tournamentsQtyInput.id) : validInputsSet.delete(tournamentsQtyInput.id);
  })
  form.addEventListener("submit", () => {
    if (isEmpty(tournamentsQtyInput)) displayInvalidMsg(tournamentsQtyInput, "Ce champ est requis pour pouvoir soumettre le formulaire.")
    else if (displayErrorMsgCond()) displayInvalidMsg(tournamentsQtyInput, errorMsg)
  }) 
}

//  Setup tournament location input validation
function setupTournamentLocationInputs() {
  const locationsFieldset = document.querySelector("#locationFieldset");
  const radioBtns         = document.querySelectorAll("input[type=radio]");
  let   validInputCond    = () => document.querySelectorAll("input[type=radio]:checked").length !== 0
  form.addEventListener("submit", () => {
    if (!validInputCond()) displayInvalidMsg(locationsFieldset, "Veuillez sélectionner une option dans la liste.")
  }) 
  radioBtns.forEach(btn => btn.addEventListener("click", () => {
    hideInvalidMsg(locationsFieldset);
    validInputCond() ? validInputsSet.add(locationsFieldset.id) : validInputsSet.delete(locationsFieldset.id);
  }))
}

//  Setup terms use input validation
function setupTermsOfUseInput() {
  const termsOfUseInput   = document.querySelector("#checkbox1");
  let   validInputCond    = () => termsOfUseInput.checked;
  form.addEventListener("submit", () => {
    if (!validInputCond()) displayInvalidMsg(termsOfUseInput, "Veuillez accepter les conditions d'utilisation.")
  }) 
  termsOfUseInput.addEventListener("click", () => {
    hideInvalidMsg(termsOfUseInput);
    validInputCond() ? validInputsSet.add(termsOfUseInput.id) : validInputsSet.delete(termsOfUseInput.id);
  })
}


// 4. INITIALIZE VALIDATION

function init () {
  setupFirstNameInput()
  setupLastNameInput()
  setupEmailInput()
  setupBirthdateInput()
  setupTournamentsQtyInput()
  setupTournamentLocationInputs()
  setupTermsOfUseInput()

  // Change the background color of the submit button to green if all inputs are valid on input event on any input element
  // If there is one or more invalid fields the button color is reset to grey 
  // This allows the user to benefit from a visual indication on the form validity
  const submitBtn = document.querySelector(".btn-submit");
  form.addEventListener("input", () => {
    validInputsSet.size === 7 ? submitBtn.style.background = "#279e7a" : submitBtn.style.background = "grey"
  })

  // Displays a message to confirm subscription to the user on submit event if form is valid
  const subConfirmation = document.querySelector(".confirmation")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (validInputsSet.size === 7) {
      form.style.display = "none"
      subConfirmation.style.display = "block"
      validInputsSet = new Set([]); // Reset valid inputs set
    }
  })
}

init()