import fetching from '../fetching.js';

export default function displayProducts(
  dest,
  {
    byRating = false,
    byStock = false,
    onlyFour = false,

    smartphones = false,
    watches = false,
    tablet = false,
    laptops = false,
  }
) {
  let products = [];
  let category = false;
  if (smartphones || watches || tablet || laptops) {
    if (smartphones) category = smartphones;
    if (watches) category = watches;
    if (tablet) category = tablet;
    if (laptops) category = laptops;
  }

  function createProduct(product) {
    let description = product.description;

    dest.insertAdjacentHTML(
      'beforeend',
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
  }

  fetching('../../data/products.json').then((productsData) => {
    products = productsData.products;

    //pagination entries
    const loader = document.getElementById('loader');
    const productsIncrease = 15;
    const productsLimit = products.length;
    const pageCount = Math.ceil(productsLimit / productsIncrease);
    let currentPage = 1;

    //add products of current page
    const addCards = (pageIndex) => {
      currentPage = pageIndex;

      const startRange = (pageIndex - 1) * productsIncrease;
      const endRange =
        currentPage == pageCount ? productsLimit : pageIndex * productsIncrease;

      if (!byRating && !byStock && !category) {
        //show all proucts
        let count = 0;
        products.map((product) => {
          if (onlyFour) count++;
          if (count > 4) return false;

          if (product.id < startRange + 1 || product.id > endRange) return;
          createProduct(product);
        });
      } else if (byRating) {
        // sort products by rating
        let filterRating = products.filter((product) => {
          return product.rating >= 5;
        });

        let count = 0;

        filterRating.map((product) => {
          if (onlyFour) count++;
          if (count > 4) return false;

          if (product.id < startRange + 1 || product.id > endRange) return;

          createProduct(product);
        });
      } else if (byStock) {
        // sort products by stock
        let sortedProducts = products.sort((a, b) => a.stock - b.stock);

        let count = 0;

        sortedProducts.map((product) => {
          if (onlyFour) count++;
          if (count > 7) return false;

          if (product.id < startRange + 1 || product.id > endRange) return;

          createProduct(product);
        });
      } else if (smartphones || watches || tablet || laptops) {
        // sort products by category
        let sortedByCat = products.filter((product) => {
          return product.category === category && product;
        });

        let count = 0;

        sortedByCat.map((product) => {
          if (onlyFour) count++;
          if (count > 7) return false;

          if (product.id < startRange + 1 || product.id > endRange) return;

          createProduct(product);
        });
      }
    };
    addCards(currentPage);

    // optimize infinite-scroll with throttle
    let throttleTimer;

    const throttle = (callback, time) => {
      if (throttleTimer) return;

      throttleTimer = true;

      setTimeout(() => {
        callback();
        throttleTimer = false;
      }, time);
    };

    const handleInfiniteScroll = () => {
      throttle(() => {
        const endOfPage =
          window.innerHeight + (window.pageYOffset + window.innerHeight) >=
          document.body.offsetHeight -
            document.body.querySelector('.product').offsetHeight;

        if (endOfPage) {
          addCards(currentPage + 1);
        }

        if (currentPage === pageCount) {
          removeInfiniteScroll();
        }
      }, 1000);
    };

    const removeInfiniteScroll = () => {
      if (loader) loader.remove();
      window.removeEventListener('scroll', handleInfiniteScroll);
    };

    handleInfiniteScroll();
    window.addEventListener('scroll', handleInfiniteScroll);
  });
}
