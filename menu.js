const MENU_HTML = `
<div id="menu" class="slide-in" onshow="this.classList = ''">
  <button
    onclick="document.getElementById('menu').classList = 'slide-out'; setTimeout(() => document.body.removeChild(document.getElementById('menu')), 250)"
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
`