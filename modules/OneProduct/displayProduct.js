import fetching from '../fetching.js';

let products = [];

export default function displayProduct(destImage, destDetails, id) {
  fetching('../../data/products.json').then((productsData) => {
    products = productsData.products;

    let found = products.find((product) => product.id == id);
    if (!found) {
      window.location.href = '/404';
      return;
    }

    document.title = found.title;

    destImage.insertAdjacentHTML(
      'beforeend',
      `<img src="${found.thumbnail}" alt="">`
    );

    destDetails.insertAdjacentHTML(
      'afterbegin',
      `<div class="product__title">${found.title}</div>
        <div class="product__description">
            ${found.description}
        </div>
        <div class="product__price">$ ${found.price} USD</div>`
    );
  });
}
