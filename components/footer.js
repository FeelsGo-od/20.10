let footer = document.querySelector('footer');

export default function renderFooter() {
  footer.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="footer__blocks">
        <div class="footer__info">
            <img class="footer__logo" src="../images/logo.svg" alt="site logo in footer">
            <div class="footer__description">Sign up for texts to be notified about our best offers on the perfect gifts.</div>
        </div>
        <div class="footer__block">
            <div class="footer__title">All products</div>
            <ul class="footer__links">
                <li class="footer__link"><a href="/products/smartphones">Phones</a></li>
                <li class="footer__link"><a href="/products/watches">Watch</a></li>
                <li class="footer__link"><a href="/products/tablet">Tablet</a></li>
                <li class="footer__link"><a href="/products/laptops">Laptops</a></li>
            </ul>
        </div>
        <div class="footer__block">
            <div class="footer__title">Company</div>
            <ul class="footer__links">
                <li class="footer__link"><a href="/about">About</a></li>
                <li class="footer__link"><a href="/support">Support</a></li>
            </ul>
        </div>
        <div class="footer__block">
            <div class="footer__title">Support</div>
            <ul class="footer__links">
                <li class="footer__link"><a href="/">Style Guide</a></li>
                <li class="footer__link"><a href="/">Licensing</a></li>
                <li class="footer__link"><a href="/">Change Log</a></li>
                <li class="footer__link"><a href="/">Contact</a></li>
            </ul>
        </div>
        <div class="footer__block">
            <div class="footer__title">Follow Us</div>
            <ul class="footer__links">
                <li class="footer__link"><a href="/">Instagram</a></li>
                <li class="footer__link"><a href="/">Facebook</a></li>
                <li class="footer__link"><a href="/">LinkedIn</a></li>
                <li class="footer__link"><a href="/">Youtube</a></li>
            </ul>
        </div>
    </div>
    <div class="footer__madeBy">
        Layout Made By: <a href="">Andrewdev</a>
    </div>
        `
  );
}
