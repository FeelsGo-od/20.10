import displayProducts from './modules/Products/displayProducts.js';

function handleProducts() {
  let productsElem = document.querySelector('#products');
  let bestProductsElem = document.querySelector('#best-products');

  displayProducts(productsElem); // all products
}

handleProducts();
