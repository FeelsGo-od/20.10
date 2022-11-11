export default function hoverLink(dropdownBtn) {
  let dropdownElement = dropdownBtn.parentNode;
  let dropdownBlock = dropdownElement.querySelector('.dropdown-block');

  dropdownBtn.addEventListener('mouseover', function () {
    dropdownBlock.style.display = 'block';
  });

  dropdownBtn.addEventListener('mouseout', function () {
    dropdownBlock.style.display = 'none';
  });
}
