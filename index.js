// copy to clipboard option

//!Password Variables
const lowercaseCharacters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
const uppercaseCharacters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
const numberCharacters = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const specialCharacters = ['!', '@', '#', '$', '%', '^', '&', '*']

let passwordGenerator = document.querySelector('button')
let passwordLength = 8;

let randomPassword = document.querySelectorAll('.randomPassword')
let passwordOptions = []
let generatedPassword = ''

let addButton = document.getElementById('addBtn')
let subsButton = document.getElementById('subsBtn')
let popUp = document.getElementById('copyToClipboard')
const slider = document.getElementById("slider");
let sliderNumber = document.getElementById("sliderNumber");

// Slider value bubble
const
	range = document.getElementById('range'),
	rangeV = document.getElementById('rangeV'),
	setValue = ()=>{
		const
			newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) ),
			newPosition = 10 - (newValue * 0.2);
		rangeV.innerHTML = `<span>${range.value}</span>`;
		rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
	};
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

// Create an input event listener for slider element
range.addEventListener("input", function () {
    // Assign to passwordLength new value
    passwordLength = range.value;
  });

//!Event Listeners
window.addEventListener('load', (e) => {
    generatePassword()
})

passwordGenerator.addEventListener('click', generatePassword)

//!Functions
function generatePassword() {
    randomPassword.forEach(function (passwordDiv) {
         if (document.getElementById('passwordLowercase').checked) {
            passwordOptions.push(lowercaseCharacters)
        } if (document.getElementById('passwordUppercase').checked) {
            passwordOptions.push(uppercaseCharacters)
        } if (document.getElementById('passwordSymbols').checked) {
            passwordOptions.push(specialCharacters)
        } if (document.getElementById('passwordNumbers').checked) {
            passwordOptions.push(numberCharacters)
        }
// console.log(passwordOptions)
	try { 
            for (i = 0; i < passwordLength; i++) {
                let myArray = passwordOptions[Math.floor(Math.random() * passwordOptions.length)]
                generatedPassword += myArray[Math.floor(Math.random() * myArray.length)]
            }
            document.getElementById("myInput").value = generatedPassword
        } 
        catch (TypeError) {
            document.getElementById("myInput").value = "No Boxes Checked"
        }
        generatedPassword = ''
        passwordOptions = []
    })
}

function copyToClipboard() {
    // Get the text field
    var copyText = document.getElementById("myInput");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    let clipboardToastElem = document.querySelector("#clipboard-toast")
    clipboardToastElem.classList.add("show");

    setTimeout(()=>{ clipboardToastElem.classList.remove("show") }, 3000);
  }
