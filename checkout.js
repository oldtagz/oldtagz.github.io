const CHECKOUT_HTML = `
<div id="checkout" class="slide-in">
  <h2>Shopping cart</h2>
  <button class="close" onclick="closeCheckout()">&#9587;</button>

  <div class="poster-checkout">
    <h3>Okubo Station 1AM</h3>
    <img src="./posters/okubo-station.jpg" width="50" />
    <h4>Size:</h4>
    <select>
      <option>21x30 cm</option>
    </select>
    <h4>Quantity:</h4>
    <input type="number" value="1" />
  </div>

  <p id="checkout-total">Total: 39CHF</p>

  <div id="checkout-actions">
    <button class="checkout-button">Checkout Instagram</button>
    <button class="checkout-button">Checkout Email</button>
  </div>
</div>
`

const openCheckout = () => {
  document.body.style.overflowY = 'hidden';
  document.body.innerHTML += CHECKOUT_HTML;
  setTimeout(() => document.getElementById('checkout').classList = '', 250)
}

const closeCheckout = () => {
  const checkout = document.getElementById('checkout')
  checkout.classList = 'slide-out';
  document.body.style.overflowY = 'scroll';
  setTimeout(() => document.body.removeChild(checkout), 250)
}