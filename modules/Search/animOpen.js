export default function searchInput(toggleBtn) {
  let input = document.querySelector('.toggled-input');
  let inputBtn = document.querySelector('.toggle-ic');

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', function () {
    input.style.opacity = '1';
    toggleBtn.style.width = '175px';
    toggleBtn.style.border = '1px solid grey';
    document.querySelector('.toggle-ic').style.borderLeft = '1px solid grey';
    // inputBtn.addEventListener('click', () => {
    //   window.location.href = ''
    // });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('toggle-input') && e.target !== input) {
      input.style.opacity = '0';
      setTimeout(() => {
        toggleBtn.style.width = '40px';
        toggleBtn.style.borderLeft = '0';
        toggleBtn.style.border = 'none';
        document.querySelector('.toggle-ic').style.borderLeft = 'none';
      }, 175);

      // Hide Search results (hints)
      let searchOpacity = document.querySelector('.search__opacity');
      let searchResults = document.querySelector('.search__results');
      if (
        getComputedStyle(searchOpacity).getPropertyValue('display') === 'block'
      ) {
        searchOpacity.style.display = 'none';
        inputBtn.style.filter = 'none';
      }
      if (
        getComputedStyle(searchResults).getPropertyValue('display') === 'flex'
      ) {
        searchResults.style.display = 'none';
      }
      if (getComputedStyle(input).getPropertyValue('boxShadow') !== 'none') {
        input.style.boxShadow = '';
      }
    }
  });
}
