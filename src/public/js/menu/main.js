const menuBox = document.querySelector('.menu-box')
const menuContainer = document.querySelector('.menu-container')

menuContainer.onclick = () => {
  menuBox.classList.toggle('active')
}
