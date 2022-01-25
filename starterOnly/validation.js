/** 
 * THIS FILE MANAGE ALL THE FORM VALIDATION 
 * The objective is to have all the validation logic in this file, without using HTML attributes as much as possible. 
 * REASONS: 
 * - Keep a clear separation between the structure of the web page in the HTML and the validation logic side in the javascript file.
 * - Build a personalized validation to improve user experience.
 * - Have more control over validation without being dependent on another program (like browser-implemented validation).
 * - uUderstand how works form validation process and practice javascript as much as possible in this project.
 *
 * SUMMARY:
 * - 1. INITIALIZE VALID INPUTS SET VARIABLE
 * - 2. UTILITY FUNCTIONS
 * - 3. SETUP SPECIFIC VALIDATION FOR EACH INPUT
 * - 4. INITIALIZE VALIDATION
 */


// 1. INITIALIZE VALID INPUTS SET VARIABLE

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
function displayInvalidMsg(input, displayMsgCond, invalidMsg) {
  let invalidMsgElement = document.querySelector(`.invalid-${input.id}`);
  if ((displayMsgCond && displayMsgCond()) || !displayMsgCond) {
    invalidMsgElement.innerText = invalidMsg
    invalidMsgElement.style.display = "block";
    input.style.border = "2px solid #e54858"; // applies red border
  }
}

// Hides an invalid message for a specific input element
// Also removes the red border from this element
function hideInvalidMsg(input, hideMsgCond) {
  let invalidMsgElement = document.querySelector(`.invalid-${input.id}`);
  if ((hideMsgCond && hideMsgCond()) || !hideMsgCond) {
    invalidMsgElement.style.display = "none";
    input.style.border = "none"
  }
}

// Display invalid messages if the user tries to submit the form with one or more invalid or empty fields 
function displayInvalidMsgOnSubmitTry(input, validInputCond, invalidMsg) {
  const form = document.querySelector("form");
  form.addEventListener("submit", () => {
    if(validInputCond() === false) {
      displayInvalidMsg(input, null, invalidMsg);
    }
  })
}

function identifyValidInputs(inputId, validInputCond) {
  validInputCond() ? validInputsSet.add(inputId) :validInputsSet.delete(inputId)
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

// SETUP FIRST NAME INPUT VALIDATION
function setupFirstNameInput() {
  const firstNameInput   = document.querySelector("#firstName");
  const regex            = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/); 
  const invalidMsg       = "Veuillez entrer votre prénom. Il doit être composé de 2 à 30 caractères. Les chiffres et symboles spéciaux ne sont pas valides.";
  let   displayMsgCond   = () => !isEmpty(firstNameInput) && !regex.test(firstNameInput.value);
  let   hideMsgCond      = () => isEmpty(firstNameInput) || regex.test(firstNameInput.value);
  let   validInputCond   = () => !isEmpty(firstNameInput) && regex.test(firstNameInput.value);
  firstNameInput.addEventListener("focusout", () => displayInvalidMsg(firstNameInput, displayMsgCond, invalidMsg));
  firstNameInput.addEventListener("input", () => { 
    hideInvalidMsg(firstNameInput, hideMsgCond);
    identifyValidInputs(firstNameInput.id, validInputCond);
  })
  displayInvalidMsgOnSubmitTry(firstNameInput, validInputCond, invalidMsg)
}

//  SETUP LAST NAME INPUT VALIDATION
function setupLastNameInput() {
  const lastNameInput    = document.querySelector("#lastName");
  const regex            = new RegExp(/^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/); 
  const invalidMsg       = "Veuillez entrer votre nom. Il doit être composé de 2 à 30 caractères. Les chiffres et symboles spéciaux ne sont pas valides."
  let   displayMsgCond   = () => !isEmpty(lastNameInput) && !regex.test(lastNameInput.value);
  let   hideMsgCond      = () => isEmpty(lastNameInput) || regex.test(lastNameInput.value);
  let   validInputCond   = () => !isEmpty(lastNameInput) && regex.test(lastNameInput.value);
  lastNameInput.addEventListener("focusout", () => displayInvalidMsg(lastNameInput, displayMsgCond, invalidMsg));
  lastNameInput.addEventListener("input", () => { 
    hideInvalidMsg(lastNameInput, hideMsgCond);
    identifyValidInputs(lastNameInput.id, validInputCond);
  })
  displayInvalidMsgOnSubmitTry(lastNameInput, validInputCond, invalidMsg)
}

//  SETUP EMAIL INPUT VALIDATION
function setupEmailInput() {
  const emailInput       = document.querySelector("#email");
  const regex            = new RegExp(/^[\w\-.+]+@([\w-]+\.)+[\w-]{2,3}$/); 
  const invalidMsg       = "Veuillez entrer votre email en respectant un format valide. Exemple: john.doe@mail.com."
  let   displayMsgCond   = () => !isEmpty(emailInput) && !regex.test(emailInput.value);
  let   hideMsgCond      = () => isEmpty(emailInput) || regex.test(emailInput.value);
  let   validInputCond   = () => !isEmpty(emailInput) && regex.test(emailInput.value);
  emailInput.addEventListener("focusout", () => displayInvalidMsg(emailInput, displayMsgCond, invalidMsg));
  emailInput.addEventListener("input", () => { 
    hideInvalidMsg(emailInput, hideMsgCond);
    identifyValidInputs(emailInput.id, validInputCond);
  })
  displayInvalidMsgOnSubmitTry(emailInput, validInputCond, invalidMsg)
}

