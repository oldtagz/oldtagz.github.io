const MENU_HTML = `
<div id="menu" class="slide-in" onshow="this.classList = ''">
  <button
    onclick="closeMenu()"
    id="menu-close-button"
    class="close"
  >
    &#9587;
  </button>

  <ul>
    <li>POSTERS</li>
    <li>ABOUT</li>
  </ul>

  <div id="contact">
    <a id="email" href="mailto:kiry.loetscher@gmail.com">
      <button></button>
    </a>
    <a id="instagram" href="https://instagram.com/oldtagz" target="_blank">
      <button></button>
    </a>
  </div>
</div>
`;

const openMenu = () => {
  document.getElementById("menu-button").style.opacity = "0.1";
  document.body.style.overflowY = "hidden";
  document.body.innerHTML += MENU_HTML;
  setTimeout(() => (document.getElementById("menu").classList = ""), 250);
};

const closeMenu = () => {
  document.getElementById("menu-button").style.opacity = "1";
  const menu = document.getElementById("menu");
  menu.classList = "slide-out";
  document.body.style.overflowY = "scroll";
  setTimeout(() => document.body.removeChild(menu), 250);
};
