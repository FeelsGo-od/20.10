import fetching from '../fetching.js';

let products = [];

export default function displayProduct(destImage, destDetails, id) {
  fetching('../../data/products.json').then((productsData) => {
    products = productsData.products;

    let found = products.find((product) => product.id == id);
    if (!found) {
      window.stop();
      window.location.href = '/404';
      return;
    }

    document.title = found.title;

    destDetails.insertAdjacentHTML(
      'afterbegin',
      `  <div class="card-wrapper">
      <div class="card">
        <!-- card left -->
        <div class="product-imgs">
          <div class="img-display">
            <div class="img-showcase">
              <img src="${found.thumbnail}" alt="${found.description}">
              <img src="${found.images[0]}" alt="${found.description}">
              <img src="${found.images[1]}" alt="${found.description}">
              <img src="${found.images[2]}" alt="${found.description}">
              <img src="${found.images[3]}" alt="${found.description}">
            </div>
          </div>
          <div class="img-select">
            <div class="img-arrows">
              <div class="img-arrow" id="left">
                <</div> <div class="img-arrow" id="right">>
              </div>
            </div>
            <div class="img-items">
              <div class="images">
                <div class="img-item">
                  <a href="#" data-id="1">
                    <img src="${found.thumbnail}" alt="shoe image">
                    <div class="img-text">Some text</div>
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="2">
                    <img src="${found.images[0]}" alt="shoe image">
                    <div class="img-text">Some text</div>
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="3">
                    <img src="${found.images[1]}" alt="shoe image">
                    <div class="img-text">Some text</div>
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="4">
                    <img src="${found.images[2]}" alt="shoe image">
                    <div class="img-text">Some text</div>
                  </a>
                </div>
                <div class="img-item">
                  <a href="#" data-id="5">
                    <img src="${found.images[3]}" alt="shoe image">
                    <div class="img-text">Some text</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- card right -->
        <div class="product-content">
          <h2 class="product-title">${found.title}</h2>
          <!-- <a href="#" class="product-link">add to favorite</a> -->
          <div class="product-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star-half-alt"></i>
            <span>${found.rating}(21)</span>
          </div>
  
          <div class="product-price">
            <!-- <p class="last-price">Old Price: <span>$257.00</span></p> -->
            <p class="new-price">New Price: <span>$${found.price} (5%)</span></p>
          </div>
  
          <div class="product-detail">
            <h2>about this item: </h2>
            <p>${found.description}</p>
            <ul>
              <li>Color: <span>Black</span></li>
              <li>Available: <span>${found.stock} in stock</span></li>
              <li>Category: <span>${found.category}</span></li>
              <li>Shipping Area: <span>All over the world</span></li>
              <li>Shipping Fee: <span>Free</span></li>
            </ul>
          </div>
  
          <!-- <div class="purchase-info">
            <input type="number" min="0" value="1">
            <button type="button" class="btn">
              Add to Cart <i class="fas fa-shopping-cart"></i>
            </button>
            <button type="button" class="btn">Compare</button>
          </div> -->
  
          <!-- <div class="social-links">
            <p>Share At: </p>
            <a href="#">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i class="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i class="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i class="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i class="fab fa-pinterest"></i>
            </a>
          </div> -->
        </div>
      </div>
    </div>`
    );
    const imgs = document.querySelectorAll('.img-select a');
    const imgBtns = [...imgs];
    let imgId = 1;

    // click on sliders mini-images
    imgBtns.forEach((imgItem) => {
      imgItem.addEventListener('click', (event) => {
        event.preventDefault();
        imgId = imgItem.dataset.id;
        slideImage();
      });
    });

    // open sliders big image
    function slideImage() {
      const displayWidth = document.querySelector(
        '.img-showcase img:first-child'
      ).clientWidth;

      document.querySelector('.img-showcase').style.transform = `translateX(${
        -(imgId - 1) * displayWidth
      }px)`;
    }

    window.addEventListener('resize', slideImage);

    // sliders controls btns
    let slides = document.querySelector('.img-items');
    let slide = slides.children[0];
    let slidesSpace = getComputedStyle(slide);
    slidesSpace = slidesSpace.getPropertyValue('margin-left');
    slidesSpace = Number(slidesSpace.slice(0, -2));
    slidesSpace = +slidesSpace.toFixed() * 2;

    let pos = 0;

    left.addEventListener('click', function () {
      pos += document.querySelector('.img-item').clientWidth;
      checkLeftEdge();
      slides.style.marginLeft = `${pos}px`;
    });
    right.addEventListener('click', function () {
      pos -= document.querySelector('.img-item').clientWidth;
      checkRightEdge();
      slides.style.marginLeft = `${pos}px`;
    });

    function checkLeftEdge() {
      if (pos >= 0) pos = 0;
    }

    function checkRightEdge() {
      if (
        pos <=
        -+Number(
          getComputedStyle(document.querySelector('.images'))
            .getPropertyValue('width')
            .slice(0, -2)
        ).toFixed() +
          document.body.clientWidth
      ) {
        pos =
          -+Number(
            getComputedStyle(document.querySelector('.images'))
              .getPropertyValue('width')
              .slice(0, -2)
          ).toFixed() + document.querySelector('.product-imgs').clientWidth;
      }
    }
  });
}
