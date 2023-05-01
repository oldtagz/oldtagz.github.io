const POSTERS = {
  shinjuku: "Shinjuku-ku",
  "okubo-station": "Okubo Station 1AM",
  jdm: "JDM",
  "toyota-taxi": "Toyota Taxi",
};

const SIZES = {
  "21x30": "39",
  "30x40": "45",
  "40x50": "55",
  "50x70": "69",
};

const sizeSelectClosed = `
      <p>Select size:</p>
      <div id="size-select-closed" onclick="openSizeSelect()">
        <span id="size-select-closed-selected"></span>
        <span class="down-arrow">&#9660;</span>
      </div>`;

const posterPage = `
    <h2 id="title"></h2>
    <h3>Edition</h3>
    <h4>u:ma:mi</h4>

    <img id="poster" />

    <div id="purchase">
      <div id="size-select">${sizeSelectClosed}</div>

      <div
        class="add-to-cart"
        onclick="window.location.href = '#checkout'; updateCart(state.poster, state.size, 1); refreshCart();"
      >
        <span>Add to cart</span>
      </div>
    </div>`;

const sizeSelectOpen = `
      <div id="size-select-open">
        <button class="close" onclick="closeSizeSelect()"></button>
        <p>Select Size:</p>
        <ul id="size-select-open-list"></ul>
      </div>`;

const getPosterFromLink = (url) => {
  const posterFromLink = new URL(
    url || window.location.href.replace("#", "")
  ).searchParams.get("poster");
  if (typeof posterFromLink === "string")
    if (!Object.keys(POSTERS).includes(posterFromLink))
      window.location = "#posters";
    else return posterFromLink;
  else return null;
};

const openPoster = (poster, event) => {
  window.location.href = `#?poster=${poster}`;

  const posterElement = document.createElement("section");
  posterElement.setAttribute("id", "poster-page");
  posterElement.style.transform += `translate3d(${
    event && event.x ? `${event.x}px` : "50vw"
  },${event && event.y ? `${event.y}px` : "50vh"}, 0)`;
  setTimeout(() => (posterElement.classList = "open"), 0);
  document.body.appendChild(posterElement);
  document.body.style.overflow = "hidden";

  if (!poster) {
    poster = getPosterFromLink();
    if (!poster) window.location = "#posters";
  }

  window.addEventListener("hashchange", (event) => {
    if (!getPosterFromLink(event.newURL.replace("#", ""))) {
      const posterPage = document.getElementById("poster-page");
      if (posterPage) {
        posterPage.style.transform = "unset";
        posterPage.classList = "close";
      }
      document.body.style.overflow = "scroll";
      setTimeout(() => {
        try {
          posterPage.remove();
        } catch (e) {}
      }, 250);
    }
  });

  state.poster = poster;
  state.size = Object.keys(SIZES)[0];

  const title = POSTERS[poster];
  document.title = title;
  document.getElementById("poster-page").innerHTML += posterPage;
  document.getElementById("poster").src = `./posters/${poster}.jpg`;
  document.getElementById("title").innerHTML = title;
  setSizeSelect(state.size);
};

let state = {
  size: "",
  poster: "",
};

const refreshSizeSelected = () =>
  (document.getElementById("size-select-closed-selected").innerHTML = `${
    state.size
  }cm, CHF${SIZES[state.size]},`);

const setSizeSelect = (size) => {
  state.size = size;
  closeSizeSelect();
};
const openSizeSelect = () => {
  document.getElementById("size-select").innerHTML = sizeSelectOpen;
  for (const [size, price] of Object.entries(SIZES)) {
    document.getElementById(
      "size-select-open-list"
    ).innerHTML += `<li onclick=setSizeSelect("${size}")>${size}cm CHF${price},</li>`;
  }
};
const closeSizeSelect = () => {
  document.getElementById("size-select").innerHTML = sizeSelectClosed;
  refreshSizeSelected();
};
