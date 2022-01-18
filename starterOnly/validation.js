/* 
  THIS FILE MANAGE ALL THE FORM VALIDATION 
  The objective is to have all the validation logic in this file, without using HTML attributes as much as possible. 
  This for few reasons: 
    -keep a clear separation between the structure of the web page in the HTML and the validation logic side in the javascript file
    -build a personalized validation to improve user experience
    -have more control over validation without being dependent on another program (like browser-implemented validation)
    -understand how works form validation process and practice javascript as much as possible in this project

  File summary:
    -VARIABLES
    -UTILS FUNCTIONS FOR ALL INPUTS TYPES
    -UTILS FUNCTIONS SPECIFIC TO BIRTHDATE INPUT
    -UTILS FUNCTIONS SPECIFIC TO RADIO AND CHECKBOX TYPE INPUTS
    -UTILS FUNCTIONS SPECIFIC TO INPUTS RECEIVING A STRING TYPE VALUE
    -GLOBAL FORM VALIDATION FUNCTIONS
    -INITIALIZING FUNCTION
*/


// VARIABLES 

// DOM elements other than inputs (elements already declared in modal.js are imported)
import { form, submitBtn, subConfirmation } from "./modal.js";
const locationFieldset = document.querySelector("#locationFieldset");

// DOM inputs elements
const firstName        = document.querySelector("#firstName");
const lastName         = document.querySelector("#lastName");
const email            = document.querySelector("#email");
const birthdate        = document.querySelector("#birthdate");
const tournamentsQty   = document.querySelector("#quantity");
const radioBtns        = document.querySelectorAll("input[type=radio]");
const termsOfUse       = document.querySelector("#checkbox1");


// Regular Expressions Map
// Associates a regular expression pattern with each input that receives a string type value
const regexMap = new Map([
  [firstName,      /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/],
  [lastName,       /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{1,29}$/],
  [email,          /^[\w\-.+]+@([\w-]+\.)+[\w-]{2,3}$/],
  [birthdate,      /^\d{4}\-\d{2}\-\d{2}$/],
  [tournamentsQty, /^([0-9]|[1-9][0-9])$/],
])

// The set object is used to store unique values
// It is used here to store the id of an input receiving a string type value when it is valid
// This allows to simply check the size of the set to determine if every input of this type is valid
let validStringInputsSet = new Set([]);


// UTILS FUNCTIONS FOR ALL INPUTS TYPES

// Displays an invalid message for a specific input element
// Also applies a red border to this element
function displayInvalidMsg(input) {
  let invalidMsg = document.querySelector(`.invalid-${input.id}`);
  invalidMsg.style.display = "block";
  input.style.border = "2px solid #e54858";
}

// Hides an invalid message for a specific input element
// Also removes the red border from this element
function hideInvalidMsg(input) {
  let invalidMsg = document.querySelector(`.invalid-${input.id}`);
  invalidMsg.style.display = "none";
  input.style.border = "none";
}


// UTILS FUNCTIONS SPECIFIC TO BIRTHDATE INPUT

// On some navigators, with HTML input attribute type="date" it is possible to enter a year containing up to 6 digits 
// But the format requires a 4-digit year, this function solves this problem 
// If the date input value contains more than 10 chars, the value is sliced to respect the expected format
function preventEnteringInvalidDateFormat() {
  birthdate.addEventListener("input", (e) => {
    if (e.target.value.length > 10) {
      e.target.value = `${e.target.value.slice(0,4)}${e.target.value.slice(5,11)}`
    }
  })
}

// Check birthdate validity
// Returns false if no birthdate value 
// Returns false if birthdate is in the future or if birthdate is before 120 years 
function birthdateIsValid(birthDate) {
  let dateToday = new Date;
  let date120YearsAgo = new Date(new Date().setFullYear(dateToday.getFullYear() - 120));
  if (birthDate.value) {
    let birthdateIsInFuture = birthDate.valueAsDate.getTime() > dateToday.getTime();
    let birthdateIsTooOld = birthDate.valueAsDate.getTime() < date120YearsAgo.getTime();
    if (birthdateIsInFuture || birthdateIsTooOld) { 
      return false 
    } else { 
      return true 
    }
  } else {
    return false
  }
}


// UTILS FUNCTIONS SPECIFIC TO RADIO AND CHECKBOX TYPE INPUTS

// Returns true if a tournament location radio input is selected
function tournamentLocationIsChecked() {
  let checkedLocation = document.querySelector("input[name=location]:checked")
  return checkedLocation == null ? false : true
}

// Returns true if terms of use checkbox is checked
function conditionsAreChecked() {
  let checkedConditions = document.querySelector("#checkbox1:checked")
  return checkedConditions == null ? false : true
}

