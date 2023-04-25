
const updateCart = (slug, size, amount) => {
    let cart = getCart();
    if (!cart) cart = {}
    if (!cart[slug]) cart[slug] = {}
    cart[slug][size] = amount;
    localStorage.setItem("cart", JSON.stringify(cart))
}

const getCart = () => JSON.parse(localStorage.getItem("cart"))