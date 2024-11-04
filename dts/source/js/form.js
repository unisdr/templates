// Password visibility toggling
const pwdFields = document.querySelectorAll("input[type='password']");

if (pwdFields.length) {
    for (let i = 0; i < pwdFields.length; i++) {
        if (pwdFields[i].nextElementSibling.matches('.dts-form-component__pwd-toggle')) {
            var pwdToggleBtn = pwdFields[i].nextElementSibling;
            var pwdToggleImg = pwdToggleBtn.querySelector("img");

            pwdToggleBtn.addEventListener("click", () => {
                if (pwdFields[i].type === "password") {
                    pwdFields[i].type = "text";
                    pwdToggleImg.src = "assets/icons/eye-hide-password.svg";
                } else {
                    pwdFields[i].type = "password";
                    pwdToggleImg.src = "assets/icons/eye-show-password.svg";
                }
            });
        }
    }
}
