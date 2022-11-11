export default function searchInput(toggleInput) {
  let input = toggleInput.querySelector('input');

  input.style.opacity = '1';
  toggleInput.style.width = '160px';
  toggleInput.style.border = '1px solid black';
  toggleInput.querySelector('.toggle-ic').style.borderLeft = '1px solid grey';
  toggleInput.style.transform = 'scale(1.04)';

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toggle-input') && e.target !== input) {
      input.style.opacity = '0';
      toggleInput.style.borderLeft = '0';
      toggleInput.style.border = 'none';
      toggleInput.style.width = '0';
      toggleInput.querySelector('.toggle-ic').style.borderLeft = 'none';
      toggleInput.style.transform = 'scale(1)';
    }
  });
}
