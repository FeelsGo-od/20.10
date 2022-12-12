export default function hoverLink(dropdownBtn) {
  let dropdownElement = dropdownBtn.parentNode;
  let dropdownBlock = dropdownElement.querySelector('.dropdown-block');
  let links = dropdownBlock.querySelectorAll('a');

  function showDropdown() {
    dropdownBlock.style.opacity = 1;
    dropdownBlock.style.zIndex = 99;
    dropdownBlock.style.pointerEvents = 'all';
    for (let link of links) {
      link.style.color = '#000';
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      dropdownBlock.style.position = 'static';
    }
  }

  function hideDropdown() {
    dropdownBlock.style.opacity = 0;
    dropdownBlock.style.zIndex = -1;
    dropdownBlock.style.pointerEvents = 'none';
    for (let link of links) {
      link.style.color = '#fff';
    }
    if (window.matchMedia('(max-width: 768px)').matches) {
      dropdownBlock.style.position = 'absolute';
    }
  }

  if (window.matchMedia('(max-width: 768px)').matches) {
    dropdownBtn.addEventListener('click', () => {
      if (dropdownBlock.style.opacity == 1) {
        hideDropdown();
      } else {
        showDropdown();
      }
    });
  } else if (window.matchMedia('(min-width: 769px)').matches) {
    dropdownBtn.addEventListener(
      'mouseover',
      function () {
        showDropdown();
      },
      false
    );

    dropdownBtn.addEventListener(
      'mouseout',
      function () {
        hideDropdown();
      },
      false
    );
  }
}
