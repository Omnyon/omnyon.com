(function auto() {
  'use strict';
  let nav = document.querySelector('nav');
  let navHeight = nav.clientHeight;
  let changeHeaderColor = function changeHeaderColor() {
    if (window.scrollY > 0) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };

  [...document.querySelectorAll('[data-scroll-to]')].forEach(function forEachDataScrollTo(el) {
    el.addEventListener('click', function onClick(ev) {
      ev.preventDefault();
      let topY = document.querySelector(this.getAttribute('data-scroll-to')).getBoundingClientRect().top + window.scrollY - navHeight;

      nav.classList.remove('open');

      TweenMax.to(window, 1, {
        scrollTo: {
          y: topY,
          autoKill: true
        },
        ease: Power3.easeOut
      });
    });
  });

  document.querySelector('.nav-button').addEventListener('click', function navClick(ev) {
    ev.preventDefault();
    nav.classList.toggle('open');
  });

  changeHeaderColor();

  window.addEventListener('scroll', changeHeaderColor);
}());