import fetching from '../fetching.js';

export default function HeaderSearch(resultsBlock, input) {
  fetching('../../data/products.json').then((productsData) => {
    let products = productsData.products;

    // Find current search request
    let keywords = window.location.href.slice(
      window.location.href.indexOf('search/') + 7
    ).toLowerCase;

    input.addEventListener('input', () => {
      let value = input.value;
      value = value.toLowerCase();

      // Show search results(hints)
      document.querySelector('.search__opacity').style.display = 'block';
      document.querySelector('.header-search').style.border =
        '1px solid #4f4b4b !important';
      document.querySelector('.search__btn').style.filter = 'invert(1)';
      document.querySelector('.search__btn').style.borderLeft =
        'none !important';
      document.querySelector('.search__input').style.boxShadow =
        '-1pt 0 3pt 0.3pt #403c3c';
      document.querySelector('.search__results').style.display = 'flex';

      let filtered = products.filter((product) => {
        if (value !== '') {
          return product.title.toLowerCase().includes(value);
        }
      });

      let count = 0;

      if (filtered.length == 0) {
        resultsBlock.innerHTML = 'Not found';
      } else {
        resultsBlock.innerHTML = '';

        filtered.map((foundItem) => {
          if (filtered.length >= 6) count++;
          if (count > 6) return;

          let itemTitle = foundItem.title;

          if (foundItem.title.length > 20) {
            itemTitle = itemTitle.slice(0, 20) + '...';
          }
          resultsBlock.insertAdjacentHTML(
            'beforeend',
            `
                <a href="${foundItem.id}">${itemTitle}</a>
            `
          );
        });
      }
    });
  });
}
