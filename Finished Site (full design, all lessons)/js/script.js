/* =========================================================
   MOBILE MENU
   JavaScript's only job: add or remove the class "menu-open"
   on <body>. All the visual changes live in css/style.css.
   ========================================================= */

const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#site-nav');

// Open or close the menu
function setMenu(isOpen) {
  document.body.classList.toggle('menu-open', isOpen);
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
}

// 1. Tapping the button switches between open and closed
menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  setMenu(!isOpen);
});

// 2. Tapping a link closes the menu (the page scrolls to that section)
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

// 3. Pressing the Escape key closes the menu
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

// 4. If the screen gets wide (desktop), reset the menu
window.matchMedia('(min-width: 768px)').addEventListener('change', (event) => {
  if (event.matches) setMenu(false);
});


/* =========================================================
   TRY IT: CHANGE ONE TOKEN
   Each swatch button sets --color-accent on the <html>
   element. Because every button, link and highlight uses
   var(--color-accent), the whole page updates at once.
   ========================================================= */

const swatches = document.querySelectorAll('.swatch');
const tokenValue = document.querySelector('#token-value');

swatches.forEach((swatch) => {
  swatch.addEventListener('click', () => {
    const color = swatch.dataset.color;            // e.g. "--purple"

    // The one line that changes the whole page:
    document.documentElement.style.setProperty('--color-accent', `var(${color})`);

    // Update the code readout and the selected button
    tokenValue.textContent = color;
    swatches.forEach((s) => s.setAttribute('aria-pressed', s === swatch));
  });
});
