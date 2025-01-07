// Password visibility toggling
const pwdFields = document.querySelectorAll("input[type='password']");

if (pwdFields.length) {
    for (let i = 0; i < pwdFields.length; i++) {
        if (pwdFields[i].nextElementSibling.matches('.dts-form-component__pwd-toggle')) {

            pwdFields[i].nextElementSibling.addEventListener("click", () => {
                
                if (pwdFields[i].type === "password") {
                    pwdFields[i].type = "text";
                    pwdFields[i].nextElementSibling.querySelector("img").src = "assets/icons/eye-hide-password.svg";
                } else {
                    pwdFields[i].type = "password";
                    pwdFields[i].nextElementSibling.querySelector("img").src = "assets/icons/eye-show-password.svg";
                }
            });
        }
    }
}

// Submit button enabling only when required fields are filled
const forms = document.querySelectorAll("form");
if (forms.length) {
    for (let k = 0; k < forms.length; k++) {
        const requiredFields = [];
        const submitButton = [];
        requiredFields[k] = forms[k].querySelectorAll("input[required]");
        submitButton[k] = forms[k].querySelector("button[type='submit']");

        if (requiredFields[k].length) {
            var requiredFilled;

            for (let i = 0; i < requiredFields[k].length; i++) {
                requiredFields[k][i].addEventListener("input", () => {
                    requiredFilled = true;
                    for (let j = 0; j < requiredFields[k].length; j++) {
                        if (!requiredFields[k][j].validity.valid) {
                            requiredFilled = false;
                        }
                    }
                    if (requiredFilled) {
                        submitButton[k].disabled = false;
                    } else {
                        submitButton[k].disabled = true;
                    }
                });
            }
        }
    }
}


// Radiobutton controlled field visibility
const visibilityTriggers = document.querySelectorAll("input[aria-controls]");
const ariaControls = ["", ""];
const controlledItems = ["", ""];

if (visibilityTriggers.length) {
    for (let i = 0; i < visibilityTriggers.length; i++) {
        ariaControls[i] = visibilityTriggers[i].getAttribute("aria-controls");
        controlledItems[i] = document.getElementById(ariaControls[i]);

        visibilityTriggers[i].addEventListener("click", () => {
            var ariaExpanded = visibilityTriggers[i].getAttribute('aria-expanded');

            if (ariaExpanded == "false") {
                controlledItems[i].style.display = "block";
                visibilityTriggers[i].setAttribute("aria-expanded", "true");
                if (i==0) {
                    controlledItems[i+1].style.display = "none";
                    visibilityTriggers[i+1].setAttribute("aria-expanded", "false");
                } else {
                    controlledItems[i-1].style.display = "none";
                    visibilityTriggers[i-1].setAttribute("aria-expanded", "false");
                }
            }
        });
    }
}

// OTP form single digit length management - NOT USED
// const otpForm = document.querySelector(".dts-dialog__form--otp");

// if (otpForm) {
//     const digitInputs = otpForm.querySelectorAll("input[type='number']");
//     for (let i = 0; i < digitInputs.length; i++) {
//         digitInputs[i].addEventListener("keydown", function (e) {
//             digitInputs[i].select();
//             if (this.value.length == 1) {
//                 return false;
//             };
//         });
//     }
// }
