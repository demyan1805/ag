const slider = function(startSlide) {
    sliderControls = document.querySelector('.slider__controls');
    slides = document.querySelectorAll('.slide');
    controlItems = sliderControls.querySelectorAll('.slider__controls-item');
    currentSlide = startSlide;
    sliderScreen = document.querySelector('.slider-screen');
    startX = undefined;
    endX = undefined;
    slidechowTimer = undefined;

    controlItems.forEach((element, index) => {
        element.index = index;
        element.addEventListener('click', e => {
            setActiveSlide(e.target.index || e.target.parentNode.index || 0);
        });
    });

    document.querySelector('.prev-btn').addEventListener('click', () => {
        setActiveSlide(--currentSlide);
    });

    document.querySelector('.next-btn').addEventListener('click', () => {
        setActiveSlide(++currentSlide);
    });

    sliderScreen.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        clearTimeout(slideshowTimer);
    });

    sliderScreen.addEventListener('touchend', (e) => {        
        endX = e.changedTouches[0].clientX;
        if (startX - endX > screen.width / 10) {
            setActiveSlide(++currentSlide);
        } else if (endX - startX > screen.width / 10) {
            setActiveSlide(--currentSlide);
        }
        startSlideshow();
    });

    sliderScreen.addEventListener('mousedown', () => {
        clearTimeout(slideshowTimer);
    });

    sliderScreen.addEventListener('mouseup', () => {
        startSlideshow();
    });

    function startSlideshow() {
        slideshowTimer = setTimeout(() => {
            setActiveSlide(++currentSlide);
            startSlideshow();
        }, 5000)
    }

    function setActiveSlide(index) {
        currentSlide = (index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index);
        for (let i = 0; i < slides.length; i++) {
            if (i == currentSlide) {
                slides[i].className = 'slide slide--active';
                controlItems[i].className = 'slider__controls-item slider__controls-item--active';
            }
            else if (i < currentSlide) {
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
    startSlideshow();
};

const tabs = function() {
    tabsHeader = document.querySelectorAll('.js-tab');
    tabsContent = document.querySelectorAll('.js-tab-content');

    tabsHeader.forEach((element, index) => {
        element.addEventListener('click', e => {
            setActiveTab(e.target.closest('.js-tab'));
        });
    });

    function setActiveTab(tab) {
        tabsHeader.forEach((t, i) => {
            if (tab == t) {
                if (!t.classList.contains('tab--active')) {
                    t.classList.add('tab--active');
                }
                tabsContent[i].classList.remove('tab--hidden');
            } else {
                if (!tabsContent[i].classList.contains('tab--hidden')) {
                    tabsContent[i].classList.add('tab--hidden');
                }
                t.classList.remove('tab--active');
            }
        })
    }
}

const scrollTipsChangeInit = function() {
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
        document.getElementById(`${index+1}`).classList.add('active');
    }
    setActiveTip(0);

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
    let remaining = count;
    btn.style.display = 'none';
    wrapper.style.display = 'block';

    function tick() {
        let min = Math.floor(remaining / 60);
        let sec = remaining % 60;
        value.innerHTML = `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
        if (remaining != 0) {
            setTimeout(() => {
                remaining--;
                tick();                
            }, 1000);
        } else {
            btn.style.display = 'block';
            wrapper.style.display = 'none';
            this.timerRunning = false;
        }
    }
    if (!this.timerRunning) {
        tick();
        this.timerRunning = true;
    }
}

const contactFormValidation = function() {
    contactForm = document.getElementById('contact-data');
    emailField = document.getElementById('email');
    sendBtn = document.querySelector('.send-btn');

    emailField.addEventListener('input', () => {
        if (emailField.validity.valid) {
            sendBtn.classList.remove('btn--disabled')
        }
    });
    contactForm.addEventListener('submit', () => {
        if (!emailField.validity.valid) {
            sendBtn.classList.add('btn--disabled');
        }
    })
}

const demoForm = function() {
    document.getElementById('contact-data').addEventListener('submit', (e) => {
        e.preventDefault();
        setActiveForm('code-form');
        startTimer(300);
    });
    document.getElementById('code-data').addEventListener('submit', (e) => {
        e.preventDefault();
        setActiveForm('success');
    });
    document.querySelector('.get__back-btn').addEventListener('click', () => {
        setActiveForm('contact-form');
    });
    document.querySelector('.get__retry-btn').addEventListener('click', () => {
        startTimer(300);
    });
    
}


document.addEventListener('DOMContentLoaded', () => {
    let timerRunning = false;
    scrollTipsChangeInit();
    slider(0);
    tabs();
    contactFormValidation();
    demoForm();
})
