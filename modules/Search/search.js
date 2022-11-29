import fetching from '../fetching.js';

export default function search(resultsBlock, input) {
  fetching('../../data/products.json').then((productsData) => {
    let products = productsData.products;

    // Find current search request
    let keywords = window.location.href.slice(
      window.location.href.indexOf('search/') + 7
    ).toLowerCase;
    console.log(keywords);

    input.addEventListener('change', () => {
      let value = input.value;
      value = value.toLowerCase();

      let filtered = products.filter((product) => {
        return product.title.toLowerCase().includes(value);
      });

      if (filtered.length == 0) {
        resultsBlock.innerHTML = 'Not found';
      } else {
        resultsBlock.innerHTML = '';

        filtered.map((foundItem) => {
          resultsBlock.insertAdjacentHTML(
            'beforeend',
            `
                <a href="${foundItem.id}">${foundItem.title}</a>
            `
          );
        });
      }
    });
  });
}
