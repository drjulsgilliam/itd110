// Find the hamburger button and the menu on the page
const button = document.querySelector("button");
const menu = document.querySelector("nav");

// When the button is clicked, open or close the menu
button.addEventListener("click", function () {
    const isOpen = menu.classList.toggle("open");
    button.setAttribute("aria-expanded", isOpen);
});
