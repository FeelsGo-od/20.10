export default function searchInput(toggleBtn) {
  let input = toggleBtn.querySelector('.toggled-input');

  toggleBtn.addEventListener('click', function () {
    input.style.opacity = '1';
    toggleBtn.style.width = '175px';
    toggleBtn.style.border = '1px solid grey';
    toggleBtn.querySelector('.toggle-ic').style.borderLeft = '1px solid grey';
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toggle-input') && e.target !== input) {
      input.style.opacity = '0';
      setTimeout(() => {
        toggleBtn.style.width = '40px';
        toggleBtn.style.borderLeft = '0';
        toggleBtn.style.border = 'none';
        toggleBtn.querySelector('.toggle-ic').style.borderLeft = 'none';
      }, 175);
    }
  });
}
