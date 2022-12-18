import fetching from '../fetching.js';

export default function PageSearch(resultsBlock, input) {
  fetching('../../data/products.json').then((productsData) => {
    let products = productsData.products;

    // Find current search request
    let keywords = window.location.href.slice(
      window.location.href.indexOf('search/') + 7
    ).toLowerCase;

    input.addEventListener('input', () => {
      let value = input.value;
      value = value.toLowerCase();

      resultsBlock.style.display = 'grid';

      let filtered = products.filter((product) => {
        if (value !== '') {
          return product.title.toLowerCase().includes(value);
        }
      });

      let count = 0;

      if (value == '') {
        resultsBlock.innerHTML = '';
      } else if (filtered.length == 0) {
        resultsBlock.innerHTML = 'Not found';
      } else {
        resultsBlock.innerHTML = '';

        filtered.map((foundItem) => {
          if (filtered.length >= 9) count++;
          if (count > 9) return;

          let itemTitle = foundItem.title;

          if (foundItem.title.length > 25) {
            itemTitle = itemTitle.slice(0, 25) + '...';
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
