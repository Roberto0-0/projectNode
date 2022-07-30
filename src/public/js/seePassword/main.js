const password = document.querySelector(".password")
const confirmPassword = document.querySelector(".confirmPassword")
const seePassword = document.querySelector(".see-password")
const seeConfirmPassword = document.querySelector(".see-confirm-password")

seePassword.onclick = () => {
    if(password.type == "password") {
        password.type = "text"
        seePassword.src = "/svg/password/eye-slash.svg"
    } else {
        password.type = "password"
        seePassword.src = "/svg/password/eye.svg"
    }
}

seeConfirmPassword.onclick = () => {
    if(confirmPassword.type == "password") {
        confirmPassword.type = "text"
        seeConfirmPassword.src = "/svg/password/eye-slash.svg"
    } else {
        confirmPassword.type = "password"
        seeConfirmPassword.src = "/svg/password/eye.svg"
    }
}