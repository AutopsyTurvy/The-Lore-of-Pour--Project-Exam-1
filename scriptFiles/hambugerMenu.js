




// Hamburger Menu Script

document.addEventListener('DOMContentLoaded', (event) => {
    const menuButton = document.querySelector('.hamburger-menu');
    if (menuButton) {
        menuButton.addEventListener('click', toggleMenu);
    }
});

function toggleMenu() {
    var element = document.querySelector(".menu-links");
    element.classList.toggle("active");
}