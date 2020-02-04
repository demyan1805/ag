"use strict";

var slider = function slider(startSlide) {
  var sliderControls = document.querySelector('.slider__controls');
  var slides = document.querySelectorAll('.slide');
  var controlItems = sliderControls.querySelectorAll('.slider__controls-item');
  var currentSlide = startSlide;
  var sliderScreen = document.querySelector('.slider-screen');
  var startX = undefined;
  var endX = undefined;
  var slideshowTimer = undefined;
  controlItems.forEach(function (element, index) {
    element.index = index;
    element.addEventListener('click', function (e) {
      setActiveSlide(e.target.index || e.target.parentNode.index || 0);
    });
  });
  document.querySelector('.prev-btn').addEventListener('click', function () {
    setActiveSlide(--currentSlide);
  });
  document.querySelector('.next-btn').addEventListener('click', function () {
    setActiveSlide(++currentSlide);
  });
  sliderScreen.addEventListener('touchstart', function (e) {
    startX = e.touches[0].clientX;
    clearTimeout(slideshowTimer);
  });
  sliderScreen.addEventListener('touchend', function (e) {
    endX = e.changedTouches[0].clientX;

    if (startX - endX > screen.width / 10) {
      setActiveSlide(++currentSlide);
    } else if (endX - startX > screen.width / 10) {
      setActiveSlide(--currentSlide);
    }

    startSlideshow();
  });
  sliderScreen.addEventListener('mousedown', function () {
    clearTimeout(slideshowTimer);
  });
  sliderScreen.addEventListener('mouseup', function () {
    startSlideshow();
  });

  function startSlideshow() {
    slideshowTimer = setTimeout(function () {
      setActiveSlide(++currentSlide);
      startSlideshow();
    }, 5000);
  }

  function setActiveSlide(index) {
    currentSlide = index >= slides.length ? 0 : index < 0 ? slides.length - 1 : index;

    for (var i = 0; i < slides.length; i++) {
      if (i == currentSlide) {
        slides[i].className = 'slide slide--active';
        controlItems[i].className = 'slider__controls-item slider__controls-item--active';
      } else if (i < currentSlide) {
        slides[i].className = 'slide slide--previous';
        controlItems[i].className = 'slider__controls-item';
      } else {
        slides[i].className = 'slide slide--next';
        controlItems[i].className = 'slider__controls-item';
      }
    }
  }

  setActiveSlide(currentSlide);
  startSlideshow();
};

var tabs = function tabs() {
  var tabsHeader = document.querySelectorAll('.js-tab');
  var tabsContent = document.querySelectorAll('.js-tab-content');
  tabsHeader.forEach(function (element, index) {
    element.addEventListener('click', function (e) {
      setActiveTab(e.target.closest('.js-tab'));
    });
  });

  function setActiveTab(tab) {
    tabsHeader.forEach(function (t, i) {
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
    });
  }
};

var scrollTipsChangeInit = function scrollTipsChangeInit() {
  var activeScreen = 0;
  var scrollTips = document.querySelectorAll('.header__nav-item');
  var screenPositions = [];
  scrollTips.forEach(function (tip, index) {
    screenPositions.push(document.getElementById("".concat(index + 1)).getBoundingClientRect().top + window.scrollY);
  });

  function scrollTipChange(scrollOffset) {
    if (scrollOffset > screenPositions[4] - window.innerHeight / 3 && activeScreen != 4) {
      setActiveTip(4);
    } else if (scrollOffset > screenPositions[3] - window.innerHeight / 3 && scrollOffset < screenPositions[4] - window.innerHeight / 3 && activeScreen != 3) {
      setActiveTip(3);
    } else if (scrollOffset > screenPositions[2] - window.innerHeight / 3 && scrollOffset < screenPositions[3] - window.innerHeight / 3 && activeScreen != 2) {
      setActiveTip(2);
    } else if (scrollOffset > screenPositions[1] - window.innerHeight / 3 && scrollOffset < screenPositions[2] - window.innerHeight / 3 && activeScreen != 1) {
      setActiveTip(1);
    } else if (scrollOffset < screenPositions[1] - window.innerHeight / 3 && activeScreen != 0) {
      setActiveTip(0);
    }
  }

  function setActiveTip(index) {
    scrollTips.forEach(function (tip, i) {
      if (i != index) {
        tip.classList.remove('header__nav-item--active');
      } else {
        tip.classList.add('header__nav-item--active');
      }
    });
    activeScreen = index;
    document.getElementById("".concat(index + 1)).classList.add('active');
  }

  setActiveTip(0);
  window.addEventListener('scroll', function (e) {
    scrollTipChange(window.scrollY);
  });
};

var setActiveForm = function setActiveForm(formType) {
  var getScreen = document.querySelector('.get');

  switch (formType) {
    case 'contact-form':
      getScreen.className = 'get get--contact active';
      break;

    case 'code-form':
      getScreen.className = 'get get--code active';
      break;

    case 'success':
      getScreen.className = 'get get--success active';
      break;
  }
};

var startTimer = function startTimer(count) {
  var wrapper = document.querySelector('.get__retry-timer');
  var btn = document.querySelector('.get__retry-btn');
  var value = wrapper.querySelector('.get__retry-timer-value');
  var remaining = count;
  btn.style.display = 'none';
  wrapper.style.display = 'block';

  function tick() {
    var min = Math.floor(remaining / 60);
    var sec = remaining % 60;
    value.innerHTML = "".concat(min < 10 ? '0' + min : min, ":").concat(sec < 10 ? '0' + sec : sec);

    if (remaining != 0) {
      setTimeout(function () {
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
};

var contactFormValidation = function contactFormValidation() {
  var contactForm = document.getElementById('contact-data');
  var emailField = document.getElementById('email');
  var sendBtn = document.querySelector('.send-btn');
  emailField.addEventListener('input', function () {
    if (emailField.validity.valid) {
      sendBtn.classList.remove('btn--disabled');
    }
  });
  contactForm.addEventListener('submit', function () {
    if (!emailField.validity.valid) {
      sendBtn.classList.add('btn--disabled');
    }
  });
};

var demoForm = function demoForm() {
  document.getElementById('contact-data').addEventListener('submit', function (e) {
    e.preventDefault();
    setActiveForm('code-form');
    startTimer(300);
  });
  document.getElementById('code-data').addEventListener('submit', function (e) {
    e.preventDefault();
    setActiveForm('success');
  });
  document.querySelector('.get__back-btn').addEventListener('click', function () {
    setActiveForm('contact-form');
  });
  document.querySelector('.get__retry-btn').addEventListener('click', function () {
    startTimer(300);
  });
};

document.addEventListener('DOMContentLoaded', function () {
  var timerRunning = false;
  scrollTipsChangeInit();
  slider(0);
  tabs();
  contactFormValidation();
  demoForm();
});
