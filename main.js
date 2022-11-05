import displayProducts from './modules/Products/displayProducts.js';
import displayProduct from './modules/OneProduct/displayProduct.js';
import addToCart from './modules/Cart/addToCart.js';
import displayCart from './modules/Cart/displayCart.js';
import search from './modules/Search/search.js';
import deleteFromCart from './modules/Cart/deleteFromCart.js';

function handleProducts() {
  let productsElem = document.querySelector('#products');
  if (!productsElem) return;

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

function handleProduct() {
  let dest = document.querySelector('.product-details');
  if (!dest) return; //if user not on product details page

  let productImage = dest.querySelector('.product__image');
  let productDetails = dest.querySelector('.details');

  let id = dest.id;

  displayProduct(productImage, productDetails, id);
}

handleProduct();

function handleCart() {
  let addBtn = document.querySelectorAll('.add-cart');

  for (let i = 0; i <= addBtn.length - 1; i++) {
    // pass currentProduct "id"
    addBtn[i].addEventListener('click', function () {
      let product = this.closest('.product');

      addToCart(product.id);
    });
  }

  let cartElement = document.querySelector('#cart');
  if (!cartElement) return;
  displayCart(cartElement);

  deleteFromCart();
}

handleCart();

function handleSearching() {
  let searchElements = document.querySelectorAll('.search');

  if (!searchElements) return;

  for (let searchElement of searchElements) {
    let searchInput = searchElement.querySelector('.search__input');
    let searchResults = searchElement.querySelector('.search__results');

    search(searchResults, searchInput);
  }
}

handleSearching();
