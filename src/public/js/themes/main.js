const btn = document.getElementById("btn-themes")
const themes = document.getElementById("themes")

btn.onclick = () => {
    themes.classList.toggle("active")
}