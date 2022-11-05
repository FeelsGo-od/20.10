import fetching from '../fetching.js';

let cart = {};

export default function addToCart(itemId) {
  fetching('../../data/products.json').then((productsData) => {
    let products = productsData.products;
    let found = products.find((item) => item.id == itemId);

    // cart feature
    if (itemId in cart) {
      cart[itemId].qty++;
    } else {
      let cartItem = {
        title: found.title,
        description: found.description,
        thumbnail: found.thumbnail,
        price: found.price,
        qty: 1,
      };
      cart[itemId] = cartItem;
    }

    localStorage.setItem(`cart-${found.title}`, JSON.stringify(cart));
  });
}
