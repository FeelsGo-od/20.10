export default function hambMenu(btn) {
  let menuLinks = document.querySelector('.header__links');
  let closeMenu = document.querySelector('.header__close');

  btn.addEventListener('click', () => {
    menuLinks.style.display = 'block';
    btn.style.display = 'none';
    closeMenu.style.display = 'block';
  });

  closeMenu.addEventListener('click', () => {
    menuLinks.style.display = 'none';
    btn.style.display = 'flex';
    closeMenu.style.display = 'none';
  });
}
