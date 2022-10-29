import displayProducts from './modules/Products/displayProducts.js';

function handleProducts() {
  let productsElem = document.querySelector('#products');
  let bestProductsElem = document.querySelector('#best-products');

  //   displayProducts(productsElem); // all products

  let byRating = true;
  let onlyFour = true;
  displayProducts(bestProductsElem, byRating, onlyFour); // greatest products (sorted by rating) AND show only 4 products
}

handleProducts();
