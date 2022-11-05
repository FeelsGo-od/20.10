import fetching from '../fetching.js';

export default function search(resultsBlock, input) {
  fetching('../../data/products.json').then((productsData) => {
    let products = productsData.products;

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
