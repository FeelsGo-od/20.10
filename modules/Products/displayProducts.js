import fetching from '../fetching.js';

export default function displayProducts(dest) {
  let products = [];

  fetching('../../data/products.json').then((productsData) => {
    products = productsData.products;

    products.map((product) => {
      let description = product.description;

      description.slice(0, 80);

      dest.insertAdjacentHTML(
        'afterbegin',
        `<div class="product">
                <div class="product__image"><img style="width: 100%; height: 100%; object-fit: contain;" src="${
                  product.thumbnail
                }" alt=""></div>
                <div class="product__title">${product.title}</div>
                <div class="product__description">${
                  description.slice(0, 80) + '...'
                }</div>
                <div class="product__price">$ ${product.price} USD</div>
            </div>`
      );
    });
  });
}