// Hide possible invalid message specific to tournament location inputs when user click on a radio button
function hideTournamentLocationInvalidMsgIfSelected() {
  for (let radioBtn of radioBtns) radioBtn.addEventListener("click", () => hideInvalidMsg(locationFieldset))
}

// Hide possible invalid message specific to the terms of use checkbox when user click and check the box
function hideTermsOfUseInvalidMsgIfChecked() {
  termsOfUse.addEventListener("click", () => hideInvalidMsg(termsOfUse))
}


// UTILS FUNCTIONS SPECIFIC TO INPUTS RECEIVING A STRING TYPE VALUE

// Returns true if an input value is empty
// It use the trim() method to remove whitespace from both ends of the string
function isEmpty(input) {
  return input.value.trim().length === 0;
}

// Returns true if the regex pattern matches the input value
function isRegexValid(regexPattern, input) {
  const regex = new RegExp(regexPattern);
  return regex.test(input.value);
}

// Returns true if input receiving string type value is valid
function stringInputIsValid(regexPattern, input) {
  return !isRegexValid(regexPattern, input) ? false 
  : input !== birthdate ? true 
  : birthdateIsValid(birthdate) ? true : false
}

// On focus out event on a specific input element if the input value is NOT empty -AND- NOT valid, it displays invalid message
function displayInvalidMsgOnFocusOutEvent(regexPattern, input) {
  input.addEventListener("focusout", () => {
    if (!isEmpty(input) && !stringInputIsValid(regexPattern, input)) displayInvalidMsg(input)
  })
}

// On input event on a specific input element, if the input value is empty -OR- valid, it hides a possible invalid message
function hideInvalidMsgOnInputEvent(regexPattern, input) { 
  input.addEventListener("input", () => {
    if (isEmpty(input) || stringInputIsValid(regexPattern, input)) hideInvalidMsg(input)
  })
}

// On input event on a specific input element, if the input value is NOT empty -AND- valid, it adds the element id to the "validStringInputsSet"
// Else (if input is empty or invalid), it deletes the possible element id from the "validStringInputsSet"
function checkStrInputsValidityOnInputEvent(regexPattern, input) {
  input.addEventListener("input", () => {
    !isEmpty(input) && stringInputIsValid(regexPattern, input) ? validStringInputsSet.add(input.id) 
    : validStringInputsSet.delete(input.id)
  })
}


// GLOBAL VALIDATION FUNCTIONS

// Display invalid messages if the user tries to submit the form with one or more invalid or empty fields 
function displayInvalidMessagesOnSubmitEvent() {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    regexMap.forEach((regexPattern, input) => {
      if (isEmpty(input) || !stringInputIsValid(regexPattern, input)) displayInvalidMsg(input) 
    })
    if (!tournamentLocationIsChecked()) displayInvalidMsg(locationFieldset);
    if (!conditionsAreChecked()) displayInvalidMsg(termsOfUse);
  })
}

// Returns true if all submit conditions are met
function formIsValid() {
  let submitConditions = [
    validStringInputsSet.size === 5, 
    tournamentLocationIsChecked(),
    conditionsAreChecked()
  ]
  return submitConditions.indexOf(false) === -1 ? true : false
}

// Change the background color of the submit button to green if all inputs are valid on input event on any input element
// If there is one or more invalid fields the button color is reset to grey 
// This allows the user to benefit from a visual indication on the form validity
function changeSubmitBtnColorIfFormIsValidOnInputEvent() {
  form.addEventListener("input", () => {
    formIsValid() ? submitBtn.style.background = "#279e7a" : submitBtn.style.background = "grey"
  })
}

// Display a message to confirm subscription to the user on submit event if form is valid
function displaySubConfirmationIfSuccessOnSubmitEvent() {
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (formIsValid()) {
      form.style.display = "none"
      subConfirmation.style.display = "block"
    }
  })
}


// INITIALIZING FUNCTION

// Validation initializing function
// This function is immediately invoked
(function init () {

  preventEnteringInvalidDateFormat()

  regexMap.forEach((regexPattern, input) => {

    displayInvalidMsgOnFocusOutEvent(regexPattern, input);
    
    hideInvalidMsgOnInputEvent(regexPattern, input);

    checkStrInputsValidityOnInputEvent(regexPattern, input);
  });

  displayInvalidMessagesOnSubmitEvent();

  hideTournamentLocationInvalidMsgIfSelected();

  hideTermsOfUseInvalidMsgIfChecked();

  changeSubmitBtnColorIfFormIsValidOnInputEvent();

  displaySubConfirmationIfSuccessOnSubmitEvent();
})()