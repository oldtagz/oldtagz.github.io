const updateCart = (slug, size, amount) => {
  let cart = getCart();
  if (!cart) cart = {};
  if (!cart[slug]) cart[slug] = {};
  cart[slug][size] = amount;
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getCart = () => JSON.parse(localStorage.getItem("cart"));

const refreshCart = () => {
  const url = new URL(window.location);
  if (url.hash === "#checkout") openSlideOut("checkout");

  const cart = getCart();
  const list = document.getElementById("checkout-poster-items");
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
          <select>
            <option>${size} cm</option>
          </select>
          <h4>Quantity:</h4>
          <input type="number" value="${amount}" />
        </div>`;
  }

  document.getElementById("checkout-total-value").innerHTML = Object.entries(
    cart
  ).reduce((acc, [_, sizeAndAmount]) => {
    return (acc += Object.entries(sizeAndAmount).reduce(
      (acc, [size, amount]) => {
        return (acc += Number(SIZES[size]) * amount);
      },
      0
    ));
  }, 0);
};
