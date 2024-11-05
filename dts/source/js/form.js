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
const requiredFields = document.querySelectorAll("input[required]");
const submitButton = document.querySelector("button[type='submit']");

if (requiredFields.length) {
    var requiredFilled;

    for (let i = 0; i < requiredFields.length; i++) {
        requiredFields[i].addEventListener("input", () => {
            requiredFilled = true;
            for (let j = 0; j < requiredFields.length; j++) {
                if (!requiredFields[j].validity.valid) {
                    requiredFilled = false;
                }
            }
            if (requiredFilled) {
                submitButton.disabled = false;
            } else {
                submitButton.disabled = true;
            }
        });
    }
}