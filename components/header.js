let header = document.querySelector('header');

export default function renderHeader() {
  header.insertAdjacentHTML(
    'afterbegin',
    `
        <a href="/"><img class="header__logo" src="../images/logo.svg" alt="california logo"></a>
        <nav class="header__nav">
            <div class="header__mobile">
                <img src="../images/bars.svg" class="mobile-btn" alt="menu navbar">
                <span>Menu</span>
            </div>
            <div class="header__close">X</div>
            <ul class="header__links">
                <li class="header__link"><a href="/products">all products</a></li>
                <li class="header__link header__dropdown">
                    <div class="header-open_dropdown open_dropdown">
                        <p>Solutions</p>
                        <button class="header__dropdown-btn">
                            <svg width="12" height="8" viewBox="0 0 12 8" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g clip-path="url(#clip0_1_12)">
                                    <path d="M11 1L6 6L1 1" stroke="#070847" stroke-width="1.5" />
                                </g>
                                <defs>
                                    <clipPath id="clip0_1_12">
                                        <rect width="12" height="8" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>
                        </button>
                    </div>
                    <div class="header__dropdown-block dropdown-block">
                        <ul class="header__dropdown_menu">
                            <li class="header__link"><a href="/products/laptops">Laptops</a></li>
                            <li class="header__link"><a href="/products/smartphones">Phones</a></li>
                            <li class="header__link"><a href="/products/watches">Watches</a></li>
                            <li class="header__link"><a href="/products/tablet">Tablet</a></li>
                            <li class="header__link"><a href="/products/best-selling">BEST SELLING</a></li>
                            <li class="header__link"><a href="/products/latest-greatest">Latest&Greatest</a></li>
                            <li class="header__link"><a href="/blog">BLOG</a></li>
                            <li class="header__link"><a href="/newspaper">Newspaper</a></li>
                        </ul>
                    </div>
                </li>
                <li class="header__link"><a href="/about">ABOUT</a></li>
                <li class="header__link"><a href="/support">Support</a></li>
            </ul>
        </nav>
        <div class="header__buttons">
            <button class="header__button header__searchBtn toggle-input">
                <input class="toggled-input" type="text">
                <img class="toggle-ic toggle-input" src="../images/search.svg" alt="">
            </button>
            <button class="header__button">
                <img src="../images/cart.svg" alt="">
            </button>
        </div>
        `
  );
}
