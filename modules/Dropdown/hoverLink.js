export default function hoverLink(dropdownBtn) {
  let dropdownElement = dropdownBtn.parentNode;
  let dropdownBlock = dropdownElement.querySelector('.dropdown-block');

  dropdownBtn.addEventListener('mouseover', function () {
    dropdownBlock.style.opacity = 1;
    dropdownBlock.style.zIndex = 99;
  });

  dropdownBtn.addEventListener('mouseout', function () {
    dropdownBlock.style.opacity = 0;
    dropdownBlock.style.zIndex = -1;
  });
}
