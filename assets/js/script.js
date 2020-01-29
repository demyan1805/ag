const slider = function(startSlide) {
    sliderControls = document.querySelector('.slider__controls');
    slides = document.querySelectorAll('.slide');
    controlItems = sliderControls.querySelectorAll('.slider__controls-item');
    currentSlide = startSlide || 0;

    controlItems.forEach((element, index) => {
        element.index = index
        element.addEventListener('click', e => {
            console.log(e.target)
            setActiveSlide(e.target.index || e.target.parentNode.index)
        });
    });

    function setActiveSlide(index) {
        currentSlide = index;
        for (let i = 0; i < slides.length; i++) {
            if (i == index) {
                slides[i].className = 'slide slide--active';
                controlItems[i].className = 'slider__controls-item slider__controls-item--active';
            }
            else if (i < index) {
                slides[i].className = 'slide slide--previous';
                controlItems[i].className = 'slider__controls-item';
            }
            else {
                slides[i].className = 'slide slide--next';
                controlItems[i].className = 'slider__controls-item';
            }
        }
    };
    setActiveSlide(currentSlide);

};

function scrollTipsChangeInit() {
    let activeScreen = 0;
    let scrollTips = document.querySelectorAll('.header__nav-item');
    let screenPositions = [];

    scrollTips.forEach((tip, index) => {
        screenPositions.push(document.getElementById(`${index+1}`).getBoundingClientRect().top + window.scrollY)
    });

    function scrollTipChange(scrollOffset) {
        if (scrollOffset > screenPositions[4] - (window.innerHeight / 3) && activeScreen!=4){
            setActiveTip(4);
        } else if (scrollOffset > screenPositions[3] - (window.innerHeight / 3) && scrollOffset < screenPositions[4] - (window.innerHeight / 3) && activeScreen!=3){
            setActiveTip(3);
        } else if (scrollOffset > screenPositions[2] - (window.innerHeight / 3) && scrollOffset < screenPositions[3] - (window.innerHeight / 3) && activeScreen!=2){
            setActiveTip(2);
        } else if (scrollOffset > screenPositions[1] - (window.innerHeight / 3) && scrollOffset < screenPositions[2] - (window.innerHeight / 3) && activeScreen!=1){
            setActiveTip(1);
        } else if (scrollOffset < screenPositions[1] - (window.innerHeight / 3) && activeScreen!=0){
            setActiveTip(0);
        }
    }

    function setActiveTip(index) {
        scrollTips.forEach((tip, i) => {
            if (i != index) {
                tip.classList.remove('header__nav-item--active');
            } else {
                tip.classList.add('header__nav-item--active');
            }
        });
        activeScreen = index;
    }

    window.addEventListener('scroll', e => {
        scrollTipChange(window.scrollY);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    scrollTipsChangeInit();
    slider(0);
})
