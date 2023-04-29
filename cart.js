const updateCart = (slug, size, amount) => {
  let cart = getCart();
  if (!cart) cart = {};
  if (amount) {
    if (!cart[slug]) cart[slug] = {};
    cart[slug][size] = amount;
  } else {
    if (cart[slug] && cart[slug][size]) delete cart[slug][size];
    if (cart[slug] && Object.keys(cart[slug]).length === 0) delete cart[slug];
  }
  if (Object.keys(cart).length === 0) localStorage.removeItem("cart");
  else localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => JSON.parse(localStorage.getItem("cart")) ?? {};

const updateCartSizeFor = (slug, oldSize, newSize, amount) => {
  const cart = getCart();
  updateCart(
    slug,
    newSize,
    +amount +
      (cart[slug] ? (cart[slug][newSize] ? +cart[slug][newSize] : 0) : 0)
  );
  updateCart(slug, oldSize, 0);
};

const refreshCart = () => {
  const url = new URL(window.location);
  if (url.hash === "#checkout") openSlideOut("checkout");

  const list = document.getElementById("checkout-poster-items");
  list.innerHTML = "";

  const cart = getCart();
  if (!cart || Object.keys(cart).length === 0) {
    document.getElementById("checkout-body").style.display = "none";
    document.getElementById("checkout-empty").style.display = "flex";
  } else {
    document.getElementById("checkout-body").style.display = "flex";
    document.getElementById("checkout-empty").style.display = "none";

    for (let [poster, sizeAndAmount] of Object.entries(cart))
      for (let [size, amount] of Object.entries(sizeAndAmount))
        list.innerHTML += `
        <div class="poster-checkout">
          <h3>${POSTERS[poster]}</h3>
          <img src="./posters/${poster}.jpg" width="50" />
          <h4>Size:</h4>
          <select onchange="updateCartSizeFor('${poster}', '${size}', event.target.value, '${amount}'); refreshCart()">
          ${Object.keys(SIZES)
            .map(
              (availableSize) =>
                `<option value="${availableSize}" ${
                  availableSize === size ? "selected" : ""
                }>${availableSize} cm</option>`
            )
            .join("")}
          </select>
          <h4>Quantity:</h4>
          <div>
            <input type="number" value="${amount}" onchange="updateCart('${poster}', '${size}', event.target.value); refreshCart()" />
            <button onclick="updateCart('${poster}', '${size}', 0); refreshCart()">Remove</button>
          </div>
        </div>`;
  }

  const total = Object.entries(cart).reduce((acc, [_, sizeAndAmount]) => {
    return (acc += Object.entries(sizeAndAmount).reduce(
      (acc, [size, amount]) => {
        return (acc += Number(SIZES[size]) * amount);
      },
      0
    ));
  }, 0);
  document.getElementById("checkout-total-value").innerHTML = total;
  document.getElementById(
    "checkout-link"
  ).href = `mailto:kiry.loetscher@gmail.com?subject=Bestellung Poster OldTagz&body=Gerne würde ich folgende Bestellung aufgeben:%0d%0a%0d%0a${Object.entries(
    cart
  )
    .flatMap(([slug, sizeAndAmount]) =>
      Object.entries(sizeAndAmount).map(([size, amount]) => {
        return `• ${amount}x ${POSTERS[slug]} (${size}) à ${
          SIZES[size]
        } = ${Number(+amount * +SIZES[size])}.-`;
      })
    )
    .join("%0d%0a")}%0d%0a%0d%0aTotal: ${total}.-%0d%0a%0d%0aLiebe Grüsse`;
};
