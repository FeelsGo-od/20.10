export default function displayCart(dest) {
  let cart = [];
  let key;

  for (let i = 0; i < window.localStorage.length; i++) {
    key = window.localStorage.key(i);
    if (key.slice(0, 4) === 'cart') {
      cart.push(JSON.parse(window.localStorage.getItem(key)));
    }
  }

  cart.map((item) => {
    let currentItem = item[Object.keys(item)];

    dest.insertAdjacentHTML(
      'beforeend',
      `
        <div class="product">
            <img src="${currentItem.thumbnail}" class="product__image">
            <div class="product__title">${currentItem.title}</div>
            <div class="product__description">${currentItem.description}</div>
            <button type="submit" class="cart__delete">delete from cart</button>
        </div>
      `
    );
  });
}
