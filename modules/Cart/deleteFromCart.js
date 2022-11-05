export default function deleteFromCart() {
  let deleteBtns = document.querySelectorAll('.cart__delete');

  for (let deleteBtn of deleteBtns) {
    deleteBtn.addEventListener('click', function () {
      let currentItem = deleteBtn.closest('.product');

      localStorage.removeItem(
        `cart-${currentItem.querySelector('.product__title').textContent}`
      );

      location.reload(true);
    });
  }
}
