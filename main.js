// !move imports in /imports folder(create it)
import displayProducts from './modules/Products/displayProducts.js';
import displayProduct from './modules/OneProduct/displayProduct.js';
import addToCart from './modules/Cart/addToCart.js';
import displayCart from './modules/Cart/displayCart.js';
import search from './modules/Search/search.js';
import deleteFromCart from './modules/Cart/deleteFromCart.js';
import addSlider from './modules/Slider/slider.js';
import animOpen from './modules/Search/animOpen.js';
import hoverLink from './modules/Dropdown/hoverLink.js';
import hambMenu from './modules/Dropdown/hambMenu.js';
import renderHeader from './components/header.js';

function handleRender() {
  renderHeader();
}

handleRender();

function handleProducts() {
  // !again use that url string with category(if its category)(/products/:category) to set certain class and display products in that
  // !if its /products then display all products in that class, if / ,then only four mostselled products.
  let productsElem = document.querySelector('#products');
  let mostSelled = document.querySelector('.most-selled__demo');
  let allProducts = document.querySelector('.all-products');
  let laptopsProducts = document.querySelector('.laptops');
  let smartphonesProducts = document.querySelector('.smartphones');
  let watchesProducts = document.querySelector('.watches');
  let tabletProducts = document.querySelector('.tablet');
  let mostSelledProducts = document.querySelector('.best-selling');
  let bestProducts = document.querySelector('.latest-greatest');

  // displayProducts(productsElem, {}); // display just all products

  let byRating = true;
  let onlyFour = true;
  let byStock = true;

  // !refactor it by checking url /products/:category(if url contains it) and set :category to variable category to sort by it
  let smartphones = 'smartphones';
  let watches = 'watches';
  let tablet = 'tablet';
  let laptops = 'laptops';

  displayProducts(mostSelled, { byStock, onlyFour });

  displayProducts(allProducts, {});

  displayProducts(laptopsProducts, { laptops });
  displayProducts(smartphonesProducts, { smartphones });
  displayProducts(watchesProducts, { watches });
  displayProducts(tabletProducts, { tablet });
  displayProducts(mostSelledProducts, { byStock });
  displayProducts(bestProducts, { byRating });

  // displayProducts(productsElem, { byRating, onlyFour }); // sorted products (by rating/stock) AND show only 4 products
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

  let toggleBtn = document.querySelector('.toggle-input');
  animOpen(toggleBtn);
}

handleSearching();

function handleSlider() {
  // !move it to /data
  let slides = [
    {
      bgColor: '#DCE5E2',
      title: 'The new phones are here take a look.',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam, tempor. Faucibus morbi turpis.',
    },
    {
      bgColor: 'rgb(182, 182, 249)',
      title: 'The new phones are here take a look. 2',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam, tempor. Faucibus morbi turpis. 2',
    },
    {
      bgColor: 'rgb(181, 181, 181)',
      title: 'The new phones are here take a look. 3',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scelerisque in est dui, aliquam, tempor. Faucibus morbi turpis. 3',
    },
  ];
  let dest = document.querySelector('.slider');
  if (!dest) return;
  addSlider(dest, slides);
}

handleSlider();

function handleDropdown() {
  let dropdownBtns = document.querySelectorAll('.header__dropdown');

  for (let dropdownBtn of dropdownBtns) {
    hoverLink(dropdownBtn);
  }
}

handleDropdown();

function handleHamburger() {
  let btn = document.querySelector('.header__mobile');
  hambMenu(btn);
}

handleHamburger();
