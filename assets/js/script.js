const slider = function(startSlide) {
    sliderControls = document.querySelector('.slider__controls');
    slides = document.querySelectorAll('.slide');
    controlItems = sliderControls.querySelectorAll('.slider__controls-item');
    currentSlide = startSlide;

    controlItems.forEach((element, index) => {
        element.index = index;
        element.addEventListener('click', e => {
            setActiveSlide(e.target.index || e.target.parentNode.index);
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
    }

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

const setActiveForm = function(formType) {
    const getScreen = document.querySelector('.get');
    switch (formType) {
        case 'contact-form':
            getScreen.className = 'get get--contact';
            break;
        
        case 'code-form':
            getScreen.className = 'get get--code';
            break;

        case 'success':
            getScreen.className = 'get get--success';
            break;
    }
}

const startTimer = function(count) {
    const wrapper = document.querySelector('.get__retry-timer');
    const btn = document.querySelector('.get__retry-btn');
    const value = wrapper.querySelector('.get__retry-timer-value');
    let remaining = count*1000;
    btn.style.display = 'none';
    wrapper.style.display = 'block';

    function tick(t) {
        value.innerHTML = `${Math.floor(remaining/60)}:${remaining%60}`
        setTimeout(() => {
            remaining -= t;
            console.log('aa');
            
        }, t);
        return remaining;
    }

    while (remaining > 0) {
        remaining = tick(1000);
    }
    

    btn.style.display = 'block';
    wrapper.style.display = 'none';


}

window.startTimer = startTimer;


document.addEventListener('DOMContentLoaded', () => {
    scrollTipsChangeInit();
    slider(0);
    // startTimer(75);
})
