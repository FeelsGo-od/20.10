let position = 0;

export default function addSlider(dest, slides) {
  let sliderBlocks = dest.querySelector('.slider__blocks'); //sliders place

  sliderBlocks.style.gridTemplateColumns = `repeat(${slides.length}, 100%)`;

  //display all slides
  slides.map((slide) => {
    sliderBlocks.insertAdjacentHTML(
      'beforeend',
      `
        <div class="slider__block" style="background: ${slide.bgColor}">
            <div class="slider__title">${slide.title}</div>
            <div class="slider__description">${slide.description}</div>
            <div class="slider__btn"></div>
        </div>
      `
    );
  });

  //auto-slide
  function handleMovement() {
    setTimeout(() => {
      let currentSlide = position.toString()[0];

      if (currentSlide < slides.length - 1) {
        position += 100;
      } else {
        position = 0;
      }
      sliderBlocks.style.left = `-${position}%`;

      handleMovement();
    }, 8500);
  }

  handleMovement();

  //arrows left/right
  function handleSwitchers() {
    let sliderBtns = dest.querySelector('.slider__buttons');

    let movePrev = document.createElement('button');
    let moveNext = document.createElement('button');

    movePrev.className += 'slider__btn slider-prevSlide';
    moveNext.className += 'slider__btn slider-nextSlide';

    movePrev.innerHTML = '<';
    moveNext.innerHTML = '>';

    sliderBtns.appendChild(movePrev);
    sliderBtns.appendChild(moveNext);

    movePrev.addEventListener('click', function () {
      let currentSlide = position.toString()[0]; //position 100 is 1-rst slide

      if (currentSlide <= 0) {
        position = (slides.length - 1) * 100;
      } else {
        position -= 100;
      }

      sliderBlocks.style.left = `-${position}%`;
    });

    moveNext.addEventListener('click', function () {
      let currentSlide = position.toString()[0];

      if (currentSlide >= slides.length - 1) {
        position = 0;
      } else {
        position += 100;
      }
      sliderBlocks.style.left = `-${position}%`;
    });
  }

  handleSwitchers();

  //certain slides
  function addOptions() {
    let sliderOptions = dest.querySelector('.slider__options');

    for (let i = slides.length - 1; i >= 0; i--) {
      sliderOptions.insertAdjacentHTML(
        'afterbegin',
        `
            <div class="slider__option slider-${i}">${i}</div>
        `
      );
    }
  }

  addOptions();

  function handleOptions() {
    let options = document.querySelectorAll('.slider__option');

    options.forEach((option) => {
      option.addEventListener('click', function () {
        sliderBlocks.style.left = `-${option.className.slice(-1) * 100}%`;
      });
    });
  }

  handleOptions();
}
