import displayProducts from './modules/Products/displayProducts.js';

function handleProducts() {
  let productsElem = document.querySelector('.products');

  displayProducts(productsElem);
}

handleProducts();
