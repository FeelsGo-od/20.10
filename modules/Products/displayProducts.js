import fetching from '../fetching.js';

export default function displayProducts(
  dest,
  {
    byRating = false,
    byStock = false,
    onlyFour = false,

    category = '',
  }
) {
  if (!dest || dest === '') return;
  let products = [];

  function createProduct(product) {
    let description = product.description;
    let title = product.title;
    if (title.length >= 27) {
      title = title.slice(0, 24);
      title += '...';
    }

    dest.insertAdjacentHTML(
      'beforeend',
      `<a href="/${product.id}" class="product">
                <div class="product__image"><img style="width: 100%; height: 100%; object-fit: contain;" src="${
                  product.thumbnail
                }" alt=""></div>
                <div class="product__title">${title}</div>
                <div class="product__description">${
                  description.slice(0, 80) + '...'
                }</div>
                <div class="product__price">$ ${product.price} USD</div>
            </a>`
    );
  }

  fetching('../../data/products.json').then((productsData) => {
    products = productsData.products;

    //products (loading)pagination entries
    const loader = document.getElementById('loader');
    const productsIncrease = 15;
    const productsLimit = products.length;
    const pagesCount = Math.ceil(productsLimit / productsIncrease);
    let currentPage = 1;
    let disableThrottle = false;

    //add products of current products page
    const addCards = (pageIndex) => {
      currentPage = pageIndex;
      const startRange = (pageIndex - 1) * productsIncrease;
      const endRange =
        currentPage == pagesCount
          ? productsLimit
          : pageIndex * productsIncrease;

      if (!byRating && !byStock && category === '') {
        //show all products
        let count = 0;
        products.map((product) => {
          // check if there are only four products to show
          // !refactor this(make separate function)
          if (onlyFour) count++;
          if (count > 4) {
            if (loader) loader.remove();
            return false;
          }

          if (product.id < startRange + 1 || product.id > endRange) return;
          createProduct(product);
        });
      } else if (category !== '') {
        // sort products by category
        let sortedByCat = products.filter((product) => {
          return product.category === category && product;
        });

        let count = 0;

        sortedByCat.map((product) => {
          if (onlyFour) count++;
          if (count > 4) {
            if (loader) loader.remove();
            return false;
          }

          if (sortedByCat.length < 11) {
            createProduct(product);
            disableThrottle = true;
          } else {
            if (product.id < startRange + 1 || product.id > endRange) return;
            createProduct(product);
          }
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
      if (disableThrottle) {
        if (loader) loader.remove();
        return;
      }
      throttle(() => {
        const endOfPage =
          window.innerHeight + (window.pageYOffset + window.innerHeight) >=
          document.body.offsetHeight -
            document.body.querySelector('.product').offsetHeight;

        if (endOfPage) {
          addCards(currentPage + 1);
        }

        if (onlyFour && currentPage !== pagesCount) {
          setTimeout(() => {
            addCards(currentPage + 1);
            handleInfiniteScroll();
          }, 10);
        }

        if (currentPage === pagesCount) {
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

    // Sorting (later will be replaced with REST API... and also, Image preloading like on Amazon)
    if (byStock) {
      let sortedProducts = products.sort((a, b) => a.stock - b.stock);
      let count = 0;

      sortedProducts.map((product) => {
        if (onlyFour) count++;
        if (count > 4) {
          if (loader) loader.remove();
          return false;
        }

        if (loader) loader.remove();
        createProduct(product);
      });
    } else if (byRating) {
      let filterRating = products.filter((product) => {
        return product.rating >= 5;
      });
      let count = 0;

      filterRating.map((product) => {
        if (onlyFour) count++;
        if (count > 4) {
          if (loader) loader.remove();
          return false;
        }

        if (loader) loader.remove();
        createProduct(product);
      });
    }
  });
}
