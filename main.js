import displayProducts from './modules/Products/displayProducts.js';

function handleProducts() {
  let productsElem = document.querySelector('#products');

  //*   displayProducts(productsElem. {}); // display just all products

  let byRating = true;
  let onlyFour = true;
  let byStock = true;

  let smartphones = 'smartphones';
  let watches = 'watches';
  let tablet = 'tablet';
  let laptops = 'laptops';

  displayProducts(productsElem, {}); // sorted products (by rating/stock) AND show only 4 products
}

handleProducts();
