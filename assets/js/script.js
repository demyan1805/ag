const slider = function() {
    sliderControls = document.querySelector('.slider__controls');
    slides = document.querySelectorAll('.slide');
    controlItem = sliderControls.querySelectorAll('.slider__controls-item');
    currentSlide = 0;

    controlItem.forEach((element, index) => {
        element.addEventListener('click', setActiveSlide(index));
    });

    function setActiveSlide(index) {
        currentSlide = index;
        for (let i = 0; i < slides.length - 1; i++) {
            if (i == index) {
                slides[i].classList.setClass('slide slide--active')
            }
            else if (i < index) {
                slides[i].classList.setClass('slide slide--previous')
            }
            else if (i > index) {
                slides[i].classList.setClass('slide slide--next')
            }
        }
    };

};

const scrollTipsChange = function() {
    scrollTips = document.querySelectorAll('.header__nav-item');
    firstScreeenPosition = document.getElementById('1').getBoundingClientRect().top + window.scrollY;
    secondScreeenPosition = document.getElementById('2').getBoundingClientRect().top + window.scrollY;
    thirdScreeenPosition = document.getElementById('3').getBoundingClientRect().top + window.scrollY;
    fourthScreeenPosition = document.getElementById('4').getBoundingClientRect().top + window.scrollY;
    fifthScreeenPosition = document.getElementById('5').getBoundingClientRect().top + window.scrollY;
}