//  SETUP BIRTHDATE INPUT VALIDATION
function setupBirthdateInput() {
  const birthdateInput   = document.querySelector("#birthdate");
  const regex            = new RegExp(/^\d{4}\-\d{2}\-\d{2}$/); 
  const invalidMsg       = "Veuillez entrer votre date de naissance en respectant un format de date valide type JJ/MM/AAAA. Si votre année d'anniversaire est antérieure à 120 ans vous ne jouez probablement plus au jeux vidéos. Si  votre année de naissance est ultérieure à l'année actuelle vous n'y jouez probablement pas encore."
  preventEnterInvalidDateFormat(birthdateInput)
  let   displayMsgCond   = () => !isEmpty(birthdateInput) && (!regex.test(birthdateInput.value) || !birthdateIsValid(birthdateInput));
  let   hideMsgCond      = () => isEmpty(birthdateInput) || (regex.test(birthdateInput.value) && birthdateIsValid(birthdateInput))
  let   validInputCond   = () => !isEmpty(birthdateInput) && (regex.test(birthdateInput.value) && birthdateIsValid(birthdateInput))
  birthdateInput.addEventListener("focusout", () => displayInvalidMsg(birthdateInput, displayMsgCond, invalidMsg));
  birthdateInput.addEventListener("input", () => { 
    hideInvalidMsg(birthdateInput, hideMsgCond);
    identifyValidInputs(birthdateInput.id, validInputCond);
  })
  displayInvalidMsgOnSubmitTry(birthdateInput, validInputCond, invalidMsg)
}

//  SETUP TOURNAMENTS QUANTITY INPUT VALIDATION
function setupTournamentsQtyInput() {
  const tournamentsQtyInput = document.querySelector("#quantity");
  const regex               = new RegExp(/^([0-9]|[1-9][0-9])$/); 
  const invalidMsg          = "Veuillez entrer un nombre de tournois compris entre 0 et 99."
  let   displayMsgCond      = () => !isEmpty(tournamentsQtyInput) && !regex.test(tournamentsQtyInput.value);
  let   hideMsgCond         = () => isEmpty(tournamentsQtyInput) || regex.test(tournamentsQtyInput.value);
  let   validInputCond      = () => !isEmpty(tournamentsQtyInput) && regex.test(tournamentsQtyInput.value);
  tournamentsQtyInput.addEventListener("focusout", () => displayInvalidMsg(tournamentsQtyInput, displayMsgCond, invalidMsg));
  tournamentsQtyInput.addEventListener("input", () => { 
    hideInvalidMsg(tournamentsQtyInput, hideMsgCond);
    identifyValidInputs(tournamentsQtyInput.id, validInputCond);
  })
  displayInvalidMsgOnSubmitTry(tournamentsQtyInput, validInputCond, invalidMsg)
}

//  SETUP TOURNAMENT LOCATION INPUT VALIDATION
function setupTournamentLocationInputs() {
  const locationsFieldset = document.querySelector("#locationFieldset");
  const radioBtns         = document.querySelectorAll("input[type=radio]");
  const invalidMsg        = "Veuillez sélectionner une option dans la liste.";
  let   validInputCond    = () => document.querySelectorAll("input[type=radio]:checked").length !== 0
  displayInvalidMsgOnSubmitTry(locationsFieldset, validInputCond, invalidMsg);
  radioBtns.forEach(btn => btn.addEventListener("click", () => {
    hideInvalidMsg(locationsFieldset, null);
    identifyValidInputs(locationsFieldset.id, validInputCond);
  }))
}

//  SETUP TERMS OF USE INPUT VALIDATION
function setupTermsOfUseInput() {
  const termsOfUseInput   = document.querySelector("#checkbox1");
  const invalidMsg        = "Veuillez accepter les conditions d'utilisation.";
  let   validInputCond    = () => termsOfUseInput.checked;
  displayInvalidMsgOnSubmitTry(termsOfUseInput, validInputCond, invalidMsg);
  termsOfUseInput.addEventListener("click", () => {
    hideInvalidMsg(termsOfUseInput, null);
    identifyValidInputs(termsOfUseInput.id, validInputCond)
  })
}


// 4. INITIALIZE VALIDATION

function init () {
  const form = document.querySelector("form")

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
  form.addEventListener("input", () => {
    validInputsSet.size === 7 ? submitBtn.style.background = "#279e7a" : submitBtn.style.background = "grey"
  })

  // Display a message to confirm subscription to the user on submit event if form is valid
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