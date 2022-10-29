import fetching from '../fetching.js';

export default function displayProducts(
  dest,
  byRating = false,
  onlyFour = false
) {
  let products = [];

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

      if (!byRating) {
        //show all proucts
        products.map((product) => {
          if (product.id < startRange + 1 || product.id > endRange) return;

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
                          <div class="product__price">$ ${
                            product.price
                          } USD</div>
                      </div>`
          );
        });
        // sort products by rating
      } else if (byRating) {
        let filterRating = products.filter((product) => {
          return product.rating >= 5;
        });

        let count = 0;

        filterRating.map((product) => {
          if (onlyFour) count++;
          if (count > 4) return false;

          if (product.id < startRange + 1 || product.id > endRange) return;

          let description = product.description;

          dest.insertAdjacentHTML(
            'beforeend',
            `<div class="product">
                                    <div class="product__image"><img style="width: 100%; height: 100%; object-fit: contain;" src="${
                                      product.thumbnail
                                    }" alt=""></div>
                                    <div class="product__title">${
                                      product.title
                                    }</div>
                                    <div class="product__description">${
                                      description.slice(0, 80) + '...'
                                    }</div>
                                    <div class="product__price">$ ${
                                      product.price
                                    } USD</div>
                                </div>`
          );
        });
      }
    };
    addCards(currentPage);

    let throttleTimer;

    // optimize infinite-scroll with throttle
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
            document.body.querySelector('.product').offsetHeight * 2;

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

    window.addEventListener('scroll', handleInfiniteScroll);
  });
}
