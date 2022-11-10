export default function searchInput(toggleInput) {
  let input = toggleInput.querySelector('input');

  input.style.opacity = '1';
  toggleInput.style.width = '160px';
  toggleInput.style.border = '1px solid black';

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toggle-input') && e.target !== input) {
      input.style.opacity = '0';
      toggleInput.style.border = 'none';
    }
  });
}
